export default class FrameQueue {
    private frames;
    private curFrames;
    private offset;
    private queuedFrames;
    pushFrames(rawFrames: [ArrayBuffer, ArrayBuffer]): void;
    pushMarker(marker: string): void;
    getFrameCountInQueue(): number;
    isEmpty(): boolean;
    clear(): void;
    outputFrames(dest: [Float32Array, Float32Array], cbMarker: (marker: string, framesBeforeMarker: number) => void): number;
    private nextFrame;
}
