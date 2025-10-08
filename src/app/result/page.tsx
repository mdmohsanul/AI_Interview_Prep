"use client";

import { useResultContext } from "@/context/ResultContext";
import { InterviewQuestionCard } from "@/components/InterviewQuestionCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const ResultPage = () => {
  const { apiResponse, setApiResponse } = useResultContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState(null);

  // ✅ load sessionStorage data safely on client
  useEffect(() => {
    const data = sessionStorage.getItem("formData");
    if (data) setFormData(JSON.parse(data));
  }, []);

  const nextQuestionHandler = async () => {
    if (!formData) {
      setError("No form data found. Please submit the form first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("/api/candidate-details", formData);

      if (res.status === 201 || res.data.success) {
        console.log("API response:", res.data);
        setApiResponse(res.data.message);
      } else {
        console.warn("Unexpected API response:", res.data);
        setError("Unexpected response from server.");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data || err.message);
        setError(err.response?.data?.error || err.message);
      } else {
        console.error("Unknown error:", err);
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!apiResponse)
    return (
      <p className="text-center mt-10">
        No result available.{" "}
        <Link href="/" className="text-blue-500 underline">
          Home
        </Link>
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto my-10 flex flex-col gap-6">
      <Link href="/" className="text-blue-500 underline self-start">
        Home
      </Link>

      <InterviewQuestionCard questionData={apiResponse} />

      {error && <p className="text-red-600 text-center">{error}</p>}

      <Button
        className="w-2/5 mx-auto"
        onClick={nextQuestionHandler}
        disabled={loading || !formData} // disable if loading or no data
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin mr-2" /> Fetching...
          </>
        ) : (
          "Next Question"
        )}
      </Button>
    </div>
  );
};

export default ResultPage;
