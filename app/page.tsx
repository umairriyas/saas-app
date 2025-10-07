import CompanionCard from "@/components/CompanionCard";
import { Button } from "@/components/ui/button";
import React from "react";
import CompanionSession from "./companions/[id]/page";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import { recentSessions } from "@/constants";
import {
  getAllCompanions,
  getRecentSessions,
  newCompanionPermissions, // ← Add this import
} from "@/lib/actions/companion.action";
import { getSubjectColor } from "@/lib/utils";
import Hero from "@/components/hero";
import AboutUs from "./my-journey/about-us/page";
import Footer from "@/components/Footer";
import { auth } from "@clerk/nextjs/server"; // ← Add this import
import TrustIndicatorBanner from "@/components/TrustIndicatorBanner";

// 🛠️ Tell Next.js this is a dynamic (server-rendered) page
export const dynamic = "force-dynamic";

const Page = async () => {
  const { userId } = await auth(); // ← Get current user
  const companions = await getAllCompanions({ limit: 3 });
  const recentSessionsCompanions = await getRecentSessions(10);

  // ← Check if user has reached their companion limit (3 companions)
  let isRestricted = false;
  let userPermissions = null;

  if (userId) {
    const permissions = await newCompanionPermissions();
    // If permissions is false, user has hit their limit
    isRestricted = permissions === false;

    // Prepare permissions object for CompanionsList
    userPermissions = {
      canUse: !isRestricted, // Users can use companions if not restricted
      planType: permissions === false ? "basic" : "free", // Assume basic if restricted
      suggestedPlan: "pro",
      upgradeMessage:
        "Upgrade to Basic plan for 3 companions or Pro for unlimited companions",
    };
  }

  return (
    <main>
      <Hero />

      {/* ← Add restriction notice at top if user is restricted */}
      {isRestricted && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6 mx-4">
          <div className="flex items-center gap-3">
            <div className="text-red-500 text-xl">⚠️</div>
            <div>
              <h3 className="font-bold mb-1">Companion Limit Reached</h3>
              <p className="text-sm">
                You've reached your limit of 3 companions. Upgrade to Basic or
                Pro plan to use these companions.
              </p>
            </div>
          </div>
        </div>
      )}

      <h1>Popular Companions</h1>
      <section className="home-section">
        {companions.map((companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
            isRestricted={isRestricted} // ← Pass restriction status to each card
          />
        ))}
      </section>

      <section className="home-section">
        <CompanionsList
          title="Recently completed sessions"
          companions={recentSessionsCompanions}
          classNames="w-2/3 max-lg:w-full"
          userPermissions={userPermissions} // ← Pass permissions to CompanionsList
        />
        <CTA />
      </section>
      <Footer />
    </main>
  );
};

export default Page;
