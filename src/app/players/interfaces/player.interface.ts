import { skirmishScore } from "src/app/main/interfaces/skirmishScore.interface";
import { Rooster } from "./rooster.interface";

export interface Player {
    rooster: Rooster[];
    score : skirmishScore[]
  }