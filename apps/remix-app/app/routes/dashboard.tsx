import { Link } from '@remix-run/react';

const Dashboard = () => {
  return (
    <div>
      <Link to="/profile">Profile</Link>
      <Link to="/">Home</Link>
    </div>
  );
};

export default Dashboard;
