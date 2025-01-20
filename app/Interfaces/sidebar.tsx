"use client";
import React from "react";
import "../../app/globals.css"
import Link from "next/link";

interface SidebarProps {
    links: { href: string, label: string }[]
}

export default function Sidebar({ links }: SidebarProps) {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }
    const clickOnLink = () => {
        setIsSidebarOpen(false)
    }

    return (
        <>
            <div className="lg:hidden bg-slate-900 p-4 flex justify-between items-center">
                <button
                    onClick={toggleSidebar}
                    className="text-white focus:outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>
            </div>
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-slate-900 text-white transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 ease-in-out lg:hidden`}
            >
                <button
                    onClick={toggleSidebar}
                    className="text-white absolute top-4 right-4"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <div className="p-6">
                    {links.map((link) => (
                        <Link key={link.href} href={link.href} className="block mb-4" onClick={clickOnLink}>
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}
