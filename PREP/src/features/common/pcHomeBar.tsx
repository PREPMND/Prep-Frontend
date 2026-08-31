import { BookAlert, CreativeCommonsIcon, PlaneLanding } from "lucide-react";

export function PcHomeBar(){
    return(
        <div>
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
                    <div></div>
                </div>
            </div>
        </div>
    )

}