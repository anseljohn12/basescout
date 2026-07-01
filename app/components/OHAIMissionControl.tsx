interface OHAIMissionControlProps {
  opportunityCount: number;
}

export default function OHAIMissionControl({
  opportunityCount,
}: OHAIMissionControlProps) {
  return (
    <section className="mb-8 rounded-2xl border border-blue-500/20 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-3xl">🤖</div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            OHAI Mission Control
          </h2>

          <p className="text-sm text-slate-400">
            Opportunity Hunting AI
          </p>
        </div>
      </div>

      <div className="border-t border-slate-700 pt-4">
        <h3 className="text-lg font-semibold text-white mb-2">
          Today's Mission
        </h3>

        <p className="text-slate-300 leading-relaxed">
          Analyze the Base ecosystem and identify high-conviction
          opportunities worth researching.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Mission Status
          </p>

          <p className="text-green-400 font-semibold">
            Active
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Opportunities
          </p>

          <p className="text-white font-semibold">
            {opportunityCount}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Confidence Engine
          </p>

          <p className="text-white font-semibold">
            Operational
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Last Scan
          </p>

          <p className="text-white font-semibold">
            Live
          </p>
        </div>

      </div>

      <button className="mt-6 rounded-xl bg-blue-600 hover:bg-blue-500 transition px-5 py-3 font-medium">
        View Scout Report
      </button>
    </section>
  );
}