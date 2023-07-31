import { Company, Investment } from './types';

export const companies: Company[] = [
  {
    id: 'swan',
    name: 'Swan',
    description: 'The easiest way to embed banking features into your product.',
    website: 'https://www.swan.io/',
  },
  {
    id: 'hexa',
    name: 'Hexa',
    description:
      "Hexa is home to startup studios eFounders, Logic Founders and 3founders. We're on a mission to democratize a new way for entrepreneurship.",
    website: 'https://www.hexa.cc/',
  },
  {
    id: 'upflow',
    name: 'Upflow',
    description:
      'Stop wasting time and automate customer payments reminders. With Upflow, businesses quickly collect unpaid invoices and reduce overdue payments by 50%',
    website: 'https://upflow.io/',
  },
  {
    id: 'equify',
    name: 'Equify',
    description:
      'Equify centralizes all the legal and financial information of your shareholders. With Equify, take back control of your capitalization table.',
    website: 'https://www.equify.eu/',
  },
  {
    id: 'cycle',
    name: 'Cycle',
    description:
      'Cycle is a product feedback system that lets you connect the dots between customer needs and product delivery workflows.',
    website: 'https://www.cycle.app/',
  },
];

export const investments: Investment[] = [
  {
    id: '1',
    date: new Date('2021-06-15').toISOString(),
    amount: '30000.00',
    companyId: companies[1].id,
    company: companies[1],
    valuationEvents: [
      {
        id: '1',
        date: new Date('2021-06-15').toISOString(),
        numberOfShares: '3000',
        pricePerShare: '10.00',
      },
    ],
  },
  {
    id: '2',
    date: new Date('2022-10-20').toISOString(),
    amount: '15000.00',
    companyId: companies[0].id,
    company: companies[0],
    valuationEvents: [
      {
        id: '2',
        date: new Date('2022-10-20').toISOString(),
        numberOfShares: '3000',
        pricePerShare: '5.00',
      },
    ],
  },
  {
    id: '3',
    date: new Date('2023-03-05').toISOString(),
    amount: '5000.00',
    companyId: companies[4].id,
    company: companies[4],
    valuationEvents: [
      {
        id: '3',
        date: new Date('2023-03-05').toISOString(),
        numberOfShares: '2500',
        pricePerShare: '20.00',
      },
    ],
  },
  {
    id: '4',
    date: new Date('2023-07-30').toISOString(),
    amount: '5000',
    companyId: companies[0].id,
    company: companies[0],
    valuationEvents: [
      {
        id: '4',
        date: new Date('2023-07-30').toISOString(),
        numberOfShares: '500',
        pricePerShare: '10.00',
      },
    ],
  },
];
