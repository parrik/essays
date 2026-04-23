// Local pre-publish canary. Builds the site, serves dist/ on localhost,
// runs verify.mjs against the local origin, then tears the server down.
// Exits with verify's exit code. Run before `git push`.
//
// Usage: npm run canary

import { spawn } from 'child_process';
import { setTimeout as sleep } from 'timers/promises';

const PORT = 4322; // avoid 4321 which `astro dev` uses
const HOST = '127.0.0.1';
const BASE = `http://${HOST}:${PORT}/`;

const run = (cmd, args, opts = {}) =>
  new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: 'inherit', ...opts });
    p.on('exit', (code) =>
      code === 0 ? resolve() : reject(new Error(`${cmd} ${args.join(' ')} exited ${code}`))
    );
  });

// 1. Build
console.log('\n▶ canary: build\n');
await run('npx', ['astro', 'build']);

// 2. Start preview server (background)
console.log(`\n▶ canary: serving ${BASE}\n`);
const preview = spawn(
  'npx',
  ['astro', 'preview', '--host', HOST, '--port', String(PORT)],
  { stdio: ['ignore', 'pipe', 'pipe'] }
);
preview.stderr.on('data', (d) => process.stderr.write(`[preview] ${d}`));

// 3. Wait for readiness (poll up to 15s)
const waitReady = async () => {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(BASE);
      if (r.ok) return true;
    } catch {}
    await sleep(250);
  }
  return false;
};

let verifyCode = 1;
try {
  if (!(await waitReady())) {
    console.error('canary: preview server did not become ready within 15s');
  } else {
    // 4. Run verify against local
    console.log('\n▶ canary: verify\n');
    await new Promise((resolve) => {
      const v = spawn('node', ['scripts/verify.mjs', BASE], { stdio: 'inherit' });
      v.on('exit', (code) => {
        verifyCode = code ?? 1;
        resolve();
      });
    });
  }
} finally {
  // 5. Tear down
  preview.kill('SIGTERM');
  // Give it a beat to release the port, in case canary is re-run immediately
  await sleep(200);
}

if (verifyCode === 0) {
  console.log('\n✓ canary: all checks passed — safe to push');
} else {
  console.error('\n✗ canary: failures above — fix before push');
}

process.exit(verifyCode);
