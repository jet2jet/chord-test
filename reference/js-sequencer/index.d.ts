import * as Core from './core';
import * as Events from './events';
import * as Objects from './objects';
import * as Types from './types';
import * as TimeRational from './functions/timeRational';
declare global {
    var LIBRARY_VERSION: string;
}
declare const version: string;
export { Core, Events, Objects, TimeRational, Types, version };
