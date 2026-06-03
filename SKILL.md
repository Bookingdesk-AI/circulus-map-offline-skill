---
name: circulus-map-offline
description: Use when the user wants aviation route maps, ETOPS-aware route analysis, projection comparisons, airport lookup, or SVG map rendering through a local Circulus Map MCP server. Prefer this skill for offline or bundled setups that should run against the local worker at http://127.0.0.1:8788/mcp, including quick-query route solving (`JFK-LHR`, `800nm@DEN`) and building or validating `MapSpecV1` payloads before rendering.
version: 1.3.27
---

# Circulus Map Offline

Use this skill when the task is about aviation route planning, map projections, airport lookup, ETOPS, or generating shareable SVG route maps through a local Circulus Map setup.

## Quick start

- Before using tools, make sure the local app is running with `npm run dev` and the MCP worker is running with `npm run mcp:dev`.
- Expect the local MCP endpoint at `http://127.0.0.1:8788/mcp`.
- For simple requests, call `map.solve_query` with shorthand input like `JFK-LHR`, `JFK to LHR`, `New York to London`, or `800nm@DEN`.
- For advanced requests, build a `MapSpecV1` object and call `map.solve_spec`.
- Normalize route phrasing before solving: preserve explicit airport codes, expand city/airport names through `map.search_locations`, and convert natural-language connectors (`to`, `from`, arrows, dashes) into an ordered waypoint list.
- Use `map.search_locations` before solving when the user is unsure about codes or city names, when a city has multiple plausible airports, or when a route mixes city names and IATA/ICAO codes.
- Use `map.get_airport` when you need a single airport record with coordinates and runway metadata.
- Use `map.render_svg` only after the route/spec is stable.
- When a user asks why a route curves, looks indirect, crosses the pole, or splits near the dateline, give a concise great-circle/projection explanation tied to the solved route before continuing.
- When a user asks to compare projections, first solve/stabilize the route, then give compare-oriented output: same route geometry, projection-specific visual differences, and one route-specific projection recommendation.
- For dateline crossings, polar routes, or sparse/unsupported airport inputs, run an edge-case preflight before rendering: confirm waypoint resolution, call out expected display artifacts, and separate map geometry from operational routing constraints.

## Tool selection

- `map.search_locations`: best first step for ambiguous airport/city input.
- `map.solve_query`: fastest path for route-only requests and simple range rings after the route text is unambiguous.
- `map.solve_spec`: use when the user cares about projection, ETOPS, labels, markers, multiple paths, or an explicit projection comparison.
- `map.list_scenarios`: use when the user asks for examples or wants a starting point.
- `map.render_svg`: use for final export-ready output, not exploration.

## Input understanding

Treat route input as an ordered intent, not just a string. Accept common phrasing such as `JFK-LHR`, `JFK → LHR`, `from JFK to Heathrow`, `New York to London via KEF`, and `SFO HND SIN`. Before solving:

1. Identify route-like connectors (`-`, `→`, `to`, `from`, `via`, commas, or whitespace between known airport tokens).
2. Preserve exact IATA/ICAO-looking tokens and normalize them to uppercase.
3. Resolve city names, airport names, and mixed inputs with `map.search_locations`; if multiple airports are plausible, ask the user to choose instead of guessing.
4. For malformed input, give one concise correction hint, for example: `I need at least two airports or cities, like JFK-LHR or New York to London.`

## Resources

- Read `circulus://mapspec/schema` before authoring a non-trivial `MapSpecV1`.
- Read `circulus://projection/guide` for projection choices and projection-specific wording.
- Read [references/projection-comparison.md](references/projection-comparison.md) when the user wants a projection comparison or asks which projection to use for a route.
- Read [references/edge-case-handling.md](references/edge-case-handling.md) when a route crosses the dateline, approaches polar regions, has sparse airport data, or uses unsupported/unknown locations.
- Read `circulus://scenario/catalog` and `circulus://api/examples` when you need examples quickly.

## References

- For local setup details and offline packaging expectations, read [references/local-setup.md](references/local-setup.md).
- For quick query and spec-writing guidance, read [references/mapspec.md](references/mapspec.md).
- For concise great-circle and projection-effect explanations, read [references/great-circle-explanations.md](references/great-circle-explanations.md).
- For compare-mode response structure and projection recommendation guidance, read [references/projection-comparison.md](references/projection-comparison.md).
- For dateline, polar, sparse-data, and unsupported-location handling, read [references/edge-case-handling.md](references/edge-case-handling.md).
- For sample payloads, inspect `assets/examples` when bundled with this skill package.

## Guardrails

- Stay within the MCP tool surface; do not invent unsupported write operations.
- Do not ask the MCP server to proxy arbitrary URLs or tile providers.
- Prefer `map.solve_query` over `map.solve_spec` unless explicit control is needed.
- If the local MCP server is unreachable, help the user restore the local app and worker before retrying tool calls.
