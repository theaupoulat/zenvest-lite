import { notFound } from 'next/navigation';

import Banner from './banner';
import Heading from './heading';
import HeadingDescription from './heading-description';
import HeadingStats from './heading-stats';
import EventFilter from './event-filter';
import CreateValuationEventButton from './create-valuation-event-button';
import Feed from './feed';
import CreateValuationEventModal from './create-valuation-event-modal';
import { calculateBlendedValue, calculateTotalInvested } from '../../lib/utils';
import { fetchCompanyWithInvestmentsAndValuationEvents } from '../../lib/queries';
import { Company } from '../../lib/types';



const PortfolioId = async ({ id }: { id: string }) => {
  const company = await fetchCompanyWithInvestmentsAndValuationEvents(id) as Company

  if (!company || !company.investments) {
    notFound();
  } 
  
  const investments = company.investments;
  const amountInvested = calculateTotalInvested(investments);
  const blendedValue = await calculateBlendedValue(investments);
  return (
    <div className="relative">
      <Banner company={company} />
      <span className="absolute right-8 top-8 inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
        {investments.length} ticket{investments.length === 1 ? '' : 's'}
      </span>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Heading company={company} />
        <div className="grid grid-cols-1 border-b border-gray-300 py-8 lg:grid-cols-2">
          <div>
            <HeadingDescription company={company} />
          </div>
          <div>
            <HeadingStats
              amountInvested={amountInvested}
              blendedValue={blendedValue} 
            />
          </div>
        </div>
        <div className="mt-8 flex justify-between">
          <EventFilter />
          <CreateValuationEventButton />
        </div>
        <Feed company={company} />
      </div>
      <CreateValuationEventModal company={company} />
    </div>
  );
};

export default PortfolioId;
