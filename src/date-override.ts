import { Temporal, toTemporalInstant } from "@js-temporal/polyfill";

declare global {
  interface Date {
    toTemporalInstant: (this: Date) => Temporal.Instant;
  }
}

Date.prototype.toTemporalInstant = toTemporalInstant;
