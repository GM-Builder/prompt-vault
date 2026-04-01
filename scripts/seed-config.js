const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.config.upsert({
    where: { key: 'ACTIVATION_PASSWORD' },
    update: { value: 'VELOPROME8K' },
    create: { key: 'ACTIVATION_PASSWORD', value: 'VELOPROME8K' }
  });
  console.log('✅ Config seeded:', result);
  await prisma.$disconnect();
}

main().catch(e => { console.error('❌', e); process.exit(1); });
