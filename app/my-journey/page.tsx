import CompanionsList from "@/components/CompanionsList";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  getUserCompanions,
  getUserSessions,
  newCompanionPermissions, // Add this import
} from "@/lib/actions/companion.action";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

const Profile = async () => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const [companions, sessionHistory, permissions] = await Promise.all([
    getUserCompanions(user.id),
    getUserSessions(user.id),
    newCompanionPermissions(), // Get user permissions
  ]);

  // Check if user is restricted (hit 3 companion limit)
  const isRestricted = permissions === false;

  // Prepare permissions object for CompanionsList
  const userPermissions = {
    canUse: !isRestricted,
    planType: isRestricted ? "basic" : "free",
    suggestedPlan: "pro",
    upgradeMessage:
      "Upgrade to Basic plan for 3 companions or Pro for unlimited companions",
  };

  // Calculate subject distribution for chart
  const subjectCounts = companions.reduce((acc, companion) => {
    const subject = companion.subject || "Unknown";
    acc[subject] = (acc[subject] || 0) + 1;
    return acc;
  }, {});

  // Prepare chart data
  const chartData = Object.entries(subjectCounts).map(([subject, count]) => ({
    subject,
    count,
    percentage:
      companions.length > 0
        ? ((count / companions.length) * 100).toFixed(1)
        : 0,
  }));

  return (
    <main className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6 lg:py-8 space-y-4 sm:space-y-6 md:space-y-8">
      {/* Profile Header - Fully Responsive */}
      <section className="bg-gradient-to-br from-white via-blue-50 to-indigo-100 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-blue-100 p-3 sm:p-4 md:p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row justify-between gap-4 sm:gap-6 items-center lg:items-start">
          {/* User Info - Mobile First */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 items-center w-full lg:w-auto">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200"></div>
              <Image
                src={user.imageUrl}
                alt={
                  user.firstName
                    ? `${user.firstName}'s profile picture`
                    : "User profile picture"
                }
                width={80}
                height={80}
                className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 rounded-full border-2 sm:border-4 border-white shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="flex flex-col gap-2 sm:gap-3 text-center sm:text-left">
              <div>
                <h1 className="font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-sm sm:text-base text-gray-600 font-medium break-all sm:break-normal">
                  {user.emailAddresses[0].emailAddress}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                <div className="px-2 sm:px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs sm:text-sm font-semibold">
                  ✅ Active Student
                </div>
                <div className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-semibold">
                  🎯 Level {Math.min(Math.floor(sessionHistory.length / 5) + 1, 10)}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards - Responsive Grid */}
          <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-3 md:gap-4 w-full sm:w-auto lg:w-auto">
            <div className="group bg-white/70 backdrop-blur-sm border border-white/50 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-w-0 sm:min-w-[120px] md:min-w-[140px]">
              <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 md:gap-3 items-center">
                <div className="p-1 sm:p-2 bg-green-100 rounded-md sm:rounded-lg group-hover:bg-green-200 transition-colors">
                  <Image
                    src="/icons/check.svg"
                    alt="Completed lessons icon"
                    width={16}
                    height={16}
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 filter group-hover:scale-110 transition-transform"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-green-600 group-hover:text-green-700 transition-colors">
                    {sessionHistory.length}
                  </p>
                  <div className="text-xs sm:text-sm font-semibold text-gray-700 leading-tight">
                    Lessons
                    <span className="hidden sm:inline"> Completed</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="group bg-white/70 backdrop-blur-sm border border-white/50 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-w-0 sm:min-w-[120px] md:min-w-[140px]">
              <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 md:gap-3 items-center">
                <div className="p-1 sm:p-2 bg-blue-100 rounded-md sm:rounded-lg group-hover:bg-blue-200 transition-colors">
                  <Image
                    src="/icons/cap.svg"
                    alt="Companions created icon"
                    width={16}
                    height={16}
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 filter group-hover:scale-110 transition-transform"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-blue-600 group-hover:text-blue-700 transition-colors">
                    {companions.length}
                  </p>
                  <div className="text-xs sm:text-sm font-semibold text-gray-700 leading-tight">
                    AI
                    <span className="hidden sm:inline"> Companions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Journey Chart Section - Responsive */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-blue-200 p-3 sm:p-4 md:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
          <div className="p-2 sm:p-3 bg-white rounded-lg sm:rounded-xl shadow-lg">
            <Image
              src="/images/logo-2.png"
              alt="Chart icon"
              width={24}
              height={24}
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 filter hover:scale-110 transition-transform"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My Learning Journey
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-medium">Track your progress and achievements</p>
          </div>
        </div>

        {companions.length > 0 ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {/* Subject Distribution Chart - Mobile Optimized */}
            <div className="bg-white/60 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-white/50 shadow-lg">
              <h3 className="font-bold text-lg sm:text-xl text-gray-800 mb-3 sm:mb-4 md:mb-6 flex items-center gap-2">
                <span className="text-lg sm:text-xl">📊</span>
                <span className="text-sm sm:text-base md:text-lg">Subject Distribution</span>
              </h3>
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                {chartData.map(({ subject, count, percentage }) => {
                  const getSubjectColor = (subject) => {
                    const colors = {
                      Math: "#3B82F6", // Blue
                      English: "#10B981", // Green
                      Science: "#F59E0B", // Yellow
                      History: "#EF4444", // Red
                      Geography: "#8B5CF6", // Purple
                      Art: "#EC4899", // Pink
                      Music: "#06B6D4", // Cyan
                      Programming: "#6366F1", // Indigo
                      General: "#6B7280", // Gray
                      Unknown: "#9CA3AF", // Light Gray
                    };
                    return colors[subject] || "#6B7280";
                  };

                  const color = getSubjectColor(subject);

                  return (
                    <div key={subject} className="group p-2 sm:p-3 rounded-md sm:rounded-lg hover:bg-white/80 transition-all duration-300 cursor-pointer">
                      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                        <div
                          className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full shadow-lg group-hover:scale-125 transition-transform flex-shrink-0"
                          style={{ backgroundColor: color }}
                        />
                        <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2 min-w-0">
                          <span className="font-semibold text-sm sm:text-base text-gray-800 group-hover:text-gray-900 truncate">
                            {subject}
                          </span>
                          <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-wrap">
                            <span className="text-xs sm:text-sm font-medium text-gray-600 bg-gray-100 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full whitespace-nowrap">
                              {count} companion{count !== 1 ? "s" : ""}
                            </span>
                            <span 
                              className="text-sm sm:text-lg font-black px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-white shadow-lg"
                              style={{ backgroundColor: color }}
                            >
                              {percentage}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Visual Progress Bars - Mobile Optimized */}
            <div className="bg-white/60 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-white/50 shadow-lg">
              <h3 className="font-bold text-lg sm:text-xl text-gray-800 mb-3 sm:mb-4 md:mb-6 flex items-center gap-2">
                <span className="text-lg sm:text-xl">📈</span>
                <span className="text-sm sm:text-base md:text-lg">Progress Breakdown</span>
              </h3>
              <div className="space-y-3 sm:space-y-4 md:space-y-5">
                {chartData.map(({ subject, count, percentage }) => {
                  const getSubjectColor = (subject) => {
                    const colors = {
                      Math: "#3B82F6",
                      English: "#10B981",
                      Science: "#F59E0B",
                      History: "#EF4444",
                      Geography: "#8B5CF6",
                      Art: "#EC4899",
                      Music: "#06B6D4",
                      Programming: "#6366F1",
                      General: "#6B7280",
                      Unknown: "#9CA3AF",
                    };
                    return colors[subject] || "#6B7280";
                  };

                  const color = getSubjectColor(subject);

                  return (
                    <div key={subject} className="group">
                      <div className="flex justify-between items-center mb-1 sm:mb-2">
                        <span className="font-semibold text-sm sm:text-base text-gray-800 group-hover:text-gray-900 transition-colors truncate">
                          {subject}
                        </span>
                        <span 
                          className="text-xs sm:text-sm font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-white flex-shrink-0"
                          style={{ backgroundColor: color }}
                        >
                          {percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 shadow-inner overflow-hidden">
                        <div
                          className="h-2 sm:h-3 rounded-full shadow-lg transition-all duration-500 hover:shadow-xl relative overflow-hidden"
                          style={{
                            backgroundColor: color,
                            width: `${percentage}%`,
                          }}
                        >
                          <div 
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 -skew-x-12 animate-pulse"
                            style={{ animationDuration: '2s' }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12 bg-white/60 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/50">
            <div className="mb-4 sm:mb-6">
              <Image
                src="/icons/chart-empty.svg"
                alt="No data"
                width={60}
                height={60}
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto opacity-40 hover:opacity-60 transition-opacity"
              />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-600 mb-2">No companions created yet</h3>
            <p className="text-sm sm:text-base text-gray-500 max-w-md mx-auto px-4">
              Create your first AI companion to start tracking your learning journey and see detailed analytics!
            </p>
          </div>
        )}

        {/* Journey Stats - Responsive Grid */}
        <div className="mt-4 sm:mt-6 md:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          {[
            { 
              value: companions.length, 
              label: "Total Companions", 
              shortLabel: "Companions",
              color: "blue", 
              icon: "🤖",
              gradient: "from-blue-500 to-blue-600"
            },
            { 
              value: Object.keys(subjectCounts).length, 
              label: "Subjects Explored", 
              shortLabel: "Subjects",
              color: "green", 
              icon: "📚",
              gradient: "from-green-500 to-green-600"
            },
            { 
              value: sessionHistory.length, 
              label: "Sessions Completed", 
              shortLabel: "Sessions",
              color: "purple", 
              icon: "⚡",
              gradient: "from-purple-500 to-purple-600"
            },
            { 
              value: companions.length > 0 ? Math.max(...Object.values(subjectCounts)) : 0, 
              label: "Most Created Subject", 
              shortLabel: "Top Subject",
              color: "orange", 
              icon: "🏆",
              gradient: "from-orange-500 to-orange-600"
            }
          ].map((stat, index) => (
            <div 
              key={index}
              className="group bg-white/70 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/50"
            >
              <div className="text-center">
                <div className="text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className={`text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}>
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide leading-tight">
                  <span className="sm:hidden">{stat.shortLabel}</span>
                  <span className="hidden sm:inline">{stat.label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Accordion Section - Mobile Optimized */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-200 overflow-hidden">
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="recent" className="border-b border-gray-200">
            <AccordionTrigger className="text-lg sm:text-xl md:text-2xl font-bold hover:text-blue-600 transition-colors px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6 hover:bg-blue-50">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-lg sm:text-xl md:text-2xl">📖</span>
                <span>Recent Sessions</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-3 sm:px-4 md:px-6 lg:px-8 pb-3 sm:pb-4 md:pb-6">
              <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6">
                <CompanionsList
                  title="Recent Sessions"
                  companions={sessionHistory}
                  userPermissions={userPermissions}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="companions">
            <AccordionTrigger className="text-lg sm:text-xl md:text-2xl font-bold hover:text-purple-600 transition-colors px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6 hover:bg-purple-50">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <span className="text-lg sm:text-xl md:text-2xl">🤖</span>
                <span>My Companions</span>
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-purple-100 text-purple-800 rounded-full text-sm sm:text-base md:text-lg font-black">
                  {companions.length}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-3 sm:px-4 md:px-6 lg:px-8 pb-3 sm:pb-4 md:pb-6">
              <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6">
                <CompanionsList
                  title="My Companions"
                  companions={companions}
                  userPermissions={userPermissions}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  );
};

export default Profile;
