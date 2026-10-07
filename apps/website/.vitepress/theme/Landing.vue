<script setup lang="ts">
import { onUnmounted, ref } from "vue";
import { useData } from "vitepress";
import { documentedProjects, framework, projects, tooling } from "../projects";

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
  { title: "One clear signal", body: "Typechecking gives generated code a reproducible check against your declared contracts. It catches mismatches early; it does not prove the program is correct." },
  { title: "Review at the contract level", body: "Expressive contracts carry the intent. You review interfaces while the AI churns through implementations — the compiler checks the connections. Tests and human review still check the behavior." },
];

const inspirations = [
  { name: "zod", href: "https://zod.dev", body: "The schema as a single source of truth — write it once, infer the types." },
  { name: "prisma", href: "https://www.prisma.io", body: "One declaration, a fully typed client — the whole database readable from its types." },
  { name: "tRPC", href: "https://trpc.io", body: "End-to-end type safety across a network boundary, with no codegen step." },
  { name: "oRPC", href: "https://orpc.unnoq.com", body: "Contract-first RPC — the contract is an artifact you define, share and implement against." },
];

const feedback = ref("");
let timer: ReturnType<typeof setTimeout> | undefined;
let copyAttempt = 0;

async function copy(text: string) {
  const attempt = ++copyAttempt;
  clearTimeout(timer);
  feedback.value = "";
  try {
    await navigator.clipboard.writeText(text);
    if (attempt !== copyAttempt) return;
    feedback.value = `Copied: ${text}`;
  } catch {
    if (attempt !== copyAttempt) return;
    feedback.value = "Could not copy. Select the install command and copy it manually.";
  }
  timer = setTimeout(() => (feedback.value = ""), 4000);
}

onUnmounted(() => {
  copyAttempt++;
  clearTimeout(timer);
});
</script>

<template>
  <div class="btv">
    <a href="#main" class="btv-skip">Skip to content</a>
    <header class="btv-head">
      <div class="btv-head-inner">
        <a href="#top" class="btv-brand">
          <img :src="`/logos/btravstack-${isDark ? 'dark' : 'light'}.svg`" width="32" height="32" alt="" class="btv-brand-mark" />
          <span class="btv-word"><span class="btv-pink">Btrav</span><span>Stack</span></span>
        </a>
        <nav class="btv-links" aria-label="Primary">
          <a class="navlink" href="#framework">Framework</a>
          <a class="navlink" href="#packages">Libraries</a>
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

    <main id="main" tabindex="-1">
      <section id="top" class="btv-hero">
        <div class="btv-hero-grid">
          <div class="btv-hero-copy">
            <p class="btv-eyebrow">TypeScript. Node.js. Built to compose.</p>
            <h1 class="btv-title">A backend that<br /><span class="btv-pink">fits together.</span></h1>

            <p class="btv-sub">One framework for the process. Focused libraries for the pieces. Build with explicit contracts, typed errors and wiring the compiler can check.</p>
            <div class="btv-cta-row">
              <a :href="framework.tutorial" class="btv-cta">Build your first service <span aria-hidden="true">→</span></a>
              <a href="#packages" class="btv-link">Explore the libraries <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <div class="btv-float" aria-hidden="true">
            <img :src="`/logos/btravstack-${isDark ? 'dark' : 'light'}.svg`" width="240" height="240" alt="" class="btv-hero-mark" />
          </div>
        </div>
        <div class="btv-capabilities" aria-label="Stack principles">
          <p><strong>Explicit contracts</strong><span>Types and validation at the boundary</span></p>
          <p><strong>Typed failures</strong><span>Expected errors in the return value</span></p>
          <p><strong>Open source</strong><span>MIT-licensed, built in the open</span></p>
        </div>
      </section>

      <section id="framework" class="btv-section btv-framework-section" aria-labelledby="framework-title">
        <div class="btv-framework">
          <div>
            <p class="btv-eyebrow">Start with the framework</p>
            <div class="btv-framework-heading">
              <img :src="`/logos/framework-${isDark ? 'dark' : 'light'}.svg`" width="72" height="72" alt="" />
              <h2 id="framework-title" class="btv-h2">btravstack</h2>
            </div>
            <p class="btv-section-lead">From a proven dependency graph to a running service. The kernel owns startup, units of work and graceful shutdown. Your application owns the business logic.</p>
            <div class="btv-panel-links">
              <a :href="framework.docs" class="btv-link">Read the framework docs <span aria-hidden="true">↗</span></a>
              <a :href="framework.repo" class="btv-link btv-link--quiet">Source <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div class="btv-runtime-map">
            <p class="btv-map-label">Your application module</p>
            <div class="btv-runtime-row"><span>HTTP</span><span>Answer requests</span></div>
            <div class="btv-runtime-row"><span>Temporal</span><span>Orchestrate work</span></div>
            <div class="btv-runtime-row"><span>AMQP</span><span>Broadcast events</span></div>
            <p class="btv-map-note">One runtime per process. The same application underneath.</p>
          </div>
        </div>
      </section>

      <!-- The stack — each package in its own color -->
      <section id="packages" class="btv-section">
        <h2 class="btv-h2">Take the pieces you need.</h2>
        <p class="btv-section-lead">Use a library on its own, or compose them with the framework. Each has a clear job and its own documentation.</p>
        <div class="btv-panels">
          <article v-for="p in projects" :key="p.name" class="btv-panel" :style="{ '--pkg': `var(--pkg-${p.key})` }">
            <div class="btv-panel-top">
              <img :src="`${p.logo}-${isDark ? 'dark' : 'light'}.svg`" width="52" height="52" :alt="`${p.name} logo`" class="btv-logo" />
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
            <button type="button" class="btv-codeblk" :aria-label="`Copy install command for ${p.name}`" :title="`Copy: ${p.install}`" @click="copy(p.install)">
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

      <section class="btv-section" aria-labelledby="tooling-title">
        <h2 id="tooling-title" class="btv-tooling-title">The tools behind the stack</h2>
        <div class="btv-tooling">
          <a v-for="tool in tooling" :key="tool.name" :href="tool.repo" class="btv-tool">
            <img :src="`${tool.logo}-${isDark ? 'dark' : 'light'}.svg`" width="44" height="44" alt="" />
            <span><strong>{{ tool.name }} <span aria-hidden="true">↗</span></strong><span>{{ tool.description }}</span></span>
          </a>
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
        <h2 class="btv-h2">Better feedback for humans and agents.</h2>
        <p class="btv-section-lead">Clear contracts make both human and AI-assisted work easier to check. The compiler is one feedback loop, alongside tests, runtime validation and review.</p>
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

    </main>
    <footer class="btv-foot">
      <div class="btv-foot-grid">
        <div class="btv-foot-brandcol">
          <div class="btv-foot-brand">
            <img :src="`/logos/btravstack-${isDark ? 'dark' : 'light'}.svg`" width="32" height="32" alt="" class="btv-brand-mark" />
            <span class="btv-word btv-foot-word"><span class="btv-pink">Btrav</span><span>Stack</span></span>
          </div>
          <p class="btv-foot-tag">Type-safe building blocks for the TypeScript backend. Open source, MIT.</p>
        </div>
        <nav class="btv-foot-col" aria-label="Documentation">
          <p class="btv-foot-h">Docs</p>
          <a v-for="p in documentedProjects" :key="p.name" :href="p.docs" target="_blank" rel="noopener" class="btv-link btv-link--quiet">{{ p.name }}</a>
        </nav>
        <nav class="btv-foot-col" aria-label="Source code">
          <p class="btv-foot-h">GitHub</p>
          <a v-for="p in documentedProjects" :key="p.name" :href="p.repo" target="_blank" rel="noopener" class="btv-link btv-link--quiet">{{ p.name }}</a>
          <a href="https://github.com/btravstack" target="_blank" rel="noopener" class="btv-link btv-link--quiet">Organization</a>
        </nav>
      </div>
      <div class="btv-foot-bottom">
        <span>MIT © 2026 <a href="https://github.com/btravers" target="_blank" rel="noopener" class="btv-link btv-link--quiet">Benoit Travers</a></span>
      </div>
    </footer>

    <div role="status" aria-live="polite" aria-atomic="true">
      <Transition name="btv-toast"><div v-if="feedback" class="btv-toast">{{ feedback }}</div></Transition>
    </div>
  </div>
</template>

<style scoped>
/* Hallmark · Ecosystem Index · Beetroot Stack · design.md · P4 H4 E4 S5 R4 V3 */
.btv {
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  font-family: var(--sans);
  font-size: var(--fs-body);
  line-height: var(--lh-body);
}

.btv-pink { color: var(--display-accent); }
.btv-word .btv-pink { color: var(--text-accent); }

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

/* ── Hero ───────────────────────────────────────────────────── */
.btv-hero { max-width: var(--container); margin: 0 auto; padding: 64px 24px 84px; }
.btv-hero-grid {
  display: grid; grid-template-columns: minmax(0, 8fr) minmax(0, 4fr);
  gap: 40px; align-items: center;
}
.btv-title {
  text-wrap: balance;
  margin: 0;
  font-family: var(--display); font-weight: 800;
  font-size: clamp(48px, 6.3vw, 80px); line-height: var(--lh-tight); letter-spacing: var(--tracking-hero);
  overflow-wrap: anywhere; min-width: 0;
}
.btv-sub { margin: 16px 0 0; max-width: 58ch; font-size: var(--fs-body-lg); line-height: var(--lh-body); color: var(--muted); }
.btv-cta-row { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; margin-top: 30px; }
.btv-float {
  display: inline-flex; justify-self: center;
  filter: drop-shadow(0 18px 40px color-mix(in srgb, var(--accent-deep) 45%, transparent));
}

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
.btv-panels { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 20px; margin-top: 34px; }
.btv-panel {
  grid-column: span 2;
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
.btv-points { list-style: none; margin: 15px 0 24px; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.btv-points li { display: flex; align-items: flex-start; gap: 9px; font-size: 14px; line-height: 1.4; color: var(--text); }
.btv-points svg { margin-top: 2px; flex: none; }
.btv-codeblk {
  margin-top: auto; width: 100%;
  display: flex; align-items: center; justify-content: space-between; gap: 10px;
  font-family: var(--mono); font-size: 12.5px;
  background: var(--code-bg); color: var(--text);
  border: 0; border-radius: var(--radius);
  padding: 12px 14px; cursor: pointer; text-align: left;
  transition: background-color var(--speed-fast) var(--ease);
}
.btv-codeblk:hover { background: color-mix(in srgb, var(--code-bg) 78%, var(--pkg)); }
.btv-codeblk:active { background: color-mix(in srgb, var(--code-bg) 65%, var(--pkg)); }
.btv-cmd { min-width: 0; overflow-wrap: anywhere; user-select: text; }
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

/* ── Clipboard feedback ──────────────────────────────────────── */
.btv-toast {
  position: fixed; bottom: 26px; left: 50%; transform: translateX(-50%); z-index: 80;
  background: var(--card-soft); color: var(--text);
  border: 1px solid var(--border-2); border-radius: var(--radius);
  font-family: var(--mono); font-size: 13px; padding: 11px 16px;
  box-shadow: var(--shadow-toast);
}
.btv-toast-enter-active, .btv-toast-leave-active { transition: opacity var(--speed) var(--ease), transform var(--speed) var(--ease); }
.btv-toast-enter-from, .btv-toast-leave-to { opacity: 0; transform: translate(-50%, 8px); }

@keyframes btv-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }

/* ── Responsive ───────────────────────────────────────────────── */
@media (max-width: 960px) {
  .btv-panels { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .btv-panel { grid-column: auto; }
  .btv-cols, .btv-ai-grid { grid-template-columns: minmax(0, 1fr); }
  .btv-foot-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
}
@media (max-width: 640px) {
  .btv-hero { padding: 44px 18px 64px; }
  .btv-section { padding-left: 18px; padding-right: 18px; }
  .btv-head-inner { grid-template-columns: auto 1fr; padding: 0 16px; }
  .btv-panels { grid-template-columns: minmax(0, 1fr); }
  .btv-insp { grid-template-columns: minmax(0, 1fr); }
  .btv-foot-grid { grid-template-columns: minmax(0, 1fr); }
}

@media (prefers-reduced-motion: reduce) {
  .btv-float { animation: none; }
  .btv-cta, .btv-toggle, .btv-panel, .btv-insp-row, .btv-codeblk { transition: none; }
  .btv-toast-enter-active, .btv-toast-leave-active { transition: opacity 0.12s var(--ease); }
  .btv-toast-enter-from, .btv-toast-leave-to { transform: translateX(-50%); }
}

.btv-skip { position: fixed; top: 8px; left: 16px; z-index: 100; padding: 10px 16px; background: var(--text); color: var(--bg); border-radius: 8px; transform: translateY(-150%); }
.btv-skip:focus { transform: translateY(0); }
.btv :is(a, button):focus-visible { outline: 2px solid var(--text-accent); outline-offset: 5px; }
.btv main:focus { outline: none; }
.btv-eyebrow { margin: 0 0 18px; color: var(--muted); font-family: var(--mono); font-size: 12px; letter-spacing: .06em; text-transform: uppercase; }
.btv-brand-mark { flex: none; }
.btv-hero-mark { width: 240px; height: 240px; }
.btv-capabilities { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 56px; padding-top: 24px; border-top: 1px solid var(--border); }
.btv-capabilities p { margin: 0; display: grid; gap: 5px; }
.btv-capabilities strong { font-weight: 600; font-size: 15px; }
.btv-capabilities span { font-size: 13px; color: var(--muted); }
.btv-framework-section { padding-top: 0; }
.btv-framework { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); gap: 48px; padding: 36px; background: var(--card); border-radius: var(--radius-lg); }
.btv-framework-heading { display: flex; gap: 16px; align-items: center; }
.btv-framework-heading .btv-h2 { font-size: clamp(32px, 4vw, 46px); }
.btv-runtime-map { align-self: center; padding: 22px; background: var(--bg); border-radius: var(--radius); }
.btv-map-label { margin: 0 0 20px; font-family: var(--mono); font-size: 13px; color: var(--text-accent); }
.btv-runtime-row { display: flex; justify-content: space-between; gap: 12px; margin-top: 8px; padding: 12px; background: var(--card-soft); border-radius: 6px; font-size: 13px; }
.btv-runtime-row span:first-child { font-family: var(--mono); font-weight: 600; }
.btv-runtime-row span:last-child { color: var(--muted); }
.btv-map-note { margin: 16px 0 0; font-size: 12px; line-height: 1.6; color: var(--muted); }
.btv-tooling-title { margin: 0; font-size: 18px; font-weight: 600; }
.btv-tooling { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; margin-top: 20px; }
.btv-tool { display: flex; align-items: center; gap: 16px; text-decoration: none; padding: 20px 0; border-top: 1px solid var(--border); }
.btv-tool img { flex: none; }
.btv-tool > span { display: grid; gap: 5px; }
.btv-tool strong { font-family: var(--mono); font-size: 14px; }
.btv-tool > span > span { color: var(--muted); font-size: 13px; line-height: 1.6; }
.btv-tool:hover strong { color: var(--text-accent); }
.btv-panel:nth-last-child(-n+2) { grid-column: span 3; }
.btv-toast { max-width: calc(100vw - 32px); overflow-wrap: anywhere; }
@media (max-width: 960px) {
  .btv-hero-grid { grid-template-columns: minmax(0, 1fr) auto; }
  .btv-float { order: 0; }
  .btv-hero-mark { width: 160px; height: 160px; }
  .btv-framework { grid-template-columns: 1fr; gap: 28px; }
  .btv-panel:nth-last-child(-n+2) { grid-column: auto; }
  .btv-panel:last-child { grid-column: 1 / -1; }
}
@media (max-width: 760px) {
  .btv-head-inner { grid-template-columns: 1fr auto; height: auto; padding-top: 10px; gap: 6px; }
  .btv-links { grid-row: 2; grid-column: 1 / -1; justify-self: stretch; justify-content: space-between; gap: 0; padding-bottom: 6px; }
  .btv-actions { grid-column: 2; grid-row: 1; }
  .navlink { padding: 10px 4px; font-size: 12px; }
  .btv-section { scroll-margin-top: 124px; }
  .btv-hero-grid { grid-template-columns: 1fr; position: relative; }
  .btv-float { position: absolute; right: 0; top: -8px; }
  .btv-hero-mark { width: 64px; height: 64px; }
  .btv-hero-copy > .btv-eyebrow { max-width: 24ch; min-height: 48px; }
  .btv-framework { padding: 24px; }
  .btv-capabilities { grid-template-columns: 1fr; gap: 18px; }
  .btv-tooling { grid-template-columns: 1fr; gap: 0; }
  .btv-panel-links { flex-wrap: wrap; }
}
</style>
