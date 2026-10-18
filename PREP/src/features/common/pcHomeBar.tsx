import { Building2, Factory, Feather } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../auth/store/authStore";
import { useMyRole } from "../profile/hooks/useMyRole";
import { useOrganizations } from "../organizations/hooks/useOrganization";
import { dashboards } from "../../constants/dashboards";
import { SearchBox } from "../search/searchBox";
import { useState } from "react";
import { SearchArea } from "../search/searchArea";
import { useMyChallengeParticipations } from "../challenges/hooks/useChallengeParticipation";

import { useMedia } from "../challenges/hooks/useMedia";

export function PcHomeBar() {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const { data: roleData } = useMyRole(user?.id);

    const { data: existingChallenges = [] } = useMyChallengeParticipations()

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { data: organizations = [] } = useOrganizations();


    function ChallengeImage({
        mediaIds,
    }: {
        mediaIds?: string[];
    }) {
        const { data: media = [] } = useMedia(mediaIds ?? []);

        if (!mediaIds?.[0]) return (
            <div className="w-8 h-8  bg-neutral-800 shrink-0 border border-neutral-700/50 flex items-center justify-center text-neutral-600 text-xs">
                🏆
            </div>
        );
        if (!mediaIds?.[0]) return null;

        return media[0] ? (
            <img
                src={media[0].url}
                alt=""
                className="w-10 h-10 rounded-[50%]! rounded-md object-cover bg-neutral-800 shrink-0 border border-neutral-700/50 [image-rendering:high-quality] antialiased"
            />
        ) : null;
    }
    return (
        <div className="min-w-[15%] flex flex-col shadow-lime-200 shadow-lg cursor-default select-none *:select-none ">

            <div onClick={() => setIsSearchOpen(true)} className="cursor-pointer">
                <SearchBox />
            </div>

            {isSearchOpen && (
                <SearchArea
                    onClose={() => setIsSearchOpen(false)}
                />
            )}
            <div aria-label="profile" onClick={() => navigate("/profile")} className="flex gap-2 my-4">
                {!user ? (
                    <>
                        <div className="w-8 h-8 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-[50%]" />
                        <div className="h-8 w-32 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-xl" />
                    </>
                ) : (
                    <div className="flex items-center gap-4 line-clamp-1">
                        {!user?.avatar && (<div
                            className="w-8 h-8 bg-amber-500  rounded-[50%]">
                            <div className="h-full flex justify-center items-center text-[18px] font-bold">{user?.firstName?.slice(0, 1).toUpperCase()}</div>
                        </div>)}
                        {user?.avatar && (<div>
                            <img className="w-10 h-10 rounded-[50%]" src={user?.avatar}/>
                        </div>)}
                        <div className="font-semibold text-2xl">{user?.firstName} {user?.lastName}</div>
                    </div>
                )}
            </div>
            <div className="space-y-3">
                {!roleData ? (
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-neutral-200 dark:bg-neutral-800 flex flex-shrink-0 animate-pulse rounded-full" />
                        <div className="space-y-1">
                            <div className="h-[14px] w-16 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded" />
                            <div className="h-[14px] w-24 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded" />
                        </div>
                    </div>
                ) : (
                    roleData?.map((role) => {
                        const organization = role.organizationId
                            ? organizations.find(
                                (org) => org.id === role.organizationId,
                            )
                            : undefined;

                        return (
                            <div key={role.id} className="flex items-center gap-2 group/role py-0.5">
                                {/* Role Status Dot indicator */}
                                <div className="w-2 h-2 ml-1 bg-amber-400 dark:bg-amber-300 flex flex-shrink-0 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.5)]" />

                                {/* Inline Content Row - Keeps everything tight and compact */}
                                <div className="flex items-baseline gap-1.5 min-w-0 flex-1 flex-wrap">
                                    {/* Role Title takes natural precedence */}
                                    <span
                                        className={`capitalize truncate ${organization?.name
                                            ? "text-[14px] font-[500]"
                                            : "text-[15px] text-amber-300 font-[600]"
                                            }`}
                                    >
                                        {role.role.name.replaceAll("_", " ")}
                                    </span>

                                    {organization?.name && <span className="text-neutral-600 text-xs select-none">at</span>}

                                    {/* Organization Anchor link */}
                                    <span
                                        onClick={() =>
                                            navigate(`/organization/${organization?.id}`)
                                        }
                                        className={`cursor-pointer transition-colors hover:text-amber-400 hover:underline ${organization?.name
                                            ? "text-[13px] text-neutral-400 font-[500] line-clamp-1"
                                            : "text-[14px] text-mauve-400! font-[600]"
                                            }`}
                                    >
                                        {organization?.name ?? "Platform"}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
            <div className="w-full mt-3 border-b-1 border-emerald-400"></div>
            <div className="*:flex *:items-center cursor-default *:gap-5 *:mt-5 mt-2 font-Saira font-semibold ml-1">
                <div
                    onClick={() => navigate("/challenges/submit")}
                    className="group " >
                    <Building2 className="group-hover:text-green-300 group-hover:scale-110" />
                    <div className="group-hover:underline text-md">Submit Challenge</div>
                </div>
                <div className="w-full border-b-1 border-amber-100"></div>
                <div className="group">
                    <Factory className="group-hover:text-blue-300 group-hover:scale-110" />
                    <div className="group-hover:underline text-md">Existing Challenges</div>
                </div>
                <div className="mt-2 flex flex-col justify-items-start w-full -ml-2 pl-2">
                    {!existingChallenges && (
                        <>

                            <div className="h-10 mt-1 w-32 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-xl" />
                            <div className="h-10 mt-1 w-32 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-xl" />
                        </>
                    )}
                    {existingChallenges?.length === 0 && (
                        <div className="text-sm text-neutral-400 py-3 text-center italic border border-dashed border-neutral-800 rounded-lg">
                            No existing challenges
                        </div>
                    )}

                    {existingChallenges?.map((participation) => (
                        <div
                            key={participation.id}
                            onClick={() => navigate(`/challenge/${participation.challengeId}`)}
                            className="cursor-pointer flex flex-col w-full py-2 px-2 my-1 rounded-md bg-neutral-950 hover:bg-neutral-800/50 transition-colors group"
                        >
                            <span className="text-[14px] font-medium text-neutral-200 group-hover:text-blue-400 line-clamp-2 transition-colors">
                                {participation.challenge?.title || "Untitled Challenge"}
                            </span>

                            <div className="flex items-center gap-3 mt-0.5 text-xs text-neutral-500">
                                <span className="capitalize text-neutral-400 font-mono text-[12px] bg-neutral-800 px-1 py-0.5 rounded">
                                    {participation.role.toLowerCase().replaceAll("_", " ").slice(0, 12)}
                                </span>
                                <span>•</span>

                                <span>
                                    {participation.challenge?.mediaIds?.[0] ? (
                                        <ChallengeImage
                                            mediaIds={participation.challenge?.mediaIds}

                                        />
                                    ) : null}

                                    {(!participation.challenge?.mediaIds?.[0]) && (
                                        <div className="w-8 h-8 rounded-md bg-neutral-800 shrink-0 border border-neutral-700/50 flex items-center justify-center text-neutral-600 text-xs">
                                            🏆
                                        </div>
                                    )}
                                    {participation.challenge?.mediaIds?.[0] && (
                                        <div className="hidden w-8 h-8 rounded-md bg-neutral-800 shrink-0 border border-neutral-700/50 flex items-center justify-center text-neutral-600 text-xs">
                                            🏆
                                        </div>
                                    )}
                                </span>


                            </div>
                        </div>
                    ))}

                </div>

                <div className="w-full border-b-1 border-amber-100"></div>

                <div className="group ">
                    <Feather
                        className="group-hover:text-amber-300 group-hover:scale-110" />
                    <div className="group-hover:underline text-md">Requested To Join</div>
                </div>

                <div className="w-full border-b-1 border-amber-100"></div>
                <div className="mt-5 gap-4 flex-col place-items-start ">
                    {!roleData ? (
                        <div className="rounded-2xl w-48 h-[37px] bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
                    ) : (
                        dashboards
                            .filter((dashboard) =>
                                roleData?.some(
                                    (role) => role.role.name === dashboard.role,
                                ),
                            )
                            .map((dashboard) => (
                                <div key={dashboard.role}>
                                    <div
                                        className={`rounded-2xl w-48 text-center px-3 py-2 text-[14px] transition-all duration-400 ease-in-out font-[600] ${dashboard.className}`}
                                    >
                                        {dashboard.label}
                                    </div>
                                </div>
                            ))
                    )}
                </div>
            </div>

        </div>
    )
}
