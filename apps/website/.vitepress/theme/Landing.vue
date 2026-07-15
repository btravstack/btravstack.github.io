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
    <!-- N5 · floating pill nav -->
    <nav class="btv-pill" aria-label="Primary">
      <a href="#top" class="btv-brand">
        <svg viewBox="0 0 100 124" width="18" height="22" fill="none" aria-hidden="true" focusable="false"><g transform="translate(50,34)"><g transform="rotate(-35)"><path d="M0,3 C-6,-7 -6,-18 0,-28 C6,-18 6,-7 0,3 Z" fill="#2C8B4E"/></g><g transform="rotate(35)"><path d="M0,3 C-6,-7 -6,-18 0,-28 C6,-18 6,-7 0,3 Z" fill="#2C8B4E"/></g><path d="M0,4 C-7,-8 -7,-20 0,-32 C7,-20 7,-8 0,4 Z" fill="#3DAE62"/></g><path d="M50,32 C29,30 17,44 17,60 C17,79 37,99 50,107 Z" fill="#CE3D80"/><path d="M50,32 C71,30 83,44 83,60 C83,79 63,99 50,107 Z" fill="#8E1A52"/><path d="M31,48 C27,55 27.5,65 32,73" stroke="#EE9CC4" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.55"/><path d="M46.5,104 C46.5,112 44,118 39,124 C47,120 52.5,112 53.5,104 Z" fill="#8E1A52"/></svg>
        <span class="btv-word"><span class="btv-pink">btrav</span><span>stack</span></span>
      </a>
      <a class="navlink nav-hide" href="#philosophy">Philosophy</a>
      <a class="navlink nav-hide" href="#packages">Packages</a>
      <ClientOnly>
        <button type="button" class="btv-toggle" :title="isDark ? 'Switch to light' : 'Switch to dark'" :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'" :aria-pressed="isDark" @click="toggleAppearance">
          <svg v-if="isDark" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2M12 19.5v2M4.8 4.8l1.4 1.4M17.8 17.8l1.4 1.4M2.5 12h2M19.5 12h2M4.8 19.2 6.2 17.8M17.8 6.2 19.2 4.8"/></svg>
          <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4 6.4 6.4 0 0 0 20 14.5Z"/></svg>
        </button>
      </ClientOnly>
      <a href="https://github.com/btravstack" target="_blank" rel="noopener" class="btv-pill-cta">GitHub</a>
    </nav>

    <!-- Marquee fold — the canvas is the design -->
    <section id="top" class="btv-fold">
      <div class="btv-bloom btv-bloom-1" aria-hidden="true"></div>
      <div class="btv-float">
        <svg viewBox="0 0 100 124" width="112" height="139" fill="none" aria-hidden="true" focusable="false"><g transform="translate(50,34)"><g transform="rotate(-35)"><path d="M0,3 C-6,-7 -6,-18 0,-28 C6,-18 6,-7 0,3 Z" fill="#2C8B4E"/></g><g transform="rotate(35)"><path d="M0,3 C-6,-7 -6,-18 0,-28 C6,-18 6,-7 0,3 Z" fill="#2C8B4E"/></g><path d="M0,4 C-7,-8 -7,-20 0,-32 C7,-20 7,-8 0,4 Z" fill="#3DAE62"/></g><path d="M50,32 C29,30 17,44 17,60 C17,79 37,99 50,107 Z" fill="#CE3D80"/><path d="M50,32 C71,30 83,44 83,60 C83,79 63,99 50,107 Z" fill="#8E1A52"/><path d="M31,48 C27,55 27.5,65 32,73" stroke="#EE9CC4" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.55"/><path d="M46.5,104 C46.5,112 44,118 39,124 C47,120 52.5,112 53.5,104 Z" fill="#8E1A52"/></svg>
      </div>
      <h1 class="btv-statement">An expressive, robust TypeScript backend.</h1>
      <a href="#intro" class="btv-cue" aria-label="Scroll to the introduction"><span aria-hidden="true">↓</span></a>
    </section>

    <hr class="btv-fold-rule" aria-hidden="true" />

    <!-- Below the fold — intro + first CTAs -->
    <section id="intro" class="btv-section btv-intro">
      <p class="btv-lead">A small stack of type-safe building blocks for Node, built on two convictions: a signature should be enough to understand a system, and the fastest error is the best one. Declare the contract once — types, validation and feedback flow everywhere.</p>
      <div class="btv-cta-row">
        <a href="#packages" class="btv-cta">Explore the packages</a>
        <a href="https://github.com/btravstack" target="_blank" rel="noopener" class="btv-cta btv-cta--ghost">View on GitHub <span aria-hidden="true">↗</span></a>
      </div>
    </section>

    <!-- Packages — elevated panels -->
    <section id="packages" class="btv-section">
      <h2 class="btv-h2">Four libraries, one stack.</h2>
      <div class="btv-panels">
        <article v-for="p in projects" :key="p.name" class="btv-panel">
          <div class="btv-panel-top">
            <img :src="`${p.logo}-${isDark ? 'dark' : 'light'}.svg`" width="52" height="52" :alt="`${p.name} logo`" class="btv-logo" />
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
          <div class="btv-panel-links">
            <a :href="p.docs" target="_blank" rel="noopener" class="btv-link">Docs <span aria-hidden="true">↗</span></a>
            <a :href="p.repo" target="_blank" rel="noopener" class="btv-link btv-link--quiet">Repo <span aria-hidden="true">↗</span></a>
          </div>
        </article>
      </div>
    </section>

    <!-- Philosophy — three quiet columns -->
    <section id="philosophy" class="btv-section">
      <h2 class="btv-h2">Expressive to read. Robust to run.</h2>
      <p class="btv-section-lead">Each package is small, focused and does one thing well — but they share a worldview: expressive code you can understand from its signature alone, and robust code that fails fast enough to learn from.</p>
      <div class="btv-cols">
        <div v-for="pr in principles" :key="pr.num" class="btv-col">
          <p class="btv-num" aria-hidden="true">{{ pr.num }}</p>
          <h3>{{ pr.title }}</h3>
          <p>{{ pr.body }}</p>
        </div>
      </div>
    </section>

    <!-- Why now — second bloom + elevated panels -->
    <section id="ai" class="btv-section btv-ai">
      <div class="btv-bloom btv-bloom-2" aria-hidden="true"></div>
      <h2 class="btv-h2">Written with AI. Judged by the compiler.</h2>
      <p class="btv-section-lead">None of this was invented for AI — AI just raised the stakes. When an agent writes the code, expressiveness and fail-fast stop being a matter of taste and become infrastructure.</p>
      <div class="btv-ai-grid">
        <div v-for="c in aiCards" :key="c.title" class="btv-ai-card">
          <h3>{{ c.title }}</h3>
          <p>{{ c.body }}</p>
        </div>
      </div>
    </section>

    <!-- Inspirations -->
    <section class="btv-section">
      <h2 class="btv-h2">Standing on good shoulders.</h2>
      <p class="btv-section-lead">btravstack borrows its instincts from the libraries that made TypeScript feel this way in the first place.</p>
      <div class="btv-insp">
        <a v-for="z in inspirations" :key="z.name" :href="z.href" target="_blank" rel="noopener" class="btv-insp-row">
          <span class="btv-insp-name">{{ z.name }} <span aria-hidden="true">↗</span></span>
          <span class="btv-insp-body">{{ z.body }}</span>
        </a>
      </div>
    </section>

    <!-- Closing CTA -->
    <section class="btv-section btv-close">
      <h2 class="btv-h2">Build backends you can trust the types of.</h2>
      <p class="btv-section-lead btv-close-p">Star the projects, open an issue, or just read the docs. Everything is MIT-licensed and built in the open.</p>
      <a href="https://github.com/btravstack" target="_blank" rel="noopener" class="btv-cta btv-cta--big">View on GitHub <span aria-hidden="true">↗</span></a>
    </section>

    <!-- Ft5 · statement footer -->
    <footer class="btv-foot">
      <p class="btv-foot-line">Type-safe building blocks for the TypeScript backend.</p>
      <div class="btv-foot-meta">
        <div class="btv-foot-brand">
          <svg viewBox="0 0 100 124" width="18" height="22" fill="none" aria-hidden="true" focusable="false"><g transform="translate(50,34)"><g transform="rotate(-35)"><path d="M0,3 C-6,-7 -6,-18 0,-28 C6,-18 6,-7 0,3 Z" fill="#2C8B4E"/></g><g transform="rotate(35)"><path d="M0,3 C-6,-7 -6,-18 0,-28 C6,-18 6,-7 0,3 Z" fill="#2C8B4E"/></g><path d="M0,4 C-7,-8 -7,-20 0,-32 C7,-20 7,-8 0,4 Z" fill="#3DAE62"/></g><path d="M50,32 C29,30 17,44 17,60 C17,79 37,99 50,107 Z" fill="#CE3D80"/><path d="M50,32 C71,30 83,44 83,60 C83,79 63,99 50,107 Z" fill="#8E1A52"/><path d="M31,48 C27,55 27.5,65 32,73" stroke="#EE9CC4" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.55"/><path d="M46.5,104 C46.5,112 44,118 39,124 C47,120 52.5,112 53.5,104 Z" fill="#8E1A52"/></svg>
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
/* Hallmark · genre: atmospheric · macrostructure: Marquee Hero · design-system: design.md · designed-as-app
 * H1 marquee knobs: size=xl (clamp cap 84px), alignment=centred (genre-loosened), underlay=bloom
 * nav: N5 floating pill (content-sized, blur backdrop) · footer: Ft5 statement
 * blooms: two fixed radial (hero top-centre ~26%, ai mid-left ~18%) — no animation
 * enrichment: H9 original gradient mascot (Tier-B, kept) — the one character moment
 * theme: custom "beetroot nocturne" — tokens in @btravstack/theme · studied: no
 * contrast: pass (40–41) · nav/footer/hero slop: pass (42–45, marquee fold genre-sanctioned) · honest: pass (46)
 * chrome: pass (47) · tokens: pass (48) · responsive: pass (49) · mobile: pass (34, 49, 50–57 — verified 320/375/414/768)
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

/* ── N5 · floating pill nav ───────────────────────────────────── */
.btv-pill {
  position: fixed; top: 18px; left: 50%; transform: translateX(-50%);
  z-index: 50;
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 8px 7px 14px;
  background: var(--glass);
  backdrop-filter: blur(14px) saturate(120%); -webkit-backdrop-filter: blur(14px) saturate(120%);
  border: 1px solid var(--border-2);
  border-radius: var(--radius-pill);
  box-shadow: 0 8px 28px -14px rgba(0, 0, 0, 0.6);
  max-width: calc(100vw - 32px);
}
.btv-brand { display: flex; align-items: center; gap: 8px; text-decoration: none; margin-right: 6px; }
.btv-word { font-family: var(--display); font-weight: 700; font-size: 16.5px; letter-spacing: var(--tracking-snug); color: var(--text); white-space: nowrap; }
.navlink {
  color: var(--muted); text-decoration: none; font-weight: 500; font-size: 14px;
  padding: 7px 10px; border-radius: var(--radius-pill); white-space: nowrap;
  transition: color var(--speed-fast) var(--ease), background-color var(--speed-fast) var(--ease);
}
.navlink:hover { color: var(--text); background: var(--accent-wash); }
.navlink:active { color: var(--text-accent); }
.btv-toggle {
  display: inline-flex; align-items: center; justify-content: center;
  width: 32px; height: 32px;
  border: 0; border-radius: var(--radius-pill);
  background: transparent; color: var(--muted); cursor: pointer;
  transition: color var(--speed-fast) var(--ease), background-color var(--speed-fast) var(--ease);
}
.btv-toggle:hover { color: var(--text); background: var(--accent-wash); }
.btv-toggle:active { transform: translateY(1px); }
.btv-pill-cta {
  display: inline-flex; align-items: center;
  background: var(--accent); color: var(--accent-contrast);
  font-family: var(--display); font-weight: 600; font-size: 13.5px;
  text-decoration: none; white-space: nowrap;
  padding: 8px 15px; border-radius: var(--radius-pill);
  transition: background-color var(--speed-fast) var(--ease);
}
.btv-pill-cta:hover { background: var(--accent-hover); }
.btv-pill-cta:active { background: var(--accent-deep); color: var(--bt-cream); }

/* ── Marquee fold ─────────────────────────────────────────────── */
.btv-fold {
  position: relative;
  min-height: 88svh;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 30px;
  padding: 110px 24px 72px;
  overflow: clip;
  text-align: center;
}
.btv-bloom { position: absolute; pointer-events: none; border-radius: 50%; }
.btv-bloom-1 {
  top: -180px; left: 50%; transform: translateX(-50%);
  width: 900px; height: 760px; max-width: 120vw;
  background: radial-gradient(closest-side, var(--bloom), transparent 72%);
}
.btv-float {
  position: relative; display: inline-flex;
  animation: btv-bob 6s var(--ease) infinite;
  filter: drop-shadow(0 18px 40px color-mix(in srgb, var(--accent-deep) 45%, transparent));
}
.btv-statement {
  position: relative; margin: 0; max-width: 16ch;
  font-family: var(--display); font-weight: 700;
  font-size: var(--fs-hero); line-height: var(--lh-tight); letter-spacing: var(--tracking-hero);
  overflow-wrap: anywhere; min-width: 0;
}
.btv-cue {
  position: absolute; bottom: 26px; left: 50%; transform: translateX(-50%);
  color: var(--faint); text-decoration: none; font-size: 20px; line-height: 1;
  padding: 10px 14px; border-radius: var(--radius-pill);
  transition: color var(--speed-fast) var(--ease);
}
.btv-cue:hover { color: var(--text-accent); }
.btv-fold-rule {
  border: 0; margin: 0;
  height: 2px; background: var(--accent-wash-2);
}

/* ── Sections ─────────────────────────────────────────────────── */
.btv-section { position: relative; max-width: var(--container); margin: 0 auto; padding: 72px 28px 8px; scroll-margin-top: 80px; }
.btv-intro { padding-top: 64px; }
.btv-lead { margin: 0; max-width: 56ch; font-size: var(--fs-lead); line-height: 1.55; font-weight: 500; color: var(--text); }
.btv-cta-row { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 30px; }
.btv-cta {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--accent); color: var(--accent-contrast);
  font-family: var(--display); font-weight: 600; font-size: 15px;
  text-decoration: none; white-space: nowrap;
  padding: 12px 22px; border-radius: var(--radius-pill);
  transition: background-color var(--speed-fast) var(--ease), transform var(--speed-fast) var(--ease);
}
.btv-cta:hover { background: var(--accent-hover); transform: translateY(-1px); }
.btv-cta:active { background: var(--accent-deep); color: var(--bt-cream); transform: translateY(0); }
.btv-cta--ghost { background: transparent; color: var(--text); border: 1px solid var(--border-2); }
.btv-cta--ghost:hover { background: var(--accent-wash); }
.btv-cta--ghost:active { background: var(--accent-wash-2); color: var(--text); }
.btv-cta--big { font-size: 16.5px; padding: 14px 28px; }
.btv-h2 {
  margin: 0;
  font-family: var(--display); font-weight: 700;
  font-size: var(--fs-h2); line-height: 1.15; letter-spacing: var(--tracking-tight);
  max-width: 26ch; overflow-wrap: anywhere; min-width: 0;
}
.btv-section-lead { margin: 14px 0 0; max-width: 60ch; font-size: 16px; line-height: 1.65; color: var(--muted); }

/* ── Packages — elevated panels ───────────────────────────────── */
.btv-panels { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; margin-top: 36px; }
.btv-panel {
  display: flex; flex-direction: column;
  background: var(--card); border-radius: var(--radius-lg); padding: 26px;
  min-width: 0;
  transition: transform var(--speed) var(--ease), box-shadow var(--speed) var(--ease);
}
.btv-panel:hover { transform: translateY(-2px); box-shadow: var(--shadow-accent); }
.btv-panel-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
.btv-logo { display: block; flex: none; width: 52px; height: 52px; object-fit: contain; }
.btv-stars { display: inline-flex; align-items: center; gap: 5px; font-family: var(--mono); font-size: 13px; font-variant-numeric: tabular-nums; color: var(--faint); }
.btv-tag { margin: 16px 0 0; font-family: var(--mono); font-size: 11.5px; font-weight: 500; letter-spacing: var(--tracking-eyebrow); text-transform: uppercase; color: var(--faint); }
.btv-pname { margin: 6px 0 0; font-family: var(--display); font-weight: 700; font-size: 22px; letter-spacing: var(--tracking-snug); color: var(--text); }
.btv-pkg { display: inline-block; margin: 5px 0 0; font-family: var(--mono); font-size: 13px; color: var(--text-accent); background: none; padding: 0; }
.btv-blurb { margin: 13px 0 0; font-size: 14.5px; line-height: 1.6; color: var(--muted); }
.btv-points { list-style: none; margin: 15px 0 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.btv-points li { display: flex; align-items: flex-start; gap: 9px; font-size: 14px; line-height: 1.4; color: var(--text); }
.btv-points svg { margin-top: 2px; flex: none; }
.btv-codeblk {
  margin-top: 20px; width: 100%;
  display: flex; align-items: center; justify-content: space-between; gap: 10px;
  font-family: var(--mono); font-size: 12.5px;
  background: var(--code-bg); color: var(--text);
  border: 0; border-radius: var(--radius);
  padding: 12px 14px; cursor: pointer; text-align: left;
  transition: background-color var(--speed-fast) var(--ease);
}
.btv-codeblk:hover { background: color-mix(in srgb, var(--code-bg) 80%, var(--accent)); }
.btv-codeblk:active { background: color-mix(in srgb, var(--code-bg) 68%, var(--accent)); }
.btv-cmd { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.btv-dollar { color: var(--accent-soft); user-select: none; }
.btv-panel-links { display: flex; align-items: center; gap: 20px; margin-top: 18px; }
.btv-link {
  display: inline-flex; align-items: baseline; gap: 5px;
  color: var(--text); text-decoration: none; font-weight: 600; font-size: 14px; white-space: nowrap;
  transition: color var(--speed-fast) var(--ease);
}
.btv-link:hover { color: var(--text-accent); }
.btv-link:active { color: var(--accent-soft); }
.btv-link--quiet { color: var(--muted); font-weight: 500; }
.btv-link--quiet:hover { color: var(--text-accent); }

/* ── Philosophy columns ───────────────────────────────────────── */
.btv-cols { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 32px; margin-top: 36px; }
.btv-num { margin: 0; font-family: var(--mono); font-weight: 500; font-size: 14px; color: var(--text-accent); }
.btv-col h3 { margin: 10px 0 0; font-family: var(--display); font-weight: 600; font-size: var(--fs-h4); letter-spacing: var(--tracking-snug); color: var(--text); }
.btv-col p:last-child { margin: 8px 0 0; font-size: 14.5px; line-height: 1.6; color: var(--muted); }

/* ── Why now — bloom + soft panels ────────────────────────────── */
.btv-ai { overflow: visible; }
.btv-bloom-2 {
  top: -120px; left: -260px;
  width: 640px; height: 640px; max-width: 90vw;
  background: radial-gradient(closest-side, var(--bloom-2), transparent 72%);
}
.btv-ai-grid { position: relative; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; margin-top: 34px; }
.btv-ai-card { background: var(--card-soft); border-radius: var(--radius-lg); padding: 22px; }
.btv-ai-card h3 { margin: 0; font-family: var(--display); font-weight: 600; font-size: 16.5px; letter-spacing: var(--tracking-snug); color: var(--text); }
.btv-ai-card p { margin: 9px 0 0; font-size: 14.5px; line-height: 1.6; color: var(--muted); }

/* ── Inspirations ─────────────────────────────────────────────── */
.btv-insp { margin-top: 30px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.btv-insp-row {
  display: flex; flex-direction: column; gap: 5px;
  background: var(--card); border-radius: var(--radius); padding: 16px 18px;
  text-decoration: none;
  transition: transform var(--speed) var(--ease), box-shadow var(--speed) var(--ease);
}
.btv-insp-row:hover { transform: translateY(-2px); box-shadow: var(--shadow-accent); }
.btv-insp-name { font-family: var(--mono); font-weight: 500; font-size: 14.5px; color: var(--text-accent); }
.btv-insp-body { font-size: 14px; line-height: 1.55; color: var(--muted); }

/* ── Close ────────────────────────────────────────────────────── */
.btv-close { padding-bottom: 96px; }
.btv-close-p { margin-bottom: 28px; }

/* ── Ft5 · statement footer ───────────────────────────────────── */
.btv-foot { max-width: var(--container); margin: 0 auto; padding: 56px 28px 44px; display: grid; gap: 30px; border-top: 1px solid var(--border); }
.btv-foot-line {
  margin: 0; max-width: 24ch;
  font-family: var(--display); font-weight: 700;
  font-size: clamp(26px, 4vw, 44px); line-height: 1.1; letter-spacing: var(--tracking-tight);
  overflow-wrap: anywhere; min-width: 0;
}
.btv-foot-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 28px; padding-top: 16px; border-top: 1px solid var(--border); }
.btv-foot-brand { display: flex; align-items: center; gap: 8px; }
.btv-foot-word { font-size: 15.5px; }
.btv-foot-links { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 18px; margin-left: auto; }
.btv-foot-links .btv-link, .btv-foot-legal .btv-link { font-size: 13.5px; }
.btv-foot-legal { margin: 0; width: 100%; font-size: 13px; color: var(--faint); }

/* ── Toast (silent success) ───────────────────────────────────── */
.btv-toast {
  position: fixed; bottom: 26px; left: 50%; transform: translateX(-50%); z-index: 80;
  background: var(--card-soft); color: var(--text);
  border: 1px solid var(--border-2); border-radius: var(--radius);
  font-family: var(--mono); font-size: 13px; padding: 11px 16px;
  box-shadow: var(--shadow-toast);
}
.btv-toast-cmd { color: var(--text-accent); }
.btv-toast-enter-active, .btv-toast-leave-active { transition: opacity var(--speed) var(--ease), transform var(--speed) var(--ease); }
.btv-toast-enter-from, .btv-toast-leave-to { opacity: 0; transform: translate(-50%, 8px); }

@keyframes btv-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }

/* ── Responsive ───────────────────────────────────────────────── */
@media (max-width: 960px) {
  .btv-panels { grid-template-columns: minmax(0, 1fr); }
  .btv-cols { grid-template-columns: minmax(0, 1fr); gap: 24px; }
  .btv-ai-grid { grid-template-columns: minmax(0, 1fr); }
}
@media (max-width: 640px) {
  .btv-section { padding-left: 20px; padding-right: 20px; }
  .btv-fold { padding: 96px 20px 64px; gap: 24px; }
  .btv-insp { grid-template-columns: minmax(0, 1fr); }
  .btv-foot { padding-left: 20px; padding-right: 20px; }
  .btv-foot-links { margin-left: 0; }
}
@media (max-width: 560px) {
  .nav-hide { display: none !important; }
}
@media (prefers-reduced-motion: reduce) {
  .btv-float { animation: none; }
  .btv-cta, .btv-toggle, .btv-panel, .btv-insp-row, .btv-codeblk { transition: none; }
  .btv-toast-enter-active, .btv-toast-leave-active { transition: opacity 0.12s var(--ease); }
  .btv-toast-enter-from, .btv-toast-leave-to { transform: translateX(-50%); }
}
</style>
