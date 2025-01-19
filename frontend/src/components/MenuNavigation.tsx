import React, { useState } from "react";
import TopNavbar from "./TopNavbar";
import SidebarDrawer from "./SidebarDrawer";

const MenuNavigation: React.FC = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)

    const onNavbarSidebarDrawerToggled = () => {
        setIsDrawerOpen(true)
    }

    return (
        <div>
            <TopNavbar onSideDrawerToggled={onNavbarSidebarDrawerToggled} />
            <SidebarDrawer isOpen={isDrawerOpen} />
        </div>
    );
}

export default MenuNavigation;