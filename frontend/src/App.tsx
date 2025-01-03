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
        <div className="ml-64 p-8 w-full">
          <AppRoutes />
        </div>
      </div>
    </>
  )
}

export default App
