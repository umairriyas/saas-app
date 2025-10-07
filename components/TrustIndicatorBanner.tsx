"use client"; // Add this directive at the top

import Image from "next/image";
import { useState, useEffect } from "react";

interface TrustStats {
  students: number;
  successRate: number;
  lessons: number;
  schools: number;
}

const TrustIndicatorBanner = () => {
  const [stats, setStats] = useState<TrustStats>({
    students: 0,
    successRate: 0,
    lessons: 0,
    schools: 0,
  });

  const [isVisible, setIsVisible] = useState(false);

  // Animated counter effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          animateStats();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("trust-banner");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const animateStats = () => {
    const finalStats = {
      students: 30,
      successRate: 98,
      lessons: 9,
      schools: 45,
    };

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setStats({
        students: Math.floor(finalStats.students * progress),
        successRate: Math.floor(finalStats.successRate * progress),
        lessons: Math.floor(finalStats.lessons * progress),
        schools: Math.floor(finalStats.schools * progress),
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setStats(finalStats);
      }
    }, stepDuration);
  };

  return (
    <section
      id="trust-banner"
      className="trust-indicator-banner py-12 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-y border-blue-100"
    >
      <div className="container mx-auto px-4">
        {/* Main Trust Message */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white text-xs">🏆</span>
              </div>
              <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white text-xs">⭐</span>
              </div>
            </div>
            <span className="text-sm font-medium text-gray-600 ml-2">
              Trusted by students across Sri Lanka
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Join Sri Lanka's #1 AI Learning Platform
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Over 1,000 students have already improved their grades with our AI
            tutors
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="stat-item text-center group hover:scale-105 transition-transform duration-300">
            <div className="stat-icon mb-3">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto group-hover:bg-blue-600 transition-colors">
                <span className="text-white font-bold text-lg">👥</span>
              </div>
            </div>
            <div className="stat-number text-3xl md:text-4xl font-bold text-blue-600 mb-1">
              {stats.students.toLocaleString()}+
            </div>
            <div className="stat-label text-sm text-gray-600 font-medium">
              Active Students
            </div>
          </div>

          <div className="stat-item text-center group hover:scale-105 transition-transform duration-300">
            <div className="stat-icon mb-3">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto group-hover:bg-green-600 transition-colors">
                <span className="text-white font-bold text-lg">📈</span>
              </div>
            </div>
            <div className="stat-number text-3xl md:text-4xl font-bold text-green-600 mb-1">
              {stats.successRate}%
            </div>
            <div className="stat-label text-sm text-gray-600 font-medium">
              Success Rate
            </div>
          </div>

          <div className="stat-item text-center group hover:scale-105 transition-transform duration-300">
            <div className="stat-icon mb-3">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto group-hover:bg-purple-600 transition-colors">
                <span className="text-white font-bold text-lg">📚</span>
              </div>
            </div>
            <div className="stat-number text-3xl md:text-4xl font-bold text-purple-600 mb-1">
              {stats.lessons.toLocaleString()}+
            </div>
            <div className="stat-label text-sm text-gray-600 font-medium">
              Lessons Completed
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="trust-badges mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
            <div className="trust-badge flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="text-sm font-medium text-gray-700">
                ISO 27001 Certified
              </span>
            </div>

            <div className="trust-badge flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">🛡️</span>
              </div>
              <span className="text-sm font-medium text-gray-700">
                Data Protected
              </span>
            </div>

            <div className="trust-badge flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">⭐</span>
              </div>
              <span className="text-sm font-medium text-gray-700">
                4.9/5 Rating
              </span>
            </div>

            <div className="trust-badge flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">🇱🇰</span>
              </div>
              <span className="text-sm font-medium text-gray-700">
                Made in Sri Lanka
              </span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="cta-section mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Join thousands of successful students today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl">
              Start Learning for FREE
            </button>
            <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-medium transition-colors">
              View Success Stories
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicatorBanner;
