import PlayerBase from 'js-sequencer/core/PlayerBase';
export interface SfontNameMap {
    name: string;
    sfontId: number;
    digest: string;
}
export declare function loadSoundfontsFromManager(player: PlayerBase): Promise<SfontNameMap[]>;
export declare function replaceSoundfontsFromManager(sfonts: SfontNameMap[], player: PlayerBase): Promise<SfontNameMap[]>;
export declare function registerSfontMaps(sfonts: SfontNameMap[], player: PlayerBase): Promise<void>;
export declare function refreshSfontMapsOfPlayer(player: PlayerBase, sfontsCurrent: SfontNameMap[] | undefined): Promise<SfontNameMap[]>;
