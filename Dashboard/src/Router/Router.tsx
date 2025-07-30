import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import Header from '../components/Header'; // Add this line
import { lazy, Suspense } from 'react';
import Loading from '../components/Loading';

import { useState } from 'react';

const Home = lazy(() => import('../pages/Home'));
const Order = lazy(() => import('../pages/Order'));
const Inventory = lazy(() => import('../pages/Inventory'));
const Analytics = lazy(() => import('../pages/Analytics'));
const Setting = lazy(() => import('../pages/Setting'));

const AppRouter = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  return (
    <Router>
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} />
        <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
          {/* Properly pass props to Header */}
          <Header 
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            isSidebarOpen={isSidebarOpen}
          />
          <main className="mt-16 p-8">
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path='/admin' element={<Home />} />
                <Route path='/admin/orders' element={<Order />} />
                <Route path='/admin/inventory' element={<Inventory />} />
                <Route path='/admin/analytics' element={<Analytics />} />
                <Route path='/admin/setting' element={<Setting />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default AppRouter;