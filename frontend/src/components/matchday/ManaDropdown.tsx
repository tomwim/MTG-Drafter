import React, { useState, useRef, useEffect } from "react";
import { Mana, Color } from "../../utils/manaUtils";

interface DropdownProps {
    value: Color;
    onValueChanged: (val: Color) => void;
  }

const ManaDropdown: React.FC<DropdownProps> = ({ value, onValueChanged }) => {
    const [selectedColor, setSelectedColor] = useState<Color>(value)
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const handleSelection = (key: string) => {
        setSelectedColor(Mana[key])
        setIsDropdownOpen(false)
    }

    const handleClick = () => {
        setIsDropdownOpen(!isDropdownOpen)
    };

    useEffect(() => {
        onValueChanged(selectedColor)
    }, [selectedColor]);

    return (
        <div>

            <div className="dropdown"
                ref={dropdownRef}
                onBlur={(e) => {
                    if (dropdownRef.current && !dropdownRef.current.contains(e.relatedTarget)) {
                        setIsDropdownOpen(false);
                    }
                }}>
                <label tabIndex={0} role="input" className="btn input input-bordered bg-base-100 flex justify-between" onClick={handleClick}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="oklch(var(--p))"
                        viewBox="0 0 100 100"
                        stroke="oklch(var(--p))"
                        className="w-6 h-6"
                    >
                        <path
                            d={selectedColor.svg_path}
                        />
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5 ml-2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 9l6 6 6-6"
                        />
                    </svg>
                </label>

                <ul tabIndex={0} className={`dropdown-content menu w-full items-center bg-base-200 rounded-lg z-[1] p-2 shadow-lh border border-base-300 ${isDropdownOpen ? "" : "hidden"}`}>
                    {Object.entries(Mana).map(([key, color]) => (
                        <li key={key} onClick={() => handleSelection(key)}>
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="oklch(var(--p))"
                                    viewBox="0 0 100 100"
                                    stroke="oklch(var(--p))"
                                    className="w-6 h-6"
                                >
                                    <path
                                        d={color.svg_path}
                                    />
                                </svg>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    );
}

export default ManaDropdown;