import { z } from "zod";

export const candidateProfileSchema = z.object({
  job_role: z
    .string()
    .min(2, "Job role is required and must be at least 2 characters long"),

  yearsOfExperience: z.number()
  .min(0, "Experience cannot be negative")
  .max(50, "Please enter a realistic number of years"),


  technicalKeywords: z
    .array(z.string().min(1))
    .min(1, "Please select at least one technical keyword"),

  companyType: z
    .string()
    .min(1, "Please select a company type"),

  interviewRound: z
    .string()
    .min(1, "Please select an interview round"),

  focusArea: z
    .string()
    ,
});

export type CandidateProfileForm = z.infer<typeof candidateProfileSchema>;