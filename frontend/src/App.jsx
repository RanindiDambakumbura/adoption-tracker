import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://adoption-tracker-api.onrender.com/api/usage')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  const labels = data.map((person) => `${person.name} (${person.team})`);
  const totals = data.map((person) =>
    person.weekly_uses.reduce((sum, w) => sum + w.uses, 0)
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: 'AI Tool Uses (last 3 weeks)',
        data: totals,
        backgroundColor: totals.map((t) =>
          t >= 8 ? '#22c55e' : t >= 4 ? '#eab308' : '#ef4444'
        ),
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Total AI Tool Uses' },
      },
    },
  };

  const highCount = totals.filter((t) => t >= 8).length;
  const medCount = totals.filter((t) => t >= 4 && t < 8).length;
  const lowCount = totals.filter((t) => t < 4).length;

  return (
    <div style={{
      padding: '2.5rem',
      fontFamily: 'system-ui, sans-serif',
      maxWidth: '900px',
      margin: '0 auto'
    }}>
      <h1 style={{ marginBottom: '0.25rem' }}>AI Adoption Tracker</h1><br/>
      <p style={{ color: '#666', marginBottom: '1.5rem' }}>
        Team usage of AI tools over the last 3 weeks
      </p>

      <div style={{
        display: 'flex',
        gap: '1.5rem',
        marginBottom: '2rem',
        fontSize: '0.95rem'
      }}>
        <span>🟢 High adoption ({highCount})</span>
        <span>🟡 Medium adoption ({medCount})</span>
        <span>🔴 Needs support ({lowCount})</span>
      </div>

      {data.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <Bar data={chartData} options={chartOptions} />
      )}

      <p style={{ marginTop: '2rem', fontSize: '0.85rem', color: '#999' }}>
        Note: usage data shown here is simulated for this prototype. In production,
        this would pull from real integrations (Slack activity, browser extension
        events, or LMS logs).
      </p>
    </div>
  );
}

export default App;