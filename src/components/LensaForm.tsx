import { useForm } from "react-hook-form";

export type LensaFormInput = {
  tipe: string;
  warna: string;
  ukuran: string;
};

interface LensaFormProps {
  isEdit: boolean;
  mutateFn: (data: LensaFormInput) => void;
  defaultInputData?: LensaFormInput;
}

const LensaForm = ({ isEdit, mutateFn, defaultInputData }: LensaFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LensaFormInput>({
    defaultValues: defaultInputData,
  });

  const onSubmit = (data: LensaFormInput) => {
    mutateFn(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Tipe</label>
        <input
          type="text"
          {...register("tipe", { required: "Tipe is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.tipe && (
          <p className="mt-1 text-sm text-red-600">{errors.tipe.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Warna</label>
        <input
          type="text"
          {...register("warna", { required: "Warna is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.warna && (
          <p className="mt-1 text-sm text-red-600">{errors.warna.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Ukuran</label>
        <input
          type="text"
          {...register("ukuran", { required: "Ukuran is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.ukuran && (
          <p className="mt-1 text-sm text-red-600">{errors.ukuran.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {isEdit ? "Update Lens" : "Add Lens"}
      </button>
    </form>
  );
};

export default LensaForm; 