import React, { useEffect, useState } from "react";

const Discharges = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the endpoint
    fetch("http://127.0.0.1:8000/discharges")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response data:", data);
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
              Description
            </th>
            <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-50 hover:bg-blue-50">
            <td className="py-4 px-6 border-b border-gray-200 text-gray-800">
              Total Discharges
            </td>
            <td className="py-4 px-6 border-b border-gray-200 text-gray-800">
              {data.total_discharges}
            </td>
          </tr>
          <tr className="bg-white hover:bg-blue-50">
            <td className="py-4 px-6 border-b border-gray-200 text-gray-800">
              Discharges to Hospital
            </td>
            <td className="py-4 px-6 border-b border-gray-200 text-gray-800">
              {data.discharges_hospital}
            </td>
          </tr>
          <tr className="bg-gray-50 hover:bg-blue-50">
            <td className="py-4 px-6 border-b border-gray-200 text-gray-800">
              Discharges to Higher Level
            </td>
            <td className="py-4 px-6 border-b border-gray-200 text-gray-800">
              {data.discharges_higher_level}
            </td>
          </tr>
          <tr className="bg-white hover:bg-blue-50">
            <td className="py-4 px-6 border-b border-gray-200 text-gray-800">
              Discharges to Home Community
            </td>
            <td className="py-4 px-6 border-b border-gray-200 text-gray-800">
              {data.discharges_home_community}
            </td>
          </tr>
          <tr className="bg-gray-50 hover:bg-blue-50">
            <td className="py-4 px-6 border-b border-gray-200 text-gray-800">
              Discharges due to Undesirable Circumstances
            </td>
            <td className="py-4 px-6 border-b border-gray-200 text-gray-800">
              {data.discharges_undesirable_circumstances}
            </td>
          </tr>
          <tr className="bg-white hover:bg-blue-50">
            <td className="py-4 px-6 border-b border-gray-200 text-gray-800">
              Discharges Unknown
            </td>
            <td className="py-4 px-6 border-b border-gray-200 text-gray-800">
              {data.discharges_unknown}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Discharges;
