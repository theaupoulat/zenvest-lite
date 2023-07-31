export type Company = {
  id: string;
  name: string;
  description: string;
  website: string;
};

export type ValuationEvent = {
  id: string;
  date: string;
  numberOfShares: string;
  pricePerShare: string;
};

export type Investment = {
  id: string;
  date: string;
  amount: string;
  companyId: string;
  company: Company;
  valuationEvents: ValuationEvent[];
};
