export default interface Channel {
    bank: number | null;
    preset: number | null;
    volume: number | null;
    nrpnMsb: number | null;
    nrpnLsb: number | null;
    rpnMsb: number | null;
    rpnLsb: number | null;
    rpnValue: number | null;
    isHolding: boolean;
    pitchRange: number | null;
    pitchMIDIValue: number | null;
}
export declare function makeChannel(isDrum: boolean): {
    bank: number;
    preset: number;
    volume: number;
    nrpnMsb: null;
    nrpnLsb: null;
    rpnMsb: null;
    rpnLsb: null;
    rpnValue: null;
    isHolding: boolean;
    pitchRange: number;
    pitchMIDIValue: number;
};
