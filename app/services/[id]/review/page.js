// app/services/[id]/review/page.js
"use client"
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

const ReviewPage = () => {
    const params = useParams()
    const router = useRouter()
    const [service, setService] = useState(null)
    const [formData, setFormData] = useState({
        username: '',
        rating: 5,
        comment: ''
    })
    const [loading, setLoading] = useState(false)
    const [pageLoading, setPageLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        if (params.id) {
            fetchServiceDetails()
        }
    }, [params.id])

    const fetchServiceDetails = async () => {
        try {
            const response = await fetch(`/api/services/${params.id}`)
            const data = await response.json()

            if (response.ok && data.success) {
                setService(data.service)
            } else {
                setError('Failed to load service details')
            }
        } catch (err) {
            setError('Network error')
        } finally {
            setPageLoading(false)
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const response = await fetch('/api/review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    serviceId: params.id,
                    username: formData.username,
                    rating: parseInt(formData.rating),
                    comment: formData.comment
                })
            })

            const data = await response.json()

            if (response.ok) {
                // Redirect back to service details page
                router.refresh()
                router.push(`/services/${params.id}`)
            } else {
                setError(data.message || 'Failed to submit review')
            }
        } catch (err) {
            setError('Network error: Could not submit review')
        } finally {
            setLoading(false)
        }
    }

    if (pageLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        )
    }

    if (error && !service) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <Link
                        href="/services"
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 inline-block"
                    >
                        Back to Services
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto px-4">
                {/* Back Button */}
                <Link
                    href={`/services/${params.id}`}
                    className="inline-flex items-center text-green-600 hover:text-green-700 mb-6"
                >
                    ← Back to Service
                </Link>

                {/* Header */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Write a Review</h1>
                    <p className="text-gray-600">
                        Share your experience with <strong>{service?.title}</strong>
                    </p>
                </div>

                {/* Review Form */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username */}
                        <div>
                            <label className="block font-semibold text-gray-800 mb-2">
                                Your Name *
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Enter your name"
                            />
                        </div>

                        {/* Rating */}
                        <div>
                            <label className="block font-semibold text-gray-800 mb-2">
                                Rating *
                            </label>
                            <select
                                name="rating"
                                value={formData.rating}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value={5}>⭐⭐⭐⭐⭐ Excellent (5)</option>
                                <option value={4}>⭐⭐⭐⭐ Very Good (4)</option>
                                <option value={3}>⭐⭐⭐ Good (3)</option>
                                <option value={2}>⭐⭐ Fair (2)</option>
                                <option value={1}>⭐ Poor (1)</option>
                            </select>
                        </div>

                        {/* Comment */}
                        <div>
                            <label className="block font-semibold text-gray-800 mb-2">
                                Your Review *
                            </label>
                            <textarea
                                name="comment"
                                value={formData.comment}
                                onChange={handleChange}
                                required
                                rows={6}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Share your experience with this service..."
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Submitting Review...' : 'Submit Review'}
                        </button>
                    </form>
                </div>

                {/* Guidelines */}
                <div className="bg-blue-50 rounded-xl p-6 mt-6">
                    <h3 className="font-semibold text-blue-900 mb-2">Review Guidelines</h3>
                    <ul className="text-blue-800 text-sm space-y-1">
                        <li>• Be honest and specific about your experience</li>
                        <li>• Focus on the quality of service provided</li>
                        <li>• Avoid personal attacks or offensive language</li>
                        <li>• Your review will help other customers make informed decisions</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ReviewPage;