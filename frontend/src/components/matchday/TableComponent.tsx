import React, { useEffect, useState } from "react";
import { Match } from "../../api/matchApi";
import { Player } from "../../api/playerApi";
import { getMatchTypeById } from "../../utils/matchUtils";

export interface TableProps {
    matches: Match[],
    players: Player[]
}

interface PlayerStats {
    id: number,
    wins: number,
    losses: number,
    draws: number,
    game_wins: number,
    game_losses: number,
    points: number
}

const TableComponent: React.FC<TableProps> = ({ players, matches }) => {
    const [playerStats, setPlayerStats] = useState<PlayerStats[]>([]);

    useEffect(() => {
        let stats: PlayerStats[] = []

        players.forEach(player => {
            stats.push(calcStatsForPlayer(player.id))
        });

        setPlayerStats(stats)
    }, [matches, players])


    const calcStatsForPlayer = (id: number) : PlayerStats => {
        let stats: PlayerStats = {
            id: id,
            wins: 0,
            losses: 0,
            draws: 0,
            game_wins: 0,
            game_losses: 0,
            points: 0
        }

        matches.filter(match => (match.player_one == id || match.player_two == id) && getMatchTypeById(match.match_type)?.max_games == (match.score_player_one + match.score_player_two)).forEach(match => {
            let selfScore = match.player_one == id ? match.score_player_one : match.score_player_two
            let opponentScore = match.player_one != id ? match.score_player_one : match.score_player_two

            let result: number = selfScore > opponentScore ? 1 : selfScore < opponentScore ? -1 : 0 // result -> 1 for win, -1 for loss 0 for draw

            stats.wins = result == 1 ? stats.wins + 1 : stats.wins
            stats.losses = result == -1 ? stats.losses + 1 : stats.losses
            stats.draws = result == 0 ? stats.draws + 1 : stats.draws

            stats.game_wins = stats.game_wins + selfScore
            stats.game_losses = stats.game_losses + opponentScore

            stats.points = result == 1 ? stats.points + 3 : result == 0 ? stats.points + 1 : stats.points
        });

        return stats;
    }

    interface StatsRowProps {
        player: Player,
        stats: PlayerStats

    }
    const StatsRow : React.FC<StatsRowProps> = ({ player, stats }) => {

        return (
            <tr key={player.id}>
                <th>{player.member.display_name}</th>
                <th className="text-center">{stats.wins}</th>
                <th className="text-center">{stats.draws}</th>
                <th className="text-center">{stats.losses}</th>
                <th className="text-center">{stats.game_wins} - {stats.game_losses}</th>
                <th className="text-center">{stats.points}</th>
            </tr>
        );
    };

    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th className="text-center">Won</th>
                        <th className="text-center">Drawn</th>
                        <th className="text-center">Lost</th>
                        <th className="text-center">Score</th>
                        <th className="text-center">Points</th>
                    </tr>
                </thead>
                <tbody>
                    {playerStats && playerStats.sort((s1, s2) => s2.points - s1.points).map((stats) => (
                        <StatsRow key={stats.id} player={players.find(p => p.id == stats.id) || players[0]} stats={stats}/>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableComponent;