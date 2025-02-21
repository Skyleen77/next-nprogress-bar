import { Link } from '@remix-run/react';

const Dashboard = () => {
  return (
    <div>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/">Home</Link>
    </div>
  );
};

export default Dashboard;
