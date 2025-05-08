import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import dayjs from 'dayjs';
import Navbar from './Navbar';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    LineController,  // ✅ NEW
    BarController,   // ✅ (Safe to add both)
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { useState,useEffect } from 'react';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    LineController,  // ✅
    BarController,   // ✅
    Title,
    Tooltip,
    Legend
  );
  

// Reuse from your existing style
const Card = ({ children, className = '', ...props }) => (
  <div className={`bg-white border shadow-sm rounded-xl w-full ${className}`} {...props}>
    {children}
  </div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const BookingGraphDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [range, setRange] = useState('week');
//   const [graphData, setGraphData] = useState({});
const [graphData, setGraphData] = useState({
    labels: [],
    datasets: [],
  });
  

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    if (bookings.length) processData();
  }, [range, bookings]);

  const fetchBookings = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/bookings');
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error('Failed to fetch bookings', err);
    }
  };

  const processData = () => {
    const now = dayjs();
    const weekStart = now.startOf('week');
    const monthStart = now.startOf('month');
    const threeMonthsAgo = now.subtract(3, 'month').startOf('month');
    const rangeStart = range === 'week' ? weekStart : range === 'month' ? monthStart : threeMonthsAgo;

    const data = {};
    bookings.forEach((b) => {
      const createdAt = dayjs(b.createdAt);
      if (!createdAt.isValid() || createdAt.isBefore(rangeStart)) return;
      const label = createdAt.format('DD MMM');
      data[label] = (data[label] || 0) + 1;
    });

    const labels = Object.keys(data).sort((a, b) =>
      dayjs(a, 'DD MMM').unix() - dayjs(b, 'DD MMM').unix()
    );

    setGraphData({
      labels,
      datasets: [
        {
          label: 'Number of Bookings',
          data: labels.map((l) => data[l]),
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderRadius: 8,
          maxBarThickness: 40, // 👈 Add this line
          categoryPercentage: 0.6,
barPercentage: 0.5,

        },
      ]
      
    });
  };

  return (
    <div className="min-h-screen w-[102%] bg-white text-black flex flex-col lg:flex-row">
      <Navbar />
      <main className="flex-1 mt-4 overflow-y-auto px-4 md:px-8 py-6 ml-0 lg:ml-64">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <h1 className="text-3xl md:text-3xl ml-[1%] font-semibold">Dashboard</h1>
          <select
            className="border px-3 py-2 rounded text-sm bg-white shadow-sm"
            value={range}
            onChange={(e) => setRange(e.target.value)}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="threeMonths">Last 3 Months</option>
          </select>
        </div>


<div className="flex flex-col lg:flex-row justify-center items-center gap-10 mt-[5%]">

{/* Bar Chart */}
<Card className=" max-w-[500px] shadow-md">
  <CardContent>
    <h2 className="text-sm font-medium mb-2">Bookings</h2>
    <div className="w-full h-[500px] md:h-[400px]">
      <Bar
        key={`bar-${range}`}
        data={graphData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: true, position: 'top' } },
          scales: {
            y: { beginAtZero: true, suggestedMax: 10, ticks: { stepSize: 1 } },
            x: {
              ticks: { autoSkip: false, maxRotation: 45, minRotation: 20 },
            },
          },
        }}
      />
    </div>
  </CardContent>
</Card>

{/* Line Chart */}
<Card className=" max-w-[500px] shadow-md">
  <CardContent>
    <h2 className="text-sm font-medium mb-2">Bookings </h2>
    <div className="w-full h-[500px] md:h-[400px]">
      {graphData?.labels?.length && graphData?.datasets?.[0] ? (
        <Line
          key={`line-${range}`}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              legend: { display: true, position: 'top' },
            },
            scales: {
              y: { beginAtZero: true, suggestedMax: 10, ticks: { stepSize: 1 } },
              x: {
                ticks: { autoSkip: false, maxRotation: 45, minRotation: 20 },
              },
            },
          }}
          data={{
            labels: graphData.labels,
            datasets: [
              {
                ...graphData.datasets[0],
                fill: false,
                borderColor: 'rgba(59,130,246,1)',
                tension: 0.3,
                pointRadius: 4,
              },
            ],
          }}
        />
      ) : (
        <div className="text-center text-gray-500 py-10 text-sm">No data available</div>
      )}
    </div>
  </CardContent>
</Card>

</div>


      </main>
    </div>
  );
};

export default BookingGraphDashboard;
