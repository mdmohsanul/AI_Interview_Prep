"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { companyTypes, interviewRoundTypes } from "@/data/formData";
import { TechnicalKeywordsField } from "./TechnicalKeywordsFrom";
import { candidateProfileSchema } from "@/schema/candidateProfileSchema";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useResultContext } from "@/context/ResultContext";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function DetailsForm() {
  const { setApiResponse } = useResultContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(candidateProfileSchema),
    defaultValues: {
      job_role: "",
      yearsOfExperience: 0,
      technicalKeywords: [],
      companyType: "",
      interviewRound: "",
      focusArea: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: z.infer<typeof candidateProfileSchema>) => {
    setLoading(true);
    setError(null);
    // console.log("Form submitted:", data);

    // Save form data in sessionStorage
    try {
      sessionStorage.setItem("formData", JSON.stringify(data));
    } catch (err) {
      console.warn("Could not save to sessionStorage:", err);
    }

    try {
      const res = await axios.post("/api/candidate-details", data);

      if (res.status === 201 || res.data.success) {
        // console.log("API response:", res.data);
        setApiResponse(res.data.message);
        router.replace("/result");
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mx-5  ">
        <div className="grid grid-cols-1 md:grid-cols-2  gap-x-6 gap-y-5">
          {/* 🧩 Job Role */}
          <FormField
            control={form.control}
            name="job_role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input placeholder="Frontend Developer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 🧩 Experience */}
          <FormField
            control={form.control}
            name="yearsOfExperience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 🧩 Company Type */}
          <FormField
            control={form.control}
            name="companyType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select company type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Company Type</SelectLabel>
                        {companyTypes.map((type, idx) => (
                          <SelectItem key={idx} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 🧩 Interview Round */}
          <FormField
            control={form.control}
            name="interviewRound"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interview Round</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select interview round" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Interview Round</SelectLabel>
                        {interviewRoundTypes.map((type, idx) => (
                          <SelectItem key={idx} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* 🧩 Technical Keywords */}
          <TechnicalKeywordsField
            control={form.control}
            name="technicalKeywords"
          />

          {/* 🧩 Focus Area */}
          <FormField
            control={form.control}
            name="focusArea"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Focus Area</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter skills separated by commas, e.g. React, Node, MongoDB"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && <p className="text-red-600 text-center">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default DetailsForm;
