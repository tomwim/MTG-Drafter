import React from "react";
import { Link } from 'react-router-dom';

type ElementValues = {
  name: string;
  link_path: string;
};

const SidebarElement: React.FC<ElementValues> = ({ name, link_path }) => {
  return (
    <li>
      <Link to={link_path}>
        <svg aria-hidden="true" className="w-6 h-6 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
        <span className="ml-3">{name}</span>
      </Link>
    </li>
  );
}

const Sidebar: React.FC = () => {
  return (
    // <div className="overflow-y-auto bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 py-5 px-3 h-full flex flex-col fixed top-0 left-0">
    <div className="overflow-y-auto h-full">
      <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 lg:menu-vertical">
        <SidebarElement name="Matchdays" link_path="/matchdays"></SidebarElement>
        <SidebarElement name="Members" link_path="/members"></SidebarElement>
        <SidebarElement name="Matchday 1" link_path="/matchdays/1"></SidebarElement>
      </ul>
    </div>
  );
};

export default Sidebar;
