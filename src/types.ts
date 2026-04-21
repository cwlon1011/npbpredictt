export interface Team {
  id: string;
  name: string;
  league: 'Central' | 'Pacific';
  city: string;
  stadium: string;
  stats: {
    wins: number;
    losses: number;
    draws: number;
    winRate: number;
    avgRuns: number;
    era: number;
    homeRecord: { wins: number, losses: number };
    awayRecord: { wins: number, losses: number };
    stadiumPerformance: Record<string, number>; // Win rate at different stadiums
  };
}

export interface Pitcher {
  id: string;
  name: string;
  teamId: string;
  hand: 'Right' | 'Left';
  era: number;
  wins: number;
  losses: number;
  strikeouts: number;
  whip: number;
}

export interface Batter {
  id: string;
  name: string;
  teamId: string;
  avg: number;
  hr: number;
  rbi: number;
  ops: number;
}

export interface Matchup {
  homeTeam: Team;
  awayTeam: Team;
  homePitcher: Pitcher;
  awayPitcher: Pitcher;
  stadium: string;
  date: string;
}

export interface PredictionResult {
  winner: string;
  probability: number;
  overUnder: 'Over' | 'Under';
  overUnderProbability: number;
  projectedTotal: number;
  reasoning: string;
}

export interface DailyMatchup {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  homePitcherId: string;
  awayPitcherId: string;
  time: string;
  stadium: string;
}
