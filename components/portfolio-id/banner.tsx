const Banner = ({ companyId }: { companyId: string }) => (
  <div>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img className="h-32 w-full object-cover lg:h-48" src={`/img/${companyId}.jpg`} alt="" />
  </div>
);

export default Banner;
