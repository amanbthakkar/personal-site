export const FEED_TYPES = {
  YOUTUBE: 'youtube',
  BLOG: 'blog',
  PAPER: 'paper',
  PODCAST: 'podcast',
  RSS: 'rss',
  POST: 'post',
};

const now = Date.now();
const days = (n) => new Date(now - n * 24 * 60 * 60 * 1000).toISOString();

export const discoverStack = [
  {
    id: 'v-karpathy-next-token',
    type: FEED_TYPES.YOUTUBE,
    title: 'The “next token” is a user interface',
    summary:
      'A calm, high-signal walkthrough of how LLMs change interfaces: from deterministic screens to probabilistic intent surfaces.',
    source: 'YouTube',
    url: 'https://youtu.be/MJ67zFAO4u8?si=liXq4p9oqcC4pQRY',
    tags: ['interfaces', 'llms', 'ux', 'tool-use'],
    publishedAt: days(6),
    minutes: 52,
  },
  {
    id: 'v-two-minute-papers',
    type: FEED_TYPES.YOUTUBE,
    title: 'Diffusion sampling trick: faster without wrecking quality',
    summary:
      'A short demo-heavy video with the real “why it works” intuition — great companion to the related row below.',
    source: 'YouTube',
    url: 'https://youtu.be/ASXW53kI328?si=7eArdq3pGiqetGWp',
    tags: ['diffusion', 'sampling', 'research'],
    publishedAt: days(9),
    minutes: 9,
  },
  {
    id: 'b-stripe-queues',
    type: FEED_TYPES.BLOG,
    title: 'Queues that don’t lie: designing for backpressure',
    summary:
      'A narrative of real production incidents: why “just add workers” fails and what you can measure without dashboard sprawl.',
    source: 'Stripe Engineering (essay)',
    url: 'https://stripe.com/blog',
    tags: ['distributed-systems', 'backpressure', 'reliability'],
    publishedAt: days(11),
  },
];

export const discoverRows = [
  {
    id: 'row-related-across-platforms',
    title: 'Related across platforms',
    subtitle:
      'Same idea, different medium — the carousel is the point.',
    items: [
      {
        id: 'r1-cf-consistency',
        type: FEED_TYPES.BLOG,
        title: 'Consistency models, explained with edge cases you’ll actually hit',
        summary:
          'A practical mapping between invariants and failure modes when users refresh, retry, and rage-click.',
        source: 'Cloudflare Blog',
        url: 'https://blog.cloudflare.com/',
        tags: ['distributed-systems', 'consistency'],
        publishedAt: days(2),
      },
      {
        id: 'r1-arxiv-rlhf',
        type: FEED_TYPES.PAPER,
        title: 'Preference optimization without fragile reward models',
        summary:
          'Stabilizing preference learning with simpler objectives — for “how do we make this not collapse?” thinking.',
        source: 'arXiv',
        url: 'https://arxiv.org/',
        tags: ['llms', 'alignment'],
        publishedAt: days(18),
      },
      {
        id: 'r1-computerphile-memory',
        type: FEED_TYPES.YOUTUBE,
        title: 'Why memory bandwidth quietly dominates performance',
        summary: 'A clean explanation of a thing you can’t unsee once you ship systems.',
        source: 'YouTube',
        url: 'https://youtu.be/9OQ5vaYbGV0?si=_x7vmoI1T20Vmp7n',
        tags: ['systems', 'hardware'],
        publishedAt: days(30),
        minutes: 14,
      },
      {
        id: 'r1-dwarkesh',
        type: FEED_TYPES.PODCAST,
        title: 'On scaling laws, evals, and what we’ll regret optimizing',
        summary: 'A long-form conversation closer to a research meeting than an interview.',
        source: 'Dwarkesh Podcast',
        url: 'https://www.dwarkeshpatel.com/podcast',
        tags: ['evals', 'scaling'],
        publishedAt: days(21),
        minutes: 125,
      },
      {
        id: 'r1-hf-local',
        type: FEED_TYPES.RSS,
        title: 'Running small models locally: what’s actually usable today',
        summary: 'Quantization tradeoffs, tool calling limits, and where the UX breaks first.',
        source: 'Hugging Face (digest)',
        url: 'https://huggingface.co/blog',
        tags: ['local-ai', 'quantization'],
        publishedAt: days(4),
      },
      {
        id: 'r1-post-note',
        type: FEED_TYPES.POST,
        title: 'A note: “high-signal” is a product choice',
        summary: 'For a research feed, “time on app” is usually poison.',
        source: 'Personal memo',
        url: null,
        tags: ['product', 'philosophy'],
        publishedAt: days(1),
      },
    ],
  },
  {
    id: 'row-local-ai',
    title: 'Local AI, real constraints',
    subtitle: 'Latency, memory, and “it should run on a laptop” as a design tool.',
    items: [
      {
        id: 'r2-vercel-ai-ux',
        type: FEED_TYPES.BLOG,
        title: 'Streaming UX patterns that don’t feel like a chatbot',
        summary:
          'Partial rendering, reversible actions, and uncertainty as a first-class state.',
        source: 'Vercel (engineering notes)',
        url: 'https://vercel.com/blog',
        tags: ['interfaces', 'streaming'],
        publishedAt: days(15),
      },
      {
        id: 'r2-supabase-edge',
        type: FEED_TYPES.BLOG,
        title: 'Edge functions: where the sharp edges actually are',
        summary: 'Timeouts, cold starts, and the practical limits of “run anywhere”.',
        source: 'Supabase (engineering)',
        url: 'https://supabase.com/blog',
        tags: ['edge', 'infra'],
        publishedAt: days(24),
      },
      {
        id: 'r2-paper-retrieval',
        type: FEED_TYPES.PAPER,
        title: 'Retrieval-augmented generation: failure modes and mitigations',
        summary: 'Concrete “what goes wrong” lists — turning vibes into tests.',
        source: 'arXiv',
        url: 'https://arxiv.org/',
        tags: ['rag', 'retrieval'],
        publishedAt: days(28),
      },
      {
        id: 'r2-video-memory',
        type: FEED_TYPES.YOUTUBE,
        title: 'Memory bandwidth (again): the bottleneck you forgot',
        summary: 'A related video — cross-platform relationship in action.',
        source: 'YouTube',
        url: 'https://youtu.be/9OQ5vaYbGV0?si=_x7vmoI1T20Vmp7n',
        tags: ['performance', 'systems'],
        publishedAt: days(30),
        minutes: 14,
      },
    ],
  },
];
