import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import { axiosInstance } from "../../services/BaseUrl";
import { Config } from "../../services/Config";

function AdminDashboard() {
  const [ticketSalesData, setTicketSalesData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const getTicketSalesData = async () => {
      try {
        const res = await axiosInstance.get('/dashboard/ticket-sales',Config()); // New endpoint for ticket sales data
        setTicketSalesData(res.data); // Set the fetched data into state
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };
  
    getTicketSalesData();
  }, []);

  // Define an array of colors for the categories
  const COLORS = ["#091057", "#243642", "#D91656", "#202020", "#101010", "#303030", "#404040", "#505050", "#606060", "#707070", "#808080", "#909090", "#101112"];

  // Render loading spinner if data is being fetched
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
        <p className="ml-4 text-xl font-bold">Loading Ticket Sales Data...</p>
      </div>
    );
  }

  // Render message if no data is found
  if (ticketSalesData.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-xl font-bold text-gray-600">No Ticket Sales Data Found</p>
      </div>
    );
  }

  return (
    <div className="bg-cover bg-center min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-200 via-gray-300 to-purple-300">
      <div className="flex flex-col items-center w-full md:w-1/2 h-1/2 p-4">
        {/* Note at the top */}
        <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-4 text-center">
          Ticket Sales Overview by Category
        </h2>
        <p className="text-sm md:text-base text-gray-600 mb-6 text-center">
          This chart shows the number of tickets sold in each event category:
          Concerts, Sports, and Workshops. The numbers represent ticket sales for
          each category.
        </p>

        {/* Pie Chart */}
        <PieChart width={300} height={300}>
          <Pie
            data={ticketSalesData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {/* Apply a different color for each category */}
            {ticketSalesData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend 
            layout="horizontal"
            align="center"
            verticalAlign="bottom"
            wrapperStyle={{ fontSize: "1rem", color: "#333" }} // Larger and colored text for the legend
          />
        </PieChart>
      </div>
    </div>
  );
}

export default AdminDashboard;
