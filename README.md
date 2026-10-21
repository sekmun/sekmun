### Sek-Mun Wong

One engineer, an agent loop, and a backlog that keeps running out.

<a href="https://sekmun.com"><img src="site/assets/inflection.svg" width="900" alt="Twelve months of GitHub contributions: near-empty for six months, then ramping from mid-year to a September peak during sprint 57."></a>

**Sprint 57 was forecast at 260 points. The loop closed 744.** Scope grew from 260 to 799 while it ran, and work kept landing over both weekends. What changed on 9 September was cost: DeepSeek V4.1 Flash went live, tokens got cheap enough to leave the loop running unattended, and the 5-hour usage windows stopped deciding when work happened.

<a href="https://sekmun.com"><img src="site/assets/sprint.svg" width="900" alt="Burnup for sprint 57: 744 points completed against a 260-point forecast, with GitHub contributions for the same days underneath."></a>

The agents write the code. The engineering is in the gates: tickets written as contracts, a coverage ratchet, browser tests as the oracle, and review by a different model than the one that wrote the change. Harness: [omp.sh](https://omp.sh) with Claude and other models. Everything ships to Cloudflare's edge, including [sekmun.com](https://sekmun.com).

[sekmun.com](https://sekmun.com) · [LinkedIn](https://www.linkedin.com/in/sekmun/)

<!--
This repo also builds sekmun.com.
  data/            contributions (refreshed nightly) and sprint figures
  scripts/         build.mjs renders the SVGs; refresh-contributions.mjs pulls GitHub data
  site/            the static site served by a Cloudflare Worker (wrangler.jsonc)
-->
