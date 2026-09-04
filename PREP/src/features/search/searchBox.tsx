import { Search } from "lucide-react";

export function SearchBox(){
    return (
        <>
        <div>
            <button className="bg-neutral-600 flex items-center justify px-2 py-[6px] w-[80%]">
                <Search/>
                <div>Search</div>
                <span>/</span>
                
            </button>
        </div>
        </>
    )
}