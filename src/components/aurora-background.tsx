import { cn } from '@/lib/utils'

interface Props {
  className?: string
}

const PARTICLES = [
  { left: '8%', top: '68%', size: 3, delay: '0s', duration: '13s' },
  { left: '18%', top: '82%', size: 2, delay: '-4s', duration: '16s' },
  { left: '32%', top: '74%', size: 4, delay: '-8s', duration: '12s' },
  { left: '52%', top: '86%', size: 2, delay: '-2s', duration: '15s' },
  { left: '66%', top: '70%', size: 3, delay: '-10s', duration: '14s' },
  { left: '80%', top: '80%', size: 2, delay: '-6s', duration: '17s' },
  { left: '90%', top: '66%', size: 3, delay: '-12s', duration: '13s' },
]

const STARS = [
  { left: '12%', top: '18%', delay: '0s' },
  { left: '26%', top: '30%', delay: '-1.2s' },
  { left: '44%', top: '12%', delay: '-2.4s' },
  { left: '58%', top: '26%', delay: '-0.8s' },
  { left: '72%', top: '14%', delay: '-3s' },
  { left: '86%', top: '28%', delay: '-1.8s' },
  { left: '34%', top: '44%', delay: '-2.8s' },
  { left: '78%', top: '42%', delay: '-3.6s' },
]

export const AuroraBackground = ({ className }: Props) => {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none fixed inset-0 -z-10 overflow-hidden',
        className,
      )}
    >
      {/* Base */}
      <div className="absolute inset-0 bg-background" />

      {/* Warm ambient wash across the whole page */}
      <div
        className="absolute inset-0 opacity-50 dark:opacity-100"
        style={{
          background:
            'radial-gradient(ellipse 120% 90% at 50% 20%, color-mix(in oklch, var(--primary) 14%, transparent), transparent 65%), radial-gradient(ellipse 80% 60% at 85% 80%, color-mix(in oklch, var(--accent-warm) 8%, transparent), transparent 70%), radial-gradient(ellipse 80% 60% at 10% 90%, color-mix(in oklch, var(--accent-rose) 7%, transparent), transparent 70%)',
        }}
      />

      {/* Full-page dot grid — fine and soft */}
      <div
        className="absolute inset-0 h-full w-full opacity-30 dark:opacity-40 [background-size:30px_30px]"
        style={{
          backgroundImage:
            'radial-gradient(circle, color-mix(in oklch, var(--primary) 40%, var(--muted-foreground)) 1px, transparent 1.5px)',
          maskImage:
            'radial-gradient(ellipse 130% 110% at 50% 35%, black 55%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 130% 110% at 50% 35%, black 55%, transparent 100%)',
        }}
      />

      {/* Subtle brighter dots gently glowing near the hero */}
      <div
        className="absolute inset-0 h-full w-full animate-glow-pulse opacity-50 [background-size:30px_30px]"
        style={{
          backgroundImage:
            'radial-gradient(circle, color-mix(in oklch, var(--primary) 70%, transparent) 1px, transparent 1.5px)',
          maskImage:
            'radial-gradient(ellipse 40% 34% at 50% 28%, black 10%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 40% 34% at 50% 28%, black 10%, transparent 100%)',
        }}
      />

      {/* Slow rotating conic glow behind the hero */}
      <div
        className="absolute left-1/2 top-[32%] h-[60rem] w-[60rem] animate-conic-spin opacity-40 dark:opacity-30"
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0deg, color-mix(in oklch, var(--primary) 26%, transparent) 60deg, transparent 120deg, color-mix(in oklch, var(--accent-warm) 18%, transparent) 200deg, transparent 260deg, color-mix(in oklch, var(--accent-rose) 20%, transparent) 320deg, transparent 360deg)',
          borderRadius: '50%',
          filter: 'blur(70px)',
        }}
      />

      {/* Top spotlight beam */}
      <div
        className="absolute left-1/2 top-0 h-[36rem] w-[70rem] -translate-x-1/2"
        style={{
          background:
            'radial-gradient(ellipse 50% 80% at 50% 0%, color-mix(in oklch, var(--primary) 20%, transparent), transparent 70%)',
        }}
      />

      {/* Aurora orbs */}
      <div className="absolute -top-40 left-1/4 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-primary/15 dark:bg-primary/30 blur-[120px] animate-aurora" />
      <div
        className="absolute top-10 right-0 h-[34rem] w-[34rem] rounded-full bg-accent-rose/10 dark:bg-accent-rose/25 blur-[120px] animate-aurora"
        style={{ animationDelay: '-6s', animationDuration: '22s' }}
      />
      <div
        className="absolute bottom-0 left-10 h-[30rem] w-[30rem] rounded-full bg-accent-warm/10 dark:bg-accent-warm/25 blur-[110px] animate-aurora"
        style={{ animationDelay: '-12s', animationDuration: '26s' }}
      />

      {/* Falling light beams */}
      <div className="absolute left-[22%] top-0 h-40 w-px animate-beam-drop bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
      <div
        className="absolute left-[64%] top-0 h-52 w-px animate-beam-drop bg-gradient-to-b from-transparent via-accent-warm/40 to-transparent"
        style={{ animationDelay: '-3.2s', animationDuration: '9s' }}
      />
      <div
        className="absolute left-[84%] top-0 h-32 w-px animate-beam-drop bg-gradient-to-b from-transparent via-accent-rose/40 to-transparent"
        style={{ animationDelay: '-5.6s', animationDuration: '8s' }}
      />

      {/* Twinkling stars */}
      {STARS.map((star, i) => (
        <span
          key={`star-${i}`}
          className="absolute size-1 animate-twinkle rounded-full bg-primary/70"
          style={{
            left: star.left,
            top: star.top,
            animationDelay: star.delay,
            boxShadow:
              '0 0 6px 1px color-mix(in oklch, var(--primary) 50%, transparent)',
          }}
        />
      ))}

      {/* Floating particles drifting upward */}
      {PARTICLES.map((p, i) => (
        <span
          key={`particle-${i}`}
          className="absolute animate-drift-up rounded-full bg-primary/40"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}

      {/* Vignette edges for depth */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background via-background/40 to-transparent" />
    </div>
  )
}
