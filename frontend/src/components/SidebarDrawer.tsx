import React, { useEffect, useState } from "react";
import { useMatchdaysContext, useMatchdayContext } from "../context/MatchdayContext";
import { Set, fetchSet } from "../api/scryfall/setApi";
import { fetchMembers } from "../api/memberApi";
import { Link } from "react-router-dom";
import { Member } from "../api/memberApi";

interface SidebarDrawerProps {
  isOpen: boolean,
  children: React.ReactNode;
  onDrawerChanged: (isOpen: boolean) => void;
}

const SidebarDrawer: React.FC<SidebarDrawerProps> = ({ isOpen, children, onDrawerChanged }) => {
  const [isCurrentlyOpen, setIsCurrentlyOpen] = useState<boolean>(isOpen)
  const [sets, setSets] = useState<Set[]>([])
  const [members, setMembers] = useState<Member[]>([])
  const { matchdays, setMatchdays } = useMatchdaysContext();
  const { matchday, setMatchday } = useMatchdayContext();

  useEffect(() => {
    const getMembers = async () => {
      try {
        const fetchedMembers = await fetchMembers();
        setMembers(fetchedMembers);
      } catch (err) {
        console.log("Fetch Members failed.")
      }
    };

    getMembers();
  }, []);

  useEffect(() => {
    setIsCurrentlyOpen(isOpen)
  }, [isOpen])

  useEffect(() => {
    onDrawerChanged(isCurrentlyOpen)
  }, [isCurrentlyOpen])

  useEffect(() => {
    Promise.allSettled(matchdays.map((matchday) => fetchSet(matchday.set_id)))
      .then((results) => {
        const fetchedSets = results
          .filter(result => result.status === "fulfilled")
          .map(result => result.value);
        setSets(fetchedSets)
      }
      ).catch((error) => {
        console.log(error)
      });
  }, [matchdays])

  const handleDrawerChanged = () => {
    setIsCurrentlyOpen(!isCurrentlyOpen)
  }

  return (
    <div className="drawer h-full">
      <input id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isCurrentlyOpen}
        onChange={handleDrawerChanged} />
      <div className="drawer-content h-full">
        {children}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 ">
          <li className="menu-title">MTG-Drafter</li>
          <div className="menu">
            
            <li>
              <details open>
                <summary className="font-semibold">Matchdays</summary>
                <ul>
                  <li onClick={handleDrawerChanged} ><Link to={"/matchdays/create"}>+  Create matchday</Link></li>
                  {matchdays.sort((md1, md2) => md2.id - md1.id).map((md) => (
                    <li key={md.id} onClick={() => { handleDrawerChanged(); setMatchday(md) }}><Link to={`/matchday/`}>{sets.find(s => s.id == md.set_id)?.name}</Link></li>
                  ))}

                </ul>
              </details>
            </li>
            <li className="font-semibold" onClick={() => handleDrawerChanged()}><Link to={`/matchday/`}>All-Time Standings</Link></li>

            <li>
              <details>
                <summary className="font-semibold">Members</summary>
                <ul>
                  <li onClick={handleDrawerChanged} ><Link to={"/members/create"}>+ Create member</Link></li>
                  {members.map((m) => (
                    <li key={m.id} onClick={() => handleDrawerChanged()}><Link to={`/members/${m.id}`}>{m.display_name}</Link></li>
                  ))}
                </ul>
              </details>
            </li>

          </div>
        </ul>
      </div>
    </div>
  );
};

export default SidebarDrawer;
