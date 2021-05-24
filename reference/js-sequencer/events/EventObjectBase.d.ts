export default abstract class EventObjectBase {
    private _preventDefault;
    private _stopPropagation;
    /**
     * Prevent the default action for this event.
     * For status-update events, this method affects nothing.
     */
    preventDefault(): void;
    /**
     * Stop calling all following event handlers.
     */
    stopPropagation(): void;
    isDefaultPrevented(): boolean;
    isPropagationStopped(): boolean;
}
