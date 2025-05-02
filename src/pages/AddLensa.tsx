import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import LensaForm, { LensaFormInput } from "../components/LensaForm";
import AxiosInstance from "../utils/AxiosInstance";
import { toast } from "react-hot-toast";

const addLensa = async (data: LensaFormInput) => {
  try {
    const response = await AxiosInstance.post("/lensa", data);
    toast.success("Lens added successfully!");
    return response.data;
  } catch (error) {
    toast.error("Failed to add lens");
    throw error;
  }
};

const AddLensa = () => {
  const addLensaMutation = useMutation({
    mutationFn: addLensa
  });
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      {addLensaMutation.isPending && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="flex items-center bg-white/90 px-6 py-3 rounded-lg shadow-lg">
            <span className="text-2xl mr-4 text-gray-800">Adding...</span>
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
      <h2 className="text-2xl font-bold mb-6">Add New Lens</h2>
      <LensaForm
        isEdit={false}
        mutateFn={(data) => {
          addLensaMutation.mutate(data, {
            onSuccess: () => {
              navigate("/lensa", { replace: true });
            }
          });
        }}
      />
    </div>
  );
};

export default AddLensa; 