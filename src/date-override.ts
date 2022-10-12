import { Temporal, toTemporalInstant } from "@js-temporal/polyfill";

declare global {
  interface Date {
    toTemporalInstant: (this: Date) => Temporal.Instant;
  }
}
// eslint-disable-next-line no-extend-native
Date.prototype.toTemporalInstant = toTemporalInstant;
