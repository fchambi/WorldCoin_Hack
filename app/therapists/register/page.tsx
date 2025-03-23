"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";

interface TherapistFormData {
  fullName: string;
  email: string;
  phone: string;
  specialization: string;
  description: string;
  hourlyRate: string;
  availability: {
    [key: string]: {
      morning: boolean;
      afternoon: boolean;
      evening: boolean;
    };
  };
  credentials: string;
  experience: string;
}

const initialFormData: TherapistFormData = {
  fullName: "",
  email: "",
  phone: "",
  specialization: "",
  description: "",
  hourlyRate: "",
  availability: {
    monday: { morning: false, afternoon: false, evening: false },
    tuesday: { morning: false, afternoon: false, evening: false },
    wednesday: { morning: false, afternoon: false, evening: false },
    thursday: { morning: false, afternoon: false, evening: false },
    friday: { morning: false, afternoon: false, evening: false },
    saturday: { morning: false, afternoon: false, evening: false },
    sunday: { morning: false, afternoon: false, evening: false },
  },
  credentials: "",
  experience: "",
};

const specializations = [
  "Cognitive Behavioral Therapy",
  "Family Therapy",
  "Trauma Therapy",
  "Addiction Counseling",
  "Relationship Counseling",
  "Child Psychology",
  "Clinical Psychology",
  "Other"
];

export default function TherapistRegistrationPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<TherapistFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<TherapistFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<TherapistFormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.specialization) {
      newErrors.specialization = "Specialization is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.hourlyRate.trim()) {
      newErrors.hourlyRate = "Hourly rate is required";
    } else if (isNaN(Number(formData.hourlyRate)) || Number(formData.hourlyRate) <= 0) {
      newErrors.hourlyRate = "Please enter a valid hourly rate";
    }

    if (!formData.credentials.trim()) {
      newErrors.credentials = "Credentials are required";
    }

    if (!formData.experience.trim()) {
      newErrors.experience = "Years of experience is required";
    }

    // Check if at least one time slot is selected
    const hasAvailability = Object.values(formData.availability).some(day =>
      Object.values(day).some(time => time)
    );
    if (!hasAvailability) {
      newErrors.availability = { monday: { morning: false, afternoon: false, evening: false } }; // This will trigger the error message
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Here you would typically send the data to your backend
      // For now, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success state instead of immediate redirect
      setIsSuccess(true);
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAvailabilityChange = (
    day: string,
    timeSlot: "morning" | "afternoon" | "evening"
  ) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability[day],
          [timeSlot]: !prev.availability[day][timeSlot]
        }
      }
    }));
  };

  const handleContinue = () => {
    router.push("/therapists");
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Registration Successful!</h1>
              <p className="text-lg text-gray-600 mb-8">Your therapist profile has been created successfully.</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile Summary</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Name</h3>
                  <p className="mt-1 text-lg text-gray-900">{formData.fullName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Specialization</h3>
                  <p className="mt-1 text-lg text-gray-900">{formData.specialization}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Hourly Rate</h3>
                  <p className="mt-1 text-lg text-gray-900">${formData.hourlyRate}/hour</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Service Description</h3>
                  <p className="mt-1 text-lg text-gray-900">{formData.description}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Experience</h3>
                  <p className="mt-1 text-lg text-gray-900">{formData.experience} years</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500 mb-6">
                You can now start accepting appointments from clients. Your profile will be visible in the therapist listing.
              </p>
              <Button
                onClick={handleContinue}
                className="w-full sm:w-auto"
              >
                Continue to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Register as a Therapist</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    errors.fullName ? "border-red-500" : ""
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    errors.phone ? "border-red-500" : ""
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Professional Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Specialization</label>
                <select
                  value={formData.specialization}
                  onChange={(e) => setFormData(prev => ({ ...prev, specialization: e.target.value }))}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    errors.specialization ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select a specialization</option>
                  {specializations.map((spec) => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
                {errors.specialization && (
                  <p className="mt-1 text-sm text-red-600">{errors.specialization}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description of Services</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    errors.description ? "border-red-500" : ""
                  }`}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Hourly Rate ($)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.hourlyRate}
                  onChange={(e) => setFormData(prev => ({ ...prev, hourlyRate: e.target.value }))}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    errors.hourlyRate ? "border-red-500" : ""
                  }`}
                />
                {errors.hourlyRate && (
                  <p className="mt-1 text-sm text-red-600">{errors.hourlyRate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Credentials</label>
                <input
                  type="text"
                  value={formData.credentials}
                  onChange={(e) => setFormData(prev => ({ ...prev, credentials: e.target.value }))}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    errors.credentials ? "border-red-500" : ""
                  }`}
                />
                {errors.credentials && (
                  <p className="mt-1 text-sm text-red-600">{errors.credentials}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    errors.experience ? "border-red-500" : ""
                  }`}
                />
                {errors.experience && (
                  <p className="mt-1 text-sm text-red-600">{errors.experience}</p>
                )}
              </div>
            </div>

            {/* Availability */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Availability</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Day</th>
                      <th className="px-4 py-2 text-center text-sm font-medium text-gray-500">Morning</th>
                      <th className="px-4 py-2 text-center text-sm font-medium text-gray-500">Afternoon</th>
                      <th className="px-4 py-2 text-center text-sm font-medium text-gray-500">Evening</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {Object.entries(formData.availability).map(([day, times]) => (
                      <tr key={day}>
                        <td className="px-4 py-2 text-sm font-medium text-gray-900 capitalize">
                          {day}
                        </td>
                        {["morning", "afternoon", "evening"].map((timeSlot) => (
                          <td key={timeSlot} className="px-4 py-2 text-center">
                            <input
                              type="checkbox"
                              checked={times[timeSlot as keyof typeof times]}
                              onChange={() => handleAvailabilityChange(day, timeSlot as "morning" | "afternoon" | "evening")}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {errors.availability && (
                <p className="text-sm text-red-600">Please select at least one time slot</p>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => router.push("/therapists")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Register"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
} 