import { formatCurrency } from '../../lib/utils';

const HeadingStats = ({
  amountInvested,
  blendedValue,
}: // unrealizedValue,
{
  amountInvested: number;
  blendedValue: number;
  // unrealizedValue: number;
}) => (
  <dl className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:mt-0">
    <div className="overflow-hidden rounded-lg bg-white p-3 shadow">
      <dt className="truncate text-sm font-medium text-gray-500">Amount invested</dt>
      <dd className="mt-1 text-lg font-semibold tracking-tight text-gray-600">
        {formatCurrency(amountInvested)}
      </dd>
    </div>
    <div className="overflow-hidden rounded-lg bg-white p-3 shadow">
      <dt className="truncate text-sm font-medium text-gray-500">Blended value</dt>
      <dd className="mt-1 text-lg font-semibold tracking-tight text-green-700">
        {formatCurrency(blendedValue)}
      </dd>
    </div>
    {/* <div className="overflow-hidden rounded-lg bg-white p-3 shadow">
      <dt className="truncate text-sm font-medium text-gray-500">Unrealized value</dt>
      <dd className="mt-1 text-lg font-semibold tracking-tight text-purple-700">
        {formatCurrency(unrealizedValue)}
      </dd>
    </div> */}
  </dl>
);

export default HeadingStats;
