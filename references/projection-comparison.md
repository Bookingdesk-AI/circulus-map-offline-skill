# Projection comparison workflow

Use this guide when a user asks to compare projections, says a route looks different between map views, or wants output that explains which projection best supports a map-reading task.

## When to compare

Compare projections after the route is solved and stable. Keep `projection.mode` on `auto` for normal route solving; switch to an explicit comparison only when the user asks for projection differences, map-reading confidence, or export guidance.

Good triggers:

- `Compare JFK-HND across projections`
- `Why does this route look straight on one map and curved on another?`
- `Which projection should I use for a polar route?`
- `Show Mercator vs orthographic for SFO-SIN`

## Recommended compare set

Use a small set so the answer stays readable:

1. **Mercator / Web Mercator** — familiar baseline; useful for explaining exaggerated high-latitude curvature and rhumb-line intuition.
2. **Orthographic or azimuthal** — globe-like view; useful for showing the route as a direct path over Earth.
3. **Equal Earth / Robinson / Natural Earth** — world-map compromise; useful for presentation exports where global context matters.
4. **Gnomonic** — optional specialist view; useful when the user specifically wants great-circle paths to appear straight.

## Output pattern

Return a concise compare-oriented note with three parts:

1. **Same route, same geometry:** say the route distance/waypoints did not change; only the projection changed how the line is drawn.
2. **Projection differences:** list 2–4 projections and the visual tradeoff each introduces for this route.
3. **Recommendation:** pick one projection for the user's purpose: interpretation, polar/dateline diagnosis, or export/presentation.

Template:

> Comparing {ORIGIN} → {DESTINATION}: the waypoints and great-circle geometry stay the same; each projection only changes the 2D drawing. Mercator makes high-latitude arcs look more dramatic, orthographic reads like a globe view, and Equal Earth/Robinson is better for balanced world context. For {PURPOSE}, use {RECOMMENDED_PROJECTION} because {ROUTE_SPECIFIC_REASON}.

## Guardrails

- Do not imply projection comparison changes the underlying route, distance, ETOPS coverage, or waypoint order.
- Do not rank a projection as universally best; tie the recommendation to the route and user purpose.
- Do not use compare mode as a substitute for resolving ambiguous airports or malformed route input first.
- If the route crosses the dateline or nears the poles, mention that split/curved display artifacts can become projection-dependent.
