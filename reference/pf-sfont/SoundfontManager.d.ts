export interface SoundfontEntry {
    name: string;
    bin: ArrayBuffer;
}
export declare type ErrorType = DOMException | Error;
export declare type SimpleCallback = (error: ErrorType | null) => void;
export declare type EnumSoundfontsCallback = (error: ErrorType | null, result: SoundfontEntry[] | null) => void;
export declare type RenameSoundfontCallback = (error: ErrorType | null, isMapChanged: boolean) => void;
export declare type DeleteSoundfontCallback = (error: ErrorType | null, isMapChanged: boolean) => void;
export declare type DefaultSoundfontNameCallback = (error: ErrorType | null, defaultName: string | undefined) => void;
export interface SoundfontMapData {
    targetBank: number;
    targetPreset: number;
    bank: number;
    preset: number;
    name: string;
    /** Non-number will be ignored, and in this case the default value will be used */
    ampPercent?: number | null;
}
export declare function enumSoundfonts(callback: EnumSoundfontsCallback): void;
export declare function storeSoundfont(name: string, bin: ArrayBuffer, callback: SimpleCallback): void;
export declare function storeSoundfontMultiple(entries: ReadonlyArray<Readonly<SoundfontEntry>>, callback: SimpleCallback): void;
export declare function renameSoundfont(oldName: string, newName: string, callback?: RenameSoundfontCallback): void;
export declare function deleteSoundfont(name: string, callback?: DeleteSoundfontCallback): void;
export declare function getDefaultSoundfontName(callback: DefaultSoundfontNameCallback): void;
export declare function setDefaultSoundfontName(name: string, callback?: SimpleCallback): void;
export declare function addSoundfontMap(name: string, targetBank: number, targetPreset: number, bank: number, preset: number, ampPercent: number | null | undefined, callback?: SimpleCallback): void;
export declare function getAllSoundfontMap(callback: (err: ErrorType | null, result: SoundfontMapData[] | null) => void): void;
export declare function removeSoundfontMap(name: string, targetBank?: number | null, targetPreset?: number | null, callback?: SimpleCallback): void;
