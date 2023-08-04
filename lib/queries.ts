import { Prisma } from '@prisma/client';
import prisma from './prisma';

export const fetchCompanies = () => {
  return prisma.company.findMany();
};

export type InvestmentWithCompanyAndValuationEvents = Prisma.InvestmentGetPayload<{
  include: {
    company: true;
    valuationEvents: true;
  };
}>;

export const fetchInvestments = (): Promise<InvestmentWithCompanyAndValuationEvents[]> => {
  return prisma.investment.findMany({
    include: {
      company: true,
      valuationEvents: true,
    },
  });
};

export const fetchCompanyWithInvestmentsAndValuationEvents = (companyId: string) => {
  return prisma.company.findUnique({
    where: { id: companyId },
    include: {
      investments: {
        include: {
          valuationEvents: true,
        },
      },
      valuationEvents: true,
    },
  });
};
