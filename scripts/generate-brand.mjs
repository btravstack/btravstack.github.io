import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const output = fileURLToPath(new URL("../apps/website/public/logos/", import.meta.url));
mkdirSync(output, { recursive: true });

const projects = [
  { name: "btravstack", label: "btravstack ecosystem", light: "#A92566", dark: "#E875AB", glyph: '<path d="m42 62 22-9 22 9-22 9Z" fill="currentColor" stroke="none"/><path d="m42 76 22 9 22-9M42 90l22 9 22-9"/>' },
  { name: "framework", label: "btravstack framework", light: "#087C91", dark: "#58C9DD", glyph: '<rect x="43" y="55" width="18" height="18" rx="3"/><rect x="67" y="55" width="18" height="18" rx="3"/><rect x="55" y="79" width="18" height="18" rx="3"/>' },
  { name: "unthrown", label: "unthrown", light: "#147D74", dark: "#63CDBF", glyph: '<path d="M43 78v13a6 6 0 0 0 6 6h30a6 6 0 0 0 6-6V78M64 54v27m-11-11 11 11 11-11"/>' },
  { name: "entity", label: "entity", light: "#A8680A", dark: "#E7B352", glyph: '<path d="m64 53 23 22-23 24-23-24Z"/><path d="m53 75 8 8 15-16"/>' },
  { name: "di", label: "dependency injection", light: "#2865B7", dark: "#7BAAF2", glyph: '<path d="M47 56v14a8 8 0 0 0 8 8h18a8 8 0 0 0 8-8V56M64 78v18"/><circle cx="47" cy="55" r="5" fill="currentColor" stroke="none"/><circle cx="81" cy="55" r="5" fill="currentColor" stroke="none"/><circle cx="64" cy="97" r="5" fill="currentColor" stroke="none"/>' },
  { name: "amqp-contract", label: "AMQP Contract", light: "#BC4B08", dark: "#FFA260", glyph: '<path d="m55 76 20-16M55 76l20 16"/><circle cx="46" cy="76" r="9"/><circle cx="81" cy="57" r="7"/><circle cx="81" cy="95" r="7"/>' },
  { name: "temporal-contract", label: "Temporal Contract", light: "#5651B9", dark: "#A49EF9", glyph: '<path d="M46 54h36M46 98h36M50 55c0 13 5 14 14 21-9 7-14 8-14 21m28-42c0 13-5 14-14 21 9 7 14 8 14 21"/>' },
  { name: "tools", label: "btravstack tools", light: "#59667A", dark: "#B5C1D3", glyph: '<path d="M78 54a16 16 0 0 0-20 20L43 89a6 6 0 0 0 9 9l15-15a16 16 0 0 0 20-20L77 73l-9-9Z"/>' },
  { name: "theme", label: "btravstack theme", light: "#A44491", dark: "#D994CC", glyph: '<path d="M64 53a23 23 0 1 0 0 46h4a6 6 0 0 0 0-12 5 5 0 0 1 0-10h10c13 0 10-24-14-24Z"/><circle cx="51" cy="73" r="3" fill="currentColor" stroke="none"/><circle cx="60" cy="63" r="3" fill="currentColor" stroke="none"/><circle cx="73" cy="64" r="3" fill="currentColor" stroke="none"/>' },
];

function logo(project, mode) {
  const mono = mode === "mono";
  const body = mono ? "#16141A" : project[mode];
  const leaf = mono ? body : mode === "dark" ? "#77BE86" : "#347D48";
  const ink = mode === "dark" ? "#15131A" : "#FFFFFF";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" fill="none" role="img" aria-label="${project.label}">
  <path d="M64 41C46 41 31 27 32 12c18-1 32 12 32 29ZM66 35C66 20 77 9 94 10c-1 15-11 25-28 25Z" fill="${leaf}"/>
  <path d="M64 39C37 33 19 48 21 69c2 22 19 35 36 46l7 7 7-7c17-11 34-24 36-46 2-21-16-36-43-30Z" fill="${body}"/>
  <g color="${ink}" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">${project.glyph}</g>
</svg>
`;
}

for (const project of projects) {
  for (const mode of ["light", "dark", "mono"]) {
    writeFileSync(`${output}${project.name}-${mode}.svg`, logo(project, mode));
  }
  const favicon = logo(project, "light").replace('stroke-width="5"', 'stroke-width="6"');
  writeFileSync(`${output}${project.name}-favicon.svg`, favicon);
}
writeFileSync(new URL("../apps/website/public/favicon.svg", import.meta.url), logo(projects[0], "light").replace('stroke-width="5"', 'stroke-width="6"'));

const brandMark = logo(projects[0], "light")
  .replace('width="128" height="128"', 'width="24" height="24"')
  .replace('role="img" aria-label="btravstack ecosystem"', 'aria-hidden="true"')
  .replaceAll(projects[0].light, 'var(--bt-pink)')
  .replaceAll('#FFFFFF', 'var(--bg)');
writeFileSync(new URL('../packages/theme/src/brand-mark.ts', import.meta.url),
  `export const brandMark = ${JSON.stringify(brandMark)};\n`);
