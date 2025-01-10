import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react";
import { Member, fetchMembers } from "../../api/memberApi";
import { Player } from "../../api/playerApi";
import PlayerCreateForm from "./PlayerCreateForm";

interface IdentifiablePlayer {
    id: number;
    player: Partial<Player>;
}

export interface PlayersCreateFormProps {
    onChanged: (val: Partial<Player>[]) => void;
} 

const PlayersCreateForm: React.FC<PlayersCreateFormProps> = ( { onChanged } ) => {
    const [players, setPlayers] = useState<IdentifiablePlayer[]>([])
    const [members, setMembers] = useState<Member[]>([])

    useEffect(() => {
        const getAllMembers = async () => {
            try {
                const fetchedMembers = await fetchMembers();
                setMembers(fetchedMembers);
            } catch (err) {
                console.log("Fetch members failed.")
            }
        };

        getAllMembers();
    }, []);  

    useEffect(() => {
        onChanged(players.map(idPlayer => idPlayer.player))
    }, [players])

    const handleAddPlayer = () => {
        const newId = players.length + 1;
        let newIdPlayer: IdentifiablePlayer = {
            id: newId,
            player: {}
        }

        setPlayers((prev) => [...prev, newIdPlayer]);
    };

    const onPlayerChanged = (id: number, player: Partial<Player>) => {
        const updatedPlayers = [...players];
        const index = updatedPlayers.findIndex(p => p.id === id)
        updatedPlayers[index].player = player;
        setPlayers(updatedPlayers)
    }

    const onPlayerRemoved = (id : number) => {
        setPlayers((prev) => prev.filter((p) => p.id !== id))
    }

    const getPossibleMembers = (self : IdentifiablePlayer): Member[] => {
        return members.filter((m) => !players.some((idPlayer) => idPlayer.player.member === m.id) && self.player.member !== m.id)
    }

    return (
        <div>
            {players.map((idPlayer : IdentifiablePlayer, index : number) => (
                <div key={idPlayer.id} >
                    <PlayerCreateForm
                        value={idPlayer.player}
                        onValueChanged={(p) => onPlayerChanged(idPlayer.id, p)}
                        index={index}
                        id={idPlayer.id}
                        possibleMembers={getPossibleMembers(idPlayer)}
                        onRemoved={() => onPlayerRemoved(idPlayer.id)}
                    />
                </div>
            ))}
            
            <div className="relative w-full mt-2">
                <button className="btn" onClick={handleAddPlayer}> + Add Player</button>
            </div>
        </div>
    );
}

export default PlayersCreateForm;