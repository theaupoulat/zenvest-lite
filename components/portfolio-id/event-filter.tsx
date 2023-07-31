const EventFilter = () => (
  <select
    id="event-filter"
    name="event-filter"
    className="block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
    defaultValue="all"
  >
    <option value="all">All activities</option>
    <option value="new-investment">New ticket</option>
    <option value="new-price-per-share">New price per share</option>
  </select>
);

export default EventFilter;
