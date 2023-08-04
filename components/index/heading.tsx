import { uniqBy } from 'lodash';

import SearchFilter from './search-filter';
import CreateInvestmentButton from './create-investment-button';
import { InvestmentWithCompanyAndValuationEvents } from '../../lib/queries';

const Heading = ({ investments }: { investments: InvestmentWithCompanyAndValuationEvents[] }) => {
  const companies = investments?.length > 0 ? uniqBy(
    investments.map(({ company }) => company),
    'id',
  ) : [];
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="flex items-center gap-x-8 px-4 py-5 sm:p-6">
        <div>
          <strong>{investments.length}</strong> ticket{investments.length === 1 ? '' : 's'} in{' '}
          <strong>{companies.length}</strong> compan{companies.length === 1 ? 'y' : 'ies'}
        </div>
        <SearchFilter />
        <CreateInvestmentButton />
      </div>
    </div>
  );
};

export default Heading;
