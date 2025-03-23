"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";

// Mock data - replace with actual data from your backend
const mockTherapist = {
  id: "1",
  name: "Dr. Sarah Johnson",
  specialization: "Cognitive Behavioral Therapy",
  description: "Experienced therapist specializing in anxiety and depression treatment. Licensed with 10+ years of experience.",
  hourlyRate: 150,
  availability: ["Mon 10:00", "Tue 14:00", "Wed 16:00", "Thu 11:00", "Fri 15:00"],
  rating: 4.8,
  imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
};

export default function BookSessionPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [sessionDuration, setSessionDuration] = useState<number>(60);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBooking = async () => {
    setIsProcessing(true);
    try {
      // Here you would:
      // 1. Create a smart contract escrow
      // 2. Handle the payment deposit
      // 3. Create the booking in your backend
      // 4. Send confirmation emails
      
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      router.push("/bookings/confirmation");
    } catch (error) {
      console.error("Booking failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Therapist Info */}
          <div className="p-6 border-b">
            <div className="flex items-center space-x-4">
              <img
                src={mockTherapist.imageUrl}
                alt={mockTherapist.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{mockTherapist.name}</h1>
                <p className="text-blue-600">{mockTherapist.specialization}</p>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Book a Session</h2>
            
            {/* Session Duration */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Duration
              </label>
              <select
                value={sessionDuration}
                onChange={(e) => setSessionDuration(Number(e.target.value))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={90}>1.5 hours</option>
                <option value={120}>2 hours</option>
              </select>
            </div>

            {/* Date Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Time Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Time
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Choose a time</option>
                {mockTherapist.availability.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Summary */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Session Duration</span>
                <span className="font-medium">{sessionDuration} minutes</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-600">Rate per hour</span>
                <span className="font-medium">${mockTherapist.hourlyRate}</span>
              </div>
              <div className="flex justify-between items-center mt-2 pt-2 border-t">
                <span className="text-lg font-semibold">Total Price</span>
                <span className="text-lg font-semibold">
                  ${(mockTherapist.hourlyRate * (sessionDuration / 60)).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Book Button */}
            <Button
              onClick={handleBooking}
              disabled={!selectedDate || !selectedTime || isProcessing}
              className="w-full"
            >
              {isProcessing ? "Processing..." : "Book Session"}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
} 