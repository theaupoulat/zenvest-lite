import { Company } from '../../lib/types';

const Banner = ({ company }: { company: Company }) => (
  <div>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      className="h-32 w-full object-cover lg:h-48"
      src={`/img/${company.name.toLowerCase()}.jpg`}
      alt=""
    />
  </div>
);

export default Banner;
