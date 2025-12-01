import React from "react";

const Footer = () => {
    return (
        <footer className="w-full bg-gray-800 text-white py-8">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <div className="font-bold text-2xl mb-4">
                    Service<span className="text-green-400">Hub</span>
                </div>
                <div className="text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} ServiceHub. All rights reserved.
                </div>
            </div>
        </footer>
    )
}

export default Footer;