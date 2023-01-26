export enum LoadingStates {
  idle = "idle",
  loading = "loading",
  finished = "finished",
}

export interface Station {
  id: string;
  name: string;
  address: string;
  xCoord?: number;
  yCoord?: number;
  capacity?: number;
  departures?: number;
  returns?: number;
}
