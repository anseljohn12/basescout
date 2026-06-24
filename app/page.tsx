import { getBasePools } from "./lib/geckoterminal";
import Image from "next/image";

export default async function Home() {
  const pools = await getBasePools();

  const hotPools = pools.filter((pool: any) => {
  const buys =
    pool.attributes.transactions?.h24?.buys || 0;

  const sells =
    pool.attributes.transactions?.h24?.sells || 0;

  return buys - sells > 100;
}).length;

const gemPools = pools.filter((pool: any) => {
  const volume =
    Number(
      pool.attributes.volume_usd?.h24 || 0
    );

  return volume > 100000;
}).length;

const totalLP = pools.reduce(
  (sum: number, pool: any) =>
    sum +
    Number(
      pool.attributes.reserve_in_usd || 0
    ),
  0
);

const totalVolume = pools.reduce(
  (sum: number, pool: any) =>
    sum +
    Number(
      pool.attributes.volume_usd?.h24 || 0
    ),
  0
)
const trendingPools = [...pools]
  .filter((pool: any) => {
    const attrs = pool.attributes;

    const ageDays =
      Math.floor(
        (Date.now() -
          new Date(
            attrs.pool_created_at
          ).getTime()) /
        (1000 * 60 * 60 * 24)
      );

    return ageDays < 90;
  })
  .map((pool: any) => {
    const attrs = pool.attributes;

    const buys =
      attrs.transactions?.h24?.buys || 0;

    const sells =
      attrs.transactions?.h24?.sells || 0;

    const volume =
      Number(
        attrs.volume_usd?.h24 || 0
      );

    const marketCap =
      Number(
        attrs.market_cap_usd || 0
      );

    const ageDays =
      Math.floor(
        (Date.now() -
          new Date(
            attrs.pool_created_at
          ).getTime()) /
        (1000 * 60 * 60 * 24)
      );

    let score = 0;

    score += buys - sells;
    score += volume / 500000;

    if (ageDays < 7) score += 100;
    else if (ageDays < 30) score += 50;
    else if (ageDays < 90) score += 20;

    if (marketCap < 1000000) score += 100;
    else if (marketCap < 5000000) score += 50;
    else if (marketCap < 20000000) score += 20;

    return {
      pool,
      score,
    };
  })
  .sort((a, b) => b.score - a.score)
  .slice(0, 10);

  return (
    <main
  className="min-h-screen text-white p-8 bg-cover bg-center"
  style={{
    background:
      "radial-gradient(circle at center, #0a3cff 0%, #030712 35%, #000000 100%)",
  }}
>
<div className="flex items-center gap-4">
  <Image
    src="/logo.png"
    alt="BaseScout Logo"
    width={64}
    height={64}
  />

  <div>
    <h1 className="text-5xl font-bold">
      BaseScout
    </h1>

    <p className="text-gray-400">
      Discover Before The Crowd
    </p>
  </div>
</div>

<nav className="flex gap-8 mb-6 text-gray-300 font-medium">
  <a
    href="#explore"
    className="hover:text-blue-400 transition"
  >
    Explore
  </a>

<a
  href="#trending"
  className="hover:text-blue-400 transition"
>
  Trending
</a>

  <a
    href="#new-pools"
    className="hover:text-blue-400 transition"
  >
    New Pools
  </a>

  <a
    href="#watchlist"
    className="hover:text-blue-400 transition"
  >
    Watchlist
  </a>

  <a
    href="#about"
    className="hover:text-blue-400 transition"
  >
    About
  </a>
</nav>

<div className="text-blue-300 mb-8">
  🔥 Tracking {pools.length} Base Opportunities
</div>

      <div className="grid grid-cols-4 gap-4 mb-8">

  <div className="bg-blue-950/20 backdrop-blur-md border border-blue-500/20 rounded-2xl p-5">
    <div className="text-3xl mb-2">🚀</div>
    <div className="text-2xl font-bold">
      {hotPools}
    </div>
    <div className="text-gray-400">
      Hot Pools
    </div>
  </div>

  <div className="bg-blue-950/20 backdrop-blur-md border border-blue-500/20 rounded-2xl p-5">
    <div className="text-3xl mb-2">💎</div>
    <div className="text-2xl font-bold">
      {gemPools}
    </div>
    <div className="text-gray-400">
      Gem Pools
    </div>
  </div>

  <div className="bg-blue-950/20 backdrop-blur-md border border-blue-500/20 rounded-2xl p-5">
    <div className="text-3xl mb-2">💰</div>
<div className="text-2xl font-bold">
  ${Math.round(totalLP / 1000000)}M
</div>
    <div className="text-gray-400">
      Total LP
    </div>
  </div>

  <div className="bg-blue-950/20 backdrop-blur-md border border-blue-500/20 rounded-2xl p-5">
    <div className="text-3xl mb-2">📈</div>
<div className="text-2xl font-bold">
  ${Math.round(totalVolume / 1000000)}M
</div>
    <div className="text-gray-400">
      Volume 24H
    </div>
  </div>

</div>

<section
  id="trending"
  className="mb-10"
>
  <h2 className="text-3xl font-bold mb-4">
    🔥 Trending on Base
  </h2>

  <div className="flex gap-4 overflow-x-auto pb-4">
    {trendingPools.map(
      ({ pool, score }: any, index) => (
<div
  key={pool.id}
  className="
    min-w-[280px]
    flex-shrink-0
    bg-blue-950/20
    backdrop-blur-md
    border border-blue-500/20
    rounded-xl
    p-4
  "
>
          <div className="flex justify-between items-center mb-2">
            <span className="text-orange-400 font-bold">
              #{index + 1}
            </span>

            <span className="text-xs text-blue-300">
              BaseScout Score
            </span>
          </div>

          <div className="font-semibold text-lg">
            {pool.attributes.name}
          </div>

          <div className="text-gray-400 mt-2">
            Score: {Math.round(score)}
          </div>
        </div>
      )
    )}
  </div>
</section>

<h2
  id="explore"
  className="text-3xl font-bold mb-6"
>
  🔎 Explore Base Pools
</h2>

      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="text-left p-4">Pool</th>
            <th className="text-left p-4">Link</th>
            <th className="text-left p-4">Market Cap</th>
            <th className="text-left p-4">FDV</th>
            <th className="text-left p-4">LP</th>
            <th className="text-left p-4">Volume 24H</th>
            <th className="text-left p-4">Score</th>
            <th className="text-left p-4">Signal</th>
            <th className="text-left p-4">Age</th>
            <th className="text-left p-4">Buys</th>
            <th className="text-left p-4">Sells</th>
          </tr>
        </thead>

<tbody>
  {pools

    .filter((pool: any) => {

      const attrs = pool.attributes;

      const ageDays =
        Math.floor(
          (Date.now() -
            new Date(
              attrs.pool_created_at
            ).getTime()) /
          (1000 * 60 * 60 * 24)
        );

      return ageDays < 90;

    })

.sort((a:any, b:any) => {

  const attrsA = a.attributes;
  const attrsB = b.attributes;

  const buysA =
    attrsA.transactions?.h24?.buys || 0;

  const sellsA =
    attrsA.transactions?.h24?.sells || 0;

  const volumeA =
    Number(attrsA.volume_usd?.h24 || 0);

  const buysB =
    attrsB.transactions?.h24?.buys || 0;

  const sellsB =
    attrsB.transactions?.h24?.sells || 0;

  const volumeB =
    Number(attrsB.volume_usd?.h24 || 0);

  const scoreA =
    (buysA - sellsA) +
    volumeA / 500000;

  const scoreB =
    (buysB - sellsB) +
    volumeB / 500000;

  return scoreB - scoreA;

})
    .map((pool: any) => {

      const attrs = pool.attributes;

      const buys =
        attrs.transactions?.h24?.buys || 0;

      const sells =
        attrs.transactions?.h24?.sells || 0;

      const volume =
        Number(
          attrs.volume_usd?.h24 || 0
        );

      const marketCap =
        Number(
          attrs.market_cap_usd || 0
        );

      const ageDays =
        Math.floor(
          (Date.now() -
            new Date(
              attrs.pool_created_at
            ).getTime()) /
          (1000 * 60 * 60 * 24)
        );

      let score = 0;

      // Buy pressure
      score += buys - sells;

      // Volume
      score += volume / 500000;

      // Young pool bonus
      if (ageDays < 7) {
        score += 100;
      } else if (ageDays < 30) {
        score += 50;
      } else if (ageDays < 90) {
        score += 20;
      }

      // Small market cap bonus
      if (marketCap < 1000000) {
        score += 100;
      } else if (marketCap < 5000000) {
        score += 50;
      } else if (marketCap < 20000000) {
        score += 20;
      }

      return (
        <tr
          key={pool.id}
          className="border-b border-gray-800"
        >
          <td className="p-4">
            {attrs.name}
          </td>

          <td className="p-4">
  <a
    href={`https://www.geckoterminal.com/base/pools/${attrs.address}`}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-400"
  >
    View
  </a>
</td>

          <td className="p-4">
            $
            {Math.round(
              marketCap
            ).toLocaleString()}
          </td>

          <td className="p-4">
            $
            {Math.round(
              Number(attrs.fdv_usd || 0)
            ).toLocaleString()}
          </td>

          <td className="p-4">
  $
  {Math.round(
    Number(
      attrs.reserve_in_usd || 0
    )
  ).toLocaleString()}
</td>

          <td className="p-4">
            $
            {Math.round(
              volume
            ).toLocaleString()}
          </td>

          <td className="p-4 font-bold">
            {score > 200
              ? "🚀 Hot"
              : score > 100
              ? "💎 Gem"
              : "⚠️ Watch"}
          </td>


<td className="p-4">
  {buys > sells * 2
    ? "🟢 Strong Buy"
    : buys > sells
    ? "🟡 Accumulating"
    : "🔴 Weak"}
</td>


          <td className="p-4">
            {ageDays}d
          </td>

          <td className="p-4 text-green-400">
            {buys}
          </td>

          <td className="p-4 text-red-400">
            {sells}
          </td>
        </tr>
      );
    })}
</tbody>
      </table>


    </main>
  );
}