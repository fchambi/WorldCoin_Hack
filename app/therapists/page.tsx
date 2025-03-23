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

export default function TherapistsPage() {
  const router = useRouter();
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const specializations = ["all", "CBT", "Family Therapy", "Trauma", "Addiction"];
  const priceRanges = [
    { label: "All Prices", value: "all" },
    { label: "Under $100", value: "under100" },
    { label: "$100-$150", value: "100to150" },
    { label: "$150-$200", value: "150to200" },
    { label: "Over $200", value: "over200" }
  ];

  const filteredTherapists = mockTherapists.filter(therapist => {
    const matchesSpecialization = selectedSpecialization === "all" ||
      therapist.specialization.toLowerCase().includes(selectedSpecialization.toLowerCase());
    
    const matchesPrice = priceRange === "all" ||
      (priceRange === "under100" && therapist.hourlyRate < 100) ||
      (priceRange === "100to150" && therapist.hourlyRate >= 100 && therapist.hourlyRate <= 150) ||
      (priceRange === "150to200" && therapist.hourlyRate > 150 && therapist.hourlyRate <= 200) ||
      (priceRange === "over200" && therapist.hourlyRate > 200);

    const matchesSearch = searchQuery === "" ||
      therapist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      therapist.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      therapist.specialization.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSpecialization && matchesPrice && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Therapist</h1>
          <div className="flex space-x-4">
            <Button 
              onClick={() => router.push("/therapists/register")}
              className="text-sm py-2 px-4"
            >
              Register as Therapist
            </Button>
            <Button
              onClick={() => router.push("/bookings")}
              className="text-sm py-2 px-4 flex items-center space-x-2"
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
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Specialization</h3>
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {specializations.map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialization(spec)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                    selectedSpecialization === spec
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range</h3>
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {priceRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => setPriceRange(range.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                    priceRange === range.value
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found {filteredTherapists.length} therapist{filteredTherapists.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Therapist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTherapists.map((therapist) => (
            <div
              key={therapist.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={therapist.imageUrl}
                  alt={therapist.name}
                  className="object-cover w-full h-48"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold text-gray-900">{therapist.name}</h2>
                  <span className="text-yellow-400">★ {therapist.rating}</span>
                </div>
                <p className="text-sm text-blue-600 font-medium mb-2">{therapist.specialization}</p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{therapist.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">${therapist.hourlyRate}/hr</span>
                  <Button onClick={() => router.push(`/therapists/${therapist.id}/book`)}>
                    Book Session
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
            <Button
              onClick={() => {
                setSelectedSpecialization("all");
                setPriceRange("all");
                setSearchQuery("");
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </main>
  );
} 