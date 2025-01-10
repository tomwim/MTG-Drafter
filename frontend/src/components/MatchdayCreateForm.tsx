import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';



import CalendarDropdown from "./matchday/Calendar";
import PlayersCreateForm from "./matchday/PlayersCreateForm";
import SetDropdown from "./matchday/SetDropdown";
import MatchTypeDropdown from "./matchday/MatchTypeDropdown";

import { Set } from "../api/scryfall/setApi";
import { Player } from "../api/playerApi";
import { createMatchdayWithPlayers, Matchday } from "../api/matchdayApi";
import { MatchType } from "../utils/matchUtils";



const MatchdayCreateForm: React.FC = () => {
    const navigate = useNavigate();
    const [selectedSet, setSelectedSet] = useState<Set | undefined>()
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedMatchType, setSelectedMatchType] = useState<MatchType>()
    const [selectedPlayers, setSelectedPlayers] = useState<Partial<Player>[]>([])

    useEffect(() => {
        setSelectedDate(new Date())
    }, [])

    const onDateChanged = (date: string) => {
        setSelectedDate(new Date(date))
    }

    const handleSubmit = () => {
        if (selectedSet) {
            const newMatchday: Partial<Matchday> = {
                date: selectedDate.toISOString().split('T')[0],
                set_id: selectedSet.id,
                match_type: selectedMatchType?.id,
            }

            console.log(newMatchday)

            createMatchdayWithPlayers(newMatchday, selectedPlayers, true)
                .then((result) => {
                    console.log(result)
                    navigate(`/matchdays/${result.id}`);
                });
        }

    }

    return (
        <div className="flex-col">
            <div className="relative w-full mt-2">
                <label className="form-control">
                    <div className="label">
                        <span className="label-text">Date</span>
                    </div>
                </label>
                <CalendarDropdown value={selectedDate.toDateString()} onChanged={onDateChanged}></CalendarDropdown>
            </div>

            <div className="w-full relative mt-2">
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Set</span>
                    </div>
                </label>
                <SetDropdown onSelectionChanged={setSelectedSet}></SetDropdown>
            </div>

            <div className="w-full relative mt-2">
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Format</span>
                    </div>
                </label>
                <MatchTypeDropdown onChanged={setSelectedMatchType}></MatchTypeDropdown>
            </div>

            <div className="w-full relative mt-2">
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Players</span>
                    </div>
                </label>
                <PlayersCreateForm onChanged={setSelectedPlayers}></PlayersCreateForm>
            </div>

            <div className="relative w-full mt-2">
                <button className="btn" onClick={handleSubmit}>Submit</button>
            </div>

        </div>
    );
}

export default MatchdayCreateForm;