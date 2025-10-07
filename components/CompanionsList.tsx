import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, getSubjectColor } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface CompanionsListProps {
  title: string;
  companions?: Companion[];
  classNames?: string;
  userPermissions?: {
    canUse: boolean;
    planType: string;
    suggestedPlan?: string;
    upgradeMessage?: string;
  };
}

const CompanionsList = ({
  title,
  companions,
  classNames,
  userPermissions,
}: CompanionsListProps) => {
  const canUseCompanions = userPermissions?.canUse !== false;
  const isRestricted = !canUseCompanions;

  return (
    <article className={cn("companion-list", classNames)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-3xl">{title}</h2>

        {/* Restriction Notice for Users Who Hit 3 Companion Limit */}
        {isRestricted && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm flex items-center gap-2">
            <div className="text-red-500">🔒</div>
            <span className="font-medium">Upgrade Required</span>
          </div>
        )}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg w-2/3">Lessons</TableHead>
            <TableHead className="text-lg">Subject</TableHead>
            <TableHead className="text-lg text-right">Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companions?.map(({ id, subject, name, topic, duration }, index) => {
            // Determine link destination based on restrictions
            const linkDestination = isRestricted
              ? `/subscription`
              : `/companions/${id}`;

            return (
              <TableRow
                key={`${id}-${index}`}
                className={isRestricted ? "opacity-60 hover:opacity-80" : ""}
              >
                <TableCell>
                  <Link href={linkDestination}>
                    <div className="flex items-center gap-2 relative">
                      {/* Lock Icon Overlay for Restricted Users */}
                      {isRestricted && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg z-10">
                          <div className="text-red-500 text-xl">🔒</div>
                        </div>
                      )}

                      <div
                        className={cn(
                          "size-[72px] flex items-center justify-center rounded-lg max-md:hidden",
                          isRestricted && "grayscale"
                        )}
                        style={{ backgroundColor: getSubjectColor(subject) }}
                      >
                        <Image
                          src={`/icons/${subject}.svg`}
                          alt={subject}
                          width={35}
                          height={35}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <p
                            className={cn(
                              "font-bold text-2xl",
                              isRestricted && "text-gray-500"
                            )}
                          >
                            {name}
                          </p>
                          {isRestricted && (
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                              LOCKED
                            </span>
                          )}
                        </div>
                        <p
                          className={cn(
                            "text-lg",
                            isRestricted && "text-gray-400"
                          )}
                        >
                          {topic}
                        </p>

                        {/* Upgrade Message for Restricted Users */}
                        {isRestricted && (
                          <p className="text-xs text-red-600">
                            {userPermissions?.upgradeMessage ||
                              "Upgrade to use this companion"}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                </TableCell>

                <TableCell>
                  <div
                    className={cn(
                      "subject-badge w-fit max-md:hidden",
                      isRestricted && "opacity-50"
                    )}
                  >
                    {subject}
                  </div>
                  <div
                    className={cn(
                      "flex items-center justify-center rounded-lg w-fit p-2 md:hidden",
                      isRestricted && "grayscale opacity-50"
                    )}
                    style={{ backgroundColor: getSubjectColor(subject) }}
                  >
                    <Image
                      src={`/icons/${subject}.svg`}
                      alt={subject}
                      width={18}
                      height={18}
                    />
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2 w-full justify-end">
                    <p
                      className={cn(
                        "text-2xl",
                        isRestricted && "text-gray-500"
                      )}
                    >
                      {duration} <span className="max-md:hidden">mins</span>
                    </p>
                    <Image
                      src="/icons/clock.svg"
                      alt="minutes"
                      width={14}
                      height={14}
                      className={cn("md:hidden", isRestricted && "opacity-50")}
                    />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Bottom Upgrade CTA for Restricted Users */}
      {isRestricted && companions && companions.length > 0 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-red-800 mb-1">
                You have {companions.length} companion
                {companions.length !== 1 ? "s" : ""} waiting!
              </h3>
              <p className="text-red-700 text-sm">
                You've reached your limit of 3 companions.{" "}
                {userPermissions?.upgradeMessage}
              </p>
            </div>
            <Link href="/subscription">
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium">
                Upgrade Now
              </button>
            </Link>
          </div>
        </div>
      )}
    </article>
  );
};

export default CompanionsList;
