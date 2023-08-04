import prisma from './prisma';
import { Investment } from './types';

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })
    .format(amount)
    .replace(/(\.|,)00$/g, '');

export const calculateBlendedValue = async (investments: Investment[]) => {
  const totalShares = investments.reduce<number>(
    (result, investment) => result + Number(investment?.valuationEvents[0].numberOfShares),
    0,
  );

  const lastValuationEvent = await prisma.valuationEvent.findFirst({
    where: { company: { id: investments[0].companyId } },
    orderBy: { date: 'desc' },
  });

  const lastPricePerShare = Number(lastValuationEvent?.pricePerShare);
  return totalShares * lastPricePerShare;
};

export const calculateTotalInvested = (investments: Investment[]) =>
  investments.reduce<number>((result, investment) => result + Number(investment.amount), 0);
