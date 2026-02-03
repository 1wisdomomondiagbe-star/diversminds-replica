import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight, Menu, Globe, Users, Heart, Star, Brain, MessageSquare, Hand, BookOpen, CheckCircle2, Home as HomeIcon, School, Zap } from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    childName: "",
    ageRange: "",
    diagnosisStatus: "",
    observationTimeframe: "",
    selectedNeeds: [] as string[],
    selectedServices: [] as string[],
    deliveryPreference: "",
    mainGoal: "",
    parentEmotion: "",
    parentName: "",
    phone: "",
    email: "",
    location: "",
    consent: false,
  });

  const childNeeds = [
    "Communication difficulties",
    "Behavioral challenges",
    "Social skills",
    "Motor skills development",
    "Academic support needs",
    "Daily living skills",
    "Attention and focus",
  ];

  const services = [
    { name: "ABA Therapy", icon: Brain, description: "Evidence-based behavioral intervention for skill development" },
    { name: "Speech Therapy", icon: MessageSquare, description: "Communication and language development support" },
    { name: "Occupational Therapy", icon: Hand, description: "Fine motor skills and daily living activities" },
    { name: "Homeschooling Support", icon: BookOpen, description: "Personalized educational programs at home" },
    { name: "Shadow Teacher", icon: Users, description: "One-on-one school support services" },
    { name: "Parent Training", icon: Heart, description: "Coaching and guidance for caregivers" },
    { name: "Staff Training", icon: Star, description: "Professional capacity building programs" },
    { name: "Sign Language", icon: Hand, description: "Sign language tutoring and communication" },
    { name: "Assessments", icon: CheckCircle2, description: "Online and physical developmental evaluations" },
  ];

  const serviceOptions = [
    "ABA Therapy",
    "Speech Therapy",
    "Occupational Therapy",
    "Homeschooling Support",
    "Shadow Teacher",
    "Parent Training",
    "Staff Training",
    "Sign Language",
    "Assessment",
  ];

  const challenges = [
    "Struggling to find quality special education services in your area",
    "Overwhelmed by your child's developmental or behavioral challenges",
    "Unsure which therapy or support service your child needs most",
  ];

  const commitments = [
    { icon: Heart, text: "Compassionate, child-centered care in every service" },
    { icon: Globe, text: "Global accessibility — we serve clients worldwide" },
    { icon: Star, text: "Expert team with years of specialized experience" },
    { icon: Users, text: "Family-focused approach with parent involvement" },
  ];

  const faqs = [
    {
      question: "What is DiverseMinds Therapy?",
      answer: "DiverseMinds provides comprehensive therapeutic and educational support services for children with special needs, including ABA therapy, speech therapy, occupational therapy, and more.",
    },
    {
      question: "Do I need a diagnosis before reaching out?",
      answer: "No, you don't need a formal diagnosis. We work with families who are exploring concerns, seeking guidance, or have already received a diagnosis.",
    },
    {
      question: "Is this a medical or diagnostic service?",
      answer: "We provide therapeutic and educational support services. While we can conduct assessments, we are not a medical facility. We work alongside medical professionals when needed.",
    },
    {
      question: "What age groups do you work with?",
      answer: "We serve children from early childhood through adolescence, with services tailored to each age group's specific needs.",
    },
    {
      question: "What types of challenges can therapy help with?",
      answer: "We support children with communication difficulties, behavioral challenges, social skills, motor skills, academic needs, and more.",
    },
    {
      question: "How involved are parents in the therapy process?",
      answer: "Parents are central to our approach. We provide parent training, regular updates, and involve families in goal-setting and progress monitoring.",
    },
    {
      question: "How long does therapy usually last?",
      answer: "Duration varies based on individual needs and goals. We work with families to create flexible, sustainable plans.",
    },
    {
      question: "Will therapy guarantee results?",
      answer: "While we cannot guarantee specific outcomes, our evidence-based approaches have helped many children make meaningful progress.",
    },
    {
      question: "What happens after I submit the intake form?",
      answer: "Our team will review your information and contact you within 24-48 hours to discuss your child's needs and next steps.",
    },
    {
      question: "Is my information kept private?",
      answer: "Yes, we maintain strict confidentiality and comply with all data protection regulations.",
    },
    {
      question: "How do I know if therapy is right for my child?",
      answer: "We offer free consultations to discuss your concerns and help determine if our services are a good fit.",
    },
  ];

  const toggleNeed = (need: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedNeeds: prev.selectedNeeds.includes(need)
        ? prev.selectedNeeds.filter((n) => n !== need)
        : [...prev.selectedNeeds, need],
    }));
  };

  const toggleService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(service)
        ? prev.selectedServices.filter((s) => s !== service)
        : [...prev.selectedServices, service],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
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
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
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
              <div className="flex flex-col items-center justify-center gap-4 px-4 mb-6">
                <Button className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 w-full sm:w-auto">
                  Find the Right Support for Your Child
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
              </div>
              <p className="text-sm text-gray-600 mb-12">
                <span className="inline-block mr-4">• Free Consultation</span>
                <span className="inline-block mr-4">• Global Services</span>
                <span className="inline-block">• Expert Team</span>
              </p>

              {/* Feature Icons */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                    <Globe className="w-8 h-8 text-purple-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">Global Reach</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">Multi-Service</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mb-3">
                    <Heart className="w-8 h-8 text-pink-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">Compassionate</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mb-3">
                    <Star className="w-8 h-8 text-yellow-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">Expert Team</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Services Section */}
        <section id="services" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Our Services
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Comprehensive support tailored to your child's unique needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.name}
                    className="p-6 sm:p-8 rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50 text-center"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                        <IconComponent className="w-8 h-8 text-purple-600" />
                      </div>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {service.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* We Understand Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
                We Understand the Challenges You Face
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-8 text-center">
                If you're here, you may be:
              </p>
              <div className="space-y-4">
                {challenges.map((challenge, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">•</span>
                    </div>
                    <p className="text-gray-700 text-base sm:text-lg">{challenge}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                <p className="text-center text-lg font-semibold text-gray-900">
                  You're not alone.
                </p>
                <p className="text-center text-gray-600 mt-2">
                  We're here to help — wherever you are in the world.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Flexible Service Delivery */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Flexible Service Delivery Options
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Choose online, home-based, school-based, or a combination — whatever works best for your family.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
              {[
                {
                  title: "Online Services",
                  icon: Zap,
                  benefits: [
                    "Access services from anywhere in the world",
                    "Flexible scheduling across time zones",
                    "Interactive virtual sessions with therapists",
                    "Perfect for speech, ABA, parent training, and more",
                  ],
                },
                {
                  title: "Home-Based Services",
                  icon: HomeIcon,
                  benefits: [
                    "Therapists come to your home",
                    "Comfortable, familiar environment for your child",
                    "Hands-on support for daily routines",
                    "Ideal for OT, behavioral support, and personalized care",
                  ],
                },
                {
                  title: "School-Based Services",
                  icon: School,
                  benefits: [
                    "Shadow teaching support within the school environment",
                    "Therapy sessions during specific school hours",
                    "Help with classroom routines, learning tasks, and behavior regulation",
                    "Consistent support to the child in mainstream settings",
                  ],
                },
                {
                  title: "Hybrid Approach",
                  icon: Users,
                  benefits: [
                    "Many families benefit from combining online, home-based, and school-based services",
                    "We'll help you design a flexible plan that adapts to your child's progress, school needs, and your family's schedule",
                  ],
                },
              ].map((option, idx) => {
                const IconComponent = option.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 sm:p-8 rounded-lg border border-gray-200 hover:border-purple-300 transition-all duration-300 bg-gradient-to-br from-white to-gray-50"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-purple-600" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                        {option.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base mb-4 font-medium">
                      Perfect for children who need:
                    </p>
                    <ul className="space-y-2">
                      {option.benefits.map((benefit, bidx) => (
                        <li key={bidx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm sm:text-base">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Our Commitment */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
              Our Commitment to You
            </h2>
            <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
              <p className="text-center text-lg text-gray-600 mb-8">
                At DiverseMinds, we believe:
              </p>
              <div className="space-y-6">
                {commitments.map((commitment, idx) => {
                  const IconComponent = commitment.icon;
                  return (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-purple-600" />
                      </div>
                      <p className="text-gray-700 text-base sm:text-lg font-medium">
                        {commitment.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Intake Form Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Find the Right Support for Your Child
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                Tell us about your child so we can provide the best support
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 space-y-8">
              {/* Child's Name */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-900">
                  Child's Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={formData.childName}
                  onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 placeholder-gray-500"
                />
              </div>

              {/* Age Range */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-900">
                  Age Range
                </label>
                <select
                  value={formData.ageRange}
                  onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
                >
                  <option value="">Select age range</option>
                  <option value="under-3">Under 3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="6-9">6-9 years</option>
                  <option value="10-12">10-12 years</option>
                </select>
              </div>

              {/* Diagnosis Status */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-900">
                  Has your child received a formal diagnosis?
                </label>
                <select
                  value={formData.diagnosisStatus}
                  onChange={(e) => setFormData({ ...formData, diagnosisStatus: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
                >
                  <option value="">Select status</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="in-progress">Currently in progress</option>
                  <option value="prefer-not">Prefer not to say</option>
                </select>
              </div>

              {/* Observation Timeframe */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-900">
                  When did you first notice these challenges?
                </label>
                <select
                  value={formData.observationTimeframe}
                  onChange={(e) => setFormData({ ...formData, observationTimeframe: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
                >
                  <option value="">Select timeframe</option>
                  <option value="recently">Recently (last few months)</option>
                  <option value="over-time">Over time</option>
                  <option value="early-childhood">Since early childhood</option>
                  <option value="not-sure">Not sure</option>
                </select>
              </div>

              {/* Child's Primary Needs */}
              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-900">
                  What are your child's primary needs? (Select all that apply)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {childNeeds.map((need) => (
                    <div
                      key={need}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-purple-50/50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        id={need}
                        checked={formData.selectedNeeds.includes(need)}
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
                  {serviceOptions.map((service) => (
                    <div
                      key={service}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-purple-50/50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        id={service}
                        checked={formData.selectedServices.includes(service)}
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

              {/* Delivery Preference */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-900">
                  Delivery Preference
                </label>
                <select
                  value={formData.deliveryPreference}
                  onChange={(e) => setFormData({ ...formData, deliveryPreference: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
                >
                  <option value="">Select preference</option>
                  <option value="online">Online sessions</option>
                  <option value="home">Home-based services</option>
                  <option value="school">School-based services</option>
                  <option value="combination">Combination of multiple options</option>
                </select>
              </div>

              {/* Main Goal */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-900">
                  What is your main goal for your child?
                </label>
                <textarea
                  placeholder="Tell us what you hope to achieve..."
                  value={formData.mainGoal}
                  onChange={(e) => setFormData({ ...formData, mainGoal: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 placeholder-gray-500 min-h-24"
                />
              </div>

              {/* Parent Emotion */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-900">
                  How are you feeling right now?
                </label>
                <select
                  value={formData.parentEmotion}
                  onChange={(e) => setFormData({ ...formData, parentEmotion: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
                >
                  <option value="">Select one</option>
                  <option value="exploring">Just exploring</option>
                  <option value="concerned">Slightly concerned</option>
                  <option value="guidance">Looking for guidance</option>
                  <option value="overwhelmed">Feeling overwhelmed</option>
                </select>
              </div>

              {/* Parent Name */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-900">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 placeholder-gray-500"
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-900">
                  Phone Number / WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="+234..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 placeholder-gray-500"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-900">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 placeholder-gray-500"
                  required
                />
              </div>

              {/* Location */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-900">
                  Your Location (City/Country)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Lagos, Nigeria"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 placeholder-gray-500"
                />
              </div>

              {/* Consent */}
              <div className="flex items-start space-x-2 p-2 rounded-lg">
                <input
                  type="checkbox"
                  id="consent"
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 mt-1"
                  required
                />
                <label
                  htmlFor="consent"
                  className="text-sm sm:text-base text-gray-700 cursor-pointer"
                >
                  I consent to be contacted by DiverseMinds regarding my inquiry{" "}
                  <span className="text-red-500">*</span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-6 text-base sm:text-lg rounded-lg"
                >
                  Get Started with DiverseMinds
                </Button>
              </div>
            </form>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                Find answers to common questions about our services
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`}>
                    <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-purple-600">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 text-base leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Take the first step toward finding the right support for your child. Our team is ready to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-base sm:text-lg rounded-lg">
                Get Started - Free Consultation
              </Button>
              <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-base sm:text-lg rounded-lg flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </Button>
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
