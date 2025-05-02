import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const RootLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="container mx-auto px-4 py-8"
      >
        <Outlet />
      </motion.main>
    </div>
  );
};

export default RootLayout;