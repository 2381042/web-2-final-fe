import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AxiosInstance from "../utils/AxiosInstance";
import { toast } from "react-hot-toast";

interface Tripod {
  id: number;
  merek: string;
  warna: string;
  stok: number;
}

const Tripod = () => {
  const [tripods, setTripods] = useState<Tripod[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTripods = async () => {
      try {
        const response = await AxiosInstance.get("/tripod");
        setTripods(response.data);
      } catch (error) {
        toast.error("Failed to fetch tripods");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTripods();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this tripod?")) {
      try {
        await AxiosInstance.delete(`/tripod/${id}`);
        setTripods(tripods.filter((tripod) => tripod.id !== id));
        toast.success("Tripod deleted successfully");
      } catch (error) {
        toast.error("Failed to delete tripod");
        console.error(error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Tripods</h1>
        <Link
          to="/tripod/add"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Tripod
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tripods.map((tripod) => (
          <div
            key={tripod.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{tripod.merek}</h2>
              <p className="text-gray-600 mb-2">Color: {tripod.warna}</p>
              <p className="text-gray-600 mb-4">Stock: {tripod.stok}</p>
              <div className="flex justify-between items-center">
                <Link
                  to={`/tripod/${tripod.id}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  View Details
                </Link>
                <div className="space-x-2">
                  <Link
                    to={`/tripod/${tripod.id}/edit`}
                    className="text-green-500 hover:text-green-700"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(tripod.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tripod; 