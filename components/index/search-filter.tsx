'use client';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

import useContext from '../lib/context/hook';

const SearchFilter = () => {
  const { setNameFilter } = useContext();
  return (
    <div className="flex flex-auto gap-x-4">
      <label htmlFor="search" className="sr-only">
        Search a company…
      </label>
      <div className="relative min-w-0 flex-auto">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          required
          className="block w-full rounded-md border-0 py-2 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Search a company…"
          onChange={(event) => setNameFilter(event.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchFilter;
