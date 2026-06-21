export async function getBaseTokens() {
  try {
const response = await fetch(
  "https://api.dexscreener.com/latest/dex/search?q=toshi"
);

    const data = await response.json();

console.log(
  data.pairs?.map((p:any) => ({
    chain: p.chainId,
    symbol: p.baseToken?.symbol,
    name: p.baseToken?.name
  }))
);

    return data.pairs?.slice(0, 20) || [];
  } catch (error) {
    console.error("DexScreener Error:", error);
    return [];
  }
}