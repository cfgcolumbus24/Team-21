import React, { useEffect, useState } from "react";

const TableLengthStay = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the endpoint
    fetch("http://127.0.0.1:8000/average_length_of_stay")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Log the response data to see its structure
        console.log("Response data:", data);

        // Set the data
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-4 text-lg text-blue-500">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4 text-lg text-red-500">
        Error: {error.message}
      </div>
    );
  }

  // Check if data is available
  if (!data) {
    return (
      <div className="text-center py-4 text-lg text-gray-600">
        No data available
      </div>
    );
  }

  return (
    <div className="overflow-x-auto p-6">
      <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
            <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
              Metric
            </th>
            <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([key, value], index) => (
            <tr
              key={key}
              className={`${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-blue-50`}
            >
              <td className="py-4 px-6 border-b border-gray-200 text-gray-800">
              Average Length of Stay
              </td>
              <td className="py-4 px-6 border-b border-gray-200 text-gray-800">
                {value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableLengthStay;
