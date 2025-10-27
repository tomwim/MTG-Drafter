import { useParams, useNavigate } from 'react-router-dom';
import { MatchdayView } from './MatchdayView';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function MatchdayDetailPage() {
  const { matchdayId } = useParams<{ matchdayId: string }>();
  const navigate = useNavigate();

  // Validate matchdayId
  const id = Number(matchdayId);
  if (isNaN(id) || id <= 0) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Invalid tournament ID. Please return to the tournament list.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <Button
        variant="ghost"
        onClick={() => navigate('/')}
        className="gap-2"
      >
        <ArrowLeft size={16} />
        Back to Tournaments
      </Button>
      <MatchdayView matchdayId={id} />
    </div>
  );
}