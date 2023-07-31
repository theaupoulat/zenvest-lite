import { useContext } from 'react';

import Context from '.';

const Hook = () => {
  const { state, dispatch } = useContext(Context);
  const setCompanyFilter = (id: string, included: boolean) =>
    dispatch({ type: 'SET_COMPANY_FILTER', payload: { id, included } });
  const setYearFilter = (id: string, included: boolean) =>
    dispatch({ type: 'SET_YEAR_FILTER', payload: { id, included } });
  const setNameFilter = (name: string) => dispatch({ type: 'SET_NAME_FILTER', payload: { name } });
  const openCreateInvestmentModal = () => dispatch({ type: 'OPEN_CREATE_INVESTMENT_MODAL' });
  const closeCreateInvestmentModal = () => dispatch({ type: 'CLOSE_CREATE_INVESTMENT_MODAL' });
  const openCreateValuationEventModal = () =>
    dispatch({ type: 'OPEN_CREATE_VALUATION_EVENT_MODAL' });
  const closeCreateValuationEventModal = () =>
    dispatch({ type: 'CLOSE_CREATE_VALUATION_EVENT_MODAL' });
  return {
    state,
    setCompanyFilter,
    setYearFilter,
    setNameFilter,
    openCreateInvestmentModal,
    closeCreateInvestmentModal,
    openCreateValuationEventModal,
    closeCreateValuationEventModal,
  };
};

export default Hook;
