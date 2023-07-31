import { config } from 'dotenv';
config({ path: '.env.local' });
import { PrismaClient } from '@prisma/client';
import { omit } from 'lodash';

import { companies } from '../lib/data';

const prisma = new PrismaClient();

const seed = async () => {
  try {
    await prisma.company.deleteMany();
    await prisma.company.createMany({ data: companies.map((company) => omit(company, 'id')) });
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

seed();
