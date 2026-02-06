import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { MessageCircle, ArrowRight, Menu, Globe, Users, Heart, Star, Brain, MessageSquare, Hand, BookOpen, CheckCircle2, Home as HomeIcon, School, Zap, X, Check } from "lucide-react";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Home() {
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

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

  const submitIntake = trpc.intake.submit.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.parentName || !formData.phone || !formData.email || !formData.consent) {
      alert("Please fill in all required fields and consent to be contacted.");
      return;
    }

    try {
      const result = await submitIntake.mutateAsync({
        childName: formData.childName,
        ageRange: formData.ageRange,
        diagnosisStatus: formData.diagnosisStatus,
        observationTimeframe: formData.observationTimeframe,
        selectedNeeds: formData.selectedNeeds,
        selectedServices: formData.selectedServices,
        deliveryPreference: formData.deliveryPreference,
        mainGoal: formData.mainGoal,
        parentEmotion: formData.parentEmotion,
        parentName: formData.parentName,
        phone: formData.phone,
        email: formData.email,
        location: formData.location,
        consent: formData.consent,
      });

      if (result.success) {
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
          setFormData({
            childName: "",
            ageRange: "",
            diagnosisStatus: "",
            observationTimeframe: "",
            selectedNeeds: [],
            selectedServices: [],
            deliveryPreference: "",
            mainGoal: "",
            parentEmotion: "",
            parentName: "",
            phone: "",
            email: "",
            location: "",
            consent: false,
          });
        }, 3000);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a 
              className="flex items-center cursor-pointer" 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                DiverseMinds
              </span>
            </a>
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection("services")}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                FAQ
              </button>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                    Contact us
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Get in Touch</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Email</p>
                        <a href="mailto:blackeyesamvs@gmail.com" className="text-purple-600 hover:text-purple-700 font-medium">
                          blackeyesamvs@gmail.com
                        </a>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">WhatsApp</p>
                        <a href="https://wa.me/2347047756279" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-2">
                          <MessageCircle className="w-4 h-4" />
                          Chat with us
                        </a>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <Button 
                onClick={scrollToForm}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                Get Started
              </Button>
            </div>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-gray-50 border-t border-gray-100"
            >
              <div className="px-4 py-4 space-y-3">
                <button
                  onClick={() => scrollToSection("services")}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:text-purple-600 transition-colors font-medium"
                >
                  Services
                </button>
                <button
                  onClick={() => scrollToSection("faq")}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:text-purple-600 transition-colors font-medium"
                >
                  FAQ
                </button>
                <button
                  onClick={scrollToForm}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:text-purple-600 transition-colors font-medium"
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section id="home" className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center">
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
                <Button 
                  onClick={scrollToForm}
                  className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 w-full sm:w-auto"
                >
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

        {/* Services Section */}
        <section id="services" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Our Services
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Comprehensive therapeutic and educational support tailored to your child's unique needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={index}
                    className="p-6 sm:p-8 rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
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
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                We Understand the Challenges
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                You're not alone. Many families face similar concerns, and we're here to help
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {challenges.map((challenge, index) => (
                <div
                  key={index}
                  className="p-6 sm:p-8 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                      {challenge}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Delivery Options */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Flexible Service Delivery
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Choose the delivery method that works best for your family
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                { title: "Online", icon: Globe, description: "Virtual sessions from the comfort of your home" },
                { title: "Home-Based", icon: HomeIcon, description: "In-home sessions for personalized support" },
                { title: "School-Based", icon: School, description: "Support integrated into school environment" },
                { title: "Hybrid", icon: Zap, description: "Combination of online and in-person services" },
              ].map((option, index) => {
                const IconComponent = option.icon;
                return (
                  <div
                    key={index}
                    className="p-6 sm:p-8 rounded-lg border-2 border-purple-200 hover:border-purple-600 hover:shadow-lg transition-all duration-300 text-center bg-gradient-to-br from-purple-50 to-blue-50"
                  >
                    <IconComponent className="w-8 h-8 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                      {option.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {option.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Our Commitment */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Our Commitment to You
              </h2>
              <p className="text-base sm:text-lg text-purple-100 max-w-2xl mx-auto">
                We're dedicated to supporting your child's growth and development
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {commitments.map((commitment, index) => {
                const IconComponent = commitment.icon;
                return (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-base sm:text-lg leading-relaxed">
                      {commitment.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Intake Form Section */}
        <section ref={formRef} id="form" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Service Inquiry Form
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                Tell us about your child's needs so we can provide the best support
              </p>
            </div>

            {/* Success Message */}
            <AnimatePresence>
              {showSuccessMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-8 p-6 sm:p-8 bg-green-50 border-2 border-green-500 rounded-lg text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="flex justify-center mb-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
                      <Check className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-green-700 mb-2">Thank You!</h3>
                  <p className="text-green-600">
                    Your inquiry has been received. We'll contact you within 24-48 hours to discuss your child's needs and next steps.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            {!showSuccessMessage && (
              <form
                onSubmit={handleSubmit}
                className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-lg space-y-6 sm:space-y-8"
              >
                {/* Child Name */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-900">
                    Child's Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.childName}
                    onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
                    placeholder="Enter child's name"
                  />
                </div>

                {/* Age Range */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-900">
                    Age Range (Optional)
                  </label>
                  <select
                    value={formData.ageRange}
                    onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
                  >
                    <option value="">Select age range</option>
                    <option value="0-2">0-2 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="6-9">6-9 years</option>
                    <option value="10-13">10-13 years</option>
                    <option value="14-18">14-18 years</option>
                  </select>
                </div>

                {/* Diagnosis Status */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-900">
                    Has your child been diagnosed? (Optional)
                  </label>
                  <select
                    value={formData.diagnosisStatus}
                    onChange={(e) => setFormData({ ...formData, diagnosisStatus: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
                  >
                    <option value="">Select status</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="exploring">Exploring</option>
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
                    disabled={submitIntake.isPending}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-6 text-base sm:text-lg rounded-lg"
                  >
                    {submitIntake.isPending ? "Submitting..." : "Get Started with DiverseMinds"}
                  </Button>
                </div>
              </form>
            )}
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
              Take the first step toward getting the support your child needs. Our team is ready to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={scrollToForm}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg rounded-lg"
              >
                Submit Inquiry
              </Button>
              <a
                href="https://wa.me/2347047756279"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg rounded-lg transition-colors"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/2347047756279"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-green-400 to-green-600 shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center text-white"
      >
        <MessageCircle className="w-7 h-7" />
      </motion.a>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                DiverseMinds
              </h3>
              <p className="text-gray-400 text-sm">
                Empowering children with special needs worldwide with compassionate, expert support.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => scrollToSection("services")} className="hover:text-white transition-colors">Services</button></li>
                <li><button onClick={() => scrollToSection("faq")} className="hover:text-white transition-colors">FAQ</button></li>
                <li><button onClick={scrollToForm} className="hover:text-white transition-colors">Get Started</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="mailto:blackeyesamvs@gmail.com" className="hover:text-white transition-colors">Email</a></li>
                <li><a href="https://wa.me/2347047756279" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">About</h4>
              <p className="text-sm text-gray-400">
                DiverseMinds Special Needs Consult Ltd. provides comprehensive therapeutic and educational support services.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2026 DiverseMinds. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
