import * as JSSynth from 'js-synthesizer';
export interface Generator extends Base {
    id?: never;
    type: 'gen';
    data: {
        channel: number;
        type: JSSynth.Constants.GeneratorTypes;
        /** null for reset to initial value */
        value: number | null;
        /** true for keeping effect value of current playing voices */
        keepCurrentVoice?: boolean | null;
    };
    /** in milliseconds, or null for send immediately */
    time: number | null;
}
