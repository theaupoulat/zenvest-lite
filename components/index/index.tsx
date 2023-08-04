import Filters from './filters';
import Heading from './heading';
import InvestmentsList from './investments-list';
import CreateInvestmentModal from './create-investment-modal';
import { fetchCompanies, fetchInvestments } from '../../lib/queries';

const Index = async () => {
  const investments = await fetchInvestments()

  const companies = await fetchCompanies()

  return (
    <div>
      <div className="hidden pt-16 lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <Filters investments={investments} />
      </div>
      <main className="m-4 lg:pl-72">
        <Heading investments={investments} />
        <InvestmentsList investments={investments} />
      </main>
      <CreateInvestmentModal companies={companies} />
    </div>
  );
};


export default Index;
