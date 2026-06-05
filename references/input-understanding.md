# Input understanding guide

Use this guide before solving when the user gives route text that mixes airport codes, city names, airport names, natural-language connectors, or incomplete route phrasing.

## Normalization checklist

1. Preserve explicit airport-code tokens exactly as route intent and uppercase them (`jfk`, `KJFK` → `JFK`, `KJFK`).
2. Treat connectors as ordering signals: `from`, `to`, `via`, `through`, `-`, `→`, commas, and whitespace between recognized airport codes.
3. Resolve prose names with `map.search_locations` before solving: cities (`New York`), airport names (`Heathrow`), and mixed phrases (`SFO to Tokyo Haneda`).
4. Keep waypoint order stable after normalization: origin first, destination last, `via` stops in the middle.
5. Do not render until every waypoint resolves to one intended airport or coordinate.

## Route-intent triage

Classify the raw user text before calling solve tools. This keeps corrections short and prevents accidental guesses.

| Classification | Use when | Next action | Example response |
| --- | --- | --- | --- |
| `ready_to_solve` | Two or more explicit IATA/ICAO-looking airport codes or coordinates are present and ordered | Normalize code case, preserve waypoint order, then call `map.solve_query` or `map.solve_spec` | `I'll solve JFK → LHR.` |
| `needs_search` | One or more waypoints are city names, airport names, aliases, or mixed prose | Call `map.search_locations` for each prose waypoint before solving | `I'll resolve Heathrow and Dubai before rendering.` |
| `needs_clarification` | Search or common knowledge indicates multiple plausible airports that would change the route | Ask one choice question; do not solve or render yet | `London can mean several airports. Do you want LHR, LGW, LCY, STN, LTN, or another airport?` |
| `malformed` | Fewer than two waypoints, unclear ordering, unsupported place text, or ETOPS/radius text mistaken for a route | Stop and give one correction hint | `I need at least two airports or cities, like JFK-LHR or New York to London.` |

Use the first blocking classification in the table: if a route has one exact code plus one ambiguous city, it is `needs_clarification`, not `ready_to_solve`.

## Common phrase patterns

- `JFK-LHR`, `JFK → LHR`, `jfk to lhr` → solve as `JFK` → `LHR`.
- `from San Francisco to Tokyo via Honolulu` → resolve `San Francisco`, `Tokyo`, and `Honolulu`; solve origin → via → destination.
- `Heathrow to Dubai` → resolve airport name/city text, then confirm if the result is not unique.
- `SFO HND SIN` → treat as an ordered multi-leg route only after all tokens are recognized as airport codes.

## Ambiguity handling

Ask one concise clarification question instead of guessing when a place can change route meaning:

- Multi-airport cities: `New York`, `London`, `Paris`, `Tokyo`, `Washington`, `Chicago`, `Milan`, `Rome`, `Shanghai`, `Seoul`.
- Airport-name collisions or aliases: `Springfield`, `Portland`, `National`, `International`, or partial airport names.
- Mixed granularity: one endpoint is an exact airport code and another is only a country, region, or broad metro area.

Clarification template:

> {PLACE} can mean several airports. Do you want {TOP_CODE_1}, {TOP_CODE_2}, or another airport?

## Malformed input feedback

Give a short correction hint and stop before calling solve tools when the route is underspecified:

- `I need at least two airports or cities, like JFK-LHR or New York to London.`
- `I can map that once the waypoint order is clear; try origin → destination → optional via stops.`
- `I found only one waypoint. Add a destination, for example SFO → HND.`

## Do not over-normalize

- Do not silently choose a default airport for a city when multiple airports are plausible.
- Do not reorder waypoints to make a route look more efficient; preserve the user's stated order.
- Do not treat ETOPS radius text (`800nm@DEN`) as an airport-to-airport route.
- Do not invent airport codes for unsupported or unknown locations.
