import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  MessageCircle,
  Users,
  Calendar,
  Clock,
  Globe,
  Award,
  CheckCircle,
  Play,
  X,
  Sparkles,
  Star,
  TrendingUp,
  Target,
  Zap,
  ArrowRight,
} from "lucide-react";
import { Chat } from "@/componentes/chat";

const ConversationalClubLanding = () => {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const aboutRef = useRef(null);
  const faqRef = useRef(null);
  const homeRef = useRef(null);
  const contactRef = useRef(null);

  const [verChat, setVerChat] = useState(false);
  const [showGuide, setShowGuide] = useState(false); // NEW: overlay guide

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleRegisterClick = () => {
    setVerChat(!verChat);
    setShowGuide(true); // NEW: show overlay guide
  };

  const handleChatToggle = () => {
    setVerChat(!verChat);
  };

  const handleLogoClick = () => {
    setVerChat((prev) => !prev);
  };

  // NEW: Close overlays with ESC
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowVideoModal(false);
        setShowGuide(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const VideoModal = () => {
    if (!showVideoModal) return null;

    // Lock scroll while modal is open
    useEffect(() => {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev || "auto";
      };
    }, []);

    const stop = (e) => e.stopPropagation();
    const handleBackdropClick = () => setShowVideoModal(false);

    return (
      <div
        className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4 animate-fadeIn"
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-label="Video modal"
      >
        <div
          className="relative rounded-3xl p-4 md:p-6 max-w-xs sm:max-w-md w-full border border-[#EE7203]/30 bg-gradient-to-br from-[#112C3E]/90 to-[#0C212D]/90 backdrop-blur-xl shadow-2xl animate-scaleIn"
          onClick={stop}
        >
          <button
            onClick={() => setShowVideoModal(false)}
            className="absolute -top-4 -right-4 bg-gradient-to-r from-[#FF3816] to-[#EE7203] text-white rounded-full p-3 hover:shadow-xl hover:scale-110 transition-all duration-300 z-10 border-2 border-white/20"
            aria-label="Cerrar video"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="aspect-[9/16] bg-gradient-to-br from-[#112C3E] to-[#0C212D] rounded-2xl overflow-hidden mx-auto max-h-[70vh] border border-white/10 shadow-inner">
            <iframe
              src="https://www.youtube.com/embed/jNw2LFNI1zc"
              title="Meet Morgan Robinson - Your English Coach"
              className="w-full h-full rounded-2xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    );
  };

  // NEW: Dark blur overlay that points to the bot (bottom-right)
  const GuideOverlay = () => {
    if (!showGuide) return null;

    const handleClose = () => setShowGuide(false);
    const stop = (e) => e.stopPropagation();

    // Lock scroll while overlay is open
    useEffect(() => {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev || "auto";
      };
    }, []);

    return (
      <div
        className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm animate-fadeIn"
        onClick={handleClose}
        role="dialog"
        aria-modal="true"
        aria-label="Guide overlay"
      >
        {/* Central message card (click inside does not close) */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md w-[90%] sm:w-[480px] bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6 text-white shadow-2xl"
          onClick={stop}
        >
          <div className="flex items-start gap-3">
            <div className="bg-gradient-to-r from-[#EE7203] to-[#FF3816] rounded-xl p-2 shrink-0">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">One more step! ✨</h3>
              <p className="text-white/90">
                Click the <span className="font-semibold">bot</span> at the
                bottom right to start your registration.
              </p>
            </div>
          </div>

          <p className="text-center text-xs text-white/60 mt-2">
            (Press <span className="font-semibold">Esc</span> or click outside
            to close)
          </p>
        </div>

        {/* Arrow + label pointing to the bottom-right */}
        <div className="pointer-events-none absolute bottom-24 right-24 hidden sm:block">
          <div className="mb-2 px-3 py-1 rounded-full text-sm font-semibold bg-white/10 border border-white/20 backdrop-blur-sm inline-block text-white">
            Here is the bot 👇
          </div>
          <div className="w-40 h-40 relative">
            <div className="absolute inset-0 rotate-45 animate-slowBounce flex items-center">
              <ArrowRight className="w-40 h-40 text-white/80" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#112C3E] via-[#0C212D] to-[#112C3E] relative overflow-hidden">
      {/* Enhanced Background with floating particles */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-[#EE7203] to-[#FF3816] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-96 h-96 bg-gradient-to-r from-[#495463] to-[#112C3E] rounded-full blur-3xl animate-slowBounce"></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-gradient-to-r from-[#FF3816] to-[#EE7203] rounded-full blur-3xl animate-float"></div>

        {/* Additional floating elements */}
        <div className="absolute top-1/4 right-1/3 w-32 h-32 bg-gradient-to-r from-[#EE7203]/20 to-[#FF3816]/20 rounded-full blur-2xl animate-slowFloat"></div>
        <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-gradient-to-r from-[#495463]/30 to-[#112C3E]/30 rounded-full blur-xl animate-float delay-1000"></div>

        {/* Sparkle effects */}
        <div className="absolute top-1/3 left-1/5 w-2 h-2 bg-[#EE7203] rounded-full animate-twinkle"></div>
        <div className="absolute top-2/3 right-1/5 w-1 h-1 bg-[#FF3816] rounded-full animate-twinkle delay-500"></div>
        <div className="absolute bottom-1/3 left-2/3 w-1.5 h-1.5 bg-white rounded-full animate-twinkle delay-1000"></div>
      </div>

      {/* Enhanced Navigation with glassmorphism */}
      <nav
        ref={homeRef}
        className="relative z-10 max-w-7xl mx-auto p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        {/* Logo */}
        <button
          onClick={handleLogoClick}
          className="rounded-xl flex items-center justify-center overflow-hidden hover:scale-110 transition-all duration-500 hover:rotate-6 cursor-pointer group"
        >
          <div className="relative">
            <Image
              src="/logo-further.png"
              alt="Further Academy Logo"
              width={150}
              height={150}
              priority
              className="object-contain transition-all duration-300"
            />
            <div className="absolute inset-0 0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </button>

        {/* Menu (same estilo en mobile, centrado y con wrap) */}
        <div className="w-full md:w-auto flex flex-wrap justify-center gap-4 sm:gap-6 text-white/90 bg-white/5 backdrop-blur-sm rounded-2xl px-4 sm:px-8 py-3 sm:py-4 border border-white/10">
          {[
            { label: "Home", ref: homeRef },
            { label: "About", ref: aboutRef },
            { label: "FAQ", ref: faqRef },
            { label: "Contact", ref: contactRef },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.ref)}
              className="hover:text-white transition-all duration-300 hover:scale-105 font-medium relative group"
            >
              {item.label}
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#EE7203] to-[#FF3816] group-hover:w-full transition-all duration-300"></div>
            </button>
          ))}
        </div>

        {/* Register button (debajo y full-width en mobile) */}
        <button
          onClick={handleRegisterClick}
          className="w-full md:w-auto bg-gradient-to-r from-[#EE7203] to-[#FF3816] text-white px-6 py-3 rounded-full font-semibold hover:shadow-2xl hover:shadow-[#EE7203]/25 transition-all duration-300 transform hover:scale-105 relative overflow-hidden group border border-white/20"
        >
          <span className="relative z-10">Register 👇</span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF3816] to-[#EE7203] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </nav>

      {/* Enhanced Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {/* Enhanced Badge with B1+ requirement */}
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg rounded-full text-white/90 text-sm border border-white/20 hover:border-[#EE7203]/30 transition-all duration-300 shadow-lg">
              <MessageCircle className="w-4 h-4 mr-2 text-[#EE7203]" />
              <Sparkles className="w-3 h-3 mr-1 animate-pulse" />
              PRACTICE ENGLISH WITH CONFIDENCE
              <span className="ml-2 px-2 py-1 bg-gradient-to-r from-[#EE7203] to-[#FF3816] rounded-full text-xs font-bold">
                B1+
              </span>
            </div>

            {/* Enhanced Title */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                Your Success
                <span className="block bg-gradient-to-r from-[#EE7203] via-[#FF3816] to-[#EE7203] bg-clip-text text-transparent animate-gradient bg-300% drop-shadow-lg">
                  Our Priority
                </span>
              </h1>

              {/* Enhanced Subtitle */}
              <div className="relative">
                <p className="text-2xl lg:text-3xl font-semibold text-white leading-relaxed drop-shadow-sm">
                  <span className="bg-gradient-to-r from-[#EE7203] to-[#FF3816] bg-clip-text text-transparent">
                    Exclusive Free
                  </span>{" "}
                  <span className="text-white">Conversational Course</span>
                </p>
                <p className="text-lg text-white/70 mt-2 font-medium">
                  For Intermediate to Advanced Learners (B1 Level & Above)
                </p>
              </div>
            </div>

            {/* Enhanced Description */}
            <div className="space-y-4 max-w-3xl">
              <p className="text-xl text-white/85 leading-relaxed">
                Take language learning to the next level! Step confidently into
                new opportunities by developing real-world language skills.
              </p>

              <p className="text-xl text-white/85 leading-relaxed">
                Our{" "}
                <span className="font-semibold text-[#EE7203]">free course</span> is designed{" "}
                <span className="font-semibold text-white">exclusively for our valued clients</span>{" "}
                to help you thrive in conversations, not just fill in the blanks.
              </p>

              {/* New B1+ requirement highlight */}
              <div className="bg-gradient-to-r from-[#EE7203]/10 to-[#FF3816]/10 border border-[#EE7203]/30 rounded-2xl p-4 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-[#EE7203]" />
                  <p className="text-white/90 font-medium">
                    <span className="text-[#EE7203] font-bold">Perfect for B1+ students</span> ready to take their conversational skills to the next level
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleRegisterClick}
                className="bg-gradient-to-r from-[#EE7203] to-[#FF3816] text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-[#EE7203]/30 transition-all duration-300 transform hover:scale-105 relative overflow-hidden group border border-white/10"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Register with Bot
                  <span className="ml-2 animate-bounce group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF3816] to-[#EE7203] opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              </button>

              <button
                onClick={() => setShowVideoModal(true)}
                className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-gradient-to-r hover:from-white/10 hover:to-white/5 hover:border-[#EE7203]/50 transition-all duration-300 flex items-center justify-center gap-2 group backdrop-blur-sm"
              >
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                Learn More
              </button>
            </div>

            {/* Enhanced Stats with same height cards */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {[
                {
                  value: "FREE",
                  label: "Workshop",
                  icon: <Award className="w-6 h-6" />,
                  exclusive: true,
                },
                {
                  value: "8",
                  label: "Sessions",
                  icon: <Calendar className="w-6 h-6" />,
                  exclusive: false,
                },
                {
                  value: "10",
                  label: "Max per Group",
                  icon: <Users className="w-6 h-6" />,
                  exclusive: false,
                },
              ].map((stat, index) => (
                <div key={index} className="text-center group cursor-default h-full">
                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#EE7203]/30 transition-all duration-300 hover:scale-105 overflow-hidden h-full min-h-[180px] sm:min-h-[200px] lg:min-h-[220px] flex flex-col items-center justify-center">
                    {/* Enhanced Exclusive badge */}
                    {stat.exclusive && (
                      <>
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#EE7203] via-[#FF3816] to-[#EE7203] animate-gradient bg-300%"></div>
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 z-10">
                          <div className="bg-gradient-to-r from-[#EE7203] to-[#FF3816] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-xl border border-white/20 relative overflow-hidden group-hover:scale-110 transition-all duration-300">
                            <span className="relative z-10 flex items-center gap-1">
                              <Sparkles className="w-3 h-3 animate-pulse" />
                              Exclusive
                              <Sparkles className="w-3 h-3 animate-pulse" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#FF3816] to-[#EE7203] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="text-[#EE7203] mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300 mt-2">
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold text-white group-hover:text-[#EE7203] transition-colors duration-300 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-white/70 font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Morgan's Profile Card */}
          <div className="relative">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl hover:shadow-[#EE7203]/10 transition-all duration-500 hover:scale-[1.02]">
              {/* Enhanced Morgan's Image - Large */}
              <div className="w-full h-80 bg-gradient-to-br from-[#495463] to-[#112C3E] rounded-2xl mb-6 flex items-center justify-center overflow-hidden relative border border-white/10 shadow-inner">
                <Image
                  src="/morgan.jpg"
                  alt="Morgan Robinson"
                  fill
                  className="object-cover rounded-2xl hover:scale-105 transition-transform duration-500"
                  style={{ zIndex: 1 }}
                />
                {/* Enhanced overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>

                {/* Level indicator badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-[#EE7203] to-[#FF3816] text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg border border-white/20">
                  Native Speaker
                </div>
              </div>

              <div className="flex items-center mb-6 group">
                <div className="w-12 h-12 bg-gradient-to-r from-[#EE7203] to-[#FF3816] rounded-full flex items-center justify-center mr-4 overflow-hidden relative border-2 border-white/20 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src="/morgan.jpg"
                    alt="Morgan Robinson"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg flex items-center">
                    Meet Morgan Robinson
                    <Star className="w-4 h-4 ml-2 text-[#EE7203] animate-pulse" />
                  </h3>
                  <p className="text-white/70 flex items-center gap-2">
                    Native English Speaker from London
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-sm shadow-green-400/50"></span>
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { text: "Business English Specialist", icon: <TrendingUp className="w-4 h-4" /> },
                  { text: "Intercultural Communication Expert", icon: <Globe className="w-4 h-4" /> },
                  { text: "Dynamic & Fun Teaching Style", icon: <Zap className="w-4 h-4" /> },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center text-white/90 group hover:text-white transition-colors duration-300 hover:bg-white/5 rounded-lg p-2 -m-2"
                  >
                    <div className="text-[#EE7203] mr-3 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <CheckCircle className="w-4 h-4 text-[#EE7203] mr-3 group-hover:scale-110 transition-transform duration-300" />
                    {feature.text}
                  </div>
                ))}
              </div>

              <div className="mt-6 p-6 bg-gradient-to-r from-[#112C3E]/60 to-[#0C212D]/60 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-[#EE7203]/30 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-2 right-2">
                  <div className="w-2 h-2 bg-[#EE7203] rounded-full animate-pulse shadow-lg shadow-[#EE7203]/50"></div>
                </div>
                <p className="text-white/90 italic relative z-10 text-center font-medium">
                  "Join me for dynamic, fun sessions focused on real-life
                  language use. Perfect for B1+ students ready to excel!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced About Section */}
      <div
        ref={aboutRef}
        className="relative z-10 bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-sm border-t border-white/10"
      >
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-8 flex items-center justify-center gap-3">
              <Sparkles className="w-8 h-8 text-[#EE7203] animate-pulse" />
              About the Conversational Club
              <Sparkles className="w-8 h-8 text-[#FF3816] animate-pulse" />
            </h2>

            {/* B1+ Level indicator */}
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#EE7203]/20 to-[#FF3816]/20 backdrop-blur-lg rounded-full text-white border border-[#EE7203]/30 mb-8">
              <Target className="w-5 h-5 mr-2 text-[#EE7203]" />
              <span className="font-semibold">Designed for B1 Level & Above</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:border-[#EE7203]/30 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-[#EE7203]" />
                What You'll Experience
              </h3>
              <p className="text-lg text-white/80 leading-relaxed">
                Our Conversational Club bridges the gap between classroom English and real-world communication. Through guided conversations, interactive activities, and personalized feedback, you'll gain the confidence to speak English naturally in any situation.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:border-[#EE7203]/30 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-6 h-6 text-[#FF3816]" />
                Perfect for B1+ Students
              </h3>
              <p className="text-lg text-white/80 leading-relaxed">
                If you can already handle basic conversations and understand intermediate English, this club will take your speaking skills to an advanced level. Focus on fluency, natural expressions, and confidence-building.
              </p>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <TrendingUp className="w-6 h-6" />, title: "Skill Advancement", desc: "Take your B1+ level to the next stage" },
              { icon: <Users className="w-6 h-6" />, title: "Small Groups", desc: "Maximum 10 students for personalized attention" },
              { icon: <Globe className="w-6 h-6" />, title: "Real Scenarios", desc: "Practice with authentic conversation topics" },
            ].map((benefit, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-[#EE7203]/30 transition-all duration-300 hover:scale-105">
                <div className="text-[#EE7203] mb-4 flex justify-center">
                  {benefit.icon}
                </div>
                <h4 className="text-white font-semibold text-lg mb-2">{benefit.title}</h4>
                <p className="text-white/70">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced FAQ Section */}
      <div
        ref={faqRef}
        className="relative z-10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border-t border-white/10"
      >
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Frequently Asked Questions
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <MessageCircle className="w-6 h-6" />,
                question: "What is the Conversational Club?",
                answer:
                  "It's a free online workshop designed to help intermediate to advanced students (B1+) practice English in an immersive way with Morgan Robinson, a native speaker from London! You'll have real conversations, discuss current topics, and boost your confidence.",
              },
              {
                icon: <Target className="w-6 h-6" />,
                question: "What level do I need to join?",
                answer:
                  "You need to be at B1 level or above. This means you can handle basic conversations, understand intermediate English, and are ready to focus on fluency and advanced conversational skills.",
              },
              {
                icon: <Users className="w-6 h-6" />,
                question: "Who can join?",
                answer:
                  "Anyone who is currently taking part in Further or has been invited through their company. You must be at B1+ level to participate effectively in the conversations.",
              },
              {
                icon: <Calendar className="w-6 h-6" />,
                question: "When does it start?",
                answer:
                  "It takes off on August 20th. There will be different groups on Wednesday and Friday depending on your level and interests. We will keep you posted no later than Mon 18th when your class has been scheduled.",
              },
              {
                icon: <Globe className="w-6 h-6" />,
                question: "What platform will be used?",
                answer:
                  "We'll meet on Teams. You'll receive the link and schedule details by email before the first session.",
              },
              {
                icon: <Award className="w-6 h-6" />,
                question: "How many spots are available?",
                answer:
                  "Each group has a maximum of 10 participants to ensure quality and personalized interaction perfect for intermediate to advanced learners.",
              },
              {
                icon: <Clock className="w-6 h-6" />,
                question: "What if I miss a session?",
                answer:
                  "You can miss one session only. If you miss more than one, your spot may be given to someone on the waiting list.",
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                question: "How will this help my B1+ level?",
                answer:
                  "You'll practice advanced conversation skills, learn natural expressions, and gain confidence speaking about complex topics - taking you from intermediate to advanced fluency.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-gradient-to-br hover:from-white/10 hover:to-white/15 hover:border-[#EE7203]/30 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl group"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-[#EE7203] to-[#FF3816] p-3 rounded-xl text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    {faq.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-3 group-hover:text-[#EE7203] transition-colors duration-300">
                      {faq.question}
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <div
        ref={contactRef}
        className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center"
      >
        <div className="bg-gradient-to-r from-[#EE7203]/20 via-[#FF3816]/20 to-[#EE7203]/20 rounded-3xl p-12 border border-white/20 backdrop-blur-lg hover:border-[#EE7203]/40 transition-all duration-300 relative overflow-hidden">
          {/* Enhanced background decorative elements */}
          <div className="absolute top-4 left-4 w-16 h-16 bg-gradient-to-r from-[#EE7203]/10 to-[#FF3816]/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-4 right-4 w-20 h-20 bg-gradient-to-r from-[#FF3816]/10 to-[#EE7203]/10 rounded-full blur-xl"></div>

          {/* Level requirement badge */}
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#EE7203]/30 to-[#FF3816]/30 backdrop-blur-lg rounded-full text-white/90 text-sm border border-[#EE7203]/50 mb-6">
            <Target className="w-4 h-4 mr-2 text-[#EE7203]" />
            Perfect for B1+ Level Students
          </div>

          <h2 className="text-4xl font-bold text-white mb-6 relative z-10">
            Ready to Take Your English to the Next Level?
          </h2>
          <p className="text-xl text-white/80 mb-8 relative z-10 max-w-2xl mx-auto">
            Join Morgan's exclusive conversational club and transform your intermediate English into advanced fluency. Register now using our chat bot!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10 mb-6">
            <button
              onClick={handleRegisterClick}
              className="bg-gradient-to-r from-[#EE7203] to-[#FF3816] text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-[#EE7203]/30 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group border border-white/20 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="ml-2">Register Now with Bot</span>
                <span className="ml-2 animate-bounce group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF3816] to-[#EE7203] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button
              onClick={() => setShowVideoModal(true)}
              className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-gradient-to-r hover:from-white/10 hover:to-white/5 hover:border-[#EE7203]/50 transition-all duration-300 flex items-center justify-center gap-2 group backdrop-blur-sm"
            >
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              Watch Morgan's Intro
            </button>
          </div>

          {/* Enhanced benefits footer */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center relative z-10">
            <div className="flex items-center justify-center gap-2 text-white/80 bg-white/5 backdrop-blur-sm rounded-full px-4 py-3 border border-white/10 hover:border-[#EE7203]/30 transition-all duration-300">
              <span className="w-2 h-2 bg-[#EE7203] rounded-full animate-pulse shadow-lg shadow-[#EE7203]/50"></span>
              Completely FREE
            </div>
            <div className="flex items-center justify-center gap-2 text-white/80 bg-white/5 backdrop-blur-sm rounded-full px-4 py-3 border border-white/10 hover:border-[#EE7203]/30 transition-all duration-300">
              <Target className="w-4 h-4 text-[#FF3816]" />
              B1+ Level Focus
            </div>
            <div className="flex items-center justify-center gap-2 text-white/80 bg-white/5 backdrop-blur-sm rounded-full px-4 py-3 border border-white/10 hover:border-[#EE7203]/30 transition-all duration-300">
              <span className="w-2 h-2 bg-[#FF3816] rounded-full animate-pulse shadow-lg shadow-[#FF3816]/50"></span>
              Native Speaker
            </div>
          </div>
        </div>
      </div>

      {/* Chat Component */}
      <Chat isVisible={verChat} onToggle={handleChatToggle} />

      {/* Overlays */}
      <GuideOverlay />
      <VideoModal />

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        @keyframes slowFloat {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-15px) translateX(10px);
          }
          66% {
            transform: translateY(-5px) translateX(-10px);
          }
        }
        @keyframes slowBounce {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-slowFloat {
          animation: slowFloat 8s ease-in-out infinite;
        }
        .animate-slowBounce {
          animation: slowBounce 4s ease-in-out infinite;
        }
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        .bg-300% {
          background-size: 300% 300%;
        }
      `}</style>
    </div>
  );
};

export default ConversationalClubLanding;
