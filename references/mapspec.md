# MapSpecV1 notes

- `version` must be `1`.
- `paths[].waypoints` accepts airport codes, city names, airport names, or coordinate objects.
- Normalize route text into ordered waypoints before writing a spec. Keep explicit airport-code tokens uppercase (`JFK`, `LHR`, `KSFO`) and resolve names through `map.search_locations` when the user gives cities or airports in prose.
- Do not silently choose among city airports when the choice changes the route meaning, such as `New York`, `London`, `Tokyo`, `Paris`, or `Washington`; ask for the preferred airport or show the top matches.
- `projection.mode` should usually stay `auto` unless the user explicitly wants a projection comparison.
- `etops.enabled` should be `true` only when the user is asking about diversion coverage or alternates.
- `mapStyle.globeTexture` affects the rendered look but not route geometry.

## Quick-query normalization

Supported route phrasing examples before solving:

- `JFK-LHR`, `JFK → LHR`, `JFK to LHR` → `JFK`, `LHR`
- `from San Francisco to Tokyo via Honolulu` → resolve `San Francisco`, `Tokyo`, `Honolulu` with `map.search_locations`, then solve in that order
- `SFO HND SIN` → treat as a three-leg ordered route only after tokens are recognized as airport codes

Malformed or ambiguous input should get actionable feedback instead of a blind solve. Use short responses such as:

- `I need at least two airports or cities, like JFK-LHR or New York to London.`
- `London can mean several airports. Do you want LHR, LGW, LCY, STN, or LTN?`
- `I can map that once the waypoint order is clear; try origin → destination → optional via stops.`

Quick examples:

```json
{
  "version": 1,
  "paths": [
    {
      "waypoints": ["JFK", "LHR"],
      "type": "geodesic"
    }
  ]
}
```

```json
{
  "version": 1,
  "paths": [
    {
      "waypoints": ["LAX", "HNL", "NRT"],
      "type": "geodesic"
    }
  ],
  "etops": {
    "enabled": true,
    "ruleTimes": [180],
    "engineOutSpeed": 420,
    "speedUnit": "kts"
  }
}
```
