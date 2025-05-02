import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LensaForm, { LensaFormInput } from "../components/LensaForm";
import AxiosInstance from "../utils/AxiosInstance";
import { toast } from "react-hot-toast";

interface LensaDetail {
  id: number;
  tipe: string;
  warna: string;
  ukuran: string;
  created_at: string;
  updated_at: string;
}

const fetchLensaDetail = async (id: string | undefined) => {
  try {
    const response = await AxiosInstance.get<LensaDetail>(`/lensa/${id}`);
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch lens details");
    throw error;
  }
};

const editLensa = async (data: LensaFormInput, id: string | undefined) => {
  try {
    const response = await AxiosInstance.patch(`/lensa/${id}`, data);
    toast.success("Lens updated successfully!");
    return response.data;
  } catch (error) {
    toast.error("Failed to update lens");
    throw error;
  }
};

const EditLensa = () => {
  const { id } = useParams();
  const editLensaMutation = useMutation({
    mutationFn: (data: LensaFormInput) => editLensa(data, id)
  });
  const getLensaDetail = useQuery({
    queryKey: ["lensaDetail", id],
    queryFn: () => fetchLensaDetail(id)
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (editLensaMutation.isSuccess) {
      navigate("/lensa", { replace: true });
    }
  }, [editLensaMutation.isSuccess, navigate]);

  // Transform the data to match the form input structure
  const formData = getLensaDetail.data ? {
    tipe: getLensaDetail.data.tipe,
    warna: getLensaDetail.data.warna,
    ukuran: getLensaDetail.data.ukuran
  } : undefined;

  return (
    <div className="container mx-auto px-4 py-8">
      {(editLensaMutation.isPending || getLensaDetail.isFetching) && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="flex items-center bg-white/90 px-6 py-3 rounded-lg shadow-lg">
            <span className="text-2xl mr-4 text-gray-800">Loading...</span>
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
      <h2 className="text-2xl font-bold mb-6">Edit Lens</h2>
      <LensaForm
        isEdit={true}
        mutateFn={editLensaMutation.mutate}
        defaultInputData={formData}
      />
    </div>
  );
};

export default EditLensa; 