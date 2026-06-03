# Great-circle explanation guide

Use this guide when a user asks why an aviation route curves, appears indirect, crosses high latitudes, or splits near the dateline after solving a Circulus route.

## Default response pattern

Keep the explanation tied to the actual route and map result. Use two sentences by default:

1. Name the solved route, for example `Using SFO → HND`.
2. Explain that Circulus draws a great-circle/geodesic path: the shortest path over a sphere-like Earth model.
3. Explain the flat-map effect: the chosen projection bends, stretches, or splits that globe path when it is drawn in 2D.

Template:

> Using {ORIGIN} → {DESTINATION}: Circulus is drawing the great-circle route, the shortest path over the globe. On a flat {PROJECTION} map, that globe-shortest path is reprojected, so it can look curved or split even though the geometry is direct.

## Projection-aware cues

- **Mercator / Web Mercator:** constant-bearing rhumb lines can look straight, while shortest great-circle paths usually arc; high latitudes are visually stretched.
- **Equal Earth / Robinson / Natural Earth:** world-shape compromises reduce some extreme area distortion, but globe-shortest paths can still curve when flattened.
- **Azimuthal / orthographic:** routes near the projection center can look more direct; routes far from center distort more.
- **Polar routes:** the path may lean toward the pole because that is often shorter than following a lower-latitude line on a flat map.
- **Dateline crossings:** the path may split near ±180° longitude to avoid drawing an artificial line across the entire map.

## Do not overclaim

- Do not call the displayed line a filed flight plan unless a filed-route data source is present.
- Do not attribute route shape to winds, weather, airline preference, airspace, or geopolitical restrictions unless those layers are explicitly included.
- Do not imply ETOPS rings change the great-circle geometry; they explain diversion coverage around the route.

## Short examples

- `Using JFK → LHR: the line curves because Circulus draws the great-circle route, the shortest path over the globe. The flat projection bends that globe path, so the apparent arc is projection effect rather than a detour.`
- `Using LAX → HND: the Pacific route may lean north because the shortest globe path is not a straight east-west line on this projection. If the route crosses the dateline, Circulus may split the line to keep the rendered geometry geographically correct.`
- `Using CPH → NRT: the polar-looking arc is expected for a high-latitude great-circle route. Mercator-style maps make that arc look more dramatic because they stretch high latitudes.`
