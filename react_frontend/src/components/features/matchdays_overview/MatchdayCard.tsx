import { useNavigate } from 'react-router-dom';
import { Matchday } from '@/types/matchday';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Trophy } from 'lucide-react';
import { useMatchesByMatchday } from '@/hooks/useMatches';
import { usePlayers } from '@/hooks/usePlayers';

interface MatchdayCardProps {
    matchday: Matchday;
}

export function MatchdayCard({ matchday }: MatchdayCardProps) {
    const navigate = useNavigate();
    const { data: matches } = useMatchesByMatchday(matchday.id);
    const { data: players } = usePlayers();

    const getStatusColor = (status: Matchday['status']) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800';
            case 'active': return 'bg-blue-100 text-blue-800';
            case 'upcoming': return 'bg-gray-100 text-gray-800';
        }
    };

    // Calculate winner (player with most wins)
    // TODO: Move this logic to backend
    const getWinner = () => {
        if (!matches || matches.length === 0 || matchday.status !== 'completed') {
            return null;
        }

        const playerWins = new Map<number, number>();

        matches.forEach(match => {
            if (match.winner_id) {
                playerWins.set(match.winner_id, (playerWins.get(match.winner_id) || 0) + 1);
            }
        });

        if (playerWins.size === 0) return null;

        // Find player with most wins
        let maxWins = 0;
        let winnerId = 0;

        playerWins.forEach((wins, playerId) => {
            if (wins > maxWins) {
                maxWins = wins;
                winnerId = playerId;
            }
        });

        const winnerPlayer = players?.find(p => p.id === winnerId);
        return { playerId: winnerId, playerName: winnerPlayer?.name, wins: maxWins };
    };

    const winner = getWinner();

    return (
        <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(`/matchdays/${matchday.id}`)}
        >
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <CardTitle className="text-2xl">{matchday.name}</CardTitle>
                        <CardDescription className="mt-2">
                            {matchday.set_name} • {matchday.format}
                        </CardDescription>
                    </div>
                    <Badge className={getStatusColor(matchday.status)}>
                        {matchday.status}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span>
                                {new Date(matchday.date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users size={16} />
                            <span>Best of {matchday.best_of}</span>
                        </div>
                    </div>

                    {/* Show winner if tournament is completed */}
                    {winner && (
                        <div className="flex items-center gap-2 p-2 bg-green-50 rounded-md border border-green-200">
                            <Trophy size={16} className="text-green-600" />
                            <span className="text-sm font-semibold text-green-700">
                                Winner: {winner.playerName || `Player ${winner.playerId}`} ({winner.wins} wins)
                            </span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}