import Filters from './filters';
import Heading from './heading';
import InvestmentsList from './investments-list';
import { Investment } from '../../lib/types';
import { investments as investmentsSeed } from '../../lib/data';
import CreateInvestmentModal from './create-investment-modal';

const fetchInvestments = (): Promise<Investment[]> =>
  new Promise((resolve) => setTimeout(() => resolve(investmentsSeed), 100));

const Index = async () => {
  const investments = await fetchInvestments();
  return (
    <div>
      <div className="hidden pt-16 lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <Filters investments={investments} />
      </div>
      <main className="m-4 lg:pl-72">
        <Heading investments={investments} />
        <InvestmentsList investments={investments} />
      </main>
      <CreateInvestmentModal />
    </div>
  );
};

export default Index;
