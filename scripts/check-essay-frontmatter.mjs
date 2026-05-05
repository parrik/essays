#!/usr/bin/env node
// Audit non-draft essays for the discipline-required frontmatter fields:
//   - surprise (string): the moment the author's prior expectation broke
//   - coAuthoredWith (array): LLMs that helped beyond polish (empty array
//     allowed when authored solo; missing is treated as undeclared)
//
// Per audit-knife (2026-05-02 self-audit of parrik.com) recs #4 and #5.
//
// Soft-warn until 2026-05-18; hard-fail after. Set ESSAY_FRONTMATTER_HARD_FAIL=1
// to enforce now.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, basename } from 'node:path';

const ESSAYS_DIR = process.env.ESSAYS_DIR || 'src/content/essays';
const HARD_FAIL = process.env.ESSAY_FRONTMATTER_HARD_FAIL === '1';

function parseFrontmatter(text) {
  if (!text.startsWith('---\n')) return null;
  const end = text.indexOf('\n---', 4);
  if (end === -1) return null;
  const yaml = text.slice(4, end);
  const fm = {};
  let key = null;
  for (const rawLine of yaml.split('\n')) {
    const line = rawLine.replace(/\r$/, '');
    if (/^[a-zA-Z_][\w]*\s*:/.test(line)) {
      const [k, ...rest] = line.split(':');
      key = k.trim();
      const v = rest.join(':').trim();
      if (v === '' || v === '|') {
        fm[key] = '';
      } else if (v === '[]') {
        fm[key] = [];
      } else if (v.startsWith('[') && v.endsWith(']')) {
        fm[key] = v.slice(1, -1).split(',').map((s) => s.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
      } else {
        fm[key] = v.replace(/^['"]|['"]$/g, '');
      }
    } else if (/^\s+/.test(line) && key) {
      // Continuation; treat as multi-line string append.
      fm[key] = (typeof fm[key] === 'string' ? fm[key] : '') + ' ' + line.trim();
    }
  }
  return fm;
}

function isMarkdownFile(p) {
  return p.endsWith('.md') || p.endsWith('.mdx');
}

function findEssays(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const st = statSync(p);
    if (st.isDirectory()) {
      out.push(...findEssays(p));
    } else if (isMarkdownFile(p)) {
      out.push(p);
    }
  }
  return out;
}

const essays = findEssays(ESSAYS_DIR);
let exit = 0;
const findings = [];

for (const path of essays) {
  const text = readFileSync(path, 'utf8');
  const fm = parseFrontmatter(text);
  if (!fm) {
    findings.push({ path, level: 'fail', issue: 'no frontmatter block' });
    exit = 2;
    continue;
  }
  if (fm.draft === 'true' || fm.draft === true) {
    continue;
  }
  const issues = [];
  if (!fm.surprise || (typeof fm.surprise === 'string' && fm.surprise.trim() === '')) {
    issues.push('missing or empty `surprise` field — per audit-knife: name the moment your expectation broke');
  }
  if (fm.coAuthoredWith === undefined) {
    issues.push('missing `coAuthoredWith` field — per audit-knife: declare LLM co-authorship explicitly (empty array if solo)');
  }
  if (issues.length > 0) {
    findings.push({ path, level: 'warn', issues });
    exit = Math.max(exit, 1);
  }
}

for (const f of findings) {
  const tag = f.level === 'fail' ? 'FAIL' : 'WARN';
  console.log(`[${tag}] ${basename(f.path)}`);
  if (f.issue) console.log(`  - ${f.issue}`);
  if (f.issues) for (const i of f.issues) console.log(`  - ${i}`);
}

if (findings.length === 0) {
  console.log('check-essay-frontmatter: clean.');
}

if (!HARD_FAIL && exit !== 0) {
  console.log(`\ncheck-essay-frontmatter: soft-warn mode (exit forced to 0). Set ESSAY_FRONTMATTER_HARD_FAIL=1 to enforce.`);
  process.exit(0);
}

process.exit(exit);
