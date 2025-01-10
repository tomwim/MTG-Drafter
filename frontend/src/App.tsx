import { Link } from 'react-router-dom';
import './App.css'
import './routes/AppRoutes'
import AppRoutes from './routes/AppRoutes';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        {/* Main Content Area */}
        <div className="p-6 flex-1">
          <AppRoutes />
        </div>
      </div>
    </>
  )
}

export default App
