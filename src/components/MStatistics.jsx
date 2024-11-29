import React, { useEffect, useState } from "react";
import MSidebar from "./MSidebar";
import MHeader from "./MHeader";
import MNavbar from "./MNavbar";
import ApexCharts from "apexcharts";

function MStatistics() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode === "enabled";
  });

  const [sidebarShrink, setSidebarShrink] = useState(false);

  const toggleSidebar = () => {
    setSidebarShrink(!sidebarShrink);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode ? "enabled" : "disabled");

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const chartOptions = {
      colors: ["#1A56DB", "#FDBA8C"],
      series: [
        {
          name: "Organic",
          color: "#1A56DB",
          data: [
            { x: "Mon", y: 231 },
            { x: "Tue", y: 122 },
            { x: "Wed", y: 63 },
            { x: "Thu", y: 421 },
            { x: "Fri", y: 122 },
            { x: "Sat", y: 323 },
            { x: "Sun", y: 111 },
          ],
        },
        {
          name: "Social media",
          color: "#FDBA8C",
          data: [
            { x: "Mon", y: 232 },
            { x: "Tue", y: 113 },
            { x: "Wed", y: 341 },
            { x: "Thu", y: 224 },
            { x: "Fri", y: 522 },
            { x: "Sat", y: 411 },
            { x: "Sun", y: 243 },
          ],
        },
      ],
      chart: {
        type: "bar",
        height: "320px",
        fontFamily: "Inter, sans-serif",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "70%",
          borderRadiusApplication: "end",
          borderRadius: 8,
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        style: {
          fontFamily: "Inter, sans-serif",
        },
      },
      states: {
        hover: {
          filter: {
            type: "darken",
            value: 1,
          },
        },
      },
      stroke: {
        show: true,
        width: 0,
        colors: ["transparent"],
      },
      grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: -14,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        floating: false,
        labels: {
          show: true,
          style: {
            fontFamily: "Inter, sans-serif",
            cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
      fill: {
        opacity: 1,
      },
    };

    const areaChartOptions = {
      chart: {
        type: "area",
        height: 350,
      },
      series: [
        {
          name: "Minutes mentored",
          data: [31, 40, 28, 51, 42, 109, 100],
        },
      ],
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      },
    };

    const sessionRSVPOptions = {
      series: [
        {
          name: "Developer Edition",
          data: [1500, 1418, 1456, 1526, 1356, 1256],
          color: "#1A56DB",
        },
        {
          name: "Designer Edition",
          data: [643, 413, 765, 412, 1423, 1731],
          color: "#7E3BF2",
        },
      ],
      chart: {
        type: "area",
        height: "100%",
        fontFamily: "Inter, sans-serif",
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        enabled: true,
        x: {
          show: false,
        },
      },
      legend: {
        show: true,
      },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.55,
          opacityTo: 0,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 6,
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: [
          "01 February",
          "02 February",
          "03 February",
          "04 February",
          "05 February",
          "06 February",
          "07 February",
        ],
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
    };

    const bookingsChartOptions = {
      ...chartOptions,
      series: [
        {
          name: "Bookings",
          color: "#1A56DB",
          data: [
            { x: "00", y: 6 },
            { x: "04", y: 4 },
            { x: "08", y: 10 },
            { x: "12", y: 12 },
            { x: "16", y: 8 },
            { x: "20", y: 16 },
            { x: "24", y: 12 },
          ],
        },
      ],
    };

    const areaChart = new ApexCharts(
      document.getElementById("area-chart"),
      areaChartOptions
    );
    const bookingsChart = new ApexCharts(
      document.getElementById("bookings-chart"),
      bookingsChartOptions
    );
    const reviewsChart = new ApexCharts(
      document.getElementById("reviews-chart"),
      chartOptions
    );
    const sessionChart = new ApexCharts(
      document.getElementById("legend-chart"),
      sessionRSVPOptions
    );

    areaChart.render();
    bookingsChart.render();
    reviewsChart.render();
    sessionChart.render();

    return () => {
      areaChart.destroy();
      bookingsChart.destroy();
      reviewsChart.destroy();
      sessionChart.destroy();
    };
  }, []);

  return (
    <div
      className={`flex h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <MSidebar
        sidebarShrink={sidebarShrink}
        isDarkMode={darkMode}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <MHeader
          toggleSidebar={toggleSidebar}
          sidebarShrink={sidebarShrink}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <MNavbar />
        <div
          id="statistics-content"
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 overflow-hidden">
            <h2 className="text-xl font-semibold mb-2">Minutes mentored</h2>
            <p className="text-6xl font-bold text-blue-400 mb-4">23,456</p>
            <div id="area-chart" className="w-full h-64"></div>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
            {/* Bookings */}
            <div className="w-full md:w-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-2">Bookings</h2>
              <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">80</p>
              <div id="bookings-chart" className="w-full h-64"></div>
            </div>

            {/* Reviews */}
            <div className="w-full md:w-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-2">Reviews</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Weekly Overview</p>
              <div id="reviews-chart" className="w-full h-40"></div>
              <p className="text-sm text-green-600 dark:text-green-400 mt-2">😊 You are doing good!</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Session RSVPs</h2>
            <p className="text-5xl font-bold text-blue-400 mb-4">890</p>
            <div id="legend-chart" className="w-full h-64"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MStatistics;