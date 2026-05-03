import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';

function MainLayout() {

    const [collapsed, setCollapsed] = useState(false);

    function toggleSidebar() {
        setCollapsed(prev => !prev);
    }

    useEffect(() => {
        const handleScreen = () => {
            if (window.innerWidth <= 1024) {
                setCollapsed(true);
            } else {
                setCollapsed(false);
            }
        }

        handleScreen();
        window.addEventListener('resize', handleScreen);
        return () => window.removeEventListener('resize', handleScreen);
    }, []);

    return (
        <div className='flex-container'>
            <Topbar onToggle={toggleSidebar} />

            <div className="sidebar-parent">
                <Sidebar collapsed={collapsed} />

                <div className="pt-5 w-100 flex-grow-1">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default MainLayout;