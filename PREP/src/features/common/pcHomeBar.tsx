import { BookAlert, CreativeCommonsIcon, PlaneLanding } from "lucide-react";

export function PcHomeBar(){
    return(
        <div className="min-w-[15%]">
            <div>
                <div>
                    <CreativeCommonsIcon/>
                    <div>Submit Challenge</div>
                </div>
                <div>
                    <BookAlert/>
                    <div>Existing Challenges</div>
                </div>
                <div>
                    <PlaneLanding/>
                    <div>Requested To Join</div>
                </div>
            </div>
        </div>
    )

}