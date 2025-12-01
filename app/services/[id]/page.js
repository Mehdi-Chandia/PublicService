"use client"
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

const ServiceDetailsPage = () => {
    const params = useParams()
    const [service, setService] = useState(null)
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        if (params.id) {
            fetchServiceDetails()
        } else {
            setError("No service ID provided")
            setLoading(false)
        }
    }, [params.id])

    const fetchServiceDetails = async () => {
        try {
            setLoading(true)
            setError("")

            const response = await fetch(`/api/services/${params.id}`)
            const data = await response.json()

            if (response.ok && data.success) {
                setService(data.service)
                setReviews(data.reviews || [])
            } else {
                setError(data.message || "Failed to load service details")
            }
        } catch (err) {
            setError("Network error: Could not connect to server")
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                    <p className="mt-4 text-gray-600">Loading service details...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Service Not Found</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <div className="space-y-3">
                        <button
                            onClick={fetchServiceDetails}
                            className="w-full bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                        >
                            Try Again
                        </button>
                        <Link
                            href="/services"
                            className="w-full bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 block text-center"
                        >
                            Back to Services
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <Link href="/services" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6">
                    ← Back to Services
                </Link>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                    <div className="h-64 bg-gray-200 relative">
                        {service.image ? (
                            <img
                                src={service.image}
                                alt={service.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                                <span className="text-6xl">🔧</span>
                            </div>
                        )}
                    </div>

                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{service.title}</h1>
                                <div className="flex items-center space-x-4 text-gray-600">
                                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                                        {service.category}
                                    </span>
                                    <span>📍 {service.location}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-green-600">${service.price}</div>
                                <div className="text-sm text-gray-500">Starting price</div>
                            </div>
                        </div>

                        <p className="text-gray-700 mb-6 leading-relaxed">{service.description}</p>

                        <div className="border-t pt-4">
                            <h3 className="font-semibold text-gray-900 mb-2">Service Provider</h3>
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <span className="text-green-600 font-semibold">
                                        {service.owner?.name?.charAt(0) || 'U'}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{service.owner?.name || 'Unknown'}</p>
                                    <p className="text-sm text-gray-500">{service.owner?.email}</p>
                                </div>
                            </div>
                        </div>

                        {/* ADDED: Contact Provider Button */}
                        <div className="mt-6 pt-4 border-t">
                            <Link
                                href={`/services/${service._id}/contact`}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                            >
                                📞 Contact This Provider
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Reviews Section - Unchanged */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Customer Reviews {reviews.length > 0 && `(${reviews.length})`}
                        </h2>
                        <Link href={`/services/${service._id}/review`} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
                            Add Your Review
                        </Link>
                    </div>

                    {reviews.length > 0 ? (
                        <div className="space-y-6">
                            {reviews.map((review) => (
                                <div key={review._id} className="border-b pb-6 last:border-b-0">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{review.username}</h4>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <div className="flex">
                                                    {"⭐".repeat(review.rating)}
                                                </div>
                                                <span className="text-sm text-gray-500">
                                                    {new Date(review.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-700">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <div className="text-4xl mb-4">💬</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Reviews Yet</h3>
                            <p className="text-gray-600">Be the first to share your experience!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ServiceDetailsPage;