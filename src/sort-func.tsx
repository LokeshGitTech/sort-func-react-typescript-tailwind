import React, { useState, useEffect } from 'react';

interface DataItem {
  name: string;
  date: Date;
}

const TableWithSortingAndFiltering: React.FC = () => {
  const [originalData, setOriginalData] = useState<DataItem[]>([]);
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    // Initial data setup
    const initialData: DataItem[] = [
      { name: 'John', date: new Date('2023-12-05') },
      { name: 'John', date: new Date('2023-12-13') },
      { name: 'John', date: new Date('2023-12-26') },
      { name: 'John', date: new Date('2023-12-27') },
      { name: 'John', date: new Date('2023-01-05') },
      { name: 'Alice', date: new Date('2023-01-15') },
      { name: 'Bob', date: new Date('2023-02-01') },
      { name: 'Eve', date: new Date('2023-03-10') },
      { name: 'Charlie', date: new Date('2023-04-05') },
      // Add more dummy data as needed
    ];

    setOriginalData(initialData);
    setFilteredData(initialData);
  }, []);

  const sortAndFilter = (option: string) => {
    switch (option) {
      case 'Sort by Name Asc':
        setFilteredData([...filteredData].sort((a, b) => a.name.localeCompare(b.name)));
        break;
      case 'Sort by Name Desc':
        setFilteredData([...filteredData].sort((a, b) => b.name.localeCompare(a.name)));
        break;
      case 'Filter by Last Week':
        filterByLastWeek();
        break;
      case 'Filter by Last Month':
        filterByLastMonth();
        break;
      case 'Filter by Last 6 Months':
        filterByLast6Months();
        break;
      case 'Filter by Last Year':
        filterByLastYear();
        break;
      default:
        // Default behavior (no sorting or filtering)
        break;
    }

    // Close the dropdown after performing the action
    setDropdownOpen(false);
  };

  const filterByLastWeek = () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    setFilteredData(originalData.filter(item => item.date >= oneWeekAgo));
  };

  const filterByLastMonth = () => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    setFilteredData(originalData.filter(item => item.date >= oneMonthAgo));
  };

  const filterByLast6Months = () => {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    setFilteredData(originalData.filter(item => item.date >= sixMonthsAgo));
  };

  const filterByLastYear = () => {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    setFilteredData(originalData.filter(item => item.date >= oneYearAgo));
  };

  return (
    <div className='bg-gray-200 p-4'>
      <div className="dropdown-container relative">
        <div
          className="dropdown-button bg-blue-500 text-white p-2 rounded cursor-pointer"
          onClick={() => setDropdownOpen(!isDropdownOpen)}
        >
          Sort and Filter Options
        </div>
        {isDropdownOpen && (
          <div className="dropdown-content absolute bg-white mt-2 p-2 rounded border shadow">
            <a className="block py-2" onClick={() => sortAndFilter('Sort by Name Asc')}>Sort by Name Asc</a>
            <a className="block py-2" onClick={() => sortAndFilter('Sort by Name Desc')}>Sort by Name Desc</a>
            <a className="block py-2" onClick={() => sortAndFilter('Filter by Last Week')}>Filter by Last Week</a>
            <a className="block py-2" onClick={() => sortAndFilter('Filter by Last Month')}>Filter by Last Month</a>
            <a className="block py-2" onClick={() => sortAndFilter('Filter by Last 6 Months')}>Filter by Last 6 Months</a>
            <a className="block py-2" onClick={() => sortAndFilter('Filter by Last Year')}>Filter by Last Year</a>
          </div>
        )}
      </div>

      <table className="mt-4 w-full table-auto border-collapse border border-gray-800">
        <thead>
          <tr>
            <th className="p-2 border border-gray-800">Name</th>
            <th className="p-2 border border-gray-800">Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item.date.toISOString()}>
              <td className="p-2 border border-gray-800">{item.name}</td>
              <td className="p-2 border border-gray-800">{item.date.toDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableWithSortingAndFiltering;
