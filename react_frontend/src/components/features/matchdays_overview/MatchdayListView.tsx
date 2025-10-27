import { useMatchdays } from '@/hooks/useMatchdays';
import { MatchdayCard } from '@/components/features/matchdays_overview/MatchdayCard';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

export function MatchdayListView() {
    const { data: matchdays, isLoading, error } = useMatchdays();

    // Loading state
    if (isLoading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <Alert variant="destructive">
                <AlertDescription>
                    Failed to load tournaments: {error.message}
                </AlertDescription>
            </Alert>
        );
    }

    // No matchdays
    if (!matchdays || matchdays.length === 0) {
        return (
            <Alert>
                <AlertDescription>
                    No tournaments found. Create your first tournament to get started.
                </AlertDescription>
            </Alert>
        );
    }

    const sortedMatchdays = [...matchdays].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="space-y-8">
            {sortedMatchdays.length > 0 && (
                <section>
                    {sortedMatchdays.map((matchday) => (
                        <MatchdayCard
                            key={matchday.id}
                            matchday={matchday}
                        />
                    ))}
                </section>
            )}
        </div>
    )
}