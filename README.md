### Sek-Mun Wong

One engineer, an agent loop, and a backlog that keeps running out.

<a href="https://sekmun.com"><img src="site/assets/inflection.svg" width="900" alt="2,392 GitHub contributions in the last 12 months: near-empty for six months, then ramping to a peak of 142 on 13 September during sprint 57."></a>

**Sprint 57 was forecast at 260 points. The loop closed 744.** Scope grew from 260 to 799 while it ran, and work kept landing over both weekends.

<a href="https://sekmun.com"><img src="site/assets/sprint.svg" width="900" alt="Burnup for sprint 57: 744 points completed against a 260-point forecast, with GitHub contributions for the same days underneath."></a>

The agents write the code. The engineering is in the gates: tickets written as contracts, a coverage ratchet, browser tests as the oracle, and review by a different model than the one that wrote the change. Harness: [omp.sh](https://omp.sh) with Claude and other models. Everything ships to Cloudflare's edge, including [sekmun.com](https://sekmun.com).

[sekmun.com](https://sekmun.com) · [LinkedIn](https://www.linkedin.com/in/sekmun/)

<!--
This repo also builds sekmun.com.
  data/            contributions (refreshed nightly) and sprint figures
  scripts/         build.mjs renders the SVGs; refresh-contributions.mjs pulls GitHub data
  site/            the static site served by a Cloudflare Worker (wrangler.jsonc)
-->
