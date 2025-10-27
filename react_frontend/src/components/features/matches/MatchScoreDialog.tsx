import { useState, useCallback } from 'react';
import { Match } from '@/types/match';
import { useUpdateMatch } from '@/hooks/useMatches';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface UpdateMatchScoreDialogProps {
    match: Match;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function UpdateMatchScoreDialog( { match, open, onOpenChange } : UpdateMatchScoreDialogProps) {
    const [player1Wins, setPlayer1Wins] = useState(match.player1_wins);
    const [player2Wins, setPlayer2Wins] = useState(match.player2_wins);

    const updateMatch = useUpdateMatch();

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();

        const requiredWins = Math.ceil(match.best_of / 2); // Bo3 = 2 wins, Bo5 = 3 wins
        let winnerId: number | null = null;

        if (player1Wins >= requiredWins) {
            winnerId = match.player1_id;
        } else if (player2Wins >= requiredWins) {
            winnerId = match.player2_id;
        }

        const status = winnerId ? 'completed' : 'in_progress';

        updateMatch.mutate(
            {
                id: match.id,
                dto: {
                    player1_wins: player1Wins,
                    player2_wins: player2Wins,
                    winner_id: winnerId,
                    status,
                },
            },
            {
                onSuccess: () => {
                    onOpenChange(false); 
                },
            }
        );
    }, [match, player1Wins, player2Wins, updateMatch, onOpenChange]);

    const handlePlayer1Change = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (value >= 0 && value <= match.best_of) {
            setPlayer1Wins(value);
        }
    }, [match.best_of]);

    const handlePlayer2Change = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (value >= 0 && value <= match.best_of) {
            setPlayer2Wins(value);
        }
    }, [match.best_of]);

    // Reset form when dialog opens/closes
    const handleOpenChange = useCallback((newOpen: boolean) => {
        if (!newOpen) {
            // Reset to current match values when closing
            setPlayer1Wins(match.player1_wins);
            setPlayer2Wins(match.player2_wins);
        }
        onOpenChange(newOpen);
    }, [match.player1_wins, match.player2_wins, onOpenChange]);

    const requiredWins = Math.ceil(match.best_of / 2);
    const isValid = player1Wins + player2Wins <= match.best_of;

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Match Score</DialogTitle>
                    <DialogDescription>
                        Best of {match.best_of} - First to {requiredWins} wins
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        {/* Player 1 Score */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="player1" className="text-right">
                                Player {match.player1_id}
                            </Label>
                            <Input
                                id="player1"
                                type="number"
                                min={0}
                                max={match.best_of}
                                value={player1Wins}
                                onChange={handlePlayer1Change}
                                className="col-span-3"
                                disabled={updateMatch.isPending}
                            />
                        </div>

                        {/* Player 2 Score */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="player2" className="text-right">
                                Player {match.player2_id}
                            </Label>
                            <Input
                                id="player2"
                                type="number"
                                min={0}
                                max={match.best_of}
                                value={player2Wins}
                                onChange={handlePlayer2Change}
                                className="col-span-3"
                                disabled={updateMatch.isPending}
                            />
                        </div>

                        {/* Validation message */}
                        {!isValid && (
                            <Alert variant="destructive">
                                <AlertDescription>
                                    Total wins cannot exceed {match.best_of}
                                </AlertDescription>
                            </Alert>
                        )}

                        {/* Error message */}
                        {updateMatch.isError && (
                            <Alert variant="destructive">
                                <AlertDescription>
                                    Failed to update match: {updateMatch.error?.message}
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleOpenChange(false)}
                            disabled={updateMatch.isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={updateMatch.isPending || !isValid}
                        >
                            {updateMatch.isPending ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}