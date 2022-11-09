# 2. Use Temporal API as the backbone for the engine

Date: 2022-11-09

## Status

Accepted

## Context

To drive the functionality of the Calendar Engine, we considered two main options:

1. A custom implementation of the multi-calendars based on the previous calendar used in DHIS2 ([WorldCalendars](https://github.com/kbwood/world-calendars)). This library is battle-tested in older DHIS2 versions and, even though an internal library, it is based on the knowledge accumulated through having the previous calendar being used extensively in dhis2 implementations on the ground.

1. The other possibility is to based the Engine on the [Temporal API](https://tc39.es/proposal-temporal/docs/). This is a standard that is currently in stage 3, and should be supported natively by browsers in the future.

| | World Calendars | Temporal API |
| -- | --- | --- |
| Standard | ❌ custom implementation | ✅  standard specification but not final and subject to change |
| Calendar Support | ✅ Supports all calendars we need | 🟡 almost all calendars we need (except Nepalese) |
| Production-ready | 🟡 although this is based on a battle-tested library we used in dhis2, the standalone implementation was not used in production | ❌ There are polyfills but the API is still work in progress (stage 3 specs) | 
| Supports addition, subtraction, conversions, calculating durations | 🟡 Yes, and with relatively good test coverage but not sure if it covers all scenarios | ✅ |


## Decision

We decided to build the engine on top of the Temporal API standard.

We managed to implement a custom calendar (Nepali) based on World-Calendars logic which makes us cover all the calendars we need in DHIS2. This was the biggest obstacle against adopting Temporal for our usecase, and we decided that going with an implementation that will soon(ish) be natively supported by browsers is a sensible direction to take.

The main risk is that the standard is still at stage 3 and subject to changes, and we will be relying on the [polyfill](https://github.com/js-temporal/temporal-polyfill) for the time being. We will try to mitigate this risk by abstracting the API through this engine, but in general we thought this is a better investment for the (near) future and the benefits of following a standard outweigh those of following a custom implementation. Furthermore, even though the ideas behind World-Calendars were battle-tested in DHIS2, the new abstracted engine is not, so it also comes with its own risks of having issues or bugs down the line.

## Consequences

We can fully rely on the Temporal API (along the [Internationalisation standard ECMA402](https://tc39.es/ecma402)) to support all calendars except Nepali.

For Nepali, localisation is a bit awkward as it is not a language natively by the [Unicode Common Language Repository (CLDR)](https://cldr.unicode.org/index). We will have to manually localise it but that can be abstracted by the engine in a way that doesn't affect clients (i.e. the Calendar UI component) that much.

## Resources

- [Temporal API specifications](https://tc39.es/proposal-temporal/docs/index.html)
- [Implementing Custom Calendars](https://tc39.es/proposal-temporal/docs/calendar.html)
- [Discussion about implementing Nepali](https://github.com/js-temporal/temporal-polyfill/discussions/190)
- [DHIS2 Multi-Calendar requirements and design docs](https://docs.google.com/document/d/19zjyB45oBbqC5KeubaU8E7cw9fGhFc3tOXY0GkzZKqc/edit?userstoinvite=hendrik%40dhis2.org#)