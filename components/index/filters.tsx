'use client';
import { groupBy, sortBy } from 'lodash';
import { getYear } from 'date-fns';
import useContext from '../lib/context/hook';
import { InvestmentWithCompanyAndValuationEvents } from '../../lib/queries';

const CheckboxFilter = ({
  filter: { id, name, count },
  setFilter,
}: {
  filter: { id: string; name: string; count: number };
  setFilter: (id: string, included: boolean) => void;
}) => (
  <div className="flex justify-between">
    <div className="relative flex items-start">
      <div className="flex h-6 items-center">
        <input
          id={id}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          onChange={(event) => setFilter(id, event.target.checked)}
        />
      </div>
      <div className="ml-3 text-sm leading-6">
        <label htmlFor={id} className="font-medium text-gray-900">
          {name}
        </label>
      </div>
    </div>
    {count > 1 && (
      <span
        className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-white px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-gray-600 ring-1 ring-inset ring-gray-200"
        aria-hidden="true"
      >
        {count}
      </span>
    )}
  </div>
);

const Filters = ({ investments }: { investments: InvestmentWithCompanyAndValuationEvents[] }) => {
  const { setCompanyFilter, setYearFilter } = useContext();
  const investmentsByCompany = groupBy(investments, 'companyId');
  const companiesFilters = Object.keys(investmentsByCompany).map((companyId) => ({
    id: companyId,
    name: investmentsByCompany[companyId][0].company.name,
    count: investmentsByCompany[companyId].length,
  }));
  const investmentsByYear = groupBy(investments, (investment) =>
    getYear(new Date(investment.date)),
  );
  const yearsFilters = Object.keys(investmentsByYear).map((year) => ({
    id: year,
    name: year,
    count: investmentsByYear[year].length,
  }));
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
      <div className="flex shrink-0 items-center pt-5">Filters</div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <div className="text-xs font-semibold leading-6 text-gray-400">Company</div>
            <fieldset className="mt-2">
              <legend className="sr-only">Company</legend>
              <div className="space-y-5">
                {sortBy(companiesFilters, 'name').map((filter) => (
                  <CheckboxFilter key={filter.id} filter={filter} setFilter={setCompanyFilter} />
                ))}
              </div>
            </fieldset>
          </li>
          <li>
            <div className="text-xs font-semibold leading-6 text-gray-400">Investment year</div>
            <fieldset className="mt-2">
              <legend className="sr-only">Investment year</legend>
              <div className="space-y-5">
                {sortBy(yearsFilters, 'name').map((filter) => (
                  <CheckboxFilter key={filter.id} filter={filter} setFilter={setYearFilter} />
                ))}
              </div>
            </fieldset>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Filters;
