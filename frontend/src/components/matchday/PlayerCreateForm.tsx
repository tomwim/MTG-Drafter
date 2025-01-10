import React, { useState, useRef, useEffect } from "react";
import { Member } from "../../api/memberApi"
import { Player } from "../../api/playerApi"
import ManaDropdown from "./ManaDropdown";
import { Mana, Color } from "../../utils/manaUtils";

export interface PlayerProps {
    value: Partial<Player>;
    index: number;
    id: number;
    possibleMembers: Member[];
    onValueChanged: (val: Partial<Player>) => void;
    onRemoved: () => void;
}

const PlayerCreateForm: React.FC<PlayerProps> = ({ value, index, id, possibleMembers, onValueChanged, onRemoved }) => {
    const [player, setPlayer] = useState<Partial<Player>>(value)
    const [selectedMember, setSelectedMember] = useState<Member>()
    const [mustPlayColor, setMustPlayColor] = useState<Color>(Mana.white)
    const [cannotPlayColor, setCannotPlayColor] = useState<Color>(Mana.white)
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
    const [selectedColors, setSelectedColors] = useState<Map<Color, boolean>>(
        new Map([
            [Mana.white, false],
            [Mana.blue, false],
            [Mana.black, false],
            [Mana.red, false],
            [Mana.green, false]
        ])
    );

    const playerDropdownRef = useRef<HTMLDivElement>(null)

    let currentPlayer = value;

    useEffect(() => {
        let newPlayer: Partial<Player> = {
            must_play: mustPlayColor.name,
            cannot_play: cannotPlayColor.name,
            plays: Array.from(selectedColors.entries())
                .filter(([key, value]) => value)
                .map(([key]) => key.id)
        }
        currentPlayer = newPlayer;
    }, [])

    useEffect(() => {
        onValueChanged(player);
    }, [player])

    useEffect(() => {
        currentPlayer.member = selectedMember?.id
        currentPlayer.must_play = mustPlayColor.id
        currentPlayer.cannot_play = cannotPlayColor.id
        currentPlayer.plays = Array.from(selectedColors.entries())
            .filter(([key, value]) => value)
            .map(([key]) => key.id)
        
        setPlayer({...currentPlayer});
    }, [selectedMember, mustPlayColor, cannotPlayColor, selectedColors])

    const handlePlayedColorsChange = (color: Color, isPlayed: boolean) => {
        const updatedMap = new Map(selectedColors);
        updatedMap.set(color, isPlayed);
        setSelectedColors(updatedMap)
    }

    const handleMemberSelection = (member: Member) => {
        if (member.id != currentPlayer.member) {
            setSelectedMember(member)
        }
        setIsDropdownOpen(false)
    }

    const handlePlayerClick = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    const onRemovedClick = () => {
        onRemoved()
    }

    return (
        <div className="flex space-x-6 flex-row w-full">
            <div>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Player {index + 1}</span>
                    </div>
                </label>
                <div className="dropdown"
                    ref={playerDropdownRef}
                    onBlur={(e) => {
                        if (playerDropdownRef.current && !playerDropdownRef.current.contains(e.relatedTarget)) {
                            setIsDropdownOpen(false);
                        }
                    }}>
                    <label tabIndex={0} role="input" className="btn input w-48 input-bordered bg-base-100 font-normal flex justify-between" onClick={handlePlayerClick}>
                        <span>{selectedMember ? selectedMember.display_name : "Select player..."}</span>
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
                    <div tabIndex={0} className={`dropdown-content w-full menu bg-base-200 rounded-lg z-[1] p-2 shadow-lh border border-base-300 ${isDropdownOpen ? "" : "hidden"}`}>
                        <ul>
                            {possibleMembers.map((member) => (
                                <li key={member.id} onClick={() => handleMemberSelection(member)}>
                                    <div>{member.display_name}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Must play</span>
                    </div>
                </label>
                <ManaDropdown value={mustPlayColor} onValueChanged={setMustPlayColor}></ManaDropdown>
            </div>

            <div>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Cannot play</span>
                    </div>
                </label>
                <ManaDropdown value={cannotPlayColor} onValueChanged={setCannotPlayColor}></ManaDropdown>
            </div>

            <div>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Plays</span>
                    </div>
                </label>
                <div className="join">
                    {Object.entries(Mana).map(([key, color]) => (
                        <label key={key} className={`btn join-item ${selectedColors.get(color) ? "bg-base-content" : "bg-base-200"}`}>
                            <input type="checkbox" className="hidden peer" onChange={event => handlePlayedColorsChange(color, event.target.checked)} />
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
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">&nbsp;</span>
                    </div>
                </label>
                <button className="btn" onClick={onRemovedClick}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="oklch(var(--p))"
                        viewBox="0 0 24 24"
                        stroke="oklch(var(--p))">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12" /></svg>
                    Remove
                </button>
            </div>
        </div>
    );
}

export default PlayerCreateForm;