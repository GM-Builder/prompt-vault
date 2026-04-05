import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();
    const { userId: clerkId } = session;

    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Fetch Current User Stats First (Always safe)
    const currentUser: any = await prisma.user.findUnique({
      where: { clerkId } as any,
      select: { id: true, name: true, email: true }
    });

    if (!currentUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // 2. Define High-Fidelity Scoring Formula Logic
    const calculatePoints = (refs: number, views: number) => {
        const refPoints = refs * 100; // 1 Referral = 100 Points
        
        // Virality Scaling: 1 point per 100 views. 
        // Max limit of 10,000 points from views (requires 1,000,000 views) to prevent bot inflation.
        const viralPoints = Math.min(Math.floor(views / 100), 10000); 
        
        return refPoints + viralPoints;
    };

    let realUsers: any[] = [];
    let userReferralCount = 0;
    let userMaxViews = 0;

    try {
        // Hybrid Logic
        const topUsers: any[] = await (prisma as any).$queryRaw`
          SELECT 
            u.id, 
            u.name, 
            u.email,
            (SELECT COUNT(*) FROM "User" r WHERE r."referredById" = u.id AND r."isPaid" = true) as "referralCount",
            COALESCE((
              SELECT MAX(s.views) 
              FROM "ChallengeSubmission" s 
              WHERE s."userId" = u.id AND s.status = 'APPROVED'
            ), 0) as "maxViews"
          FROM "User" u
        `;

        realUsers = topUsers.map(u => ({
            id: u.id,
            name: u.name || u.email.split("@")[0],
            referrals: Number(u.referralCount),
            views: Number(u.maxViews),
            points: calculatePoints(Number(u.referralCount), Number(u.maxViews)),
            isMe: u.id === currentUser.id
        }));

        const me = realUsers.find(u => u.isMe);
        if (me) {
            userReferralCount = me.referrals;
            userMaxViews = me.views;
        }
    } catch (sqlError) {
        console.warn("[LEADERBOARD_SAFE_MODE] SQL failed, likely missing 'views' column. Using basic referral stats instead.");
        
        // Fallback: Safe fetch without 'views' column
        const fallbackUsers: any[] = await (prisma as any).$queryRaw`
          SELECT 
            u.id, u.name, u.email,
            (SELECT COUNT(*) FROM "User" r WHERE r."referredById" = u.id AND r."isPaid" = true) as "referralCount"
          FROM "User" u
        `;

        realUsers = fallbackUsers.map(u => ({
            id: u.id,
            name: u.name || u.email.split("@")[0],
            referrals: Number(u.referralCount),
            views: 0,
            points: calculatePoints(Number(u.referralCount), 0),
            isMe: u.id === currentUser.id
        }));

        const me = realUsers.find(u => u.isMe);
        if (me) userReferralCount = me.referrals;
    }

    // 4. Rank real users only
    const allCandidates = realUsers
    .sort((a, b) => b.points - a.points);

    const formattedTop100 = allCandidates.slice(0, 100).map((u, i) => ({
        ...u,
        rank: i + 1
    }));

    const myRank = allCandidates.findIndex(u => u.isMe) + 1;
    const myPoints = calculatePoints(userReferralCount, userMaxViews);

    return NextResponse.json({
      top100: formattedTop100,
      userRank: myRank,
      userStats: {
          name: currentUser.name || currentUser.email.split("@")[0],
          points: myPoints,
          referrals: userReferralCount,
          views: userMaxViews,
          rank: myRank
      },
      totalParticipants: allCandidates.length
    });

  } catch (error) {
    console.error("[LEADERBOARD_API_CRITICAL_ERROR]", error);
    return NextResponse.json({ 
        error: "Internal Server Error",
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
    }, { status: 500 });
  }
}
