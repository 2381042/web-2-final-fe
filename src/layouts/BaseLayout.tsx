import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const BaseLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="container mx-auto px-4 py-8"
      >
        <Outlet />
      </motion.main>
    </div>
  );
};

export default BaseLayout;