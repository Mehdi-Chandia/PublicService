
"use client"
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

const ContactProviderPage = () => {
    const params = useParams()
    const router = useRouter()
    const [service, setService] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        budget: '',
        preferredDate: ''
    })
    const [loading, setLoading] = useState(false)
    const [pageLoading, setPageLoading] = useState(true)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

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
            // Here you would send this to your backend
            // For now, we'll simulate success
            await new Promise(resolve => setTimeout(resolve, 1000))

            setSuccess(true)

            // You could redirect or clear form
            setTimeout(() => {
                router.push(`/services/${params.id}`)
            }, 2000)

        } catch (err) {
            setError('Failed to send message. Please try again.')
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

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md">
                    <div className="text-green-500 text-6xl mb-4">✅</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h2>
                    <p className="text-gray-600 mb-4">
                        Your request has been sent to {service?.owner?.name || 'the provider'}.
                        They will contact you soon.
                    </p>
                    <Link
                        href={`/services/${params.id}`}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 inline-block"
                    >
                        Back to Service
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
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Service Provider</h1>
                    <p className="text-gray-600">
                        Send a request to <strong>{service?.owner?.name || 'the provider'}</strong>
                        about <strong>{service?.title}</strong>
                    </p>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-blue-800 text-sm">
                            💡 Be specific about your needs to get accurate quotes and faster responses.
                        </p>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label className="block font-semibold text-gray-800 mb-2">
                                Your Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Enter your full name"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block font-semibold text-gray-800 mb-2">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block font-semibold text-gray-800 mb-2">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Enter your phone number (optional)"
                            />
                        </div>

                        {/* Budget */}
                        <div>
                            <label className="block font-semibold text-gray-800 mb-2">
                                Your Budget ($)
                            </label>
                            <input
                                type="number"
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                min="0"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="e.g., 150"
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                Service starting price: ${service?.price}
                            </p>
                        </div>

                        {/* Preferred Date */}
                        <div>
                            <label className="block font-semibold text-gray-800 mb-2">
                                When do you need the service?
                            </label>
                            <select
                                name="preferredDate"
                                value={formData.preferredDate}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="">Select timeframe</option>
                                <option value="urgent">Urgent - Within 24 hours</option>
                                <option value="this-week">This week</option>
                                <option value="next-week">Next week</option>
                                <option value="this-month">This month</option>
                                <option value="flexible">Flexible / Just checking</option>
                            </select>
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block font-semibold text-gray-800 mb-2">
                                Describe Your Needs *
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={6}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Describe what you need in detail. Be as specific as possible..."
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Sending Message...' : 'Send Request to Provider'}
                        </button>
                    </form>
                </div>

                {/* Info */}
                <div className="bg-gray-50 rounded-xl p-6 mt-6">
                    <h3 className="font-semibold text-gray-900 mb-2">What happens next?</h3>
                    <ul className="text-gray-700 text-sm space-y-2">
                        <li className="flex items-start">
                            <span className="text-green-600 mr-2">1.</span>
                            The service provider will receive your request
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-600 mr-2">2.</span>
                            They will contact you via email or phone
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-600 mr-2">3.</span>
                            You can discuss details and schedule the service
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-600 mr-2">4.</span>
                            ServiceHub does not charge any fees for this connection
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ContactProviderPage;