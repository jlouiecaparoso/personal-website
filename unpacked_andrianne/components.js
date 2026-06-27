// Components — Nav, Hero, HeroTickerRow, DashCard, PerformancePanel, CaseDetail, FeaturedCase, CaseGridCard, WorkSection, ServicesSection, AboutSection, PressSection, ContactSection, Footer

// Navigation
function Nav({ scrollTo, accent }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'rgba(255,252,245,0.86)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      padding: '16px 48px', transition: 'background .2s, border-color .2s'
    }}>
      <div className="gz-nav-container" style={{maxWidth: 1240, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <a onClick={() => scrollTo('top')} style={{display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', cursor: 'pointer'}}>
          <span style={{fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--gray-900)', letterSpacing: '-.01em'}}>andrianne<span style={{color: 'var(--coral-500)'}}>.</span></span>
        </a>
        <div style={{display: 'flex', alignItems: 'center', gap: 28}}>
          {[
            {id: 'work', label: 'Work'},
            {id: 'services', label: 'Services'},
            {id: 'about', label: 'About'},
            {id: 'press', label: 'Press'},
          ].map(it => (
            <a key={it.id} onClick={() => scrollTo(it.id)} style={{
              cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 500,
              fontSize: 14, color: 'var(--gray-700)', textDecoration: 'none'
            }}>{it.label}</a>
          ))}
          <Button variant="primary" size="sm" onClick={() => scrollTo('contact')}>Let's talk <Icon name="arrow-right" size={14}/></Button>
        </div>
      </div>
    </nav>
  );
}

// Hero specialties infinite scroll marquee
function HeroTickerRow() {
  const data = window.GZ_DATA;
  const items = data.hero.specialties.concat(data.tools.slice(0, 8));
  return (
    <div style={{
      borderTop: '1.5px solid var(--gray-900)', borderBottom: '1.5px solid var(--gray-900)',
      background: 'var(--cream)', overflow: 'hidden', position: 'relative'
    }}>
      <div className="gz-ticker" style={{display: 'flex', gap: 0, padding: '14px 0', whiteSpace: 'nowrap'}}>
        {[0, 1].map(k => (
          <div key={k} style={{display: 'flex', gap: 0, paddingRight: 0}}>
            {items.map((it, i) => (
              <span key={`${k}-${i}`} style={{
                display: 'inline-flex', alignItems: 'center', gap: 12,
                padding: '0 28px', fontFamily: 'var(--font-mono)', fontSize: 13,
                letterSpacing: '.02em', color: 'var(--gray-700)'
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: 999,
                  background: i % 3 === 0 ? 'var(--yellow-500)' : i % 3 === 1 ? 'var(--lime-500)' : 'var(--coral-500)'
                }}></span>
                {it}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Spark stats card
function DashCard({ stat, animateOff, accent }) {
  const accentMap = {
    coral:  'var(--coral-500)',
    lime:   'var(--lime-700)',
    ocean:  'var(--ocean-500)',
    yellow: 'var(--yellow-700)',
  };
  const sparkColor = stat.accent === 'coral' ? 'var(--coral-500)' : (accentMap[accent] || 'var(--lime-400)');
  const numberColor = stat.accent === 'coral' ? 'var(--coral-500)' : 'var(--cream)';
  return (
    <div style={{
      padding: '20px 22px', borderRadius: 14, background: 'rgba(255,252,245,.04)',
      border: '1px solid rgba(255,252,245,.08)',
      display: 'flex', flexDirection: 'column', gap: 14, minHeight: 142
    }}>
      <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8}}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--gray-400)', lineHeight: 1.4, maxWidth: 140
        }}>{stat.label}</div>
        <Sparkline data={stat.spark} width={70} height={26} stroke={sparkColor}/>
      </div>
      <div style={{display: 'flex', alignItems: 'baseline', gap: 6}}>
        <span style={{
          fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 36,
          lineHeight: 1, letterSpacing: '-.03em', color: numberColor,
          fontFeatureSettings: '"tnum" 1'
        }}>
          <Counter value={stat.value} prefix={stat.prefix || ''} suffix={stat.suffix || ''}
            decimals={Number.isInteger(stat.value) ? 0 : 1} animateOff={animateOff}/>
        </span>
      </div>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '.06em',
        color: stat.accent === 'coral' ? 'var(--coral-500)' : 'var(--lime-400)',
        textTransform: 'uppercase'
      }}>↗ {stat.delta}</div>
    </div>
  );
}

// Side dashboard panel in Hero
function PerformancePanel({ animateOff, accent }) {
  const data = window.GZ_DATA;
  return (
    <div style={{
      background: 'var(--gray-900)', color: 'var(--cream)',
      borderRadius: 22, border: '1.5px solid var(--gray-900)',
      boxShadow: '8px 8px 0 var(--gz-accent, var(--yellow-500))',
      overflow: 'hidden'
    }}>
      {/* Chrome header */}
      <div style={{
        padding: '14px 20px', borderBottom: '1px solid var(--gray-700)',
        display: 'flex', alignItems: 'center', gap: 12
      }}>
        <div style={{display: 'flex', gap: 6}}>
          <span style={{width: 10, height: 10, borderRadius: 999, background: 'var(--coral-500)'}}></span>
          <span style={{width: 10, height: 10, borderRadius: 999, background: 'var(--yellow-500)'}}></span>
          <span style={{width: 10, height: 10, borderRadius: 999, background: 'var(--lime-500)'}}></span>
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.08em',
          color: 'var(--gray-400)', textTransform: 'uppercase'
        }}>andrianne/dashboard · {data.hero.asOf}</div>
        <div style={{marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8,
          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.06em',
          color: 'var(--lime-400)', textTransform: 'uppercase'
        }}>
          <span className="gz-pulse" style={{width: 8, height: 8, borderRadius: 999, background: 'var(--lime-400)', display: 'inline-block'}}></span>
          Live
        </div>
      </div>

      {/* Metric grid */}
      <div style={{
        padding: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
      }}>
        {data.hero.headline.map((s, i) => <DashCard key={i} stat={s} animateOff={animateOff} accent={accent}/>)}
      </div>

      {/* Footer bar chart */}
      <div style={{
        padding: '16px 20px 20px', borderTop: '1px solid var(--gray-700)',
        display: 'flex', flexDirection: 'column', gap: 10
      }}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gray-400)'}}>Specialty mix · 2026</div>
          <div style={{fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.06em', color: 'var(--gray-400)'}}>retainers</div>
        </div>
        <MixBar segments={data.specialtyMix} height={14}/>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '6px 14px', marginTop: 4}}>
          {data.specialtyMix.map((s, i) => (
            <span key={i} style={{display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--gray-300)', textTransform: 'uppercase', letterSpacing: '.06em'}}>
              <span style={{width: 8, height: 8, borderRadius: 2, background: s.color, border: '1px solid rgba(255,252,245,.2)'}}></span>
              {s.name} · {s.pct}%
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Hero bio and showcase layout
function Hero({ t, scrollTo }) {
  const data = window.GZ_DATA;
  const variant = t.heroVariant || 'dashboard';
  return (
    <section id="top" style={{padding: '40px 48px 28px', borderBottom: 'none'}}>
      <div className="gz-hero-grid" style={{maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: variant === 'dashboard' ? '1.05fr 1fr' : '1fr', gap: 56, alignItems: 'center'}}>
        <div>
          <div style={{display: 'inline-flex', alignItems: 'center', gap: 10, padding: '6px 14px', borderRadius: 999, background: 'var(--lime-200)', border: '1px solid var(--gray-900)'}}>
            <span className="gz-pulse" style={{width: 8, height: 8, borderRadius: 999, background: 'var(--lime-700)', display: 'inline-block'}}></span>
            <span style={{fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gray-900)', fontWeight: 500}}>{data.person.status}</span>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(48px, 6vw, 84px)', lineHeight: .96,
            letterSpacing: '-.03em', color: 'var(--gray-900)',
            margin: '22px 0 26px'
          }}>
            I'm Andrianne.<br/>
            Your <span style={{background: 'var(--gz-accent, var(--yellow-500))', padding: '0 10px', borderRadius: 10, boxDecorationBreak: 'clone'}}>video & SMM</span> expert.
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 20, lineHeight: 1.5,
            color: 'var(--fg-2)', maxWidth: 540, margin: '0 0 28px'
          }}>{data.person.bio}</p>

          <div style={{display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap'}}>
            <Button variant="primary" size="lg" onClick={() => scrollTo('work')}>See the work <Icon name="arrow-right" size={16}/></Button>
            <Button variant="secondary" size="lg" onClick={() => scrollTo('contact')}>Book free audit</Button>
          </div>

          <div style={{
            marginTop: 28, display: 'flex', gap: 24, flexWrap: 'wrap',
            paddingTop: 20, borderTop: '1px dashed var(--border-strong)'
          }}>
            <div>
              <div style={{fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--fg-3)'}}>Based in</div>
              <div style={{fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--fg-1)', marginTop: 4}}>{data.person.location}</div>
            </div>
            <div>
              <div style={{fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--fg-3)'}}>Response speed</div>
              <div style={{fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--fg-1)', marginTop: 4}}>24 hours turnaround</div>
            </div>
            <div>
              <div style={{fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--fg-3)'}}>Expert in</div>
              <div style={{fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--fg-1)', marginTop: 4}}>Short-Form · SMM · Lead Gen</div>
            </div>
          </div>
        </div>

        {variant === 'dashboard' ? (
          <PerformancePanel animateOff={t.animations === false} accent={t.accent}/>
        ) : null}
      </div>
    </section>
  );
}

// Case study detailed accordion drawer
function CaseDetail({ k, animateOff }) {
  const renderRightPanel = () => {
    if (k.videoUrl) {
      return <VideoPlayer src={k.videoUrl} poster={k.posterUrl}/>;
    }
    if (k.images) {
      return <ImageCarousel images={k.images}/>;
    }
    // Lead generation custom graphics panel
    return (
      <div style={{
        borderRadius: 16, border: '1.5px solid var(--gray-900)',
        background: 'var(--lime-100)', padding: '24px 26px',
        display: 'flex', flexDirection: 'column', gap: 14
      }}>
        <Eyebrow>Scraping Pipeline & Verification</Eyebrow>
        <div style={{display: 'flex', flexDirection: 'column', gap: 8, background: 'var(--white)', border: '1.5px solid var(--gray-900)', borderRadius: 10, padding: 14}}>
          <div style={{fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-3)'}}>Lead Database Tools</div>
          <div style={{fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: 'var(--gray-900)'}}>LinkedIn Sales Navigator + Apollo.io</div>
          <div style={{display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4}}>
            <Badge tone="yellow" size="sm">Decision Makers</Badge>
            <Badge tone="ocean" size="sm">Verified Emails</Badge>
            <Badge tone="gray" size="sm">Direct Dials</Badge>
          </div>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 8, background: 'var(--white)', border: '1.5px solid var(--gray-900)', borderRadius: 10, padding: 14}}>
          <div style={{fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-3)'}}>Scrubbing & Personalization flow</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--fg-1)', flexWrap: 'wrap'}}>
            <span>Search scrape</span>
            <span>→</span>
            <span style={{fontWeight: 600, color: 'var(--coral-700)'}}>NeverBounce sweep</span>
            <span>→</span>
            <span>Spreadsheet format</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      padding: '36px 40px 40px', background: 'var(--cream)',
      borderTop: '1.5px solid var(--gray-900)'
    }}>
      <div className="gz-casedetail-grid" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40}}>
        <div>
          <Eyebrow>Problem</Eyebrow>
          <p style={{fontSize: 17, lineHeight: 1.55, color: 'var(--fg-1)', margin: '10px 0 28px'}}>{k.problem}</p>

          <Eyebrow>Approach</Eyebrow>
          <ol style={{margin: '12px 0 28px', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14}}>
            {k.approach.map((a, i) => (
              <li key={i} style={{display: 'grid', gridTemplateColumns: '28px 1fr', gap: 12, alignItems: 'flex-start'}}>
                <div style={{
                  width: 26, height: 26, borderRadius: 999,
                  background: 'var(--gray-900)', color: 'var(--lime-400)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500, marginTop: 1
                }}>{i + 1}</div>
                <p style={{fontSize: 15, lineHeight: 1.55, color: 'var(--fg-1)', margin: 0}}>{a}</p>
              </li>
            ))}
          </ol>

          <Eyebrow>Result</Eyebrow>
          <p style={{fontSize: 17, lineHeight: 1.55, color: 'var(--fg-1)', margin: '10px 0 0'}}>{k.result}</p>

          {k.testimonial ? (
            <div style={{
              marginTop: 28, padding: '20px 22px',
              background: 'var(--gray-900)', color: 'var(--cream)', borderRadius: 14
            }}>
              <p style={{fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 17, lineHeight: 1.4, margin: '0 0 10px'}}>"{k.testimonial.quote}"</p>
              <div style={{fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gray-400)'}}>— {k.testimonial.who}</div>
            </div>
          ) : null}
        </div>

        <div>
          {renderRightPanel()}

          <div style={{marginTop: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12}}>
            <div style={{padding: 16, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 12}}>
              <div style={{fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em', color: 'var(--fg-3)', textTransform: 'uppercase'}}>Role</div>
              <div style={{fontFamily: 'var(--font-body)', fontSize: 14, marginTop: 6, color: 'var(--fg-1)'}}>{k.role}</div>
            </div>
            <div style={{padding: 16, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 12}}>
              <div style={{fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em', color: 'var(--fg-3)', textTransform: 'uppercase'}}>Tools used</div>
              <div style={{fontFamily: 'var(--font-body)', fontSize: 14, marginTop: 6, color: 'var(--fg-1)'}}>{k.channels.join(' · ')}</div>
            </div>
          </div>

          <div style={{
            marginTop: 16, padding: '14px 18px',
            background: 'var(--bg-muted)', border: '1px dashed var(--border-strong)',
            borderRadius: 12, display: 'flex', alignItems: 'flex-start', gap: 12
          }}>
            <Icon name="info" size={16} color="var(--fg-2)"/>
            <p style={{margin: 0, fontSize: 12.5, lineHeight: 1.5, color: 'var(--fg-2)'}}>
              Work details derived from active project case sheets. Custom timelines and deliverables can be designed to match your pipeline goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Featured case card layout (the top case study)
function FeaturedCase({ k, isOpen, onToggle, animateOff }) {
  return (
    <div style={{
      borderRadius: 22, overflow: 'hidden',
      border: '1.5px solid var(--gray-900)',
      boxShadow: isOpen ? '10px 10px 0 var(--gray-900)' : '8px 8px 0 var(--gray-900)',
      transition: 'box-shadow .2s var(--ease-out)'
    }}>
      <div onClick={onToggle} className="gz-featured-grid" style={{
        display: 'grid', gridTemplateColumns: '1.15fr 1fr',
        background: 'var(--gz-accent, var(--yellow-500))', cursor: 'pointer'
      }}>
        <div style={{padding: '34px 36px 30px', display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'space-between'}}>
          <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
            <Badge tone="dark" dot>Featured · {k.id}</Badge>
            <Badge tone="outline">{k.industry}</Badge>
            <Badge tone="outline">{k.year}</Badge>
          </div>
          <div>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 700,
              letterSpacing: '-.025em', lineHeight: 1.02, color: 'var(--gray-900)',
              margin: '0 0 10px'
            }}>{k.title}</h2>
            <p style={{fontSize: 16, lineHeight: 1.5, color: 'var(--gray-800)', margin: 0, maxWidth: 460}}>{k.tagline}</p>
          </div>
          <div style={{display: 'flex', alignItems: 'flex-end', gap: 28}}>
            <div>
              <div style={{
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 56,
                lineHeight: 1, letterSpacing: '-.03em', color: 'var(--coral-500)'
              }}>{k.headline.value}</div>
              <div style={{fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gray-800)', marginTop: 8}}>{k.headline.label}</div>
            </div>
            <div style={{flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.08em',
                textTransform: 'uppercase', color: 'var(--gray-900)', fontWeight: 600,
                padding: '10px 16px', background: 'var(--gray-900)', color: 'var(--cream)',
                borderRadius: 999
              }}>
                {isOpen ? <>Collapse <Icon name="chevron-up" size={14}/></> : <>Read breakdown <Icon name="chevron-down" size={14}/></>}
              </span>
            </div>
          </div>
        </div>
        <div style={{
          background: 'var(--gray-900)', color: 'var(--cream)',
          padding: '34px 32px', display: 'flex', flexDirection: 'column', gap: 22, justifyContent: 'space-between'
        }}>
          <Eyebrow color="var(--lime-400)">By the numbers</Eyebrow>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px 20px'}}>
            {k.metrics.map((m, i) => (
              <div key={i}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 30,
                  lineHeight: 1, letterSpacing: '-.02em',
                  color: m.accent === 'coral' ? 'var(--coral-500)' : 'var(--cream)'
                }}>{m.value}</div>
                <div style={{fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gray-400)', marginTop: 6}}>{m.label}</div>
                {m.from ? <div style={{fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--gray-500)', marginTop: 4}}>from {m.from}</div> : null}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Expanded detail wrapper */}
      <div style={{
        maxHeight: isOpen ? 4000 : 0, overflow: 'hidden',
        transition: 'max-height .5s var(--ease-out)'
      }}>
        <CaseDetail k={k} animateOff={animateOff}/>
      </div>
    </div>
  );
}

// Compact case-grid card (grid items)
function CaseGridCard({ k, isOpen, onToggle, hoverStyle }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div style={{
      borderRadius: 16, overflow: 'hidden',
      border: '1.5px solid var(--gray-900)',
      background: 'var(--white)',
      boxShadow: isOpen ? '6px 6px 0 var(--gray-900)' : (hover && hoverStyle === 'pop' ? '6px 6px 0 var(--gray-900)' : 'var(--shadow-sm)'),
      transform: hover && hoverStyle === 'lift' && !isOpen ? 'translate(-2px,-2px)' : 'none',
      transition: 'transform .18s var(--ease-out), box-shadow .18s var(--ease-out)'
    }}
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
    >
      <div onClick={onToggle} style={{cursor: 'pointer'}}>
        <div style={{
          position: 'relative', aspectRatio: '16 / 9', background: k.color || 'var(--lime-200)',
          borderBottom: '1.5px solid var(--gray-900)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
        }}>
          {k.images ? (
            <img src={k.images[0]} alt="" style={{width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9}} />
          ) : (
            <svg viewBox="0 0 240 120" width="80%" height="auto" style={{opacity: .35, position: 'absolute'}}>
              <path d="M0 100 Q40 80 60 70 T120 50 T180 40 T240 20" stroke="var(--gray-900)" strokeWidth="2" fill="none"/>
              <path d="M0 100 Q40 80 60 70 T120 50 T180 40 T240 20 L240 120 L0 120 Z" fill="var(--gray-900)" opacity=".08"/>
            </svg>
          )}
          {!k.images && (
            <div style={{
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 44,
              color: 'var(--gray-900)', letterSpacing: '-.02em', position: 'relative'
            }}>{k.client.split(' ').map(w => w[0]).join('').slice(0, 2)}</div>
          )}

          {/* Hover metadata strip */}
          <div style={{
            position: 'absolute', left: 0, right: 0, bottom: 0,
            transform: hover ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform .25s var(--ease-out)',
            background: 'var(--gray-900)', color: 'var(--cream)',
            padding: '10px 14px', display: 'flex', gap: 16, alignItems: 'baseline',
            borderTop: '1.5px solid var(--gray-900)', zIndex: 10
          }}>
            <span style={{fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: 'var(--coral-500)', letterSpacing: '-.02em'}}>{k.headline.value}</span>
            <span style={{fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gray-300)'}}>{k.headline.label}</span>
            <span style={{marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--lime-400)'}}>{k.duration}</span>
          </div>

          <div style={{
            position: 'absolute', top: 12, left: 12,
            fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em',
            background: 'var(--gray-900)', color: 'var(--cream)',
            padding: '4px 10px', borderRadius: 999, textTransform: 'uppercase', zIndex: 10
          }}>{k.id}</div>
        </div>
        <div style={{padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 12}}>
          <div style={{display: 'flex', gap: 6, flexWrap: 'wrap'}}>
            {k.channels.slice(0, 2).map((t, i) => <Badge key={i} tone={i === 0 ? 'yellow' : 'gray'}>{t}</Badge>)}
            <Badge tone="outline">{k.year}</Badge>
          </div>
          <div>
            <div style={{fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--fg-3)'}}>{k.client}</div>
            <h3 style={{fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 20, margin: '6px 0 0', letterSpacing: '-.01em', lineHeight: 1.2, color: 'var(--gray-900)'}}>{k.title}</h3>
          </div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid var(--border)'}}>
            <div style={{display: 'flex', alignItems: 'baseline', gap: 8}}>
              <span style={{fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, color: 'var(--coral-500)', letterSpacing: '-.02em'}}>{k.headline.value}</span>
              <span style={{fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--fg-2)'}}>{k.headline.label}</span>
            </div>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.06em',
              textTransform: 'uppercase', color: 'var(--gray-900)', fontWeight: 600,
              display: 'inline-flex', alignItems: 'center', gap: 4
            }}>
              {isOpen ? <>Less <Icon name="chevron-up" size={12}/></> : <>More <Icon name="chevron-down" size={12}/></>}
            </span>
          </div>
        </div>
      </div>
      <div style={{maxHeight: isOpen ? 3000 : 0, overflow: 'hidden', transition: 'max-height .5s var(--ease-out)'}}>
        <CaseDetail k={k}/>
      </div>
    </div>
  );
}

// Work section grid composition
function WorkSection({ t }) {
  const data = window.GZ_DATA;
  const [openId, setOpenId] = React.useState(data.cases[0].id);
  const [filter, setFilter] = React.useState('All');
  const featured = data.cases[0];
  const rest = data.cases.slice(1);
  const filters = ['All', 'Video Editing', 'SMM', 'Lead Gen'];
  const filtered = rest.filter(k => {
    if (filter === 'All') return true;
    if (filter === 'Video Editing') return k.channels.includes('Premiere Pro') || k.channels.includes('CapCut');
    if (filter === 'SMM') return k.channels.includes('Grid Design') || k.industry.includes('SMM');
    if (filter === 'Lead Gen') return k.channels.includes('List Scraping') || k.industry.includes('Lead Gen');
    return true;
  });

  return (
    <section id="work" style={{padding: '88px 48px 32px'}}>
      <div style={{maxWidth: 1240, margin: '0 auto'}}>
        <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 30}}>
          <div>
            <Eyebrow>The work · {data.cases.length} categories</Eyebrow>
            <h2 style={{fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(36px, 4.4vw, 56px)', margin: '14px 0 0', letterSpacing: '-.025em', lineHeight: 1.02, color: 'var(--gray-900)', maxWidth: 760}}>Visual edits and targeted lists. Every number checks.</h2>
          </div>
          <div style={{display: 'flex', gap: 6, flexWrap: 'wrap'}}>
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: '8px 14px', borderRadius: 999, cursor: 'pointer',
                fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.06em', textTransform: 'uppercase', fontWeight: 500,
                background: filter === f ? 'var(--gray-900)' : 'transparent',
                color: filter === f ? 'var(--cream)' : 'var(--fg-2)',
                border: '1px solid ' + (filter === f ? 'var(--gray-900)' : 'var(--border-strong)')
              }}>{f}</button>
            ))}
          </div>
        </div>

        <FeaturedCase k={featured} isOpen={openId === featured.id} onToggle={() => setOpenId(openId === featured.id ? null : featured.id)}/>

        <div className="gz-work-grid" style={{marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22}}>
          {filtered.map(k => (
            <CaseGridCard
              key={k.id}
              k={k}
              isOpen={openId === k.id}
              onToggle={() => setOpenId(openId === k.id ? null : k.id)}
              hoverStyle={t.hoverStyle || 'lift'}
            />
          ))}
        </div>

        {/* Informative footer bar */}
        <div style={{
          marginTop: 28, padding: '14px 18px', borderRadius: 12,
          background: 'var(--bg-muted)', border: '1px dashed var(--border-strong)',
          display: 'flex', alignItems: 'center', gap: 12,
          fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.04em',
          color: 'var(--fg-2)'
        }}>
          <Icon name="info" size={14}/>
          <span>All case details shown reflect active project pipelines and verified data records. Custom walkthrough sheets are available on request.</span>
        </div>
      </div>
    </section>
  );
}

// Services tabs
function ServicesSection({ scrollTo }) {
  const data = window.GZ_DATA;
  const [idx, setIdx] = React.useState(1);
  const s = data.services[idx];
  return (
    <section id="services" style={{padding: '96px 48px 32px'}}>
      <div style={{maxWidth: 1240, margin: '0 auto'}}>
        <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 36}}>
          <div>
            <Eyebrow>How I work</Eyebrow>
            <h2 style={{fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(36px, 4.4vw, 56px)', margin: '14px 0 8px', letterSpacing: '-.025em', lineHeight: 1.02, color: 'var(--gray-900)'}}>Three ways in.</h2>
            <p style={{fontSize: 18, color: 'var(--fg-2)', maxWidth: 540, margin: 0, lineHeight: 1.5}}>Every engagement starts with a problem and ends with a number. Pick the package that fits the moment.</p>
          </div>
        </div>

        <div className="gz-services-grid" style={{display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 32}}>
          {/* Service selectors */}
          <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
            {data.services.map((sv, i) => (
              <button key={i} onClick={() => setIdx(i)} style={{
                textAlign: 'left', cursor: 'pointer',
                padding: '22px 24px', borderRadius: 16,
                background: idx === i ? 'var(--gray-900)' : 'var(--white)',
                color: idx === i ? 'var(--cream)' : 'var(--gray-900)',
                border: '1.5px solid var(--gray-900)',
                boxShadow: idx === i ? `5px 5px 0 ${sv.accent}` : 'var(--shadow-sm)',
                transition: 'box-shadow .15s var(--ease-out), transform .15s',
                display: 'flex', flexDirection: 'column', gap: 6
              }}>
                <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 8, background: sv.accent,
                    border: '1.5px solid var(--gray-900)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center'
                  }}>
                    <Icon name={sv.icon} size={18} color="var(--gray-900)" strokeWidth={1.75}/>
                  </div>
                  <div>
                    <div style={{fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: idx === i ? 'var(--lime-400)' : 'var(--fg-3)'}}>{sv.tag}</div>
                    <h3 style={{fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 22, margin: '4px 0 0', letterSpacing: '-.01em'}}>{sv.name}</h3>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Service breakdown */}
          <div style={{
            padding: '32px 36px', borderRadius: 20,
            background: 'var(--white)', border: '1.5px solid var(--gray-900)',
            boxShadow: `8px 8px 0 ${s.accent}`,
            display: 'flex', flexDirection: 'column', gap: 22
          }}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16}}>
              <div>
                <Eyebrow>{s.tag}</Eyebrow>
                <h3 style={{fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 36, margin: '10px 0 12px', letterSpacing: '-.02em', color: 'var(--gray-900)'}}>{s.name}</h3>
                <p style={{fontSize: 17, color: 'var(--fg-2)', margin: 0, lineHeight: 1.55, maxWidth: 520}}>{s.desc}</p>
              </div>
              <div style={{textAlign: 'right', flexShrink: 0}}>
                <div style={{fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--fg-3)'}}>From</div>
                <div style={{fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 36, color: 'var(--gray-900)', letterSpacing: '-.02em', lineHeight: 1}}>{s.price}</div>
                <div style={{fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.06em', color: 'var(--fg-2)', marginTop: 4}}>{s.timeline}</div>
              </div>
            </div>

            <div>
              <Eyebrow>What you get</Eyebrow>
              <ul className="gz-deliverables-list" style={{listStyle: 'none', padding: 0, margin: '12px 0 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10}}>
                {s.deliverables.map((d, i) => (
                  <li key={i} style={{display: 'flex', gap: 10, alignItems: 'center', fontSize: 14.5, color: 'var(--fg-1)', padding: '8px 0'}}>
                    <span style={{
                      width: 22, height: 22, borderRadius: 999, background: s.accent,
                      border: '1.5px solid var(--gray-900)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <Icon name="check" size={12} color="var(--gray-900)" strokeWidth={2.5}/>
                    </span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{paddingTop: 14, borderTop: '1px solid var(--border)', display: 'flex', gap: 12, alignItems: 'center'}}>
              <Button variant="dark" size="md" onClick={() => scrollTo('contact')}>Start with {s.name.toLowerCase()} <Icon name="arrow-up-right" size={14}/></Button>
              <Button variant="ghost" size="md" onClick={() => window.open(data.person.resume)}>Get standard resume</Button>
            </div>
          </div>
        </div>

        {/* Workflow strip */}
        <div style={{marginTop: 56}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22}}>
            <Eyebrow>How I run a project · 4-step rhythm</Eyebrow>
            <div style={{flex: 1, height: 1, background: 'var(--gray-900)'}}></div>
          </div>
          <div className="gz-workflow-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24}}>
            {[
              {n: '01', t: 'Audit',   d: 'Funnel or grid audit. Pinpoint where reach is dropped or pacing lags.', color: 'var(--yellow-500)'},
              {n: '02', t: 'Plan',    d: 'Construct editing style guide, calendar, and lead scraping filters.', color: 'var(--lime-500)'},
              {n: '03', t: 'Ship',    d: 'Deliver draft clips, upload SMM graphics, or clean leads databases.', color: 'var(--ocean-500)'},
              {n: '04', t: 'Measure', d: 'Analyze view metrics, verification logs, and feedback loops to optimize.', color: 'var(--coral-500)'},
            ].map((p, i) => (
              <div key={i} style={{position: 'relative', paddingTop: 24}}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, width: 64, height: 8,
                  background: p.color, border: '1.5px solid var(--gray-900)', borderRadius: 999
                }}></div>
                <div style={{fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.12em', color: 'var(--fg-3)'}}>{p.n} / 04</div>
                <h4 style={{fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 26, margin: '10px 0 8px', letterSpacing: '-.02em', color: 'var(--gray-900)'}}>{p.t}</h4>
                <p style={{fontSize: 14, lineHeight: 1.55, color: 'var(--fg-2)', margin: 0}}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// About me layout (experience + software proficiency bars)
function AboutSection() {
  const data = window.GZ_DATA;
  return (
    <section id="about" style={{padding: '96px 48px 32px'}}>
      <div className="gz-about-grid" style={{maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 56, alignItems: 'flex-start'}}>
        {/* Profile and Stats Card */}
        <div style={{position: 'sticky', top: 100}}>
          <div style={{
            aspectRatio: '1 / 1.1', background: 'var(--gz-accent, var(--yellow-500))',
            border: '1.5px solid var(--gray-900)', borderRadius: 20,
            boxShadow: '8px 8px 0 var(--gray-900)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden'
          }}>
            <span style={{
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 240,
              color: 'var(--gray-900)', letterSpacing: '-.06em', lineHeight: 1
            }}>A</span>
            <div style={{
              position: 'absolute', bottom: 16, left: 16, right: 16,
              background: 'var(--gray-900)', color: 'var(--cream)',
              padding: '12px 14px', borderRadius: 10,
              display: 'flex', alignItems: 'center', gap: 10
            }}>
              <span className="gz-pulse" style={{width: 8, height: 8, borderRadius: 999, background: 'var(--lime-400)'}}></span>
              <span style={{fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase'}}>Video & Social Media Expert</span>
            </div>
          </div>
          <div style={{marginTop: 16, padding: 18, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 14}}>
            <Eyebrow>At a glance</Eyebrow>
            <div className="gz-stats-grid" style={{marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14}}>
              <div>
                <div style={{fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 28, color: 'var(--gray-900)', letterSpacing: '-.02em'}}><Counter value={5} suffix="+ yrs"/></div>
                <div style={{fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--fg-3)', marginTop: 4}}>Total Experience</div>
              </div>
              <div>
                <div style={{fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 28, color: 'var(--coral-500)', letterSpacing: '-.02em'}}><Counter value={100} suffix="+"/></div>
                <div style={{fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--fg-3)', marginTop: 4}}>Videos Delivered</div>
              </div>
              <div>
                <div style={{fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 28, color: 'var(--gray-900)', letterSpacing: '-.02em'}}><Counter value={4.8} decimals={1} suffix="M+"/></div>
                <div style={{fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--fg-3)', marginTop: 4}}>Views Generated</div>
              </div>
              <div>
                <div style={{fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 28, color: 'var(--gray-900)', letterSpacing: '-.02em'}}><Counter value={95} suffix="%"/></div>
                <div style={{fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--fg-3)', marginTop: 4}}>Client Retention</div>
              </div>
            </div>
          </div>
        </div>

        {/* Experience and Toolstack details */}
        <div style={{display: 'flex', flexDirection: 'column', gap: 56}}>
          <div>
            <Eyebrow>About me</Eyebrow>
            <h2 style={{fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(34px, 4vw, 52px)', margin: '14px 0 18px', letterSpacing: '-.025em', lineHeight: 1.05, color: 'var(--gray-900)'}}>Engagement is driven by timing and clean layout.</h2>
            <p style={{fontSize: 19, lineHeight: 1.55, color: 'var(--fg-2)', margin: '0 0 14px'}}>I design social media layouts and edit video clips to keep eyeballs on your channel. Most of my work sits in the space where pacing, SMM consistency, and direct sales copy compound into real reach.</p>
            <p style={{fontSize: 19, lineHeight: 1.55, color: 'var(--fg-2)', margin: 0}}>Over five years of experience managing B2B lead pipelines, formatting outreach, and cleaning databases so sales teams can scale booking rates safely.</p>
          </div>

          {/* Software progress bars */}
          <div>
            <Eyebrow>Software level</Eyebrow>
            <div style={{marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12}}>
              {data.specialtyMix.map((s, i) => (
                <SpecialtyBar key={i} s={s}/>
              ))}
            </div>
          </div>

          {/* Experience list */}
          <div>
            <Eyebrow>Experience</Eyebrow>
            <div style={{marginTop: 16, display: 'flex', flexDirection: 'column'}}>
              {data.experience.map((e, i) => (
                <div key={i} className="gz-experience-row" style={{
                  display: 'grid', gridTemplateColumns: '160px 1fr',
                  padding: '20px 0', gap: 24, alignItems: 'flex-start',
                  borderTop: i === 0 ? '1.5px solid var(--gray-900)' : '1px solid var(--border)',
                  borderBottom: i === data.experience.length - 1 ? '1.5px solid var(--gray-900)' : 'none'
                }}>
                  <div style={{fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.04em', color: 'var(--fg-2)', paddingTop: 4}}>{e.year}</div>
                  <div>
                    <h4 style={{fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 22, margin: 0, letterSpacing: '-.01em', color: 'var(--gray-900)'}}>{e.role} <span style={{color: 'var(--fg-3)', fontWeight: 500}}>· {e.org}</span></h4>
                    <p style={{fontSize: 15, lineHeight: 1.55, color: 'var(--fg-2)', margin: '8px 0 0', maxWidth: 560}}>{e.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tool List */}
          <div>
            <Eyebrow>Tools I use</Eyebrow>
            <div style={{marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 8}}>
              {data.tools.map((tool, i) => (
                <span key={i} style={{
                  padding: '8px 14px', borderRadius: 999,
                  background: 'var(--white)', border: '1px solid var(--border-strong)',
                  fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-1)',
                  letterSpacing: '.02em'
                }}>{tool}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Single progress bar component
function SpecialtyBar({ s }) {
  const [ref, seen] = useInView();
  return (
    <div ref={ref}>
      <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6}}>
        <span style={{fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 500, color: 'var(--gray-900)'}}>{s.name}</span>
        <span style={{fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-2)', letterSpacing: '.04em'}}>{s.pct}%</span>
      </div>
      <div style={{height: 10, background: 'var(--gray-100)', borderRadius: 999, overflow: 'hidden', border: '1px solid var(--border)'}}>
        <div style={{
          width: seen ? s.pct * 2.5 + '%' : '0%',
          maxWidth: '100%',
          height: '100%', background: s.color,
          transition: 'width .9s var(--ease-out)'
        }}></div>
      </div>
    </div>
  );
}

// Testimonials section
function PressSection() {
  const data = window.GZ_DATA;
  return (
    <section id="press" style={{padding: '96px 48px 32px'}}>
      <div style={{maxWidth: 1240, margin: '0 auto'}}>
        <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 28, gap: 24, flexWrap: 'wrap'}}>
          <div>
            <Eyebrow>What people say</Eyebrow>
            <h2 style={{fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(36px, 4.4vw, 56px)', margin: '14px 0 0', letterSpacing: '-.025em', lineHeight: 1.02, color: 'var(--gray-900)'}}>In their words.</h2>
          </div>
          <div style={{display: 'flex', gap: 32, alignItems: 'flex-end'}}>
            <div>
              <div style={{fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 48, color: 'var(--gray-900)', letterSpacing: '-.03em', lineHeight: 1}}><Counter value={95} suffix="%"/></div>
              <div style={{fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--fg-3)', marginTop: 6}}>Repeat clients</div>
            </div>
            <div>
              <div style={{fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 48, color: 'var(--coral-500)', letterSpacing: '-.03em', lineHeight: 1}}><Counter value={4.9} decimals={1}/></div>
              <div style={{fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--fg-3)', marginTop: 6}}>Client rating</div>
            </div>
          </div>
        </div>

        <div className="gz-press-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22}}>
          {data.press.map((p, i) => (
            <div key={i} style={{
              padding: '26px 26px 24px', borderRadius: 16,
              background: i === 1 ? 'var(--gray-900)' : 'var(--white)',
              color: i === 1 ? 'var(--cream)' : 'var(--gray-900)',
              border: '1.5px solid var(--gray-900)',
              boxShadow: i === 1 ? '6px 6px 0 var(--gz-accent, var(--yellow-500))' : '6px 6px 0 var(--gray-900)',
              display: 'flex', flexDirection: 'column', gap: 16,
              minHeight: 240
            }}>
              <Icon name="quote" size={22} color={i === 1 ? 'var(--lime-400)' : 'var(--coral-500)'} strokeWidth={2}/>
              <p style={{fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 19, lineHeight: 1.4, letterSpacing: '-.005em', margin: 0, flex: 1}}>"{p.quote}"</p>
              <div style={{fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.06em', color: i === 1 ? 'var(--gray-300)' : 'var(--fg-3)', textTransform: 'uppercase'}}>— {p.who}</div>
            </div>
          ))}
        </div>

        {/* Clients list */}
        <div style={{marginTop: 56, padding: '24px 0', borderTop: '1.5px solid var(--gray-900)', borderBottom: '1.5px solid var(--gray-900)'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 36, flexWrap: 'wrap'}}>
            <Eyebrow>Recent projects</Eyebrow>
            {data.clients.map((c, i) => (
              <div key={i} style={{fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 20, color: 'var(--fg-3)', letterSpacing: '-.01em'}}>{c}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact form
function ContactSection() {
  const [submitted, setSubmitted] = React.useState(false);
  const [form, setForm] = React.useState({ name: '', email: '', company: '', stage: 'Growing', budget: '$1.2–2.5k/mo', goal: '' });
  const data = window.GZ_DATA;
  return (
    <section id="contact" style={{padding: '96px 48px 64px'}}>
      <div style={{maxWidth: 1240, margin: '0 auto'}}>
        <div style={{
          borderRadius: 28, overflow: 'hidden',
          border: '1.5px solid var(--gray-900)',
          background: 'var(--lime-500)',
          boxShadow: '10px 10px 0 var(--gray-900)'
        }}>
          <div className="gz-contact-grid" style={{display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 0}}>
            <div style={{padding: '52px 56px', background: 'var(--lime-500)'}}>
              <Eyebrow color="var(--gray-800)">Get in touch</Eyebrow>
              <h2 style={{fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(36px, 4.5vw, 56px)', lineHeight: 1, letterSpacing: '-.03em', margin: '18px 0 16px', color: 'var(--gray-900)'}}>Send details of your video project. Let's build a timeline.</h2>
              <p style={{fontSize: 18, color: 'var(--gray-800)', margin: '0 0 28px', maxWidth: 500, lineHeight: 1.5}}>Response typically within 24h on business days.</p>

              {submitted ? (
                <div style={{padding: '24px 26px', background: 'var(--cream)', border: '1.5px solid var(--gray-900)', borderRadius: 14, boxShadow: '5px 5px 0 var(--gray-900)'}}>
                  <Eyebrow>Message sent</Eyebrow>
                  <h3 style={{fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 26, margin: '10px 0 8px', letterSpacing: '-.02em', color: 'var(--gray-900)'}}>Thanks, {form.name || 'friend'}. I'll write back soon.</h3>
                  <p style={{margin: 0, color: 'var(--gray-700)', fontSize: 15}}>Email typically arrives from <span style={{fontFamily: 'var(--font-mono)'}}>{data.person.email}</span>.</p>
                  <a onClick={() => setSubmitted(false)} style={{cursor: 'pointer', marginTop: 14, display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--gray-800)', borderBottom: '1.5px solid var(--gray-800)'}}>← Send another</a>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="gz-contact-form" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, maxWidth: 560}}>
                  {[
                    {id: 'name', label: 'Your name', ph: 'Alex Rivera', col: 1},
                    {id: 'email', label: 'Work email', ph: 'alex@northwind.co', col: 1},
                    {id: 'company', label: 'Company / Handle', ph: '@northwind_coffee', col: 2},
                  ].map(f => (
                    <div key={f.id} style={{display: 'flex', flexDirection: 'column', gap: 6, gridColumn: f.col === 2 ? 'span 2' : 'span 1'}}>
                      <label style={{fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gray-800)', fontWeight: 600}}>{f.label}</label>
                      <input required value={form[f.id]} onChange={(e) => setForm({...form, [f.id]: e.target.value})} placeholder={f.ph}
                        style={{
                          fontFamily: 'var(--font-body)', fontSize: 15, padding: '12px 14px',
                          border: '1.5px solid var(--gray-900)', borderRadius: 8,
                          background: 'var(--cream)', outline: 'none'
                        }}/>
                    </div>
                  ))}
                  <ChipField label="Video Type" value={form.stage} onChange={(v) => setForm({...form, stage: v})} options={['Clips / TikTok', 'YouTube vlog', 'SMM retainers', 'Lead Gen list']}/>
                  <ChipField label="Monthly Budget" value={form.budget} onChange={(v) => setForm({...form, budget: v})} options={['<$1.2k/mo', '$1.2–2.5k/mo', '$2.5–5k/mo', '$5k+/mo']}/>
                  <div style={{display: 'flex', flexDirection: 'column', gap: 6, gridColumn: 'span 2'}}>
                    <label style={{fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gray-800)', fontWeight: 600}}>Project details or links</label>
                    <textarea value={form.goal} onChange={(e) => setForm({...form, goal: e.target.value})} placeholder="e.g. 10 UGC clips, 2 YouTube vlogs per month, or SMM grid calendar setup."
                      rows="3" style={{
                        fontFamily: 'var(--font-body)', fontSize: 15, padding: '12px 14px',
                        border: '1.5px solid var(--gray-900)', borderRadius: 8,
                        background: 'var(--cream)', outline: 'none', resize: 'vertical'
                      }}/>
                  </div>
                  <div style={{gridColumn: 'span 2', marginTop: 4}}>
                    <Button variant="dark" size="lg" type="submit">Submit <Icon name="arrow-up-right" size={16}/></Button>
                  </div>
                </form>
              )}
            </div>

            {/* Sidebar metadata & download links */}
            <aside style={{padding: '52px 48px', background: 'var(--gray-900)', color: 'var(--cream)', display: 'flex', flexDirection: 'column', gap: 28}}>
              <div>
                <Eyebrow color="var(--lime-400)">Direct</Eyebrow>
                <div style={{marginTop: 14, display: 'flex', flexDirection: 'column', gap: 14}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 12}}><Icon name="mail" size={18}/><span style={{fontFamily: 'var(--font-mono)', fontSize: 14}}>{data.person.email}</span></div>
                  <div style={{display: 'flex', alignItems: 'center', gap: 12}}><Icon name="linkedin" size={18}/><a href={data.person.linkedin} target="_blank" style={{fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--cream)'}}>LinkedIn Profile</a></div>
                  <div style={{display: 'flex', alignItems: 'center', gap: 12}}><Icon name="map-pin" size={18}/><span style={{fontFamily: 'var(--font-body)', fontSize: 14}}>{data.person.location}</span></div>
                </div>
              </div>

              <div style={{paddingTop: 22, borderTop: '1px solid var(--gray-700)'}}>
                <Eyebrow color="var(--lime-400)">Availability</Eyebrow>
                <h3 style={{fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 30, margin: '12px 0 4px', letterSpacing: '-.02em'}}>Booking Q3 2026</h3>
                <p style={{margin: 0, color: 'var(--gray-300)', fontSize: 14, lineHeight: 1.5}}>Retainers and custom editing bundles start the month after booking.</p>
              </div>

              <div style={{paddingTop: 22, borderTop: '1px solid var(--gray-700)', marginTop: 'auto'}}>
                <Eyebrow color="var(--lime-400)">Download Resume</Eyebrow>
                <div style={{marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8}}>
                  <a href={data.person.resume} target="_blank" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 12px', borderRadius: 10,
                    background: 'rgba(255,252,245,.06)', border: '1px solid rgba(255,252,245,.12)',
                    color: 'var(--cream)', fontFamily: 'var(--font-mono)', fontSize: 12, cursor: 'pointer',
                    textDecoration: 'none'
                  }}>
                    <span style={{display: 'inline-flex', alignItems: 'center', gap: 10}}><Icon name="file-text" size={14}/>Capabilities Resume (PDF)</span>
                    <Icon name="download" size={14} color="var(--lime-400)"/>
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChipField({ label, value, onChange, options }) {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 8, gridColumn: 'span 2'}}>
      <label style={{fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gray-800)', fontWeight: 600}}>{label}</label>
      <div style={{display: 'flex', gap: 8, flexWrap: 'wrap'}}>
        {options.map(o => (
          <button key={o} type="button" onClick={() => onChange(o)} style={{
            padding: '8px 14px', borderRadius: 999, cursor: 'pointer',
            fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.04em',
            background: value === o ? 'var(--gray-900)' : 'var(--cream)',
            color: value === o ? 'var(--cream)' : 'var(--gray-800)',
            border: '1.5px solid var(--gray-900)', fontWeight: 500
          }}>{o}</button>
        ))}
      </div>
    </div>
  );
}

// Footer sitemap
function Footer() {
  const data = window.GZ_DATA;
  return (
    <footer style={{background: 'var(--gray-900)', color: 'var(--cream)', padding: '64px 48px 28px'}}>
      <div style={{maxWidth: 1240, margin: '0 auto'}}>
        <div className="gz-footer-grid" style={{display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, alignItems: 'flex-start'}}>
          <div>
            <span style={{fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 26, color: 'var(--cream)', letterSpacing: '-.01em'}}>andrianne<span style={{color: 'var(--coral-500)'}}>.</span></span>
            <p style={{fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--gray-300)', marginTop: 16, maxWidth: 360, lineHeight: 1.5}}>High-engagement video editing and cohesive social media content grid planning. Verified B2B contact lists.</p>
          </div>
          <div>
            <Eyebrow color="var(--lime-400)">Sitemap</Eyebrow>
            <ul style={{listStyle: 'none', padding: 0, margin: '14px 0 0', display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14}}>
              <li>Work</li><li>Services</li><li>About</li><li>Press</li>
            </ul>
          </div>
          <div>
            <Eyebrow color="var(--lime-400)">Direct Links</Eyebrow>
            <ul style={{listStyle: 'none', padding: 0, margin: '14px 0 0', display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14}}>
              <li><a href={data.person.linkedin} target="_blank" style={{color: 'var(--gray-300)', textDecoration: 'none'}}>LinkedIn Profile</a></li>
              <li><a href={`mailto:${data.person.email}`} style={{color: 'var(--gray-300)', textDecoration: 'none'}}>Send Email</a></li>
              <li><a href={data.person.resume} target="_blank" style={{color: 'var(--gray-300)', textDecoration: 'none'}}>View Resume</a></li>
            </ul>
          </div>
          <div>
            <Eyebrow color="var(--lime-400)">Outbox newsletter</Eyebrow>
            <p style={{fontSize: 13, color: 'var(--gray-300)', margin: '14px 0 12px', lineHeight: 1.5}}>Growth case studies, SMM tips, and tools once a month.</p>
            <div style={{display: 'flex'}}>
              <input placeholder="you@work.com" style={{flex: 1, fontFamily: 'var(--font-body)', fontSize: 14, padding: '10px 12px', border: '1px solid var(--gray-700)', background: 'var(--gray-800)', color: 'var(--cream)', borderRadius: '999px 0 0 999px', outline: 'none', minWidth: 0}}/>
              <button style={{padding: '10px 16px', background: 'var(--lime-500)', color: 'var(--gray-900)', border: 'none', borderRadius: '0 999px 999px 0', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.06em', cursor: 'pointer', fontWeight: 600}}>OK →</button>
            </div>
          </div>
        </div>
        <div className="gz-footer-copyright" style={{marginTop: 56, paddingTop: 22, borderTop: '1px solid var(--gray-700)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.06em', color: 'var(--gray-400)'}}>
          <span>© 2026 Andrianne Saavedra · Built to move the metric.</span>
          <span>Made with caffeine + editing timelines.</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  Nav, WorkSection, ServicesSection, AboutSection, SpecialtyBar, PressSection, ContactSection, Footer, Hero, HeroTickerRow, PerformancePanel
});
