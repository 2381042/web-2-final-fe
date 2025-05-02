import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AxiosInstance from "../utils/AxiosInstance";
import { toast } from "react-hot-toast";

interface Tripod {
  id: number;
  merek: string;
  warna: string;
  stok: number;
}

const TripodDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tripod, setTripod] = useState<Tripod | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTripod = async () => {
      try {
        const response = await AxiosInstance.get(`/tripod/${id}`);
        setTripod(response.data);
      } catch (error) {
        toast.error("Failed to fetch tripod details");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTripod();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this tripod?")) {
      try {
        await AxiosInstance.delete(`/tripod/${id}`);
        toast.success("Tripod deleted successfully");
        navigate("/tripod");
      } catch (error) {
        toast.error("Failed to delete tripod");
        console.error(error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!tripod) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">Tripod not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{tripod.merek}</h1>
          <div className="space-x-4">
            <button
              onClick={() => navigate(`/tripod/${tripod.id}/edit`)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Brand</p>
              <p className="font-medium">{tripod.merek}</p>
            </div>
            <div>
              <p className="text-gray-600">Color</p>
              <p className="font-medium">{tripod.warna}</p>
            </div>
            <div>
              <p className="text-gray-600">Stock</p>
              <p className="font-medium">{tripod.stok}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripodDetail; 