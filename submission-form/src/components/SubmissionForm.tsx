"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { submissionFormSchema } from "@/lib/submission.schema"
import { z } from "zod"
import { useState } from "react"
import { format } from "date-fns"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"

const FormField = ({ label, htmlFor, children, error }: { label: string, htmlFor: string, children: React.ReactNode, error?: string }) => (
  <div className="w-full space-y-2">
    <Label htmlFor={htmlFor} className="text-base">{label}</Label>
    {children}
    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
  </div>
)

type FormData = z.infer<typeof submissionFormSchema>

export default function SubmissionForm() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(submissionFormSchema),
  })

  const onSubmit = (data: FormData) => {
    console.log("Form Submitted", data)
  }

  return (
    <div className="max-w-full mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Submission Form</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          <FormField label="First Name *" htmlFor="name" error={errors.name?.message}>
            <Input id="fname" placeholder="Enter your first name" {...register("name")} />
          </FormField>

          <FormField label="Last Name *" htmlFor="name" error={errors.name?.message}>
            <Input id="lname" placeholder="Enter your last name" {...register("name")} />
          </FormField>

          <FormField label="Email *" htmlFor="email" error={errors.email?.message}>
            <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
          </FormField>

          <FormField label="Phone Number (WhatsApp) *" htmlFor="phone" error={errors.phone?.message}>
            <Input id="phone" type="tel" placeholder="e.g. +94771234567" {...register("phone")} />
          </FormField>

          <FormField label="Age *" htmlFor="age" error={errors.age?.message}>
            <Input id="age" type="number" placeholder="Enter your age" {...register("age")} />
          </FormField>

          <FormField label="Date of Birth *" htmlFor="date" error={errors.date?.message}>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => {
                    setDate(d)
                    setValue("date", d!)
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </FormField>

          <FormField label="Gender *" htmlFor="gender" error={errors.gender?.message}>
            <RadioGroup
              onValueChange={(value) => setValue("gender", value as "male" | "female" | "other")}
              defaultValue="female"
              className="flex flex-wrap gap-4 mt-2"
            >
              <div className="flex items-center space-x-2 font-normal">
                <RadioGroupItem value="female" id="female" />
                <span>Female</span>
              </div>
              <div className="flex items-center space-x-2 font-normal">
                <RadioGroupItem value="male" id="male" />
                <span>Male</span>
              </div>
              <div className="flex items-center space-x-2 font-normal">
                <RadioGroupItem value="other" id="other" />
                <span>Other</span>
              </div>
            </RadioGroup>
          </FormField>

          <FormField label="Upload Resume / File *" htmlFor="file" error={errors.file?.message}>
            <Input id="file" type="file" {...register("file")} />
          </FormField>

          <FormField label="Preferred Mode (Optional)" htmlFor="mode">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2 font-normal">
                <Checkbox id="onsite" {...register("preferredMode.onsite")} />
                <span>Onsite</span>
              </div>
              <div className="flex items-center space-x-2 font-normal">
                <Checkbox id="remote" {...register("preferredMode.remote")} />
                <span>Remote</span>
              </div>
              <div className="flex items-center space-x-2 font-normal">
                <Checkbox id="hybrid" {...register("preferredMode.hybrid")} />
                <span>Hybrid</span>
              </div>
            </div>
          </FormField>

          <Button type="submit" className="w-full">Submit</Button>
        </form>
      </div>
    </div>
  )
}
