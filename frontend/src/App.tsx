import './App.css'
import BottomNavBar from './components/BottomNavBar';
import { MatchdayInfoProvider } from './context/MatchdayInfoProvider';
import './routes/AppRoutes'
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <>
      <div className="flex h-screen">

        {/* Main Content Area */}
        <MatchdayInfoProvider>
          <div className="p-6 flex-1">
            <AppRoutes />
            <BottomNavBar />
          </div>
        </MatchdayInfoProvider>
      </div>
    </>
  )
}

export default App
