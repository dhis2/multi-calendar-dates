# multi-calendar-engine

This is the engine to build a multi-calendar component (part of @dhis/ui) that supports various calendars used around the world (i.e. Ethiopic, Nepali etc..).

It relies on the [Temporal API](https://tc39.es/proposal-temporal) which aims to achieve, among other goals, full-support for non-Gregorian calendars.

This [document](https://docs.google.com/document/d/19zjyB45oBbqC5KeubaU8E7cw9fGhFc3tOXY0GkzZKqc/edit?userstoinvite=hendrik%40dhis2.org#heading=h.rjt0etsbsqh6) documents the requirements and design decisions for multi-calendar support.

## Architecture Design Records

-   [Use Temporal API as the backbone of the engine](./doc/architecture/decisions/0002-use-temporal-api-as-the-backbone-for-the-engine.md)
