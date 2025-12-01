"use client"
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function Home() {

    useGSAP(() => {
        gsap.from(".header-word", {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
        });

        gsap.from(".header-subtitle", {
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 0.8,
            ease: "power2.out",
        });

        gsap.from(".stat-item", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: 1.2,
            stagger: 0.15,
            ease: "back.out(1.7)",
        });

        gsap.from(".header-button", {
            y: 20,
            opacity: 0,
            duration: 0.8,
            delay: 1.5,
            stagger: 0.1,
            ease: "power2.out",
            onComplete: () => {
                gsap.set(".header-button", { clearProps: "all" });
            }
        });

        gsap.from(".hero-image", {
            x: 100,
            opacity: 0,
            duration: 1.5,
            delay: 0.5,
            ease: "power3.out",
        });

    }, []);

    return (
        <>
            <main>
                <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-8 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <section className="w-full lg:w-[45vw] flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
                        <div className="p-4 lg:p-5 mt-4 max-w-2xl">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                <span className="header-word inline-block">Find</span>{" "}
                                <span className="header-word inline-block">Trusted</span>{" "}
                                <span className="header-word inline-block text-green-600">Local</span>{" "}
                                <span className="header-word inline-block text-green-600">Professionals</span>{" "}
                                <span className="header-word inline-block">near</span>{" "}
                                <span className="header-word inline-block">you!</span>
                            </h1>
                            <p className="header-subtitle text-lg sm:text-xl text-slate-600 mt-6 max-w-lg mx-auto lg:mx-0">
                                Connect with skilled plumbers, electricians, cleaners, and home service providers
                                in your neighborhood. Quality guaranteed, prices transparent.
                            </p>
                        </div>

                        <div className="stat flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8 pt-4">
                            <div className="stat-item text-center">
                                <div className="text-xl sm:text-2xl font-bold text-green-600">300+</div>
                                <div className="text-gray-500 text-sm sm:text-lg">Service Providers</div>
                            </div>
                            <div className="stat-item text-center">
                                <div className="text-xl sm:text-2xl font-bold text-green-600">1k+</div>
                                <div className="text-gray-500 text-sm sm:text-lg">Satisfied Customers</div>
                            </div>
                            <div className="stat-item text-center">
                                <div className="text-xl sm:text-2xl font-bold text-green-600">10+</div>
                                <div className="text-gray-500 text-sm sm:text-lg">Cities Served</div>
                            </div>
                        </div>

                        {/* Buttons - Stack on mobile */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center lg:justify-start items-center w-full sm:w-auto">
                            <Link
                                href={"/services"}
                                className="header-button font-bold text-white bg-green-600 px-6 py-3 rounded-lg hover:bg-green-700 transition transform duration-200 hover:scale-105 w-full sm:w-auto"
                                style={{ opacity: 1 }} // Force initial opacity
                            >
                                Browse Services
                            </Link>
                            <Link
                                href={"/services/create"}
                                className="header-button font-bold text-white bg-gray-700 px-6 py-3 rounded-lg hover:bg-gray-900 transition transform duration-200 hover:scale-105 w-full sm:w-auto"
                                style={{ opacity: 1 }} // Force initial opacity
                            >
                                Become a Provider
                            </Link>
                        </div>
                    </section>

                    <section className="w-full lg:w-[45vw] flex items-center justify-center">
                        <div className="hero-image relative w-full max-w-md lg:max-w-none">
                            <Image
                                src="/hero.jpg"
                                alt="Service Professionals"
                                width={600}
                                height={600}
                                className="rounded-2xl w-full h-auto"
                                priority
                            />
                        </div>
                    </section>
                </div>

                {/* How It Works section - NO ANIMATIONS HERE as requested */}
                <section className="min-h-[50vh] w-full py-12 sm:py-16 px-4 sm:px-6">
                    <div className="text-center space-y-3 max-w-4xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl font-bold text-green-600">How It Works</h2>
                        <p className="text-lg sm:text-xl font-semibold text-gray-500">
                            Get your problems solved in just three simple steps
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 sm:mt-12 max-w-6xl mx-auto">
                        <div className="text-center p-6">
                            <div className="flex justify-center mb-4">
                                <Image src="/search.gif" alt="Search" width={60} height={60} />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Search Services</h3>
                            <p className="text-gray-600">
                                Find the right professional for your specific needs in your area
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="flex justify-center mb-4">
                                <Image src="/message.gif" alt="Message" width={60} height={60} />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Connect & Discuss</h3>
                            <p className="text-gray-600">
                                Contact providers and discuss your requirements
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="flex justify-center mb-4">
                                <Image src="/review.gif" alt="Review" width={60} height={60} />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Hire & Review</h3>
                            <p className="text-gray-600">
                                Get the job done and share your experience
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}