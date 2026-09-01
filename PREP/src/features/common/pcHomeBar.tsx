import { BookAlert, CreativeCommonsIcon, PlaneLanding } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../auth/store/authStore";

export function PcHomeBar(){
    const navigate=useNavigate();
    const user = useAuthStore((state) => state.user);
    return(
        <div className="min-w-[15%] flex flex-col ">
            <div>
                <div>{user?.firstName?.slice(0,1)}</div>
                <div className="font-semibold text-2xl">{user?.firstName} {user?.lastName}</div>
                
            </div>
            <div className="*:flex *:items-center cursor-default *:gap-5 *:mt-7 font-Saira font-semibold ">
                <div 
                onClick={()=>navigate("/challenges/submit")}
                className="group " >
                    <CreativeCommonsIcon className="group-hover:text-green-300 group-hover:scale-110"/>
                    <div className="group-hover:underline text-lg">Submit Challenge</div>
                </div>
                <div className="group ">
                    <BookAlert
                    className="group-hover:text-blue-300 group-hover:scale-110"/>
                    <div className="group-hover:underline text-lg">Existing Challenges</div>
                </div>
                <div className="group ">
                    <PlaneLanding
                    className="group-hover:text-amber-300 group-hover:scale-110"/>
                    <div className="group-hover:underline text-lg">Requested To Join</div>
                </div>
            </div>
        </div>
    )

}