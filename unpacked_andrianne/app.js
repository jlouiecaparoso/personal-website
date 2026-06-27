// App.jsx — composes the page + Tweaks panel.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "orange",
  "hoverStyle": "lift",
  "heroVariant": "dashboard",
  "animations": true,
  "density": "regular"
}/*EDITMODE-END*/;

function scrollToSection(id) {
  if (id === 'top') { window.scrollTo({top: 0, behavior: 'smooth'}); return; }
  const el = document.getElementById(id);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({top: y, behavior: 'smooth'});
  }
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // re-render lucide icons after tweak or state change
  React.useEffect(() => {
    if (window.lucide) lucide.createIcons();
  });

  // apply accent CSS var
  React.useEffect(() => {
    const map = {
      orange: '#FF7043',
      lime:   'var(--lime-500)',
      ocean:  'var(--ocean-500)',
      coral:  'var(--coral-500)',
    };
    document.documentElement.style.setProperty('--gz-accent', map[t.accent] || map.orange);
  }, [t.accent]);

  return (
    <div data-density={t.density}>
      <Nav scrollTo={scrollToSection} accent={t.accent}/>
      <Hero t={t} scrollTo={scrollToSection}/>
      <HeroTickerRow/>
      <WorkSection t={t}/>
      <ServicesSection scrollTo={scrollToSection}/>
      <AboutSection/>
      <PressSection/>
      <ContactSection/>
      <Footer/>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Visual"/>
        <TweakRadio
          label="Hero accent"
          value={t.accent}
          options={['orange', 'lime', 'ocean', 'coral']}
          onChange={(v) => setTweak('accent', v)}
        />
        <TweakRadio
          label="Hero layout"
          value={t.heroVariant}
          options={['dashboard', 'minimal']}
          onChange={(v) => setTweak('heroVariant', v)}
        />
        <TweakRadio
          label="Card hover"
          value={t.hoverStyle}
          options={['lift', 'pop']}
          onChange={(v) => setTweak('hoverStyle', v)}
        />
        <TweakSection label="Motion"/>
        <TweakToggle
          label="Counter animations"
          value={t.animations}
          onChange={(v) => setTweak('animations', v)}
        />
        <TweakSection label="Density"/>
        <TweakRadio
          label="Spacing"
          value={t.density}
          options={['compact', 'regular', 'airy']}
          onChange={(v) => setTweak('density', v)}
        />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
