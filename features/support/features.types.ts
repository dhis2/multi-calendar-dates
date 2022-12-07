import {
  FixedPeriod,
  PeriodIdentifier,
} from "../../src/period-calculation/fixed-periods";
import { SupportedCalendar } from "../../src/types";

export interface MyWorld {
  calendar: SupportedCalendar;
  year: number;

  periods: Array<FixedPeriod>;
  results: DataTableResult;
  periodType: PeriodIdentifier;
  labels: string[][];
  values: string[][];
}
export type DataTable = {
  year: string;
  periodType: PeriodIdentifier;
  periodCount: string;
  periodIndex: number;
  periodLabel: string;
  periodValue: string;
};

export type DataTableResult = Array<
  DataTable & { generatedPeriods: Array<FixedPeriod> }
>;
