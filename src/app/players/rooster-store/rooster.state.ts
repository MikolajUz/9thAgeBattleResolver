import { Player } from '../interfaces/player.interface';

export interface PlayersState {
  players: Player[];
}

export const initialPlayersState: PlayersState = {
  players: [
    {
      rooster: [{ units: [] }],
      score: []
    },
    {
      rooster: [{ units: [] }],
      score: []
    },
  ],
};
