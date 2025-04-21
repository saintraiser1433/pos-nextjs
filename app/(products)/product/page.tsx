import { columns } from './column';

import { DataTable } from './data-table';

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
    {
      id: '12321',
      amount: 100,
      status: 'success',
      email: 'm@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'processing',
      email: '123@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'failed',
      email: 'm@example.com',
    },
    // ...
  ];
}

export default async function Product() {
  const data = await getData();

  return (
    <div className=''>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
