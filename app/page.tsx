import Index from '../components/index';

const title = 'ZenvestLite';
const description = 'ZenvestLite - Simple portfolio management';

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: process.env.VERCEL_URL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

const IndexPage = () => <Index />;

export default IndexPage;
