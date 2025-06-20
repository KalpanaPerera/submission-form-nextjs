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
import { Calendar } from "@/components/ui/calendar"

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
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Submission Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" {...register("name")} />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>

        <div>
          <Label htmlFor="age">Age</Label>
          <Input id="age" type="number" {...register("age")} />
          <p className="text-red-500 text-sm">{errors.age?.message}</p>
        </div>

        <div>
          <Label>Date of Submission</Label>
          <div className="border rounded-md p-2">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => {
                setDate(d)
                setValue("date", d!)
              }}
              className="rounded-md border"
            />
            <p className="text-sm mt-1 text-muted-foreground">
              Selected: {date ? format(date, "PPP") : "No date selected"}
            </p>
            <p className="text-red-500 text-sm">{errors.date?.message}</p>
          </div>
        </div>

        <div>
          <Label>Gender</Label>
          <RadioGroup
            onValueChange={(value) => setValue("gender", value as "male" | "female")}
            defaultValue="female"
            className="flex gap-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
          </RadioGroup>
          <p className="text-red-500 text-sm">{errors.gender?.message}</p>
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" {...register("phone")} />
          <p className="text-red-500 text-sm">{errors.phone?.message}</p>
        </div>

        <Button type="submit" className="w-full">Submit</Button>
      </form>
    </div>
  )
} 