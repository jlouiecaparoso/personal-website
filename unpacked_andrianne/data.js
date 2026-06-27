// Andrianne — Portfolio data
// Composes profile, stats, case studies, and tools for the portfolio.

window.GZ_DATA = {
  person: {
    name: 'Andrianne Saavedra',
    handle: '@andriannemelly',
    role: 'Video Editor & Social Media Manager',
    location: 'Philippines · GMT+8',
    status: 'Open to work · Q3 2026',
    email: 'saavedraandriann@gmail.com',
    linkedin: 'https://ph.linkedin.com/in/andrianne-melly-saavedra-4b8845241',
    resume: 'https://drive.google.com/file/d/1HrhP9Sc2FuIak71Q3ggvV0S5DhfoMDml/view?usp=sharing',
    bio: 'I help creators and brands scale their digital presence. Over five years of experience specializing in engaging video editing (clips and long-form), high-performing social media management (SMM), graphic design, and B2B lead generation.',
  },

  // Hero dashboard stats
  hero: {
    asOf: 'June 2026',
    headline: [
      { value: 100, suffix: '+', label: 'Videos delivered · 24h turn', accent: 'coral',
        spark: [20, 28, 35, 42, 50, 62, 70, 78, 85, 92, 98, 100], delta: 'Avg 24h turnaround' },
      { value: 4.8, suffix: 'M+', label: 'Organic views generated', accent: 'gray',
        spark: [0.5, 0.9, 1.2, 1.6, 2.1, 2.5, 2.9, 3.2, 3.8, 4.2, 4.5, 4.8], delta: 'across YT & TikTok' },
      { value: 95, suffix: '%', label: 'Client satisfaction rate', accent: 'gray',
        spark: [80, 82, 85, 87, 90, 92, 92, 94, 94, 95, 95, 95], delta: 'based on Q1 feedback' },
      { value: 15, prefix: '+', suffix: 'k', label: 'B2B Leads verified', accent: 'gray',
        spark: [1.2, 2.4, 3.8, 5.0, 6.2, 7.5, 9.0, 10.5, 11.8, 13.0, 14.2, 15.0], delta: '99% delivery rate' },
    ],
    specialties: ['Video Editing', 'Clips & Long Form', 'Social Media Management', 'Graphics & Design', 'B2B Lead Generation', 'Content Strategy'],
  },

  // Featured case + the rest
  cases: [
    {
      id: 'WF-01',
      client: 'Clips & Long Form Video',
      industry: 'Video Editing · Content Creators',
      tagline: 'High-retention edits designed to capture and hold attention.',
      title: 'I edit videos that increase retention by 35%',
      year: '2025',
      role: 'Lead Video Editor · Retainer',
      duration: 'Ongoing',
      channels: ['Premiere Pro', 'CapCut', 'Storytelling'],
      color: 'var(--yellow-300)',
      headline: { value: '+35%', label: 'Average Retention' },
      metrics: [
        { value: '+35%', label: 'Average Retention', accent: 'coral' },
        { value: '100+', label: 'Videos delivered', accent: 'gray' },
        { value: '4.8M', label: 'Total organic views', accent: 'gray' },
        { value: '<24h', label: 'Avg turnaround', accent: 'gray' },
      ],
      videoUrl: '_assets/video/065548f35bd4bbfa1b5c8f0ca1a41af0.mp4',
      posterUrl: '_assets/video/0b0c60fc6c6780df9dc6379c073838d2.jpg',
      problem: 'Creators were struggling with early drop-offs, losing up to 60% of viewers in the first 3 seconds of Reels and YouTube Shorts. The pacing felt draggy, and the call-to-actions were introduced too late.',
      approach: [
        'Audited drop-off patterns and restructured the intro hooks using high-impact zoom cuts and audio cue sweeps.',
        'Applied stylized subtitles, sound effects, and kinetic typography to retain visual interest.',
        'Edited long-form vlogs down into fast-paced narratives while retaining the creator\'s native personality.',
        'Tested split-hooks to capture different audience segments.',
      ],
      result: 'Audience retention increased by 35% on average, causing the platform algorithms to recommend the videos wider, driving a 2.4x organic growth lift.',
      testimonial: { quote: 'Andrianne edits with an air-tight sense of timing. The hooks she designs keep viewers glued.', who: 'Jason Stuart, Content Creator' },
    },
    {
      id: 'SF-02',
      client: 'Short-Form & UGC Edits',
      industry: 'DTC Brands · E-commerce',
      tagline: 'TikTok-native UGC edits built to convert cold traffic.',
      title: 'Hook testing and pacing optimization for video ads',
      year: '2025',
      role: 'Short-Form Editor · 3 months',
      duration: '90 days',
      channels: ['CapCut', 'UGC Edits', 'Ad Creative'],
      color: 'var(--coral-100)',
      headline: { value: '4.2×', label: 'Average ROAS' },
      metrics: [
        { value: '4.2×', label: 'Average ROAS', accent: 'coral' },
        { value: '+42%', label: 'CTR lift on ads', accent: 'gray' },
        { value: '<$12', label: 'Target CAC achieved', accent: 'gray' },
        { value: '3wk',  label: 'Setup to live', accent: 'gray' },
      ],
      videoUrl: '_assets/video/1fc4a8f5c3e8fb0ab1e5654eef441b63.mp4',
      posterUrl: '_assets/video/3fe56ee80f9fbb658bb3d708a7823e47.jpg',
      problem: 'A skincare brand was experiencing rising customer acquisition costs (CAC) due to ad fatigue and overly polished ad videos that users immediately scrolled past.',
      approach: [
        'Modified raw creator UGC raw footage into native-style TikTok and IG Reels edits.',
        'Wrote and voiced native text-to-speech callouts pointing out direct product benefits.',
        'Built a hook variation matrix, testing 3 visual variants within the first 3 seconds.',
      ],
      result: 'Average click-through rate (CTR) lifted 42%, stabilizing the customer acquisition cost (CAC) and maintaining a 4.2x ROAS over Q1.',
    },
    {
      id: 'SM-03',
      client: 'Social Media Designs',
      industry: 'Graphics & SMM',
      tagline: 'Cohesive Instagram grids, graphics, and engaging copies.',
      title: 'A complete social media grid makeover',
      year: '2024',
      role: 'SMM & Graphic Lead · 6 months',
      duration: '180 days',
      channels: ['Canva', 'Photoshop', 'Grid Design'],
      color: 'var(--ocean-100)',
      headline: { value: '+118%', label: 'Engagement lift' },
      metrics: [
        { value: '+118%', label: 'Engagement lift', accent: 'coral' },
        { value: '+84%',  label: 'Follower growth', accent: 'gray' },
        { value: '30+',   label: 'Graphics designed/mo', accent: 'gray' },
        { value: '14d',   label: 'First win', accent: 'gray' },
      ],
      // We will map media files from the _assets/media/ folder for SMM designs
      images: [
        '_assets/media/01f001767808dbc7e195752a0d4193a0.png',
        '_assets/media/26a83983929414dfd4e32e0c8eb5d0c4.png',
        '_assets/media/3af05e04afedf568d6904e34943e5bcd.png',
        '_assets/media/73e7f898ddb47255abbaa85937a3f9d5.png'
      ],
      problem: 'An SMM client was publishing updates daily but had inconsistent layout styles, color schemes, and fonts. Engagement was dropping and profile views did not convert to followers.',
      approach: [
        'Established a clean, 3-column aesthetic layout design system matching the brand colors.',
        'Redesigned templates in Canva and Photoshop for fast, high-quality, repeating graphics.',
        'Polished caption copies, formatting them for shares and saves.',
      ],
      result: 'Follower acquisition rate grew 84%, and monthly organic reach and saves lifted by 118%.',
      testimonial: { quote: 'Andrianne has an eye for clean, bold designs that stand out in the feed.', who: 'Freddy Rivera, Brand Designer' },
    },
    {
      id: 'LG-04',
      client: 'B2B Lead Generation',
      industry: 'Data Entry · Pipeline Building',
      tagline: 'Verified target lists, zero bounce rates, and direct outreach.',
      title: 'Verified 15k+ targeted leads with <0.5% bounce rate',
      year: '2024',
      role: 'Lead Gen Specialist',
      duration: '90 days',
      channels: ['Apollo', 'Sales Nav', 'List Scraping'],
      color: 'var(--lime-200)',
      headline: { value: '15,000+', label: 'Leads verified' },
      metrics: [
        { value: '15,000+', label: 'Leads verified', accent: 'coral' },
        { value: '<0.5%',  label: 'Bounce rate', accent: 'gray' },
        { value: '+28%',   label: 'Reply rate lift', accent: 'gray' },
        { value: '3wk',    label: 'Methodology setup', accent: 'gray' },
      ],
      problem: 'A business development team was struggling with out-of-date databases, high bounce rates, and warnings on their cold emailing domains due to bad data.',
      approach: [
        'Configured targeted search filters on Apollo and LinkedIn Sales Navigator for verified decision-makers.',
        'Validated all emails using a double-verification flow to weed out catch-alls and inactive mailboxes.',
        'Formatted prospecting spreadsheets with custom details for email personalization.',
      ],
      result: 'Delivered a list of 15k+ highly targeted leads with a bounce rate under 0.5%, increasing campaign reply rates to 28% without triggering spam warnings.',
    },
  ],

  // Specialty mix
  specialtyMix: [
    { name: 'Video Editing (Short/Long Form)', pct: 40, color: 'var(--yellow-500)' },
    { name: 'Social Media Management',        pct: 25, color: 'var(--lime-500)'   },
    { name: 'Graphics & Layout Design',       pct: 20, color: 'var(--ocean-500)'  },
    { name: 'B2B Lead Gen & Data Mining',     pct: 15, color: 'var(--coral-500)'  },
  ],

  services: [
    {
      icon: 'video',
      name: 'Video editing package',
      tag: 'Weekly delivery · fixed price',
      desc: 'High-retention video editing for YouTube, TikTok, and Reels. Perfect for creators and brands that need standard, engaging content consistently.',
      deliverables: ['Up to 15 Shorts/Reels per month', 'Kinetic subtitles + sound effects', 'Color grading + audio clean-up', 'Thumbnail design + hooks testing'],
      price: '$1,200',
      timeline: 'Monthly',
      accent: 'var(--yellow-500)'
    },
    {
      icon: 'trending-up',
      name: 'SMM & video retainer',
      tag: 'Fractional lead · 3-month min.',
      desc: 'I manage your social grid and video pipeline. Aesthetic design, calendar planning, content editing, and growth tracking, owned end to end.',
      deliverables: ['Custom graphic design & copy', 'Short-form video edits', 'Grid calendar & publishing schedule', 'Monthly reach and analytics report'],
      price: '$2.5k/mo',
      timeline: '3–12 months',
      accent: 'var(--lime-500)',
      featured: true,
    },
    {
      icon: 'target',
      name: 'B2B lead generation',
      tag: 'Custom scope · list delivery',
      desc: 'Clean, double-verified B2B contact lists matching your target persona. Built to support cold email outbound campaigns without bouncing.',
      deliverables: ['Target persona persona research', 'Verified B2B email addresses', 'Company metadata + direct dials', 'Outbox bounce testing'],
      price: '$800+',
      timeline: '2 weeks',
      accent: 'var(--ocean-500)'
    },
  ],

  experience: [
    { year: '2023 — now',  role: 'Independent SMM & Editor', org: 'Freelance',   desc: 'Edited 100+ videos, managed social calendars, and designed graphics for DTC and B2B clients.' },
    { year: '2021 — 2023', role: 'Social Media Manager',      org: 'Agency Partner',  desc: 'Led a team of creators to scale organic channel reaches by 118% and managed design systems.' },
    { year: '2019 — 2021', role: 'B2B Lead Generator',        org: 'Outsource Team',  desc: 'Scraped, validated, and formatted verified cold-prospecting lists for outbound campaigns.' },
  ],

  tools: ['CapCut', 'Adobe Premiere Pro', 'Photoshop', 'Illustrator', 'Canva', 'Apollo.io', 'LinkedIn Sales Navigator', 'Klaviyo', 'Google Sheets'],

  clients: ['Aster Co.', 'Bluebird', 'Northwind Coffee', 'Coastline', 'Helio SaaS'],

  press: [
    { who: 'Jason Stuart · YouTuber',              quote: 'Andrianne edits with an air-tight sense of timing. The hooks she designs keep viewers glued.' },
    { who: 'Freddy Rivera · Brand Designer',        quote: 'She has an eye for clean, bold designs that stand out in the feed.' },
    { who: 'Client Australia · Lead Gen Agency',   quote: 'Clean spreadsheets, verified data. The leads she scraped gave us our best reply rates yet.' },
  ],
};
