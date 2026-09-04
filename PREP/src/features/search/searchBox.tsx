import { Search } from "lucide-react";

export function SearchBox(){
    return (
        <>
        <div>
            <button className="bg-neutral-600 flex items-center justify-between px-2 py-[6px] w-[80%]">
                <Search size={16}/>
                <div className="text-[14px] font-semibold mr-5">Search</div>
                <span>/</span>
                
            </button>
        </div>
        </>
    )
}