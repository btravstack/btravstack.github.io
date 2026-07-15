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
  { num: "§01", title: "The signature is the doc", body: "A contract or a function signature should be enough to understand a system. Declare the interface once and read everything from it — no digging into implementations." },
  { num: "§02", title: "Fail fast, everywhere", body: "The sooner the error, the better the code. Anticipated failures are values in the type, malformed data stops at the boundary, missing wiring is a compile error." },
  { num: "§03", title: "Coherence at a high level", body: "Contracts pin down how the pieces fit — publisher and consumer, workflow and client, module and dependency can't drift apart while implementations change underneath." },
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
    <!-- N7 · brutal slab nav -->
    <header class="btv-head">
      <div class="btv-head-inner">
        <a href="#top" class="btv-brand">
          <!-- flat riso beetroot mark — cutouts use var(--bg) so it adapts per scheme -->
          <svg viewBox="0 0 100 120" width="24" height="29" fill="none" aria-hidden="true" focusable="false"><path d="M53,32 C77,32 87,48 85,63 C83,80 68,95 54,108 L50,112 L50,34 Z" fill="#8E1A52" transform="translate(3,-3)"/><path d="M50,30 C27,30 15,46 17,62 C19,80 35,96 50,110 C65,96 81,80 83,62 C85,46 73,30 50,30 Z" fill="#E0589A"/><path d="M46,108 L50,120 L54,108 Z" fill="#8E1A52"/><path d="M50,32 L41,10 L50,0 L59,10 Z" fill="#3DAE62"/><path d="M46,32 L30,16 L26,26 L42,34 Z" fill="#2C8B4E"/><path d="M54,32 L70,16 L74,26 L58,34 Z" fill="#2C8B4E"/><path d="M37,50 C34,60 35,71 40,80" stroke="#EE9CC4" stroke-width="5" fill="none"/></svg>
          <span class="btv-word"><span class="btv-pink">btrav</span><span>stack</span></span>
        </a>
        <nav class="btv-nav" aria-label="Primary">
          <a class="navlink nav-hide" href="#philosophy">Philosophy</a>
          <a class="navlink nav-hide" href="#packages">Packages</a>
          <a class="navlink nav-hide" href="#ai">Why&nbsp;now</a>
          <ClientOnly>
            <button type="button" class="btv-toggle" :title="isDark ? 'Switch to light' : 'Switch to dark'" :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'" :aria-pressed="isDark" @click="toggleAppearance">
              <svg v-if="isDark" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2M12 19.5v2M4.8 4.8l1.4 1.4M17.8 17.8l1.4 1.4M2.5 12h2M19.5 12h2M4.8 19.2 6.2 17.8M17.8 6.2 19.2 4.8"/></svg>
              <svg v-else width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4 6.4 6.4 0 0 0 20 14.5Z"/></svg>
            </button>
          </ClientOnly>
          <a href="https://github.com/btravstack" target="_blank" rel="noopener" class="btv-slab-cta">GitHub</a>
        </nav>
      </div>
    </header>

    <!-- Manifesto hero — left-biased, typography only -->
    <section id="top" class="btv-hero">
      <div class="btv-hero-inner">
        <h1 class="btv-title">The <span class="btv-block">signature</span> is the doc.</h1>
        <p class="btv-lead">An expressive, robust TypeScript backend.</p>
        <p class="btv-sub">A small stack of type-safe building blocks for Node, built on two convictions: a signature should be enough to understand a system, and the fastest error is the best one. Declare the contract once — types, validation and feedback flow everywhere.</p>
        <div class="btv-cta-row">
          <a href="#packages" class="btv-link-cta">Explore the packages <span aria-hidden="true">↓</span></a>
          <a href="https://github.com/btravstack" target="_blank" rel="noopener" class="btv-link-cta btv-link-cta--quiet">View on GitHub <span aria-hidden="true">↗</span></a>
        </div>
        <p class="btv-parties">amqp-contract · temporal-contract · unthrown · demesne</p>
      </div>
    </section>

    <!-- The clauses -->
    <section id="philosophy" class="btv-section">
      <h2 class="btv-h2">Expressive to read. Robust to run.</h2>
      <p class="btv-section-lead">Each package is small, focused and does one thing well — but they share a worldview: expressive code you can understand from its signature alone, and robust code that fails fast enough to learn from.</p>
      <div class="btv-clauses">
        <div v-for="pr in principles" :key="pr.num" class="btv-clause">
          <h3 class="btv-clause-title"><span class="btv-clause-num">{{ pr.num }}</span>{{ pr.title }}</h3>
          <p class="btv-clause-body">{{ pr.body }}</p>
        </div>
      </div>
    </section>

    <!-- The packages — spec sheet -->
    <section id="packages" class="btv-section">
      <h2 class="btv-h2">Four libraries, one stack.</h2>
      <div class="btv-sheet">
        <article v-for="(p, i) in projects" :key="p.name" class="btv-row">
          <div class="btv-row-id">
            <img :src="`${p.logo}-${isDark ? 'dark' : 'light'}.svg`" width="48" height="48" :alt="`${p.name} logo`" class="btv-logo" />
            <span class="btv-row-num">§{{ i + 1 }}</span>
          </div>
          <div class="btv-row-main">
            <p class="btv-tag">{{ p.tag }}</p>
            <h3 class="btv-pname">{{ p.name }}</h3>
            <code class="btv-pkg">{{ p.pkg }}</code>
            <p class="btv-blurb">{{ p.blurb }}</p>
            <ul class="btv-points">
              <li v-for="pt in p.points" :key="pt">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2.5 8.5l3 3 8-8" stroke="var(--text-green)" stroke-width="2.4" stroke-linecap="square"/></svg>
                <span>{{ pt }}</span>
              </li>
            </ul>
          </div>
          <div class="btv-row-aside">
            <button type="button" class="btv-codeblk" :title="`Copy: ${p.install}`" @click="copy(p.install)">
              <span class="btv-cmd"><span class="btv-dollar">$ </span>{{ p.install }}</span>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="5.5" y="5.5" width="8" height="8" stroke="currentColor" stroke-width="1.4"/><path d="M3.5 10.5h-1A1.5 1.5 0 0 1 1 9V2.5A1.5 1.5 0 0 1 2.5 1H9a1.5 1.5 0 0 1 1.5 1.5v1" stroke="currentColor" stroke-width="1.4"/></svg>
            </button>
            <div class="btv-row-links">
              <a :href="p.docs" target="_blank" rel="noopener" class="btv-link-cta btv-link-sm">Docs <span aria-hidden="true">↗</span></a>
              <a :href="p.repo" target="_blank" rel="noopener" class="btv-link-cta btv-link-sm btv-link-cta--quiet">Repo <span aria-hidden="true">↗</span></a>
              <span class="btv-stars" :title="`${stars[p.repoFull]} GitHub stars`">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 1.3l2.06 4.17 4.6.67-3.33 3.24.78 4.58L8 11.8l-4.11 2.16.78-4.58L1.34 6.14l4.6-.67L8 1.3z"/></svg>
                {{ formatStars(stars[p.repoFull]) }}
              </span>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- Ink bleed — the AI block -->
    <section id="ai" class="btv-bleed">
      <div class="btv-bleed-inner">
        <h2 class="btv-h2 btv-bleed-h2">Written with AI. Judged by the compiler.</h2>
        <p class="btv-section-lead btv-bleed-lead">None of this was invented for AI — AI just raised the stakes. When an agent writes the code, expressiveness and fail-fast stop being a matter of taste and become infrastructure.</p>
        <div class="btv-bleed-grid">
          <div v-for="c in aiCards" :key="c.title" class="btv-bleed-item">
            <h3>{{ c.title }}</h3>
            <p>{{ c.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Inspirations — ruled index -->
    <section class="btv-section">
      <h2 class="btv-h2">Standing on good shoulders.</h2>
      <p class="btv-section-lead">btravstack borrows its instincts from the libraries that made TypeScript feel this way in the first place.</p>
      <div class="btv-insp-grid">
        <a v-for="i in inspirations" :key="i.name" :href="i.href" target="_blank" rel="noopener" class="btv-insp-card">
          <span class="btv-insp-name">{{ i.name }} <span aria-hidden="true">↗</span></span>
          <p class="btv-insp-body">{{ i.body }}</p>
        </a>
      </div>
    </section>

    <!-- Oversized block CTA -->
    <section class="btv-section btv-cta-wrap">
      <h2 class="btv-cta-h2">Build backends you can trust the types of.</h2>
      <p class="btv-cta-p">Star the projects, open an issue, or just read the docs. Everything is MIT-licensed and built in the open.</p>
      <a href="https://github.com/btravstack" target="_blank" rel="noopener" class="btv-block-cta">View on GitHub <span aria-hidden="true">↗</span></a>
    </section>

    <!-- Ft4 · colophon / signature block -->
    <footer class="btv-foot">
      <div class="btv-foot-inner">
        <div class="btv-foot-brand">
          <svg viewBox="0 0 100 120" width="22" height="26" fill="none" aria-hidden="true" focusable="false"><path d="M53,32 C77,32 87,48 85,63 C83,80 68,95 54,108 L50,112 L50,34 Z" fill="#8E1A52" transform="translate(3,-3)"/><path d="M50,30 C27,30 15,46 17,62 C19,80 35,96 50,110 C65,96 81,80 83,62 C85,46 73,30 50,30 Z" fill="#E0589A"/><path d="M46,108 L50,120 L54,108 Z" fill="#8E1A52"/><path d="M50,32 L41,10 L50,0 L59,10 Z" fill="#3DAE62"/><path d="M46,32 L30,16 L26,26 L42,34 Z" fill="#2C8B4E"/><path d="M54,32 L70,16 L74,26 L58,34 Z" fill="#2C8B4E"/><path d="M37,50 C34,60 35,71 40,80" stroke="#EE9CC4" stroke-width="5" fill="none"/></svg>
          <span class="btv-word btv-foot-word"><span class="btv-pink">btrav</span><span>stack</span></span>
        </div>
        <p class="btv-colophon">
          Type-safe building blocks for the TypeScript backend.
          Four packages: <a href="https://btravstack.github.io/amqp-contract/" target="_blank" rel="noopener">amqp-contract</a> ·
          <a href="https://btravstack.github.io/temporal-contract/" target="_blank" rel="noopener">temporal-contract</a> ·
          <a href="https://btravstack.github.io/unthrown/" target="_blank" rel="noopener">unthrown</a> ·
          <a href="https://btravstack.github.io/demesne/" target="_blank" rel="noopener">demesne</a> —
          all MIT-licensed and built in the open at <a href="https://github.com/btravstack" target="_blank" rel="noopener">github.com/btravstack</a>.
          Set in Bricolage Grotesque, Geist and JetBrains Mono. Printed in beetroot ink on cream.
        </p>
        <p class="btv-signature">Signed — <a href="https://github.com/btravers" target="_blank" rel="noopener">Benoit Travers</a> <span class="btv-sig-handle">(@btravers)</span> · MIT © 2026</p>
      </div>
    </footer>

    <Transition name="btv-toast">
      <div v-if="copied" class="btv-toast" role="status" aria-live="polite">Copied&nbsp; <span class="btv-toast-cmd">{{ copied }}</span></div>
    </Transition>
  </div>
</template>

<style scoped>
/* Hallmark · genre: editorial (brutalist) · macrostructure: Manifesto · design-system: design.md · designed-as-app
 * H1 knobs: alignment=left-bias, underlay=none, block-highlight on the noun
 * nav: N7 brutal slab (border=2px, tracked uppercase, CTA=filled slab)
 * features: F3 tabular spec-sheet (rule=2px between rows, numbers=mono)
 * CTA: oversized solid block (accent, far below fold) · footer: Ft4 dense colophon (mono, ragged-right, signature line)
 * theme: custom "beetroot riso" — tokens in @btravstack/theme · studied: no
 * contrast: pass (40–41) · nav/footer/hero slop: pass (42–45) · honest: pass (46) · chrome: pass (47)
 * tokens: pass (48) · responsive: pass (49) · mobile: pass (34, 49, 50–57 — verified 320/375/414/768)
 * pre-emit critique: P5 H4 E4 S5 R4 V5
 */
.btv {
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  font-family: var(--sans);
  font-size: var(--fs-body);
  line-height: var(--lh-body);
}

/* accent-as-text (AA in both schemes) */
.btv-pink { color: var(--display-accent); }

/* ── N7 · brutal slab nav ─────────────────────────────────────── */
.btv-head {
  position: sticky; top: 0; z-index: 50;
  background: var(--bg);
  border-bottom: 2px solid var(--border-2);
}
.btv-head-inner { max-width: var(--container); margin: 0 auto; padding: 0 28px; height: 62px; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
.btv-brand { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.btv-word { font-family: var(--display); font-weight: 800; font-size: 20px; letter-spacing: -0.01em; color: var(--text); white-space: nowrap; }
.btv-nav { display: flex; align-items: center; gap: 6px; }
.navlink {
  color: var(--text); text-decoration: none;
  font-family: var(--mono); font-weight: 600; font-size: 12.5px;
  text-transform: uppercase; letter-spacing: 0.08em;
  padding: 8px 10px; white-space: nowrap;
  border-bottom: 2px solid transparent;
  transition: border-color var(--speed-fast) var(--ease);
}
.navlink:hover { border-bottom-color: var(--text-accent); }
.btv-toggle {
  display: inline-flex; align-items: center; justify-content: center;
  width: 36px; height: 36px; margin: 0 4px;
  border: 2px solid var(--border-2);
  background: transparent; color: var(--text); cursor: pointer;
  transition: background-color var(--speed-fast) var(--ease), color var(--speed-fast) var(--ease);
}
.btv-toggle:hover { background: var(--text); color: var(--bg); }
.btv-toggle:active { transform: translateY(1px); }
.btv-slab-cta {
  display: inline-flex; align-items: center;
  font-family: var(--display); font-weight: 700; font-size: 13.5px;
  text-transform: uppercase; letter-spacing: 0.06em; text-decoration: none;
  background: var(--text); color: var(--bg);
  padding: 9px 16px; white-space: nowrap;
  border: 2px solid var(--border-2);
  transition: background-color var(--speed-fast) var(--ease), color var(--speed-fast) var(--ease);
}
.btv-slab-cta:hover { background: var(--bg); color: var(--text); }
.btv-slab-cta:active { transform: translateY(1px); }

/* ── Manifesto hero — left-biased, typography only ────────────── */
.btv-hero { max-width: var(--container); margin: 0 auto; padding: 72px 28px 96px; }
.btv-hero-inner { max-width: 880px; }
.btv-title {
  margin: 0;
  font-family: var(--display); font-weight: 800;
  text-transform: uppercase;
  font-size: var(--fs-hero); line-height: 1.05; letter-spacing: var(--tracking-hero);
  overflow-wrap: anywhere; min-width: 0;
}
.btv-block {
  background: var(--accent); color: var(--accent-contrast);
  padding: 0 0.14em;
  box-decoration-break: clone; -webkit-box-decoration-break: clone;
}
.btv-lead { margin: 26px 0 0; max-width: 34ch; font-family: var(--display); font-size: var(--fs-lead); font-weight: 600; line-height: var(--lh-snug); color: var(--text); }
.btv-sub { margin: 16px 0 0; max-width: 62ch; font-size: var(--fs-body-lg); line-height: var(--lh-body); color: var(--muted); }
.btv-cta-row { display: flex; flex-wrap: wrap; gap: 12px 28px; margin-top: 36px; }
.btv-link-cta {
  display: inline-flex; align-items: baseline; gap: 7px;
  color: var(--text); text-decoration: none;
  font-family: var(--display); font-weight: 700; font-size: 17px;
  border-bottom: 2px solid var(--text-accent);
  padding-bottom: 2px; white-space: nowrap;
  transition: color var(--speed-fast) var(--ease), border-color var(--speed-fast) var(--ease);
}
.btv-link-cta:hover { color: var(--text-accent); }
.btv-link-cta:active { color: var(--accent-deep); }
.btv-link-cta--quiet { border-bottom-color: var(--border); }
.btv-link-cta--quiet:hover { border-bottom-color: var(--text-accent); }
.btv-parties { margin: 40px 0 0; font-family: var(--mono); font-size: var(--fs-caption); color: var(--faint); }

/* ── Sections ─────────────────────────────────────────────────── */
.btv-section { max-width: var(--container); margin: 0 auto; padding: 72px 28px 24px; }
.btv-h2 {
  margin: 0;
  font-family: var(--display); font-weight: 700;
  font-size: var(--fs-h2); line-height: 1.1; letter-spacing: var(--tracking-tight);
  max-width: 28ch; overflow-wrap: anywhere; min-width: 0;
}
.btv-section-lead { margin: 16px 0 0; max-width: 60ch; font-size: 16.5px; line-height: 1.65; color: var(--muted); }

/* ── The clauses ──────────────────────────────────────────────── */
.btv-clauses { margin-top: 40px; border-top: 2px solid var(--border-2); }
.btv-clause { padding: 26px 0 28px; border-bottom: 2px solid var(--border-2); }
.btv-clause-title { margin: 0; font-family: var(--display); font-weight: 700; font-size: 20px; letter-spacing: var(--tracking-snug); }
.btv-clause-num { font-family: var(--mono); font-weight: 600; font-size: 15px; color: var(--text-accent); margin-right: 14px; }
.btv-clause-body { margin: 10px 0 0; max-width: 68ch; font-size: 15px; line-height: 1.65; color: var(--muted); }

/* ── The packages — F3 spec sheet ─────────────────────────────── */
.btv-sheet { margin-top: 40px; border-top: 2px solid var(--border-2); }
.btv-row {
  display: grid;
  grid-template-columns: 84px minmax(0, 1fr) 320px;
  gap: 24px;
  padding: 30px 0 34px;
  border-bottom: 2px solid var(--border-2);
}
.btv-row-id { display: flex; flex-direction: column; align-items: flex-start; gap: 12px; }
.btv-logo { display: block; width: 48px; height: 48px; object-fit: contain; }
.btv-row-num { font-family: var(--mono); font-weight: 600; font-size: 14px; color: var(--faint); }
.btv-tag { margin: 0; font-family: var(--mono); font-size: 11.5px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--faint); }
.btv-pname { margin: 6px 0 0; font-family: var(--display); font-weight: 800; font-size: 24px; letter-spacing: var(--tracking-snug); color: var(--text); }
.btv-pkg { display: inline-block; margin: 5px 0 0; font-family: var(--mono); font-size: 13px; color: var(--text-accent); background: none; padding: 0; }
.btv-blurb { margin: 12px 0 0; max-width: 58ch; font-size: 14.5px; line-height: 1.6; color: var(--muted); }
.btv-points { list-style: none; margin: 14px 0 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.btv-points li { display: flex; align-items: flex-start; gap: 9px; font-size: 14px; line-height: 1.4; color: var(--text); }
.btv-points svg { margin-top: 2px; flex: none; }
.btv-row-aside { display: flex; flex-direction: column; gap: 16px; }
.btv-codeblk {
  width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 10px;
  font-family: var(--mono); font-size: 12px;
  background: var(--text); color: var(--bg);
  border: 2px solid var(--border-2);
  padding: 11px 13px; cursor: pointer; text-align: left;
  transition: transform var(--speed-fast) var(--ease), box-shadow var(--speed-fast) var(--ease);
}
.btv-codeblk:hover { transform: translate(-2px, -2px); box-shadow: 4px 4px 0 var(--accent); }
.btv-codeblk:active { transform: translate(0, 0); box-shadow: none; }
.btv-cmd { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.btv-dollar { color: var(--accent-soft); user-select: none; }
.btv-row-links { display: flex; align-items: center; gap: 18px; }
.btv-link-sm { font-size: 14px; }
.btv-stars { display: inline-flex; align-items: center; gap: 5px; margin-left: auto; font-family: var(--mono); font-size: 13px; font-variant-numeric: tabular-nums; color: var(--faint); }

/* ── Ink bleed — the AI block ─────────────────────────────────── */
.btv-bleed { margin-top: 72px; background: var(--text); color: var(--bg); }
.btv-bleed-inner { max-width: var(--container); margin: 0 auto; padding: 72px 28px 76px; }
.btv-bleed-h2 { color: var(--bg); }
.btv-bleed-lead { color: color-mix(in srgb, var(--bg) 78%, var(--text)); }
.btv-bleed-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 32px; margin-top: 44px; }
.btv-bleed-item { border-top: 2px solid var(--accent); padding-top: 18px; }
.btv-bleed-item h3 { margin: 0; font-family: var(--display); font-weight: 700; font-size: 18px; letter-spacing: var(--tracking-snug); color: var(--bg); }
.btv-bleed-item p { margin: 10px 0 0; font-size: 14.5px; line-height: 1.6; color: color-mix(in srgb, var(--bg) 75%, var(--text)); }

/* ── Inspirations — ruled index ───────────────────────────────── */
.btv-insp-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 48px; margin-top: 36px; }
.btv-insp-card { display: block; text-decoration: none; border-top: 2px solid var(--border-2); padding: 18px 0 22px; }
.btv-insp-name { font-family: var(--mono); font-weight: 600; font-size: 15.5px; color: var(--text); transition: color var(--speed-fast) var(--ease); }
.btv-insp-card:hover .btv-insp-name { color: var(--text-accent); }
.btv-insp-body { margin: 8px 0 0; font-size: 14px; line-height: 1.55; color: var(--muted); }

/* ── Oversized block CTA ──────────────────────────────────────── */
.btv-cta-wrap { padding-top: 64px; padding-bottom: 96px; }
.btv-cta-h2 { margin: 0; font-family: var(--display); font-weight: 700; letter-spacing: var(--tracking-tight); font-size: clamp(24px, 3.4vw, 34px); max-width: 24ch; }
.btv-cta-p { margin: 14px 0 34px; max-width: 52ch; font-size: 16px; line-height: 1.6; color: var(--muted); }
.btv-block-cta {
  display: inline-flex; align-items: baseline; gap: 12px;
  background: var(--accent); color: var(--accent-contrast);
  font-family: var(--display); font-weight: 800; font-size: clamp(19px, 2.2vw, 24px);
  text-transform: uppercase; letter-spacing: 0.02em; text-decoration: none;
  padding: 20px 36px; white-space: nowrap;
  border: 2px solid var(--border-2);
  box-shadow: var(--shadow-accent);
  transition: transform var(--speed-fast) var(--ease), box-shadow var(--speed-fast) var(--ease);
}
.btv-block-cta:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 var(--accent-deep); }
.btv-block-cta:active { transform: translate(2px, 2px); box-shadow: none; }

/* ── Ft4 · colophon footer ────────────────────────────────────── */
.btv-foot { border-top: 2px solid var(--border-2); }
.btv-foot-inner { max-width: var(--container); margin: 0 auto; padding: 40px 28px 48px; }
.btv-foot-brand { display: flex; align-items: center; gap: 9px; }
.btv-foot-word { font-size: 17px; }
.btv-colophon { margin: 20px 0 0; max-width: 74ch; font-family: var(--mono); font-size: 13px; line-height: 1.75; color: var(--muted); }
.btv-colophon a { color: var(--text); text-decoration: underline; text-decoration-color: var(--text-accent); text-underline-offset: 3px; white-space: nowrap; }
.btv-colophon a:hover { color: var(--text-accent); }
.btv-signature { margin: 22px 0 0; font-family: var(--mono); font-size: 13px; color: var(--faint); }
.btv-signature a { color: var(--text); text-decoration: underline; text-decoration-color: var(--text-accent); text-underline-offset: 3px; }
.btv-signature a:hover { color: var(--text-accent); }
.btv-sig-handle { color: var(--faint); }

/* ── Toast (silent success) ───────────────────────────────────── */
.btv-toast {
  position: fixed; bottom: 26px; left: 50%; transform: translateX(-50%); z-index: 80;
  background: var(--text); color: var(--bg);
  border: 2px solid var(--border-2);
  font-family: var(--mono); font-size: 13px; padding: 10px 16px;
  box-shadow: var(--shadow-toast);
}
.btv-toast-cmd { color: var(--accent-soft); }
.btv-toast-enter-active, .btv-toast-leave-active { transition: opacity var(--speed) var(--ease), transform var(--speed) var(--ease); }
.btv-toast-enter-from, .btv-toast-leave-to { opacity: 0; transform: translate(-50%, 8px); }

/* ── Responsive ───────────────────────────────────────────────── */
@media (max-width: 960px) {
  .btv-row { grid-template-columns: 64px minmax(0, 1fr); }
  .btv-row-aside { grid-column: 2; max-width: 420px; }
  .btv-bleed-grid { grid-template-columns: minmax(0, 1fr); gap: 26px; }
}
@media (max-width: 640px) {
  .btv-hero { padding: 48px 20px 64px; }
  .btv-section { padding: 56px 20px 20px; }
  .btv-head-inner, .btv-bleed-inner, .btv-foot-inner { padding-left: 20px; padding-right: 20px; }
  .btv-row { grid-template-columns: minmax(0, 1fr); gap: 16px; }
  .btv-row-id { flex-direction: row; align-items: center; }
  .btv-row-aside { grid-column: 1; max-width: none; }
  .btv-insp-grid { grid-template-columns: minmax(0, 1fr); }
  .btv-stars { margin-left: 0; }
  .btv-block-cta { padding: 16px 22px; font-size: 18px; }
}
@media (max-width: 560px) {
  .nav-hide { display: none !important; }
  .btv-head-inner { padding: 0 14px; gap: 12px; }
  .btv-word { font-size: 18px; }
  .btv-slab-cta { padding: 8px 12px; }
}
@media (prefers-reduced-motion: reduce) {
  .btv-codeblk, .btv-block-cta, .btv-toggle, .btv-slab-cta { transition: none; }
  .btv-toast-enter-active, .btv-toast-leave-active { transition: opacity 0.12s var(--ease); }
  .btv-toast-enter-from, .btv-toast-leave-to { transform: translateX(-50%); }
}
</style>
