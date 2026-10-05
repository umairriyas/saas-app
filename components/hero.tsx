// "use client";

import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative bg-white min-h-screen w-full overflow-hidden">
      {/* Full Screen Container with Responsive Layout */}
      <div className="relative w-full min-h-screen flex items-center justify-center px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Background Decorative Elements - Responsive */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000"></div>

        {/* LEFT CORNER TEXT */}
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 md:top-6 md:left-6 lg:top-12 lg:left-12 xl:top-16 xl:left-16 z-30 max-w-[140px] sm:max-w-[180px] md:max-w-xs lg:max-w-sm">
          <div className="bg-white/95 backdrop-blur-sm p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg sm:shadow-xl md:shadow-2xl border border-gray-100">
            <div className="space-y-1 sm:space-y-2 md:space-y-3 lg:space-y-4">
              {/* Badge */}
              <div className="inline-flex items-center gap-1 sm:gap-2 bg-blue-50 border border-blue-200 rounded-full px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1">
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[8px] sm:text-[9px] md:text-xs font-medium text-blue-700">
                  #1 in Sri Lanka
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-xs sm:text-sm md:text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-gray-900 leading-tight">
                Sri Lanka&apos;s First <br className="hidden sm:block" />
                <span className="block sm:inline">AI-Powered</span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Learning
                </span>
                <br className="hidden sm:block" />
                <span className="block sm:inline">Revolution</span>
              </h1>

              {/* Description */}
              <p className="text-gray-600 text-[8px] sm:text-[9px] md:text-xs lg:text-sm xl:text-base leading-relaxed hidden sm:block">
                Experience the future of education with intelligent tutoring.
              </p>

              {/* Desktop Buttons */}
              <div className="hidden md:flex flex-col gap-2 lg:gap-3">
                <a
                  href="/companions/new"
                  className="bg-black text-white px-3 py-1.5 md:px-4 md:py-2 lg:px-6 lg:py-3 rounded-lg lg:rounded-xl font-medium hover:bg-gray-800 transition-all duration-300 shadow-lg text-[10px] md:text-xs lg:text-sm text-center"
                >
                  Start Now
                </a>

                <button className="border border-black text-black px-3 py-1.5 md:px-4 md:py-2 lg:px-6 lg:py-3 rounded-lg lg:rounded-xl font-medium hover:bg-black hover:text-white transition-all duration-300 text-[10px] md:text-xs lg:text-sm">
                  Learn More
                </button>
              </div>

              {/* Left Stats */}
              <div className="pt-1 sm:pt-2 md:pt-3 lg:pt-4 space-y-1 sm:space-y-2 md:space-y-3">
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="flex -space-x-0.5 sm:-space-x-1">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-blue-500 rounded-full border border-white sm:border-2"></div>
                    <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-green-500 rounded-full border border-white sm:border-2"></div>
                    <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-purple-500 rounded-full border border-white sm:border-2"></div>
                  </div>

                  <span className="text-[8px] sm:text-[9px] md:text-xs text-gray-600">
                    30+ Learners
                  </span>
                </div>

                <div>
                  <div className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-900">
                    98% Success
                  </div>
                  <div className="text-[8px] sm:text-[9px] md:text-xs text-gray-500">
                    Verified Results
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CENTER HERO IMAGE */}
        <div className="relative z-20 flex items-center justify-center">
          <div className="relative group">
            <Image
              src="/images/hero-2.png"
              alt="AI Learning Companion"
              width={1400}
              height={1400}
              className="w-[200px] h-[200px] xs:w-[250px] xs:h-[250px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[550px] lg:h-[550px] xl:w-[650px] xl:h-[650px] 2xl:w-[750px] 2xl:h-[750px] object-cover rounded-xl sm:rounded-2xl md:rounded-3xl shadow-xl sm:shadow-2xl transform transition-transform duration-500 group-hover:scale-105"
              priority
              quality={95}
            />

            {/* Floating AI Indicators */}
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 md:top-6 md:right-6 lg:top-8 lg:right-8 bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-1.5 sm:p-2 md:p-3 lg:p-4 xl:p-6 shadow-lg sm:shadow-xl animate-float">
              <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-green-500 rounded-full animate-pulse"></div>
                <div className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base font-semibold text-gray-800">
                  AI Active
                </div>
              </div>
            </div>

            <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6 lg:bottom-8 lg:left-8 bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-1.5 sm:p-2 md:p-3 lg:p-4 xl:p-6 shadow-lg sm:shadow-xl animate-float-delayed">
              <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>

                <span className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base font-medium text-gray-700">
                  Smart Learning
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT CORNER TEXT */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 md:top-6 md:right-6 lg:top-12 lg:right-12 xl:top-16 xl:right-16 z-30 max-w-[140px] sm:max-w-[180px] md:max-w-xs lg:max-w-sm">
          <div className="bg-white/95 backdrop-blur-sm p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg sm:shadow-xl md:shadow-2xl border border-gray-100">
            <div className="space-y-1 sm:space-y-2 md:space-y-3 lg:space-y-4">
              {/* Badge */}
              <div className="inline-flex items-center gap-1 sm:gap-2 bg-purple-50 border border-purple-200 rounded-full px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1">
                <span className="text-[8px] sm:text-[9px] md:text-xs font-medium text-purple-700">
                  Companion
                </span>

                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-purple-500 rounded-full animate-pulse"></div>
              </div>

              {/* Headline */}
              <h2 className="text-xs sm:text-sm md:text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-gray-900 leading-tight">
                Your Personal
                <br />
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Learning
                </span>
                <br />
                Journey
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-[8px] sm:text-[9px] md:text-xs lg:text-sm xl:text-base leading-relaxed hidden sm:block">
                Track progress and achieve goals with AI guidance.
              </p>

              {/* Right Features */}
              <div className="space-y-1 sm:space-y-2 md:space-y-3">
                <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg md:rounded-xl flex items-center justify-center">
                    <svg
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100 4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                      />
                    </svg>
                  </div>

                  <span className="text-[8px] sm:text-[9px] md:text-xs font-medium text-gray-700">
                    Personalized
                  </span>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg md:rounded-xl flex items-center justify-center">
                    <svg
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>

                  <span className="text-[8px] sm:text-[9px] md:text-xs font-medium text-gray-700">
                    Analytics
                  </span>
                </div>

                <div className="pt-1 sm:pt-2">
                  <div className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-900">
                    500+ Lessons
                  </div>

                  <div className="text-[8px] sm:text-[9px] md:text-xs text-gray-500">
                    Available Now
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Ring */}
        <div className="absolute top-1/2 right-1 sm:right-2 md:right-4 lg:right-8 xl:right-24 2xl:right-32 transform -translate-y-1/2 bg-white rounded-full p-2 sm:p-3 md:p-4 lg:p-6 shadow-lg sm:shadow-xl md:shadow-2xl z-25">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 36 36"
            >
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="3"
              />

              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3"
                strokeDasharray="85, 100"
                className="animate-pulse"
              />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] sm:text-xs md:text-sm lg:text-base font-bold text-blue-600">
                85%
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Progress Indicator */}
        <div className="absolute bottom-12 sm:bottom-16 md:bottom-20 lg:bottom-24 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full px-2 sm:px-3 md:px-4 lg:px-6 py-1 sm:py-1.5 md:py-2 lg:py-3 shadow-lg sm:shadow-xl z-30">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-blue-500 rounded-full"></div>

              <span className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-medium text-gray-700">
                Learning Active
              </span>
            </div>

            <div className="w-px h-2 sm:h-3 md:h-4 bg-gray-300"></div>

            <div className="flex items-center gap-1 sm:gap-2">
              <svg
                className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>

              <span className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-medium text-gray-700">
                AI Ready
              </span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce z-30 hidden md:block">
          <svg
            className="w-4 h-4 md:w-5 md:h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      {/* Mobile CTA Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-3 z-40 md:hidden">
        <div className="flex gap-2">
          {/* Mobile Start Now Link */}
          <a
            href="/companions/new"
            className="flex-1 bg-black text-white px-4 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 shadow-lg text-sm text-center"
          >
            Start Now
          </a>

          {/* Mobile Learn More */}
          <button className="flex-1 border border-black text-black px-4 py-2.5 rounded-lg font-medium hover:bg-black hover:text-white transition-all duration-300 text-sm">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
