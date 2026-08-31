import { useChallenges } from "../hooks/useChallenges";

export function ChallengeFeed(){
    const { data , isLoading} = useChallenges();
    console.log(data);
    
    return (
        <div>
            hey
        </div>
    )
}