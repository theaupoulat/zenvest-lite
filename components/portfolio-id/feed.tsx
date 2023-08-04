import { TicketIcon, ChartBarIcon } from '@heroicons/react/20/solid';
import { format } from 'date-fns';
import { Company } from '../../lib/types';
import { formatCurrency } from '../../lib/utils';
import prisma from '../../lib/prisma';

type FeedItemBase<T extends FeedItemType> = {
    type: T;
    date: Date;
  };


type FeedItemType = 'new-price-per-share' | 'new-investment';

interface InvestmentFeedItemData  {
  id: string;
  amountInvested: number;
  investmentVehicle: string;
  investmentName: string;
}

interface ValuationEventFeedItemData {  
  id: string;
  pricePerShare: number;
  blendedValue: number;
  investmentName: string;
}


type FeedItemData<T extends FeedItemType> = T extends 'new-price-per-share'
  ? ValuationEventFeedItemData
  : T extends 'new-investment'
  ? InvestmentFeedItemData
  : never;

type FeedItem<T extends FeedItemType> = FeedItemBase<T> & FeedItemData<T>

const createFeedItem = <T extends FeedItemType>(type: T, date: Date, data: FeedItemData<T> ): FeedItem<T> => {
  return {
    type,
    date,
    ...data,
  };
}

const createFeed = async ( company: Company ): Promise<FeedItem<FeedItemType>[]> => {
  const feed = []
  // this prepares for user scoped portfolios, where feed starts at first investment
  const investments = await prisma.investment.findMany({
    where: {
      companyId: company.id
    },
    orderBy: {
      date: 'asc'
    }
  })

  // get valuation events after the first investment
  const valuationEvents = await prisma.valuationEvent.findMany({
    where: {
      companyId: company.id,
      date: {
        gte: investments[0].date
      }
    },
    orderBy: {
      date: 'asc'
    } 
  })

  let investmentPointer = 0
  let valuationEventPointer = 0
  let totalShares = 0

  // NB: this approach is overkill here as working with valuation events is enough, but it makes it more future proof 
  // (ie. add user scoped portfolios, add other types of events, etc.)
  while(investmentPointer < investments.length || valuationEventPointer < valuationEvents.length) {
    const investment = investments[investmentPointer]
    const valuationEvent = valuationEvents[valuationEventPointer]

    // Push first investment
    if (feed.length === 0) {
      feed.push(createFeedItem('new-investment', investment.date, {
        amountInvested: Number(investment.amount),
        investmentVehicle: "Personal vehicle",
        investmentName: "Hexa Seed",
        id: investment.id
      }))
      
      investmentPointer++
      continue
    }

    // Skip valuation linked to first investment
    if (valuationEventPointer === 0 && valuationEvent.numberOfShares) {
      totalShares += Number(valuationEvent.numberOfShares)
      valuationEventPointer++
      continue
    }

    if (investment?.date <= valuationEvent?.date) {
      feed.push(createFeedItem('new-investment', investment.date, {
        amountInvested: Number(investment.amount),
        investmentVehicle: "Personal vehicle",
        investmentName: "Hexa Seed",
        id: investment.id
      }))
      investmentPointer++
      continue
    }

    // all valuation events after the first investment/valuation are treated as new price per share events
    if (!investment || investment?.date >= valuationEvent?.date){

      // check if valuation event brings new shares (linked to investment)
      if (valuationEvent.numberOfShares) {
        totalShares += Number(valuationEvent.numberOfShares)
      }

      const blendedValueToPoint = Number(valuationEvent.pricePerShare) * totalShares
      feed.push(createFeedItem('new-price-per-share', valuationEvent.date, {
        pricePerShare: Number(valuationEvent.pricePerShare),
        blendedValue: blendedValueToPoint,
        investmentName: "Hexa Seed",
        id: valuationEvent.id
      }))
      valuationEventPointer++
      continue
    } 
  }

  // yeah this is lazy, but makes it easier to understand the feed building logic
  return feed.reverse()
}

const Feed = async ({ company }: { company: Company }) => {
  const feed = await createFeed(company)
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
                              {formatCurrency((feedItem as FeedItem<'new-price-per-share'>).pricePerShare)}
                              </dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">
                                New blended value for {feedItem.investmentName}
                              </dt>
                              <dd className="text-lg font-semibold tracking-tight text-gray-900">
                              {formatCurrency((feedItem as FeedItem<'new-price-per-share'>).blendedValue)}
                              </dd>
                            </div>
                          </>
                        )}
                        {feedItem.type === 'new-investment' && (
                          <>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Amount invested</dt>
                              <dd className="text-lg font-semibold tracking-tight text-gray-900">
                              {formatCurrency((feedItem as FeedItem<'new-investment'>).amountInvested)}
                              </dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Invested via</dt>
                              <dd className="text-lg font-semibold tracking-tight text-gray-900">
                                {(feedItem as FeedItem<'new-investment'>).investmentVehicle}
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
