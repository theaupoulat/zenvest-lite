export type Company = {
  id: string;
  name: string;
  description: string;
  website: string;
  investments?: Investment[];
};

export type Investment = {
  id: string;
  date: Date;
  amount: string;
  companyId: string;
  company?: Company;
  valuationEvents: ValuationEvent[];
};

export type ValuationEvent = {
  id: string;
  date: Date;
  numberOfShares: string;
  pricePerShare: string;
  companyId?: string;
  company?: Company;
  investmentId?: string;
  investment?: Investment;
};
