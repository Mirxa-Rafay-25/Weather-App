"use client"

import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import ThemeToggle from "@/components/theme-toggle"
import Link from "next/link"
import { ArrowLeft, User, MapPin, Mail, Phone } from 'lucide-react'

const validationSchema = Yup.object({
  firstName: Yup.string().min(2, "First name must be at least 2 characters").required("First name is required"),
  lastName: Yup.string().min(2, "Last name must be at least 2 characters").required("Last name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9+\-\s()]+$/, "Invalid phone number")
    .required("Phone number is required"),
  city: Yup.string().min(2, "City must be at least 2 characters").required("City is required"),
  country: Yup.string().min(2, "Country must be at least 2 characters").required("Country is required"),
})

export default function UserDetails() {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    country: "",
  }

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", values)
      alert("User details saved successfully!")
      resetForm()
      setSubmitting(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white">User Details</h1>
          </div>
          <ThemeToggle />
        </div>

        {/* Form Card */}
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center gap-2">
                <User className="h-6 w-6" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting, errors, touched }) => (
                  <Form className="space-y-6">
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-white mb-2 block">
                          First Name
                        </Label>
                        <Field
                          as={Input}
                          id="firstName"
                          name="firstName"
                          placeholder="Enter your first name"
                          className={`bg-white/20 border-white/30 text-white placeholder:text-white/70 ${
                            errors.firstName && touched.firstName ? "border-red-400" : ""
                          }`}
                        />
                        <ErrorMessage name="firstName" component="div" className="text-red-300 text-sm mt-1" />
                      </div>

                      <div>
                        <Label htmlFor="lastName" className="text-white mb-2 block">
                          Last Name
                        </Label>
                        <Field
                          as={Input}
                          id="lastName"
                          name="lastName"
                          placeholder="Enter your last name"
                          className={`bg-white/20 border-white/30 text-white placeholder:text-white/70 ${
                            errors.lastName && touched.lastName ? "border-red-400" : ""
                          }`}
                        />
                        <ErrorMessage name="lastName" component="div" className="text-red-300 text-sm mt-1" />
                      </div>
                    </div>

                    {/* Contact Fields */}
                    <div>
                      <Label htmlFor="email" className="text-white mb-2  flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email Address
                      </Label>
                      <Field
                        as={Input}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email address"
                        className={`bg-white/20 border-white/30 text-white placeholder:text-white/70 ${
                          errors.email && touched.email ? "border-red-400" : ""
                        }`}
                      />
                      <ErrorMessage name="email" component="div" className="text-red-300 text-sm mt-1" />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-white mb-2  flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone Number
                      </Label>
                      <Field
                        as={Input}
                        id="phone"
                        name="phone"
                        placeholder="Enter your phone number"
                        className={`bg-white/20 border-white/30 text-white placeholder:text-white/70 ${
                          errors.phone && touched.phone ? "border-red-400" : ""
                        }`}
                      />
                      <ErrorMessage name="phone" component="div" className="text-red-300 text-sm mt-1" />
                    </div>

                    {/* Location Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city" className="text-white mb-2  flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          City
                        </Label>
                        <Field
                          as={Input}
                          id="city"
                          name="city"
                          placeholder="Enter your city"
                          className={`bg-white/20 border-white/30 text-white placeholder:text-white/70 ${
                            errors.city && touched.city ? "border-red-400" : ""
                          }`}
                        />
                        <ErrorMessage name="city" component="div" className="text-red-300 text-sm mt-1" />
                      </div>

                      <div>
                        <Label htmlFor="country" className="text-white mb-2 block">
                          Country
                        </Label>
                        <Field
                          as={Input}
                          id="country"
                          name="country"
                          placeholder="Enter your country"
                          className={`bg-white/20 border-white/30 text-white placeholder:text-white/70 ${
                            errors.country && touched.country ? "border-red-400" : ""
                          }`}
                        />
                        <ErrorMessage name="country" component="div" className="text-red-300 text-sm mt-1" />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 py-3 text-lg"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                            Saving...
                          </div>
                        ) : (
                          "Save Details"
                        )}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}