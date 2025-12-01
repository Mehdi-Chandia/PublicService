"use client"
import React, { useState, useEffect } from 'react'
import Link from "next/link";

const ServicesPage = () => {
    const [services, setServices] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        getServices()
    }, [])

    const getServices = async () => {
        try {
            setLoading(true)
            const response = await fetch("/api/services")

            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.status}`)
            }

            const data = await response.json()
            console.log("Fetched services:", data)

            if (data.success && data.data) {
                setServices(data.data)
            } else if (Array.isArray(data)) {
                setServices(data)
            } else {
                setServices([])
            }
        } catch (err) {
            console.error("Fetch error:", err)
            setError("Failed to load services")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="text-center mb-8 px-4">
                <h1 className="text-4xl font-bold text-gray-900">
                    Find Trusted <span className="text-green-600">Local Professionals</span>
                </h1>
                <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                    Connect with skilled service providers in your area. Quality guaranteed, prices transparent.
                </p>
            </div>

            {loading && (
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                    <p className="mt-4 text-gray-600">Loading services...</p>
                </div>
            )}

            {error && (
                <div className="text-center py-8">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto">
                        {error}
                        <button
                            onClick={getServices}
                            className="ml-4 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            )}


            {!loading && !error && (
                <div className="max-w-6xl mx-auto px-4">

                    {services.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map((service) => (
                                <div key={service._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                    {/* Service Image */}
                                    <div className="h-48 bg-gray-200 relative">
                                        {service.image ? (
                                            <img
                                                src={service.image}
                                                alt={service.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                                                <span className="text-4xl">🔧</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-4">
                                        <h3 className="font-bold text-lg text-gray-900 mb-2">{service.title}</h3>
                                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{service.description}</p>

                                        <div className="flex items-center justify-between mb-3">
                                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                                {service.category}
                                            </span>
                                            <span className="font-bold text-green-600">${service.price}</span>
                                        </div>

                                        <div className="flex items-center justify-between text-sm text-gray-500">
                                            <span>📍 {service.location}</span>
                                            <div className="flex items-center">
                                                ⭐ 5.0 <span className="ml-1">(24)</span>
                                            </div>
                                        </div>
                                        <Link
                                            href={`/services/${service._id}`}
                                            className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition block text-center"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* Empty State */
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🔧</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No services available yet</h3>
                            <p className="text-gray-600">Be the first to list your service!</p>
                        </div>
                    )}
                </div>
            )}


            <div className="max-w-4xl mx-auto px-4 mt-12 text-center">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to get started?</h2>
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                        Browse through our verified service providers and find the perfect professional for your needs.
                        All services come with quality guarantee and transparent pricing.
                    </p>


                    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white mt-8">
                        <h2 className="text-2xl font-bold mb-4">Are you a service professional?</h2>
                        <p className="mb-6">Join thousands of providers growing their business with ServiceHub</p>
                        <Link href={"/services/create"} className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                            List Your Services
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServicesPage;