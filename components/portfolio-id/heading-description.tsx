import Image from 'next/image';

import { Company } from '../../lib/types';

const HeadingDescription = ({ company }: { company: Company }) => (
  <>
    <p className="text-gray-500">{company.description}</p>
    <a
      className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-900"
      href={company.website}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        className="h-6 w-6"
        src={`https://logo.clearbit.com/${new URL(company.website).hostname}`}
        alt={`${company.name} logo`}
        width={24}
        height={24}
      />
      <span className="ml-2">{new URL(company.website).hostname.replace('www.', '')}</span>
    </a>
  </>
);

export default HeadingDescription;
