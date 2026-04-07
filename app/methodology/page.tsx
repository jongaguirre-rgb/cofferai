export default function Methodology() {
  return (
    <div className="pt-20 pb-20">
      <div className="container max-w-article">
        <h1 className="font-garamond text-5xl font-bold mb-12">Methodology</h1>

        <div className="mdx-prose">
          <section className="mb-12">
            <h2 className="font-garamond text-3xl font-bold mb-6">Sourcing Standards</h2>
            <p>
              Every claim in our research traces to a primary source: SEC filings (10-K, 10-Q, 8-K),
              earnings call transcripts, company investor relations materials, or publicly available market data.
            </p>
            <p>
              We do not rely on secondary interpretations of financial information. Assertions are only
              made when directly supported by original documentation.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-garamond text-3xl font-bold mb-6">Financial Model Construction</h2>
            <p>
              Financial models are built from the ground up, starting with historical financials
              extracted from SEC filings. We rebuild all key line items to understand:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Revenue composition and growth drivers</li>
              <li>Operating margin trends and cost structure</li>
              <li>Capital allocation and cash flow generation</li>
              <li>Balance sheet strength and leverage metrics</li>
            </ul>
            <p>
              Historical figures are adjusted for:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Stock-based compensation</li>
              <li>One-time or non-recurring charges</li>
              <li>Lease accounting (ASC 842)</li>
              <li>Other non-cash items that obscure operating performance</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-garamond text-3xl font-bold mb-6">Valuation Framework</h2>
            <p>
              Multiple valuation methodologies are employed depending on the company and context:
            </p>

            <h3 className="font-garamond text-xl font-bold mt-6 mb-3">Discounted Cash Flow (DCF)</h3>
            <p>
              DCF models project free cash flow over a 5–10 year explicit forecast period, then assume
              a terminal value. WACC is constructed from bottom-up estimates of cost of equity and cost
              of debt. Terminal growth rates reflect long-term GDP growth expectations.
            </p>

            <h3 className="font-garamond text-xl font-bold mt-6 mb-3">Multiples Valuation</h3>
            <p>
              Peer multiples (EV/EBITDA, P/E, EV/Sales) are used to benchmark valuation. Peers are selected
              on basis of business model similarity and market position. Multiples are normalized for cyclicality
              and one-time items.
            </p>

            <h3 className="font-garamond text-xl font-bold mt-6 mb-3">Dividend Discount Model (BDCs)</h3>
            <p>
              For business development companies and yield-focused equities, a dividend discount model (DDM)
              is often more appropriate than DCF, given the defined payout policies and income focus.
            </p>

            <h3 className="font-garamond text-xl font-bold mt-6 mb-3">Sum-of-the-Parts (SOTP)</h3>
            <p>
              For diversified or conglomerate corporate structures, valuation by business segment allows for
              more granular analysis of constituent cash flows and appropriate discount rates.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-garamond text-3xl font-bold mb-6">Scenario Construction</h2>
            <p>
              Research presents valuation under three scenarios: Bear, Base, and Bull. Each scenario is tied to
              specific assumption changes, not arbitrary guess work.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Bear Case:</strong> Conservative revenue growth, margin compression, higher discount rate</li>
              <li><strong>Base Case:</strong> Management guidance met, consensus expectations</li>
              <li><strong>Bull Case:</strong> Execution upside, market share gains, multiple expansion</li>
            </ul>
            <p className="mt-4">
              Scenario differentiation is explicit and documented in the valuation model for auditability.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-garamond text-3xl font-bold mb-6">What Changes My Mind</h2>
            <p>
              Every thesis has breaking points. We explicitly document thesis-breaking indicators:
              macroeconomic changes that invalidate assumptions, competitive dynamics that shift the landscape,
              capital allocation decisions that fail to create shareholder value.
            </p>
            <p>
              When these conditions arise, the research is updated to reflect the new view, and prior
              analysis is not deleted but marked as superseded.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
