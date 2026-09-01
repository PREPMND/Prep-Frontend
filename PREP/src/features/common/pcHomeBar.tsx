import { Building2, Factory, Feather, } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../auth/store/authStore";
import { useMyRole } from "../profile/hooks/useMyRole";
import { useOrganizations } from "../organizations/hooks/useOrganization";

export function PcHomeBar() {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const { data: roleData } = useMyRole(user?.id);
    const { data: organizations = [] } = useOrganizations();
    return (
        <div className="min-w-[15%] flex flex-col shadow-lime-200 shadow-lg">
            <div className="flex gap-2 my-4">
                <div
                    className="w-8 h-8 bg-amber-500  rounded-[50%]">
                    <div className="h-full flex justify-center items-center text-[18px] font-bold">{user?.firstName?.slice(0, 1)}</div>
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
                        <div key={role.id} className="">
                            <div className="text-sm text-neutral-500 dark:text-neutral-400">
                                {organization?.name ?? "Platform"}
                            </div>

                            <div className="font-semibold">
                                {role.role.name.replaceAll("_", " ")}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="*:flex *:items-center cursor-default *:gap-5 *:mt-7 font-Saira font-semibold ml-2">
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
            </div>
        </div>
    )

}