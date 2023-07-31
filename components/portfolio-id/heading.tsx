import Image from 'next/image';

import { Company } from '../../lib/types';

const Heading = ({ company }: { company: Company }) => (
  <>
    <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
      <div className="flex">
        <Image
          className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
          src={`https://logo.clearbit.com/${new URL(company.website).hostname}`}
          alt={`${company.name} logo`}
          width={96}
          height={96}
        />
      </div>
      <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
        <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
          <h1 className="truncate text-2xl font-bold text-gray-900">{company.name}</h1>
        </div>
      </div>
    </div>
    <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
      <h1 className="truncate text-2xl font-bold text-gray-900">{company.name}</h1>
    </div>
  </>
);

export default Heading;
