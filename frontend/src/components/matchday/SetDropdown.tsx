import React, { useState, useEffect, useRef } from "react";
import { Set, fetchSets } from "../../api/scryfall/setApi";
import { ReactSVG } from 'react-svg';

export interface SelectSetProps {
    onSelectionChanged: (newSet: Set | undefined) => void;
}

const SetDropdown: React.FC<SelectSetProps> = ({ onSelectionChanged }) => {
    const [sets, setSets] = useState<Set[]>([]);
    const [filteredSets, setFilteredSets] = useState<Set[] | undefined>();
    const [isSetDropdownOpen, setIsSetDropdownOpen] = useState(false);
    const [selectedSet, setSelectedSet] = useState<Set | undefined>();
    const [setSearchValue, setSetSearchValue] = useState<string>("");
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const getSets = async () => {
            try {
                let fetchedSets = await fetchSets();
                fetchedSets = fetchedSets.filter(s => s.set_type !== "promo" && s.set_type !== "token" && s.set_type !== "memorabilia")
                setSets(fetchedSets);
            } catch (err) {
                console.log("Fetch sets failed.")
            }
        };

        getSets();
    }, []);

    const onSetSelected = (set: Set) => {
        setSelectedSet(set)
    }

    const toggleDropdownState = () => {
        setIsSetDropdownOpen(!isSetDropdownOpen)
        filterSetsByName()
    }

    const onResetSet = () => {
        setSelectedSet(undefined)
        setSetSearchValue("")
    }

    const handleClick = () => {
        toggleDropdownState()
    };

    const onSetInputChanged = (event: any) => {
        if (selectedSet && event.target.value !== selectedSet.name) {
            const val = event.target.value.replace(selectedSet.name, "")
            setSelectedSet(undefined)
            setSetSearchValue(val)
        }
        else {
            setSetSearchValue(event.target.value)
        }
    }

    const filterSetsByName = () => {
        if (setSearchValue) {
            setFilteredSets(sets?.filter(function (set) { return set.name.toLowerCase().match(setSearchValue.toLowerCase()) }))
        }
        else {
            setFilteredSets(sets)
        }
    }

    useEffect(() => {
        filterSetsByName()
    }, [setSearchValue]);

    useEffect(() => {
        if (selectedSet) {
            setSetSearchValue("")
        }

        onSelectionChanged(selectedSet)
    }, [selectedSet]);

    return (
        <div>
            <div className="dropdown w-full"
                ref={dropdownRef}
                onBlur={(e) => {
                    if (dropdownRef.current && !dropdownRef.current.contains(e.relatedTarget)) {
                        setIsSetDropdownOpen(false);
                    }
                }}>
                <label tabIndex={0} role="btn" className="btn input input-bordered bg-base-100 font-normal flex justify-between w-full" onClick={handleClick}>
                    <div className="flex-row flex">
                        {selectedSet &&
                            <ReactSVG className="w-5 h-5 mr-3" src={selectedSet.icon_svg_uri.substring(0, selectedSet.icon_svg_uri.indexOf("?"))}
                                beforeInjection={(svg) => {
                                    svg.setAttribute("fill", "oklch(var(--p))");
                                    svg.setAttribute("stroke", "oklch(var(--p))");
                                    const paths = svg.querySelectorAll('path');
                                    paths.forEach((path) => {
                                        path.setAttribute('fill','text-slate-200');
                                        path.removeAttribute('fill-rule');
                                    });
                                    const groups = svg.querySelectorAll('g');
                                    groups.forEach((group) => {
                                        group.removeAttribute('fill');
                                        group.removeAttribute('fill-rule');
                                    });
                                }} />}
                        <span>{selectedSet ? selectedSet.name : "Select set..."}</span>
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
                <div tabIndex={0} className={`dropdown-content w-full menu bg-base-200 rounded-lg z-[1] p-2 shadow-lh border border-base-300 h-96 ${isSetDropdownOpen ? "" : "hidden"}`}>
                    <ul className="relative mt-1 mb-1 overflow-y-auto">
                        {filteredSets?.map((set) => (
                            <li key={set.id} onClick={() => { handleClick(); onSetSelected(set); }} role="option" className="relative w-full cursor-default select-none py-2 pl-3 pr-9">
                                <div className="flex">
                                    <ReactSVG className="w-6 h-6" src={set.icon_svg_uri.substring(0, set.icon_svg_uri.indexOf("?"))}
                                        beforeInjection={(svg) => {
                                            svg.setAttribute("fill", "oklch(var(--p))");
                                            svg.setAttribute("stroke", "oklch(var(--p))");
                                            const paths = svg.querySelectorAll('path');
                                            paths.forEach((path) => {
                                                path.removeAttribute('fill');
                                                path.removeAttribute('fill-rule');
                                            });
                                            const groups = svg.querySelectorAll('g');
                                            groups.forEach((group) => {
                                                group.removeAttribute('fill');
                                                group.removeAttribute('fill-rule');
                                            });
                                        }}
                                    />
                                    {set.name}
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

export default SetDropdown;