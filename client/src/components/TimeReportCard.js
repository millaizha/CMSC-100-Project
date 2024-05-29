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

export default function Tab({ items }) {
  const tabsData = [
    {
      label: "Weekly",
      content: null
    },
    {
      label: "Monthly",
      content: null
    },
    {
      label: "Annual",
      content: null
    },
  ];
  
  const data = {};
  const options = {
    layout: {
      padding: 50
  }
  };

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [weeklySalesData, setWeeklySalesData] = useState([]);
  const [monthlySalesData, setMonthlySalesData] = useState([]);
  const [annualSalesData, setAnnualSalesData] = useState([]);

  useEffect(() => {
    // TODO: efficient change data based on selection
    const calculateWeeklySales = () => {
      const weeklySales = {};
  
      items.forEach((item) => {
        if (item.status == 1){ 
          const itemDate = new Date(item.dateTimeOrdered);
          const weekNumber = getWeekNumber(itemDate);
    
          // Calculate first and last day of the week
          const firstDayOfWeek = getFirstDayOfWeek(itemDate);
          const lastDayOfWeek = getLastDayOfWeek(firstDayOfWeek);
    
          const weekString = `${firstDayOfWeek.toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' })} - ${lastDayOfWeek.toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' })}`;
    
          if (!weeklySales[weekNumber]) {
            weeklySales[weekNumber] = { range: weekString, total: 0 };
          }
    
          weeklySales[weekNumber].total += item.products.reduce(
            (acc, product) => acc + product.count * product.price,
            0
          );}
      });
  
      setWeeklySalesData(Object.values(weeklySales)); // Convert to array
    };
  
    calculateWeeklySales();
  }, []);

  useEffect(() => {
    const calculateMonthlySales = () => {
      const monthlySales = {};

      items.forEach((item) => {
        if (item.status == 1){ 
          const itemDate = new Date(item.dateTimeOrdered);
          const month = itemDate.toLocaleDateString('default', { month: 'long', year: 'numeric' });

          if (!monthlySales[month]) {
            monthlySales[month] = { range: month, total: 0 };
          }

          monthlySales[month].total += item.products.reduce(
            (acc, product) => acc + product.count * product.price,
            0
          );}
      });

      setMonthlySalesData(Object.values(monthlySales)); // Convert to array
    };

    calculateMonthlySales();
  }, []);

  useEffect(() => {
    const calculateAnnualSales = () => {
      const annualSales = {};

      items.forEach((item) => {
        if (item.status == 1){ 
          const itemDate = new Date(item.dateTimeOrdered);
          const year = itemDate.getFullYear();

          if (!annualSales[year]) {
            annualSales[year] = { range: year, total: 0 };
          }

          annualSales[year].total += item.products.reduce(
            (acc, product) => acc + product.count * product.price,
            0
          );}
      });

      setAnnualSalesData(Object.values(annualSales));
    };

    calculateAnnualSales();
  }, []);


  useEffect(() => {
    const updateTabsData = () => {
      tabsData[0].content = weeklySalesData; // Assign weeklySalesData to "Weekly" tab content
      tabsData[1].content = monthlySalesData;
      tabsData[2].content = annualSalesData;
    };

    updateTabsData();
  }, [weeklySalesData, monthlySalesData, annualSalesData]);

  const getFirstDayOfWeek = (date) => {
    date.setHours(0, 0, 0, 0); // Set time to midnight
    date.setDate(date.getDate() - (date.getDay() === 0 ? 7 : date.getDay()) + 1); // Adjust for ISO week
    return date;
  };
  
  const getLastDayOfWeek = (date) => {
    const firstDay = getFirstDayOfWeek(date);
    return new Date(firstDay.getTime() + 6 * 24 * 60 * 60 * 1000); // Add 6 days to get the last day
  };

  const getWeekNumber = (date) => {
    // Improved getWeekNumber function (consider locale and first week of year)
    date.setHours(0, 0, 0, 0); // Set time to midnight
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7); // Adjust for ISO week

    const start = new Date(date.getFullYear(), 0, 0); // Start of current year
    const startDay = start.getDay();
    const dif = date - start;
    const oneDay = 1000 * 60 * 60 * 24;

    return Math.floor((dif + (startDay * oneDay) - ((startDay === 0) ? oneDay : 0)) / (oneDay * 7));
  };

  function showTimeSales(range) {
    var salesData
    if (range == 'Weekly') salesData = weeklySalesData
    else if (range == 'Monthly') salesData = monthlySalesData
    else salesData = annualSalesData

    data.labels = salesData.map((timeRange) => timeRange.range);
    data.datasets = [
      {
        label: "Total Sales",
        data: salesData.map((timeRange) => timeRange.total),
        fill: false,
        borderColor: "#EEDBDB",
        tension: 0.1,
      },
    ];

    return salesData.map((timeRange) => {
      return (
        <div
          key={timeRange.range}
          className="flex items-center justify-between border-b py-2">
          <p>{timeRange.range}</p>
          <p>Total: {timeRange.total}</p>
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
