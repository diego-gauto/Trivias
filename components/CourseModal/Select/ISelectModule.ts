export interface ISelect {
  course: {
    seasons: [ISeason];
  };
  handleClick: any;
  seasons: [ISeasons];
}
export interface ISeasons {
  name: string;
  season: number;
}
export interface ISeason {
  name: string;
  seasons: number;
}
