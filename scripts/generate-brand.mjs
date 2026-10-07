import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
const output =
  process.argv[2] || fileURLToPath(new URL("../apps/website/public/logos/", import.meta.url));
mkdirSync(output, { recursive: true });
const names = [
  "btravstack",
  "framework",
  "unthrown",
  "entity",
  "di",
  "amqp-contract",
  "temporal-contract",
  "tools",
  "theme",
];
const titles = {
  btravstack: "btravstack beetroot mascot",
  framework: "btravstack beetroot mascot on three teal layers",
  unthrown: "unthrown beetroot with a no-throw sign",
  entity: "entity beetroot identity card",
  di: "dependency injection beetroot syringe",
  "amqp-contract": "AMQP Contract beetroot message",
  "temporal-contract": "Temporal Contract beetroot hourglass",
  tools: "btravstack tools beetroot with a wrench",
  theme: "btravstack theme beetroot with a palette",
};
function defs(id) {
  const gradient = (name, colors, extra = "") =>
    `<linearGradient id="${id}-${name}" x1="0" y1="0" x2="1" y2="1" ${extra}>${colors.map((c, i) => `<stop offset="${i / (colors.length - 1)}" stop-color="${c}"/>`).join("")}</linearGradient>`;
  return `<defs>${gradient("beet", ["#D44C8A", "#C73A7D", "#B02768"])}${gradient("shade", ["#A62665", "#8B1952"])}${gradient("leaf", ["#51B777", "#329C60"])}${gradient("stem", ["#348D53", "#247646"])}${gradient("cheek", ["#F6A3CD", "#EC84B6"])}${gradient("eye", ["#650F39", "#3A0B24"])}${gradient("teal", ["#51BDB8", "#37ABA8"])}${gradient("teal-side", ["#298F90", "#1B7378"])}${gradient("orange", ["#FFAF64", "#F77A27", "#D95517"])}${gradient("orange-side", ["#F58A38", "#DD611F"])}${gradient("indigo", ["#9890F1", "#716BD1", "#514CA5"])}${gradient("blue", ["#79ABE9", "#447EC8", "#295EA5"])}${gradient("silver", ["#E5EAF1", "#B2C0D0", "#6F849D"])}${gradient("card", ["#F7EDF4", "#E9DBE5"])}${gradient("amber", ["#F5CD7A", "#D99E3D", "#B27521"])}${gradient("palette", ["#F5D2E9", "#DE9AC6", "#B96FA5"])}</defs>`;
}
function beet(id, { arms = false, mouth = "smile", tail = true } = {}) {
  const u = (n) => `url(#${id}-${n})`;
  return `<g>
  <path d="M105 151C101 126 93 105 79 86" fill="none" stroke="${u("stem")}" stroke-width="17" stroke-linecap="round"/>
  <path d="M98 139C88 127 76 127 61 129 40 133 24 125 20 110 14 97 8 89 12 80 18 70 30 65 45 65 62 65 75 77 85 85 98 93 108 106 98 139Z" fill="${u("leaf")}"/>
  <path d="M102 150C95 125 73 99 36 83 73 90 104 119 118 147Z" fill="${u("stem")}"/>
  <path d="M125 149C125 125 126 105 120 87 110 61 96 63 94 40 92 23 104 14 119 3 130-5 133-27 148-24 162-22 166-7 173 8 187 40 184 53 164 77 146 98 144 119 143 149Z" fill="${u("leaf")}" transform="translate(-10 41)"/>
  <path d="M125 150C120 119 117 102 125 71 128 58 133 39 139 31 143 27 138 48 137 64 134 95 134 119 140 150Z" fill="${u("stem")}"/>
  <path d="M152 142C158 118 164 102 177 84 188 69 201 65 220 62 235 60 244 55 248 62 258 74 246 88 243 101 241 117 231 126 216 125 198 123 178 116 167 145Z" fill="${u("leaf")}"/>
  <path d="M153 150C162 118 180 92 222 79 189 99 178 117 167 150Z" fill="${u("stem")}"/>
  ${arms ? `<path d="M48 243C30 239 15 225 10 212" stroke="${u("beet")}" stroke-width="22" stroke-linecap="round"/><path d="M214 247C230 243 241 233 248 221" stroke="${u("shade")}" stroke-width="22" stroke-linecap="round"/>` : ""}
  <path d="M128 142C83 140 37 163 28 202 16 251 55 280 89 309 103 321 117 328 128 341 139 329 153 321 168 309 203 282 232 258 229 218 226 172 182 144 128 142Z" fill="${u("beet")}"/>
  <path d="M140 143C184 154 209 181 206 219 204 252 183 279 159 296 146 309 137 322 128 341 140 330 154 320 168 309 203 282 232 258 229 218 226 177 191 149 140 143Z" fill="${u("shade")}" opacity=".85"/>
  <ellipse cx="86" cy="209" rx="15" ry="15.5" fill="${u("eye")}"/><ellipse cx="170" cy="209" rx="15" ry="15.5" fill="${u("eye")}"/>
  <circle cx="91" cy="203" r="4.4" fill="#FFF"/><circle cx="175" cy="203" r="4.4" fill="#FFF"/>
  <ellipse cx="68" cy="236" rx="13.4" ry="12" fill="${u("cheek")}"/><ellipse cx="188" cy="236" rx="13.4" ry="12" fill="${u("cheek")}"/>
  ${mouth === "smile" ? `<path d="M107 234C117 250 140 250 149 234" stroke="${u("eye")}" stroke-width="9" stroke-linecap="round"/>` : `<ellipse cx="128" cy="240" rx="9" ry="11" fill="${u("eye")}"/>`}
  ${tail ? `<path d="M128 338c-3 14 8 18 3 27-4 8-13 7-16 2" stroke="${u("shade")}" stroke-width="5" fill="none" stroke-linecap="round"/>` : ""}
 </g>`;
}
function formingBeet(id, x, y, scale) {
  const u = (n) => `url(#${id}-${n})`;
  return `<g transform="translate(${x} ${y}) scale(${scale})"><path d="M0-24C-13-24-20-16-20-8-20-3-18 0-16 1H16C18 0 20-3 20-8 20-16 13-24 0-24Z" fill="${u("beet")}"/><path d="M8-22C15-19 20-14 20-8 20-4 19-1 17 1H10C13-6 12-15 8-22Z" fill="${u("shade")}" opacity=".85"/><circle cx="-7" cy="-12" r="3.1" fill="${u("eye")}"/><circle cx="6" cy="-12" r="3.1" fill="${u("eye")}"/><circle cx="-6" cy="-13" r="1.1" fill="#FFF"/><circle cx="7" cy="-13" r="1.1" fill="#FFF"/><ellipse cx="-12" cy="-7" rx="2.3" ry="1.8" fill="${u("cheek")}"/><ellipse cx="11" cy="-7" rx="2.3" ry="1.8" fill="${u("cheek")}"/><path d="M-4-6Q0-2.5 4-6" stroke="${u("eye")}" stroke-width="2.2" stroke-linecap="round"/></g>`;
}
function paw(id, x, y, r = 25) {
  return `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.73}" transform="rotate(-13 ${x} ${y})" fill="url(#${id}-beet)"/>`;
}
function stack(id, y, top = false) {
  return `<path d="M132 ${y + 46}v25q0 9 14 14l97 31q13 5 26 0l97-31q14-5 14-14v-25Z" fill="url(#${id}-teal-side)"/><path d="${top ? `M198 ${y + 29}h113l55 8q28 9 0 18l-97 28q-13 5-26 0l-97-28q-28-9 0-18Z` : `m146 ${y + 34} 97-31q13-4 26 0l97 31q28 9 0 18l-97 31q-13 5-26 0l-97-31q-28-9 0-18Z`}" fill="url(#${id}-teal)"/>`;
}
function art(name, id) {
  const u = (n) => `url(#${id}-${n})`;
  switch (name) {
    case "framework":
      return `${stack(id, 371)}${stack(id, 309)}<g transform="translate(128 0)">${beet(id, { tail: false })}</g>${stack(id, 247, true)}${paw(id, 185, 280)}${paw(id, 323, 280)}`;
    case "btravstack":
      return `<g transform="translate(101 31) scale(1.18)">${beet(id, { arms: true })}</g>`;
    case "amqp-contract":
      return `<path d="m75 280 167-137q14-12 28 0l167 137v154H75Z" fill="${u("orange-side")}"/><path d="m83 279 162-131q11-9 22 0l162 131Z" fill="#FFD0A0"/><g transform="translate(133 -4) scale(.96)">${beet(id, { tail: false })}</g><rect x="75" y="280" width="362" height="171" rx="24" fill="${u("orange")}"/><path d="m82 287 156 112q18 12 36 0l156-112" fill="none" stroke="#FFD5A7" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>${paw(id, 161, 282, 23)}${paw(id, 349, 282, 23)}`;
    case "temporal-contract":
      return `<g transform="rotate(7 256 256)"><path d="M166 102c0 72 68 104 68 154s-68 74-68 166h180c0-92-68-116-68-166s68-82 68-154Z" fill="#B9B2F6" fill-opacity=".13"/><path d="M179 147Q218 138 256 148T333 147C321 190 279 215 265 240Q256 248 247 240C232 215 191 190 179 147Z" fill="${u("beet")}"/><path d="M183 148Q219 140 256 150T329 148" stroke="#F1A0C6" stroke-width="5" stroke-linecap="round"/><path d="M256 239C252 258 260 276 256 300" stroke="${u("beet")}" stroke-width="5" stroke-linecap="round"/><circle cx="256" cy="319" r="4" fill="${u("beet")}"/><circle cx="255" cy="337" r="3" fill="${u("beet")}"/><circle cx="257" cy="351" r="2.4" fill="${u("beet")}"/>${formingBeet(id, 256, 420, 2.5)}<path d="M166 101c0 72 68 105 68 155s-68 76-68 166m180-321c0 72-68 105-68 155s68 76 68 166" stroke="${u("indigo")}" stroke-width="12" fill="none"/><path d="M184 123c3 31 23 58 39 76m-41 198c1-29 15-53 28-70" stroke="#E4E0FF" stroke-width="6" stroke-linecap="round" opacity=".75"/><rect x="129" y="69" width="254" height="39" rx="19" fill="${u("indigo")}"/><path d="M148 78h213" stroke="#C6BFFA" stroke-width="5" stroke-linecap="round" opacity=".65"/><rect x="129" y="422" width="254" height="39" rx="19" fill="${u("indigo")}"/><path d="M148 430h213" stroke="#C6BFFA" stroke-width="5" stroke-linecap="round" opacity=".65"/></g>`;
    case "unthrown":
      return `<g transform="rotate(23 256 263)"><g transform="translate(147 27) scale(.87)">${beet(id, { arms: true, mouth: "o" })}</g></g><path d="m92 296 37-17m-37 52 40-16m-19 44 35-18" stroke="#EDA2C9" stroke-width="10" stroke-linecap="round"/><circle cx="256" cy="276" r="172" fill="none" stroke="${u("teal-side")}" stroke-width="23"/><path d="m134 154 244 244" stroke="${u("teal-side")}" stroke-width="23" stroke-linecap="round"/><path d="M104 207a163 163 0 0 1 177-91" stroke="#79D3C9" stroke-width="4" stroke-linecap="round" fill="none" opacity=".7"/>`;
    case "entity":
      return `<g transform="rotate(-5 256 280)"><rect x="43" y="147" width="426" height="275" rx="28" fill="#BCA8B7"/><rect x="43" y="137" width="426" height="275" rx="28" fill="${u("card")}"/><rect x="60" y="154" width="392" height="241" rx="17" stroke="#CFBEC9" stroke-width="3" fill="none"/><rect x="78" y="176" width="158" height="187" rx="18" fill="#CEBFCB"/><defs><clipPath id="${id}-portrait"><rect x="78" y="176" width="158" height="187" rx="18"/></clipPath></defs><g clip-path="url(#${id}-portrait)"><g transform="translate(78 197) scale(.62)">${beet(id, { tail: false })}</g><path d="M78 358h158" stroke="#AC94A7" stroke-width="10"/><path d="M78 354h158" stroke="#EDE0E8" stroke-width="4"/></g>${paw(id, 119, 358, 16)}${paw(id, 197, 358, 16)}<path d="M275 209h133m-133 47h91m-91 42h57" stroke="#A791A0" stroke-width="15" stroke-linecap="round"/><circle cx="382" cy="346" r="51" fill="${u("amber")}"/><circle cx="382" cy="346" r="39" fill="none" stroke="#FFE4A7" stroke-width="4"/><path d="m363 345 13 14 26-30" stroke="#714C1C" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/></g>`;
    case "di":
      return `<g transform="rotate(-35 256 255)"><rect x="244" y="69" width="24" height="74" rx="8" fill="${u("blue")}"/><rect x="200" y="57" width="112" height="30" rx="15" fill="${u("blue")}"/><rect x="204" y="141" width="104" height="207" rx="20" fill="#DCEAF9" fill-opacity=".88" stroke="${u("blue")}" stroke-width="8"/>${formingBeet(id, 256, 339, 1.9)}<rect x="212" y="150" width="88" height="31" rx="7" fill="${u("blue")}"/><path d="M216 203h25m-25 29h16m-16 29h25" stroke="#447EC8" stroke-width="6" stroke-linecap="round"/><path d="m234 350 11 29h22l11-29" fill="${u("blue")}"/><path d="M252 378h8l-3 72h-2Z" fill="${u("silver")}"/><rect x="185" y="130" width="142" height="22" rx="11" fill="${u("blue")}"/><path d="M219 161v151" stroke="#FFF" stroke-width="5" stroke-linecap="round" opacity=".5"/></g><path d="M371 455C369 462 362 469 364 474 366 482 377 482 379 474 381 469 374 462 371 455Z" fill="${u("beet")}"/>`;
    case "tools":
      return `${paw(id, 75, 296, 17)}<g transform="translate(72 35) scale(1.08)">${beet(id)}</g><g transform="translate(358 326) rotate(23)"><path d="M-34-111C-52-100-59-81-54-61-50-47-38-37-22-32V103a22 22 0 0 0 44 0V-32C38-37 50-47 54-61 59-81 52-100 34-111L30-72 0-55-30-72ZM9 100a9 9 0 1 1-18 0a9 9 0 1 1 18 0Z" fill="${u("silver")}" fill-rule="evenodd"/><path d="M-13-25v103" stroke="#F5F8FC" stroke-width="5" stroke-linecap="round" opacity=".8"/><path d="M31-94 27-70 0-54-27-70" stroke="#8A9DAF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></g>${paw(id, 354, 335, 23)}`;
    case "theme":
      return `<g transform="translate(71 23) scale(1.05)">${beet(id)}</g><g transform="translate(92 306) rotate(-14)"><path d="M-7-42H7L5 74Q0 87-5 74Z" fill="#AD7952"/><path d="M-2-29v88" stroke="#D9AC7E" stroke-width="3" stroke-linecap="round"/><path d="M-9-69C-18-90-10-106 0-128 10-106 18-90 9-69Z" fill="${u("beet")}"/><path d="M-4-79q-4-17 3-34" stroke="#EF96C2" stroke-width="3" stroke-linecap="round"/><path d="M-10-71H10L7-37H-7Z" fill="${u("silver")}"/><path d="M-8-65H8m-15 22H7" stroke="#7F94AC" stroke-width="2"/></g>${paw(id, 92, 306, 17)}${paw(id, 341, 361, 22)}<path d="M376 291C418 277 476 297 482 331 489 368 450 401 406 402 373 403 344 389 340 369 338 356 354 351 345 341 337 332 321 335 321 323 321 309 345 298 376 291ZM374 357a10 14 0 1 1-20 0a10 14 0 1 1 20 0Z" fill="${u("palette")}" fill-rule="evenodd"/><circle cx="379" cy="315" r="11" fill="#E7B352"/><circle cx="414" cy="313" r="11" fill="#63CDBF"/><circle cx="447" cy="329" r="11" fill="#8B85E5"/><circle cx="439" cy="366" r="11" fill="#E875AB"/><ellipse cx="363" cy="359" rx="6.5" ry="10" fill="${u("beet")}"/>`;
  }
}
function logo(name, mode = "light", small = false) {
  const id = `bt-${name}-${mode}${small ? "-small" : ""}`;
  const mono = mode === "mono";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" fill="none" role="img" aria-label="${titles[name]}">${defs(id)}${mono ? `<defs><filter id="${id}-gray"><feColorMatrix type="saturate" values="0"/></filter></defs><g filter="url(#${id}-gray)">` : ""}${art(name, id)}${mono ? "</g>" : ""}</svg>\n`.replace(
    /[ \t]+$/gm,
    "",
  );
}
for (const name of names) {
  for (const mode of ["light", "dark", "mono"])
    writeFileSync(`${output}/${name}-${mode}.svg`, logo(name, mode));
  writeFileSync(`${output}/${name}-favicon.svg`, logo(name, "light", true));
}

writeFileSync(
  new URL("../apps/website/public/favicon.svg", import.meta.url),
  logo("btravstack", "light", true),
);
const brandMark = logo("btravstack")
  .replace('width="512" height="512"', 'width="24" height="24"')
  .replace('role="img" aria-label="btravstack beetroot mascot"', 'aria-hidden="true"')
  .replaceAll("bt-btravstack-light", "bt-theme-attribution");
writeFileSync(
  new URL("../packages/theme/src/brand-mark.ts", import.meta.url),
  `export const brandMark = ${JSON.stringify(brandMark)};\n`,
);
