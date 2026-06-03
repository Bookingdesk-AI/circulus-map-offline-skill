# Edge-case handling guide

Use this guide before final rendering when a route crosses the dateline, approaches polar regions, depends on sparse airport data, or includes unsupported/unknown locations. The goal is to preserve the current route-map flow while adding clearer checks and user-facing messaging for cases that otherwise look like rendering errors or silent guesses.

## Edge-case preflight

Run this short preflight after resolving the route and before `map.render_svg`:

1. **Confirm waypoint resolution:** verify each user-supplied code, city, airport, or coordinate resolved to the intended waypoint. If a waypoint is unknown or ambiguous, stop and ask for the missing airport/city instead of rendering.
2. **Identify geography-sensitive route shape:** note dateline crossings, high-latitude/polar arcs, or multi-leg routes that may be clipped/split by projection seams.
3. **Separate geometry from operations:** explain that Circulus is drawing map geometry unless ETOPS, alternates, filed routes, weather, or airspace layers were explicitly requested.
4. **Choose the smallest next action:** solve/render when the route is stable; otherwise return one correction question or one unsupported-case workaround.

## Dateline crossings

Use for routes like `LAX-HND`, `SFO-SIN`, `AKL-LAX`, or Pacific itineraries that may cross ±180° longitude.

Recommended message:

> This route may cross the dateline, so Circulus can split the displayed path near ±180° longitude to avoid drawing a false line across the entire world map. The route geometry is still continuous on the globe; the split is a projection seam artifact.

Checks:

- Do not treat a split SVG path as a broken route when the solved waypoints are correct.
- If the user wants a presentation export, suggest comparing Mercator/Web Mercator with orthographic or a Pacific-centered projection when available.
- If the route appears to wrap the long way around, re-check waypoint order and longitude normalization before rendering.

## Polar and high-latitude routes

Use for routes like `CPH-NRT`, `JFK-DEL`, `ORD-PEK`, or routes near Alaska, Greenland, northern Canada, Siberia, or Antarctica.

Recommended message:

> This route may arc toward high latitudes because a great-circle path can be shorter over the globe than a lower-latitude line on a flat map. Polar-looking geometry is a map/route-shape cue, not proof of a filed polar airway unless operational route data is included.

Checks:

- Mention projection stretch when Mercator-style maps make polar arcs look exaggerated.
- Avoid promising operational feasibility without weather, winds, airspace, aircraft, and diversion constraints.
- If ETOPS is enabled, describe diversion coverage separately from the great-circle path shape.

## Sparse data and unsupported locations

Use when `map.search_locations`, `map.get_airport`, or `map.solve_query` cannot confidently resolve a waypoint.

Recommended messages:

- `I could not confidently resolve {WAYPOINT}. Use an IATA/ICAO airport code or a more specific city/airport name.`
- `{CITY} has multiple plausible airports. Choose one before I render: {CODE_LIST}.`
- `Circulus can map coordinates if the airport is unsupported; provide latitude/longitude or a nearby supported airport.`

Checks:

- Do not silently substitute a nearby airport unless the user asked for a fallback.
- Do not render partial routes with missing waypoints.
- Prefer a single clear correction question over a long unsupported-data explanation.

## Compact response pattern

When an edge case is present but not blocking, use this structure:

> {ROUTE}: {EDGE_CASE_NOTE}. The solved waypoints stay {WAYPOINT_LIST}; {NEXT_ACTION_OR_RECOMMENDATION}.

Example:

> SFO → SIN: this Pacific route may cross the dateline, so the rendered path can split at the projection seam. The solved waypoints stay SFO and SIN; I would render it as-is, and use an orthographic/Pacific-centered view if the export needs to read like a globe.

## Guardrails

- Do not delete or bypass the normal solve-query/spec-render flow; this is a preflight layer around it.
- Do not call projection artifacts routing errors when waypoint resolution and geometry are stable.
- Do not overclaim operational constraints without explicit data layers.
- Do not make the user choose among ambiguous airports after rendering; resolve ambiguity first.
