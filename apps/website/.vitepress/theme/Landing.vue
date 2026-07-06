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
    <header class="btv-head">
      <div class="btv-head-inner">
        <a href="#top" class="btv-brand">
          <svg viewBox="0 0 100 124" width="26" height="32" fill="none" aria-hidden="true" focusable="false"><g transform="translate(50,34)"><g transform="rotate(-35)"><path d="M0,3 C-6,-7 -6,-18 0,-28 C6,-18 6,-7 0,3 Z" fill="#2C8B4E"/></g><g transform="rotate(35)"><path d="M0,3 C-6,-7 -6,-18 0,-28 C6,-18 6,-7 0,3 Z" fill="#2C8B4E"/></g><path d="M0,4 C-7,-8 -7,-20 0,-32 C7,-20 7,-8 0,4 Z" fill="#3DAE62"/></g><path d="M50,32 C29,30 17,44 17,60 C17,79 37,99 50,107 Z" fill="#CE3D80"/><path d="M50,32 C71,30 83,44 83,60 C83,79 63,99 50,107 Z" fill="#8E1A52"/><path d="M31,48 C27,55 27.5,65 32,73" stroke="#EE9CC4" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.55"/><path d="M46.5,104 C46.5,112 44,118 39,124 C47,120 52.5,112 53.5,104 Z" fill="#8E1A52"/></svg>
          <span class="btv-word"><span class="btv-pink">btrav</span><span>stack</span></span>
        </a>
        <nav class="btv-nav">
          <a class="navlink nav-hide" href="#philosophy">Philosophy</a>
          <a class="navlink nav-hide" href="#projects">Projects</a>
          <a class="navlink nav-hide" href="#ai" style="margin-right:6px">Why now</a>
          <ClientOnly>
            <button type="button" class="btv-toggle" :title="isDark ? 'Switch to light' : 'Switch to dark'" :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'" :aria-pressed="isDark" @click="toggleAppearance">
              <svg v-if="isDark" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2M12 19.5v2M4.8 4.8l1.4 1.4M17.8 17.8l1.4 1.4M2.5 12h2M19.5 12h2M4.8 19.2 6.2 17.8M17.8 6.2 19.2 4.8"/></svg>
              <svg v-else width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8 8 0 1 1 9.5 4 6.4 6.4 0 0 0 20 14.5Z"/></svg>
            </button>
          </ClientOnly>
          <a href="https://github.com/btravstack" target="_blank" rel="noopener" class="cta-ghost btv-ghost-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
          GitHub
          </a>
        </nav>
      </div>
    </header>

    <section id="top" class="btv-hero">
      <div class="btv-glow"></div>
      <div class="btv-hero-inner">
        <div class="btv-float">
          <svg viewBox="0 0 100 124" width="116" height="144" fill="none" aria-hidden="true" focusable="false"><g transform="translate(50,34)"><g transform="rotate(-35)"><path d="M0,3 C-6,-7 -6,-18 0,-28 C6,-18 6,-7 0,3 Z" fill="#2C8B4E"/></g><g transform="rotate(35)"><path d="M0,3 C-6,-7 -6,-18 0,-28 C6,-18 6,-7 0,3 Z" fill="#2C8B4E"/></g><path d="M0,4 C-7,-8 -7,-20 0,-32 C7,-20 7,-8 0,4 Z" fill="#3DAE62"/></g><path d="M50,32 C29,30 17,44 17,60 C17,79 37,99 50,107 Z" fill="#CE3D80"/><path d="M50,32 C71,30 83,44 83,60 C83,79 63,99 50,107 Z" fill="#8E1A52"/><path d="M31,48 C27,55 27.5,65 32,73" stroke="#EE9CC4" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.55"/><path d="M46.5,104 C46.5,112 44,118 39,124 C47,120 52.5,112 53.5,104 Z" fill="#8E1A52"/></svg>
        </div>
        <h1 class="btv-title"><span class="btv-pink">btrav</span><span>stack</span></h1>
        <p class="btv-lead">An expressive, robust TypeScript backend.</p>
        <p class="btv-sub">A small stack of type-safe building blocks for Node, built on two convictions: a signature should be enough to understand a system, and the fastest error is the best one. Declare the contract once — types, validation and feedback flow everywhere.</p>
        <div class="btv-cta-row">
          <a href="#projects" class="cta-primary btv-primary-btn">Explore the packages</a>
          <a href="https://github.com/btravstack" target="_blank" rel="noopener" class="cta-ghost btv-ghost-cta">
            <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
            View on GitHub
          </a>
        </div>
        <div class="btv-pills">
          <span v-for="p in projects" :key="p.name" class="btv-pill">{{ p.name }}</span>
        </div>
      </div>
    </section>

    <section id="philosophy" class="btv-section btv-narrow">
      <p class="btv-eyebrow">Why btravstack</p>
      <h2 class="btv-h2 btv-h2-wide">Expressive to read. Robust to run.</h2>
      <p class="btv-section-lead">Each package is small, focused and does one thing well — but they share a worldview: expressive code you can understand from its signature alone, and robust code that fails fast enough to learn from.</p>
      <div class="btv-prin">
        <div v-for="pr in principles" :key="pr.num" class="btv-prin-card">
          <div class="btv-prin-chip" aria-hidden="true">{{ pr.num }}</div>
          <h3 class="btv-prin-title">{{ pr.title }}</h3>
          <p class="btv-prin-body">{{ pr.body }}</p>
        </div>
      </div>
    </section>

    <section id="projects" class="btv-section">
      <p class="btv-eyebrow">The packages</p>
      <h2 class="btv-h2" style="margin-bottom:30px">Four libraries, one stack.</h2>
      <div class="grid-3 btv-projects">
        <div v-for="p in projects" :key="p.name" class="pcard btv-pcard">
          <div class="btv-pcard-top">
            <img :src="`${p.logo}-${isDark ? 'dark' : 'light'}.svg`" width="56" height="56" :alt="`${p.name} logo`" class="btv-logo" />
            <span class="btv-stars">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1.3l2.06 4.17 4.6.67-3.33 3.24.78 4.58L8 11.8l-4.11 2.16.78-4.58L1.34 6.14l4.6-.67L8 1.3z"/></svg>
              {{ formatStars(stars[p.repoFull]) }}
            </span>
          </div>
          <span class="btv-tag">{{ p.tag }}</span>
          <h3 class="btv-pname">{{ p.name }}</h3>
          <code class="btv-pkg">{{ p.pkg }}</code>
          <p class="btv-blurb">{{ p.blurb }}</p>
          <ul class="btv-points">
            <li v-for="pt in p.points" :key="pt">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M2.5 8.5l3 3 8-8" stroke="var(--text-green)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              <span>{{ pt }}</span>
            </li>
          </ul>
          <button type="button" class="codeblk btv-codeblk" :title="`Copy: ${p.install}`" @click="copy(p.install)">
            <span class="btv-cmd"><span class="btv-dollar">$ </span>{{ p.install }}</span>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><rect x="5.5" y="5.5" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.4"/><path d="M3.5 10.5h-1A1.5 1.5 0 0 1 1 9V2.5A1.5 1.5 0 0 1 2.5 1H9a1.5 1.5 0 0 1 1.5 1.5v1" stroke="currentColor" stroke-width="1.4"/></svg>
          </button>
          <div class="btv-pcard-foot">
            <a :href="p.repo" target="_blank" rel="noopener" class="repolink btv-foot-a">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
              Repo
            </a>
            <a :href="p.docs" target="_blank" rel="noopener" class="repolink btv-foot-a btv-foot-muted">Docs
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M5 3.5h7.5V11M12.5 3.5L3.5 12.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <section id="ai" class="btv-section btv-ai">
      <div class="btv-ai-panel">
        <p class="btv-eyebrow">In the age of AI</p>
        <h2 class="btv-h2 btv-ai-h2">Written with AI. Judged by the compiler.</h2>
        <p class="btv-section-lead">None of this was invented for AI — AI just raised the stakes. When an agent writes the code, expressiveness and fail-fast stop being a matter of taste and become infrastructure.</p>
        <div class="btv-ai-grid">
          <div v-for="c in aiCards" :key="c.title" class="btv-ai-card">
            <h3>{{ c.title }}</h3>
            <p>{{ c.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="btv-section btv-insp">
      <p class="btv-eyebrow">Inspirations</p>
      <h2 class="btv-h2 btv-insp-h2">Standing on good shoulders.</h2>
      <p class="btv-section-lead">btravstack borrows its instincts from the libraries that made TypeScript feel this way in the first place.</p>
      <div class="btv-insp-grid">
        <a v-for="i in inspirations" :key="i.name" :href="i.href" target="_blank" rel="noopener" class="pcard btv-insp-card">
          <span class="btv-insp-name">{{ i.name }}</span>
          <p class="btv-insp-body">{{ i.body }}</p>
        </a>
      </div>
    </section>

    <section class="btv-section btv-cta-wrap">
      <div class="btv-cta-banner">
        <h2 class="btv-cta-h2">Build backends you can trust the types of.</h2>
        <p class="btv-cta-p">Star the projects, open an issue, or just read the docs. Everything is MIT-licensed and built in the open.</p>
        <a href="https://github.com/btravstack" target="_blank" rel="noopener" class="cta-primary btv-primary-btn">View on GitHub</a>
      </div>
    </section>

    <footer class="btv-foot">
      <div class="foot-grid btv-foot-grid">
        <div>
          <div class="btv-foot-brand">
            <svg viewBox="0 0 100 124" width="24" height="30" fill="none" aria-hidden="true" focusable="false"><g transform="translate(50,34)"><g transform="rotate(-35)"><path d="M0,3 C-6,-7 -6,-18 0,-28 C6,-18 6,-7 0,3 Z" fill="#2C8B4E"/></g><g transform="rotate(35)"><path d="M0,3 C-6,-7 -6,-18 0,-28 C6,-18 6,-7 0,3 Z" fill="#2C8B4E"/></g><path d="M0,4 C-7,-8 -7,-20 0,-32 C7,-20 7,-8 0,4 Z" fill="#3DAE62"/></g><path d="M50,32 C29,30 17,44 17,60 C17,79 37,99 50,107 Z" fill="#CE3D80"/><path d="M50,32 C71,30 83,44 83,60 C83,79 63,99 50,107 Z" fill="#8E1A52"/><path d="M31,48 C27,55 27.5,65 32,73" stroke="#EE9CC4" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.55"/><path d="M46.5,104 C46.5,112 44,118 39,124 C47,120 52.5,112 53.5,104 Z" fill="#8E1A52"/></svg>
            <span class="btv-word btv-foot-word"><span class="btv-pink">btrav</span><span>stack</span></span>
          </div>
          <p class="btv-foot-tag">Type-safe building blocks for the TypeScript backend. Open source, MIT.</p>
        </div>
        <div class="btv-foot-col">
          <p class="btv-foot-h">Packages</p>
          <a class="foot-link" href="https://github.com/btravstack/amqp-contract" target="_blank" rel="noopener">amqp-contract</a>
          <a class="foot-link" href="https://github.com/btravstack/temporal-contract" target="_blank" rel="noopener">temporal-contract</a>
          <a class="foot-link" href="https://github.com/btravstack/unthrown" target="_blank" rel="noopener">unthrown</a>
          <a class="foot-link" href="https://github.com/btravstack/demesne" target="_blank" rel="noopener">demesne</a>
        </div>
        <div class="btv-foot-col">
          <p class="btv-foot-h">Docs</p>
          <a class="foot-link" href="https://btravstack.github.io/amqp-contract/" target="_blank" rel="noopener">amqp-contract</a>
          <a class="foot-link" href="https://btravstack.github.io/temporal-contract/" target="_blank" rel="noopener">temporal-contract</a>
          <a class="foot-link" href="https://btravstack.github.io/unthrown/" target="_blank" rel="noopener">unthrown</a>
          <a class="foot-link" href="https://btravstack.github.io/demesne/" target="_blank" rel="noopener">demesne</a>
        </div>
        <div class="btv-foot-col">
          <p class="btv-foot-h">Org</p>
          <a class="foot-link" href="https://github.com/btravstack" target="_blank" rel="noopener">GitHub</a>
        </div>
      </div>
      <div class="btv-foot-bottom">
        <span>MIT © 2026 <a class="foot-link btv-foot-muted2" href="https://github.com/btravers" target="_blank" rel="noopener">Benoit Travers</a></span>
        <a class="foot-link btv-foot-mono" href="https://github.com/btravers" target="_blank" rel="noopener">@btravers</a>
      </div>
    </footer>

    <Transition name="btv-toast">
      <div v-if="copied" class="btv-toast" role="status" aria-live="polite">Copied&nbsp; <span class="btv-pink">{{ copied }}</span></div>
    </Transition>
  </div>
</template>

<style scoped>
.btv {
  min-height: 100vh;
  background: radial-gradient(1100px 560px at 50% -120px, var(--bg-grad), var(--bg) 62%);
  color: var(--text);
  font-family: var(--sans);
}

/* Landing-local scheme overlays (header/nav washes, pills, footer tint, and the
   light card rest shadow). NB: in Vue scoped CSS a `:global(html…) .btv` selector
   compiles to the `html…` element, so we set BOTH schemes on the two html states
   rather than a default on `.btv` — a `.btv` default would shadow the html-level
   value for everything inside the landing. Surfaces/text/accent themselves come
   from the shared tokens (tokens.css). */
:global(html.dark) .btv {
  --btv-hover: rgba(255, 255, 255, 0.05);
  --btv-pill: rgba(255, 255, 255, 0.04);
  --btv-footer: rgba(0, 0, 0, 0.2);
  --btv-ai-card: rgba(21, 16, 28, 0.55);
  --card-rest-shadow: none;   /* dark cards: depth from the fill + hairline */
  --glow-display: block;      /* pink hero glow — a dark-scheme signature */
}
:global(html:not(.dark)) .btv {
  --btv-hover: rgba(26, 12, 20, 0.05);
  --btv-pill: rgba(26, 12, 20, 0.035);
  --btv-footer: rgba(26, 12, 20, 0.025);
  --btv-ai-card: rgba(255, 255, 255, 0.6);
  --card-rest-shadow: 0 1px 2px rgba(26, 12, 20, 0.05), 0 16px 32px -24px rgba(26, 12, 20, 0.22);
  --glow-display: none;       /* on near-white the pink glow reads as a washed
                                 "livid" cloud behind the wordmark — drop it */
}

/* general accent highlights (incl. the small copy toast) keep the AA text accent */
.btv-pink { color: var(--text-accent); }
/* the large display wordmark (hero / header / footer) stays full brand pink */
.btv-title .btv-pink,
.btv-word .btv-pink { color: var(--display-accent); }
.btv-toggle {
  display: inline-flex; align-items: center; justify-content: center;
  width: 38px; height: 38px;
  border: 1px solid var(--border-2); border-radius: 10px;
  background: transparent; color: var(--muted); cursor: pointer;
  transition: color 0.15s, background 0.15s, border-color 0.15s;
}
.btv-toggle:hover { color: var(--text); background: var(--btv-hover); }

/* Header */
.btv-head {
  position: sticky; top: 0; z-index: 50;
  backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
  background: var(--glass);
  border-bottom: 1px solid var(--border);
}
.btv-head-inner { max-width: 1180px; margin: 0 auto; padding: 0 28px; height: 68px; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
.btv-brand { display: flex; align-items: center; gap: 11px; text-decoration: none; }
.btv-word { font-weight: 800; font-size: 22px; letter-spacing: -0.5px; color: var(--text); }
.btv-nav { display: flex; align-items: center; gap: 4px; }
.navlink { color: var(--muted); text-decoration: none; font-weight: 600; font-size: 14.5px; padding: 8px 12px; border-radius: 9px; transition: color .15s, background .15s; }
.navlink:hover { color: var(--text); background: var(--btv-hover); }
.btv-ghost-btn { display: inline-flex; align-items: center; gap: 8px; text-decoration: none; color: var(--text); font-weight: 700; font-size: 14px; padding: 9px 15px; border: 1px solid var(--border-2); border-radius: 10px; transition: background .15s, border-color .15s; }
.cta-ghost:hover { background: var(--btv-hover); border-color: var(--border-2); }

/* Hero */
.btv-hero { position: relative; text-align: center; padding: 104px 28px 86px; overflow: hidden; }
.btv-glow { display: var(--glow-display, block); position: absolute; top: 30px; left: 50%; transform: translateX(-50%); width: 560px; max-width: 90vw; height: 380px; background: radial-gradient(closest-side, rgba(224,88,154,0.30), transparent 72%); filter: blur(8px); animation: glowpulse 6s ease-in-out infinite; pointer-events: none; z-index: 0; }
.btv-hero-inner { position: relative; z-index: 1; max-width: 900px; margin: 0 auto; }
.btv-float { display: inline-flex; animation: floaty 6s ease-in-out infinite; filter: drop-shadow(0 18px 40px rgba(142,26,82,0.45)); }
.btv-title { margin: 26px 0 0; font-weight: 800; letter-spacing: -2.5px; line-height: 0.95; font-size: clamp(52px, 9vw, 92px); }
.btv-lead { margin: 22px auto 0; max-width: 560px; font-size: clamp(20px, 2.6vw, 26px); font-weight: 600; line-height: 1.3; color: var(--text); }
.btv-sub { margin: 16px auto 0; max-width: 600px; font-size: 17px; line-height: 1.6; color: var(--muted); }
.btv-cta-row { display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; margin-top: 34px; }
.btv-primary-btn { display: inline-flex; align-items: center; gap: 9px; text-decoration: none; background: var(--accent); color: var(--accent-contrast); font-weight: 700; font-size: 15.5px; padding: 13px 22px; border-radius: 12px; box-shadow: var(--shadow-accent); transition: filter .15s; }
.cta-primary:hover { filter: brightness(1.07); }
.btv-ghost-cta { display: inline-flex; align-items: center; gap: 8px; text-decoration: none; color: var(--text); font-weight: 700; font-size: 15.5px; padding: 13px 22px; border: 1px solid var(--border-2); border-radius: 12px; transition: background .15s, border-color .15s; }
.btv-pills { display: flex; flex-wrap: wrap; gap: 9px; justify-content: center; margin-top: 30px; }
.btv-pill { font-family: var(--mono); font-size: 13px; color: var(--muted); background: var(--btv-pill); border: 1px solid var(--border); padding: 6px 12px; border-radius: 999px; }

/* Sections */
.btv-section { max-width: 1180px; margin: 0 auto; padding: 64px 28px 40px; }
.btv-narrow { padding: 34px 28px 8px; }
.btv-eyebrow { margin: 0; font-family: var(--mono); font-size: 13px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-accent); }
.btv-h2 { margin: 14px 0 0; font-weight: 800; letter-spacing: -1px; line-height: 1.08; font-size: clamp(28px, 4vw, 40px); }
.btv-h2-wide { max-width: 680px; }
.btv-section-lead { margin: 16px 0 0; max-width: 640px; font-size: 16.5px; line-height: 1.65; color: var(--muted); }

/* Philosophy — filled cards with a numbered accent chip. */
.btv-prin { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; margin-top: 34px; }
.btv-prin-card { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 22px; box-shadow: var(--card-rest-shadow); }
.btv-prin-chip { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; background: var(--accent-wash-2); border: 1px solid var(--accent-line); color: var(--text-accent); font-family: var(--mono); font-weight: 600; font-size: 15px; }
.btv-prin-title { margin: 16px 0 0; font-weight: 700; font-size: 18px; letter-spacing: -0.3px; color: var(--text); }
.btv-prin-body { margin: 9px 0 0; font-size: 14.5px; line-height: 1.6; color: var(--muted); }

/* "In the age of AI" — a bordered gradient panel with translucent inner cards. */
.btv-ai { padding-top: 76px; padding-bottom: 0; }
.btv-ai-panel { background: linear-gradient(120deg, rgba(142,26,82,0.30), rgba(224,88,154,0.07)); border: 1px solid var(--border-2); border-radius: 24px; padding: 46px 40px; }
.btv-ai-h2 { max-width: 640px; font-size: clamp(26px, 3.6vw, 36px); }
.btv-ai-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; margin-top: 32px; }
.btv-ai-card { background: var(--btv-ai-card); border: 1px solid var(--border); border-radius: 16px; padding: 22px; }
.btv-ai-card h3 { margin: 0; font-weight: 700; font-size: 17.5px; letter-spacing: -0.3px; color: var(--text); }
.btv-ai-card p { margin: 9px 0 0; font-size: 14.5px; line-height: 1.6; color: var(--muted); }

/* Inspirations — compact link cards. */
.btv-insp { padding-top: 64px; padding-bottom: 0; }
.btv-insp-h2 { font-size: clamp(24px, 3.2vw, 32px); }
.btv-insp-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 18px; margin-top: 28px; }
.btv-insp-card { display: block; text-decoration: none; background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 20px 22px; box-shadow: var(--card-rest-shadow); }
.btv-insp-name { font-family: var(--mono); font-weight: 600; font-size: 15.5px; color: var(--text); }
.btv-insp-body { margin: 8px 0 0; font-size: 14px; line-height: 1.55; color: var(--muted); }

/* Project cards — four across on wide screens ("four libraries, one stack"),
   two up on tablet, one on mobile (the .grid-3 rule below handles ≤880). */
.btv-projects { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 18px; }
@media (max-width: 1080px) { .btv-projects, .btv-insp-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
.btv-pcard { display: flex; flex-direction: column; background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 26px; box-shadow: var(--card-rest-shadow); }
.pcard { transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease; }
.pcard:hover { transform: translateY(-4px); border-color: var(--border-2); box-shadow: var(--shadow-card); }
.btv-pcard-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
.btv-logo { display: block; flex: none; width: 56px; height: 56px; object-fit: contain; filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.35)); }
.btv-tag { display: inline-flex; align-self: flex-start; align-items: center; margin-top: 20px; font-family: var(--mono); font-size: 11.5px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; color: var(--text-accent); background: var(--accent-wash); border: 1px solid var(--accent-line); padding: 5px 10px; border-radius: 999px; }
.btv-stars { display: inline-flex; align-items: center; gap: 5px; font-size: 13px; font-weight: 600; color: var(--faint); }
.btv-pname { margin: 14px 0 0; font-weight: 800; font-size: 23px; letter-spacing: -0.6px; color: var(--text); }
.btv-pkg { display: inline-block; margin: 7px 0 0; font-family: var(--mono); font-size: 13px; color: var(--text-accent); background: none; padding: 0; }
.btv-blurb { margin: 14px 0 0; min-height: 92px; font-size: 14.5px; line-height: 1.6; color: var(--muted); }
.btv-points { list-style: none; margin: 18px 0 0; padding: 0; display: flex; flex-direction: column; gap: 9px; }
.btv-points li { display: flex; align-items: flex-start; gap: 9px; font-size: 14px; line-height: 1.4; color: var(--text); }
.btv-points svg { margin-top: 2px; flex: none; }
.btv-codeblk { margin-top: auto; width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 10px; font-family: var(--mono); font-size: 12.5px; background: #18121f; border: 1px solid rgba(255,255,255,0.07); border-radius: 11px; padding: 11px 13px; color: #f5eff3; cursor: pointer; text-align: left; }
.codeblk { transition: border-color .15s, background .15s; }
.codeblk:hover { border-color: rgba(255,255,255,0.18); background: #20182a; }
.btv-cmd { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.btv-dollar { color: #ee9cc4; user-select: none; }
.btv-pcard-foot { display: flex; align-items: center; gap: 18px; margin-top: 20px; padding-top: 18px; border-top: 1px solid var(--border); }
.btv-foot-a { display: inline-flex; align-items: center; gap: 7px; text-decoration: none; color: var(--text); font-weight: 700; font-size: 14px; }
.btv-foot-muted { color: var(--muted); }
.repolink { transition: color .15s; }
.repolink:hover { color: var(--text-accent); }

/* CTA banner */
.btv-cta-wrap { padding: 30px 28px 80px; }
.btv-cta-banner { position: relative; overflow: hidden; background: linear-gradient(120deg, rgba(142,26,82,0.35), rgba(224,88,154,0.12)); border: 1px solid var(--border-2); border-radius: 24px; padding: 46px 40px; text-align: center; }
.btv-cta-h2 { margin: 0; font-weight: 800; letter-spacing: -0.8px; font-size: clamp(24px, 3.4vw, 34px); color: var(--text); }
.btv-cta-p { margin: 14px auto 26px; max-width: 520px; font-size: 16px; line-height: 1.6; color: var(--muted); }

/* Footer */
.btv-foot { border-top: 1px solid var(--border); background: var(--btv-footer); }
.btv-foot-grid { max-width: 1180px; margin: 0 auto; padding: 48px 28px 30px; display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 32px; }
.btv-foot-brand { display: flex; align-items: center; gap: 10px; }
.btv-foot-word { font-size: 19px; }
.btv-foot-tag { margin: 14px 0 0; font-size: 13.5px; line-height: 1.6; color: var(--faint); max-width: 240px; }
.btv-foot-col { display: flex; flex-direction: column; gap: 11px; }
.btv-foot-h { margin: 0 0 4px; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; color: var(--faint); font-weight: 700; }
.foot-link { color: var(--muted); text-decoration: none; font-size: 14px; transition: color .15s; }
.foot-link:hover { color: var(--text-accent); }
.btv-foot-bottom { max-width: 1180px; margin: 0 auto; padding: 18px 28px 34px; border-top: 1px solid var(--border); display: flex; flex-wrap: wrap; gap: 10px; align-items: center; justify-content: space-between; font-size: 13px; color: var(--faint); }
.btv-foot-muted2 { color: var(--muted); }
.btv-foot-mono { font-family: var(--mono); font-size: 12px; color: var(--faint); }

/* Toast */
.btv-toast { position: fixed; bottom: 26px; left: 50%; transform: translateX(-50%); z-index: 80; background: var(--card-soft); border: 1px solid var(--border-2); color: var(--text); font-family: var(--mono); font-size: 13px; padding: 11px 16px; border-radius: 11px; box-shadow: var(--shadow-toast); }
.btv-toast-enter-active, .btv-toast-leave-active { transition: opacity .2s ease, transform .2s ease; }
.btv-toast-enter-from, .btv-toast-leave-to { opacity: 0; transform: translate(-50%, 8px); }

@keyframes floaty { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
@keyframes glowpulse { 0%, 100% { opacity: .55; } 50% { opacity: .8; } }

@media (max-width: 880px) {
  .grid-3 { grid-template-columns: minmax(0, 1fr) !important; }
  .btv-prin, .btv-ai-grid, .btv-insp-grid { grid-template-columns: minmax(0, 1fr); }
  .btv-foot-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) !important; }
  .btv-ai-panel { padding: 34px 24px; }
}
@media (max-width: 560px) {
  .nav-hide { display: none !important; }
  .btv-foot-grid { grid-template-columns: minmax(0, 1fr) !important; }
}
@media (prefers-reduced-motion: reduce) {
  .btv-float, .btv-glow { animation: none; }
}
</style>
