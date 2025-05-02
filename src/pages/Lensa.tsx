import { useQuery } from "@tanstack/react-query";
import AxiosInstance from "../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

interface Lensa {
  id: number;
  tipe: string;
  warna: string;
  ukuran: string;
  created_at: string;
  updated_at: string;
}

const fetchLensaList = async () => {
  try {
    const response = await AxiosInstance.get<Lensa[]>("/lensa");
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch lens list");
    throw error;
  }
};

const LensaSkeleton = () => {
  return (
    <div className="group relative">
      <div className="mt-4 flex justify-between">
        <div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          <div className="mt-1 h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
      </div>
    </div>
  );
};

const Lensa = () => {
  const { data: lensaList, isLoading, error } = useQuery({
    queryKey: ["lensaList"],
    queryFn: fetchLensaList,
  });

  const navigate = useNavigate();

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          Error loading lens list. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={() => navigate("/lensa/add")}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v16m8-8H4"
          ></path>
        </svg>
      </button>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            List of Lenses
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <LensaSkeleton key={index} />
                ))
              : lensaList?.map((lensa) => (
                  <div
                    key={lensa.id}
                    className="group relative p-4 border rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => navigate(`/lensa/${lensa.id}`)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {lensa.tipe}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Color: {lensa.warna}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          Size: {lensa.ukuran}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lensa; 