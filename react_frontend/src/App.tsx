import { MatchdayView } from './components/features/matches/MatchdayView';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4 max-w-6xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">MTG Drafter</h1>
          <p className="text-gray-600 mt-2">Tournament Management System</p>
        </header>

        <main>
          {/* Show tournament for matchday #1 (change this later with routing) */}
          <MatchdayView matchdayId={29} />
        </main>
      </div>
    </div>
  );
}

export default App;