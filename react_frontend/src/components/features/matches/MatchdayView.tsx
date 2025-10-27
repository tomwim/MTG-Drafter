import { useMatchday } from '@/hooks/useMatchdays';
import { useMatchesByMatchday } from '@/hooks/useMatches';
import { MatchRow } from './MatchRow';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

interface MatchdayViewProps {
  matchdayId: number;
}

export function MatchdayView({ matchdayId }: MatchdayViewProps) {
  const { data: matchday, isLoading: loadingMatchday, error: matchdayError } = useMatchday(matchdayId);
  const { data: matches, isLoading: loadingMatches, error: matchesError } = useMatchesByMatchday(matchdayId);

  // Loading state
  if (loadingMatchday || loadingMatches) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  // Error state
  if (matchdayError || matchesError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to load tournament data: {matchdayError?.message || matchesError?.message}
        </AlertDescription>
      </Alert>
    );
  }

  if (!matchday || !matches) {
    return (
      <Alert>
        <AlertDescription>No tournament data found.</AlertDescription>
      </Alert>
    );
  }

  // Calculate stats
  const totalMatches = matches.length;
  const completedMatches = matches.filter(m => m.status === 'completed').length;
  const pendingMatches = matches.filter(m => m.status === 'pending').length;

  const getStatusColor = (status: typeof matchday.status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'upcoming': return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Tournament Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-3xl">{matchday.name}</CardTitle>
              <CardDescription className="mt-2 text-lg">
                {matchday.set_name} • {matchday.format} • Best of {matchday.best_of}
              </CardDescription>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(matchday.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <Badge className={getStatusColor(matchday.status)}>
              {matchday.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold">{totalMatches}</div>
              <div className="text-sm text-gray-600">Total Matches</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{completedMatches}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold">{pendingMatches}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Matches List */}
      <Card>
        <CardHeader>
          <CardTitle>Matches</CardTitle>
          <CardDescription>
            Round-robin tournament • All players play each other
          </CardDescription>
        </CardHeader>
        <CardContent>
          {matches.length === 0 ? (
            <Alert>
              <AlertDescription>
                No matches scheduled yet. Generate pairings to start the tournament.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-2">
              {matches.map((match) => (
                <MatchRow
                  key={match.id}
                  match={match}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}