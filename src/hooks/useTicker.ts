import { useRef, useEffect } from "react";

/*
 * useTicker
 * receives callback and calls it once per second
 */

const DELAY = 1_000;

type Callback = () => void;

export const useTicker = (callback: Callback) => {
  const interval = useRef<ReturnType<typeof setTimeout> | null>(null);
  const callbacks = useRef<Callback[]>([]);

  useEffect(() => {
    interval.current = setInterval(() => {
      callbacks.current.forEach((clb) => clb());
    }, DELAY);

    return () => {
      interval.current && clearInterval(interval.current);
    };
  }, []);

  useEffect(() => {
    callbacks.current.push(callback);
  }, [callback]);
};
