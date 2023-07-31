import Image from 'next/image';
import Link from 'next/link';
import { groupBy } from 'lodash';

import { Company, Investment } from '../../lib/types';
import { formatCurrency } from '../../lib/utils';

const InvestmentCard = ({
  company,
  investments,
}: {
  company: Company;
  investments: Investment[];
}) => {
  const amountInvested = investments.reduce<number>(
    (result, investment) => result + Number(investment.amount),
    0,
  );
  return (
    <Link href={`/portfolio/${company.id}`}>
      <li className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
          <Image
            src={`https://logo.clearbit.com/${new URL(company.website).hostname}`}
            alt={company.name}
            className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
            width={48}
            height={48}
          />
          <div className="text-sm font-medium leading-6 text-gray-900">{company.name}</div>
          <div className="relative ml-auto">
            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              {investments.length} ticket{investments.length === 1 ? '' : 's'}
            </span>
          </div>
        </div>
        <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">Amount invested</dt>
            <div className="rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
              {formatCurrency(amountInvested)}
            </div>
          </div>
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">Blended value</dt>
            <dd className="text-gray-700">
              <div className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                {formatCurrency(amountInvested * 1.5)} (x1.5)
              </div>
            </dd>
          </div>
          {/* <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">Unrealized value</dt>
            <dd className="text-gray-700">
              <div className="rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
                {formatCurrency(0)}
              </div>
            </dd>
          </div> */}
        </dl>
      </li>
    </Link>
  );
};

const InvestmentsList = ({ investments }: { investments: Investment[] }) => {
  const investmentsByCompany = groupBy(investments, 'companyId');
  return (
    <ul role="list" className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
      {Object.keys(investmentsByCompany).map((companyId) => (
        <InvestmentCard
          key={companyId}
          company={investmentsByCompany[companyId][0].company}
          investments={investmentsByCompany[companyId]}
        />
      ))}
    </ul>
  );
};

export default InvestmentsList;
