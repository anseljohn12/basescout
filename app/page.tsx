import { getBaseTokens } from "./lib/dexscreener";
export default async function Home() {
  const tokens = await getBaseTokens();
  console.log(tokens[0]);
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-5xl font-bold">
              BaseScout 🚀
            </h1>
            <div className="mb-6 text-green-400">
              Tokens Found: {tokens.length}
            </div>
            <p className="text-gray-400 mt-2">
              Discover Base tokens before the crowd.
            </p>
          </div>

          <div className="flex gap-2">
            <button className="bg-gray-800 px-3 py-2 rounded-lg">
              ☀️
            </button>

            <button className="bg-gray-800 px-3 py-2 rounded-lg">
              🌙
            </button>

            <button className="bg-gray-800 px-3 py-2 rounded-lg">
              💻
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-8">
          <button className="px-4 py-2 rounded-lg bg-blue-600">
            1H
          </button>

          <button className="px-4 py-2 rounded-lg bg-gray-800">
            6H
          </button>

          <button className="px-4 py-2 rounded-lg bg-gray-800">
            24H
          </button>

          <button className="px-4 py-2 rounded-lg bg-gray-800">
            7D
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">

          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <div className="text-3xl font-bold text-green-400">
              12
            </div>

            <div className="text-gray-400">
              💎 Early Gems
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <div className="text-3xl font-bold text-orange-400">
              8
            </div>

            <div className="text-gray-400">
              🔥 Trending
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <div className="text-3xl font-bold text-red-400">
              31
            </div>

            <div className="text-gray-400">
              ⚠️ Risky
            </div>
          </div>

        </div>

        {/* Table */}
        <div className="rounded-xl border border-gray-800 overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-900">
              <tr>
                <th className="text-left p-4">Token</th>
                <th className="text-left p-4">Trust</th>
                <th className="text-left p-4">Buy Pressure</th>
                <th className="text-left p-4">Liquidity</th>
                <th className="text-left p-4">Age</th>
                <th className="text-left p-4">Status</th>
              </tr>
            </thead>

            <tbody>

{tokens.slice(0,10).map((token:any) => {

  const buys = token.txns?.h24?.buys || 0;
  const sells = token.txns?.h24?.sells || 0;

  const trust =
    buys > sells ? 85 : 65;

  return (

    <tr
      key={token.pairAddress}
      className="border-t border-gray-800"
    >
      <td className="p-4">
        {token.baseToken?.symbol}
      </td>

      <td
        className={`p-4 font-bold ${
          trust > 80
            ? "text-green-400"
            : "text-yellow-400"
        }`}
      >
        {trust}
      </td>

      <td className="p-4">
        {buys}
      </td>

      <td className="p-4">
        $
        {Math.round(
          token.liquidity?.usd || 0
        ).toLocaleString()}
      </td>

      <td className="p-4">
        Live
      </td>

      <td className="p-4">
        {buys > sells
          ? "💎 Early Gem"
          : "🔥 Trending"}
      </td>

    </tr>

  );

})}

</tbody>

          </table>

        </div>

      </div>
    </main>
  );
}