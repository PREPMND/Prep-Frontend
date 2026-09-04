import { Search } from "lucide-react";

export function SearchBox(){
    return (
        <>
        <div className="flex items-center justify-center w-[90%] h-[40px]">
            <button className="bg-neutral-600 flex items-center justify-between rounded-2xl! px-3 py-[6px] w-[80%]">
                <Search size={16}/>
                <div className="text-[14px] font-semibold text-neutral-300 hover:text-neutral-100 transition-colors duration-300 ease-in-out mr-5">Search</div>
                <span className="text-[14px] text-neutral-400 font-semibold border border-neutral-700! rounded-md px-[8px] ">/</span>
                
            </button>
        </div>
        </>
    )
}