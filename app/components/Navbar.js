"use client"
import React from "react";
import Link from "next/link";
import { IoIosMenu } from "react-icons/io";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <>
            <nav className="flex justify-between items-center mt-4 w-[90vw] md:w-[88vw] bg-slate-300 shadow-lg top-10 mx-auto rounded-full px-4 md:px-7 py-3 md:py-5 gap-3">
                {/* Logo Section */}
                <Link href={"/"} className="font-bold flex text-xl md:text-2xl items-center">
                    Service<span className="text-green-600">Hub</span>
                    <img src={"logo.gif"} width={28} height={28} alt="logo" className="ml-1 md:ml-2"/>
                </Link>

                {/* Desktop Navigation Links - Hidden on mobile */}
                <ul className="hidden md:flex gap-4 lg:gap-6 font-semibold">
                    <Link href={"/"}><li className="hover:text-green-600 transition cursor-pointer">Home</li></Link>
                    <Link href={"/services"}><li className="hover:text-green-600 transition cursor-pointer">Services</li></Link>
                    <Link href={"/about"}><li className="hover:text-green-600 transition cursor-pointer">About Us</li></Link>
                </ul>

                {/* Desktop Auth Buttons - Hidden on mobile */}
                <div className="hidden md:flex gap-2">
                    <Link href={"/register"} type="button"
                            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 md:px-4 py-2 text-center transition">
                        Sign Up
                    </Link>
                    <Link href={"/login"} type="button"
                            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 md:px-4 py-2 text-center transition">
                        Log In
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 rounded-lg hover:bg-slate-400 transition"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <IoIosMenu size={24} />
                </button>
            </nav>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden bg-slate-300 shadow-lg rounded-2xl mx-auto w-[90vw] mt-2 p-6">
                    {/* Mobile Navigation Links */}
                    <ul className="flex flex-col gap-4 font-semibold text-center">
                        <Link href={"/"} onClick={() => setIsMenuOpen(false)}>
                            <li className="hover:text-green-600 transition cursor-pointer py-2">Home</li>
                        </Link>
                        <Link href={"/services"} onClick={() => setIsMenuOpen(false)}>
                            <li className="hover:text-green-600 transition cursor-pointer py-2">Services</li>
                        </Link>
                        <Link href={"/about"} onClick={() => setIsMenuOpen(false)}>
                            <li className="hover:text-green-600 transition cursor-pointer py-2">About Us</li>
                        </Link>
                    </ul>

                    {/* Mobile Auth Buttons */}
                    <div className="flex flex-col gap-3 mt-6">
                        <Link href={"/register"} type="button"
                                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm py-3 text-center transition w-full">
                            Sign Up
                        </Link>
                        <Link href={"/login"} type="button"
                                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm py-3 text-center transition w-full">
                            Log In
                        </Link>
                    </div>
                </div>
            )}
        </>
    )
}

export default Navbar;