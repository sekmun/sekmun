### Sek-Mun Wong

**Loop engineering is still engineering. Here are the receipts.**

I build production software with AI agents running in a loop: plan, specify, build, verify, ship, run. The models do most of the typing. None of it is vibe coding; it's old engineering discipline wrapped around the latest harnesses and models, so the loop can run on its own and still be trusted with production.

<a href="https://sekmun.com"><img src="site/assets/inflection.svg" width="900" alt="Twelve months of GitHub contributions: near-empty for six months, then ramping from mid-year to a September peak during sprint 57."></a>

Each stage of loop engineering moves the bottleneck. Assisted, the constraint is me. Looped, it's the token budget and the 5-hour usage windows. On 9 September DeepSeek V4.1 Flash made unattended loops affordable, and sprint 57 finished at **744 points against a 260-point forecast**. Now sprints end with the backlog empty, and the constraint is writing specifications good enough for a loop to execute.

<a href="https://sekmun.com"><img src="site/assets/sprint.svg" width="900" alt="Burnup for sprint 57: 744 points completed against a 260-point forecast, with GitHub contributions for the same days underneath."></a>

**Plan:** two-week scrum sprints in ClickUp, BMAD for drafting and challenging plans, points and model turns kept in separate ledgers.  
**Specify:** contracts with invariants, failure behaviour and non-goals; one linked ticket per repository.  
**Build:** Laravel/Vue, Python and TypeScript on Workers and Node.js; an isolated worktree and throwaway database per agent; models chosen by role through [omp.sh](https://omp.sh), which topped [Composio's comparison of eight harnesses](https://composio.dev/content/best-ai-agent-harnesses).  
**Verify:** unit coverage of 80.71% (Laravel core) and 95.39% (Python services), browser tests against the real app, 1,726 real-Postgres regression tests, and review by a different model family, verified from routing metadata.  
**Ship:** infrastructure as code, all CI/CD in GitHub Actions, with merge, release, deploy and activation kept as separate decisions.  
**Run:** Cloudflare Workers, Queues, Durable Objects and R2 at the edge, a Python batch plane, row-level security, and telemetry on the loop as well as the product.

The full write-up is at [sekmun.com](https://sekmun.com).

[LinkedIn](https://www.linkedin.com/in/sekmun/) · [sekmun.com](https://sekmun.com)

<!--
This repo also builds sekmun.com.
  data/            contributions (refreshed nightly) and sprint figures
  scripts/         build.mjs renders the SVGs; refresh-contributions.mjs pulls GitHub data
  site/            the static site served by a Cloudflare Worker (wrangler.jsonc)
-->
