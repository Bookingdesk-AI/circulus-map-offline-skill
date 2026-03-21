# Circulus Map Offline Skill

Offline-first aviation route planning skill for MCP clients.

## What this skill does

**Circulus Map Offline** helps agents and operators generate high-fidelity aviation maps without relying on hosted APIs. It is optimized for local development, air-gapped workflows, and privacy-sensitive route analysis.

Key capabilities:
- Great-circle and route geometry solving
- ETOPS-aware map workflows
- Airport lookup and coordinate enrichment
- Projection comparison support
- SVG rendering for export-ready route visuals

## Best use cases

Use this skill when you need:
- local/localhost aviation mapping
- deterministic offline behavior
- reproducible route-map outputs for docs and briefings
- MCP-native route tooling without cloud credentials

## Local runtime

Expected local endpoint:
- `http://127.0.0.1:8788/mcp`

Typical startup from project root:
- `npm run dev`
- `npm run mcp:dev`

## Included assets

- `SKILL.md` — trigger + workflow guidance
- `references/local-setup.md` — local/offline setup details
- `references/mapspec.md` — query/spec authoring notes
- `assets/examples/*` — sample route specs
- `agents/openai.yaml` — local MCP dependency wiring

## Security & privacy posture

- Localhost-only MCP target by default
- No hosted credential requirement
- Read-oriented route solving workflow
- Suitable for offline/bundled execution contexts

## Search-friendly keywords

aviation map skill, offline MCP skill, ETOPS route planning, great circle route map, airport route visualization, local MCP aviation tools
