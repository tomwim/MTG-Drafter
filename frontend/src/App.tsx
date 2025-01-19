import './App.css'
import BottomNavBar from './components/BottomNavBar';
import TopNavbar from './components/TopNavbar';
import { MatchdayInfoProvider } from './context/MatchdayInfoProvider';
import './routes/AppRoutes'
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <>
      <div className="flex h-screen">
        {/* Main Content Area */}
        <MatchdayInfoProvider>
          <div className="flex-1">
            <TopNavbar />
            <AppRoutes />
            <BottomNavBar />
          </div>
        </MatchdayInfoProvider>
      </div>
    </>
  )
}

export default App
