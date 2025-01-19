import React, { useState, useEffect } from 'react';
import { fetchMatchdayPlayers, fetchMatchdayMatches } from '../api/matchdayApi'
import { Match } from '../api/matchApi';
import { Player } from '../api/playerApi';
import { getColorById } from '../utils/manaUtils';
import { Set, fetchSet } from '../api/scryfall/setApi';
import TableComponent from '../components/matchday/TableComponent';
import MatchesList from '../components/matchday/MatchesList';
import { useMatchdayViewContext, MatchdayView } from '../context/MatchdayViewContext';
import { useMatchdayContext } from '../context/MatchdayContext';

const MatchdayPage: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([])
  const [matches, setMatches] = useState<Match[]>([])
  const [set, setSet] = useState<Set | undefined>()

  const { activeView, setActiveView } = useMatchdayViewContext();
  const { matchday, setMatchday } = useMatchdayContext();

  useEffect(() => {
    updateMatchdayValues();
  }, []);

  useEffect(() => {
    updateMatchdayValues()
  }, [matchday]);

  const updateMatchdayValues = () => {
    if (matchday) {
      requestPlayers(matchday.id)
      requestMatches(matchday.id)
      requestSet(matchday.set_id)
    }
    else {
      setPlayers([])
    }
  }

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

      {activeView == MatchdayView.Table &&
        <div className="p-10">
          <TableComponent matches={matches} players={players}></TableComponent>
        </div>
      }

      {activeView == MatchdayView.Players &&
        <div className="p-10">
          {players.map((player) => (
            <div key={player.id}>
              <div>{player.member.display_name} ({getColorById(player.must_play)?.name} - {getColorById(player.cannot_play)?.name})</div>
            </div>
          ))}
        </div>
      }

      {activeView == MatchdayView.Matches && matches &&
        <div className="p-10 h-full">
          {matches.length > 0 && <MatchesList matches={matches} players={players} onSubmitted={onMatchesSubmitted}></MatchesList>}
        </div>
      }
    </div>
  );
};

export default MatchdayPage;