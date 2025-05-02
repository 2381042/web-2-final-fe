import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import AxiosInstance from "../utils/AxiosInstance";
import { motion } from "framer-motion";

interface DashboardStats {
  cameras: number;
  lenses: number;
  tripods: number;
}

const fetchDashboardStats = async () => {
  const [cameras, lenses, tripods] = await Promise.all([
    AxiosInstance.get("/kamera"),
    AxiosInstance.get("/lensa"),
    AxiosInstance.get("/tripod")
  ]);

  return {
    cameras: cameras.data.length,
    lenses: lenses.data.length,
    tripods: tripods.data.length
  };
};

const StatCard = ({ title, value, to }: { title: string; value: number; to: string }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
  >
    <Link to={to} className="block">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-3xl font-bold text-blue-600 mt-2">{value}</p>
      <p className="text-sm text-gray-500 mt-2">View all {title.toLowerCase()}</p>
    </Link>
  </motion.div>
);

const Home = () => {
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ["dashboardStats"],
    queryFn: fetchDashboardStats
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-32 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your equipment management system</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Cameras" value={stats?.cameras || 0} to="/product" />
        <StatCard title="Lenses" value={stats?.lenses || 0} to="/lensa" />
        <StatCard title="Tripods" value={stats?.tripods || 0} to="/tripod" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-8 bg-white rounded-lg shadow-md p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/product/add"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md text-center transition-colors"
          >
            Add New Camera
          </Link>
          <Link
            to="/lensa/add"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md text-center transition-colors"
          >
            Add New Lens
          </Link>
          <Link
            to="/tripod/add"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md text-center transition-colors"
          >
            Add New Tripod
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;