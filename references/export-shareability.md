# Export and shareability guide

Use this guide when a user asks for a reusable map result: SVG export, briefing artifact, documentation embed, handoff note, or a result they can share outside the current MCP session.

## When to prepare share output

Prepare share output only after the route/spec is stable and `map.render_svg` has produced or is ready to produce the final SVG. Do not use export guidance to skip route normalization, ambiguity checks, projection comparison, or edge-case preflight.

Good triggers:

- `Export JFK-LHR as SVG`
- `Give me something I can paste into a briefing`
- `Share the map result with projection notes`
- `Make this route reusable in docs`

## Share packet contents

For a final route map, return a compact share packet with:

1. **Route:** normalized origin, destination, and via waypoints.
2. **Projection:** projection mode/name and why it was chosen if the user asked for export, compare mode, dateline, or polar handling.
3. **Rendered artifact:** SVG filename/path or clear instruction to save the returned SVG.
4. **Reuse note:** one sentence on how to embed or attach the SVG.
5. **Caveat:** only include route-specific caveats that matter, such as dateline seam splits, polar projection stretch, ETOPS context, or unresolved operational data.

Template:

> Share packet — {ORIGIN} → {DESTINATION}: rendered as `{SVG_NAME}` using {PROJECTION}. Embed the SVG directly in docs or attach it to the briefing; keep the route note `{ROUTE_NOTE}` with the asset so readers understand {ROUTE_SPECIFIC_CAVEAT}.

## Operator guidance

- Prefer SVG for shareable output because it preserves labels, paths, and high-DPI rendering without screenshots.
- Keep the rendered SVG and a short route note together; the note should explain projection choice and any visual artifact that a reader might misread.
- If the user needs a raster image, tell them to convert the SVG after rendering rather than asking Circulus to change the route flow.
- If the route was built from city names, include resolved airport codes in the share packet so future readers can reproduce the same map.
- If ETOPS, alternates, weather, airspace, or filed-route data were not requested, state that the export is a map-geometry visualization, not an operational dispatch package.

## Examples

Briefing-ready SVG:

> Share packet — JFK → LHR: rendered as `jfk-lhr-great-circle.svg` using auto projection. Embed the SVG in the briefing and keep the note `JFK-LHR great-circle geometry; visual curvature is from projecting the globe path onto a flat map` with the asset.

Dateline route export:

> Share packet — SFO → SIN: rendered as `sfo-sin-pacific.svg` using an orthographic/Pacific-friendly view. Attach the SVG with the note `The route may split near ±180° on flat maps because of the dateline projection seam; the globe geometry remains continuous.`

## Guardrails

- Do not claim the SVG is a filed flight plan unless operational route data was explicitly included.
- Do not invent a filename/path if the tool did not provide one; say `save the returned SVG as ...` instead.
- Do not discard the existing solve/spec/render flow; this guide only improves the final handoff.
