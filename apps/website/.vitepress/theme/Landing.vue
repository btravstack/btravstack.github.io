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
  { num: "I.", title: "The signature is the doc", body: "A contract or a function signature should be enough to understand a system. Declare the interface once and read everything from it — no digging into implementations." },
  { num: "II.", title: "Fail fast, everywhere", body: "The sooner the error, the better the code. Anticipated failures are values in the type, malformed data stops at the boundary, missing wiring is a compile error." },
  { num: "III.", title: "Coherence at a high level", body: "Contracts pin down how the pieces fit — publisher and consumer, workflow and client, module and dependency can't drift apart while implementations change underneath." },
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

const plates = ["II", "III", "IV", "V"];

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
    <!-- N9 · edge-aligned minimal -->
    <header class="btv-head">
      <div class="btv-head-inner">
        <a href="#top" class="btv-brand">
          <svg viewBox="14 -10 76 145" width="20" height="34" aria-hidden="true" focusable="false" class="btv-eng">
            <path d="M46,36 C44,28 43,20 45,12" class="eng-line" stroke-width="3"/>
            <path d="M52,36 C53,28 54,21 53,13" class="eng-line" stroke-width="3"/>
            <path d="M45,13 C39,8 36,1 41,-3 C46,-7 52,-4 53,2 C54,8 50,12 45,13 Z" class="eng-leaf" stroke-width="3"/>
            <path d="M53,14 C51,7 54,0 60,-1 C66,-2 69,4 66,10 C63,15 57,16 53,14 Z" class="eng-leaf" stroke-width="3"/>
            <path d="M50,36 C34,35 22,45 21,58 C20,73 32,88 43,99 C46,102 48,106 50,109 C52,106 55,102 58,98 C69,87 80,72 79,58 C78,45 66,35 50,36 Z" class="eng-root" stroke-width="4"/>
            <path d="M50,109 C49,116 50,122 47,129" class="eng-line" stroke-width="3"/>
          </svg>
          <span class="btv-word"><span class="btv-pink">btrav</span><span>stack</span></span>
        </a>
        <div class="btv-actions">
          <ClientOnly>
            <button type="button" class="btv-toggle" :title="isDark ? 'Switch to light' : 'Switch to dark'" :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'" :aria-pressed="isDark" @click="toggleAppearance">
              <svg v-if="isDark" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2M12 19.5v2M4.8 4.8l1.4 1.4M17.8 17.8l1.4 1.4M2.5 12h2M19.5 12h2M4.8 19.2 6.2 17.8M17.8 6.2 19.2 4.8"/></svg>
              <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4 6.4 6.4 0 0 0 20 14.5Z"/></svg>
            </button>
          </ClientOnly>
          <a href="https://github.com/btravstack" target="_blank" rel="noopener" class="btv-navlink">GitHub <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </header>

    <!-- Hero — left-biased text, framed plate right -->
    <section id="top" class="btv-hero">
      <div class="btv-hero-copy">
        <h1 class="btv-title">An expressive, robust TypeScript backend.</h1>
        <p class="btv-sub">A small stack of type-safe building blocks for Node, built on two convictions: a signature should be enough to understand a system, and the fastest error is the best one. Declare the contract once — types, validation and feedback flow everywhere.</p>
        <div class="btv-cta-row">
          <a href="#packages" class="btv-cta">Explore the packages <span aria-hidden="true">↓</span></a>
          <a href="https://github.com/btravstack" target="_blank" rel="noopener" class="btv-cta btv-cta--quiet">View on GitHub <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <figure class="btv-plate btv-hero-plate">
        <div class="btv-plate-inner">
          <svg viewBox="0 0 196 152" class="btv-eng btv-hero-art" role="img" aria-label="Engraved botanical plate of a beetroot with a cross-section">
            <g transform="translate(24,14)">
              <path d="M46,36 C44,28 43,20 45,12" class="eng-line" stroke-width="1.7"/>
              <path d="M52,36 C53,28 54,21 53,13" class="eng-line" stroke-width="1.7"/>
              <path d="M57,37 C61,31 65,26 70,23" class="eng-line" stroke-width="1.5"/>
              <path d="M45,13 C39,8 36,1 41,-3 C46,-7 52,-4 53,2 C54,8 50,12 45,13 Z" class="eng-leaf" stroke-width="1.5"/>
              <path d="M45,12 C44,6 45,1 47,-2" class="eng-line eng-fine" stroke-width="0.9"/>
              <path d="M53,14 C51,7 54,0 60,-1 C66,-2 69,4 66,10 C63,15 57,16 53,14 Z" class="eng-leaf" stroke-width="1.5"/>
              <path d="M55,12 C57,7 60,3 63,2" class="eng-line eng-fine" stroke-width="0.9"/>
              <path d="M70,23 C71,17 76,13 81,15 C85,17 85,23 80,26 C76,28 72,27 70,23 Z" class="eng-leaf" stroke-width="1.4"/>
              <path d="M50,36 C34,35 22,45 21,58 C20,73 32,88 43,99 C46,102 48,106 50,109 C52,106 55,102 58,98 C69,87 80,72 79,58 C78,45 66,35 50,36 Z" class="eng-root" stroke-width="2.1"/>
              <path d="M41,46 C37,58 38,72 44,85" class="eng-line eng-half" stroke-width="1"/>
              <path d="M58,45 C62,56 61,70 55,83" class="eng-line eng-half" stroke-width="1"/>
              <path d="M50,42 C49,58 49,76 50,92" class="eng-line eng-fine" stroke-width="0.9"/>
              <path d="M29,52 C28,57 28,61 29,65" class="eng-line eng-fine" stroke-width="0.8"/>
              <path d="M33,48 C31,56 31,64 33,72" class="eng-line eng-fine" stroke-width="0.8"/>
              <path d="M31,72 C32,78 35,84 38,89" class="eng-line eng-fine" stroke-width="0.8"/>
              <path d="M50,109 C49,116 50,122 47,129" class="eng-line" stroke-width="1.7"/>
              <path d="M49,115 L44,117" class="eng-line" stroke-width="1"/>
              <path d="M49,121 L53,124" class="eng-line" stroke-width="1"/>
            </g>
            <g transform="translate(152,78)">
              <circle r="24" class="eng-root" stroke-width="1.8"/>
              <circle r="17.5" class="eng-line eng-half" stroke-width="1.1"/>
              <circle r="11.5" class="eng-line eng-half" stroke-width="1.1"/>
              <circle r="5.5" class="eng-line eng-half" stroke-width="1.1"/>
              <circle r="1.6" class="eng-dot"/>
            </g>
          </svg>
          <figcaption class="btv-plate-cap"><span class="btv-plate-no">Pl. I</span> — Beta vulgaris</figcaption>
        </div>
      </figure>
    </section>

    <!-- Inventory band + catalogue of plates -->
    <section id="packages" class="btv-section">
      <p class="btv-inventory">Four packages · MIT-licensed · for the TypeScript backend</p>
      <div class="btv-plates">
        <article v-for="(p, i) in projects" :key="p.name" class="btv-plate">
          <div class="btv-plate-inner btv-plate-pkg">
            <div class="btv-pkg-art">
              <img :src="`${p.logo}-${isDark ? 'dark' : 'light'}.svg`" width="88" height="88" :alt="`${p.name} — engraved mark`" class="btv-logo" />
            </div>
            <p class="btv-plate-cap btv-pkg-cap"><span class="btv-plate-no">Pl. {{ plates[i] }}</span> — {{ p.tag }}</p>
            <h3 class="btv-pname">{{ p.name }}</h3>
            <code class="btv-pkg">{{ p.pkg }}</code>
            <p class="btv-blurb">{{ p.blurb }}</p>
            <ul class="btv-points">
              <li v-for="pt in p.points" :key="pt">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2.5 8.5l3 3 8-8" stroke="var(--text-green)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <span>{{ pt }}</span>
              </li>
            </ul>
            <button type="button" class="btv-codeblk" :title="`Copy: ${p.install}`" @click="copy(p.install)">
              <span class="btv-cmd"><span class="btv-dollar">$ </span>{{ p.install }}</span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="5.5" y="5.5" width="8" height="8" stroke="currentColor" stroke-width="1.3"/><path d="M3.5 10.5h-1A1.5 1.5 0 0 1 1 9V2.5A1.5 1.5 0 0 1 2.5 1H9a1.5 1.5 0 0 1 1.5 1.5v1" stroke="currentColor" stroke-width="1.3"/></svg>
            </button>
            <div class="btv-plate-foot">
              <a :href="p.docs" target="_blank" rel="noopener" class="btv-link">Docs <span aria-hidden="true">↗</span></a>
              <a :href="p.repo" target="_blank" rel="noopener" class="btv-link btv-link--quiet">Repo <span aria-hidden="true">↗</span></a>
              <span class="btv-stars" :title="`${stars[p.repoFull]} GitHub stars`">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 1.3l2.06 4.17 4.6.67-3.33 3.24.78 4.58L8 11.8l-4.11 2.16.78-4.58L1.34 6.14l4.6-.67L8 1.3z"/></svg>
                {{ formatStars(stars[p.repoFull]) }}
              </span>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- Principles — numbered editorial list -->
    <section id="philosophy" class="btv-section btv-narrow">
      <h2 class="btv-h2">Expressive to read. Robust to run.</h2>
      <p class="btv-section-lead">Each package is small, focused and does one thing well — but they share a worldview: expressive code you can understand from its signature alone, and robust code that fails fast enough to learn from.</p>
      <div class="btv-prin">
        <div v-for="pr in principles" :key="pr.num" class="btv-prin-row">
          <h3 class="btv-prin-title"><span class="btv-prin-num">{{ pr.num }}</span> {{ pr.title }}</h3>
          <p class="btv-prin-body">{{ pr.body }}</p>
        </div>
      </div>
    </section>

    <!-- Why now — set prose over three ruled columns -->
    <section id="ai" class="btv-section btv-narrow">
      <h2 class="btv-h2">Written with AI. Judged by the compiler.</h2>
      <p class="btv-section-lead">None of this was invented for AI — AI just raised the stakes. When an agent writes the code, expressiveness and fail-fast stop being a matter of taste and become infrastructure.</p>
      <div class="btv-ai-cols">
        <div v-for="c in aiCards" :key="c.title" class="btv-ai-col">
          <h3>{{ c.title }}</h3>
          <p>{{ c.body }}</p>
        </div>
      </div>
    </section>

    <!-- Inspirations — hairline index -->
    <section class="btv-section btv-narrow">
      <h2 class="btv-h2">Standing on good shoulders.</h2>
      <p class="btv-section-lead">btravstack borrows its instincts from the libraries that made TypeScript feel this way in the first place.</p>
      <div class="btv-insp">
        <a v-for="z in inspirations" :key="z.name" :href="z.href" target="_blank" rel="noopener" class="btv-insp-row">
          <span class="btv-insp-name">{{ z.name }} <span aria-hidden="true">↗</span></span>
          <span class="btv-insp-body">{{ z.body }}</span>
        </a>
      </div>
    </section>

    <!-- Quiet typographic close -->
    <section class="btv-section btv-close">
      <h2 class="btv-close-h2">Build backends you can trust the types of.</h2>
      <p class="btv-close-p">Star the projects, open an issue, or just read the docs. Everything is MIT-licensed and built in the open.</p>
      <a href="https://github.com/btravstack" target="_blank" rel="noopener" class="btv-cta btv-cta--big">View on GitHub <span aria-hidden="true">↗</span></a>
    </section>

    <!-- Ft1 · mast-headed footer -->
    <footer class="btv-foot">
      <div class="btv-foot-inner">
        <div class="btv-foot-brand">
          <svg viewBox="14 -10 76 145" width="18" height="31" aria-hidden="true" focusable="false" class="btv-eng">
            <path d="M46,36 C44,28 43,20 45,12" class="eng-line" stroke-width="3"/>
            <path d="M52,36 C53,28 54,21 53,13" class="eng-line" stroke-width="3"/>
            <path d="M45,13 C39,8 36,1 41,-3 C46,-7 52,-4 53,2 C54,8 50,12 45,13 Z" class="eng-leaf" stroke-width="3"/>
            <path d="M53,14 C51,7 54,0 60,-1 C66,-2 69,4 66,10 C63,15 57,16 53,14 Z" class="eng-leaf" stroke-width="3"/>
            <path d="M50,36 C34,35 22,45 21,58 C20,73 32,88 43,99 C46,102 48,106 50,109 C52,106 55,102 58,98 C69,87 80,72 79,58 C78,45 66,35 50,36 Z" class="eng-root" stroke-width="4"/>
            <path d="M50,109 C49,116 50,122 47,129" class="eng-line" stroke-width="3"/>
          </svg>
          <span class="btv-word btv-foot-word"><span class="btv-pink">btrav</span><span>stack</span></span>
        </div>
        <p class="btv-foot-tag">Type-safe building blocks for the TypeScript backend. Open source, MIT.</p>
        <nav class="btv-foot-links" aria-label="Documentation">
          <a v-for="p in projects" :key="p.name" :href="p.docs" target="_blank" rel="noopener" class="btv-link btv-link--quiet">{{ p.name }}</a>
          <a href="https://github.com/btravstack" target="_blank" rel="noopener" class="btv-link btv-link--quiet">GitHub</a>
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
/* Hallmark · genre: editorial (premium) · macrostructure: Catalogue · design-system: design.md · designed-as-app
 * catalogue knobs: plates=4 uniform 2×2, frame=double-rule, labels=Pl. II–V (genuinely ordinal)
 * nav: N9 edge-aligned (wordmark left · toggle + text CTA right) · footer: Ft1 mast-headed
 * hero: left-biased text + framed engraving (H2 split, divider=negative space) · enrichment: Tier-B hand-built SVG engravings
 * theme: custom "beetroot atlas" — tokens in @btravstack/theme · studied: no
 * contrast: pass (40–41) · nav/footer/hero slop: pass (42–45) · honest: pass (46) · chrome: pass (47)
 * tokens: pass (48) · responsive: pass (49) · mobile: pass (34, 49, 50–57 — verified 320/375/414/768)
 * pre-emit critique: P5 H4 E4 S5 R5 V5
 */
.btv {
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  font-family: var(--sans);
  font-size: var(--fs-body);
  line-height: var(--lh-body);
}

.btv-pink { color: var(--text-accent); }

/* ── Engraving strokes/fills — scheme-adaptive via tokens ─────── */
.btv-eng { display: block; }
.eng-line { stroke: var(--text); fill: none; stroke-linecap: round; }
.eng-fine { opacity: 0.4; }
.eng-half { opacity: 0.55; fill: none; }
.eng-leaf { stroke: var(--text); fill: color-mix(in srgb, var(--green) 30%, transparent); }
.eng-root { stroke: var(--text); fill: color-mix(in srgb, var(--accent) 26%, transparent); }
.eng-dot  { fill: var(--text); }

/* ── N9 · edge-aligned nav ────────────────────────────────────── */
.btv-head {
  position: sticky; top: 0; z-index: 50;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
}
.btv-head-inner { max-width: var(--container); margin: 0 auto; padding: 0 28px; height: 64px; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
.btv-brand { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.btv-word { font-family: var(--display); font-weight: 600; font-size: 21px; letter-spacing: var(--tracking-snug); color: var(--text); white-space: nowrap; }
.btv-actions { display: flex; align-items: center; gap: 18px; }
.btv-toggle {
  display: inline-flex; align-items: center; justify-content: center;
  width: 34px; height: 34px;
  border: 1px solid var(--border); border-radius: var(--radius);
  background: transparent; color: var(--muted); cursor: pointer;
  transition: color var(--speed-fast) var(--ease), border-color var(--speed-fast) var(--ease);
}
.btv-toggle:hover { color: var(--text); border-color: var(--border-2); }
.btv-toggle:active { transform: translateY(1px); }
.btv-navlink {
  display: inline-flex; align-items: baseline; gap: 5px;
  color: var(--text); text-decoration: none;
  font-size: 14.5px; font-weight: 500; white-space: nowrap;
  border-bottom: 1px solid var(--border-2); padding-bottom: 1px;
  transition: color var(--speed-fast) var(--ease), border-color var(--speed-fast) var(--ease);
}
.btv-navlink:hover { color: var(--text-accent); border-bottom-color: var(--text-accent); }
.btv-navlink:active { color: var(--accent-deep); }

/* ── Hero — H2 split, left-biased ─────────────────────────────── */
.btv-hero {
  max-width: var(--container); margin: 0 auto; padding: 64px 28px 88px;
  display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  gap: 56px; align-items: center;
}
.btv-title {
  margin: 0;
  font-family: var(--display); font-weight: 650;
  font-size: var(--fs-hero); line-height: var(--lh-tight); letter-spacing: var(--tracking-hero);
  overflow-wrap: anywhere; min-width: 0;
}
.btv-sub { margin: 20px 0 0; max-width: 58ch; font-size: var(--fs-body-lg); line-height: var(--lh-body); color: var(--muted); }
.btv-cta-row { display: flex; flex-wrap: wrap; gap: 12px 32px; margin-top: 32px; }
.btv-cta {
  display: inline-flex; align-items: baseline; gap: 7px;
  color: var(--text); text-decoration: none;
  font-family: var(--display); font-weight: 600; font-size: 17px; white-space: nowrap;
  border-bottom: 2px solid var(--text-accent); padding-bottom: 2px;
  transition: color var(--speed-fast) var(--ease), border-color var(--speed-fast) var(--ease);
}
.btv-cta:hover { color: var(--text-accent); }
.btv-cta:active { color: var(--accent-deep); }
.btv-cta--quiet { border-bottom-color: var(--border-2); }
.btv-cta--quiet:hover { border-bottom-color: var(--text-accent); }
.btv-cta--big { font-size: 19px; }

/* ── Plates — double-rule frames ──────────────────────────────── */
.btv-plate { margin: 0; border: 1px solid var(--border-2); padding: 5px; background: var(--bg); min-width: 0; }
.btv-plate-inner { border: 1px solid var(--border); padding: 26px; height: 100%; box-sizing: border-box; }
.btv-hero-plate { max-width: 420px; justify-self: end; width: 100%; }
.btv-hero-art { width: 100%; height: auto; }
.btv-plate-cap {
  margin: 18px 0 0; text-align: center;
  font-size: var(--fs-eyebrow); letter-spacing: var(--tracking-eyebrow);
  text-transform: uppercase; color: var(--faint);
}
.btv-plate-no { color: var(--text-accent); }

/* ── Inventory band + catalogue grid ──────────────────────────── */
.btv-section { max-width: var(--container); margin: 0 auto; padding: 0 28px 72px; scroll-margin-top: 80px; }
.btv-inventory {
  margin: 0 0 32px; padding: 14px 0;
  border-top: 1px solid var(--border-2); border-bottom: 1px solid var(--border);
  font-size: var(--fs-eyebrow); letter-spacing: var(--tracking-eyebrow);
  text-transform: uppercase; color: var(--muted); text-align: center;
}
.btv-plates { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
.btv-plate-pkg { display: flex; flex-direction: column; }
.btv-pkg-art { display: flex; justify-content: center; padding: 6px 0 2px; }
.btv-logo { display: block; width: 88px; height: 88px; object-fit: contain; }
.btv-pkg-cap { margin-top: 12px; padding-bottom: 16px; border-bottom: 1px solid var(--border); }
.btv-pname { margin: 16px 0 0; font-family: var(--display); font-weight: 600; font-size: 26px; letter-spacing: var(--tracking-tight); color: var(--text); text-align: center; }
.btv-pkg { display: block; margin: 6px 0 0; font-family: var(--mono); font-size: 13px; color: var(--text-accent); background: none; padding: 0; text-align: center; }
.btv-blurb { margin: 16px 0 0; font-size: 14.5px; line-height: 1.65; color: var(--muted); }
.btv-points { list-style: none; margin: 16px 0 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.btv-points li { display: flex; align-items: flex-start; gap: 9px; font-size: 14px; line-height: 1.5; color: var(--text); }
.btv-points svg { margin-top: 3px; flex: none; }
.btv-codeblk {
  margin-top: 20px; width: 100%;
  display: flex; align-items: center; justify-content: space-between; gap: 10px;
  font-family: var(--mono); font-size: 12.5px;
  background: var(--code-bg); color: var(--text);
  border: 1px solid var(--border); border-radius: var(--radius-sm);
  padding: 11px 13px; cursor: pointer; text-align: left;
  transition: border-color var(--speed-fast) var(--ease);
}
.btv-codeblk:hover { border-color: var(--border-2); }
.btv-codeblk:active { border-color: var(--text-accent); }
.btv-cmd { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.btv-dollar { color: var(--text-accent); user-select: none; }
.btv-plate-foot { display: flex; align-items: center; gap: 20px; margin-top: auto; padding-top: 20px; }
.btv-link {
  display: inline-flex; align-items: baseline; gap: 5px;
  color: var(--text); text-decoration: none; font-weight: 500; font-size: 14px; white-space: nowrap;
  border-bottom: 1px solid var(--border-2); padding-bottom: 1px;
  transition: color var(--speed-fast) var(--ease), border-color var(--speed-fast) var(--ease);
}
.btv-link:hover { color: var(--text-accent); border-bottom-color: var(--text-accent); }
.btv-link:active { color: var(--accent-deep); }
.btv-link--quiet { color: var(--muted); border-bottom-color: transparent; }
.btv-link--quiet:hover { color: var(--text-accent); }
.btv-stars { display: inline-flex; align-items: center; gap: 5px; margin-left: auto; font-family: var(--mono); font-size: 13px; font-variant-numeric: tabular-nums; color: var(--faint); }

/* ── Editorial sections ───────────────────────────────────────── */
.btv-narrow { max-width: 880px; }
.btv-h2 {
  margin: 0;
  font-family: var(--display); font-weight: 600;
  font-size: var(--fs-h2); line-height: 1.18; letter-spacing: var(--tracking-tight);
  overflow-wrap: anywhere; min-width: 0;
}
.btv-section-lead { margin: 14px 0 0; max-width: 62ch; font-size: 16px; line-height: 1.65; color: var(--muted); }

.btv-prin { margin-top: 36px; border-top: 1px solid var(--border-2); }
.btv-prin-row { padding: 22px 0 24px; border-bottom: 1px solid var(--border); }
.btv-prin-title { margin: 0; font-family: var(--display); font-weight: 600; font-size: var(--fs-h3); letter-spacing: var(--tracking-snug); }
.btv-prin-num { color: var(--text-accent); margin-right: 6px; }
.btv-prin-body { margin: 10px 0 0; max-width: 68ch; font-size: 15px; line-height: 1.65; color: var(--muted); }

.btv-ai-cols { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 32px; margin-top: 36px; }
.btv-ai-col { border-top: 1px solid var(--border-2); padding-top: 16px; }
.btv-ai-col h3 { margin: 0; font-family: var(--display); font-weight: 600; font-size: 17px; letter-spacing: var(--tracking-snug); color: var(--text); }
.btv-ai-col p { margin: 9px 0 0; font-size: 14.5px; line-height: 1.6; color: var(--muted); }

.btv-insp { margin-top: 32px; border-top: 1px solid var(--border-2); }
.btv-insp-row {
  display: flex; align-items: baseline; gap: 20px;
  padding: 15px 0; border-bottom: 1px solid var(--border);
  text-decoration: none;
}
.btv-insp-name { flex: none; width: 9ch; font-family: var(--mono); font-weight: 500; font-size: 14.5px; color: var(--text); transition: color var(--speed-fast) var(--ease); }
.btv-insp-row:hover .btv-insp-name { color: var(--text-accent); }
.btv-insp-body { font-size: 14px; line-height: 1.55; color: var(--muted); min-width: 0; }

/* ── Quiet close ──────────────────────────────────────────────── */
.btv-close { text-align: center; padding-top: 24px; padding-bottom: 104px; }
.btv-close-h2 { margin: 0 auto; max-width: 26ch; font-family: var(--display); font-weight: 650; font-size: clamp(26px, 3.4vw, 36px); line-height: 1.18; letter-spacing: var(--tracking-tight); }
.btv-close-p { margin: 16px auto 30px; max-width: 52ch; font-size: 15.5px; line-height: 1.6; color: var(--muted); }

/* ── Ft1 · mast-headed footer ─────────────────────────────────── */
.btv-foot { border-top: 1px solid var(--border-2); }
.btv-foot-inner { max-width: var(--container); margin: 0 auto; padding: 34px 28px 44px; display: flex; flex-wrap: wrap; align-items: center; gap: 14px 32px; }
.btv-foot-brand { display: flex; align-items: center; gap: 9px; }
.btv-foot-word { font-size: 18px; }
.btv-foot-tag { margin: 0; font-size: 13.5px; color: var(--faint); }
.btv-foot-links { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 20px; margin-left: auto; }
.btv-foot-links .btv-link, .btv-foot-legal .btv-link { font-size: 13.5px; }
.btv-foot-legal { margin: 0; width: 100%; font-size: 13px; color: var(--faint); }

/* ── Toast (silent success) ───────────────────────────────────── */
.btv-toast {
  position: fixed; bottom: 26px; left: 50%; transform: translateX(-50%); z-index: 80;
  background: var(--bg); color: var(--text);
  border: 1px solid var(--border-2); border-radius: var(--radius);
  font-family: var(--mono); font-size: 13px; padding: 10px 16px;
  box-shadow: var(--shadow-toast);
}
.btv-toast-cmd { color: var(--text-accent); }
.btv-toast-enter-active, .btv-toast-leave-active { transition: opacity var(--speed) var(--ease), transform var(--speed) var(--ease); }
.btv-toast-enter-from, .btv-toast-leave-to { opacity: 0; transform: translate(-50%, 8px); }

/* ── Responsive ───────────────────────────────────────────────── */
@media (max-width: 900px) {
  .btv-hero { grid-template-columns: minmax(0, 1fr); gap: 40px; padding-bottom: 72px; }
  .btv-hero-plate { justify-self: center; }
  .btv-plates { grid-template-columns: minmax(0, 1fr); }
  .btv-ai-cols { grid-template-columns: minmax(0, 1fr); gap: 22px; }
}
@media (max-width: 640px) {
  .btv-hero { padding: 44px 20px 60px; }
  .btv-section { padding-left: 20px; padding-right: 20px; }
  .btv-head-inner, .btv-foot-inner { padding-left: 20px; padding-right: 20px; }
  .btv-plate-inner { padding: 20px; }
  .btv-insp-row { flex-direction: column; gap: 4px; }
  .btv-insp-name { width: auto; }
  .btv-foot-links { margin-left: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .btv-cta, .btv-link, .btv-navlink, .btv-toggle, .btv-codeblk { transition: none; }
  .btv-toast-enter-active, .btv-toast-leave-active { transition: opacity 0.12s var(--ease); }
  .btv-toast-enter-from, .btv-toast-leave-to { transform: translateX(-50%); }
}
</style>
