import React, { useEffect, useState } from "react";
import { Match, updateScore } from "../../api/matchApi";
import { Player } from "../../api/playerApi";
import MatchComponent from "./MatchComponent";

export interface MatchesListProps {
    matches: Match[]
    players: Player[]
    onSubmitted: (matches: Match[]) => void;
}

const MatchesList: React.FC<MatchesListProps> = ({ matches, players, onSubmitted }) => {
    const [hasUpdates, setHasUpdates] = useState<boolean>(false)
    const [currentMatches, setCurrentMatches] = useState<Match[]>(matches)
    const [errorMessages, setErrorMessages] = useState<Map<number, string>>()

    const [currentMatchesStatus, setCurrentMatchesStatus] = useState<Map<number, boolean>>(new Map<number, boolean>(matches.map(m => [m.id, false])))

    useEffect(() => {
        setCurrentMatchesStatus(new Map<number, boolean>(matches.map(m => [m.id, false])))
        setCurrentMatches(matches)
    }, [matches])

    const timedErrorMessages = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    useEffect(() => {
        const errorMessageTimer = async () => {
            if (errorMessages && errorMessages?.size > 0)
            {
                await timedErrorMessages(5000)
                setErrorMessages(new Map<number, string>())
            }
        }

        errorMessageTimer();
        
    }, [errorMessages])

    useEffect(() => {
        let currentlyHasUpdates = false;

        for (const matchStatus of currentMatchesStatus.values()) {
            if (matchStatus) {
                currentlyHasUpdates = matchStatus;
            }
        }
        setHasUpdates(currentlyHasUpdates)
    }, [currentMatchesStatus]);

    const onMatchChanged = (match: Match, isDirty: boolean) => {
        const updatedStatus = new Map(currentMatchesStatus);
        updatedStatus.set(match.id, isDirty);
        setCurrentMatchesStatus(updatedStatus);

        setCurrentMatches((prevCurrentMatches) =>
            prevCurrentMatches.map(m => m.id == match.id ? match : m)
        );
    }

    const updateMatches = () => {
        if (hasUpdates) {
            Promise.allSettled(currentMatches.filter(match => currentMatchesStatus.get(match.id)).map((match) => updateScore(match)))
                .then((results) => {
                    let newErrorMessages: Map<number, string> = new Map<number, string>()
                    results.forEach((res: any) => {
                        const value = res.value
                        if (res.value["success"] == false) {
                            const match = currentMatches.find(match => match.id == value["match_id"])
                            if (match) {
                                newErrorMessages.set(match?.id, `Error updating match ${players.find(p => p.id == match?.player_one)?.member.display_name} vs ${players.find(p => p.id == match?.player_two)?.member.display_name}: ${value["message"]}`)
                            }
                        }
                    })
                    setErrorMessages(newErrorMessages)
                    onSubmitted(currentMatches)
                }).catch((error) => {
                    console.log(error)
                });
        }
    }

    return (
        <div className="relative h-full">
            <div className="space-y-6">
                {currentMatches.map((match) => (
                    <div key={match.id}>
                        {(() => {
                            const p_one = players.find(p => p.id == match.player_one);
                            const p_two = players.find(p => p.id == match.player_two);
                            if (p_one && p_two) {
                                return <MatchComponent match={match} player_one={p_one} player_two={p_two} onChanged={onMatchChanged}></MatchComponent>
                            }
                        })()}
                    </div>
                ))}


            </div>
            <div className="absolute bottom-20 right-0">
                <button className={`btn ${hasUpdates ? "btn-info" : ""}`} onClick={updateMatches}>Update Matches</button>
            </div>

            <div className="absolute bottom-12 w-full">
                <div className="space-y-4">
                    {errorMessages && Array.from(errorMessages.entries()).map(([key, value]) => (
                        <li key={key} role="alert" className="flex-grow alert alert-error">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 shrink-0 stroke-current"
                                fill="none"
                                viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{value}</span>
                        </li>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MatchesList;