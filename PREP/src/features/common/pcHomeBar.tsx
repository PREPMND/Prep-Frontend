import { Building2, Factory, Feather, } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../auth/store/authStore";
import { useMyRole } from "../profile/hooks/useMyRole";
import { useOrganizations } from "../organizations/hooks/useOrganization";
import { dashboards } from "../../constants/dashboards";
import { SearchBox } from "../search/searchBox";
import { useState } from "react";
import { SearchArea } from "../search/searchArea";

export function PcHomeBar() {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const { data: roleData } = useMyRole(user?.id);
    console.log(roleData);
    
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { data: organizations = [] } = useOrganizations();
    return (
        <div className="min-w-[15%] flex flex-col scrollbar-none shadow-lime-200 shadow-lg cursor-default select-none *:select-none">
            

            <div onClick={() => setIsSearchOpen(true)}>
                <SearchBox />
            </div>

            {isSearchOpen && (
                <SearchArea
                    onClose={() => setIsSearchOpen(false)}
                    
                />
            )}
            <div aria-label="profile" onClick={() => navigate("/profile")} className="flex gap-2 my-4">
                <div
                    className="w-8 h-8 bg-amber-500  rounded-[50%]">
                    <div className="h-full flex justify-center items-center text-[18px] font-bold">{user?.firstName?.slice(0, 1).toUpperCase()}</div>
                </div>
                <div className="font-semibold text-2xl">{user?.firstName} {user?.lastName}</div>

            </div>
            <div className="space-y-3">
                {roleData?.map((role) => {
                    const organization = role.organizationId
                        ? organizations.find(
                            (org) => org.id === role.organizationId,
                        )
                        : undefined;

                    return (
                        <div className="flex items-center gap-2">
                            <div
                                className="w-4 h-4 bg-amber-200 animate-pulse duration-1000 rounded-full"></div>
                            <div key={role.id} className="">
                                <div
                                    onClick={() => navigate(`/organization/${organization?.id}`)}
                                    className={`text-sm  dark:text-neutral-400 ${organization?.name ? "text-[14px] text-neutral-500 font-[500]" : "text-[14px] text-mauve-400! font-[600]"}`}>
                                    {organization?.name ?? "Platform"}
                                </div>

                                <div className={`${organization?.name ? "text-[14px]  font-[500]" : "text-[16px] text-amber-300 font-[600]"}`}>
                                    {role.role.name.replaceAll("_", " ")}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="*:flex *:items-center cursor-default *:gap-5 *:mt-7 mt-3 font-Saira font-semibold ml-2">
                <div
                    onClick={() => navigate("/challenges/submit")}
                    className="group " >
                    <Building2 className="group-hover:text-green-300 group-hover:scale-110" />
                    <div className="group-hover:underline text-md">Submit Challenge</div>
                </div>
                <div className="group ">
                    <Factory
                        className="group-hover:text-blue-300 group-hover:scale-110" />
                    <div className="group-hover:underline text-md">Existing Challenges</div>
                </div>
                <div className="group ">
                    <Feather
                        className="group-hover:text-amber-300 group-hover:scale-110" />
                    <div className="group-hover:underline text-md">Requested To Join</div>
                </div>
                <div className="mt-5 gap-4 flex-col place-items-start ">
                    {dashboards
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
                        ))}
                </div>
            </div>

        </div>
    )

}