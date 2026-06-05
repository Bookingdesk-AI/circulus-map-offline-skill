import { readFileSync, existsSync } from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';

const skillPath = 'SKILL.md';
const readmePath = 'README.md';
const inputPath = 'references/input-understanding.md';
const guidePath = 'references/great-circle-explanations.md';
const comparisonPath = 'references/projection-comparison.md';
const edgePath = 'references/edge-case-handling.md';
const exportPath = 'references/export-shareability.md';

const skill = readFileSync(skillPath, 'utf8');
const readme = readFileSync(readmePath, 'utf8');
const inputGuide = readFileSync(inputPath, 'utf8');
const guide = readFileSync(guidePath, 'utf8');
const comparison = readFileSync(comparisonPath, 'utf8');
const edge = readFileSync(edgePath, 'utf8');
const exportGuide = readFileSync(exportPath, 'utf8');

test('skill exposes input understanding guidance', () => {
  assert.match(skill, /version: 1\.3\.29/);
  assert.match(skill, /route phrasing is ambiguous, malformed, city-name-heavy, or mixes prose with airport codes/);
  assert.match(skill, /references\/input-understanding\.md/);
  assert.equal(existsSync(inputPath), true);
});

test('input guide normalizes route phrasing without guessing', () => {
  assert.match(inputGuide, /Preserve explicit airport-code tokens/);
  assert.match(inputGuide, /Treat connectors as ordering signals/);
  assert.match(inputGuide, /Do not render until every waypoint resolves/);
  assert.match(inputGuide, /Ask one concise clarification question instead of guessing/);
  assert.match(inputGuide, /Do not silently choose a default airport/);
});

test('readme advertises input understanding and ambiguity feedback', () => {
  assert.match(readme, /Route input normalization and ambiguity feedback/);
  assert.match(readme, /references\/input-understanding\.md/);
});


test('skill links the great-circle explanation guide', () => {
  assert.match(skill, /why a route curves, looks indirect, crosses the pole, or splits near the dateline/);
  assert.match(skill, /references\/great-circle-explanations\.md/);
  assert.equal(existsSync(guidePath), true);
});

test('guide is route-specific, projection-aware, and bounded', () => {
  assert.match(guide, /Using \{ORIGIN\} → \{DESTINATION\}/);
  assert.match(guide, /shortest path over the globe/);
  assert.match(guide, /Mercator \/ Web Mercator/);
  assert.match(guide, /Dateline crossings/);
  assert.match(guide, /Do not call the displayed line a filed flight plan/);
});

test('readme advertises the additive explanation capability', () => {
  assert.match(readme, /Concise great-circle explanations for curved, polar, or dateline-split route displays/);
});


test('skill exposes projection comparison workflow guidance', () => {
  assert.match(skill, /asks to compare projections/);
  assert.match(skill, /same route geometry, projection-specific visual differences/);
  assert.match(skill, /references\/projection-comparison\.md/);
  assert.equal(existsSync(comparisonPath), true);
});

test('projection comparison guide keeps route geometry stable and recommends by purpose', () => {
  assert.match(comparison, /Same route, same geometry/);
  assert.match(comparison, /Mercator \/ Web Mercator/);
  assert.match(comparison, /Orthographic or azimuthal/);
  assert.match(comparison, /Do not imply projection comparison changes the underlying route/);
  assert.match(comparison, /For \{PURPOSE\}, use \{RECOMMENDED_PROJECTION\}/);
});

test('readme advertises compare-mode projection guidance', () => {
  assert.match(readme, /Projection comparison workflow with route-stable geometry notes and projection recommendations/);
  assert.match(readme, /references\/projection-comparison\.md/);
});


test('skill exposes edge-case preflight guidance', () => {
  assert.match(skill, /edge-case preflight before rendering/);
  assert.match(skill, /dateline crossings, polar routes, or sparse\/unsupported airport inputs/);
  assert.match(skill, /references\/edge-case-handling\.md/);
  assert.equal(existsSync(edgePath), true);
});

test('edge-case guide covers dateline, polar, and sparse-data handling', () => {
  assert.match(edge, /Confirm waypoint resolution/);
  assert.match(edge, /Dateline crossings/);
  assert.match(edge, /projection seam artifact/);
  assert.match(edge, /Polar and high-latitude routes/);
  assert.match(edge, /Sparse data and unsupported locations/);
  assert.match(edge, /Do not render partial routes with missing waypoints/);
});

test('readme advertises edge-case preflight guidance', () => {
  assert.match(readme, /Edge-case preflight guidance for dateline crossings, polar routes, sparse data, and unsupported locations/);
  assert.match(readme, /references\/edge-case-handling\.md/);
});

test('skill exposes export share-packet guidance', () => {
  assert.match(skill, /export, share, embed, or hand off a final route map/);
  assert.match(skill, /normalized route, projection choice, SVG artifact\/save instruction/);
  assert.match(skill, /references\/export-shareability\.md/);
  assert.equal(existsSync(exportPath), true);
});

test('export guide supports reusable SVG handoffs without changing route flow', () => {
  assert.match(exportGuide, /Share packet contents/);
  assert.match(exportGuide, /Route:/);
  assert.match(exportGuide, /Projection:/);
  assert.match(exportGuide, /Rendered artifact:/);
  assert.match(exportGuide, /Do not discard the existing solve\/spec\/render flow/);
  assert.match(exportGuide, /map-geometry visualization, not an operational dispatch package/);
});

test('readme advertises export shareability guidance', () => {
  assert.match(readme, /Export\/share packets for briefing-ready SVG reuse, projection notes, and route-specific caveats/);
  assert.match(readme, /references\/export-shareability\.md/);
});
