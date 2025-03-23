"use client";
import { Login } from "../components/Login";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoading(true);
    router.push("/therapists");
  };

  return (
    <main className="min-h-screen bg-[#f8f4f1] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#f07f06] mb-4">
            Welcome to TherapyConnect
          </h1>
          <p className="text-gray-600">
            Connect with professional therapists and start your journey to better mental health
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 border border-[#9ac9f1]">
          <Login onLoginSuccess={handleLoginSuccess} />
        </div>
      </div>
    </main>
  );
}
