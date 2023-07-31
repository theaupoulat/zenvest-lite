'use client';
import { PlusIcon } from '@heroicons/react/20/solid';

import useContext from '../lib/context/hook';

const CreateValuationEventButton = () => {
  const { openCreateValuationEventModal } = useContext();
  return (
    <button
      type="button"
      className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      onClick={openCreateValuationEventModal}
    >
      <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
      <span>New event</span>
    </button>
  );
};

export default CreateValuationEventButton;
