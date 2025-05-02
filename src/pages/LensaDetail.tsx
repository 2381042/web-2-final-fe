import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import AxiosInstance from "../utils/AxiosInstance";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

interface LensaDetail {
  id: number;
  tipe: string;
  warna: string;
  ukuran: string;
  created_at: string;
  updated_at: string;
}

export const fetchLensaDetail = async (id: string | undefined) => {
  try {
    const response = await AxiosInstance.get<LensaDetail>(`/lensa/${id}`);
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch lens details");
    throw error;
  }
};

const deleteLensa = async (id: string) => {
  try {
    const response = await AxiosInstance.delete(`/lensa/${id}`);
    toast.success("Lens deleted successfully!");
    return response.data;
  } catch (error) {
    toast.error("Failed to delete lens");
    throw error;
  }
};

const LensaDetailSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-4">
        <div className="h-10 bg-gray-300 rounded animate-pulse w-full"></div>
        <div className="h-4 bg-gray-300 rounded animate-pulse w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded animate-pulse w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>
        <div className="h-8 bg-gray-300 rounded animate-pulse w-24"></div>
        <div className="h-4 bg-gray-300 rounded animate-pulse w-full"></div>
      </div>
    </div>
  );
};

const LensaDetail = () => {
  const { id } = useParams();
  const { data: lensa, isLoading, error } = useQuery({
    queryKey: ["lensaDetail", id],
    queryFn: () => fetchLensaDetail(id)
  });
  const deleteLensaMutation = useMutation({
    mutationFn: () => {
      if (!id) throw new Error("No lens ID provided");
      return deleteLensa(id);
    }
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (deleteLensaMutation.isSuccess) {
      navigate("/lensa", { replace: true });
    }
  }, [deleteLensaMutation.isSuccess, navigate]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          Error loading lens details. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div>
      {isLoading || !lensa ? (
        <LensaDetailSkeleton />
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
          {deleteLensaMutation.isPending && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
              <div className="flex items-center bg-white/90 px-6 py-3 rounded-lg shadow-lg">
                <span className="text-2xl mr-4 text-gray-800">Deleting...</span>
                <svg
                  className="animate-spin h-5 w-5 text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            </div>
          )}
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {lensa.tipe}
              </h1>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Color:</span> {lensa.warna}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Size:</span> {lensa.ukuran}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Created:</span> {new Date(lensa.created_at).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Last Updated:</span> {new Date(lensa.updated_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate("/lensa")}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Back to List
              </button>
              <button
                onClick={() => navigate(`/lensa/${lensa.id}/edit`)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit Lens
              </button>
              <button
                onClick={() => {
                  if (confirm("Are you sure you want to delete this lens?")) {
                    deleteLensaMutation.mutate();
                  }
                }}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete Lens
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LensaDetail; 