---
"@btravstack/theme": major
---

Repoint `--pkg-unthrown` to teal `#3FB0A5`, and remove the retired
`--pkg-demesne` and `--pkg-start` tokens.

Red is stop and green is all-clear; a modeled error is neither, so unthrown's
accent now sits outside the signal register — not a signal, a value. The old
`#46B86C` was also byte-identical to `--bt-green`, the org's checkmark ink, so
unthrown was the one package whose accent was org chrome.

**Breaking:** `./tokens.css` is a published export, so its custom properties are
public API and removing two of them is a breaking change — even though the
projects they named no longer exist and no repo in the org referenced them. They
are removed rather than kept as deprecated aliases because an alias would point
at a package that is gone.

`--bt-green` / `--green` / `--text-green` are unchanged.
