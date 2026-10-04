"use client";

import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Lottie from "lottie-react";
import particles from "@/constants/particles.json";
import Footer from "@/components/Footer";

const AboutUs = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeFeature, setActiveFeature] = useState(0);

  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const featuresRef = useRef(null);
  const videoRef = useRef(null);

  const controls = useAnimation();
  const isInView = useInView(contentRef, { once: true, margin: "-100px" });
  const featuresInView = useInView(featuresRef, {
    once: true,
    margin: "-50px",
  });

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Auto-cycle feature highlights
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Counter animation hook
  const useCounter = (end: number, duration: number = 2) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const inView = useInView(countRef, { once: true });

    useEffect(() => {
      if (!inView) return;

      const increment = end / (duration * 60); // 60fps
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }, [inView, end, duration]);

    return { count, ref: countRef };
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  const cardVariants = {
    hidden: {
      y: 100,
      opacity: 0,
      rotateX: -15,
      scale: 0.9,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  const features = [
    {
      icon: "🧠",
      title: "Personalized AI Tutoring",
      description:
        "Adaptive learning paths tailored for every student's unique needs and pace",
      color: "from-blue-500 to-purple-600",
    },
    {
      icon: "🎙️",
      title: "Voice-Assisted Learning",
      description:
        "Interactive voice tools for natural, hands-free educational conversations",
      color: "from-green-500 to-blue-500",
    },
    {
      icon: "📊",
      title: "Smart Analytics",
      description:
        "Real-time insights and performance tracking with predictive recommendations",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: "📱",
      title: "Mobile Accessibility",
      description:
        "Seamless cross-platform experience with offline learning capabilities",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: "🌐",
      title: "SEO-Optimized Content",
      description:
        "AI-generated educational resources optimized for maximum visibility",
      color: "from-teal-500 to-green-500",
    },
    {
      icon: "🎯",
      title: "Curriculum Alignment",
      description:
        "Perfectly aligned with Sri Lankan O/L and A/L examination requirements",
      color: "from-indigo-500 to-purple-500",
    },
  ];

  const stats = [
    {
      end: 1250,
      label: "Active Students",
      suffix: "+",
      color: "from-blue-400 to-purple-400",
    },
    {
      end: 98,
      label: "Success Rate",
      suffix: "%",
      color: "from-green-400 to-blue-400",
    },
    {
      end: 15600,
      label: "Lessons Completed",
      suffix: "+",
      color: "from-purple-400 to-pink-400",
    },
    {
      end: 45,
      label: "Partner Schools",
      suffix: "+",
      color: "from-orange-400 to-red-400",
    },
  ];

  return (
    <>
      <Head>
        <title>About Us | Dixi - AI Tutor Sri Lanka for O/L Students</title>
        <meta
          name="description"
          content="Discover Dixi, Sri Lanka's leading AI-powered LMS for O/L and A/L students. Learn about our AI tutor, voice-assisted learning, and innovative education platform."
        />
        <meta
          name="keywords"
          content="AI tutor Sri Lanka, LMS for O/L students, AI-powered education platform, online learning Sri Lanka, Dixi about us"
        />
      </Head>

      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 bg-blue-500/50 rounded-full mix-blend-multiply filter blur-sm pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      />

      <section className="bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 text-white min-h-screen relative overflow-hidden">
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Lottie animationData={particles} loop={true} autoplay={true} />
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full"
              style={{
                left: `${15 + i * 12}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, 20, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 6 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Hero Section */}
        <motion.div
          ref={heroRef}
          className="relative z-10 pt-20 pb-32"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          style={{ opacity, scale }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center" variants={itemVariants}>
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 1,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                <motion.h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                  }}
                  style={{
                    background:
                      "linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b)",
                    backgroundSize: "300% 300%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  About Dixi
                </motion.h1>

                <motion.div
                  className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: 96 }}
                  transition={{ delay: 0.5, duration: 1 }}
                />
              </motion.div>

              <motion.p
                className="text-xl sm:text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12"
                variants={itemVariants}
              >
                Sri Lanka's pioneering AI-powered learning revolution,
                transforming education through
                <motion.span
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent font-bold"
                  animate={{
                    textShadow: [
                      "0 0 0px rgba(251, 191, 36, 0)",
                      "0 0 20px rgba(251, 191, 36, 0.5)",
                      "0 0 0px rgba(251, 191, 36, 0)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {" "}
                  intelligent technology{" "}
                </motion.span>
                and personalized experiences
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                variants={itemVariants}
              >
                <motion.button
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-bold text-lg overflow-hidden"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 0 0px rgba(59, 130, 246, 0)",
                      "0 0 30px rgba(59, 130, 246, 0.3)",
                      "0 0 0px rgba(59, 130, 246, 0)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <motion.span
                    className="relative z-10"
                    whileHover={{ color: "#ffffff" }}
                  >
                    Explore Our Mission
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>

                <motion.div
                  className="flex items-center gap-4 text-gray-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center"
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <span className="text-2xl">🎯</span>
                  </motion.div>
                  <div>
                    <p className="text-sm text-gray-400">Trusted by</p>
                    <motion.p
                      className="font-bold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      1,250+ Students
                    </motion.p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Interactive Video Section */}
        <motion.div
          ref={videoRef}
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 relative z-10"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Watch How Dixi Transforms Education
          </motion.h2>

          <motion.div
            className="relative group cursor-pointer"
            whileHover={{
              scale: 1.02,
              rotateX: 2,
              rotateY: 2,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl transition-all duration-500"
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <video
              controls
              poster="/images/banner.png"
              className="w-full h-64 sm:h-80 md:h-96 rounded-2xl shadow-2xl relative z-10 bg-gray-900"
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
            >
              <source src="/video/about.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <AnimatePresence>
              {!isVideoPlaying && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center z-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                      boxShadow: [
                        "0 0 0px rgba(59, 130, 246, 0)",
                        "0 0 40px rgba(59, 130, 246, 0.6)",
                        "0 0 0px rgba(59, 130, 246, 0)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-0 h-0 border-l-[12px] border-l-blue-600 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Content Section with Glass Morphism */}
        <motion.div
          ref={contentRef}
          className="relative z-10 bg-white/10 backdrop-blur-lg rounded-t-[3rem] mx-4 sm:mx-8"
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          style={{ y: useTransform(scrollYProgress, [0.3, 1], [0, -30]) }}
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
            {/* Mission Section */}
            <motion.div
              className="mb-24"
              initial="hidden"
              whileInView="visible"
              variants={containerVariants}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-4xl sm:text-5xl font-bold mb-8 text-center"
                variants={itemVariants}
                style={{
                  background: "linear-gradient(45deg, #60a5fa, #a855f7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                🎯 Our Mission
              </motion.h2>

              <motion.div className="max-w-4xl mx-auto" variants={itemVariants}>
                <motion.div
                  className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                  whileHover={{
                    scale: 1.02,
                    borderColor: "rgba(255, 255, 255, 0.2)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-gray-200 text-lg sm:text-xl leading-relaxed text-center">
                    At Dixi, we revolutionize Sri lankas #1st AI companion by
                    seamlessly integrating cutting-edge AI technology with
                    curriculum-aligned learning experiences. We empower students
                    with personalized AI tutors, intelligent voice companions,
                    and advanced analytics to excel in their academic journey.
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Features Grid */}
            <motion.div ref={featuresRef} className="mb-24">
              <motion.h2
                className="text-4xl sm:text-5xl font-bold mb-16 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{
                  background: "linear-gradient(45deg, #34d399, #60a5fa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                💡 Revolutionary Features
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl p-6 cursor-pointer"
                    style={{
                      background:
                        activeFeature === index
                          ? "rgba(59, 130, 246, 0.15)"
                          : "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{
                      scale: 1.05,
                      rotateY: 5,
                      rotateX: 5,
                      backgroundColor: "rgba(59, 130, 246, 0.2)",
                    }}
                    onHoverStart={() => setActiveFeature(index)}
                  >
                    <motion.div
                      className="text-6xl mb-4"
                      animate={
                        activeFeature === index
                          ? {
                              rotate: [0, 10, -10, 0],
                              scale: [1, 1.2, 1],
                            }
                          : {}
                      }
                      transition={{ duration: 0.5 }}
                    >
                      {feature.icon}
                    </motion.div>

                    <motion.h3
                      className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {feature.title}
                    </motion.h3>

                    <motion.p
                      className="text-gray-300 leading-relaxed group-hover:text-gray-100 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {feature.description}
                    </motion.p>

                    {/* Animated Progress Bar */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Founder Section */}
            <motion.section
              id="founder"
              aria-labelledby="founder-heading"
              className="mb-24"
              initial="hidden"
              whileInView="visible"
              variants={containerVariants}
              viewport={{ once: true }}
            >
              <motion.h2
                id="founder-heading"
                className="mb-12 text-center text-4xl font-bold sm:text-5xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                variants={itemVariants}
              >
                Meet Our Founder
              </motion.h2>

              <motion.div
                className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-gradient-to-r from-white/10 to-white/5 p-6 backdrop-blur-sm sm:p-10"
                variants={itemVariants}
              >
                <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:gap-8 sm:text-left">
                  {/* Initials avatar — no photo required */}
                  <div
                    aria-hidden="true"
                    className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-4xl font-bold text-white shadow-lg sm:h-28 sm:w-28"
                  >
                    UR
                  </div>

                  <div className="min-w-0">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-300">
                      Founder of Dixi
                    </p>
                    <h3 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                      Umair Riyas
                    </h3>
                    <p className="text-base leading-relaxed text-gray-200 sm:text-lg">
                      Umair Riyas is the founder of Dixi, an AI-powered learning
                      companion for students in Sri Lanka, focused on
                      personalised tutoring and voice-assisted learning
                      experiences.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.section>

            {/* Team Section */}
            <motion.div
              className="mb-24"
              initial="hidden"
              whileInView="visible"
              variants={containerVariants}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-4xl sm:text-5xl font-bold mb-12 text-center"
                variants={itemVariants}
                style={{
                  background: "linear-gradient(45deg, #a855f7, #ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                👥 Our Expert Team
              </motion.h2>

              <motion.div
                className="max-w-4xl mx-auto text-center"
                variants={itemVariants}
              >
                <motion.div
                  className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-gray-200 text-lg sm:text-xl leading-relaxed mb-8">
                    Our multidisciplinary team combines AI specialists,
                    educational experts, and innovative UI/UX designers. Led by
                    industry veterans with decades of combined experience, we're
                    committed to transforming education across Sri Lanka.
                  </p>

                  <div className="flex flex-wrap justify-center gap-4">
                    {[
                      "AI Specialists",
                      "Education Experts",
                      "UI/UX Designers",
                      "Data Scientists",
                    ].map((role, index) => (
                      <motion.span
                        key={role}
                        className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 text-gray-200"
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "rgba(59, 130, 246, 0.3)",
                          y: -2,
                        }}
                      >
                        {role}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Statistics with Counter Animation */}
            <motion.div
              className="text-center"
              initial="hidden"
              whileInView="visible"
              variants={containerVariants}
              viewport={{ once: true }}
            >
              <motion.h3
                className="text-3xl sm:text-4xl font-bold text-white mb-12"
                variants={itemVariants}
              >
                Trusted Across Sri Lanka
              </motion.h3>

              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-8"
                variants={containerVariants}
              >
                {stats.map((stat, index) => {
                  const counter = useCounter(stat.end, 2);

                  return (
                    <motion.div
                      key={index}
                      ref={counter.ref}
                      className="text-center"
                      variants={itemVariants}
                      whileHover={{
                        scale: 1.1,
                        rotateY: 5,
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        className={`text-4xl sm:text-5xl font-black mb-2`}
                        style={{
                          background: `linear-gradient(45deg, ${
                            stat.color.split(" ")[1]
                          }, ${stat.color.split(" ")[3]})`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                        animate={{
                          textShadow: [
                            "0 0 0px rgba(59, 130, 246, 0)",
                            "0 0 20px rgba(59, 130, 246, 0.3)",
                            "0 0 0px rgba(59, 130, 246, 0)",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2,
                        }}
                      >
                        {counter.count.toLocaleString()}
                        {stat.suffix}
                      </motion.div>
                      <p className="text-gray-300 font-medium">{stat.label}</p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <Footer />
      </section>
    </>
  );
};

export default AboutUs;
