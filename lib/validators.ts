export type NewInvestment = {
  amount: string;
  date: string;
  company: {
    connect: {
      id: string;
    };
  };
  valuationEvents: {
    create: {
      pricePerShare: string;
      numberOfShares: string;
      date: string;
      company: {
        connect: {
          id: string;
        };
      };
    }[];
  };
};

export const validateAndBuildCreateInvestmentObject = (formData: FormData): NewInvestment => {
  const investment = {
    valuationEvents: { create: [{}] },
  } as NewInvestment;

  // check that amounts exist and match
  const amount = Number(formData.get('amount'));
  const pricePerShare = Number(formData.get('price-per-share'));
  const numberOfShares = Number(formData.get('number-of-shares'));

  if (!amount || !pricePerShare || !numberOfShares) {
    throw new Error('Amount, price per share, and number of shares are required');
  }

  if (amount !== pricePerShare * numberOfShares) {
    throw new Error(
      'Price per share multiplied by the number of shares should match how much you invested',
    );
  }

  investment.amount = String(amount);
  investment.valuationEvents.create[0].pricePerShare = String(pricePerShare);
  investment.valuationEvents.create[0].numberOfShares = String(numberOfShares);

  // check that date exists
  const investmentDate = new Date(formData.get('date') as string).toISOString();

  if (!investmentDate) {
    throw new Error('Date is required');
  }

  investment.date = investmentDate;
  investment.valuationEvents.create[0].date = investmentDate;

  // check that company exists
  const companyId = formData.get('company') as string;

  if (!companyId) {
    throw new Error('Company ID is required');
  }

  investment.company = { connect: { id: companyId } };
  investment.valuationEvents.create[0].company = { connect: { id: companyId } };

  return investment;
};

export type NewValuationEvent = {
  pricePerShare: string;
  numberOfShares: string;
  date: string;
  company: {
    connect: {
      id: string;
    };
  };
};

export const validateAndBuildCreateValuationObject = (
  formData: FormData,
  companyId: string,
): NewValuationEvent => {
  const valuationEvent = {} as NewValuationEvent;

  // check that amounts exist and match
  const pricePerShare = Number(formData.get('price-per-share'));
  const numberOfShares = Number(formData.get('number-of-shares'));

  if (!pricePerShare) {
    throw new Error('Price per share is required');
  }

  if (pricePerShare < 0) {
    throw new Error('Price per share must be greater than 0');
  }

  valuationEvent.pricePerShare = String(pricePerShare);
  valuationEvent.numberOfShares = String(numberOfShares);

  // check that date exists
  const valuationDate = new Date(formData.get('date') as string).toISOString();

  if (!valuationDate) {
    throw new Error('Date is required');
  }

  valuationEvent.date = valuationDate;

  valuationEvent.company = { connect: { id: companyId } };

  return valuationEvent;
};
