import { useEffect, useState } from "react";

export interface CountdownState {
  hasDeadline: boolean;
  mounted: boolean;
  expired: boolean;
  label: string;
}

const pad = (value: number) => String(value).padStart(2, "0");

function formatRemaining(totalSeconds: number): string {
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const clock = `${pad(hours)}h : ${pad(minutes)}m : ${pad(seconds)}s`;
  return days > 0 ? `${days}d : ${clock}` : clock;
}

function secondsUntil(deadline: number): number {
  return Math.max(0, Math.floor((deadline - Date.now()) / 1000));
}

export function useCountdown(endsAt?: string | null): CountdownState {
  const deadline = endsAt ? Date.parse(endsAt) : NaN;
  const hasDeadline = Number.isFinite(deadline);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!hasDeadline) return;
    setSecondsLeft(secondsUntil(deadline));
    const interval = window.setInterval(() => setSecondsLeft(secondsUntil(deadline)), 1000);
    return () => window.clearInterval(interval);
  }, [deadline, hasDeadline]);

  const mounted = secondsLeft !== null;
  return {
    hasDeadline,
    mounted,
    expired: hasDeadline && mounted && secondsLeft === 0,
    label: mounted ? formatRemaining(secondsLeft) : "--h : --m : --s",
  };
}
