"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
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

export default function TherapistListingPage() {
  const router = useRouter();
  const [selectedSpecialization, setSelectedSpecialization] = useState<string | null>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 300]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const specializations = ["all", "CBT", "Family Therapy", "Trauma", "Addiction"];

  const handleBookSession = async (therapistId: string) => {
    try {
      setIsLoading(therapistId);
      // Navigate to the booking confirmation page with the therapist ID
      router.push(`/booking-confirmation?therapistId=${therapistId}`);
    } catch (error) {
      console.error('Error booking session:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(null);
    }
  };

  const filteredTherapists = mockTherapists.filter(therapist => {
    const matchesSpecialization = selectedSpecialization === "all" || selectedSpecialization === null ||
      therapist.specialization.toLowerCase().includes(selectedSpecialization.toLowerCase());
    
    const matchesPrice = priceRange[0] <= therapist.hourlyRate && therapist.hourlyRate <= priceRange[1];

    const matchesSearch = searchQuery === "" ||
      therapist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      therapist.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      therapist.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSpecialization && matchesPrice && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#f8f4f1] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#f07f06] mb-4">Find Your Therapist</h1>
          <div className="flex space-x-4">
            <Button 
              onClick={() => router.push("/therapists/register")}
              className="text-sm py-2 px-4 bg-[#9ac9f1] hover:bg-[#8ab8e1] text-white"
            >
              Register as Therapist
            </Button>
            <Button
              onClick={() => router.push("/bookings")}
              className="text-sm py-2 px-4 flex items-center space-x-2 bg-[#f07f06] hover:bg-[#e06e05] text-white"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>View My Bookings</span>
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search therapists by name, specialization, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[#9ac9f1] focus:outline-none focus:ring-2 focus:ring-[#9ac9f1] focus:border-transparent"
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {specializations.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialization(spec === selectedSpecialization ? null : spec)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedSpecialization === spec
                  ? "bg-[#f07f06] text-white"
                  : "bg-white text-gray-700 hover:bg-[#9ac9f1] hover:text-white border border-[#9ac9f1]"
              }`}
            >
              {spec}
            </button>
          ))}
        </div>

        {/* Price Range Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </label>
          <input
            type="range"
            min="50"
            max="300"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full h-2 bg-[#9ac9f1] rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Results Count */}
        <p className="text-gray-600 mb-4">
          {filteredTherapists.length} therapist{filteredTherapists.length !== 1 ? "s" : ""} found
        </p>

        {/* Therapist Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTherapists.map((therapist) => (
            <div
              key={therapist.id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-[#9ac9f1] hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 w-full">
                <img
                  src={therapist.imageUrl}
                  alt={therapist.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/300x200?text=Therapist+Image";
                  }}
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{therapist.name}</h2>
                <p className="text-[#f07f06] font-medium mb-2">{therapist.specialization}</p>
                <p className="text-gray-600 mb-4">{therapist.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-[#f07f06]">
                    ${therapist.hourlyRate}/hour
                  </span>
                  <Button
                    onClick={() => handleBookSession(therapist.id)}
                    disabled={isLoading === therapist.id}
                    className={`${
                      isLoading === therapist.id
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#9ac9f1] hover:bg-[#8ab8e1]"
                    } text-white`}
                  >
                    {isLoading === therapist.id ? "Booking..." : "Book Session"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredTherapists.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No therapists found matching your criteria.</p>
          </div>
        )}
      </div>
    </main>
  );
} 