import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/routes';
import { ScrollToTop } from '@/components/shared/utils/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-8 px-4 max-w-6xl">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900">MTG Drafter</h1>
            <p className="text-gray-600 mt-2">Tournament Management System</p>
          </header>

          <main>
            <AppRoutes />
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;