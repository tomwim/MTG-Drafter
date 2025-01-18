import React, { useEffect, useState } from "react";

import { Match } from "../../api/matchApi";
import { Player } from "../../api/playerApi";
import { getMatchTypeById, MatchTypes } from "../../utils/matchUtils";

export interface MatchProps {
    match: Match,
    player_one: Player,
    player_two: Player,
    onChanged: (val: Match, isDirty: boolean) => void;
}

const MatchComponent: React.FC<MatchProps> = ({ match, player_one, player_two, onChanged }) => {
    const [currentMatch, setCurrentMatch] = useState<Match>(match)
    const matchType = getMatchTypeById(match.match_type)
    const [isDirty, setIsDirty] = useState<boolean>(false)

    useEffect(() => {
        setCurrentMatch(match)
    }, [match]);

    const updateScorePlayerOne = (newScore: number) => {
        if (matchType && newScore >= 0 && (newScore + currentMatch.score_player_two) <= matchType.max_games) {
            setCurrentMatch({ ...currentMatch, score_player_one: newScore })
        }
    }

    const updateScorePlayerTwo = (newScore: number) => {
        if (matchType && newScore >= 0 && (newScore + currentMatch.score_player_one) <= matchType.max_games) {
            setCurrentMatch({ ...currentMatch, score_player_two: newScore })
        }
    }

    useEffect(() => {
        let isDirty = currentMatch.score_player_one != match.score_player_one || currentMatch.score_player_two != match.score_player_two

        // console.log(currentMatch)
        // console.log(match)
        // console.log(isDirty)

        setIsDirty(isDirty)
        onChanged(currentMatch, isDirty)
    }, [currentMatch])

    const ScoreComponent: React.FC = () => {
        return (
            <div className="flex items-center justify-between">
                <div className="join">
                    <button className="btn join-item flex-1" onClick={() => updateScorePlayerOne(currentMatch.score_player_one - 1)}>-</button>
                    <span className="join-item text-center items-center justify-center px-8 flex border-t border-b border-base-200">{currentMatch.score_player_one}</span>
                    <button className="btn join-item flex-1" onClick={() => updateScorePlayerOne(currentMatch.score_player_one + 1)}>+</button>
                </div>
                <div className="font-semibold mx-8">vs</div>
                <div className="join">
                    <button className="btn join-item flex-1" onClick={() => updateScorePlayerTwo(currentMatch.score_player_two - 1)}>-</button>
                    <span className="join-item text-center items-center justify-center px-8 flex border-t border-b border-base-200">{currentMatch.score_player_two}</span>
                    <button className="btn join-item flex-1" onClick={() => updateScorePlayerTwo(currentMatch.score_player_two + 1)}>+</button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex-1 text-right px-20">{player_one.member.display_name}</div>
                    <div className="indicator flex-none text-center w-fit">
                        {isDirty && <span className="indicator-item badge badge-info badge-xs">
                            <svg
                                className="w-2 h-2"
                                fill="#0000003"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier"
                                    strokeWidth="0">
                                </g>
                                <g id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                </g>
                                <g id="SVGRepo_iconCarrier">
                                    <path d="M1,12A11,11,0,0,1,17.882,2.7l1.411-1.41A1,1,0,0,1,21,2V6a1,1,0,0,1-1,1H16a1,1,0,0,1-.707-1.707l1.128-1.128A8.994,8.994,0,0,0,3,12a1,1,0,0,1-2,0Zm21-1a1,1,0,0,0-1,1,9.01,9.01,0,0,1-9,9,8.9,8.9,0,0,1-4.42-1.166l1.127-1.127A1,1,0,0,0,8,17H4a1,1,0,0,0-1,1v4a1,1,0,0,0,.617.924A.987.987,0,0,0,4,23a1,1,0,0,0,.707-.293L6.118,21.3A10.891,10.891,0,0,0,12,23,11.013,11.013,0,0,0,23,12,1,1,0,0,0,22,11Z">
                                    </path>
                                </g>
                            </svg>
                        </span>
                        }
                        <ScoreComponent></ScoreComponent>
                    </div>
                    <div className="flex-1 text-left px-20">{player_two.member.display_name}</div>
                </div>
            </div>
        </div>



    );
}

export default MatchComponent;
