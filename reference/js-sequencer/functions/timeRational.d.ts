import { TimeRationalValue } from '../types';
export declare function clone(val: Readonly<TimeRationalValue>): TimeRationalValue;
export declare function add(a: TimeRationalValue, b: Readonly<TimeRationalValue>): TimeRationalValue;
export declare function sub(a: TimeRationalValue, b: Readonly<TimeRationalValue>): TimeRationalValue;
export declare function mul(a: TimeRationalValue, b: Readonly<TimeRationalValue>): TimeRationalValue;
export declare function div(a: TimeRationalValue, b: Readonly<TimeRationalValue>): TimeRationalValue;
export declare function compare(a: Readonly<TimeRationalValue>, b: Readonly<TimeRationalValue>): number;
export declare function normalize(val: TimeRationalValue): TimeRationalValue;
export declare function fromNumber(val: number): TimeRationalValue;
