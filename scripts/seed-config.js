const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.config.upsert({
    where: { key: 'ACTIVATION_PASSWORD' },
    update: { value: 'PROMPTVAULT8K' },
    create: { key: 'ACTIVATION_PASSWORD', value: 'PROMPTVAULT8K' }
  });
  console.log('✅ Config seeded:', result);
  await prisma.$disconnect();
}

main().catch(e => { console.error('❌', e); process.exit(1); });
