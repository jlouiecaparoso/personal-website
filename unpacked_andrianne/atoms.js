// Atoms — Button, Badge, Eyebrow, Icon, Counter, Sparkline, MixBar, useInView, VideoPlayer, ImageCarousel

function Button({ variant = 'primary', children, onClick, icon, size = 'md', as = 'button', href, type = 'button' }) {
  const variants = {
    primary:  { bg: 'var(--gz-accent, var(--yellow-500))', color: 'var(--gray-900)', border: '1.5px solid var(--gray-900)', shadow: '4px 4px 0 var(--gray-900)' },
    yellow:   { bg: 'var(--yellow-500)', color: 'var(--gray-900)', border: '1.5px solid var(--gray-900)', shadow: '4px 4px 0 var(--gray-900)' },
    lime:     { bg: 'var(--lime-500)',   color: 'var(--gray-900)', border: '1.5px solid var(--gray-900)', shadow: '4px 4px 0 var(--gray-900)' },
    dark:     { bg: 'var(--gray-900)',   color: 'var(--cream)',    border: '1.5px solid var(--gray-900)', shadow: '4px 4px 0 var(--lime-500)' },
    secondary:{ bg: 'transparent',       color: 'var(--gray-900)', border: '1.5px solid var(--gray-900)', shadow: 'none' },
    ghost:    { bg: 'transparent',       color: 'var(--fg-1)',     border: '1.5px solid transparent',     shadow: 'none' },
  };
  const v = variants[variant] || variants.primary;
  const pad = size === 'lg' ? '15px 28px' : size === 'sm' ? '8px 16px' : '12px 22px';
  const fs  = size === 'lg' ? 16 : size === 'sm' ? 13 : 15;
  const Tag = as === 'a' ? 'a' : 'button';
  const props = as === 'a' ? { href, onClick } : { onClick, type };
  return (
    <Tag {...props} className="gz-btn" style={{
      fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: fs,
      padding: pad, borderRadius: 999, border: v.border,
      background: v.bg, color: v.color, boxShadow: v.shadow,
      cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
      textDecoration: 'none', whiteSpace: 'nowrap',
      transition: 'transform .14s var(--ease-out), box-shadow .14s var(--ease-out), background .14s'
    }}>
      {children}
      {icon ? <i data-lucide={icon} style={{width: 16, height: 16, strokeWidth: 2}}></i> : null}
    </Tag>
  );
}

function Badge({ tone = 'gray', children, dot, size = 'md' }) {
  const tones = {
    yellow:  { bg: 'var(--yellow-200)', color: '#7A5A00' },
    yellow5: { bg: 'var(--yellow-500)', color: 'var(--gray-900)' },
    lime:    { bg: 'var(--lime-200)',   color: '#3F6E14' },
    lime5:   { bg: 'var(--lime-500)',   color: 'var(--gray-900)' },
    ocean:   { bg: 'var(--ocean-100)',  color: 'var(--ocean-700)' },
    coral:   { bg: 'var(--coral-100)',  color: 'var(--coral-700)' },
    gray:    { bg: 'var(--gray-100)',   color: 'var(--gray-700)' },
    dark:    { bg: 'var(--gray-900)',   color: 'var(--cream)' },
    outline: { bg: 'transparent',       color: 'var(--fg-2)', border: '1px solid var(--border-strong)' },
    glass:   { bg: 'rgba(255,252,245,.12)', color: 'var(--cream)', border: '1px solid rgba(255,252,245,.18)' },
  };
  const t = tones[tone] || tones.gray;
  const fs = size === 'sm' ? 10 : 11;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: size === 'sm' ? '4px 9px' : '5px 11px', borderRadius: 999,
      fontFamily: 'var(--font-mono)', fontSize: fs, letterSpacing: '.1em',
      textTransform: 'uppercase', fontWeight: 500,
      background: t.bg, color: t.color, border: t.border || 'none'
    }}>
      {dot ? <span style={{width: 6, height: 6, borderRadius: 999, background: 'currentColor'}}></span> : null}
      {children}
    </span>
  );
}

function Eyebrow({ children, color, size }) {
  return <div style={{
    fontFamily: 'var(--font-mono)', fontSize: size || 12, letterSpacing: '.12em',
    textTransform: 'uppercase', color: color || 'var(--fg-2)', fontWeight: 500
  }}>{children}</div>;
}

function Icon({ name, size = 20, color, strokeWidth = 1.5 }) {
  return <i data-lucide={name} style={{
    width: size, height: size, color: color || 'currentColor',
    display: 'inline-flex', strokeWidth
  }}></i>;
}

// IntersectionObserver hook
function useInView(opts = { threshold: 0.25 }) {
  const ref = React.useRef(null);
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current || seen) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setSeen(true); io.disconnect(); }
    }, opts);
    io.observe(ref.current);
    return () => io.disconnect();
  }, [seen]);
  return [ref, seen];
}

// Animated counter
function Counter({ value, prefix = '', suffix = '', decimals, duration = 1200, animateOff }) {
  const [ref, seen] = useInView();
  const [display, setDisplay] = React.useState(animateOff ? value : 0);
  const target = typeof value === 'number' ? value : parseFloat(value);
  const dec = decimals != null ? decimals : (Number.isInteger(target) ? 0 : 1);
  React.useEffect(() => {
    if (animateOff) { setDisplay(target); return; }
    if (!seen) return;
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const e = 1 - Math.pow(1 - p, 3);
      setDisplay(target * e);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, animateOff, target, duration]);
  const formatted = dec === 0 ? Math.round(display).toLocaleString() : display.toFixed(dec);
  return <span ref={ref}>{prefix}{formatted}{suffix}</span>;
}

// Tiny sparkline svg
function Sparkline({ data, width = 120, height = 32, stroke = 'var(--coral-500)', fill = 'none', strokeWidth = 1.75, dot = true }) {
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const stepX = data.length > 1 ? width / (data.length - 1) : 0;
  const pts = data.map((v, i) => [i * stepX, height - ((v - min) / range) * (height - 4) - 2]);
  const d = pts.map((p, i) => (i === 0 ? `M${p[0].toFixed(1)},${p[1].toFixed(1)}` : `L${p[0].toFixed(1)},${p[1].toFixed(1)}`)).join(' ');
  const area = `${d} L${width},${height} L0,${height} Z`;
  const last = pts[pts.length - 1];
  return (
    <svg width={width} height={height} style={{display: 'block', overflow: 'visible'}}>
      {fill !== 'none' ? <path d={area} fill={fill}/> : null}
      <path d={d} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
      {dot ? <circle cx={last[0]} cy={last[1]} r="3" fill={stroke}/> : null}
    </svg>
  );
}

// Horizontal bar visualization of specialty mix
function MixBar({ segments, height = 18 }) {
  return (
    <div style={{
      width: '100%', height, display: 'flex', borderRadius: 999, overflow: 'hidden',
      border: '1.5px solid var(--gray-900)', background: 'var(--white)'
    }}>
      {segments.map((s, i) => (
         <div key={i} title={`${s.name} · ${s.pct}%`} style={{
           width: s.pct + '%', background: s.color,
           borderRight: i < segments.length - 1 ? '1.5px solid var(--gray-900)' : 'none'
         }}/>
      ))}
    </div>
  );
}

// Custom interactive HTML5 Video Player
function VideoPlayer({ src, poster }) {
  const videoRef = React.useRef(null);
  const [playing, setPlaying] = React.useState(false);
  const [muted, setMuted] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const isMuted = !muted;
    videoRef.current.muted = isMuted;
    setMuted(isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  const handleScrub = (e) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    videoRef.current.currentTime = percentage * videoRef.current.duration;
    setProgress(percentage * 100);
  };

  React.useEffect(() => {
    return () => {
      if (videoRef.current) videoRef.current.pause();
    };
  }, []);

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
      <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
        <Eyebrow>Video showcase</Eyebrow>
        <div style={{fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.06em', color: 'var(--fg-3)', textTransform: 'uppercase'}}>Click to play / pause</div>
      </div>
      <div 
        style={{
          position: 'relative', width: '100%', height: 340, borderRadius: 16,
          overflow: 'hidden', border: '1.5px solid var(--gray-900)',
          background: 'var(--gray-950)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
        onClick={togglePlay}
      >
        <video 
          ref={videoRef} 
          src={src} 
          poster={poster} 
          preload="metadata" 
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setPlaying(false)}
          style={{width: '100%', height: '100%', objectFit: 'contain', display: 'block'}}
        />

        {/* Large Play Button Overlay */}
        {!playing && (
          <div style={{
            position: 'absolute', width: 64, height: 64, borderRadius: 999,
            background: 'var(--gz-accent, var(--yellow-500))', border: '1.5px solid var(--gray-900)',
            boxShadow: '4px 4px 0 var(--gray-900)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--gray-900)'
          }}>
            <Icon name="play" size={24} strokeWidth={2}/>
          </div>
        )}

        {/* Controls Overlay */}
        <div 
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
            padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16,
            opacity: playing ? 0 : 1, transition: 'opacity 0.25s',
            pointerEvents: playing ? 'none' : 'auto'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = 1; }}
          onMouseLeave={(e) => { if (playing) e.currentTarget.style.opacity = 0; }}
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            type="button" 
            onClick={togglePlay}
            style={{background: 'transparent', border: 0, color: 'var(--cream)', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center'}}
          >
            <Icon name={playing ? "pause" : "play"} size={18}/>
          </button>

          {/* Progress Bar */}
          <div 
            onClick={handleScrub}
            style={{flex: 1, height: 6, background: 'rgba(255,255,255,0.2)', borderRadius: 999, cursor: 'pointer', position: 'relative', overflow: 'hidden'}}
          >
            <div style={{width: `${progress}%`, height: '100%', background: 'var(--gz-accent, var(--yellow-500))', transition: 'width 0.1s linear'}} />
          </div>

          <button 
            type="button" 
            onClick={toggleMute}
            style={{background: 'transparent', border: 0, color: 'var(--cream)', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center'}}
          >
            <Icon name={muted ? "volume-x" : "volume-2"} size={18}/>
          </button>
        </div>
      </div>
    </div>
  );
}

// Graphic designs slideshow/grid showcase
function ImageCarousel({ images }) {
  const [activeIdx, setActiveIdx] = React.useState(0);
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
      <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
        <Eyebrow>Designs showcase</Eyebrow>
        <div style={{fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.06em', color: 'var(--fg-3)', textTransform: 'uppercase'}}>Click thumbnail to view</div>
      </div>
      <div style={{
        width: '100%', height: 340, borderRadius: 16, overflow: 'hidden',
        border: '1.5px solid var(--gray-900)', background: 'var(--cream)',
        position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <img 
          src={images[activeIdx]} 
          alt="" 
          style={{width: '100%', height: '100%', objectFit: 'cover'}}
        />
        <div style={{
          position: 'absolute', bottom: 12, left: 12,
          fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em',
          background: 'var(--gray-900)', color: 'var(--cream)',
          padding: '4px 10px', borderRadius: 999, textTransform: 'uppercase'
        }}>{activeIdx + 1} / {images.length}</div>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: `repeat(${images.length}, 1fr)`, gap: 8}}>
        {images.map((img, i) => (
          <button 
            key={i} 
            type="button"
            onClick={() => setActiveIdx(i)}
            style={{
              padding: 0, border: activeIdx === i ? '2px solid var(--gray-900)' : '1.5px solid var(--border-strong)',
              borderRadius: 8, overflow: 'hidden', aspectRatio: '16 / 9', cursor: 'pointer', background: 'var(--white)',
              boxShadow: activeIdx === i ? '2px 2px 0 var(--gray-900)' : 'none',
              transform: activeIdx === i ? 'translateY(-1px)' : 'none',
              transition: 'all 0.12s var(--ease-out)'
            }}
          >
            <img src={img} alt="" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
          </button>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, {
  Button, Badge, Eyebrow, Icon, useInView, Counter, Sparkline, MixBar, VideoPlayer, ImageCarousel
});
