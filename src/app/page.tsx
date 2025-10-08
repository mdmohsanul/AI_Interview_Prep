import DetailsForm from "@/components/DetailsForm";

export default function Home() {
  return (
    <div className="min-h-screen w-full ">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-center  text-3xl font-semibold text-gray-700 md:text-5xl py-5">
          Job Interview Coach
        </h1>
        <div className="max-w-6xl mx-auto mt-8">
          <DetailsForm />
        </div>
      </div>
    </div>
  );
}
