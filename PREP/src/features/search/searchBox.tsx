import { Search } from "lucide-react";

export function SearchBox(){
    return (
        <>
        <div>
            <button className="bg-neutral-600 flex items-center justify-between rounded-2xl! px-3 py-[6px] w-[80%]">
                <Search size={16}/>
                <div className="text-[14px] font-semibold mr-5">Search</div>
                <span className="text-[14px]  font-semibold ">/</span>
                
            </button>
        </div>
        </>
    )
}