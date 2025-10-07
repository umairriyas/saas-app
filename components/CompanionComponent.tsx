"use client";

import { subjects } from "@/constants";
import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { vapi } from "@/lib/vapi.sdk";
import Image from "next/image";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from "@/constants/soundwaves.json";
import { addToSessionHistory } from "@/lib/actions/companion.action";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

const CompanionComponent = ({
  companionId,
  subject,
  topic,
  name,
  userName,
  userImage,
  style,
  voice,
}: CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [voiceSpeed, setVoiceSpeed] = useState(0.9);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  useEffect(() => {
    if (lottieRef.current) {
      isSpeaking ? lottieRef.current.play() : lottieRef.current.stop();
    }
  }, [isSpeaking]);

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
      vapi.setMuted(isMuted);
    };
    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
      addToSessionHistory(companionId);
    };
    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        setMessages((prev) => [
          { role: message.role, content: message.transcript },
          ...prev,
        ]);
      }
    };
    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onError = (error: Error) => {
      console.error("Call Error:", error);
      alert("There was an issue with the call. Please try again later.");
      setCallStatus(CallStatus.FINISHED);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("error", onError);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("error", onError);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
    };
  }, [companionId, isMuted]);

  const toggleMicrophone = () => {
    try {
      const newMutedState = !isMuted;
      vapi.setMuted(newMutedState);
      setIsMuted(newMutedState);
    } catch (error) {
      console.error("Failed to toggle microphone:", error);
      alert("Failed to toggle microphone. Please try again.");
    }
  };

  const handleCall = async () => {
    if (callStatus === CallStatus.ACTIVE) return;

    setCallStatus(CallStatus.CONNECTING);
    try {
      //@ts-expect-error
      await vapi.start(configureAssistant(voice, style, voiceSpeed), {
        variableValues: { subject, topic, style },
        clientMessages: ["transcript"],
        serverMessages: [],
      });
    } catch (error) {
      console.error("Call start failed:", error);
      setCallStatus(CallStatus.INACTIVE);
      alert("Failed to start call. Please try again.");
    }
  };

  const handleDisconnect = () => {
    try {
      vapi.stop();
      setCallStatus(CallStatus.FINISHED);
    } catch (error) {
      console.error("Failed to disconnect:", error);
    }
  };

  return (
    <section className="flex flex-col h-full min-h-[70vh] p-2 sm:p-4 md:p-6 bg-gray-50 rounded-lg sm:rounded-xl shadow-lg max-w-7xl mx-auto">
      {/* Header: Status and Info - Fully Responsive */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-6 p-3 sm:p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <span
            className={cn(
              "inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium",
              callStatus === CallStatus.ACTIVE
                ? "bg-green-100 text-green-800"
                : callStatus === CallStatus.CONNECTING
                ? "bg-yellow-100 text-yellow-800 animate-pulse"
                : "bg-gray-100 text-gray-800"
            )}
          >
            {callStatus === CallStatus.ACTIVE
              ? "🟢 Active"
              : callStatus === CallStatus.CONNECTING
              ? "🟡 Connecting"
              : "⚪ Inactive"}
          </span>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 truncate max-w-[200px] sm:max-w-none">
            {name}
          </h2>
        </div>
        <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 sm:px-3 py-1 rounded-full">
          📚 {subject}
        </span>
      </div>

      {/* Main Content: Companion and User Cards - Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
        {/* Companion Card - Mobile Optimized */}
        <div className="companion-card bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          <div className="flex flex-col items-center">
            <div
              className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-[150px] lg:h-[150px] rounded-full overflow-hidden shadow-lg"
              style={{ backgroundColor: getSubjectColor(subject) }}
            >
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
                  callStatus === CallStatus.FINISHED ||
                    callStatus === CallStatus.INACTIVE
                    ? "opacity-100"
                    : "opacity-0"
                )}
              >
                <Image
                  src={`/icons/${subject}.svg`}
                  alt={subject}
                  width={120}
                  height={120}
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
                />
              </div>
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
                  callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0"
                )}
              >
                <Lottie
                  lottieRef={lottieRef}
                  animationData={soundwaves}
                  autoplay={false}
                  loop={true}
                  className="w-4/5 h-4/5"
                />
              </div>
            </div>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg font-medium text-gray-700 text-center">
              🤖 AI Tutor: {name}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 text-center">
              {topic}
            </p>
          </div>
        </div>

        {/* User Card - Mobile Optimized */}
        <div className="user-card bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-[150px] lg:h-[150px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={userImage}
                alt="User Avatar"
                width={150}
                height={150}
                className="object-cover w-full h-full"
              />
            </div>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg font-medium text-gray-700 text-center">
              👤 {userName}
            </p>

            {/* Voice Speed Control - Responsive */}
            <div className="mt-4 sm:mt-6 w-full max-w-[200px] sm:max-w-[250px]">
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="voiceSpeed"
                  className="text-xs sm:text-sm font-semibold text-gray-600"
                >
                  🎚️ Speed
                </label>
                <span className="text-xs sm:text-sm font-medium text-gray-900 bg-gray-100 px-2 py-0.5 sm:py-1 rounded">
                  {voiceSpeed.toFixed(1)}x
                </span>
              </div>
              <input
                id="voiceSpeed"
                type="range"
                min={0.5}
                max={1.5}
                step={0.1}
                value={voiceSpeed}
                onChange={(e) => setVoiceSpeed(parseFloat(e.target.value))}
                className="w-full h-1.5 sm:h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                aria-label="Adjust voice speed"
              />
              <div className="flex justify-between text-[10px] sm:text-xs mt-1 text-gray-500">
                {[0.5, 0.7, 0.9, 1.1, 1.3, 1.5].map((speed) => (
                  <span key={speed}>{speed}x</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls - Responsive Layout */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6">
        <button
          className={cn(
            "flex items-center justify-center gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg border-2 border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 w-full sm:w-auto",
            callStatus === CallStatus.ACTIVE
              ? "opacity-100"
              : "opacity-50 cursor-not-allowed"
          )}
          onClick={toggleMicrophone}
          disabled={callStatus !== CallStatus.ACTIVE}
          aria-label={isMuted ? "Turn on microphone" : "Turn off microphone"}
        >
          <Image
            src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"}
            alt={isMuted ? "Microphone off" : "Microphone on"}
            width={20}
            height={20}
            className="w-4 h-4 sm:w-5 sm:h-5"
          />
          <span className="text-xs sm:text-sm md:text-base font-medium">
            {isMuted ? "🔇 Unmute" : "🔊 Mute"}
          </span>
        </button>

        <button
          className={cn(
            "flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg text-white font-medium transition-colors w-full sm:flex-1",
            callStatus === CallStatus.ACTIVE
              ? "bg-red-600 hover:bg-red-700"
              : "bg-blue-600 hover:bg-blue-700",
            callStatus === CallStatus.CONNECTING && "animate-pulse bg-blue-500"
          )}
          onClick={
            callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall
          }
          disabled={callStatus === CallStatus.CONNECTING}
          aria-label={
            callStatus === CallStatus.ACTIVE ? "End session" : "Start session"
          }
        >
          {callStatus === CallStatus.ACTIVE ? (
            <>
              <span className="text-xs sm:text-sm md:text-base">
                ⏹️ End Session
              </span>
            </>
          ) : callStatus === CallStatus.CONNECTING ? (
            <>
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span className="text-xs sm:text-sm md:text-base">
                Connecting...
              </span>
            </>
          ) : (
            <>
              <span className="text-xs sm:text-sm md:text-base">
                ▶️ Start Session
              </span>
            </>
          )}
        </button>
      </div>

      {/* Transcript Section - Responsive */}
      <div className="bg-white rounded-lg p-3 sm:p-4 md:p-6 border border-gray-200 shadow-md flex-1">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
            💬 Conversation Transcript
          </h3>
          {messages.length > 0 && (
            <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {messages.length} message{messages.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        <div className="space-y-2 sm:space-y-3 md:space-y-4 max-h-[30vh] sm:max-h-[35vh] md:max-h-[40vh] overflow-y-auto pr-2">
          {messages.length === 0 ? (
            <div className="text-center py-6 sm:py-8">
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">💭</div>
              <p className="text-gray-400 italic text-xs sm:text-sm md:text-base">
                Start a session to see the transcript...
              </p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={cn(
                  "p-2 sm:p-3 md:p-4 rounded-lg shadow-sm transition-all hover:shadow-md",
                  message.role === "assistant"
                    ? "bg-blue-50 border-l-2 sm:border-l-4 border-blue-400"
                    : "bg-gray-50 border-l-2 sm:border-l-4 border-gray-400"
                )}
              >
                <p className="font-medium text-gray-900 text-xs sm:text-sm md:text-base flex items-center gap-2">
                  {message.role === "assistant" ? "🤖" : "👤"}
                  {message.role === "assistant"
                    ? `${name.split(" ")[0]}:`
                    : `${userName}:`}
                </p>
                <p className="mt-1 sm:mt-2 text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed">
                  {message.content}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Mobile Bottom Padding for Fixed Elements */}
      <div className="h-4 sm:hidden"></div>
    </section>
  );
};

export default CompanionComponent;
