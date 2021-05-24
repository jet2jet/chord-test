export declare type DelayMillisecFunction = 
/**
 * @param delayMillisec delay time in millisec
 */
(delayMillisec: number) => void;
export declare type CancelDelayMillisecFunction = () => void;
/**
 * @param callback A callback function called when the time has passed
 * @return `[<delayProcessFn>, <cancelDelayProcess>]`
 */
export default function makeDelayProcessRaw<T>(callback: () => void, fnSetTimeout: T extends null ? never : (fn: () => void, millisec: number) => T, fnClearTimeout: (timerId: T) => void): [DelayMillisecFunction, CancelDelayMillisecFunction];
