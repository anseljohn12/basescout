import { getBasePools } from "./lib/geckoterminal";
import ThemeToggle from "./theme-toggle";
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

const basePulse = [
  "BRETT",
  "VIRTUAL",
  "AERO",
  "DEGEN",
  "TOSHI",
  "KEYCAT",
  "MOG",
  "BASENJI",
];

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
.filter((item) => item.score > 50)
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

<div className="flex justify-between items-center mb-6">

  <nav className="flex gap-8 text-gray-300 font-medium">

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

  <ThemeToggle />

</div>

<div className="mb-8">

  <div className="text-orange-400 font-bold mb-2">
    🔥 BASE PULSE LIVE
  </div>

  <div className="overflow-hidden border border-blue-500/20 rounded-lg bg-blue-950/20 backdrop-blur-md">
    <div className="flex gap-8 p-3 whitespace-nowrap animate-pulse">
      {basePulse.map((coin) => (
        <span
          key={coin}
          className="text-blue-300 font-medium"
        >
          {coin}
        </span>
      ))}
    </div>
  </div>

</div>

<div className="text-blue-300 mb-8">
  🔥 Tracking {pools.length} Base Opportunities
</div>

      <div className="grid grid-cols-4 gap-4 mb-8">

<div className="bg-blue-950/20 backdrop-blur-md border border-blue-500/20 rounded-2xl p-4 h-16 flex items-center">
  <div className="text-2xl font-bold">
    🚀 {hotPools} Hot Pools
  </div>
</div>

<div className="bg-blue-950/20 backdrop-blur-md border border-blue-500/20 rounded-2xl p-4 h-16 flex items-center">
  <div className="text-2xl font-bold">
    💎 {gemPools} Gem Pools
  </div>
</div>

<div className="bg-blue-950/20 backdrop-blur-md border border-blue-500/20 rounded-2xl p-4 h-16 flex items-center">
  <div className="text-2xl font-bold">
    💰 ${Math.round(totalLP / 1000000)}M Total LP
  </div>
</div>

<div className="bg-blue-950/20 backdrop-blur-md border border-blue-500/20 rounded-2xl p-4 h-16 flex items-center">
  <div className="text-2xl font-bold">
    📈 ${Math.round(totalVolume / 1000000)}M 24H Vol
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

<section
  id="about"
  className="mt-20"
>
  <h2 className="text-3xl font-bold mb-6">
    ℹ️ About BaseScout
  </h2>

  <div className="bg-blue-950/20 backdrop-blur-md border border-blue-500/20 rounded-2xl p-6 mb-6">

    <p className="mb-4">
      BaseScout is a discovery platform built for the Base ecosystem.
      Our mission is simple:
      help users discover trending pools, emerging opportunities,
      and hidden gems before they become widely recognized.
    </p>

    <p className="mb-4">
      BaseScout analyzes publicly available liquidity, volume,
      transaction activity, and pool age data sourced from
      GeckoTerminal. These signals are combined into the
      BaseScout Score to surface notable opportunities across Base.
    </p>

    <p>
      Our philosophy is simple:
      <strong> Discover Before The Crowd.</strong>
    </p>

  </div>

  <section id="roadmap" className="mt-12 mb-10">
  <h2 className="text-3xl font-bold mb-6">
    🚀 What's Coming Next
  </h2>

  <p className="text-gray-400 mb-6">
    BaseScout is being built in public. Here's what we're working on next.
  </p>

  <div className="grid md:grid-cols-2 gap-6">

    <div className="bg-blue-950/20 backdrop-blur-md border border-blue-500/20 rounded-2xl p-5">
      <h3 className="text-xl font-semibold">⭐ BaseScout Score</h3>
      <p className="text-gray-400 mt-2">
        Smarter opportunity rankings using multiple market signals.
      </p>
      <span className="inline-block mt-4 text-yellow-400 font-medium">
        🟡 In Progress
      </span>
    </div>

    <div className="bg-blue-950/20 backdrop-blur-md border border-blue-500/20 rounded-2xl p-5">
      <h3 className="text-xl font-semibold">🆕 New Pools</h3>
      <p className="text-gray-400 mt-2">
        Discover newly launched pools before they become popular.
      </p>
      <span className="inline-block mt-4 text-blue-300 font-medium">
        🔜 Planned
      </span>
    </div>

    <div className="bg-blue-950/20 backdrop-blur-md border border-blue-500/20 rounded-2xl p-5">
      <h3 className="text-xl font-semibold">📈 Live Base Pulse</h3>
      <p className="text-gray-400 mt-2">
        Real-time updates from across the Base ecosystem.
      </p>
      <span className="inline-block mt-4 text-blue-300 font-medium">
        🔜 Planned
      </span>
    </div>

    <div className="bg-blue-950/20 backdrop-blur-md border border-blue-500/20 rounded-2xl p-5">
      <h3 className="text-xl font-semibold">📱 Mobile Experience</h3>
      <p className="text-gray-400 mt-2">
        A faster and smoother experience across all devices.
      </p>
      <span className="inline-block mt-4 text-yellow-400 font-medium">
        🟡 In Progress
      </span>
    </div>

  </div>
</section>

  <div className="bg-yellow-950/20 border border-yellow-500/30 rounded-2xl p-6">

    <h3 className="text-xl font-bold text-yellow-400 mb-3">
      ⚠️ Not Financial Advice (NFA)
    </h3>

    <p className="text-gray-300">
      The information provided by BaseScout is for educational and
      informational purposes only. BaseScout does not provide
      financial, investment, legal, or tax advice.
    </p>

    <p className="text-gray-300 mt-3">
      Cryptocurrency investments involve significant risk and may
      result in the loss of capital. Always conduct your own
      research (DYOR) before making any investment decisions.
    </p>

  </div>
</section>

<footer className="mt-16 py-8 border-t border-blue-500/20 text-center">

  <h3 className="text-lg font-semibold text-white">
    BaseScout
  </h3>

  <p className="text-gray-400 mt-2">
    Discover Before The Crowd.
  </p>

  <p className="text-gray-600 text-sm mt-4">
    Built with 💙 for the Base ecosystem.
  </p>

  <p className="text-gray-500 text-sm mt-2">
    Crafted by{" "}
    <a
      href="https://x.com/anseljohn121985"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-400 hover:text-blue-300 transition"
    >
      @anseljohn121985
    </a>
  </p>

  <p className="text-gray-500 text-sm mt-4">
    Powered by GeckoTerminal • Version 1.0.0
  </p>

</footer>

    </main>
  );
}