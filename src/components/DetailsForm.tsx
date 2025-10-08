"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { companyTypes, interviewRoundTypes } from "@/data/formData"
import { TechnicalKeywordsField } from "./TechnicalKeywordsFrom"
import { candidateProfileSchema } from "@/schema/candidateProfileSchema"
import { Textarea } from "./ui/textarea"



export function DetailsForm() {
  const form = useForm<z.infer<typeof candidateProfileSchema>>({
    resolver: zodResolver(candidateProfileSchema),
   
  });
const onSubmit = async (data : z.infer<typeof candidateProfileSchema>) => {
    console.log(data)
}
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <FormField
          control={form.control}
          name="yearsOfExperience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experience</FormLabel>
              <FormControl>
                <Input placeholder="0"  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        
        <TechnicalKeywordsField form={form}/>

        <FormField
          control={form.control}
          name="companyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Type</FormLabel>
              <FormControl>
               <Select onValueChange={field.onChange}  
          value={field.value} >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Company Type</SelectLabel>
          {companyTypes.map((type,idx) =>  <SelectItem key={idx} value={type}>{type}</SelectItem>)}
        </SelectGroup>
      </SelectContent>
    </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="interviewRound"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interview Round</FormLabel>
              <FormControl>
              <Select onValueChange={field.onChange}  
          value={field.value} >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Rounds" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Interview Round</SelectLabel>
          {interviewRoundTypes.map((type,idx) =>  <SelectItem key={idx} value={type}>{type}</SelectItem>)}
        </SelectGroup>
      </SelectContent>
    </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="focusArea"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Focus Area</FormLabel>
              <FormControl>
               <Textarea placeholder="Type your skills with comma separated." id="message" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
       
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default DetailsForm;
