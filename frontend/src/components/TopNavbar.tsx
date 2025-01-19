import React, { useEffect, useState } from "react";
import { ReactSVG } from 'react-svg';
import { useMatchdayContext } from '../context/MatchdayContext';
import { Set, fetchSet } from "../api/scryfall/setApi";
import { Link } from "react-router-dom";


const TopNavbar: React.FC = () => {
    const { matchday, setMatchday } = useMatchdayContext();
    const [set, setSet] = useState<Set>()

    useEffect(() => {
        const getSet = async () => {
            if (matchday) {
                try {
                    let fetchedSet = await fetchSet(matchday?.set_id);
                    setSet(fetchedSet);
                } catch (err) {
                    console.log("Fetch sets failed.")
                }
            };
        }

        getSet();
    }, [matchday])

    useEffect(() => {

    }, [set])


    return (
        <div className="navbar bg-base-300">
            <div className="navbar-start">
                <div>
                    <button className="btn btn-circle btn-ghost">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-5 w-5 stroke-current">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>

                <div className="flex-1">
                    <span className="font-bold">MTG-Drafter</span>
                </div>
            </div>

            <div className="navbar-center">
                {set &&
                    <button className="btn btn-circle btn-ghost">
                        <Link to={"/matchday"}>
                            <ReactSVG className="w-7 h-7" src={set.icon_svg_uri.substring(0, set.icon_svg_uri.indexOf("?"))}
                                beforeInjection={(svg) => {
                                    svg.setAttribute("fill", "oklch(var(--bc))");
                                    svg.setAttribute("stroke", "oklch(var(--bc))");
                                    const paths = svg.querySelectorAll('path');
                                    paths.forEach((path) => {
                                        path.setAttribute('fill', 'oklch(var(--bc))');
                                        path.removeAttribute('fill-rule');
                                    });
                                    const groups = svg.querySelectorAll('g');
                                    groups.forEach((group) => {
                                        group.removeAttribute('fill');
                                        group.removeAttribute('fill-rule');
                                    });
                                }} />
                        </Link>
                    </button>
                }
            </div>

            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default TopNavbar;