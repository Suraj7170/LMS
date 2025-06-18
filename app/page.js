'use client';

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-sky-100">
      
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="AI-LMS Logo" width={32} height={32} />
          <span className="text-xl font-semibold text-gray-800">EduVerse</span>
        </div>
        <nav className="flex gap-6 items-center text-sm text-gray-600 cursor-pointer">
          <a href="/dashboard" className="hover:text-blue-600 font-medium">Dashboard</a>
          <a href="/pricing" className="hover:text-blue-600 font-medium">Pricing</a>
          <a href="/about" className="hover:text-blue-600 font-medium">About</a>
          <UserButton />
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center text-center px-4">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Revolutionize Learning with AI-Powered Course Creation
          </h1>
          <p className="text-gray-600 text-lg">
            Instantly generate study materials, flashcards, and quizzes tailored to your needs.
            Empower your education with our smart LMS platform.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/dashboard">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg cursor-pointer">
              Get Started
            </Button>
            </Link>
            <Button variant="outline" className='cursor-pointer'>Learn More</Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-4 text-sm text-gray-500 text-center">
        © {new Date().getFullYear()} AI-LMS. All rights reserved.
      </footer>
    </div>
  );
}
