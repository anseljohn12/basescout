export interface ScoutReport {
  score: number;
  verdict: "Watch" | "Gem" | "Hot";
}

export function runScoutMission(pool: any): ScoutReport {
  const attrs = pool.attributes;

  const buys = attrs.transactions?.h24?.buys || 0;
  const sells = attrs.transactions?.h24?.sells || 0;

  const volume = Number(attrs.volume_usd?.h24 || 0);

  const marketCap = Number(attrs.market_cap_usd || 0);

  const ageDays = Math.floor(
    (Date.now() - new Date(attrs.pool_created_at).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  let score = 0;

  // Buy Pressure
  score += buys - sells;

  // Trading Volume
  score += volume / 500000;

  // Young Pool Bonus
  if (ageDays < 7) score += 100;
  else if (ageDays < 30) score += 50;
  else if (ageDays < 90) score += 20;

  // Market Cap Bonus
  if (marketCap < 1_000_000) score += 100;
  else if (marketCap < 5_000_000) score += 50;
  else if (marketCap < 20_000_000) score += 20;

  let verdict: ScoutReport["verdict"] = "Watch";

  if (score > 200) verdict = "Hot";
  else if (score > 100) verdict = "Gem";

  return {
    score,
    verdict,
  };
}