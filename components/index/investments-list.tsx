import Image from 'next/image';
import Link from 'next/link';
import { groupBy } from 'lodash';

import { Investment } from '../../lib/types';
import { calculateBlendedValue, calculateTotalInvested, formatCurrency } from '../../lib/utils';
import { InvestmentWithCompanyAndValuationEvents } from '../../lib/queries';

const InvestmentCard = async ({
  company,
  investments,
}: {
  company: InvestmentWithCompanyAndValuationEvents['company'];
  investments: InvestmentWithCompanyAndValuationEvents[];
}) => {
  const amountInvested = calculateTotalInvested(investments as Investment[]);
  const blendedValue = await calculateBlendedValue(investments as Investment[]);
  const multiple = blendedValue / amountInvested;
  const multipleColor = multiple >= 1 ? "green" : "red"
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
              <div className={`rounded-md bg-${multipleColor}-50 px-2 py-1 text-xs font-medium text-${multipleColor}-700 ring-1 ring-inset ring-${multipleColor}-600/20`}>
                {formatCurrency(blendedValue)} ({multiple.toFixed(1)})
              </div>
            </dd>
          </div>
        </dl>
      </li>
    </Link>
  );
};

const InvestmentsList = ({ investments }: { investments: InvestmentWithCompanyAndValuationEvents[] }) => {
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
