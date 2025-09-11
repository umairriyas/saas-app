"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import { motion, useAnimation } from "framer-motion";
import Lottie from "lottie-react";
import particles from "@/constants/particles.json"; // Ensure this file exists
import Footer from "@/components/Footer";

const AboutUs = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

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

      <section className="bg-gradient-to-b from-blue-50 via-white to-blue-50 text-gray-800 px-2 sm:px-4 md:px-6 lg:px-12 xl:px-24 py-8 sm:py-10 md:py-12 lg:py-16 min-h-screen relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-20">
          <Lottie animationData={particles} loop={true} autoplay={true} />
        </div>

        {/* Banner Image */}
        <div className="max-w-7xl mx-auto relative z-10 mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <motion.img
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 0.8 }}
            src="/images/banner.png" // Replace with actual image path
            alt="AI-powered learning with Dixi in Sri Lanka"
            className="w-full min-h-[40vh] sm:min-h-[50vh] md:min-h-[60vh] lg:min-h-[70vh] object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Video Promotion */}
        <div className="max-w-7xl mx-auto relative z-10 mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-4"
          >
            Watch How Dixi Transforms Education goes
          </motion.h2>
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl mx-auto">
            <video
              controls
              poster="/video/about-poster.jpg" // Replace with first frame image of about.mp4
              className="w-full h-40 sm:h-48 md:h-56 lg:h-64 rounded-lg shadow-md bg-gray-200"
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
            >
              <source src="/video/about.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        {/* About Us Content */}
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 text-center text-gray-900"
          >
            About Dixi - Sri Lanka’s AI-Powered Learning Platform
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 text-center mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto"
          >
            Dixi is Sri Lanka’s pioneering AI-powered LMS, designed to empower
            O/L and A/L students with innovative online learning. Our mission is
            to make smart education accessible through advanced AI tutoring and
            voice-assisted tools.
          </motion.p>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-6 sm:mb-8 md:mb-10 lg:mb-12"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4 md:mb-5 text-gray-900 text-center sm:text-left">
              🎯 Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto text-center sm:text-left text-sm sm:text-base md:text-lg">
              At Dixi, we aim to revolutionize education in Sri Lanka by
              integrating AI technology with a curriculum-aligned learning
              experience. We provide English-speaking students with personalized
              AI tutors, voice companions, and smart analytics to excel in their
              studies.
            </p>
          </motion.div>

          {/* Key Features */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-6 sm:mb-8 md:mb-10 lg:mb-12"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-5 md:mb-6 text-gray-900 text-center sm:text-left">
              💡 Features of Dixi AI Tutor
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 text-gray-700">
              <motion.li
                whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
                className="flex items-start gap-2 p-3 sm:p-4 rounded-lg transition-all duration-300"
              >
                <span className="text-blue-600">🧠</span>
                <strong>Personalized AI Tutoring</strong> - Adaptive learning
                paths for every student.
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
                className="flex items-start gap-2 p-3 sm:p-4 rounded-lg transition-all duration-300"
              >
                <span className="text-blue-600">🎙️</span>
                <strong>Voice-Assisted Learning</strong> - Interactive voice
                tools for hands-free study.
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
                className="flex items-start gap-2 p-3 sm:p-4 rounded-lg transition-all duration-300"
              >
                <span className="text-blue-600">📊</span>
                <strong>Smart Analytics</strong> - Track progress with real-time
                performance insights.
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
                className="flex items-start gap-2 p-3 sm:p-4 rounded-lg transition-all duration-300"
              >
                <span className="text-blue-600">📱</span>
                <strong>Mobile Accessibility</strong> - Learn anytime, anywhere
                on any device.
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
                className="flex items-start gap-2 p-3 sm:p-4 rounded-lg transition-all duration-300"
              >
                <span className="text-blue-600">🌐</span>
                <strong>SEO-Optimized Content</strong> - Enhance visibility with
                AI-generated resources.
              </motion.li>
            </ul>
          </motion.div>

          {/* Team */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-6 sm:mb-8 md:mb-10 lg:mb-12"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4 md:mb-5 text-gray-900 text-center sm:text-left">
              👥 Our Team
            </h2>
            <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto text-center sm:text-left text-sm sm:text-base md:text-lg">
              Dixi is built by a dedicated team of AI specialists, educators,
              and UI/UX designers passionate about transforming education. Led
              by industry experts, we bring years of experience to create a
              platform that supports students across Sri Lanka.
            </p>
          </motion.div>

          {/* Trust Signals */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-center"
          >
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
              Trusted by Students Across Sri Lanka
            </h3>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
              <span className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm">
                All Across Sri Lanka
              </span>
            </div>
          </motion.div>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default AboutUs;
