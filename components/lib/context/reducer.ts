export type Action =
  | { type: 'SET_COMPANY_FILTER'; payload: { id: string; included: boolean } }
  | { type: 'SET_YEAR_FILTER'; payload: { id: string; included: boolean } }
  | { type: 'SET_NAME_FILTER'; payload: { name: string } }
  | { type: 'OPEN_CREATE_INVESTMENT_MODAL' }
  | { type: 'CLOSE_CREATE_INVESTMENT_MODAL' }
  | { type: 'OPEN_CREATE_VALUATION_EVENT_MODAL' }
  | { type: 'CLOSE_CREATE_VALUATION_EVENT_MODAL' };

export type State = {
  companyFilter: string[];
  yearFilter: string[];
  nameFilter: string;
  createInvestmentModalOpen: boolean;
  createValuationEventModalOpen: boolean;
};

export const defaultState = (): State => ({
  companyFilter: [],
  yearFilter: [],
  nameFilter: '',
  createInvestmentModalOpen: false,
  createValuationEventModalOpen: false,
});

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_COMPANY_FILTER': {
      const companyFilter = action.payload.included
        ? [...state.companyFilter, action.payload.id]
        : state.companyFilter.filter((id) => id !== action.payload.id);
      return { ...state, companyFilter };
    }
    case 'SET_YEAR_FILTER': {
      const yearFilter = action.payload.included
        ? [...state.yearFilter, action.payload.id]
        : state.yearFilter.filter((id) => id !== action.payload.id);
      return { ...state, yearFilter };
    }
    case 'SET_NAME_FILTER': {
      return { ...state, nameFilter: action.payload.name };
    }
    case 'OPEN_CREATE_INVESTMENT_MODAL': {
      return { ...state, createInvestmentModalOpen: true };
    }
    case 'CLOSE_CREATE_INVESTMENT_MODAL': {
      return { ...state, createInvestmentModalOpen: false };
    }
    case 'OPEN_CREATE_VALUATION_EVENT_MODAL': {
      return { ...state, createValuationEventModalOpen: true };
    }
    case 'CLOSE_CREATE_VALUATION_EVENT_MODAL': {
      return { ...state, createValuationEventModalOpen: false };
    }
    default: {
      return state;
    }
  }
};
