'use client';
import { Fragment, useRef, useState, useTransition } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';

import useContext from '../lib/context/hook';
import { createInvestment } from '../../lib/actions';
import { Company } from '@prisma/client';
import { useRouter } from 'next/navigation';

const CreateInvestmentModal = ({ companies }: { companies: Company[] }) => {
  const {
    state: { createInvestmentModalOpen },
    closeCreateInvestmentModal,
  } = useContext();
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const router = useRouter();
  return (
    <Transition.Root show={createInvestmentModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={closeCreateInvestmentModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="my-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Add a new investment
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        This will create a new investment in your portfolio.
                      </p>
                    </div>
                  </div>
                  {formError && (
                    <div className=" sm:mt-5">
                      <Dialog.Description className="text-sm font-semibold leading-6 text-red-500">
                        Errors while submitting the form: {formError}
                      </Dialog.Description>
                    </div>
                  )}
                </div>
                <form
                  id="create-investment-form"
                  className="space-y-6"
                  onSubmit={async (event) => {
                    event.preventDefault();
                    startTransition(async () => {
                      try {
                        await createInvestment(
                          new FormData(event.target as HTMLFormElement),
                        )
                        router.refresh();
                        closeCreateInvestmentModal();
                      } catch (error: any) {
                        // FIXME: This is a hack to get the error message shown (only error that can be thrown while submitting form)
                        setFormError('Price per share multiplied by the number of shares should match how much you invested');
                      }
                    });
                  }}
                >
                  <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Company you invested in?
                      </label>
                      <div className="mt-2">
                        <select
                          id="company"
                          name="company"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          {companies.map(({ id, name }) => (
                            <option key={id} value={id}>
                              {name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="amount"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        How much did you invest?
                      </label>
                      <div className="relative mt-2 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          min={1}
                          step={1}
                          name="amount"
                          id="amount"
                          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="0"
                          aria-describedby="amount-currency"
                          required
                        />
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <span className="text-gray-500 sm:text-sm" id="amount-currency">
                            USD
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="price-per-share"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Price per share
                      </label>
                      <div className="relative mt-2 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          min={1}
                          step={1}
                          name="price-per-share"
                          id="price-per-share"
                          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="0"
                          aria-describedby="price-per-share-currency"
                          required
                        />
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <span className="text-gray-500 sm:text-sm" id="price-per-share-currency">
                            USD
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="number-of-shares"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Number of shares
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="number-of-shares"
                          id="number-of-shares"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="date"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Date of your investment
                      </label>
                      <div className="mt-2">
                        <input
                          id="date"
                          name="date"
                          type="date"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </form>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="submit"
                    form="create-investment-form"
                    disabled={isPending}
                    className={clsx(
                      {
                        'bg-indigo-300': isPending,
                        'bg-indigo-600 hover:bg-indigo-500': !isPending,
                      },
                      'inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2',
                    )}
                  >
                    Creat{isPending ? 'ing…' : 'e'}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={closeCreateInvestmentModal}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CreateInvestmentModal;
