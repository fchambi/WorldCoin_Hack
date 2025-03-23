"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";

interface Therapist {
  id: string;
  name: string;
  specialization: string;
  description: string;
  hourlyRate: number;
  availability: string[];
  rating: number;
  imageUrl: string;
}

// Mock data - replace with actual data from your backend
const mockTherapists: Therapist[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialization: "Cognitive Behavioral Therapy",
    description: "Experienced therapist specializing in anxiety and depression treatment. Licensed with 10+ years of experience.",
    hourlyRate: 150,
    availability: ["Mon 10:00", "Tue 14:00", "Wed 16:00", "Thu 11:00", "Fri 15:00"],
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialization: "Family Therapy",
    description: "Family therapist with expertise in relationship counseling and family dynamics. Focus on communication and conflict resolution.",
    hourlyRate: 180,
    availability: ["Mon 13:00", "Tue 15:00", "Wed 10:00", "Thu 14:00", "Fri 16:00"],
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    specialization: "Trauma Therapy",
    description: "Specialized in trauma-informed care and EMDR therapy. Helping clients heal from past experiences and build resilience.",
    hourlyRate: 200,
    availability: ["Mon 09:00", "Tue 11:00", "Wed 14:00", "Thu 16:00", "Fri 10:00"],
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  }
];

export default function BookingConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const therapistId = searchParams.get("therapistId");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const therapist = mockTherapists.find(t => t.id === therapistId);

  if (!therapist) {
    return (
      <div className="min-h-screen bg-[#f8f4f1] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#f07f06] mb-4">Therapist Not Found</h1>
          <Button
            onClick={() => router.push("/therapists")}
            className="bg-[#9ac9f1] hover:bg-[#8ab8e1] text-white"
          >
            Return to Therapists
          </Button>
        </div>
      </div>
    );
  }

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      setError("Please select both date and time");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      // Here you would typically make an API call to create the booking
      // For now, we'll just simulate a successful booking
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to the bookings page after successful booking
      router.push("/bookings");
    } catch (error) {
      setError("Failed to create booking. Please try again.");
      console.error("Booking error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f4f1] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-[#9ac9f1]">
          <div className="flex items-center mb-8">
            <Button
              variant="secondary"
              onClick={() => router.back()}
              className="mr-4 flex items-center bg-[#9ac9f1] hover:bg-[#8ab8e1] text-white"
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </Button>
            <h1 className="text-3xl font-bold text-[#f07f06]">Book a Session</h1>
          </div>

          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={therapist.imageUrl}
                alt={therapist.name}
                className="w-16 h-16 rounded-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://via.placeholder.com/64x64?text=Therapist";
                }}
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{therapist.name}</h2>
                <p className="text-[#f07f06]">{therapist.specialization}</p>
                <p className="text-gray-600">${therapist.hourlyRate}/hour</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 rounded-lg border border-[#9ac9f1] focus:outline-none focus:ring-2 focus:ring-[#9ac9f1] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Time
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-[#9ac9f1] focus:outline-none focus:ring-2 focus:ring-[#9ac9f1] focus:border-transparent"
              >
                <option value="">Choose a time</option>
                {therapist.availability.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}

            <div className="flex justify-end space-x-4">
              <Button
                onClick={() => router.back()}
                className="bg-[#9ac9f1] hover:bg-[#8ab8e1] text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={handleBooking}
                disabled={isLoading}
                className={`${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#f07f06] hover:bg-[#e06e05]"
                } text-white`}
              >
                {isLoading ? "Booking..." : "Confirm Booking"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 