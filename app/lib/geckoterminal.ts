export async function getBasePools() {
  try {
    const response = await fetch(
      "https://api.geckoterminal.com/api/v2/networks/base/trending_pools",
      {
        next: { revalidate: 60 },
      }
    );

    const data = await response.json();

    return data.data || [];
  } catch (error) {
    console.error("GeckoTerminal Error:", error);
    return [];
  }
}