
import Link from 'next/link'

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        About <span className="text-green-600">ServiceHub</span>
                    </h1>
                    <p className="text-gray-600">Your trusted local service marketplace</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Our Story</h2>
                            <p className="text-gray-700">
                                ServiceHub was founded to solve a simple problem: finding reliable local service
                                professionals shouldn't be difficult. We connect skilled providers with customers
                                who need their services, making the process simple, transparent, and trustworthy.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">What We Offer</h2>
                            <ul className="text-gray-700 space-y-2">
                                <li>• Verified service professionals in your area</li>
                                <li>• Transparent pricing and customer reviews</li>
                                <li>• Easy booking and communication</li>
                                <li>• Support for local businesses</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Join Our Community</h2>
                            <p className="text-gray-700">
                                Whether you're looking for a service or want to grow your business,
                                ServiceHub is here to help. We're building a community of trust and quality.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <Link
                        href="/services"
                        className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                    >
                        Browse Services
                    </Link>
                    <p className="text-gray-600 mt-4 text-sm">
                        Have questions? <Link href="/contact" className="text-green-600">Contact us</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AboutPage;