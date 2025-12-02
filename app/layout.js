import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/app/components/SessionWrapper";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import NavbarWrapper from "@/app/components/NavbarWrapper";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "ServiceHub - Find Trusted Local Professionals",
    description: "Connect with skilled plumbers, electricians, cleaners, and home service providers in your neighborhood",
    icons: {
        icon: '/favicn.jpeg',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <SessionWrapper>
            <NavbarWrapper/>
            {children}
            <Footer/>
        </SessionWrapper>
        </body>
        </html>
    );
}
