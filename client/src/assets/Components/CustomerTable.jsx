import React, { useState, useEffect } from "react";
import { HiMiniArrowSmallLeft, HiMiniArrowSmallRight } from "react-icons/hi2";
import axios from "axios";
// Defines the main component for displaying customer data
const CustomerTable = () => {
  // State variables to manage the customer data, search term, pagination, etc.
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("name");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20); //For future use we can also add option for limit
  const [totalPages, setTotalPages] = useState(0);

  // Effect hook to fetch customer data whenever parameters in dependencies change

  useEffect(() => {
    fetchCustomers();
  }, [searchTerm, searchField, sortBy, sortOrder, page]);

  // Function to fetch customer data from the server

  const fetchCustomers = async () => {
    try {
      const { data } = await axios.get("http://localhost:9000/api/data", {
        params: {
          search: searchTerm,
          searchBy: searchField,
          sortBy,
          sortOrder,
          page,
          limit,
        },
      });
      setCustomers(data.customers);
      setTotalPages(Math.ceil(data.total / limit)); // Calculate total pages for pagination
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    }
  };

  // Function to handle changes in the search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset page to 1 on new search
  };

  // The UI of the CustomerTable component
  return (
    <div className=" flex-grow">
      <div className="flex gap-2 m-10 justify-between">
        {/* Search and sort options */}
        <div className="flex w-1/2">
          {/* Dropdown to select the field to search by */}
          <select
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            className="relative block px-2 pr-2 text-sm font-medium text-center text-gray-700 bg-gray-100 border border-gray-300 rounded-l-md hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600 "
          >
            <option value="name">Name</option>
            <option value="location">Location</option>
          </select>
          {/* Input field for entering the search term */}
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="block p-2.5 w-full z-20 text-sm focus: focus:border-blue-500 bg-gray-600  text-white rounded-r-md  dark:placeholder-gray-400 "
            placeholder={`Search by ${
              searchField === "name" ? "name" : "Location"
            }`}
          />
        </div>
        <div className="flex items-center gap-5">
          {/* Dropdown to select sorting option */}
          <label
            htmlFor="sort"
            className=" text-md tracking-wider font-semibold uppercase"
          >
            Sort by :
          </label>
          <select
            id="sort"
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [sort, order] = e.target.value.split("-");
              setSortBy(sort);
              setSortOrder(order);
            }}
            className="relative block px-2 py-2 text-sm font-medium text-center text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600 "
          >
            <option value="date-asc">Date (Oldest to Newest)</option>
            <option value="date-desc">Date (Newest to Oldest)</option>
            <option value="time-asc">Time (Oldest to Newest)</option>
            <option value="time-desc">Time (Newest to Oldest)</option>
          </select>
        </div>
      </div>

      {/* Table to display customer data */}
      {/* Conditional rendering to show the table only if there are customers */}

      {customers.length > 0 ? (
        <div>
          <div className="overflow-x-auto m-10 rounded-xl">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400  ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 text-center" rowSpan="2">
                    S. No.
                  </th>
                  <th scope="col" className="px-6 py-3 text-center" rowSpan="2">
                    Customer Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-center" rowSpan="2">
                    Age
                  </th>
                  <th scope="col" className="px-6 py-3 text-center" rowSpan="2">
                    Phone No.
                  </th>
                  <th scope="col" className="px-6 py-3 text-center" rowSpan="2">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-center" colSpan="2">
                    Created At
                  </th>
                </tr>
                <tr>
                  <th scope="col " className="px-6 py-3 text-center">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {customers.map((row, idx) => (
                  <tr
                    key={idx}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center text-sm"
                  >
                    <td className="px-6 py-4">{row.sno}</td>
                    <td className="px-6 py-4">{row.name}</td>
                    <td className="px-6 py-4">{row.age}</td>
                    <td className="px-6 py-4">{row.phoneno}</td>
                    <td className="px-6 py-4">{row.location}</td>
                    <td className="px-6 py-4">{row.date}</td>
                    <td className="px-6 py-4">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination controls */}
          <div className="flex items-center justify-center gap-4 mb-5">
            {/* Previous Button */}
            <button
              disabled={page === 1}
              onClick={() => setPage(Math.max(1, page - 1))}
              className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              <HiMiniArrowSmallLeft />
              prev
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase ${
                      page === pageNum
                        ? "bg-gray-900 text-white"
                        : "text-gray-900"
                    } transition-all hover:bg-gray-900/10 hover:text-black active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                    onClick={() => setPage(pageNum)}
                    type="button"
                  >
                    <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                      {pageNum}
                    </span>
                  </button>
                )
              )}
            </div>

            {/* Next Button */}
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              next
              <HiMiniArrowSmallRight />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className=" text-xl font-semibold text-gray-600">
            No Customers found
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomerTable;
