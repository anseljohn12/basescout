export async function getBaseTokens() {
  try {
    const response = await fetch(
      "https://api.dexscreener.com/latest/dex/search?q=base"
    );

    const data = await response.json();

    return data.pairs?.slice(0, 20) || [];
  } catch (error) {
    console.error("DexScreener Error:", error);
    return [];
  }
}