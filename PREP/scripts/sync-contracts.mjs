#!/usr/bin/env node
/**
 * Copies the shared contract sources from the backend repository into
 * `src/contracts/`.
 *
 * Why a copy instead of a dependency: the backend services depend on
 * `@prep/contracts` with a `file:` path, which works because they sit next to it
 * in the same repository. The frontend lives in a different repository root, so a
 * relative `file:` dependency would break on any machine or CI job with a
 * different layout. A checked-in generated copy keeps the frontend buildable on
 * its own while `check` below makes drift a build failure rather than a silent
 * disagreement about what a status string means.
 *
 *   npm run sync:contracts    regenerate the copy
 *   npm run check:contracts   fail if the copy is out of date
 *
 * Source location can be overridden with PREP_CONTRACTS_SRC.
 */
import { createHash } from 'node:crypto';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');

const source = resolve(
  process.env.PREP_CONTRACTS_SRC ??
    join(projectRoot, '..', '..', 'PREP', 'shared', 'prep-contracts', 'src'),
);

const destination = join(projectRoot, 'src', 'contracts');

const BANNER = [
  '// GENERATED FILE -- DO NOT EDIT.',
  '// Source of truth: PREP/shared/prep-contracts',
  '// Regenerate with: npm run sync:contracts',
  '',
].join('\n');

const checkOnly = process.argv.includes('--check');

if (!existsSync(source)) {
  console.error(`Contract sources not found at: ${source}`);
  console.error(
    'Set PREP_CONTRACTS_SRC to the path of PREP/shared/prep-contracts/src.',
  );
  process.exit(1);
}

function listFiles(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });

  return entries
    .flatMap((entry) => {
      const full = join(dir, entry.name);

      if (entry.isDirectory()) {
        return listFiles(full);
      }

      return entry.name.endsWith('.ts') ? [full] : [];
    })
    .sort();
}

const files = listFiles(source);

/** Content each destination file should have, banner included. */
const expected = new Map(
  files.map((file) => {
    const rel = relative(source, file);
    const body = readFileSync(file, 'utf8');

    return [rel, BANNER + body];
  }),
);

if (checkOnly) {
  const problems = [];

  for (const [rel, content] of expected) {
    const target = join(destination, rel);

    if (!existsSync(target)) {
      problems.push(`missing: src/contracts/${rel}`);
      continue;
    }

    const actual = readFileSync(target, 'utf8');

    if (hash(actual) !== hash(content)) {
      problems.push(`out of date: src/contracts/${rel}`);
    }
  }

  if (problems.length > 0) {
    console.error('Shared contracts have drifted:\n' + problems.join('\n'));
    console.error('\nRun: npm run sync:contracts');
    process.exit(1);
  }

  console.log(`Contracts up to date (${expected.size} files).`);
  process.exit(0);
}

if (existsSync(destination)) {
  rmSync(destination, { recursive: true });
}

for (const [rel, content] of expected) {
  const target = join(destination, rel);

  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, content, 'utf8');
}

console.log(
  `Synced ${expected.size} contract files from ${source} into src/contracts.`,
);

function hash(value) {
  return createHash('sha256').update(value.replace(/\r\n/g, '\n')).digest('hex');
}
