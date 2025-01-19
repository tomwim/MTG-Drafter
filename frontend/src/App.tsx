import { useState } from 'react';
import './App.css'
import './routes/AppRoutes'
import AppRoutes from './routes/AppRoutes';
import BottomNavbar from './components/BottomNavBar';
import { MatchdayInfoProvider } from './context/MatchdayInfoProvider';
import TopNavbar from './components/TopNavbar';
import SidebarDrawer from './components/SidebarDrawer';

function App() {

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)

  const onNavbarSidebarDrawerToggled = () => {
    setIsDrawerOpen(true)
  }

  const onDrawerToggled = (isOpen: boolean) => {
    setIsDrawerOpen(isOpen)
  }

  return (
    <>
      <MatchdayInfoProvider>
        <div className="h-screen">
          <SidebarDrawer isOpen={isDrawerOpen} onDrawerChanged={onDrawerToggled}>
            <div className='h-full flex flex-col'>
              <div className=''>
                <TopNavbar onSideDrawerToggled={onNavbarSidebarDrawerToggled} />
              </div>

              <div className='flex-grow px-10 py-4'>
                <AppRoutes />
              </div>

              <div>
                <BottomNavbar />
              </div>
            </div>
          </SidebarDrawer>

        </div>
      </MatchdayInfoProvider >
    </>
  )
}

export default App
