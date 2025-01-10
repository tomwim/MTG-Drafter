import React, { useState, useEffect, useRef } from "react";
import { MatchType, MatchTypes } from "../../utils/matchUtils";

export interface MatchTypeProps
{
    onChanged: (newMatchType: MatchType ) => void;
}

const MatchTypeDropdown: React.FC<MatchTypeProps> = ({ onChanged }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedMatchType, setSelectedMatchType] = useState<MatchType>(MatchTypes.bo2);
    const dropdownRef = useRef<HTMLDivElement>(null)

    const onTypeSelected = (matchType: MatchType) => {
        setSelectedMatchType(matchType)
    }

    const handleClick = () => {
        setIsDropdownOpen(!isDropdownOpen)
    };

    useEffect(() => {
        onChanged(selectedMatchType)
    }, [selectedMatchType]);


    return (
        <div>
            <div className="dropdown w-full"
                ref={dropdownRef}
                onBlur={(e) => {
                    if (dropdownRef.current && !dropdownRef.current.contains(e.relatedTarget)) {
                        setIsDropdownOpen(false);
                    }
                }}>
                <label tabIndex={0} role="input" className="btn input input-bordered bg-base-100 font-normal flex justify-between w-full" onClick={handleClick}>
                    <div className="flex-row flex">
                        <span>{selectedMatchType.name}</span>
                    </div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5 ml-2 text-right"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 9l6 6 6-6"
                        />
                    </svg>
                </label>
                <div tabIndex={0} className={`dropdown-content w-full menu bg-base-200 rounded-lg z-[1] p-2 shadow-lh border border-base-300 h-60 ${isDropdownOpen ? "" : "hidden"}`}>
                    <ul className="relative mt-1 mb-1 overflow-y-auto">
                        {Object.entries(MatchTypes).map(([key, matchType]) => (
                            <li key={key} onClick={() => { handleClick(); onTypeSelected(matchType); }} role="option" className="relative w-full cursor-default select-none py-2 pl-3 pr-9">
                                <div className="flex">
                                    {matchType.name}
                                </div>
                            </li>
                        ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default MatchTypeDropdown;