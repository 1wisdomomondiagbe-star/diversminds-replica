import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight, Menu } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const needs = [
    "Speech and language development",
    "Autism spectrum support",
    "Behavioral management",
    "Motor skills development",
    "Academic support needs",
    "Daily living skills",
    "Attention and focus",
  ];

  const services = [
    "ABA Therapy",
    "Speech Therapy",
    "Occupational Therapy",
    "Homeschooling Support",
    "Behavioral Coaching",
    "Parent Training",
  ];

  const toggleNeed = (need: string) => {
    setSelectedNeeds((prev) =>
      prev.includes(need) ? prev.filter((n) => n !== need) : [...prev, need]
    );
  };

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a className="flex items-center" href="#home">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                DiverseMinds
              </span>
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#services"
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                Services
              </a>
              <a
                href="#faq"
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                FAQ
              </a>
              <button className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                Contact us
              </button>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Get Started
              </Button>
            </div>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-8">
                <img
                  src="/logo.png"
                  alt="DiverseMinds Logo"
                  className="w-[260px] sm:w-[270px] md:w-[280px] h-auto drop-shadow-2xl hover:drop-shadow-[0_0_25px_rgba(147,51,234,0.5)] transition-all duration-300"
                />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2">
                Empowering Children with Special Needs —{" "}
                <span className="text-purple-600">Worldwide</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-4">
                From ABA therapy to speech, occupational therapy, homeschooling
                support, and more — DiverseMinds offers expert, compassionate
                services both online and at home. Location is not a barrier 🌍
              </p>
              <div className="flex flex-col items-center justify-center gap-4 px-4">
                <Button className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
                <Button className="bg-white/10 backdrop-blur-md border-2 border-white/50 text-white hover:bg-white hover:text-purple-700 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-full transition-all duration-500 w-full sm:w-auto shadow-xl hover:shadow-2xl">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span className="truncate">WhatsApp Us</span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Our Services
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Comprehensive support tailored to each child's unique needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {services.map((service) => (
                <div
                  key={service}
                  className="p-6 sm:p-8 rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50"
                >
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                    {service}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Expert care and support for your child's development and
                    growth.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Assessment Form Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Let's Understand Your Needs
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                Tell us about your child so we can provide the best support
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 space-y-8">
              {/* Child's Name */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-900">
                  Child's Name
                </label>
                <input
                  type="text"
                  placeholder="Enter child's name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 placeholder-gray-500"
                />
              </div>

              {/* Age */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-900">
                  Age
                </label>
                <input
                  type="number"
                  placeholder="Enter age"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 placeholder-gray-500"
                />
              </div>

              {/* Needs */}
              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-900">
                  What are your child's primary needs? (Select all that apply)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {needs.map((need) => (
                    <div
                      key={need}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-purple-50/50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        id={need}
                        checked={selectedNeeds.includes(need)}
                        onChange={() => toggleNeed(need)}
                        className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <label
                        htmlFor={need}
                        className="text-sm sm:text-base text-gray-700 cursor-pointer flex-1"
                      >
                        {need}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Services Interest */}
              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-900">
                  Which services are you interested in? (Select all that apply)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {services.map((service) => (
                    <div
                      key={service}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-purple-50/50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        id={service}
                        checked={selectedServices.includes(service)}
                        onChange={() => toggleService(service)}
                        className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <label
                        htmlFor={service}
                        className="text-sm sm:text-base text-gray-700 cursor-pointer flex-1"
                      >
                        {service}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-6 text-base sm:text-lg rounded-lg">
                  Submit Assessment
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                Find answers to common questions about our services
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "What age groups do you serve?",
                  a: "We serve children from ages 2 to 18 with various special needs and developmental challenges.",
                },
                {
                  q: "Do you offer online services?",
                  a: "Yes, we offer both online and in-home services to ensure accessibility for families worldwide.",
                },
                {
                  q: "How do I schedule a consultation?",
                  a: "You can contact us via WhatsApp, phone, or email to schedule your initial consultation.",
                },
                {
                  q: "What qualifications do your therapists have?",
                  a: "All our therapists are certified professionals with extensive experience in their respective fields.",
                },
              ].map((faq, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors bg-gradient-to-br from-white to-gray-50"
                >
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                    {faq.q}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 text-white py-6 sm:py-8 md:py-10 lg:py-12 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 sm:space-y-4">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium px-2 leading-relaxed">
            DIVERSEMINDS SPECIAL EDUCATION NEEDS & CONSULT LTD.
          </p>
          <div className="space-y-2">
            <p className="text-xs sm:text-sm md:text-base text-gray-400 px-2">
              RC. 7325824 • Location is not a barrier — we proudly serve clients
              worldwide 🌍
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 md:gap-3 text-xs sm:text-sm md:text-base text-gray-400 px-2 flex-wrap">
              <a
                href="tel:+2348168349969"
                className="hover:text-purple-300 transition-colors"
              >
                +234 816 834 9969
              </a>
              <span className="hidden sm:inline">•</span>
              <a
                href="tel:+2348120094884"
                className="hover:text-purple-300 transition-colors"
              >
                +234 812 009 4884
              </a>
              <span className="hidden sm:inline">•</span>
              <a
                href="mailto:diversemindsfoundation@gmail.com"
                className="hover:text-purple-300 transition-colors break-all sm:break-normal"
              >
                diversemindsfoundation@gmail.com
              </a>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-4 px-2 leading-relaxed">
            © 2026 DiverseMinds. Empowering children with special needs — with
            compassion and expertise.
          </p>
        </div>
      </footer>
    </div>
  );
}
