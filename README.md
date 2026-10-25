### Sek-Mun Wong

**Build the loop, not just the code.**

For most of my career, the expensive part of making software was people typing it. This year that stopped being true. When implementation gets that cheap, the job moves to designing the loop that code flows through: what goes in, what has to be proven before anything comes out, and who decides it ships. That's loop engineering, and I think the teams who start learning it now will have a lead that's hard to close.

<a href="https://sekmun.com"><img src="site/assets/inflection.svg" width="900" alt="Twelve months of GitHub contributions: near-empty for six months, then ramping from mid-year to a September peak during sprint 57."></a>

Three things arrived this year: models good enough to keep their code, harnesses good enough to keep them working, and, on 9 September with DeepSeek V4.1 Flash, a cost low enough to leave the loop running overnight (and if retention worries you, it's on Ollama's zero-data-retention cloud too). Open-weight models now carry most of the tokens on OpenRouter, though frontier models still take most of the spend, and that gap is the big question hanging over the frontier labs. Quarter by quarter, their combined revenue growth has already slowed from about 83% in Q1 to about 62%, and valuations are being marked down to match. Much of this year's growth came from moving heavy users off flat $200 plans onto metered tokens; with open weights now good enough at a fraction of the price, I don't think the market will pay that overage tax for long. Build your loop model-agnostic. Sprint 57 was planned at 260 points and closed **744**. Watch the shape rather than the total: the curve steepens just after the cost dropped, and GitHub lights up on the same days.

<a href="https://sekmun.com"><img src="site/assets/sprint.svg" width="900" alt="Burnup for sprint 57: 744 points completed against a 260-point forecast, with GitHub contributions for the same days underneath."></a>

**Plan:** two-week scrum sprints in ClickUp, BMAD for drafting and challenging plans, points and model turns kept in separate ledgers.  
**Specify:** contracts with invariants, failure behaviour and non-goals; one linked ticket per repository.  
**Build:** Laravel/Vue, Python and TypeScript on Workers and Node.js; an isolated worktree and throwaway database per agent; models chosen by role through [omp.sh](https://omp.sh), which topped [Composio's comparison of eight harnesses](https://composio.dev/content/best-ai-agent-harnesses).  
**Verify:** unit coverage of 80.71% (Laravel core) and 95.39% (Python services), browser tests against the real app, 1,726 real-Postgres regression tests, and review by a different model family, verified from routing metadata.  
**Ship:** infrastructure as code, all CI/CD in GitHub Actions, with merge, release, deploy and activation kept as separate decisions.  
**Run:** Cloudflare Workers, Queues, Durable Objects and R2 at the edge, a Python batch plane, row-level security, and telemetry on the loop as well as the product.

The full notes, with the evidence for each claim, are at [sekmun.com](https://sekmun.com). I write up what I learn as I go on [Substack](https://sekmun.substack.com/).

<sub>Written by AI, working from the history in my harness, my development environment and git. I directed and checked it; the opinions are mine.</sub>

[Substack](https://sekmun.substack.com/) · [LinkedIn](https://www.linkedin.com/in/sekmun/) · [sekmun.com](https://sekmun.com)

<!--
This repo also builds sekmun.com.
  data/            contributions (refreshed nightly) and sprint figures
  scripts/         build.mjs renders the SVGs; refresh-contributions.mjs pulls GitHub data
  site/            the static site served by a Cloudflare Worker (wrangler.jsonc)
-->
