import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Tab({ items, week, month, year}) {
  const tabsData = [
    {
      label: "Weekly",
    },
    {
      label: "Monthly",
    },
    {
      label: "Yearly",
    },
  ];
  
  const data = {};
  const options = {
    layout: {
      padding: 50
  }
  };

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  function showTimeSales(range) {
    var salesData
    if (range == 'Weekly') salesData = week
    else if (range == 'Monthly') salesData = month
    else salesData = year
    console.log(salesData)

    data.labels = salesData.slice().reverse().map((timeRange) => {   
      const year = timeRange._id.year;

      if (range == 'Weekly') {
      const week = timeRange._id.week;
      // Get the first and last day of the week using ISO week dates (ISO-8601)
      const startDate = new Date(year, 0, 1); // Start with Jan 1st
      startDate.setDate(startDate.getDate() + Math.floor((week - 1) * 7)); // Adjust for week number
    
      const endDate = new Date(startDate.getTime());
      endDate.setDate(endDate.getDate() + 6); // Add 6 days to get the end of the week
    
      // Format the dates as desired (Month Day, YYYY)
      const formattedStartDate = startDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short', // Use 'short' for month name abbreviation (Jan)
        day: 'numeric'
      });
      const formattedEndDate = endDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    
      return `${formattedStartDate} - ${formattedEndDate}`;
    } else if (range == 'Monthly') {
      return new Date(year, timeRange._id.month - 1).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short'
      });
    }
    return year;
    });
    
    data.datasets = [
      {
        label: "Total Sales",
        data: salesData.slice().reverse().map((timeRange) => timeRange.totalSales),
        fill: false,
        borderColor: "#EEDBDB",
        tension: 0.1,
      },
    ];

    return salesData.map((timeRange) => {
      var formatDate
      const year = timeRange._id.year;

      if (range == 'Weekly') {
      const week = timeRange._id.week;
    
      // Get the first and last day of the week using ISO week dates
      const startDate = new Date(year, 0, 1); // Start with Jan 1st
      startDate.setDate(startDate.getDate() + Math.floor((week - 1) * 7));
    
      const endDate = new Date(startDate.getTime());
      endDate.setDate(endDate.getDate() + 6); // Add 6 days to get the end of the week
    
      // Format the dates as "Month Day, YYYY"
      const formattedStartDate = startDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short', // Use 'short' for month name abbreviation (Jan)
        day: 'numeric'
      });
      const formattedEndDate = endDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      formatDate = `${formattedStartDate} - ${formattedEndDate}`;
    } else if (range == 'Monthly') {
      formatDate = new Date(year, timeRange._id.month - 1).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short'
      });
    }
    else formatDate = year;
    
    return (
      <div
        key={timeRange.range}
        className="flex items-center justify-between border-b py-2"
      >
        <p>{formatDate}</p>
        <p>Total: P{timeRange.totalSales}</p>
      </div>
      );
    });
  }

  function getOverallSales() {
    let totalSales = 0;

    items.forEach(item => {
      if (item.status == 1)
        item.products.forEach(product => {
            totalSales += product.count * product.price;
        });
    });

    return totalSales
  }



  return (
    <div>
      <div className="flex space-x-3 border-b">
        {/* Loop through tab data and render button for each. */}
        {tabsData.map((tab, idx) => {
          return (
            <button
              key={idx}
              className={`py-2 border-b-4 font-bold transition-colors duration-300 w-full ${
                idx === activeTabIndex
                  ? "border-[#EEDBDB]"
                  : "border-transparent hover:border-gray-200"
              }`}
              // Change the active tab on click.
              onClick={() => setActiveTabIndex(idx)}>
              {tab.label}
            </button>
          );
        })}
      </div>
      {/* Show active tab content. */}
      <div className="py-4">
        <div className="flex flex-col gap-4">
          <Line options={ options } data={ data }/>
          {showTimeSales(tabsData[activeTabIndex].label)}
          <div className="flex flex-row justify-center w-full h-16 bg-[#EEDBDB] rounded-xl px-4 py-2 items-center">
            <div className="flex items-center gap-3">
                <h1 className="font-black">Total Overall Sales: {getOverallSales()}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
