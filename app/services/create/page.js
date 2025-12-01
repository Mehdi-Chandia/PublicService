"use client"
import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

const CreateServicePage = () => {
    const router = useRouter()
    const { data: session, status } = useSession()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm()

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login?callbackUrl=/services/create')
        } else if (status === 'authenticated') {
            if (session?.user?.role !== 'provider') {
                router.push('/services')
            }
        }
    }, [session, status, router])

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                    <p className="mt-4 text-gray-600">Checking permissions...</p>
                </div>
            </div>
        )
    }

    if (!session || session?.user?.role !== 'provider') {
        return null
    }

    const onSubmit = async (data) => {
        try {
            const formData = new FormData()
            formData.append("title", data.title)
            formData.append("description", data.description)
            formData.append("category", data.category)
            formData.append("price", data.price)
            formData.append("location", data.location)

            if (data.image && data.image[0]) {
                formData.append("image", data.image[0])
            }

            const response = await fetch("/api/services", {
                method: "POST",
                body: formData,
            })

            const result = await response.json()

            if (response.ok) {
                router.push("/services")
            } else {
                setError("root", {
                    message: result.message || "Failed to create service",
                })
            }
        } catch (err) {
            console.log(err)
            setError("root", {
                message: "Something went wrong",
            })
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
                {/* User Info */}
                <div className="mb-6 p-4 bg-green-50 rounded-lg">
                    <p className="text-green-700 font-semibold">
                        Logged in as: <span className="text-green-900">{session?.user?.name}</span>
                    </p>
                    <p className="text-green-600 text-sm">
                        Role: <span className="font-bold">{session?.user?.role}</span>
                    </p>
                </div>

                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-semibold text-green-700">Create Your Services</h2>
                    <p className="text-sm text-slate-400">List your services and engage with customers</p>
                </div>

                {/* Root error */}
                {errors.root && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {errors.root.message}
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {/* Title */}
                    <div className="mt-4">
                        <label className="font-semibold text-lg mb-1">Service Title</label>
                        <input
                            className={`w-full p-2 focus:outline-none border rounded-lg ${errors.title ? "border-red-400" : "border-slate-300"}`}
                            type="text"
                            placeholder="Enter your service title"
                            {...register("title", {
                                required: true,
                                minLength: {
                                    value: 5,
                                    message: "Title must be at least 5 characters"
                                }
                            })}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mb-1">{errors.title.message}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="mt-4">
                        <label className="block font-semibold text-lg mb-1">Description</label>
                        <textarea
                            className={`w-full p-2 focus:outline-none border rounded-lg h-32 ${errors.description ? "border-red-400" : "border-slate-300"}`}
                            placeholder="Describe your service in detail..."
                            {...register("description", {
                                required: true,
                                minLength: {
                                    value: 20,
                                    message: "Description must be at least 20 characters"
                                }
                            })}
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mb-1">{errors.description.message}</p>
                        )}
                    </div>

                    {/* Category & Price */}
                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="block font-semibold text-lg mb-1">Category</label>
                            <select
                                className={`w-full p-2 focus:outline-none border rounded-lg ${errors.category ? "border-red-400" : "border-slate-300"}`}
                                {...register("category", { required: "Please select a category" })}
                            >
                                <option value="">Select Category</option>
                                <option value="plumbing">Plumbing</option>
                                <option value="electrical">Electrical</option>
                                <option value="cleaning">Cleaning</option>
                                <option value="painting">Painting</option>
                                <option value="carpentry">Carpentry</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.category && (
                                <p className="text-red-500 text-sm mb-1">{errors.category.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block font-semibold text-lg mb-1">Price ($)</label>
                            <input
                                className={`w-full p-2 focus:outline-none border rounded-lg ${errors.price ? "border-red-400" : "border-slate-300"}`}
                                type="number"
                                placeholder="e.g. 50"
                                {...register("price", {
                                    required: "Price is required",
                                    min: { value: 0, message: "Price must be positive" }
                                })}
                            />
                            {errors.price && (
                                <p className="text-red-500 text-sm mb-1">{errors.price.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Location */}
                    <div className="mt-4">
                        <label className="block font-semibold text-lg mb-1">Location</label>
                        <input
                            className={`w-full p-2 focus:outline-none border rounded-lg ${errors.location ? "border-red-400" : "border-slate-300"}`}
                            type="text"
                            placeholder="e.g. New York, NY"
                            {...register("location", { required: "Location is required" })}
                        />
                        {errors.location && (
                            <p className="text-red-500 text-sm mb-1">{errors.location.message}</p>
                        )}
                    </div>

                    {/* Image Upload */}
                    <div className="mt-4">
                        <label className="block font-semibold text-lg mb-1">Service Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            className={`w-full p-2 focus:outline-none border rounded-lg ${errors.image ? "border-red-400" : "border-slate-300"}`}
                            {...register("image", {
                                validate: {
                                    fileSize: (files) =>
                                        !files[0] || files[0].size <= 5 * 1024 * 1024 || "Max file size is 5MB",
                                    fileType: (files) =>
                                        !files[0] || files[0].type.startsWith('image/') || "Must be an image file"
                                }
                            })}
                        />
                        {errors.image && (
                            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
                        )}
                        <p className="text-sm text-gray-500 mt-1">Upload an image of your work (max 5MB)</p>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6">
                        <button
                            disabled={isSubmitting}
                            className={`w-full font-medium text-lg bg-green-600 text-white rounded-lg px-6 py-2 transition-all duration-200 ${
                                isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
                            }`}
                        >
                            {isSubmitting ? "Creating Service..." : "Create Service"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateServicePage