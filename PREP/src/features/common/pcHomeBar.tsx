import { BookAlert, CreativeCommonsIcon, PlaneLanding } from "lucide-react";

export function PcHomeBar(){
    return(
        <div className="min-w-[15%] flex flex-col ">
            <div className="*:flex *:items-center cursor-default *:gap-5 *:mt-7 font-Saira font-semibold group ">
                <div  >
                    <CreativeCommonsIcon className="group-hover:text-amber-400 group-hover:scale-105"/>
                    <div className="group-hover:underline">Submit Challenge</div>
                </div>
                <div>
                    <BookAlert
                    className="group-hover:text-amber-100"/>
                    <div>Existing Challenges</div>
                </div>
                <div>
                    <PlaneLanding
                    className="group-hover:text-amber-100"/>
                    <div>Requested To Join</div>
                </div>
            </div>
        </div>
    )

}