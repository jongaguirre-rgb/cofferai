export default function Disclaimer() {
  return (
    <div className="pt-20 pb-20">
      <div className="container max-w-article">
        <h1 className="font-garamond text-5xl font-bold mb-12">Disclaimer</h1>

        <div className="mdx-prose">
          <section className="mb-12">
            <h2 className="font-garamond text-3xl font-bold mb-6">Not Investment Advice</h2>
            <p>
              All content on this website is for informational and educational purposes only. Nothing herein
              constitutes a recommendation to buy, sell, or hold any security. You should not rely on this
              information to make investment decisions. Consult with a qualified financial advisor before
              making any investment decisions.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-garamond text-3xl font-bold mb-6">No Guarantee of Accuracy</h2>
            <p>
              While every effort is made to ensure the accuracy of information presented, errors may occur. Financial
              data is sourced from public disclosures and other third-party sources, and no guarantee is made as to its
              completeness or accuracy.
            </p>
            <p>
              Forward-looking statements, projections, and valuations represent estimates based on assumptions that may
              or may not prove accurate. Actual results may differ materially.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-garamond text-3xl font-bold mb-6">Conflicts of Interest & Holdings Disclosure</h2>
            <p>
              Every analysis includes a holdings disclosure statement. The author may hold or may have held positions in
              securities discussed herein. The author may liquidate or establish new positions at any time without notice.
            </p>
            <p>
              The presence of a disclosure statement does not eliminate conflicts of interest. Readers should assume that
              the author has a stake in the securities analyzed.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-garamond text-3xl font-bold mb-6">Data Sources</h2>
            <p>
              Financial data is sourced from:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>SEC EDGAR (10-K, 10-Q, 8-K filings)</li>
              <li>Company investor relations websites and material</li>
              <li>Public market data providers (where available)</li>
              <li>Government statistical agencies</li>
            </ul>
            <p className="mt-4">
              All data sources are subject to the terms and conditions of the respective vendors and providers.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-garamond text-3xl font-bold mb-6">Copyright & Usage Rights</h2>
            <p>
              All original analysis on this website is copyright © cofferai.com. Reproduction or distribution
              requires explicit written permission.
            </p>
            <p>
              Financial data presented is subject to the copyright and licensing terms of the original source.
              See the specific source for restrictions on use.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-garamond text-3xl font-bold mb-6">Limitation of Liability</h2>
            <p>
              In no event shall the author be liable for any direct, indirect, incidental, special, or consequential
              damages arising from your use or inability to use the content on this website, even if the author has been
              advised of the possibility of such damages.
            </p>
          </section>

          <section>
            <h2 className="font-garamond text-3xl font-bold mb-6">Questions?</h2>
            <p>
              For questions or concerns regarding this disclaimer, please contact{' '}
              <a href="mailto:contact@cofferai.com" className="text-accent-blue hover:text-accent-blue-light">
                contact@cofferai.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
