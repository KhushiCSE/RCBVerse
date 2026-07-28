import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, animate } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
  duration = 2,
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplay(latest.toFixed(decimals));
      },
    });
    return () => controls.stop();
  }, [inView, value, duration, decimals, motionValue]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
