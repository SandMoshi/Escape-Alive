// Contains utilities related to audio playing

type HowlErrorCallback = (soundId: number, error: unknown) => void;
type HowlCallback = (soundId: number) => void;
type SpatialOrientation = [number, number, number];
type SpatialPosition = [number, number, number];

type HowlSound = {
  play(spriteOrId?: string | number): number; // .play() is not chainable; the other methods are
  pause(id?: number): void;
  stop(id?: number): void;
  mute(): boolean;
  mute(muted: boolean, id?: number): void;
  volume(): number;
  volume(idOrSetVolume: number): number;
  volume(volume: number, id: number): void;
  fade(from: number, to: number, duration: number, id?: number): void;
  rate(id?: number): number;
  rate(rate: number, id?: number): void;
  seek(id?: number): number;
  seek(seek: number, id?: number): void;
  loop(id?: number): boolean;
  loop(loop: boolean, id?: number): void;
  playing(id?: number): boolean;
  duration(id?: number): number;
  state(): "unloaded" | "loading" | "loaded";
  load(): void;
  unload(): null;
  on(event: "load", callback: () => void, id?: number): void;
  on(
    event: "loaderror" | "playerror",
    callback: HowlErrorCallback,
    id?: number
  ): void;
  on(
    event:
      | "play"
      | "end"
      | "pause"
      | "stop"
      | "mute"
      | "volume"
      | "rate"
      | "seek"
      | "fade"
      | "unlock",
    callback: HowlCallback,
    id?: number
  ): void;
  on(
    event: string,
    callback: HowlCallback | HowlErrorCallback,
    id?: number
  ): void;

  once(event: "load", callback: () => void, id?: number): void;
  once(
    event: "loaderror" | "playerror",
    callback: HowlErrorCallback,
    id?: number
  ): void;
  once(
    event:
      | "play"
      | "end"
      | "pause"
      | "stop"
      | "mute"
      | "volume"
      | "rate"
      | "seek"
      | "fade"
      | "unlock",
    callback: HowlCallback,
    id?: number
  ): void;
  once(
    event: string,
    callback: HowlCallback | HowlErrorCallback,
    id?: number
  ): void;

  off(event: "load", callback?: () => void, id?: number): void;
  off(
    event: "loaderror" | "playerror",
    callback?: HowlErrorCallback,
    id?: number
  ): void;
  off(
    event:
      | "play"
      | "end"
      | "pause"
      | "stop"
      | "mute"
      | "volume"
      | "rate"
      | "seek"
      | "fade"
      | "unlock",
    callback?: HowlCallback,
    id?: number
  ): void;
  // off() also supports passing id as second argument: internally it is type checked and treated as an id if it is a number
  off(
    event:
      | "load"
      | "loaderror"
      | "playerror"
      | "play"
      | "end"
      | "pause"
      | "stop"
      | "mute"
      | "volume"
      | "rate"
      | "seek"
      | "fade"
      | "unlock",
    id: number
  ): void;
  off(
    event?: string,
    callback?: HowlCallback | HowlErrorCallback,
    id?: number
  ): void;

  stereo(): number;
  stereo(pan: number, id?: number): number | void;

  pos(): SpatialPosition;
  pos(x: number, y?: number, z?: number, id?: number): void;

  orientation(): SpatialOrientation;
  orientation(x: number, y?: number, z?: number, id?: number): void;

  pannerAttr(id?: number): {};
  pannerAttr(options: {}, id?: number): void;
};

const playSounds = (list: Array<HowlSound>) => {
  list.forEach((item) => {
    item && item.play();
  });
};
const pauseSounds = (list: Array<HowlSound>) => {
  list.forEach((item) => {
    item && item.pause();
  });
};
const stopSounds = (list: Array<HowlSound>) => {
  list.forEach((item) => {
    item && item.stop();
  });
};

export type {
  HowlErrorCallback,
  HowlCallback,
  SpatialOrientation,
  SpatialPosition,
};
export { playSounds, pauseSounds, stopSounds };
