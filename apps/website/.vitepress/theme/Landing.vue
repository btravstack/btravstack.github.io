<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
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
  key: string;
  tag: string;
  name: string;
  pkg: string;
  npm: string;
  logo: string;
  repoFull: string;
  stars0: number;
  blurb: string;
  points: string[];
  install: string;
  repo: string;
  docs: string;
}

// unthrown leads: it's the base the two contract packages build on, and the
// most versatile of the three.
const projects: Project[] = [
  {
    key: "unthrown", tag: "Errors", name: "unthrown", pkg: "unthrown", npm: "unthrown",
    logo: "/logos/unthrown", repoFull: "btravstack/unthrown", stars0: 1,
    blurb: "Explicit errors as values — with a separate defect channel for the unexpected. Only a true defect ever throws, and only at unwrap.",
    points: ["Errors as values, typed in E", "A separate defect channel", "Zero runtime dependencies"],
    install: "pnpm add unthrown",
    repo: "https://github.com/btravstack/unthrown", docs: "https://btravstack.github.io/unthrown/",
  },
  {
    key: "amqp", tag: "Messaging", name: "amqp-contract", pkg: "@amqp-contract/contract", npm: "@amqp-contract/contract",
    logo: "/logos/amqp-contract", repoFull: "btravstack/amqp-contract", stars0: 18,
    blurb: "Type-safe contracts for AMQP & RabbitMQ. Define your exchanges, queues and messages once — get types and runtime validation on both ends.",
    points: ["End-to-end type safety", "Reliable retry with Dead Letter Queues", "AsyncAPI 3.0 generation"],
    install: "pnpm add @amqp-contract/contract",
    repo: "https://github.com/btravstack/amqp-contract", docs: "https://btravstack.github.io/amqp-contract/",
  },
  {
    key: "temporal", tag: "Workflows", name: "temporal-contract", pkg: "@temporal-contract/contract", npm: "@temporal-contract/contract",
    logo: "/logos/temporal-contract", repoFull: "btravstack/temporal-contract", stars0: 7,
    blurb: "Type-safe contracts for Temporal.io. End-to-end types and automatic validation across workflows, activities and clients.",
    points: ["Zod validation at every boundary", "Compile-time implementation checks", "Result / Future error handling"],
    install: "pnpm add @temporal-contract/contract",
    repo: "https://github.com/btravstack/temporal-contract", docs: "https://btravstack.github.io/temporal-contract/",
  },
];

/** Every repo shown on the page — the three published packages. */
const allRepos = projects;

const stars = reactive<Record<string, number>>(
  Object.fromEntries(allRepos.map((p) => [p.repoFull, p.stars0])),
);
const totalStars = computed(() => Object.values(stars).reduce((a, b) => a + b, 0));
// npm downloads (last month, all packages) — real numbers only: shows "—" until fetched.
const npmDownloads = ref<number | null>(null);

const copied = ref<string | null>(null);
let timer: ReturnType<typeof setTimeout> | undefined;

function copy(text: string) {
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).catch(() => {});
  copied.value = text;
  clearTimeout(timer);
  timer = setTimeout(() => (copied.value = null), 1600);
}

function formatCount(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, "")}k` : String(n);
}

onMounted(() => {
  for (const p of allRepos) {
    fetch(`https://api.github.com/repos/${p.repoFull}`, { headers: { Accept: "application/vnd.github+json" } })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => { if (typeof d.stargazers_count === "number") stars[p.repoFull] = d.stargazers_count; })
      .catch(() => {});
  }
  Promise.all(projects.map((p) =>
    fetch(`https://api.npmjs.org/downloads/point/last-month/${encodeURIComponent(p.npm)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => (typeof d.downloads === "number" ? d.downloads : 0))
      .catch(() => 0),
  )).then((counts) => {
    const sum = counts.reduce((a, b) => a + b, 0);
    if (sum > 0) npmDownloads.value = sum;
  }).catch(() => {});
});
</script>

<template>
  <div class="btv">
    <!-- N1b · three-section bar -->
    <header class="btv-head">
      <div class="btv-head-inner">
        <a href="#top" class="btv-brand">
          <svg viewBox="-2 -12 104 148" width="21" height="30" fill="none" aria-hidden="true" focusable="false"><g transform="rotate(-6 50 68)"><path d="M46,34 C44,26 44,18 47,10" stroke="#2C8B4E" stroke-width="3.6" stroke-linecap="round" fill="none"/><path d="M47,10 C40,7 37,-2 43,-6 C50,-10 56,-3 54,3 C53,7 51,9 47,10 Z" fill="#3DAE62"/><path d="M41,36 C34,31 26,30 21,34 C16,38 19,45 26,45 C32,45 38,41 41,36 Z" fill="#2C8B4E"/><path d="M57,34 C62,27 70,24 76,28 C81,32 78,39 71,40 C65,40 60,37 57,34 Z" fill="#3DAE62"/><g transform="rotate(-38 16 66)"><rect x="4" y="62" width="20" height="9" rx="4.5" fill="#CE3D80"/></g><g transform="rotate(24 84 78)"><rect x="76" y="74" width="18" height="9" rx="4.5" fill="#8E1A52"/></g><path d="M50,32 C28,31 14,45 14,62 C14,81 30,98 44,108 C47,111 48,114 50,116 C52,114 53,111 56,108 C70,98 86,81 86,62 C86,45 72,31 50,32 Z" fill="#CE3D80"/><path d="M63,35 C76,41 86,50 86,62 C86,79 73,94 58,106 C69,91 78,76 78,62 C78,51 72,42 63,35 Z" fill="#8E1A52" opacity="0.85"/><path d="M27,47 C23,53 22,61 24,68" stroke="#EE9CC4" stroke-width="3.4" stroke-linecap="round" fill="none" opacity="0.55"/><circle cx="38" cy="60" r="5.2" fill="#3A0D24"/><circle cx="39.7" cy="58.3" r="1.8" fill="#FFFFFF"/><circle cx="63" cy="60" r="5.2" fill="#3A0D24"/><circle cx="64.7" cy="58.3" r="1.8" fill="#FFFFFF"/><path d="M41,71 Q50.5,80 60,71" stroke="#3A0D24" stroke-width="3.4" stroke-linecap="round" fill="none"/><circle cx="29" cy="69" r="4.2" fill="#EE9CC4" opacity="0.75"/><circle cx="72" cy="69" r="4.2" fill="#EE9CC4" opacity="0.75"/><path d="M50,116 C49,121 52,124 49,129 C47,132 44,132 43,130" stroke="#8E1A52" stroke-width="2.8" stroke-linecap="round" fill="none"/></g></svg>
          <span class="btv-word"><span class="btv-pink">Btrav</span><span>Stack</span></span>
        </a>
        <nav class="btv-links nav-hide" aria-label="Primary">
          <a class="navlink" href="#packages">The stack</a>
          <a class="navlink" href="#philosophy">Philosophy</a>
          <a class="navlink" href="#ai">Why&nbsp;now</a>
        </nav>
        <div class="btv-actions">
          <ClientOnly>
            <button type="button" class="btv-toggle" :title="isDark ? 'Switch to light' : 'Switch to dark'" :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'" :aria-pressed="isDark" @click="toggleAppearance">
              <svg v-if="isDark" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2M12 19.5v2M4.8 4.8l1.4 1.4M17.8 17.8l1.4 1.4M2.5 12h2M19.5 12h2M4.8 19.2 6.2 17.8M17.8 6.2 19.2 4.8"/></svg>
              <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4 6.4 6.4 0 0 0 20 14.5Z"/></svg>
            </button>
          </ClientOnly>
          <a href="https://github.com/btravstack" target="_blank" rel="noopener" class="btv-cta btv-cta--nav">GitHub</a>
        </div>
      </div>
    </header>

    <!-- Hero — wordmark-led, mascot beside, real stats beneath -->
    <section id="top" class="btv-hero">
      <div class="btv-hero-grid">
        <div class="btv-hero-copy">
          <h1 class="btv-title"><span class="btv-pink">Btrav</span>Stack</h1>
          <p class="btv-tagline">An expressive, robust <span class="btv-tagline-mark">TypeScript</span> backend.</p>
          <p class="btv-sub">A small stack of type-safe building blocks for Node, built on two convictions: a signature should be enough to understand a system, and the fastest error is the best one. Declare the contract once — types, validation and feedback flow everywhere.</p>
          <div class="btv-cta-row">
            <a href="#packages" class="btv-cta">Browse the stack</a>
            <a href="https://github.com/btravstack" target="_blank" rel="noopener" class="btv-cta btv-cta--ghost">View on GitHub <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div class="btv-float">
          <svg viewBox="-2 -12 104 148" width="131" height="186" fill="none" aria-hidden="true" focusable="false"><g transform="rotate(-6 50 68)"><path d="M46,34 C44,26 44,18 47,10" stroke="#2C8B4E" stroke-width="3.6" stroke-linecap="round" fill="none"/><path d="M47,10 C40,7 37,-2 43,-6 C50,-10 56,-3 54,3 C53,7 51,9 47,10 Z" fill="#3DAE62"/><path d="M41,36 C34,31 26,30 21,34 C16,38 19,45 26,45 C32,45 38,41 41,36 Z" fill="#2C8B4E"/><path d="M57,34 C62,27 70,24 76,28 C81,32 78,39 71,40 C65,40 60,37 57,34 Z" fill="#3DAE62"/><g transform="rotate(-38 16 66)"><rect x="4" y="62" width="20" height="9" rx="4.5" fill="#CE3D80"/></g><g transform="rotate(24 84 78)"><rect x="76" y="74" width="18" height="9" rx="4.5" fill="#8E1A52"/></g><path d="M50,32 C28,31 14,45 14,62 C14,81 30,98 44,108 C47,111 48,114 50,116 C52,114 53,111 56,108 C70,98 86,81 86,62 C86,45 72,31 50,32 Z" fill="#CE3D80"/><path d="M63,35 C76,41 86,50 86,62 C86,79 73,94 58,106 C69,91 78,76 78,62 C78,51 72,42 63,35 Z" fill="#8E1A52" opacity="0.85"/><path d="M27,47 C23,53 22,61 24,68" stroke="#EE9CC4" stroke-width="3.4" stroke-linecap="round" fill="none" opacity="0.55"/><circle cx="38" cy="60" r="5.2" fill="#3A0D24"/><circle cx="39.7" cy="58.3" r="1.8" fill="#FFFFFF"/><circle cx="63" cy="60" r="5.2" fill="#3A0D24"/><circle cx="64.7" cy="58.3" r="1.8" fill="#FFFFFF"/><path d="M41,71 Q50.5,80 60,71" stroke="#3A0D24" stroke-width="3.4" stroke-linecap="round" fill="none"/><circle cx="29" cy="69" r="4.2" fill="#EE9CC4" opacity="0.75"/><circle cx="72" cy="69" r="4.2" fill="#EE9CC4" opacity="0.75"/><path d="M50,116 C49,121 52,124 49,129 C47,132 44,132 43,130" stroke="#8E1A52" stroke-width="2.8" stroke-linecap="round" fill="none"/></g></svg>
        </div>
      </div>
      <ClientOnly>
        <div class="btv-stats" role="list" aria-label="Live project numbers">
          <div class="btv-stat" role="listitem">
            <span class="btv-stat-n">{{ formatCount(totalStars) }}</span>
            <span class="btv-stat-l">GitHub stars</span>
          </div>
          <div class="btv-stat" role="listitem">
            <span class="btv-stat-n">{{ npmDownloads === null ? "—" : formatCount(npmDownloads) }}</span>
            <span class="btv-stat-l">npm downloads / month</span>
          </div>
          <div class="btv-stat" role="listitem">
            <span class="btv-stat-n">{{ projects.length }}</span>
            <span class="btv-stat-l">packages, MIT-licensed</span>
          </div>
        </div>
      </ClientOnly>
    </section>

    <!-- The stack — each package in its own color -->
    <section id="packages" class="btv-section">
      <h2 class="btv-h2">Three libraries, one stack.</h2>
      <p class="btv-section-lead">Errors, messaging and workflows — three focused packages that compose into one coherent backend.</p>
      <div class="btv-panels">
        <article v-for="p in projects" :key="p.name" class="btv-panel" :style="{ '--pkg': `var(--pkg-${p.key})` }">
          <div class="btv-panel-top">
            <img :src="`${p.logo}-${isDark ? 'dark' : 'light'}.svg`" width="52" height="52" :alt="`${p.name} logo`" class="btv-logo" />
            <span class="btv-stars" :title="`${stars[p.repoFull]} GitHub stars`">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 1.3l2.06 4.17 4.6.67-3.33 3.24.78 4.58L8 11.8l-4.11 2.16.78-4.58L1.34 6.14l4.6-.67L8 1.3z"/></svg>
              {{ formatCount(stars[p.repoFull]) }}
            </span>
          </div>
          <p class="btv-tag"><span class="btv-dot" aria-hidden="true"></span>{{ p.tag }}</p>
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

    <!-- Philosophy -->
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

    <!-- Why now -->
    <section id="ai" class="btv-section">
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
      <p class="btv-section-lead">BtravStack borrows its instincts from the libraries that made TypeScript feel this way in the first place.</p>
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

    <!-- Ft3 · index footer (genuine hub for the four docs sites) -->
    <footer class="btv-foot">
      <div class="btv-foot-grid">
        <div class="btv-foot-brandcol">
          <div class="btv-foot-brand">
            <svg viewBox="-2 -12 104 148" width="18" height="25" fill="none" aria-hidden="true" focusable="false"><g transform="rotate(-6 50 68)"><path d="M46,34 C44,26 44,18 47,10" stroke="#2C8B4E" stroke-width="3.6" stroke-linecap="round" fill="none"/><path d="M47,10 C40,7 37,-2 43,-6 C50,-10 56,-3 54,3 C53,7 51,9 47,10 Z" fill="#3DAE62"/><path d="M41,36 C34,31 26,30 21,34 C16,38 19,45 26,45 C32,45 38,41 41,36 Z" fill="#2C8B4E"/><path d="M57,34 C62,27 70,24 76,28 C81,32 78,39 71,40 C65,40 60,37 57,34 Z" fill="#3DAE62"/><g transform="rotate(-38 16 66)"><rect x="4" y="62" width="20" height="9" rx="4.5" fill="#CE3D80"/></g><g transform="rotate(24 84 78)"><rect x="76" y="74" width="18" height="9" rx="4.5" fill="#8E1A52"/></g><path d="M50,32 C28,31 14,45 14,62 C14,81 30,98 44,108 C47,111 48,114 50,116 C52,114 53,111 56,108 C70,98 86,81 86,62 C86,45 72,31 50,32 Z" fill="#CE3D80"/><path d="M63,35 C76,41 86,50 86,62 C86,79 73,94 58,106 C69,91 78,76 78,62 C78,51 72,42 63,35 Z" fill="#8E1A52" opacity="0.85"/><path d="M27,47 C23,53 22,61 24,68" stroke="#EE9CC4" stroke-width="3.4" stroke-linecap="round" fill="none" opacity="0.55"/><circle cx="38" cy="60" r="5.2" fill="#3A0D24"/><circle cx="39.7" cy="58.3" r="1.8" fill="#FFFFFF"/><circle cx="63" cy="60" r="5.2" fill="#3A0D24"/><circle cx="64.7" cy="58.3" r="1.8" fill="#FFFFFF"/><path d="M41,71 Q50.5,80 60,71" stroke="#3A0D24" stroke-width="3.4" stroke-linecap="round" fill="none"/><circle cx="29" cy="69" r="4.2" fill="#EE9CC4" opacity="0.75"/><circle cx="72" cy="69" r="4.2" fill="#EE9CC4" opacity="0.75"/><path d="M50,116 C49,121 52,124 49,129 C47,132 44,132 43,130" stroke="#8E1A52" stroke-width="2.8" stroke-linecap="round" fill="none"/></g></svg>
            <span class="btv-word btv-foot-word"><span class="btv-pink">Btrav</span><span>Stack</span></span>
          </div>
          <p class="btv-foot-tag">Type-safe building blocks for the TypeScript backend. Open source, MIT.</p>
        </div>
        <nav class="btv-foot-col" aria-label="Documentation">
          <p class="btv-foot-h">Docs</p>
          <a v-for="p in allRepos" :key="p.name" :href="p.docs" target="_blank" rel="noopener" class="btv-link btv-link--quiet">{{ p.name }}</a>
        </nav>
        <nav class="btv-foot-col" aria-label="Source code">
          <p class="btv-foot-h">GitHub</p>
          <a v-for="p in allRepos" :key="p.name" :href="p.repo" target="_blank" rel="noopener" class="btv-link btv-link--quiet">{{ p.name }}</a>
          <a href="https://github.com/btravstack" target="_blank" rel="noopener" class="btv-link btv-link--quiet">Organization</a>
        </nav>
      </div>
      <div class="btv-foot-bottom">
        <span>MIT © 2026 <a href="https://github.com/btravers" target="_blank" rel="noopener" class="btv-link btv-link--quiet">Benoit Travers</a></span>
      </div>
    </footer>

    <Transition name="btv-toast">
      <div v-if="copied" class="btv-toast" role="status" aria-live="polite">Copied&nbsp; <span class="btv-toast-cmd">{{ copied }}</span></div>
    </Transition>
  </div>
</template>

<style scoped>
/* Hallmark · genre: atmospheric (studied) · macrostructure: Ecosystem Index · design-system: design.md · designed-as-app
 * theme: studied-DNA (source: https://tanstack.com/) · studied: yes · DNA-source: url + screenshot
 * observed-DNA: neutral-black canvas · per-library accents · heavy grotesque display · real-stats hero · elevated panels
 * nav: N1b three-section · footer: Ft3 index (genuine hub for 4 docs sites) · hero: wordmark-led + T4 stat strip (real numbers only)
 * enrichment: H9 original gradient mascot (Tier-B, kept) — the one character moment
 * contrast: pass (40–41) · honest: pass (46 — stars live from GitHub, downloads live from npm or "—") · chrome: pass (47)
 * tokens: pass (48) · responsive: pass (49)
 * pre-emit critique: P5 H4 E4 S5 R4 V4
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

/* ── N1b · three-section bar ──────────────────────────────────── */
.btv-head {
  position: sticky; top: 0; z-index: 50;
  backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
  background: var(--glass);
  border-bottom: 1px solid var(--border);
}
.btv-head-inner {
  max-width: var(--container); margin: 0 auto; padding: 0 24px; height: 62px;
  display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 16px;
}
.btv-brand { display: flex; align-items: center; gap: 9px; text-decoration: none; justify-self: start; }
.btv-word { font-family: var(--display); font-weight: 800; font-size: 18px; letter-spacing: var(--tracking-snug); color: var(--text); white-space: nowrap; }
.btv-links { display: flex; align-items: center; gap: 4px; justify-self: center; }
.navlink {
  color: var(--muted); text-decoration: none; font-weight: 500; font-size: 14.5px;
  padding: 8px 12px; border-radius: var(--radius-sm); white-space: nowrap;
  transition: color var(--speed-fast) var(--ease), background-color var(--speed-fast) var(--ease);
}
.navlink:hover { color: var(--text); background: var(--accent-wash); }
.navlink:active { color: var(--text-accent); }
.btv-actions { display: flex; align-items: center; gap: 10px; justify-self: end; }
.btv-toggle {
  display: inline-flex; align-items: center; justify-content: center;
  width: 34px; height: 34px;
  border: 1px solid var(--border-2); border-radius: var(--radius-sm);
  background: transparent; color: var(--muted); cursor: pointer;
  transition: color var(--speed-fast) var(--ease), background-color var(--speed-fast) var(--ease);
}
.btv-toggle:hover { color: var(--text); background: var(--accent-wash); }
.btv-toggle:active { transform: translateY(1px); }

/* ── CTAs ─────────────────────────────────────────────────────── */
.btv-cta {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--accent); color: var(--accent-contrast);
  font-family: var(--display); font-weight: 700; font-size: 15px;
  text-decoration: none; white-space: nowrap;
  padding: 11px 20px; border-radius: var(--radius);
  transition: background-color var(--speed-fast) var(--ease), transform var(--speed-fast) var(--ease);
}
.btv-cta:hover { background: var(--accent-hover); transform: translateY(-1px); }
.btv-cta:active { background: var(--accent-deep); color: var(--bt-cream); transform: translateY(0); }
.btv-cta--ghost { background: transparent; color: var(--text); border: 1px solid var(--border-2); }
.btv-cta--ghost:hover { background: var(--accent-wash); }
.btv-cta--ghost:active { background: var(--accent-wash-2); color: var(--text); }
.btv-cta--nav { padding: 8px 15px; font-size: 14px; }
.btv-cta--big { font-size: 16px; padding: 13px 26px; }

/* ── Hero — wordmark-led + stats ──────────────────────────────── */
.btv-hero { max-width: var(--container); margin: 0 auto; padding: 64px 24px 84px; }
.btv-hero-grid {
  display: grid; grid-template-columns: minmax(0, 8fr) minmax(0, 4fr);
  gap: 40px; align-items: center;
}
.btv-title {
  margin: 0;
  font-family: var(--display); font-weight: 800;
  font-size: var(--fs-hero); line-height: var(--lh-tight); letter-spacing: var(--tracking-hero);
  overflow-wrap: anywhere; min-width: 0;
}
.btv-tagline { margin: 14px 0 0; font-family: var(--display); font-weight: 600; font-size: var(--fs-lead); line-height: var(--lh-snug); color: var(--text); }
.btv-tagline-mark { color: var(--text-accent); }
.btv-sub { margin: 16px 0 0; max-width: 58ch; font-size: var(--fs-body-lg); line-height: var(--lh-body); color: var(--muted); }
.btv-cta-row { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 30px; }
.btv-float {
  display: inline-flex; justify-self: center;
  animation: btv-bob 6s var(--ease) infinite;
  filter: drop-shadow(0 18px 40px color-mix(in srgb, var(--accent-deep) 45%, transparent));
}
.btv-stats {
  display: flex; flex-wrap: wrap; gap: 14px 56px;
  margin-top: 52px; padding-top: 26px;
  border-top: 1px solid var(--border);
}
.btv-stat { display: flex; flex-direction: column; gap: 2px; }
.btv-stat-n { font-family: var(--display); font-weight: 800; font-size: 30px; letter-spacing: var(--tracking-tight); font-variant-numeric: tabular-nums; color: var(--text); }
.btv-stat-l { font-size: 13px; color: var(--faint); }

/* ── Sections ─────────────────────────────────────────────────── */
.btv-section { max-width: var(--container); margin: 0 auto; padding: 64px 24px 8px; scroll-margin-top: 76px; }
.btv-h2 {
  margin: 0;
  font-family: var(--display); font-weight: 800;
  font-size: var(--fs-h2); line-height: 1.15; letter-spacing: var(--tracking-tight);
  max-width: 26ch; overflow-wrap: anywhere; min-width: 0;
}
.btv-section-lead { margin: 12px 0 0; max-width: 60ch; font-size: 16px; line-height: 1.65; color: var(--muted); }

/* ── The stack — per-package accent panels ────────────────────── */
.btv-panels { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; margin-top: 34px; }
.btv-panel {
  display: flex; flex-direction: column;
  background: var(--card); border-radius: var(--radius-lg); padding: 26px;
  min-width: 0;
  transition: transform var(--speed) var(--ease), box-shadow var(--speed) var(--ease);
}
.btv-panel:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 32px -12px color-mix(in srgb, var(--pkg) 45%, transparent);
}
.btv-panel-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
.btv-logo { display: block; flex: none; width: 52px; height: 52px; object-fit: contain; }
.btv-stars { display: inline-flex; align-items: center; gap: 5px; font-family: var(--mono); font-size: 13px; font-variant-numeric: tabular-nums; color: var(--faint); }
.btv-tag {
  margin: 16px 0 0; display: flex; align-items: center; gap: 7px;
  font-family: var(--mono); font-size: 11.5px; font-weight: 500;
  letter-spacing: var(--tracking-eyebrow); text-transform: uppercase;
  color: var(--muted);
}
.btv-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--pkg); flex: none; }
.btv-pname {
  margin: 6px 0 0; font-family: var(--display); font-weight: 800; font-size: 23px;
  letter-spacing: var(--tracking-snug);
  color: var(--pkg);
  overflow-wrap: anywhere; min-width: 0;
}
:global(html:not(.dark)) .btv-pname { color: color-mix(in srgb, var(--pkg), #000 30%); }
.btv-pkg { display: inline-block; margin: 5px 0 0; font-family: var(--mono); font-size: 13px; color: var(--muted); background: none; padding: 0; }
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
.btv-codeblk:hover { background: color-mix(in srgb, var(--code-bg) 78%, var(--pkg)); }
.btv-codeblk:active { background: color-mix(in srgb, var(--code-bg) 65%, var(--pkg)); }
.btv-cmd { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.btv-dollar { color: var(--text-accent); user-select: none; }
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
.btv-cols { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; margin-top: 34px; }
.btv-col { background: var(--card); border-radius: var(--radius-lg); padding: 22px; }
.btv-num { margin: 0; font-family: var(--mono); font-weight: 500; font-size: 13px; color: var(--text-accent); }
.btv-col h3 { margin: 10px 0 0; font-family: var(--display); font-weight: 700; font-size: var(--fs-h4); letter-spacing: var(--tracking-snug); color: var(--text); }
.btv-col p:last-child { margin: 8px 0 0; font-size: 14.5px; line-height: 1.6; color: var(--muted); }

/* ── Why now ──────────────────────────────────────────────────── */
.btv-ai-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; margin-top: 34px; }
.btv-ai-card { background: var(--card-soft); border-radius: var(--radius-lg); padding: 22px; }
.btv-ai-card h3 { margin: 0; font-family: var(--display); font-weight: 700; font-size: 16.5px; letter-spacing: var(--tracking-snug); color: var(--text); }
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
.btv-close { padding-bottom: 88px; }
.btv-close-p { margin-bottom: 28px; }

/* ── Ft3 · index footer (hub) ─────────────────────────────────── */
.btv-foot { border-top: 1px solid var(--border); background: var(--card); }
.btv-foot-grid {
  max-width: var(--container); margin: 0 auto; padding: 44px 24px 26px;
  display: grid; grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr) minmax(0, 1fr);
  gap: 32px;
}
.btv-foot-brand { display: flex; align-items: center; gap: 9px; }
.btv-foot-word { font-size: 16px; }
.btv-foot-tag { margin: 12px 0 0; max-width: 26ch; font-size: 13.5px; line-height: 1.6; color: var(--faint); }
.btv-foot-col { display: flex; flex-direction: column; align-items: flex-start; gap: 10px; }
.btv-foot-h { margin: 0 0 2px; font-family: var(--mono); font-size: 11.5px; letter-spacing: var(--tracking-eyebrow); text-transform: uppercase; color: var(--faint); }
.btv-foot-col .btv-link { font-size: 13.5px; }
.btv-foot-bottom {
  max-width: var(--container); margin: 0 auto; padding: 16px 24px 30px;
  border-top: 1px solid var(--border);
  font-size: 13px; color: var(--faint);
}

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
  .btv-hero-grid { grid-template-columns: minmax(0, 1fr); gap: 28px; }
  .btv-float { order: -1; justify-self: start; }
  .btv-float svg { width: 110px; height: 136px; }
  .btv-panels { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .btv-cols, .btv-ai-grid { grid-template-columns: minmax(0, 1fr); }
  .btv-foot-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
}
@media (max-width: 640px) {
  .btv-hero { padding: 44px 18px 64px; }
  .btv-section { padding-left: 18px; padding-right: 18px; }
  .btv-head-inner { grid-template-columns: auto 1fr; padding: 0 16px; }
  .btv-actions { justify-self: end; }
  .btv-stats { gap: 12px 36px; margin-top: 40px; }
  .btv-panels { grid-template-columns: minmax(0, 1fr); }
  .btv-insp { grid-template-columns: minmax(0, 1fr); }
  .btv-foot-grid { grid-template-columns: minmax(0, 1fr); }
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
