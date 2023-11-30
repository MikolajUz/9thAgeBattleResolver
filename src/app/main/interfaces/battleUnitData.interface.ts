export interface BattleUnitData {
  playerIndex: number;
  gridUnit: number;
  files: number;
  ranks: number;
  startPoint: {
    x: number;
    y: number;
  };
  RFwidth: number;
  RFheight: number;
  RFnumber: number;
  ID: number;
  RaFRestPlaces: boolean[];
}

export class BattleUnitData {
  constructor(
    public playerIndex: number,
    public gridUnit: number,
    public files: number,
    public ranks: number,
    public startPoint: {
      x: number;
      y: number;
    },
    public RFwidth: number,
    public RFheight: number,
    public RFnumber: number,
    public ID: number,
    public RaFRestPlaces: boolean[]
  ) {}
}
