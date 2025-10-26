import { Match } from '@/types/match';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface MatchRowProps {
  match: Match;
  onUpdateScore?: (matchId: number) => void;
}

export function MatchRow({ match, onUpdateScore }: MatchRowProps) {
  const getStatusBadge = (status: Match['status']) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case 'pending':
        return <Badge className="bg-gray-100 text-gray-800">Pending</Badge>;
    }
  };

  const isPlayer1Winner = match.winner_id === match.player1_id;
  const isPlayer2Winner = match.winner_id === match.player2_id;

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
      {/* Player 1 */}
      <div className={`flex-1 text-right ${isPlayer1Winner ? 'font-bold' : ''}`}>
        <span className="text-lg">
          {isPlayer1Winner && '👑 '}
          Player {match.player1_id}
        </span>
      </div>

      {/* Score */}
      <div className="flex items-center gap-4 px-8">
        <span className={`text-2xl font-bold ${isPlayer1Winner ? 'text-green-600' : ''}`}>
          {match.player1_wins}
        </span>
        <span className="text-gray-400">-</span>
        <span className={`text-2xl font-bold ${isPlayer2Winner ? 'text-green-600' : ''}`}>
          {match.player2_wins}
        </span>
      </div>

      {/* Player 2 */}
      <div className={`flex-1 text-left ${isPlayer2Winner ? 'font-bold' : ''}`}>
        <span className="text-lg">
          Player {match.player2_id}
          {isPlayer2Winner && ' 👑'}
        </span>
      </div>

      {/* Status & Actions */}
      <div className="flex items-center gap-3 ml-4">
        {getStatusBadge(match.status)}

        {match.status !== 'completed' && onUpdateScore && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdateScore(match.id)}
          >
            Update Score
          </Button>
        )}
      </div>
    </div>
  );
}