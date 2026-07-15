<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useData } from "vitepress";

// Appearance follows the OS by default (VitePress `appearance: true`); this
// toggle lets visitors pick light or dark explicitly (persisted by VitePress).
const { isDark } = useData();
function toggleAppearance() {
  isDark.value = !isDark.value;
}

const principles = [
  { num: "01", title: "The signature is the doc", body: "A contract or a function signature should be enough to understand a system. Declare the interface once and read everything from it — no digging into implementations." },
  { num: "02", title: "Fail fast, everywhere", body: "The sooner the error, the better the code. Anticipated failures are values in the type, malformed data stops at the boundary, missing wiring is a compile error." },
  { num: "03", title: "Coherence at a high level", body: "Contracts pin down how the pieces fit — publisher and consumer, workflow and client, module and dependency can't drift apart while implementations change underneath." },
];

const aiCards = [
  { title: "The tightest feedback loop", body: "An agent is only as good as the signal it gets back. Fail-fast code turns a wrong guess into a precise error in seconds — and fast errors are what make iteration converge." },
  { title: "A deterministic metric", body: "Typechecking has no opinions. The contract holds or it doesn't — a reproducible, binary measure of generated code, before a single test runs." },
  { title: "Review at the contract level", body: "Expressive contracts carry the intent. You review interfaces while the AI churns through implementations — the types guarantee the whole still fits together." },
];

const inspirations = [
  { name: "zod", href: "https://zod.dev", body: "The schema as a single source of truth — write it once, infer the types." },
  { name: "prisma", href: "https://www.prisma.io", body: "One declaration, a fully typed client — the whole database readable from its types." },
  { name: "tRPC", href: "https://trpc.io", body: "End-to-end type safety across a network boundary, with no codegen step." },
  { name: "oRPC", href: "https://orpc.unnoq.com", body: "Contract-first RPC — the contract is an artifact you define, share and implement against." },
];

interface Project {
  tag: string;
  name: string;
  pkg: string;
  logo: string;
  repoFull: string;
  stars0: number;
  blurb: string;
  points: string[];
  install: string;
  repo: string;
  docs: string;
}

const projects: Project[] = [
  {
    tag: "Messaging", name: "amqp-contract", pkg: "@amqp-contract/contract",
    logo: "/logos/amqp-contract", repoFull: "btravstack/amqp-contract", stars0: 18,
    blurb: "Type-safe contracts for AMQP & RabbitMQ. Define your exchanges, queues and messages once — get types and runtime validation on both ends.",
    points: ["End-to-end type safety", "Reliable retry with Dead Letter Queues", "AsyncAPI 3.0 generation"],
    install: "pnpm add @amqp-contract/contract",
    repo: "https://github.com/btravstack/amqp-contract", docs: "https://btravstack.github.io/amqp-contract/",
  },
  {
    tag: "Workflows", name: "temporal-contract", pkg: "@temporal-contract/contract",
    logo: "/logos/temporal-contract", repoFull: "btravstack/temporal-contract", stars0: 7,
    blurb: "Type-safe contracts for Temporal.io. End-to-end types and automatic validation across workflows, activities and clients.",
    points: ["Zod validation at every boundary", "Compile-time implementation checks", "Result / Future error handling"],
    install: "pnpm add @temporal-contract/contract",
    repo: "https://github.com/btravstack/temporal-contract", docs: "https://btravstack.github.io/temporal-contract/",
  },
  {
    tag: "Errors", name: "unthrown", pkg: "unthrown",
    logo: "/logos/unthrown", repoFull: "btravstack/unthrown", stars0: 1,
    blurb: "Explicit errors as values — with a separate defect channel for the unexpected. Only a true defect ever throws, and only at unwrap.",
    points: ["Errors as values, typed in E", "A separate defect channel", "Zero runtime dependencies"],
    install: "pnpm add unthrown",
    repo: "https://github.com/btravstack/unthrown", docs: "https://btravstack.github.io/unthrown/",
  },
  {
    tag: "Injection", name: "demesne", pkg: "demesne",
    logo: "/logos/demesne", repoFull: "btravstack/demesne", stars0: 2,
    blurb: "Type-safe dependency injection. Requirements and construction errors live in the type system — you cannot build until every dependency is wired.",
    points: ["Missing wiring is a compile error", "Failures as one static union", "Scoped resources, LIFO release"],
    install: "pnpm add demesne unthrown",
    repo: "https://github.com/btravstack/demesne", docs: "https://btravstack.github.io/demesne/",
  },
];

const stars = reactive<Record<string, number>>(
  Object.fromEntries(projects.map((p) => [p.repoFull, p.stars0])),
);
const copied = ref<string | null>(null);
let timer: ReturnType<typeof setTimeout> | undefined;

function copy(text: string) {
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).catch(() => {});
  copied.value = text;
  clearTimeout(timer);
  timer = setTimeout(() => (copied.value = null), 1600);
}

function formatStars(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, "")}k` : String(n);
}

onMounted(() => {
  for (const p of projects) {
    fetch(`https://api.github.com/repos/${p.repoFull}`, { headers: { Accept: "application/vnd.github+json" } })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => { if (typeof d.stargazers_count === "number") stars[p.repoFull] = d.stargazers_count; })
      .catch(() => {});
  }
});
</script>

<template>
  <div class="btv">
    <!-- N1b · wordmark left · centered links · actions right -->
    <header class="btv-head">
      <div class="btv-head-inner">
        <a href="#top" class="btv-brand">
          <svg viewBox="0 0 100 124" width="24" height="30" fill="none" aria-hidden="true" focusable="false"><g transform="translate(50,34)"><g transform="rotate(-35)"><path d="M0,3 C-6,-7 -6,-18 0,-28 C6,-18 6,-7 0,3 Z" fill="#2C8B4E"/></g><g transform="rotate(35)"><path d="M0,3 C-6,-7 -6,-18 0,-28 C6,-18 6,-7 0,3 Z" fill="#2C8B4E"/></g><path d="M0,4 C-7,-8 -7,-20 0,-32 C7,-20 7,-8 0,4 Z" fill="#3DAE62"/></g><path d="M50,32 C29,30 17,44 17,60 C17,79 37,99 50,107 Z" fill="#CE3D80"/><path d="M50,32 C71,30 83,44 83,60 C83,79 63,99 50,107 Z" fill="#8E1A52"/><path d="M31,48 C27,55 27.5,65 32,73" stroke="#EE9CC4" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.55"/><path d="M46.5,104 C46.5,112 44,118 39,124 C47,120 52.5,112 53.5,104 Z" fill="#8E1A52"/></svg>
          <span class="btv-word"><span class="btv-pink">btrav</span><span>stack</span></span>
        </a>
        <nav class="btv-links nav-hide" aria-label="Primary">
          <a class="navlink" href="#philosophy">Philosophy</a>
          <a class="navlink" href="#packages">Packages</a>
          <a class="navlink" href="#ai">Why&nbsp;now</a>
        </nav>
        <div class="btv-actions">
          <ClientOnly>
            <button type="button" class="btv-toggle" :title="isDark ? 'Switch to light' : 'Switch to dark'" :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'" :aria-pressed="isDark" @click="toggleAppearance">
              <svg v-if="isDark" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2M12 19.5v2M4.8 4.8l1.4 1.4M17.8 17.8l1.4 1.4M2.5 12h2M19.5 12h2M4.8 19.2 6.2 17.8M17.8 6.2 19.2 4.8"/></svg>
              <svg v-else width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4 6.4 6.4 0 0 0 20 14.5Z"/></svg>
            </button>
          </ClientOnly>
          <a href="https://github.com/btravstack" target="_blank" rel="noopener" class="btv-cta btv-cta--nav">GitHub</a>
        </div>
      </div>
    </header>

    <!-- Compact centered hero — the mascot is the one character moment -->
    <section id="top" class="btv-hero">
      <div class="btv-float">
        <svg viewBox="0 0 100 124" width="92" height="114" fill="none" aria-hidden="true" focusable="false"><g transform="translate(50,34)"><g transform="rotate(-35)"><path d="M0,3 C-6,-7 -6,-18 0,-28 C6,-18 6,-7 0,3 Z" fill="#2C8B4E"/></g><g transform="rotate(35)"><path d="M0,3 C-6,-7 -6,-18 0,-28 C6,-18 6,-7 0,3 Z" fill="#2C8B4E"/></g><path d="M0,4 C-7,-8 -7,-20 0,-32 C7,-20 7,-8 0,4 Z" fill="#3DAE62"/></g><path d="M50,32 C29,30 17,44 17,60 C17,79 37,99 50,107 Z" fill="#CE3D80"/><path d="M50,32 C71,30 83,44 83,60 C83,79 63,99 50,107 Z" fill="#8E1A52"/><path d="M31,48 C27,55 27.5,65 32,73" stroke="#EE9CC4" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.55"/><path d="M46.5,104 C46.5,112 44,118 39,124 C47,120 52.5,112 53.5,104 Z" fill="#8E1A52"/></svg>
      </div>
      <h1 class="btv-title">An expressive, robust TypeScript backend.</h1>
      <p class="btv-sub">A small stack of type-safe building blocks for Node, built on two convictions: a signature should be enough to understand a system, and the fastest error is the best one. Declare the contract once — types, validation and feedback flow everywhere.</p>
      <div class="btv-cta-row">
        <a href="#packages" class="btv-cta">Explore the packages</a>
        <a href="https://github.com/btravstack" target="_blank" rel="noopener" class="btv-cta btv-cta--ghost">View on GitHub <span aria-hidden="true">↗</span></a>
      </div>
    </section>

    <!-- The mosaic -->
    <section class="btv-bento" aria-label="btravstack in tiles">
      <!-- Philosophy -->
      <div id="philosophy" class="tile sp4 tile-intro">
        <h2 class="btv-h2">Expressive to read. Robust to run.</h2>
        <p class="btv-lead-p">Each package is small, focused and does one thing well — but they share a worldview: expressive code you can understand from its signature alone, and robust code that fails fast enough to learn from.</p>
      </div>
      <div class="tile sp2 tile-prin">
        <div class="btv-chip" aria-hidden="true">{{ principles[0].num }}</div>
        <h3>{{ principles[0].title }}</h3>
        <p>{{ principles[0].body }}</p>
      </div>
      <div class="tile sp3 tile-prin">
        <div class="btv-chip" aria-hidden="true">{{ principles[1].num }}</div>
        <h3>{{ principles[1].title }}</h3>
        <p>{{ principles[1].body }}</p>
      </div>
      <div class="tile sp3 tile-prin">
        <div class="btv-chip" aria-hidden="true">{{ principles[2].num }}</div>
        <h3>{{ principles[2].title }}</h3>
        <p>{{ principles[2].body }}</p>
      </div>

      <!-- Packages -->
      <article v-for="(p, i) in projects" :key="p.name" :id="i === 0 ? 'packages' : undefined" class="tile sp3 tile-pkg">
        <div class="btv-pkg-top">
          <img :src="`${p.logo}-${isDark ? 'dark' : 'light'}.svg`" width="46" height="46" :alt="`${p.name} logo`" class="btv-logo" />
          <span class="btv-stars" :title="`${stars[p.repoFull]} GitHub stars`">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 1.3l2.06 4.17 4.6.67-3.33 3.24.78 4.58L8 11.8l-4.11 2.16.78-4.58L1.34 6.14l4.6-.67L8 1.3z"/></svg>
            {{ formatStars(stars[p.repoFull]) }}
          </span>
        </div>
        <p class="btv-tag">{{ p.tag }}</p>
        <h3 class="btv-pname">{{ p.name }}</h3>
        <code class="btv-pkg">{{ p.pkg }}</code>
        <p class="btv-blurb">{{ p.blurb }}</p>
        <ul class="btv-points">
          <li v-for="pt in p.points" :key="pt">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2.5 8.5l3 3 8-8" stroke="var(--text-green)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <span>{{ pt }}</span>
          </li>
        </ul>
        <button type="button" class="btv-codeblk" :title="`Copy: ${p.install}`" @click="copy(p.install)">
          <span class="btv-cmd"><span class="btv-dollar">$ </span>{{ p.install }}</span>
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="5.5" y="5.5" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.4"/><path d="M3.5 10.5h-1A1.5 1.5 0 0 1 1 9V2.5A1.5 1.5 0 0 1 2.5 1H9a1.5 1.5 0 0 1 1.5 1.5v1" stroke="currentColor" stroke-width="1.4"/></svg>
        </button>
        <div class="btv-pkg-links">
          <a :href="p.docs" target="_blank" rel="noopener" class="btv-link">Docs <span aria-hidden="true">↗</span></a>
          <a :href="p.repo" target="_blank" rel="noopener" class="btv-link btv-link--quiet">Repo <span aria-hidden="true">↗</span></a>
        </div>
      </article>

      <!-- Why now -->
      <div id="ai" class="tile sp4 tile-intro tile-wash">
        <h2 class="btv-h2">Written with AI. Judged by the compiler.</h2>
        <p class="btv-lead-p">None of this was invented for AI — AI just raised the stakes. When an agent writes the code, expressiveness and fail-fast stop being a matter of taste and become infrastructure.</p>
      </div>
      <div class="tile sp2 tile-ai">
        <h3>{{ aiCards[0].title }}</h3>
        <p>{{ aiCards[0].body }}</p>
      </div>
      <div class="tile sp3 tile-ai">
        <h3>{{ aiCards[1].title }}</h3>
        <p>{{ aiCards[1].body }}</p>
      </div>
      <div class="tile sp3 tile-ai">
        <h3>{{ aiCards[2].title }}</h3>
        <p>{{ aiCards[2].body }}</p>
      </div>

      <!-- Inspirations -->
      <div class="tile sp2 tile-intro">
        <h2 class="btv-h2 btv-h2-sm">Standing on good shoulders.</h2>
        <p class="btv-lead-p">btravstack borrows its instincts from the libraries that made TypeScript feel this way in the first place.</p>
      </div>
      <a v-for="(z, i) in inspirations" :key="z.name" :href="z.href" target="_blank" rel="noopener" class="tile tile-insp" :class="i < 2 ? 'sp2' : 'sp3'">
        <span class="btv-insp-name">{{ z.name }} <span aria-hidden="true">↗</span></span>
        <p>{{ z.body }}</p>
      </a>

      <!-- CTA -->
      <div class="tile sp6 tile-cta">
        <h2 class="btv-h2">Build backends you can trust the types of.</h2>
        <p class="btv-lead-p btv-cta-p">Star the projects, open an issue, or just read the docs. Everything is MIT-licensed and built in the open.</p>
        <a href="https://github.com/btravstack" target="_blank" rel="noopener" class="btv-cta">View on GitHub <span aria-hidden="true">↗</span></a>
      </div>
    </section>

    <!-- Ft8 · marquee footer + meta row -->
    <footer class="btv-foot">
      <div class="btv-marquee">
        <div class="btv-marquee-track" aria-hidden="true">
          <span>btravstack <i>·</i> expressive <i>·</i> robust <i>·</i> type-safe <i>·</i> open source <i>·</i> btravstack <i>·</i> expressive <i>·</i> robust <i>·</i> type-safe <i>·</i> open source <i>·</i>&nbsp;</span>
          <span>btravstack <i>·</i> expressive <i>·</i> robust <i>·</i> type-safe <i>·</i> open source <i>·</i> btravstack <i>·</i> expressive <i>·</i> robust <i>·</i> type-safe <i>·</i> open source <i>·</i>&nbsp;</span>
        </div>
        <p class="visually-hidden">btravstack — expressive, robust, type-safe, open source.</p>
      </div>
      <div class="btv-foot-meta">
        <div class="btv-foot-brand">
          <svg viewBox="0 0 100 124" width="20" height="25" fill="none" aria-hidden="true" focusable="false"><g transform="translate(50,34)"><g transform="rotate(-35)"><path d="M0,3 C-6,-7 -6,-18 0,-28 C6,-18 6,-7 0,3 Z" fill="#2C8B4E"/></g><g transform="rotate(35)"><path d="M0,3 C-6,-7 -6,-18 0,-28 C6,-18 6,-7 0,3 Z" fill="#2C8B4E"/></g><path d="M0,4 C-7,-8 -7,-20 0,-32 C7,-20 7,-8 0,4 Z" fill="#3DAE62"/></g><path d="M50,32 C29,30 17,44 17,60 C17,79 37,99 50,107 Z" fill="#CE3D80"/><path d="M50,32 C71,30 83,44 83,60 C83,79 63,99 50,107 Z" fill="#8E1A52"/><path d="M31,48 C27,55 27.5,65 32,73" stroke="#EE9CC4" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.55"/><path d="M46.5,104 C46.5,112 44,118 39,124 C47,120 52.5,112 53.5,104 Z" fill="#8E1A52"/></svg>
          <span class="btv-word btv-foot-word"><span class="btv-pink">btrav</span><span>stack</span></span>
        </div>
        <nav class="btv-foot-links" aria-label="Documentation">
          <a v-for="p in projects" :key="p.name" :href="p.docs" target="_blank" rel="noopener" class="btv-link btv-link--quiet">{{ p.name }}</a>
        </nav>
        <p class="btv-foot-legal">MIT © 2026 <a href="https://github.com/btravers" target="_blank" rel="noopener" class="btv-link btv-link--quiet">Benoit Travers</a></p>
      </div>
    </footer>

    <Transition name="btv-toast">
      <div v-if="copied" class="btv-toast" role="status" aria-live="polite">Copied&nbsp; <span class="btv-toast-cmd">{{ copied }}</span></div>
    </Transition>
  </div>
</template>

<style scoped>
/* Hallmark · genre: playful · macrostructure: Bento Grid · design-system: design.md · designed-as-app
 * bento knobs: tiles=18, spans=mixed (2/3/4/6 of 6), accent=wash-tiles-only
 * nav: N1b (wordmark · centered links · toggle + pill CTA) · footer: Ft8 marquee + meta row
 * hero: compact centered, H9 mascot (original gradient mark, Tier-B) — the one character moment
 * theme: custom "beetroot soft" — tokens in @btravstack/theme · studied: no
 * contrast: pass (40–41) · nav/footer/hero slop: pass (42–45, N1b routed) · honest: pass (46) · chrome: pass (47)
 * tokens: pass (48) · responsive: pass (49) · mobile: pass (34, 49, 50–57 — verified 320/375/414/768)
 * pre-emit critique: P4 H4 E4 S4 R4 V5
 */
.btv {
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  font-family: var(--sans);
  font-size: var(--fs-body);
  line-height: var(--lh-body);
}

.btv-pink { color: var(--display-accent); }
.visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

/* ── N1b nav — frosted, three sections ────────────────────────── */
.btv-head {
  position: sticky; top: 0; z-index: 50;
  backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
  background: var(--glass);
  border-bottom: 1px solid var(--border);
}
.btv-head-inner {
  max-width: var(--container); margin: 0 auto; padding: 0 24px; height: 64px;
  display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 16px;
}
.btv-brand { display: flex; align-items: center; gap: 10px; text-decoration: none; justify-self: start; }
.btv-word { font-family: var(--display); font-weight: 700; font-size: 19px; letter-spacing: var(--tracking-snug); color: var(--text); white-space: nowrap; }
.btv-links { display: flex; align-items: center; gap: 4px; justify-self: center; }
.navlink {
  color: var(--muted); text-decoration: none; font-weight: 600; font-size: 14.5px;
  padding: 8px 12px; border-radius: var(--radius-pill); white-space: nowrap;
  transition: color var(--speed-fast) var(--ease), background-color var(--speed-fast) var(--ease);
}
.navlink:hover { color: var(--text); background: var(--accent-wash); }
.navlink:active { color: var(--text-accent); }
.btv-actions { display: flex; align-items: center; gap: 10px; justify-self: end; }
.btv-toggle {
  display: inline-flex; align-items: center; justify-content: center;
  width: 36px; height: 36px;
  border: 1px solid var(--border-2); border-radius: var(--radius-pill);
  background: transparent; color: var(--muted); cursor: pointer;
  transition: color var(--speed-fast) var(--ease), background-color var(--speed-fast) var(--ease);
}
.btv-toggle:hover { color: var(--text); background: var(--accent-wash); }
.btv-toggle:active { transform: translateY(1px); }

/* ── Pill CTAs ────────────────────────────────────────────────── */
.btv-cta {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--accent); color: var(--accent-contrast);
  font-family: var(--display); font-weight: 700; font-size: 15px;
  text-decoration: none; white-space: nowrap;
  padding: 12px 22px; border-radius: var(--radius-pill);
  box-shadow: var(--shadow-accent);
  transition: background-color var(--speed-fast) var(--ease), transform var(--speed-fast) var(--ease), box-shadow var(--speed) var(--ease);
}
.btv-cta:hover { background: var(--accent-hover); transform: translateY(-1px); }
.btv-cta:active { background: var(--accent-deep); color: var(--bt-cream); transform: translateY(0); box-shadow: none; }
.btv-cta--ghost {
  background: transparent; color: var(--text);
  border: 1px solid var(--border-2); box-shadow: none;
}
.btv-cta--ghost:hover { background: var(--accent-wash); }
.btv-cta--ghost:active { background: var(--accent-wash-2); color: var(--text); }
.btv-cta--nav { padding: 9px 16px; font-size: 14px; box-shadow: none; }

/* ── Hero — compact, centered, one character moment ───────────── */
.btv-hero { max-width: 760px; margin: 0 auto; padding: 52px 24px 76px; text-align: center; }
.btv-float { display: inline-flex; animation: btv-bob 6s var(--ease) infinite; filter: drop-shadow(0 14px 28px color-mix(in srgb, var(--accent-deep) 35%, transparent)); }
.btv-title {
  margin: 22px 0 0;
  font-family: var(--display); font-weight: 800;
  font-size: var(--fs-hero); line-height: var(--lh-tight); letter-spacing: var(--tracking-hero);
  overflow-wrap: anywhere; min-width: 0;
}
.btv-sub { margin: 18px auto 0; max-width: 58ch; font-size: var(--fs-body-lg); line-height: var(--lh-body); color: var(--muted); }
.btv-cta-row { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; margin-top: 30px; }

/* ── Bento mosaic ─────────────────────────────────────────────── */
.btv-bento {
  max-width: var(--container); margin: 0 auto; padding: 0 24px 72px;
  display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 16px;
}
.sp2 { grid-column: span 2; }
.sp3 { grid-column: span 3; }
.sp4 { grid-column: span 4; }
.sp6 { grid-column: span 6; }
.tile {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 26px;
  scroll-margin-top: 84px;
  min-width: 0;
}
.btv-h2 {
  margin: 0;
  font-family: var(--display); font-weight: 700;
  font-size: var(--fs-h2); line-height: 1.15; letter-spacing: var(--tracking-tight);
  overflow-wrap: anywhere; min-width: 0;
}
.btv-h2-sm { font-size: 21px; }
.btv-lead-p { margin: 12px 0 0; max-width: 62ch; font-size: 15px; line-height: 1.65; color: var(--muted); }

/* Principle tiles */
.tile-prin h3 { margin: 14px 0 0; font-family: var(--display); font-weight: 700; font-size: var(--fs-h4); letter-spacing: var(--tracking-snug); color: var(--text); }
.tile-prin p { margin: 8px 0 0; font-size: 14.5px; line-height: 1.6; color: var(--muted); }
.btv-chip {
  width: 36px; height: 36px; border-radius: var(--radius);
  display: flex; align-items: center; justify-content: center;
  background: var(--accent-wash-2); border: 1px solid var(--accent-line);
  color: var(--text-accent); font-family: var(--mono); font-weight: 600; font-size: 14px;
}

/* Package tiles */
.tile-pkg { display: flex; flex-direction: column; }
.btv-pkg-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
.btv-logo { display: block; flex: none; width: 46px; height: 46px; object-fit: contain; }
.btv-stars { display: inline-flex; align-items: center; gap: 5px; font-family: var(--mono); font-size: 13px; font-variant-numeric: tabular-nums; color: var(--faint); }
.btv-tag { margin: 16px 0 0; font-family: var(--mono); font-size: 11.5px; font-weight: 600; letter-spacing: var(--tracking-eyebrow); text-transform: uppercase; color: var(--faint); }
.btv-pname { margin: 6px 0 0; font-family: var(--display); font-weight: 800; font-size: 22px; letter-spacing: var(--tracking-snug); color: var(--text); }
.btv-pkg { display: inline-block; margin: 5px 0 0; font-family: var(--mono); font-size: 13px; color: var(--text-accent); background: none; padding: 0; }
.btv-blurb { margin: 12px 0 0; font-size: 14.5px; line-height: 1.6; color: var(--muted); }
.btv-points { list-style: none; margin: 14px 0 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.btv-points li { display: flex; align-items: flex-start; gap: 9px; font-size: 14px; line-height: 1.4; color: var(--text); }
.btv-points svg { margin-top: 2px; flex: none; }
.btv-codeblk {
  margin-top: auto; width: 100%;
  display: flex; align-items: center; justify-content: space-between; gap: 10px;
  font-family: var(--mono); font-size: 12.5px;
  background: var(--card-soft); color: var(--text);
  border: 1px solid var(--border); border-radius: var(--radius);
  padding: 11px 13px; cursor: pointer; text-align: left;
  transition: border-color var(--speed-fast) var(--ease), background-color var(--speed-fast) var(--ease);
}
.btv-codeblk:hover { border-color: var(--accent-line); background: var(--accent-wash); }
.btv-codeblk:active { background: var(--accent-wash-2); }
.btv-cmd { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.btv-dollar { color: var(--text-accent); user-select: none; }
.btv-pkg-links { display: flex; align-items: center; gap: 18px; margin-top: 16px; }
.btv-link {
  display: inline-flex; align-items: baseline; gap: 6px;
  color: var(--text); text-decoration: none; font-weight: 600; font-size: 14px; white-space: nowrap;
  transition: color var(--speed-fast) var(--ease);
}
.btv-link:hover { color: var(--text-accent); }
.btv-link:active { color: var(--accent-deep); }
.btv-link--quiet { color: var(--muted); }

/* Why-now tiles */
.tile-wash { background: var(--accent-wash); border-color: var(--accent-line); }
.tile-ai h3 { margin: 0; font-family: var(--display); font-weight: 700; font-size: var(--fs-h4); letter-spacing: var(--tracking-snug); color: var(--text); }
.tile-ai p { margin: 8px 0 0; font-size: 14.5px; line-height: 1.6; color: var(--muted); }

/* Inspiration tiles — the interactive ones lift */
.tile-insp { display: block; text-decoration: none; transition: transform var(--speed) var(--ease), box-shadow var(--speed) var(--ease); }
.tile-insp:hover { transform: translateY(-2px); box-shadow: var(--shadow-card); }
.btv-insp-name { font-family: var(--mono); font-weight: 600; font-size: 15px; color: var(--text-accent); }
.tile-insp p { margin: 8px 0 0; font-size: 14px; line-height: 1.55; color: var(--muted); }

/* CTA tile */
.tile-cta { text-align: center; padding: 44px 26px; background: var(--accent-wash); border-color: var(--accent-line); }
.btv-cta-p { max-width: 52ch; margin-left: auto; margin-right: auto; }
.tile-cta .btv-cta { margin-top: 24px; }

/* ── Ft8 marquee footer ───────────────────────────────────────── */
.btv-foot { border-top: 1px solid var(--border); }
.btv-marquee { overflow: hidden; }
.btv-marquee:hover .btv-marquee-track { animation-play-state: paused; }
.btv-marquee-track {
  display: flex; white-space: nowrap; padding-block: 18px;
  animation: btv-marquee 36s linear infinite;
}
.btv-marquee-track span {
  font-family: var(--display); font-weight: 700; letter-spacing: 0.06em;
  font-size: clamp(15px, 2vw, 19px); color: var(--muted);
}
.btv-marquee-track i { font-style: normal; color: var(--text-accent); }
.btv-foot-meta {
  max-width: var(--container); margin: 0 auto; padding: 18px 24px 34px;
  border-top: 1px solid var(--border);
  display: flex; flex-wrap: wrap; align-items: center; gap: 14px 28px;
}
.btv-foot-brand { display: flex; align-items: center; gap: 8px; }
.btv-foot-word { font-size: 16px; }
.btv-foot-links { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 18px; }
.btv-foot-links .btv-link, .btv-foot-legal .btv-link { font-size: 13.5px; }
.btv-foot-legal { margin: 0 0 0 auto; font-size: 13px; color: var(--faint); }

/* ── Toast (silent success) ───────────────────────────────────── */
.btv-toast {
  position: fixed; bottom: 26px; left: 50%; transform: translateX(-50%); z-index: 80;
  background: var(--card); color: var(--text);
  border: 1px solid var(--border-2); border-radius: var(--radius);
  font-family: var(--mono); font-size: 13px; padding: 10px 16px;
  box-shadow: var(--shadow-toast);
}
.btv-toast-cmd { color: var(--text-accent); }
.btv-toast-enter-active, .btv-toast-leave-active { transition: opacity var(--speed) var(--ease), transform var(--speed) var(--ease); }
.btv-toast-enter-from, .btv-toast-leave-to { opacity: 0; transform: translate(-50%, 8px); }

@keyframes btv-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
@keyframes btv-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

/* ── Responsive ───────────────────────────────────────────────── */
@media (max-width: 960px) {
  .btv-bento { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .sp2 { grid-column: span 1; }
  .sp3, .sp4, .sp6 { grid-column: span 2; }
}
@media (max-width: 640px) {
  .btv-hero { padding: 40px 18px 56px; }
  .btv-bento { padding: 0 18px 56px; grid-template-columns: minmax(0, 1fr); gap: 14px; }
  .sp2, .sp3, .sp4, .sp6 { grid-column: span 1; }
  .btv-head-inner { grid-template-columns: auto 1fr; padding: 0 16px; }
  .btv-actions { justify-self: end; }
  .btv-foot-legal { margin-left: 0; }
}
@media (max-width: 560px) {
  .nav-hide { display: none !important; }
}
@media (prefers-reduced-motion: reduce) {
  .btv-float { animation: none; }
  .btv-marquee-track { animation: none; }
  .btv-cta, .btv-toggle, .tile-insp { transition: none; }
  .btv-toast-enter-active, .btv-toast-leave-active { transition: opacity 0.12s var(--ease); }
  .btv-toast-enter-from, .btv-toast-leave-to { transform: translateX(-50%); }
}
</style>
