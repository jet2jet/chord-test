declare global {
    interface HTMLElementEventMap {
        ['transitionend']: TransitionEvent;
        ['msTransitionEnd']: TransitionEvent;
        ['oTransitionEnd']: TransitionEvent;
    }
}
export declare function show(content: HTMLElement, closeCallback?: () => void): void;
export declare function hide(): void;
export declare function setAnotherOverlayVisible(visible: boolean): void;
