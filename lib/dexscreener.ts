export interface Token {
  address: string;
  name: string;
  symbol: string;

  age: string;

  marketCap: number;
  liquidity: number;

  buys24h: number;
  sells24h: number;

  website?: string;
  twitter?: string;
  telegram?: string;

  trustScore: number;
}
