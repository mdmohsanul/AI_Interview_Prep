"use client"

import { zodResolver } from "@hookform/resolvers/zod"
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

export function DetailsForm() {
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
    mode: "onBlur", // ✅ Optional, better UX for validation
  });

  const onSubmit = async (data: z.infer<typeof candidateProfileSchema>) => {
    console.log(data);
    try {
      const res = await axios.post("/api/candidate-details", data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-xl mx-auto"
      >
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
                  onChange={(e) => field.onChange(Number(e.target.value))} // ✅ safely convert string → number
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 🧩 Technical Keywords */}
        <TechnicalKeywordsField form={form} />

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

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default DetailsForm;
