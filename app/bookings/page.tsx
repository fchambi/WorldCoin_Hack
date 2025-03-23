"use client";
import { useState } from "react";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";
import { useRouter } from "next/navigation";

interface Booking {
  id: string;
  therapistName: string;
  specialization: string;
  date: string;
  time: string;
  status: "scheduled" | "completed" | "cancelled";
  paymentStatus: "pending" | "confirmed" | "refunded";
  amount: number;
  duration: number;
}

// Mock data - replace with actual API calls
const mockBookings: Booking[] = [
  {
    id: "1",
    therapistName: "Dr. Sarah Johnson",
    specialization: "Cognitive Behavioral Therapy",
    date: "2024-03-25",
    time: "10:00 AM",
    status: "scheduled",
    paymentStatus: "confirmed",
    amount: 150,
    duration: 60
  },
  {
    id: "2",
    therapistName: "Dr. Michael Chen",
    specialization: "Family Therapy",
    date: "2024-03-20",
    time: "2:30 PM",
    status: "completed",
    paymentStatus: "confirmed",
    amount: 180,
    duration: 90
  },
  {
    id: "3",
    therapistName: "Dr. Emily Rodriguez",
    specialization: "Trauma Therapy",
    date: "2024-03-28",
    time: "4:00 PM",
    status: "scheduled",
    paymentStatus: "pending",
    amount: 200,
    duration: 60
  }
];

export default function BookingsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "scheduled" | "completed" | "cancelled">("all");

  const filteredBookings = mockBookings.filter(booking => 
    filter === "all" ? true : booking.status === filter
  );

  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status: Booking["paymentStatus"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "refunded":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f4f1] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
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
            <h1 className="text-3xl font-bold text-[#f07f06]">My Bookings</h1>
          </div>

          <div className="flex justify-end mb-6">
            <div className="flex space-x-2">
              <Button
                variant={filter === "all" ? "primary" : "secondary"}
                onClick={() => setFilter("all")}
                className={`${
                  filter === "all" 
                    ? "bg-[#f07f06] hover:bg-[#e06e05] text-white" 
                    : "bg-[#9ac9f1] hover:bg-[#8ab8e1] text-white"
                }`}
              >
                All
              </Button>
              <Button
                variant={filter === "scheduled" ? "primary" : "secondary"}
                onClick={() => setFilter("scheduled")}
                className={`${
                  filter === "scheduled" 
                    ? "bg-[#f07f06] hover:bg-[#e06e05] text-white" 
                    : "bg-[#9ac9f1] hover:bg-[#8ab8e1] text-white"
                }`}
              >
                Scheduled
              </Button>
              <Button
                variant={filter === "completed" ? "primary" : "secondary"}
                onClick={() => setFilter("completed")}
                className={`${
                  filter === "completed" 
                    ? "bg-[#f07f06] hover:bg-[#e06e05] text-white" 
                    : "bg-[#9ac9f1] hover:bg-[#8ab8e1] text-white"
                }`}
              >
                Completed
              </Button>
              <Button
                variant={filter === "cancelled" ? "primary" : "secondary"}
                onClick={() => setFilter("cancelled")}
                className={`${
                  filter === "cancelled" 
                    ? "bg-[#f07f06] hover:bg-[#e06e05] text-white" 
                    : "bg-[#9ac9f1] hover:bg-[#8ab8e1] text-white"
                }`}
              >
                Cancelled
              </Button>
            </div>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No bookings found for this filter.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border border-[#9ac9f1] rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {booking.therapistName}
                      </h2>
                      <p className="text-[#f07f06]">{booking.specialization}</p>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        booking.status === "scheduled" ? "bg-[#9ac9f1] text-white" :
                        booking.status === "completed" ? "bg-[#f07f06] text-white" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        booking.paymentStatus === "confirmed" ? "bg-[#f07f06] text-white" :
                        booking.paymentStatus === "pending" ? "bg-[#9ac9f1] text-white" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">{new Date(booking.date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="font-medium">{booking.time}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium">{booking.duration} minutes</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Amount</p>
                      <p className="font-medium text-[#f07f06]">${booking.amount}</p>
                    </div>
                  </div>

                  {booking.status === "scheduled" && (
                    <div className="mt-4 flex justify-end space-x-2">
                      <Button
                        variant="secondary"
                        onClick={() => {
                          // Handle cancellation
                          console.log("Cancel booking:", booking.id);
                        }}
                        className="bg-[#9ac9f1] hover:bg-[#8ab8e1] text-white"
                      >
                        Cancel Session
                      </Button>
                      <Button
                        onClick={() => {
                          // Handle joining session
                          console.log("Join session:", booking.id);
                        }}
                        className="bg-[#f07f06] hover:bg-[#e06e05] text-white"
                      >
                        Join Session
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 