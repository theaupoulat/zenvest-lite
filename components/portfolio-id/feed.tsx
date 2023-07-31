import { TicketIcon, ChartBarIcon } from '@heroicons/react/20/solid';
import { format } from 'date-fns';

import { Company } from '../../lib/types';
import { formatCurrency } from '../../lib/utils';

const Feed = ({ company }: { company: Company }) => {
  const feed = [
    {
      id: '2',
      type: 'new-price-per-share',
      date: new Date('2023-03-10').toISOString(),
      pricePerShare: 15,
      blendedValue: 45000,
      investmentName: 'Hexa Seed',
    },
    {
      id: '1',
      type: 'new-investment',
      date: new Date('2021-06-15').toISOString(),
      amountInvested: 30000,
      investmentVehicle: 'Personal vehicle',
      investmentName: 'Hexa Seed',
    },
  ];
  return (
    <div className="mt-8 flow-root">
      <ul role="list" className="-mb-8">
        {feed.map((feedItem, feedItemIdx) => (
          <li key={feedItem.id}>
            <div className="relative pb-8">
              {feedItemIdx !== feed.length - 1 ? (
                <span
                  className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex items-start space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white ring-8 ring-white">
                  {feedItem.type === 'new-investment' ? (
                    <TicketIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  ) : (
                    <ChartBarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div>
                    <div className="text-sm">
                      {feedItem.type === 'new-price-per-share' && (
                        <p className="font-medium text-gray-900">
                          New price per share for <strong>{company.name}</strong>
                        </p>
                      )}
                      {feedItem.type === 'new-investment' && (
                        <p className="font-medium text-gray-900">
                          New ticket in <strong>{feedItem.investmentName}</strong>
                        </p>
                      )}
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      {format(new Date(feedItem.date), 'MMM d, yyyy')}
                    </p>
                  </div>
                  <div className="mt-2 overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-4 sm:p-6">
                      <dl className="flex gap-x-8">
                        {feedItem.type === 'new-price-per-share' && (
                          <>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">
                                New price per share
                              </dt>
                              <dd className="text-lg font-semibold tracking-tight text-gray-900">
                                {formatCurrency(feedItem.pricePerShare as number)}
                              </dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">
                                New blended value for {feedItem.investmentName}
                              </dt>
                              <dd className="text-lg font-semibold tracking-tight text-gray-900">
                                {formatCurrency(feedItem.blendedValue as number)}
                              </dd>
                            </div>
                          </>
                        )}
                        {feedItem.type === 'new-investment' && (
                          <>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Amount invested</dt>
                              <dd className="text-lg font-semibold tracking-tight text-gray-900">
                                {formatCurrency(feedItem.amountInvested as number)}
                              </dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Invested via</dt>
                              <dd className="text-lg font-semibold tracking-tight text-gray-900">
                                {feedItem.investmentVehicle}
                              </dd>
                            </div>
                          </>
                        )}
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feed;
