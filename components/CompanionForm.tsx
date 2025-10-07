"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "./ui/textarea";
import { subjects } from "@/constants";
import { createCompanion } from "@/lib/actions/companion.action";

// Custom Modal Component
const UpgradeModal = ({
  isOpen,
  onClose,
  onUpgrade,
}: {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900">
                <span className="text-3xl">🚀</span>
                Upgrade to Pro Plan
              </h2>
              <p className="text-gray-600 mt-2">
                You're trying to create a session longer than 5 minutes, which
                requires a Pro plan.
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Benefits */}
          <div className="space-y-4 mb-6">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-lg mb-3 text-gray-900">
                Pro Plan Benefits:
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5 text-lg">✓</span>
                  <span>
                    <strong>Extended Sessions:</strong> Up to 60 minutes per
                    session
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5 text-lg">✓</span>
                  <span>
                    <strong>Unlimited Companions:</strong> Create as many AI
                    tutors as you need
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5 text-lg">✓</span>
                  <span>
                    <strong>Priority Support:</strong> Get help faster when you
                    need it
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5 text-lg">✓</span>
                  <span>
                    <strong>Advanced Analytics:</strong> Track your learning
                    progress in detail
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5 text-lg">✓</span>
                  <span>
                    <strong>Save Transcripts:</strong> Download conversation
                    history
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>💡 Limited Time Offer:</strong> Get 20% off your first
                month when you upgrade now!
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Maybe Later
            </Button>
            <Button
              type="button"
              onClick={onUpgrade}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              Upgrade to Pro Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CompanionForm = () => {
  const router = useRouter();
  const { isLoaded, user } = useUser();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Check user plan - free users have 5-minute limit, pro users get up to 60 minutes
  const userPlan = (user?.publicMetadata?.plan as string) || "free";
  const isPro = userPlan === "pro";
  const MAX_DURATION = 5; // STRICT 5-minute limit for free users
  const PRO_MAX_DURATION = 60; // Pro users get up to 60 minutes

  // Zod schema with dynamic validation
  const formSchema = z.object({
    name: z.string().min(1, { message: "Companion name is required" }),
    subject: z.string().min(1, { message: "Subject is required" }),
    topic: z.string().min(1, { message: "Topic is required" }),
    voice: z.string().min(1, { message: "Voice is required" }),
    style: z.string().min(1, { message: "Style is required" }),
    duration: z.coerce
      .number()
      .min(1, { message: "Duration must be at least 1 minute" })
      .max(isPro ? PRO_MAX_DURATION : MAX_DURATION, {
        message: isPro
          ? `Duration cannot exceed ${PRO_MAX_DURATION} minutes`
          : `Free plan limited to ${MAX_DURATION} minutes. Upgrade to Pro for longer sessions!`,
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      topic: "",
      voice: "",
      style: "",
      duration: 3, // Default to 3 minutes (middle of the range)
    },
  });

  // Watch duration field for real-time validation
  const watchDuration = form.watch("duration");

  // Show upgrade modal when free user exceeds 5 minutes
  const handleDurationChange = (value: string) => {
    const numValue = parseInt(value);

    if (!isPro && numValue > MAX_DURATION) {
      setShowUpgradeModal(true);
      // Reset to max allowed for free users
      form.setValue("duration", MAX_DURATION);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Double-check duration limit before submission
    if (!isPro && values.duration > MAX_DURATION) {
      setShowUpgradeModal(true);
      return;
    }

    const companion = await createCompanion(values);

    if (companion) {
      router.push(`/companions/${companion.id}`);
    } else {
      console.error("Failed to create a companion");
      router.push("/");
    }
  };

  const handleUpgrade = () => {
    setShowUpgradeModal(false);
    router.push("/subscription");
  };

  // Show loading state while Clerk is fetching user data
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Handle case where user is not authenticated
  if (!user) {
    router.push("/sign-in");
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Plan Badge Display */}
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-center gap-3 flex-wrap">
          <div
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              isPro
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {isPro ? "⭐ PRO Plan" : "🆓 Free Plan"}
          </div>
          <span className="text-sm text-gray-600">
            Max Session:{" "}
            <span className="font-bold text-red-600">
              {isPro ? PRO_MAX_DURATION : MAX_DURATION} minutes
            </span>
          </span>
        </div>
        {!isPro && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleUpgrade}
            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
          >
            Upgrade to Pro
          </Button>
        )}
      </div>

      {/* Free Plan Limitation Notice */}
      {!isPro && (
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h4 className="font-semibold text-amber-800 mb-1">
                Free Plan Limitation
              </h4>
              <p className="text-sm text-amber-700">
                Free users are limited to <strong>5 minutes maximum</strong> per
                session. Upgrade to Pro for sessions up to 60 minutes and unlock
                unlimited companions!
              </p>
            </div>
          </div>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Companion Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Companion Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the Companion name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Subject */}
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="input capitalize">
                      <SelectValue placeholder="Choose the Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem
                          value={subject}
                          key={subject}
                          className="capitalize"
                        >
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Topic */}
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What should the companion help with?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Ex. Derivatives & Integrals"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Voice */}
          <FormField
            control={form.control}
            name="voice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Voice</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="input">
                      <SelectValue placeholder="Select the Voice" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Style */}
          <FormField
            control={form.control}
            name="style"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Style</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="input">
                      <SelectValue placeholder="Select the style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Duration with Enhanced Validation - STRICT 5 MINUTE LIMIT */}
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  Estimated Session Duration (minutes)
                  {!isPro && (
                    <span className="text-xs font-normal text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                      Max 5 min
                    </span>
                  )}
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder={`Max ${
                        isPro ? PRO_MAX_DURATION : MAX_DURATION
                      } minutes`}
                      min={1}
                      max={isPro ? PRO_MAX_DURATION : MAX_DURATION}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleDurationChange(e.target.value);
                      }}
                      className={`${
                        !isPro && watchDuration > MAX_DURATION
                          ? "border-red-500 focus:ring-red-500"
                          : ""
                      }`}
                    />
                    {!isPro && watchDuration > MAX_DURATION && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <span className="text-red-500 text-xl">⚠️</span>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormDescription className="text-xs">
                  {isPro ? (
                    <span className="text-green-600">
                      ✅ Pro users can create sessions up to {PRO_MAX_DURATION}{" "}
                      minutes
                    </span>
                  ) : (
                    <span className="text-gray-600">
                      <button
                        type="button"
                        onClick={handleUpgrade}
                        className="text-blue-600 hover:underline ml-1 font-medium"
                      >
                        Upgrade for longer sessions (up to 60 min) →
                      </button>
                    </span>
                  )}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700"
          >
            Build your companion
          </Button>
        </form>
      </Form>

      {/* Custom Upgrade Modal */}
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        onUpgrade={handleUpgrade}
      />
    </div>
  );
};

export default CompanionForm;
