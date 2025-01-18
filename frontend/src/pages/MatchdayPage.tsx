import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Matchday, fetchMatchday, fetchMatchdayPlayers, fetchMatchdayMatches } from '../api/matchdayApi'
import { Match } from '../api/matchApi';
import { Player } from '../api/playerApi';
import { getColorById } from '../utils/manaUtils';
import { Set, fetchSet } from '../api/scryfall/setApi';
import TableComponent from '../components/matchday/TableComponent';
import { getMatchTypeById, MatchType } from '../utils/matchUtils';
import MatchesList from '../components/matchday/MatchesList';

export enum ActiveTab {
  Table = "ACTIVE",
  Players = "INACTIVE",
  Matches = "PENDING",
}

const MatchdayPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const matchdayId = parseInt(id || '', 10);
  const [matchday, setMatchday] = useState<Matchday>();
  const [players, setPlayers] = useState<Player[]>([])
  const [matches, setMatches] = useState<Match[]>([])
  const [set, setSet] = useState<Set | undefined>()
  const [matchType, setMatchType] = useState<MatchType>()
  const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.Matches)

  useEffect(() => {
    const getMatchdays = async () => {
      try {
        const fetchedMatchdays = await fetchMatchday(matchdayId);
        setMatchday(fetchedMatchdays);
      } catch (err) {
        console.log("Fetch matchdays failed.")
      }
    };

    getMatchdays();
  }, []);

  useEffect(() => {
    if (matchday) {
      setMatchType(getMatchTypeById(matchday.match_type))
      requestPlayers(matchday.id)
      requestMatches(matchday.id)
      requestSet(matchday.set_id)
    }
    else {
      setPlayers([])
    }

  }, [matchday]);

  const requestPlayers = async (id: number) => {
    try {
      const fetchedPlayers = await fetchMatchdayPlayers(id);
      setPlayers(fetchedPlayers);
    } catch (err) {
      console.log("Fetch matchday players failed.")
    }
  };

  const requestMatches = async (id: number) => {
    try {
      const fetchedMatches = await fetchMatchdayMatches(id);
      setMatches(fetchedMatches);
      console.log("Fetched")
      console.log(fetchedMatches)
    } catch (err) {
      console.log("Fetch matchday matches failed.")
    }
  };

  const requestSet = async (set_id: string) => {
    try {
      const fetchedSet = await fetchSet(set_id);
      setSet(fetchedSet);
    } catch (err) {
      console.log("Fetch matchday matches failed.")
    }
  };

  const onMatchesSubmitted = (matches: Match[]) => {
    if (matchday) {
      requestMatches(matchday?.id)
    }
  }

  return (
    <div className="matchday-page h-full">
      <h1>{set?.name} ({matchday && new Date(matchday.date).toLocaleDateString('de-DE', { dateStyle: "long" })})</h1>

      {activeTab == ActiveTab.Table &&
        <div className="p-10">
          <TableComponent matches={matches} players={players}></TableComponent>
        </div>
      }

      {activeTab == ActiveTab.Players &&
        <div className="p-10">
          {players.map((player) => (
            <div key={player.id}>
              <div>{player.member.display_name} ({getColorById(player.must_play)?.name} - {getColorById(player.cannot_play)?.name})</div>
            </div>
          ))}
        </div>
      }

      {activeTab == ActiveTab.Matches && matches &&
        <div className="p-10 h-full">
          { matches.length > 0 && <MatchesList matches={matches} players={players} onSubmitted={onMatchesSubmitted}></MatchesList> }
        </div>
      }

      <div className="btm-nav bg-base-300">
        <button className={`${activeTab == ActiveTab.Table ? "active" : ""}`} onClick={() => setActiveTab(ActiveTab.Table)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>
        <button className={`${activeTab == ActiveTab.Matches ? "active" : ""}`} onClick={() => setActiveTab(ActiveTab.Matches)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        <button className={`${activeTab == ActiveTab.Players ? "active" : ""}`} onClick={() => setActiveTab(ActiveTab.Players)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MatchdayPage;