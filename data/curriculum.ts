export type Link = { label: string; url: string };

export type Topic = {
  id: string;
  title: string;
  hours?: string;
  why?: string;
  concept?: string;
  focus?: string;
  note?: string;
  primary: Link[];
  fallbacks?: { label: string; links: Link[] }[];
  extras?: { label: string; links: Link[] }[];
};

export type Track = {
  id: string;
  title: string;
  blurb?: string;
  topics: Topic[];
};

export type Paper = {
  title: string;
  authors?: string;
  year?: string;
  url: string;
  note?: string;
  category: string;
};

export type Week = {
  n: number;
  title: string;
  items: string[];
  links: Link[];
  deliverable: string;
};

export type Course = {
  name: string;
  prof?: string;
  hours?: string;
  note?: string;
  links: Link[];
};

export type UniversityCourses = { university: string; courses: Course[] };

export type YoutubeChannel = {
  name: string;
  url?: string;
  note?: string;
  items?: Link[];
};

export type YoutubeCategory = {
  label: string;
  channels: YoutubeChannel[];
};

export type BlogEntry = { label: string; url: string; note?: string };
export type StayingCurrentSection = { label: string; entries: BlogEntry[] };

export const tracks: Track[] = [
  {
    id: 'track-1',
    title: 'Track 1: Mathematical & CS Foundations',
    blurb:
      'Reference material to fill gaps as you encounter them. Do not sequentially consume.',
    topics: [
      {
        id: '1-1',
        title: '1.1 Linear Algebra',
        hours: '~40–50h',
        why:
          'Every neural-net op is a tensor contraction; gradients, attention, PCA, SVD-based low-rank adapters (LoRA) all live here. Frontier interviews test matrix-calculus fluency.',
        concept:
          'Vector spaces, matrices as linear maps, eigen/SVD decompositions, and matrix calculus (gradients, Jacobians, Hessians) for backprop.',
        focus:
          'L1–11 (elimination, spaces, rank), L14–16 (orthogonality/projections), L21–25 (eigenvalues), L29–30 (SVD).',
        note: 'Canonical column-space-first intuition; free full video + notes + psets.',
        primary: [
          {
            label: 'MIT 18.06 Linear Algebra (Gilbert Strang)',
            url: 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/',
          },
          {
            label: 'MIT 18.06 YouTube playlist',
            url: 'https://www.youtube.com/playlist?list=PL49CF3715CB9EF31D',
          },
        ],
        fallbacks: [
          {
            label: '3Blue1Brown — Essence of Linear Algebra',
            links: [
              {
                label: '3Blue1Brown Essence of Linear Algebra (15 videos)',
                url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab',
              },
            ],
          },
          {
            label: 'Deisenroth/Faisal/Ong — Mathematics for Machine Learning',
            links: [
              {
                label: 'MML book PDF (Ch. 2–5)',
                url: 'https://mml-book.github.io/book/mml-book.pdf',
              },
            ],
          },
        ],
      },
      {
        id: '1-2',
        title: '1.2 Probability & Statistics',
        hours: '~50h',
        why:
          'MLE↔cross-entropy, Bayesian deep learning, RLHF reward modeling, eval uncertainty (CIs, A/B tests), and scaling-law fits all depend on it.',
        focus:
          '34 lectures; pay special attention to L28 (Markov/Chebyshev/Jensen) and the Markov-chain segments.',
        note: 'Most approachable rigorous probability course with free textbook.',
        primary: [
          { label: 'Harvard Stat 110 course site', url: 'https://stat110.hsites.harvard.edu/' },
          {
            label: 'Stat 110 YouTube playlist',
            url: 'https://www.youtube.com/playlist?list=PL2SOU6wwxB0uwwH80KTQ6ht66KWxbzTIo',
          },
          { label: 'Free book — probabilitybook.net', url: 'https://probabilitybook.net' },
        ],
        fallbacks: [
          {
            label: 'Kevin Murphy — Probabilistic ML: An Introduction',
            links: [
              { label: 'PML Book 1 (Ch. 2–5, 7)', url: 'https://probml.github.io/pml-book/book1.html' },
            ],
          },
          {
            label: 'Deisenroth MML Ch. 6',
            links: [{ label: 'MML book PDF', url: 'https://mml-book.github.io/book/mml-book.pdf' }],
          },
        ],
      },
      {
        id: '1-3',
        title: '1.3 Calculus & Optimization',
        hours: '~40h',
        why:
          'Training = optimization. Convexity, conditioning, duality/KKT are essential for debugging convergence, schedulers, constrained problems (RLHF, quantization).',
        focus:
          'Ch 2 (convex sets), Ch 3 (convex functions), Ch 4 (problems), Ch 5 (duality/KKT), Ch 9–11 (algorithms).',
        note: 'The canonical convex-optimization book; Stanford EE364A videos mirror the chapters.',
        primary: [
          {
            label: 'Boyd & Vandenberghe — Convex Optimization (PDF)',
            url: 'https://web.stanford.edu/~boyd/cvxbook/bv_cvxbook.pdf',
          },
          { label: 'Stanford EE364A course page', url: 'https://web.stanford.edu/class/ee364a/' },
        ],
        fallbacks: [
          {
            label: 'Deisenroth MML Ch. 5 + Ch. 7',
            links: [{ label: 'MML book PDF', url: 'https://mml-book.github.io/book/mml-book.pdf' }],
          },
          {
            label: 'MIT 18.02 Multivariable Calculus',
            links: [
              {
                label: 'MIT 18.02SC Multivariable Calculus (OCW)',
                url: 'https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/',
              },
            ],
          },
        ],
      },
      {
        id: '1-4',
        title: '1.4 Information Theory',
        hours: '~20–25h',
        why:
          'Cross-entropy loss, label smoothing, ELBO, tokenizer entropy, scaling laws — all share a vocabulary grounded here.',
        focus:
          'Ch 1–6 (entropy, source coding, typicality), Ch 8–10 (mutual info, channel coding), Ch 22–24 (Bayesian inference/KL).',
        note: 'Author-hosted, CC-licensed; MacKay Cambridge video lectures complement it.',
        primary: [
          {
            label: 'MacKay — Information Theory, Inference, and Learning Algorithms (PDF)',
            url: 'https://www.inference.org.uk/itprnn/book.pdf',
          },
          { label: 'Book page', url: 'https://www.inference.org.uk/mackay/itila/book.html' },
        ],
        fallbacks: [
          {
            label: 'MacKay YouTube lectures',
            links: [
              {
                label: 'MacKay Cambridge lectures playlist',
                url: 'https://www.youtube.com/playlist?list=PLruBu5BI5n4aFpG32iMbdWoRVAA-Vcso6',
              },
            ],
          },
          {
            label: 'Stanford EE376A notes',
            links: [{ label: 'EE376A course page', url: 'https://web.stanford.edu/class/ee376a/' }],
          },
        ],
      },
      {
        id: '1-5',
        title: '1.5 Algorithms & Data Structures (Advanced)',
        hours: '~60h',
        why:
          'Vector DBs, schedulers, tokenizers, RLHF samplers — all rely on graph structure, amortized/online analysis, and approximation.',
        focus:
          '6.006 for foundations (BFS/DFS, Dijkstra, DP — SRTBOT); 6.046 for amortized/potential, randomized, flows, approximation.',
        primary: [
          {
            label: 'MIT 6.006 (Spring 2020)',
            url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/',
          },
          {
            label: 'MIT 6.006 YouTube playlist',
            url: 'https://www.youtube.com/playlist?list=PLUl4u3cNGP63EdVPNLG3ToM6LaEUuStEY',
          },
          {
            label: 'MIT 6.046J (Spring 2015)',
            url: 'https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/',
          },
        ],
        fallbacks: [
          {
            label: 'MIT 6.854 Advanced Algorithms (Karger)',
            links: [
              {
                label: '6.854J Advanced Algorithms (OCW)',
                url: 'https://ocw.mit.edu/courses/6-854j-advanced-algorithms-fall-2008/',
              },
            ],
          },
          {
            label: 'Jeff Erickson — Algorithms (free)',
            links: [{ label: 'Erickson Algorithms', url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/' }],
          },
        ],
      },
      {
        id: '1-6',
        title: '1.6 Computer Systems',
        hours: '~60h',
        why:
          'Frontier ML is memory-bandwidth bound. You cannot read FlashAttention, Triton kernels, or profile LLM training without cache/warp/coalescing fluency.',
        focus:
          'CPU: L10 optimization, L11–12 cache, L17–18 virtual memory + Cache Lab + Performance Lab. GPU: Ch 5 model, Ch 6 interface, Ch 7 hardware/SIMT/warps.',
        primary: [
          { label: 'CMU 15-213/15-513 CSAPP', url: 'https://www.cs.cmu.edu/~213/' },
          { label: 'CSAPP schedule + videos', url: 'https://www.cs.cmu.edu/~213/schedule.html' },
          {
            label: 'NVIDIA CUDA C++ Programming Guide',
            url: 'https://docs.nvidia.com/cuda/cuda-c-programming-guide/index.html',
          },
          {
            label: 'NVIDIA CUDA Best Practices Guide',
            url: 'https://docs.nvidia.com/cuda/cuda-c-best-practices-guide/',
          },
        ],
        fallbacks: [
          {
            label: 'Berkeley CS267 Parallel Computing',
            links: [{ label: 'CS267 Spring 2021', url: 'https://sites.google.com/lbl.gov/cs267-spr2021' }],
          },
          {
            label: 'Agner Fog optimization manuals',
            links: [{ label: 'agner.org/optimize', url: 'https://www.agner.org/optimize/' }],
          },
        ],
      },
      {
        id: '1-7',
        title: '1.7 Distributed Systems Theory',
        hours: '~30h',
        why:
          'Multi-node training (AllReduce, sharded optimizers), parameter servers, checkpoint stores, and inference routers all ride on these primitives.',
        focus:
          'physical/logical time, broadcast, replication, quorums, Raft, 2PC, linearizability, eventual consistency.',
        note: 'Tight and modern.',
        primary: [
          {
            label: 'Martin Kleppmann — Cambridge Distributed Systems (YouTube)',
            url: 'https://www.youtube.com/playlist?list=PLeKd45zvjcDFUEv_ohr_HdUFe97RItdiB',
          },
          {
            label: 'Kleppmann lecture notes (PDF)',
            url: 'https://www.cl.cam.ac.uk/teaching/2122/ConcDisSys/dist-sys-notes.pdf',
          },
        ],
        fallbacks: [
          {
            label: 'MIT 6.824/6.5840 (Robert Morris)',
            links: [
              { label: '6.824 course site', url: 'https://pdos.csail.mit.edu/6.824/' },
              {
                label: '6.824 YouTube playlist',
                url: 'https://www.youtube.com/playlist?list=PLrw6a1wE39_tb2fErI4-WkMbsvGQk9_UB',
              },
            ],
          },
          {
            label: 'raft.github.io + Raft paper',
            links: [
              { label: 'raft.github.io', url: 'https://raft.github.io/' },
              { label: 'Raft paper (PDF)', url: 'https://raft.github.io/raft.pdf' },
            ],
          },
        ],
      },
      {
        id: '1-8',
        title: '1.8 Programming Language Mastery',
        hours: '~80h combined',
        primary: [
          { label: 'Python Tutorial', url: 'https://docs.python.org/3/tutorial/' },
          { label: 'Python Language Reference', url: 'https://docs.python.org/3/reference/' },
          { label: 'Python asyncio', url: 'https://docs.python.org/3/library/asyncio.html' },
          { label: 'Python typing', url: 'https://docs.python.org/3/library/typing.html' },
          { label: 'Node.js Learn', url: 'https://nodejs.org/en/learn/' },
          { label: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/handbook/intro.html' },
          { label: 'The Rust Programming Language (Book)', url: 'https://doc.rust-lang.org/book/' },
        ],
        focus:
          'Python: Tutorial §9–10, Reference §6/§8, asyncio high-level APIs. Node: event loop, streams. TS: Basics → Modules → Generics/Conditional/Mapped. Rust: Ch 1–10, 13, 15, 16, 19, 20.',
        fallbacks: [
          {
            label: 'Canonical Python PEPs',
            links: [
              { label: 'PEP 492 — async/await', url: 'https://peps.python.org/pep-0492/' },
              { label: 'PEP 484 — type hints', url: 'https://peps.python.org/pep-0484/' },
              { label: 'PEP 3156 — asyncio', url: 'https://peps.python.org/pep-3156/' },
            ],
          },
          {
            label: 'Node.js API reference',
            links: [{ label: 'nodejs.org/api', url: 'https://nodejs.org/api/' }],
          },
          {
            label: 'Rustlings exercises',
            links: [{ label: 'rust-lang/rustlings', url: 'https://github.com/rust-lang/rustlings/' }],
          },
          {
            label: 'C++ Core Guidelines',
            links: [
              {
                label: 'isocpp.github.io/CppCoreGuidelines',
                url: 'https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'track-2',
    title: 'Track 2: Classical ML & Statistical Learning',
    blurb:
      'Backbone: Stanford CS229 (Ng 2018 YouTube + 2022 notes). Secondary pillars: ISLR2, ESL, Sutton & Barto, Shalev-Shwartz & Ben-David.',
    topics: [
      {
        id: '2-1',
        title: '2.1 Supervised Learning',
        hours: '~35–45h',
        focus:
          'Lec 2–4 (linear/logistic/GLMs), 6–7 (SVM/kernels), 8 (CV), 10 (trees/bagging/boosting); Notes Ch 1, 2, 5, 6, 8.',
        primary: [
          {
            label: 'CS229 — YouTube (Ng 2018)',
            url: 'https://www.youtube.com/playlist?list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU',
          },
          { label: 'CS229 main notes (2022, PDF)', url: 'https://cs229.stanford.edu/lectures-spring2022/main_notes.pdf' },
          { label: 'CS229 hub', url: 'https://cs229.stanford.edu/' },
        ],
        fallbacks: [
          {
            label: 'ISLR2 (James/Witten/Hastie/Tibshirani)',
            links: [
              { label: 'ISLR2 site', url: 'https://www.statlearning.com' },
              {
                label: 'ISLR2 corrected PDF (June 2023)',
                url: 'https://hastie.su.domains/ISLR2/ISLRv2_corrected_June_2023.pdf.download.html',
              },
            ],
          },
          {
            label: 'ESL (Hastie/Tibshirani/Friedman) + boosting docs',
            links: [
              { label: 'ESL', url: 'https://hastie.su.domains/ElemStatLearn/' },
              {
                label: 'XGBoost — model intro',
                url: 'https://xgboost.readthedocs.io/en/stable/tutorials/model.html',
              },
              { label: 'LightGBM — features', url: 'https://lightgbm.readthedocs.io/en/latest/Features.html' },
            ],
          },
        ],
      },
      {
        id: '2-2',
        title: '2.2 Unsupervised Learning',
        hours: '~20–25h',
        primary: [
          {
            label: 'CS229 — Lec 14 (EM), 15 (PCA), 16 (ICA)',
            url: 'https://www.youtube.com/playlist?list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU',
          },
        ],
        fallbacks: [
          {
            label: 'ESL Ch 14',
            links: [{ label: 'ESL', url: 'https://hastie.su.domains/ElemStatLearn/' }],
          },
          {
            label: 'scikit-learn + UMAP',
            links: [
              { label: 'scikit-learn clustering', url: 'https://scikit-learn.org/stable/modules/clustering.html' },
              { label: 'UMAP docs', url: 'https://umap-learn.readthedocs.io/' },
            ],
          },
        ],
      },
      {
        id: '2-3',
        title: '2.3 Statistical Learning Theory',
        hours: '~20–30h',
        focus:
          'Ch 2–3 (PAC), 4 (uniform convergence), 5 (bias-complexity), 6 (VC-dim), 7 (SRM), 13 (regularization/stability).',
        primary: [
          {
            label: 'Shalev-Shwartz & Ben-David — Understanding Machine Learning (PDF)',
            url: 'https://www.cs.huji.ac.il/~shais/UnderstandingMachineLearning/understanding-machine-learning-theory-algorithms.pdf',
          },
        ],
        fallbacks: [
          {
            label: 'CS229 2022 notes (SLT sections)',
            links: [
              { label: 'CS229 main notes', url: 'https://cs229.stanford.edu/lectures-spring2022/main_notes.pdf' },
            ],
          },
          {
            label: 'MIT 9.520 — Statistical Learning Theory (Poggio)',
            links: [{ label: 'MIT 9.520', url: 'https://www.mit.edu/~9.520/' }],
          },
        ],
      },
      {
        id: '2-4',
        title: '2.4 Probabilistic Graphical Models',
        hours: '~30–40h',
        focus:
          'Bayes nets/d-separation, MRFs, exact inference (VE, junction tree), VI, MCMC (Gibbs/MH/HMC).',
        primary: [
          { label: 'CMU 10-708 (Xing, Spring 2020)', url: 'https://www.cs.cmu.edu/~epxing/Class/10708-20/' },
          { label: '10-708 lectures + videos', url: 'https://www.cs.cmu.edu/~epxing/Class/10708-20/lectures.html' },
          {
            label: '10-708 YouTube playlist',
            url: 'https://www.youtube.com/playlist?list=PLoZgVqqHOumTqxIhcdcpOAJOOimrRCGZn',
          },
          { label: 'PGM Spring 2019 alt', url: 'https://sailinglab.github.io/pgm-spring-2019/' },
        ],
        fallbacks: [
          {
            label: 'Murphy — PML: Advanced Topics (book 2)',
            links: [{ label: 'PML Book 2', url: 'https://probml.github.io/pml-book/book2.html' }],
          },
          {
            label: 'Variational Inference Review (Blei/Kucukelbir/McAuliffe)',
            links: [{ label: 'arXiv:1601.00670', url: 'https://arxiv.org/abs/1601.00670' }],
          },
        ],
      },
      {
        id: '2-5',
        title: '2.5 Reinforcement Learning Foundations',
        hours: '~35–45h',
        focus:
          'Ch 3 (MDPs), 4 (DP), 5 (MC), 6 (TD/SARSA/Q-learning), 7 (n-step), 9–10 (function approx), 13 (policy gradients).',
        primary: [
          {
            label: 'Sutton & Barto — RL: An Introduction (2nd ed, free)',
            url: 'http://incompleteideas.net/book/the-book-2nd.html',
          },
        ],
        fallbacks: [
          {
            label: 'David Silver UCL/DeepMind RL Course (2015)',
            links: [
              { label: 'Silver slides', url: 'https://www.davidsilver.uk/teaching/' },
              {
                label: 'Silver YouTube',
                url: 'https://www.youtube.com/playlist?list=PLqYmG7hTraZDM-OYHWgPebj2MfCFzFObQ',
              },
            ],
          },
          {
            label: 'Stanford CS234 (Brunskill, Spring 2024)',
            links: [
              { label: 'CS234 site', url: 'https://web.stanford.edu/class/cs234/' },
              {
                label: 'CS234 YouTube',
                url: 'https://www.youtube.com/playlist?list=PLoROMvodv4rN4wG6Nk6sNpTEbuOSosZdX',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'track-3',
    title: 'Track 3: Deep Learning Core',
    topics: [
      {
        id: '3-1',
        title: '3.1 Neural Network Fundamentals',
        hours: '~10–14h',
        concept:
          'Perceptrons → MLPs with nonlinear activations (ReLU, GELU, Swish); universal approximation with any non-polynomial activation.',
        focus:
          'Ch 1 (perceptrons, MNIST from scratch), 2 (backprop), 3 (cross-entropy/init/overfitting), 4 (universal-approx proof).',
        primary: [
          {
            label: 'Michael Nielsen — Neural Networks and Deep Learning',
            url: 'http://neuralnetworksanddeeplearning.com/',
          },
        ],
        fallbacks: [
          {
            label: 'Karpathy — Building micrograd',
            links: [{ label: 'YouTube: VMj-3S1tku0', url: 'https://youtu.be/VMj-3S1tku0' }],
          },
          {
            label: 'Simon Prince — Understanding Deep Learning (v5.00, Oct 2025)',
            links: [{ label: 'UDL book site', url: 'https://udlbook.github.io/udlbook/' }],
          },
        ],
      },
      {
        id: '3-2',
        title: '3.2 Backpropagation From Scratch',
        hours: '~8–10h',
        note: 'Single best ROI video in ML education — builds full autograd engine + tiny NN.',
        primary: [
          {
            label: 'Karpathy — Building micrograd (2h25m)',
            url: 'https://youtu.be/VMj-3S1tku0',
          },
          { label: 'karpathy/micrograd repo', url: 'https://github.com/karpathy/micrograd' },
        ],
        fallbacks: [
          {
            label: 'CS231n backprop notes',
            links: [{ label: 'cs231n.github.io/optimization-2', url: 'https://cs231n.github.io/optimization-2/' }],
          },
          {
            label: 'Chris Olah — Calculus on Computational Graphs',
            links: [{ label: 'colah.github.io', url: 'https://colah.github.io/posts/2015-08-Backprop/' }],
          },
        ],
      },
      {
        id: '3-3',
        title: '3.3 CNNs (refresh)',
        hours: '~6–8h',
        focus: 'L5 (CNNs), L9 (architectures), L7 (training II).',
        primary: [
          {
            label: 'Stanford CS231n 2017 YouTube',
            url: 'https://www.youtube.com/playlist?list=PL3FW7Lu3i5JvHM8ljYj-zLfQRF3EO8sYv',
          },
          { label: 'CS231n notes', url: 'https://cs231n.github.io/' },
        ],
        fallbacks: [
          {
            label: 'UMich EECS 498 (Justin Johnson, 2019)',
            links: [
              {
                label: 'EECS 498 YouTube',
                url: 'https://www.youtube.com/playlist?list=PL5-TkQAfAZFbzxjBHtzdVCWE0Zbhomg7r',
              },
            ],
          },
          {
            label: 'Landmark CNN papers',
            links: [
              { label: 'ResNet — arXiv:1512.03385', url: 'https://arxiv.org/abs/1512.03385' },
              { label: 'VGG — arXiv:1409.1556', url: 'https://arxiv.org/abs/1409.1556' },
              { label: 'EfficientNet — arXiv:1905.11946', url: 'https://arxiv.org/abs/1905.11946' },
              { label: 'ConvNeXt — arXiv:2201.03545', url: 'https://arxiv.org/abs/2201.03545' },
            ],
          },
        ],
      },
      {
        id: '3-4',
        title: '3.4 Recurrent Networks',
        hours: '~5–7h',
        primary: [
          {
            label: 'Chris Olah — Understanding LSTM Networks',
            url: 'https://colah.github.io/posts/2015-08-Understanding-LSTMs/',
          },
        ],
        fallbacks: [
          {
            label: 'Karpathy — Unreasonable Effectiveness of RNNs',
            links: [{ label: 'karpathy.github.io', url: 'https://karpathy.github.io/2015/05/21/rnn-effectiveness/' }],
          },
          {
            label: 'CS224n 2024 L5 RNNs',
            links: [{ label: 'youtube.com/watch?v=fyc0Jzr74y4', url: 'https://www.youtube.com/watch?v=fyc0Jzr74y4' }],
          },
        ],
      },
      {
        id: '3-5',
        title: '3.5 Transformers From Scratch',
        hours: '~20–30h (highest priority in this track)',
        primary: [
          {
            label: "Karpathy — Let's build GPT: from scratch (1h56m)",
            url: 'https://www.youtube.com/watch?v=kCc8FmEb1nY',
          },
          { label: 'karpathy/nanoGPT', url: 'https://github.com/karpathy/nanoGPT' },
          { label: "Karpathy — Let's build the GPT Tokenizer", url: 'https://youtu.be/zduSFxRajkE' },
        ],
        fallbacks: [
          {
            label: 'Umar Jamil — Attention is all you need (coding)',
            links: [
              {
                label: 'Attention — YouTube',
                url: 'https://www.youtube.com/watch?v=bCz4OMemCcA',
              },
              { label: 'hkproj/pytorch-transformer', url: 'https://github.com/hkproj/pytorch-transformer' },
            ],
          },
          {
            label: 'Annotated Transformer + Illustrated Transformer',
            links: [
              {
                label: 'Annotated Transformer (Harvard 2022)',
                url: 'https://nlp.seas.harvard.edu/annotated-transformer/',
              },
              { label: 'Jay Alammar — Illustrated Transformer', url: 'https://jalammar.github.io/illustrated-transformer/' },
            ],
          },
        ],
        extras: [
          {
            label: 'RoPE/ALiBi specifically',
            links: [
              { label: 'RoPE paper — arXiv:2104.09864', url: 'https://arxiv.org/abs/2104.09864' },
              { label: 'ALiBi — arXiv:2108.12409', url: 'https://arxiv.org/abs/2108.12409' },
              {
                label: 'EleutherAI — Rotary Embeddings: A Relative Revolution',
                url: 'https://blog.eleuther.ai/rotary-embeddings/',
              },
            ],
          },
          {
            label: 'Survey',
            links: [
              {
                label: 'Lilian Weng — Transformer Family v2',
                url: 'https://lilianweng.github.io/posts/2023-01-27-the-transformer-family-v2/',
              },
            ],
          },
        ],
      },
      {
        id: '3-6',
        title: '3.6 Deep Learning Optimization',
        hours: '~8–12h',
        primary: [
          {
            label: 'Goodfellow et al. — Deep Learning Ch 8',
            url: 'https://www.deeplearningbook.org/contents/optimization.html',
          },
        ],
        fallbacks: [
          {
            label: 'Optimizer papers',
            links: [
              { label: 'Adam — arXiv:1412.6980', url: 'https://arxiv.org/abs/1412.6980' },
              { label: 'AdamW — arXiv:1711.05101', url: 'https://arxiv.org/abs/1711.05101' },
              { label: 'Lion — arXiv:2302.06675', url: 'https://arxiv.org/abs/2302.06675' },
              { label: 'Adafactor — arXiv:1804.04235', url: 'https://arxiv.org/abs/1804.04235' },
              { label: 'SGDR/cosine — arXiv:1608.03983', url: 'https://arxiv.org/abs/1608.03983' },
            ],
          },
          {
            label: 'Practical docs & blogs',
            links: [
              { label: 'PyTorch optimizer docs', url: 'https://docs.pytorch.org/docs/stable/optim.html' },
              {
                label: 'NVIDIA Mixed Precision Training guide',
                url: 'https://docs.nvidia.com/deeplearning/performance/mixed-precision-training/index.html',
              },
              { label: 'Sebastian Raschka — Ahead of AI', url: 'https://magazine.sebastianraschka.com/' },
            ],
          },
        ],
      },
      {
        id: '3-7',
        title: '3.7 Regularization',
        hours: '~6–8h',
        primary: [
          {
            label: 'Goodfellow et al. — Deep Learning Ch 7',
            url: 'https://www.deeplearningbook.org/contents/regularization.html',
          },
        ],
        fallbacks: [
          {
            label: 'Regularization papers',
            links: [
              { label: 'Dropout (Srivastava JMLR 2014)', url: 'https://jmlr.org/papers/v15/srivastava14a.html' },
              { label: 'BatchNorm — arXiv:1502.03167', url: 'https://arxiv.org/abs/1502.03167' },
              { label: 'LayerNorm — arXiv:1607.06450', url: 'https://arxiv.org/abs/1607.06450' },
              { label: 'RMSNorm — arXiv:1910.07467', url: 'https://arxiv.org/abs/1910.07467' },
              { label: 'Stochastic Depth — arXiv:1603.09382', url: 'https://arxiv.org/abs/1603.09382' },
              { label: 'Mixup — arXiv:1710.09412', url: 'https://arxiv.org/abs/1710.09412' },
              { label: 'CutMix — arXiv:1905.04899', url: 'https://arxiv.org/abs/1905.04899' },
              { label: 'RandAugment — arXiv:1909.13719', url: 'https://arxiv.org/abs/1909.13719' },
            ],
          },
          {
            label: 'Prince — UDL Ch 9',
            links: [{ label: 'UDL book site', url: 'https://udlbook.github.io/udlbook/' }],
          },
        ],
      },
    ],
  },
  {
    id: 'track-4',
    title: 'Track 4: LLMs, Agents & Frontier AI',
    topics: [
      {
        id: '4-1',
        title: '4.1 Tokenization',
        hours: '~6–8h',
        focus:
          'BPE walkthrough → regex splitting (GPT-2/4) → tiktoken comparison → special-token footguns → SentencePiece intro. Do exercise.md (4-step GPT-4 tokenizer build).',
        primary: [
          {
            label: "Karpathy — Let's build the GPT Tokenizer (2h14m)",
            url: 'https://www.youtube.com/watch?v=zduSFxRajkE',
          },
          { label: 'karpathy/minbpe', url: 'https://github.com/karpathy/minbpe' },
        ],
        fallbacks: [
          {
            label: 'HuggingFace LLM Course Ch 6',
            links: [{ label: 'HF LLM Course Ch 6', url: 'https://huggingface.co/learn/llm-course/en/chapter6/1' }],
          },
          {
            label: 'CS336 Lecture 1',
            links: [{ label: 'CS336 Lec 1', url: 'https://www.youtube.com/watch?v=SQ3fZ1sAqXI' }],
          },
        ],
      },
      {
        id: '4-2',
        title: '4.2 Pretraining & Scaling Laws',
        hours: '~20–25h',
        focus:
          'Assignments A1 (BPE + Transformer + Adam from primitives), A3 (fit scaling laws), A4 (CommonCrawl pipeline).',
        primary: [
          {
            label: 'Stanford CS336 — Language Modeling from Scratch',
            url: 'https://stanford-cs336.github.io/spring2025/',
          },
          { label: 'CS336 mirror', url: 'https://cs336.stanford.edu/' },
          {
            label: 'CS336 YouTube playlist',
            url: 'https://www.youtube.com/playlist?list=PLoROMvodv4rOY23Y0BoGoBGgQ1zmU_MT_',
          },
        ],
        fallbacks: [
          {
            label: "Karpathy — Let's reproduce GPT-2 (124M) (4h)",
            links: [
              { label: 'YouTube: l8pRSuU81PU', url: 'https://www.youtube.com/watch?v=l8pRSuU81PU' },
              { label: 'karpathy/build-nanogpt', url: 'https://github.com/karpathy/build-nanogpt' },
            ],
          },
          {
            label: 'Scaling-law papers',
            links: [
              { label: 'Kaplan — arXiv:2001.08361', url: 'https://arxiv.org/abs/2001.08361' },
              { label: 'Chinchilla — arXiv:2203.15556', url: 'https://arxiv.org/abs/2203.15556' },
            ],
          },
        ],
      },
      {
        id: '4-3',
        title: '4.3 Post-Training (SFT/RLHF/DPO)',
        hours: '~15–20h',
        focus:
          'Pair each RLHF-book chapter with matching TRL trainer: SFT, reward modeling, PPO, DPO variants, KTO, ORPO, GRPO, Constitutional AI.',
        primary: [
          { label: 'Nathan Lambert — RLHF Book', url: 'https://rlhfbook.com' },
          { label: 'RLHF Book arXiv (v8, Apr 2026)', url: 'https://arxiv.org/abs/2504.12501' },
          { label: 'HuggingFace TRL docs', url: 'https://huggingface.co/docs/trl/en/index' },
          { label: 'TRL — DPO trainer', url: 'https://huggingface.co/docs/trl/en/dpo_trainer' },
        ],
        fallbacks: [
          {
            label: 'Chip Huyen — RLHF blog (3-phase narrative)',
            links: [{ label: 'huyenchip.com/2023/05/02/rlhf', url: 'https://huyenchip.com/2023/05/02/rlhf.html' }],
          },
          {
            label: 'Umar Jamil — DPO lecture',
            links: [{ label: 'YouTube: hvGa5Mba4c8', url: 'https://www.youtube.com/watch?v=hvGa5Mba4c8' }],
          },
        ],
      },
      {
        id: '4-4',
        title: '4.4 LLM Inference Optimization',
        hours: '~12–15h',
        primary: [
          {
            label: 'Lilian Weng — Large Transformer Model Inference Optimization',
            url: 'https://lilianweng.github.io/posts/2023-01-10-inference-optimization/',
          },
          { label: 'vLLM docs', url: 'https://docs.vllm.ai/en/latest/' },
          { label: 'vLLM — PagedAttention design', url: 'https://docs.vllm.ai/en/latest/design/paged_attention/' },
        ],
        fallbacks: [
          {
            label: 'GPU MODE FlashAttention lectures',
            links: [
              { label: 'GPU MODE L12 FlashAttention', url: 'https://www.youtube.com/watch?v=zEuwuCTEf_0' },
              { label: 'GPU MODE L36 FA3 (Jay Shah)', url: 'https://www.youtube.com/watch?v=JwUcZwPOCpA' },
            ],
          },
          {
            label: 'FlashAttention + PagedAttention papers',
            links: [
              { label: 'FA1 — arXiv:2205.14135', url: 'https://arxiv.org/abs/2205.14135' },
              { label: 'FA2 — arXiv:2307.08691', url: 'https://arxiv.org/abs/2307.08691' },
              { label: 'FA3 — arXiv:2407.08608', url: 'https://arxiv.org/abs/2407.08608' },
              { label: 'PagedAttention — arXiv:2309.06180', url: 'https://arxiv.org/abs/2309.06180' },
            ],
          },
        ],
      },
      {
        id: '4-5',
        title: '4.5 Prompt Engineering & ICL',
        hours: '~6–8h',
        primary: [
          {
            label: 'Lilian Weng — Prompt Engineering',
            url: 'https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/',
          },
          {
            label: 'Anthropic Interactive Prompt-Eng Tutorial',
            url: 'https://github.com/anthropics/prompt-eng-interactive-tutorial',
          },
        ],
        fallbacks: [
          {
            label: 'The Prompt Report (Schulhoff 2024)',
            links: [{ label: 'arXiv:2406.06608', url: 'https://arxiv.org/abs/2406.06608' }],
          },
          {
            label: 'learnprompting.org',
            links: [{ label: 'learnprompting.org/docs/intro', url: 'https://learnprompting.org/docs/intro' }],
          },
        ],
      },
      {
        id: '4-6',
        title: '4.6 Agents',
        hours: '~15–20h',
        concept:
          'LLM-driven systems that plan → call tools → observe → iterate (ReAct), with memory, multi-agent orchestration, and eval harnesses.',
        why: 'Agentic systems are the dominant product pattern at frontier labs in 2026.',
        focus:
          'Unit 1 (fundamentals), Unit 2 (smolagents/LangChain/LlamaIndex), Unit 3 (use cases), Unit 4 (GAIA benchmark final project).',
        primary: [
          {
            label: 'HuggingFace Agents Course',
            url: 'https://huggingface.co/learn/agents-course/unit0/introduction',
          },
        ],
        fallbacks: [
          {
            label: 'Lilian Weng — LLM Powered Autonomous Agents',
            links: [
              {
                label: 'lilianweng.github.io/posts/2023-06-23-agent',
                url: 'https://lilianweng.github.io/posts/2023-06-23-agent/',
              },
            ],
          },
          {
            label: 'Anthropic — Building Effective Agents',
            links: [
              {
                label: 'anthropic.com/engineering/building-effective-agents',
                url: 'https://www.anthropic.com/engineering/building-effective-agents',
              },
            ],
          },
        ],
      },
      {
        id: '4-7',
        title: '4.7 Retrieval-Augmented Generation',
        hours: '~15h',
        primary: [
          { label: 'Original RAG paper (Lewis 2020) — arXiv:2005.11401', url: 'https://arxiv.org/abs/2005.11401' },
          { label: 'Jay Alammar — jalammar.github.io', url: 'https://jalammar.github.io/' },
          { label: 'Qdrant docs', url: 'https://qdrant.tech/documentation/' },
        ],
        extras: [
          {
            label: 'Pair concepts',
            links: [
              {
                label: 'HF — Getting started with embeddings',
                url: 'https://huggingface.co/blog/getting-started-with-embeddings',
              },
              { label: 'sentence-transformers (SBERT)', url: 'https://sbert.net/' },
              { label: 'RAGAS docs', url: 'https://docs.ragas.io/' },
            ],
          },
        ],
        fallbacks: [
          {
            label: 'Pinecone Learn hub',
            links: [{ label: 'pinecone.io/learn', url: 'https://www.pinecone.io/learn/' }],
          },
          {
            label: 'HF NLP Course — semantic search',
            links: [{ label: 'HF NLP Course Ch 5', url: 'https://huggingface.co/learn/nlp-course/chapter5/' }],
          },
        ],
      },
      {
        id: '4-8',
        title: '4.8 Evals & Alignment',
        hours: '~10h',
        primary: [
          { label: 'Chip Huyen — GenAI platform eval', url: 'https://huyenchip.com/2024/07/25/genai-platform.html' },
          { label: 'Chip Huyen — RLHF (alignment context)', url: 'https://huyenchip.com/2023/05/02/rlhf.html' },
          {
            label: 'EleutherAI — lm-evaluation-harness',
            url: 'https://github.com/EleutherAI/lm-evaluation-harness',
          },
        ],
        fallbacks: [
          {
            label: 'HuggingFace — Evaluation Guidebook',
            links: [{ label: 'huggingface/evaluation-guidebook', url: 'https://github.com/huggingface/evaluation-guidebook' }],
          },
          {
            label: 'LMSYS Arena writeups',
            links: [{ label: 'lmsys.org/blog', url: 'https://lmsys.org/blog/' }],
          },
        ],
      },
      {
        id: '4-9',
        title: '4.9 Multimodal Models',
        hours: '~20h',
        focus:
          'HF course: DDPM intuition, Stable Diffusion, fine-tuning; Weng: full math DDPM → score-matching → LDM → guidance.',
        primary: [
          { label: 'HuggingFace Diffusion Course', url: 'https://huggingface.co/learn/diffusion-course/unit0/1' },
          {
            label: 'Lilian Weng — What are Diffusion Models?',
            url: 'https://lilianweng.github.io/posts/2021-07-11-diffusion-models/',
          },
        ],
        fallbacks: [
          {
            label: 'Umar Jamil — Coding Stable Diffusion from scratch',
            links: [
              { label: 'YouTube: ZBKpAp_6TGI', url: 'https://youtu.be/ZBKpAp_6TGI' },
              { label: 'hkproj/pytorch-stable-diffusion', url: 'https://github.com/hkproj/pytorch-stable-diffusion' },
            ],
          },
          {
            label: 'Sander Dieleman + core multimodal papers',
            links: [
              { label: 'sander.ai', url: 'https://sander.ai/' },
              { label: 'CLIP — arXiv:2103.00020', url: 'https://arxiv.org/abs/2103.00020' },
              { label: 'LLaVA — arXiv:2304.08485', url: 'https://arxiv.org/abs/2304.08485' },
              { label: 'Flamingo — arXiv:2204.14198', url: 'https://arxiv.org/abs/2204.14198' },
              { label: 'DDPM — arXiv:2006.11239', url: 'https://arxiv.org/abs/2006.11239' },
              { label: 'LDM — arXiv:2112.10752', url: 'https://arxiv.org/abs/2112.10752' },
              { label: 'DiT — arXiv:2212.09748', url: 'https://arxiv.org/abs/2212.09748' },
            ],
          },
        ],
      },
      {
        id: '4-10',
        title: '4.10 Fine-Tuning Techniques',
        hours: '~10–12h',
        focus:
          'PEFT: LoRA, QLoRA, prefix-tuning, prompt-tuning, IA³, adapters. Raschka: hyperparameter ablations, rank choice, target modules.',
        primary: [
          { label: 'HuggingFace PEFT docs', url: 'https://huggingface.co/docs/peft' },
          {
            label: 'Raschka — Practical Tips for Finetuning LLMs Using LoRA',
            url: 'https://magazine.sebastianraschka.com/p/practical-tips-for-finetuning-llms',
          },
        ],
        fallbacks: [
          {
            label: 'Unsloth documentation',
            links: [{ label: 'docs.unsloth.ai', url: 'https://docs.unsloth.ai/' }],
          },
          {
            label: 'Umar Jamil LoRA + QLoRA paper',
            links: [
              { label: 'Umar Jamil — LoRA video', url: 'https://www.youtube.com/watch?v=PXWYUTMt-AU' },
              { label: 'QLoRA — arXiv:2305.14314', url: 'https://arxiv.org/abs/2305.14314' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'track-5',
    title: 'Track 5: ML Systems, MLOps & GPU Programming',
    topics: [
      {
        id: '5-1',
        title: '5.1 GPU Programming',
        hours: '~40–60h',
        focus:
          'L1 (load_inline, Nsight Compute), L2–4 (PMPP CUDA fundamentals), L8 (optimization), L12 (FlashAttention), L14 (Triton), L7 (quantization kernels), L13 (ring attention).',
        primary: [
          { label: 'GPU MODE lectures (GitHub)', url: 'https://github.com/gpu-mode/lectures' },
          { label: 'GPU MODE YouTube', url: 'https://www.youtube.com/@GPUMODE' },
          {
            label: 'NVIDIA CUDA C++ Programming Guide',
            url: 'https://docs.nvidia.com/cuda/cuda-programming-guide/index.html',
          },
        ],
        fallbacks: [
          {
            label: 'Simon Boehm — How to Optimize a CUDA Matmul Kernel',
            links: [
              { label: 'siboehm.com/articles/22/CUDA-MMM', url: 'https://siboehm.com/articles/22/CUDA-MMM' },
              { label: 'siboehm/SGEMM_CUDA', url: 'https://github.com/siboehm/SGEMM_CUDA' },
            ],
          },
          {
            label: 'GPU MODE resource stream',
            links: [{ label: 'gpu-mode/resource-stream', url: 'https://github.com/gpu-mode/resource-stream' }],
          },
        ],
      },
      {
        id: '5-2',
        title: '5.2 Distributed Training',
        hours: '~50–70h',
        focus:
          'Memory decomposition, DP→ZeRO math, TP AllReduce limits, sequence/context parallel, pipeline schedules (1F1B/ZB), EP for MoE, 5D parallelism, overlap (Domino), MFU heatmaps.',
        primary: [
          { label: 'HF Ultra-Scale Playbook (Space)', url: 'https://huggingface.co/spaces/nanotron/ultrascale-playbook' },
          {
            label: 'Ultra-Scale Playbook PDF',
            url: 'https://huggingface.co/spaces/nanotron/ultrascale-playbook/blob/main/The_Ultra-Scale_Playbook_Training_LLMs_on_GPU_Clusters.pdf',
          },
          {
            label: 'PyTorch FSDP2 tutorial',
            url: 'https://docs.pytorch.org/tutorials/intermediate/FSDP_tutorial.html',
          },
        ],
        fallbacks: [
          {
            label: 'Stas Bekman — ML Engineering open book',
            links: [
              { label: 'stas00/ml-engineering (repo)', url: 'https://github.com/stas00/ml-engineering' },
              { label: 'ML Engineering book (PDF)', url: 'https://huggingface.co/stas/ml-engineering-book' },
            ],
          },
          {
            label: 'Lilian Weng — How to Train Really Large Models on Many GPUs',
            links: [
              {
                label: 'lilianweng.github.io/posts/2021-09-25-train-large',
                url: 'https://lilianweng.github.io/posts/2021-09-25-train-large/',
              },
            ],
          },
        ],
      },
      {
        id: '5-3',
        title: '5.3 Inference Serving (advanced)',
        hours: '~40–55h',
        focus:
          'vLLM V1 engine, block manager, quantization (FP8/MXFP4/NVFP4/AWQ/GPTQ), attention backends, distributed serving (TP+PP), spec decoding, prefix caching, disaggregated P/D, LoRA.',
        primary: [
          { label: 'vLLM docs', url: 'https://docs.vllm.ai/en/latest/' },
          { label: 'PagedAttention paper — arXiv:2309.06180', url: 'https://arxiv.org/abs/2309.06180' },
          {
            label: 'Anyscale — continuous-batching blog',
            url: 'https://www.anyscale.com/blog/continuous-batching-llm-inference',
          },
        ],
        fallbacks: [
          {
            label: 'TensorRT-LLM docs',
            links: [{ label: 'nvidia.github.io/TensorRT-LLM', url: 'https://nvidia.github.io/TensorRT-LLM/' }],
          },
          {
            label: 'HF TGI architecture (maintenance mode) + Triton Inference Server',
            links: [
              {
                label: 'HF TGI — architecture',
                url: 'https://huggingface.co/docs/text-generation-inference/architecture',
              },
              { label: 'triton-inference-server/server', url: 'https://github.com/triton-inference-server/server' },
            ],
          },
        ],
      },
      {
        id: '5-4',
        title: '5.4 Ray & Distributed Compute',
        hours: '~20–30h',
        focus: 'Tasks/actors/objects → placement groups → Ray Train → Ray Serve → Ray Tune → Ray Data.',
        primary: [
          { label: 'Ray Core Walkthrough', url: 'https://docs.ray.io/en/latest/ray-core/walkthrough.html' },
          {
            label: 'Ray Core — gentle walkthrough',
            url: 'https://docs.ray.io/en/latest/ray-core/examples/gentle_walkthrough.html',
          },
        ],
        fallbacks: [
          {
            label: 'Made With ML (Ray-native end-to-end)',
            links: [{ label: 'madewithml.com/courses/mlops', url: 'https://madewithml.com/courses/mlops/' }],
          },
          {
            label: 'Anyscale batch inference docs',
            links: [
              {
                label: 'Anyscale LLM batch inference basics',
                url: 'https://docs.anyscale.com/llm/batch-inference/llm-batch-inference-basics',
              },
            ],
          },
        ],
      },
      {
        id: '5-5',
        title: '5.5 MLOps',
        hours: '~30–45h',
        focus:
          'Design → Data (Ray) → Model (MLflow, Ray Tune, Ray Serve) → Dev/CLI → Test (Great Expectations) → Reproducibility → Production (CI/CD, monitoring).',
        primary: [
          { label: 'Made With ML', url: 'https://madewithml.com/' },
          { label: 'GokuMohandas/Made-With-ML', url: 'https://github.com/GokuMohandas/Made-With-ML' },
          { label: 'Chip Huyen — MLOps hub', url: 'https://huyenchip.com/mlops/' },
          { label: 'Chip Huyen — MLOps v2', url: 'https://huyenchip.com/2020/12/30/mlops-v2.html' },
          { label: 'Chip Huyen — blog', url: 'https://huyenchip.com/blog/' },
        ],
        fallbacks: [
          {
            label: 'MLflow + DVC',
            links: [
              { label: 'MLflow docs', url: 'https://mlflow.org/docs/latest/index.html' },
              { label: 'DVC docs', url: 'https://dvc.org/doc' },
            ],
          },
          {
            label: 'Evidently AI (monitoring/drift)',
            links: [{ label: 'Evidently docs', url: 'https://docs.evidentlyai.com/' }],
          },
        ],
      },
    ],
  },
  {
    id: 'track-5-5',
    title: 'Track 5.5: Efficient ML — Highest Leverage Area',
    blurb:
      "Song Han's lab produced AWQ and SmoothQuant — both shipping in TensorRT-LLM — so MIT 6.5940 is the direct line from course to shipping code.",
    topics: [
      {
        id: '5-5-1',
        title: '5.5.1 MIT 6.5940 TinyML & Efficient DL Computing (Song Han) — centerpiece',
        hours: '~80–120h',
        focus:
          'L3–4 Pruning/Sparsity · L5–6 Quantization (PTQ, QAT, SmoothQuant, AWQ) · L7–8 NAS (Once-for-All) · L9 KD · L10 MCUNet/TinyML · L12 Transformer & LLM · L14 LLM Post-Training Deployment · L15 Long-Context LLM (StreamingLLM) · L18 Diffusion Acceleration · L21 On-device Training.',
        primary: [
          { label: 'MIT 6.5940 Fall 2024 syllabus', url: 'https://hanlab.mit.edu/courses/2024-fall-65940' },
          { label: 'efficientml.ai slides portal', url: 'https://efficientml.ai' },
          {
            label: 'MIT 6.5940 Fall 2024 YouTube (40 videos)',
            url: 'https://www.youtube.com/playlist?list=PL80kAHvQbh-qGtNc54A6KW4i4bkTPjiRF',
          },
        ],
        fallbacks: [
          {
            label: 'Fall 2023 fallback',
            links: [
              { label: '2023 Fall syllabus', url: 'https://hanlab.mit.edu/courses/2023-fall-65940' },
              {
                label: '2023 YouTube playlist',
                url: 'https://www.youtube.com/playlist?list=PL80kAHvQbh-pT4lCkDT53zT8DKmhE0idB',
              },
            ],
          },
          {
            label: 'Labs solutions reference',
            links: [{ label: 'yifanlu0227/MIT-6.5940', url: 'https://github.com/yifanlu0227/MIT-6.5940' }],
          },
        ],
      },
      {
        id: '5-5-2',
        title: '5.5.2 Quantization Deep Dive',
        hours: '~15–20h',
        primary: [
          {
            label: 'MIT 6.5940 L5/L6/L14 (Fall 2024 playlist)',
            url: 'https://www.youtube.com/playlist?list=PL80kAHvQbh-qGtNc54A6KW4i4bkTPjiRF',
          },
        ],
        extras: [
          {
            label: 'Core papers',
            links: [
              { label: 'GPTQ — arXiv:2210.17323', url: 'https://arxiv.org/abs/2210.17323' },
              { label: 'AWQ — arXiv:2306.00978', url: 'https://arxiv.org/abs/2306.00978' },
              { label: 'SmoothQuant — arXiv:2211.10438', url: 'https://arxiv.org/abs/2211.10438' },
              { label: 'LLM.int8 — arXiv:2208.07339', url: 'https://arxiv.org/abs/2208.07339' },
            ],
          },
          {
            label: 'Practical tooling',
            links: [
              { label: 'PyTorch quantization', url: 'https://pytorch.org/docs/stable/quantization.html' },
              {
                label: 'bitsandbytes',
                url: 'https://github.com/bitsandbytes-foundation/bitsandbytes',
              },
              {
                label: 'HF × bitsandbytes integration',
                url: 'https://huggingface.co/blog/hf-bitsandbytes-integration',
              },
              { label: 'HF 4-bit QLoRA blog', url: 'https://huggingface.co/blog/4bit-transformers-bitsandbytes' },
            ],
          },
        ],
        fallbacks: [
          {
            label: 'Maarten Grootendorst — Visual Guide to Quantization',
            links: [
              {
                label: 'newsletter.maartengrootendorst.com',
                url: 'https://newsletter.maartengrootendorst.com/p/a-visual-guide-to-quantization',
              },
            ],
          },
          {
            label: 'Tim Dettmers — LLM.int8() and Emergent Features',
            links: [
              {
                label: 'timdettmers.com/2022/08/17/llm-int8',
                url: 'https://timdettmers.com/2022/08/17/llm-int8-and-emergent-features/',
              },
            ],
          },
        ],
      },
      {
        id: '5-5-3',
        title: '5.5.3 Pruning & Sparsity',
        hours: '~10–15h',
        primary: [
          {
            label: 'MIT 6.5940 L3–4, L14',
            url: 'https://www.youtube.com/playlist?list=PL80kAHvQbh-qGtNc54A6KW4i4bkTPjiRF',
          },
        ],
        extras: [
          {
            label: 'Papers',
            links: [
              { label: 'Lottery Ticket — arXiv:1803.03635', url: 'https://arxiv.org/abs/1803.03635' },
              { label: 'Movement — arXiv:2005.07683', url: 'https://arxiv.org/abs/2005.07683' },
              { label: 'Wanda — arXiv:2306.11695', url: 'https://arxiv.org/abs/2306.11695' },
              { label: 'SparseGPT — arXiv:2301.00774', url: 'https://arxiv.org/abs/2301.00774' },
              { label: 'Deep Compression — arXiv:1510.00149', url: 'https://arxiv.org/abs/1510.00149' },
            ],
          },
        ],
        fallbacks: [
          {
            label: 'Hoefler et al. — Sparsity in Deep Learning survey',
            links: [{ label: 'arXiv:2102.00554', url: 'https://arxiv.org/abs/2102.00554' }],
          },
          {
            label: 'NVIDIA Ampere 2:4 sparsity',
            links: [
              {
                label: 'developer.nvidia.com sparsity blog',
                url: 'https://developer.nvidia.com/blog/accelerating-inference-with-sparsity-using-ampere-and-tensorrt/',
              },
            ],
          },
        ],
      },
      {
        id: '5-5-4',
        title: '5.5.4 Knowledge Distillation',
        hours: '~6–10h',
        primary: [
          {
            label: 'MIT 6.5940 L9 (Fall 2023 equivalent)',
            url: 'https://www.youtube.com/watch?v=EkjVHToId7U',
          },
        ],
        extras: [
          {
            label: 'Papers (in order)',
            links: [
              { label: 'Hinton KD — arXiv:1503.02531', url: 'https://arxiv.org/abs/1503.02531' },
              { label: 'DistilBERT — arXiv:1910.01108', url: 'https://arxiv.org/abs/1910.01108' },
              { label: 'MiniLM — arXiv:2002.10957', url: 'https://arxiv.org/abs/2002.10957' },
              { label: 'MiniLLM (reverse KL) — arXiv:2306.08543', url: 'https://arxiv.org/abs/2306.08543' },
            ],
          },
        ],
      },
      {
        id: '5-5-5',
        title: '5.5.5 Neural Architecture Search',
        hours: '~8–12h',
        primary: [
          {
            label: 'MIT 6.5940 L7–8',
            url: 'https://www.youtube.com/playlist?list=PL80kAHvQbh-qGtNc54A6KW4i4bkTPjiRF',
          },
          { label: 'Fall 2023 NAS II', url: 'https://www.youtube.com/watch?v=MOMc8KkGwCc' },
        ],
        extras: [
          {
            label: 'Papers',
            links: [
              { label: 'DARTS — arXiv:1806.09055', url: 'https://arxiv.org/abs/1806.09055' },
              { label: 'Once-for-All — arXiv:1908.09791', url: 'https://arxiv.org/abs/1908.09791' },
              { label: 'ProxylessNAS — arXiv:1812.00332', url: 'https://arxiv.org/abs/1812.00332' },
            ],
          },
        ],
      },
      {
        id: '5-5-6',
        title: '5.5.6 Running Large Models on Limited Hardware',
        hours: '~15–20h hands-on',
        primary: [
          { label: 'llama.cpp', url: 'https://github.com/ggml-org/llama.cpp' },
          {
            label: 'HF — Efficient training on a single GPU',
            url: 'https://huggingface.co/docs/transformers/perf_train_gpu_one',
          },
          {
            label: 'HF Accelerate — big-model',
            url: 'https://huggingface.co/docs/accelerate/usage_guides/big_modeling',
          },
        ],
        extras: [
          {
            label: 'Related tools',
            links: [
              { label: 'ExLlamaV2', url: 'https://github.com/turboderp/exllamav2' },
              { label: 'vLLM', url: 'https://github.com/vllm-project/vllm' },
              { label: 'TensorRT-LLM', url: 'https://github.com/NVIDIA/TensorRT-LLM' },
              { label: 'ONNX Runtime', url: 'https://onnxruntime.ai' },
              { label: 'LiteRT', url: 'https://ai.google.dev/edge/litert' },
              { label: 'Core ML', url: 'https://developer.apple.com/documentation/coreml' },
            ],
          },
        ],
        fallbacks: [
          {
            label: 'MIT 6.5940 L14 Llama-2-7B deployment walkthrough',
            links: [
              {
                label: 'MIT 6.5940 Fall 2024 playlist',
                url: 'https://www.youtube.com/playlist?list=PL80kAHvQbh-qGtNc54A6KW4i4bkTPjiRF',
              },
            ],
          },
        ],
      },
      {
        id: '5-5-7',
        title: '5.5.7 Complementary Efficient-ML Courses',
        primary: [
          { label: 'Stanford CS217 Hardware Accelerators for ML (Olukotun)', url: 'https://cs217.stanford.edu/' },
          { label: 'CMU 15-849 ML Systems (Zhihao Jia)', url: 'https://www.cs.cmu.edu/~zhihaoj2/15-849/' },
          { label: 'CMU 10-414/714 Deep Learning Systems (Chen & Kolter)', url: 'https://dlsyscourse.org/' },
          { label: 'CMU 11-767 On-Device ML (Strubell)', url: 'https://strubell.github.io/teaching/11-767/' },
        ],
      },
    ],
  },
  {
    id: 'track-6',
    title: 'Track 6: Interview & Career',
    topics: [
      {
        id: '6-1',
        title: '6.1 LeetCode / DSA',
        hours: '~150–200h',
        primary: [
          { label: 'NeetCode Roadmap', url: 'https://neetcode.io/roadmap' },
          { label: 'NeetCode 150 practice list', url: 'https://neetcode.io/practice/practice/neetcode150' },
          { label: 'NeetCode YouTube', url: 'https://www.youtube.com/@NeetCode' },
        ],
        fallbacks: [
          {
            label: 'Grind 75 / Blind 75',
            links: [{ label: 'techinterviewhandbook — Grind 75', url: 'https://www.techinterviewhandbook.org/grind75/' }],
          },
          {
            label: 'CP-Algorithms (advanced)',
            links: [{ label: 'cp-algorithms.com', url: 'https://cp-algorithms.com/' }],
          },
        ],
      },
      {
        id: '6-2',
        title: '6.2 System Design (General)',
        hours: '~60–80h',
        primary: [
          { label: 'donnemartin/system-design-primer', url: 'https://github.com/donnemartin/system-design-primer' },
        ],
        fallbacks: [
          {
            label: 'ByteByteGo YouTube',
            links: [{ label: 'youtube.com/@ByteByteGo', url: 'https://www.youtube.com/@ByteByteGo' }],
          },
          {
            label: 'alex-xu-system — curated primary sources',
            links: [
              {
                label: 'alex-xu-system/bytebytego — system_design_links',
                url: 'https://github.com/alex-xu-system/bytebytego/blob/main/system_design_links.md',
              },
            ],
          },
        ],
      },
      {
        id: '6-3',
        title: '6.3 ML System Design',
        hours: '~80–100h (the defining interview round)',
        primary: [
          { label: 'Chip Huyen — ML Systems Design booklet', url: 'https://huyenchip.com/machine-learning-systems-design/toc.html' },
          { label: 'Chip Huyen — Intro to ML Interviews book', url: 'https://huyenchip.com/ml-interviews-book/' },
          { label: 'Eugene Yan — writing', url: 'https://eugeneyan.com/writing/' },
          { label: 'Eugene Yan — system design for discovery', url: 'https://eugeneyan.com/writing/system-design-for-discovery/' },
          { label: 'Eugene Yan — real-time recommendations', url: 'https://eugeneyan.com/writing/real-time-recommendations/' },
          { label: 'Eugene Yan — llm-patterns', url: 'https://eugeneyan.com/writing/llm-patterns/' },
          { label: 'applied-llms.org', url: 'https://applied-llms.org' },
        ],
        fallbacks: [
          {
            label: 'eugeneyan/applied-ml curated industry papers',
            links: [{ label: 'eugeneyan/applied-ml', url: 'https://github.com/eugeneyan/applied-ml' }],
          },
          {
            label: 'Stanford CS329S',
            links: [{ label: 'stanford-cs329s.github.io', url: 'https://stanford-cs329s.github.io/' }],
          },
        ],
      },
      {
        id: '6-4',
        title: '6.4 Behavioral & Career',
        hours: '~30–40h',
        primary: [
          { label: 'patio11 — Salary Negotiation', url: 'https://www.kalzumeus.com/2012/01/23/salary-negotiation/' },
          { label: 'Amazon STAR interview guide', url: 'https://amazon.jobs/content/en/how-we-hire/interview-loop' },
        ],
        fallbacks: [
          {
            label: 'Rands in Repose',
            links: [{ label: 'randsinrepose.com', url: 'https://randsinrepose.com/' }],
          },
          {
            label: 'Pragmatic Engineer (free tier)',
            links: [
              { label: 'newsletter.pragmaticengineer.com', url: 'https://newsletter.pragmaticengineer.com/' },
              { label: 'blog.pragmaticengineer.com', url: 'https://blog.pragmaticengineer.com/' },
            ],
          },
        ],
      },
    ],
  },
];

export const weeks: Week[] = [
  {
    n: 1,
    title: 'Rebuild intuition from first principles',
    items: [
      'Karpathy micrograd end-to-end, one notebook, one weekend',
      '3Blue1Brown Essence of Linear Algebra all 15 videos',
    ],
    links: [
      { label: 'Karpathy — Building micrograd', url: 'https://youtu.be/VMj-3S1tku0' },
      {
        label: '3Blue1Brown — Essence of Linear Algebra',
        url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab',
      },
    ],
    deliverable: 'Your own micrograd fork with a 2-layer MLP trained on MNIST.',
  },
  {
    n: 2,
    title: 'Transformer from scratch',
    items: ["Karpathy Let's build GPT + nanoGPT", 'Annotated Transformer'],
    links: [
      { label: "Karpathy — Let's build GPT", url: 'https://www.youtube.com/watch?v=kCc8FmEb1nY' },
      { label: 'Annotated Transformer', url: 'https://nlp.seas.harvard.edu/annotated-transformer/' },
    ],
    deliverable: 'Tiny Shakespeare char-GPT + blog post walking a colleague through multi-head attention.',
  },
  {
    n: 3,
    title: 'Tokenization + GPT-2 reproduction kickoff',
    items: [
      'Karpathy GPT Tokenizer + minbpe exercise.md',
      'Start Karpathy Reproduce GPT-2 (124M)',
    ],
    links: [
      { label: 'Karpathy — GPT Tokenizer', url: 'https://youtu.be/zduSFxRajkE' },
      { label: "Karpathy — Let's reproduce GPT-2 (124M)", url: 'https://www.youtube.com/watch?v=l8pRSuU81PU' },
    ],
    deliverable: 'A GPT-4-compatible BPE tokenizer you wrote.',
  },
  {
    n: 4,
    title: "Finish GPT-2 + Lilian Weng's Transformer Family v2",
    items: ['Complete GPT-2 124M reproduction on a cloud GPU (a single A100 for a day or two)', 'Read Transformer Family v2 end-to-end'],
    links: [
      {
        label: 'Lilian Weng — Transformer Family v2',
        url: 'https://lilianweng.github.io/posts/2023-01-27-the-transformer-family-v2/',
      },
    ],
    deliverable: 'Loss curve + eval numbers pushed to GitHub.',
  },
  {
    n: 5,
    title: 'Efficient ML I: Quantization',
    items: [
      'MIT 6.5940 L5, L6, L14',
      'Maarten Grootendorst Visual Guide + Tim Dettmers LLM.int8 post',
    ],
    links: [
      {
        label: 'MIT 6.5940 Fall 2024 playlist',
        url: 'https://www.youtube.com/playlist?list=PL80kAHvQbh-qGtNc54A6KW4i4bkTPjiRF',
      },
      {
        label: 'Maarten Grootendorst — Visual Guide to Quantization',
        url: 'https://newsletter.maartengrootendorst.com/p/a-visual-guide-to-quantization',
      },
      {
        label: 'Tim Dettmers — LLM.int8 post',
        url: 'https://timdettmers.com/2022/08/17/llm-int8-and-emergent-features/',
      },
    ],
    deliverable: 'Quantize a 7B model with AWQ via TensorRT-LLM and benchmark vs FP16 on your own Triton stack.',
  },
  {
    n: 6,
    title: 'Efficient ML II: Pruning/NAS/KD + Labs',
    items: ['MIT 6.5940 L3, L4, L7, L8, L9 + Lab 4–5 (Llama-2-7B on a laptop)'],
    links: [
      {
        label: 'MIT 6.5940 Fall 2024 playlist',
        url: 'https://www.youtube.com/playlist?list=PL80kAHvQbh-qGtNc54A6KW4i4bkTPjiRF',
      },
    ],
    deliverable: 'Complete MIT Lab 5 deployment + internal doc mapping SmoothQuant/AWQ trade-offs to SMARTi.',
  },
  {
    n: 7,
    title: 'Inference serving, advanced',
    items: [
      'vLLM docs + PagedAttention paper + Anyscale continuous-batching blog',
      'GPU MODE L12 (FlashAttention) + L14 (Triton DSL)',
    ],
    links: [
      { label: 'vLLM docs', url: 'https://docs.vllm.ai/en/latest/' },
      { label: 'PagedAttention — arXiv:2309.06180', url: 'https://arxiv.org/abs/2309.06180' },
      {
        label: 'Anyscale — continuous-batching blog',
        url: 'https://www.anyscale.com/blog/continuous-batching-llm-inference',
      },
      { label: 'GPU MODE YouTube', url: 'https://www.youtube.com/@GPUMODE' },
    ],
    deliverable:
      'Replace one YOLO+Triton ensemble path with a vLLM-backed multimodal prompt path; measure throughput delta.',
  },
  {
    n: 8,
    title: 'Post-training (SFT → DPO)',
    items: ['RLHF Book Ch 1–7 paired with TRL DPO trainer docs', 'Umar Jamil DPO video'],
    links: [
      { label: 'RLHF Book', url: 'https://rlhfbook.com' },
      { label: 'TRL DPO trainer', url: 'https://huggingface.co/docs/trl/en/dpo_trainer' },
      { label: 'Umar Jamil — DPO', url: 'https://www.youtube.com/watch?v=hvGa5Mba4c8' },
    ],
    deliverable: 'SFT + DPO on a 1–3B open model using a curated in-domain preference set.',
  },
  {
    n: 9,
    title: 'LoRA/QLoRA fine-tuning',
    items: ['HF PEFT docs + Raschka LoRA post', 'Unsloth walkthrough for a fast 7B finetune'],
    links: [
      { label: 'HF PEFT docs', url: 'https://huggingface.co/docs/peft' },
      {
        label: 'Raschka — Practical Tips for Finetuning LLMs Using LoRA',
        url: 'https://magazine.sebastianraschka.com/p/practical-tips-for-finetuning-llms',
      },
      { label: 'Unsloth docs', url: 'https://docs.unsloth.ai/' },
    ],
    deliverable: "A QLoRA'd 7B model deployed via Triton+Qdrant for a RAG+LLM use case.",
  },
  {
    n: 10,
    title: 'RAG end-to-end with Qdrant hybrid search',
    items: ['Qdrant advanced docs + RAG paper + Pinecone Learn', 'Lilian Weng RAG/agent posts'],
    links: [
      { label: 'Qdrant docs', url: 'https://qdrant.tech/documentation/' },
      { label: 'RAG paper — arXiv:2005.11401', url: 'https://arxiv.org/abs/2005.11401' },
      { label: 'Pinecone Learn', url: 'https://www.pinecone.io/learn/' },
    ],
    deliverable: 'Hybrid retrieval (BM25 + dense + cross-encoder rerank) on Qdrant + a RAGAS eval harness.',
  },
  {
    n: 11,
    title: 'Agents',
    items: ['HuggingFace Agents Course Units 1–3 + Anthropic Building Effective Agents'],
    links: [
      {
        label: 'HuggingFace Agents Course',
        url: 'https://huggingface.co/learn/agents-course/unit0/introduction',
      },
      {
        label: 'Anthropic — Building Effective Agents',
        url: 'https://www.anthropic.com/engineering/building-effective-agents',
      },
    ],
    deliverable: 'A small agentic system over SMARTi data passing a 30% GAIA-style internal benchmark.',
  },
  {
    n: 12,
    title: 'Evals, interview setup, public artifact',
    items: [
      'lm-evaluation-harness hands-on on your fine-tuned models',
      'Begin NeetCode 150 (patterns + top-50 grinded)',
      'Staff-level SMARTi v2 design doc integrating everything',
    ],
    links: [
      {
        label: 'EleutherAI — lm-evaluation-harness',
        url: 'https://github.com/EleutherAI/lm-evaluation-harness',
      },
      { label: 'NeetCode 150', url: 'https://neetcode.io/practice/practice/neetcode150' },
    ],
    deliverable: 'Public blog post "From CV Platform to Multimodal Agent Stack".',
  },
];

export const papers: Paper[] = [
  { category: 'Transformers & LLMs', title: 'Attention Is All You Need', authors: 'Vaswani', year: '2017', url: 'https://arxiv.org/abs/1706.03762', note: 'The Transformer architecture.' },
  { category: 'Transformers & LLMs', title: 'Improving LU by Generative Pre-Training (GPT-1)', authors: 'Radford', year: '2018', url: 'https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf', note: 'Decoder-only pre-train + fine-tune.' },
  { category: 'Transformers & LLMs', title: 'LMs are Unsupervised Multitask Learners (GPT-2)', authors: 'Radford', year: '2019', url: 'https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf', note: 'Zero-shot emerges from scale.' },
  { category: 'Transformers & LLMs', title: 'LMs are Few-Shot Learners (GPT-3)', authors: 'Brown', year: '2020', url: 'https://arxiv.org/abs/2005.14165', note: 'In-context learning at 175B.' },
  { category: 'Transformers & LLMs', title: 'GPT-4 Technical Report', authors: 'OpenAI', year: '2023', url: 'https://arxiv.org/abs/2303.08774', note: 'Predictable scaling + capability eval.' },
  { category: 'Transformers & LLMs', title: 'PaLM', authors: 'Chowdhery', year: '2022', url: 'https://arxiv.org/abs/2204.02311', note: '540B Pathways training.' },
  { category: 'Transformers & LLMs', title: 'Chinchilla', authors: 'Hoffmann', year: '2022', url: 'https://arxiv.org/abs/2203.15556', note: 'Compute-optimal tokens/params ~1:1.' },
  { category: 'Transformers & LLMs', title: 'LLaMA', authors: 'Touvron', year: '2023', url: 'https://arxiv.org/abs/2302.13971', note: 'Open compute-efficient 7–65B.' },
  { category: 'Transformers & LLMs', title: 'Llama 2', authors: 'Touvron', year: '2023', url: 'https://arxiv.org/abs/2307.09288', note: 'Full RLHF recipe.' },
  { category: 'Transformers & LLMs', title: 'Llama 3 Herd', authors: 'Grattafiori', year: '2024', url: 'https://arxiv.org/abs/2407.21783', note: 'Most detailed public pipeline.' },
  { category: 'Transformers & LLMs', title: 'Mixtral of Experts', authors: 'Jiang', year: '2024', url: 'https://arxiv.org/abs/2401.04088', note: 'Sparse MoE reference.' },
  { category: 'Transformers & LLMs', title: 'DeepSeek-V3', year: '2024', url: 'https://arxiv.org/abs/2412.19437', note: '671B MoE, FP8, MLA, ~$5.6M.' },
  { category: 'Transformers & LLMs', title: 'DeepSeek-R1', year: '2025', url: 'https://arxiv.org/abs/2501.12948', note: 'Pure RL (GRPO) → o1-class reasoning.' },

  { category: 'Efficiency', title: 'FlashAttention', authors: 'Dao', year: '2022', url: 'https://arxiv.org/abs/2205.14135' },
  { category: 'Efficiency', title: 'FlashAttention-2', authors: 'Dao', year: '2023', url: 'https://arxiv.org/abs/2307.08691' },
  { category: 'Efficiency', title: 'FlashAttention-3', authors: 'Shah', year: '2024', url: 'https://arxiv.org/abs/2407.08608' },
  { category: 'Efficiency', title: 'PagedAttention/vLLM', authors: 'Kwon', year: '2023', url: 'https://arxiv.org/abs/2309.06180' },
  { category: 'Efficiency', title: 'GPTQ', authors: 'Frantar', year: '2022', url: 'https://arxiv.org/abs/2210.17323' },
  { category: 'Efficiency', title: 'AWQ', authors: 'Lin', year: '2023', url: 'https://arxiv.org/abs/2306.00978' },
  { category: 'Efficiency', title: 'SmoothQuant', authors: 'Xiao', year: '2022', url: 'https://arxiv.org/abs/2211.10438' },
  { category: 'Efficiency', title: 'LLM.int8()', authors: 'Dettmers', year: '2022', url: 'https://arxiv.org/abs/2208.07339' },
  { category: 'Efficiency', title: 'SparseGPT', authors: 'Frantar', year: '2023', url: 'https://arxiv.org/abs/2301.00774' },
  { category: 'Efficiency', title: 'Lottery Ticket Hypothesis', authors: 'Frankle', year: '2018', url: 'https://arxiv.org/abs/1803.03635' },
  { category: 'Efficiency', title: 'LoRA', authors: 'Hu', year: '2021', url: 'https://arxiv.org/abs/2106.09685' },
  { category: 'Efficiency', title: 'QLoRA', authors: 'Dettmers', year: '2023', url: 'https://arxiv.org/abs/2305.14314' },

  { category: 'Alignment', title: 'InstructGPT', authors: 'Ouyang', year: '2022', url: 'https://arxiv.org/abs/2203.02155' },
  { category: 'Alignment', title: 'Constitutional AI', authors: 'Bai', year: '2022', url: 'https://arxiv.org/abs/2212.08073' },
  { category: 'Alignment', title: 'DPO', authors: 'Rafailov', year: '2023', url: 'https://arxiv.org/abs/2305.18290' },
  { category: 'Alignment', title: 'KTO', authors: 'Ethayarajh', year: '2024', url: 'https://arxiv.org/abs/2402.01306' },
  { category: 'Alignment', title: 'ORPO', authors: 'Hong', year: '2024', url: 'https://arxiv.org/abs/2403.07691' },

  { category: 'RAG', title: 'RAG (original)', authors: 'Lewis', year: '2020', url: 'https://arxiv.org/abs/2005.11401' },
  { category: 'RAG', title: 'DPR', authors: 'Karpukhin', year: '2020', url: 'https://arxiv.org/abs/2004.04906' },
  { category: 'RAG', title: 'Atlas', authors: 'Izacard', year: '2022', url: 'https://arxiv.org/abs/2208.03299' },
  { category: 'RAG', title: 'RETRO', authors: 'Borgeaud', year: '2021', url: 'https://arxiv.org/abs/2112.04426' },

  { category: 'Agents', title: 'ReAct', authors: 'Yao', year: '2022', url: 'https://arxiv.org/abs/2210.03629' },
  { category: 'Agents', title: 'Reflexion', authors: 'Shinn', year: '2023', url: 'https://arxiv.org/abs/2303.11366' },
  { category: 'Agents', title: 'Voyager', authors: 'Wang', year: '2023', url: 'https://arxiv.org/abs/2305.16291' },
  { category: 'Agents', title: 'Toolformer', authors: 'Schick', year: '2023', url: 'https://arxiv.org/abs/2302.04761' },

  { category: 'Multimodal', title: 'CLIP', authors: 'Radford', year: '2021', url: 'https://arxiv.org/abs/2103.00020' },
  { category: 'Multimodal', title: 'Flamingo', authors: 'Alayrac', year: '2022', url: 'https://arxiv.org/abs/2204.14198' },
  { category: 'Multimodal', title: 'LLaVA', authors: 'Liu', year: '2023', url: 'https://arxiv.org/abs/2304.08485' },
  { category: 'Multimodal', title: 'DDPM', authors: 'Ho', year: '2020', url: 'https://arxiv.org/abs/2006.11239' },
  { category: 'Multimodal', title: 'Latent Diffusion / Stable Diffusion', authors: 'Rombach', year: '2021', url: 'https://arxiv.org/abs/2112.10752' },
  { category: 'Multimodal', title: 'DiT', authors: 'Peebles', year: '2022', url: 'https://arxiv.org/abs/2212.09748' },

  { category: 'Computer Vision', title: 'ResNet', authors: 'He', year: '2015', url: 'https://arxiv.org/abs/1512.03385' },
  { category: 'Computer Vision', title: 'ViT', authors: 'Dosovitskiy', year: '2020', url: 'https://arxiv.org/abs/2010.11929' },
  { category: 'Computer Vision', title: 'DINO', authors: 'Caron', year: '2021', url: 'https://arxiv.org/abs/2104.14294' },
  { category: 'Computer Vision', title: 'DINOv2', authors: 'Oquab', year: '2023', url: 'https://arxiv.org/abs/2304.07193' },
  { category: 'Computer Vision', title: 'Segment Anything (SAM)', authors: 'Kirillov', year: '2023', url: 'https://arxiv.org/abs/2304.02643' },
  { category: 'Computer Vision', title: 'YOLOv1', authors: 'Redmon', year: '2015', url: 'https://arxiv.org/abs/1506.02640' },
  { category: 'Computer Vision', title: 'YOLOv10', authors: 'Wang', year: '2024', url: 'https://arxiv.org/abs/2405.14458' },

  { category: 'Scaling Laws', title: 'Kaplan Scaling Laws', year: '2020', url: 'https://arxiv.org/abs/2001.08361' },
  { category: 'Scaling Laws', title: 'Chinchilla (cross-ref)', year: '2022', url: 'https://arxiv.org/abs/2203.15556' },
  { category: 'Scaling Laws', title: 'Emergent Abilities', authors: 'Wei', year: '2022', url: 'https://arxiv.org/abs/2206.07682' },

  { category: 'Classical → DL bridges', title: 'Dropout', authors: 'Srivastava', year: '2014', url: 'https://jmlr.org/papers/v15/srivastava14a.html' },
  { category: 'Classical → DL bridges', title: 'BatchNorm', authors: 'Ioffe', year: '2015', url: 'https://arxiv.org/abs/1502.03167' },
  { category: 'Classical → DL bridges', title: 'LayerNorm', authors: 'Ba', year: '2016', url: 'https://arxiv.org/abs/1607.06450' },
  { category: 'Classical → DL bridges', title: 'Adam', authors: 'Kingma', year: '2014', url: 'https://arxiv.org/abs/1412.6980' },
];

export const universityCourses: UniversityCourses[] = [
  {
    university: 'MIT',
    courses: [
      {
        name: '6.S191 Intro to Deep Learning',
        prof: 'Alexander & Ava Amini, 2024',
        hours: '~10–12h',
        note: '1-week bootcamp',
        links: [
          { label: 'introtodeeplearning.com', url: 'https://introtodeeplearning.com/' },
          { label: 'YouTube playlist', url: 'https://www.youtube.com/playlist?list=PLtBw6njQRU-rwp5__7C0oIVt26ZgjG9NI' },
        ],
      },
      {
        name: '6.5940 TinyML & Efficient DL',
        prof: 'Han, Fall 2024',
        hours: '~80–120h',
        note: 'Efficient DL from the lab that built AWQ/SmoothQuant',
        links: [
          { label: 'hanlab.mit.edu/courses/2024-fall-65940', url: 'https://hanlab.mit.edu/courses/2024-fall-65940' },
          {
            label: 'YouTube playlist',
            url: 'https://www.youtube.com/playlist?list=PL80kAHvQbh-qGtNc54A6KW4i4bkTPjiRF',
          },
        ],
      },
      {
        name: '18.06 Linear Algebra',
        prof: 'Strang, Spring 2010',
        hours: '~35h',
        note: 'Canonical',
        links: [
          { label: 'OCW', url: 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/' },
          { label: 'YouTube', url: 'https://www.youtube.com/playlist?list=PL49CF3715CB9EF31D' },
        ],
      },
      {
        name: '6.006 Algorithms',
        prof: 'Demaine/Ku/Solomon, Spring 2020',
        hours: '~25h',
        links: [
          { label: 'OCW', url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/' },
          {
            label: 'YouTube',
            url: 'https://www.youtube.com/playlist?list=PLUl4u3cNGP63EdVPNLG3ToM6LaEUuStEY',
          },
        ],
      },
      {
        name: '6.824/6.5840 Distributed Systems',
        prof: 'Morris, Spring 2020',
        hours: '~30h',
        links: [
          { label: 'pdos.csail.mit.edu/6.824', url: 'https://pdos.csail.mit.edu/6.824/' },
          {
            label: 'YouTube',
            url: 'https://www.youtube.com/playlist?list=PLrw6a1wE39_tb2fErI4-WkMbsvGQk9_UB',
          },
        ],
      },
      {
        name: '6.S897 ML for Healthcare',
        prof: 'Sontag/Szolovits, Spring 2019',
        hours: '~25h',
        links: [
          {
            label: 'OCW',
            url: 'https://ocw.mit.edu/courses/6-s897-machine-learning-for-healthcare-spring-2019/',
          },
          {
            label: 'YouTube',
            url: 'https://www.youtube.com/playlist?list=PLUl4u3cNGP60B0PQXVQyGNdCyCTDU1Q5j',
          },
        ],
      },
    ],
  },
  {
    university: 'Stanford',
    courses: [
      {
        name: 'CS229 Machine Learning',
        prof: 'Ng, Autumn 2018 videos + 2022 notes',
        hours: '~27h',
        links: [
          { label: 'cs229.stanford.edu', url: 'https://cs229.stanford.edu/' },
          {
            label: 'YouTube',
            url: 'https://www.youtube.com/playlist?list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU',
          },
        ],
      },
      {
        name: 'CS231n CNNs',
        prof: 'Fei-Fei/Johnson/Yeung, Spring 2017',
        hours: '~20h',
        links: [
          { label: 'cs231n.stanford.edu', url: 'https://cs231n.stanford.edu/' },
          {
            label: 'YouTube',
            url: 'https://www.youtube.com/playlist?list=PL3FW7Lu3i5JvHM8ljYj-zLfQRF3EO8sYv',
          },
        ],
      },
      {
        name: 'CS224n NLP with DL',
        prof: 'Manning, Spring 2024',
        hours: '~25h',
        links: [
          { label: 'CS224n site', url: 'https://web.stanford.edu/class/cs224n/' },
          {
            label: 'YouTube',
            url: 'https://www.youtube.com/playlist?list=PLoROMvodv4rOaMFbaqxPDoLWjDaRAdP9D',
          },
        ],
      },
      {
        name: 'CS336 Language Modeling from Scratch',
        prof: 'Liang/Hashimoto, Spring 2025',
        hours: '~25–30h',
        note: 'Build an LLM end-to-end',
        links: [
          { label: 'cs336.stanford.edu', url: 'https://cs336.stanford.edu/' },
          {
            label: 'YouTube',
            url: 'https://www.youtube.com/playlist?list=PLoROMvodv4rOY23Y0BoGoBGgQ1zmU_MT_',
          },
        ],
      },
      {
        name: 'CS224W Graph ML',
        prof: 'Leskovec, 2021',
        hours: '~30h',
        links: [
          { label: 'CS224W site', url: 'https://web.stanford.edu/class/cs224w/' },
          {
            label: 'YouTube',
            url: 'https://www.youtube.com/playlist?list=PLoROMvodv4rOP-ImU-O1rYRg2RFxomvFp',
          },
        ],
      },
      {
        name: 'CS234 RL',
        prof: 'Brunskill, Spring 2024',
        hours: '~22h',
        note: 'Incl. DPO guest lecture',
        links: [
          { label: 'CS234 site', url: 'https://web.stanford.edu/class/cs234/' },
          {
            label: 'YouTube',
            url: 'https://www.youtube.com/playlist?list=PLoROMvodv4rN4wG6Nk6sNpTEbuOSosZdX',
          },
        ],
      },
      {
        name: 'CS324 LLMs',
        prof: 'Liang/Hashimoto/Ré, Winter 2022',
        note: 'Notes only, no public videos',
        links: [{ label: 'CS324 site', url: 'https://stanford-cs324.github.io/winter2022/' }],
      },
    ],
  },
  {
    university: 'Berkeley',
    courses: [
      {
        name: 'CS267 Parallel Computing',
        prof: 'Demmel/Buluç/Yelick, Spring 2021',
        hours: '~30h',
        links: [{ label: 'CS267', url: 'https://sites.google.com/lbl.gov/cs267-spr2021' }],
      },
      {
        name: 'CS285 Deep RL',
        prof: 'Levine, Fall 2023',
        hours: '~30h',
        links: [
          { label: 'CS285 site', url: 'https://rail.eecs.berkeley.edu/deeprlcourse/' },
          {
            label: 'YouTube',
            url: 'https://www.youtube.com/playlist?list=PL_iWQOsE6TfVYGEGiAOMaOzzv41Jfm_Ps',
          },
        ],
      },
      {
        name: 'Full Stack Deep Learning',
        prof: 'Frye/Karayev/Tobin, 2022',
        hours: '~12–15h',
        note: 'Production stack',
        links: [
          { label: 'fullstackdeeplearning.com', url: 'https://fullstackdeeplearning.com/course/2022/' },
          {
            label: 'YouTube',
            url: 'https://www.youtube.com/playlist?list=PL1T8fO7ArWleMMI8KPJ_5D5XSlovTW_Ur',
          },
        ],
      },
    ],
  },
  {
    university: 'CMU',
    courses: [
      {
        name: '10-708 PGM',
        prof: 'Xing, Spring 2020',
        hours: '~30h',
        links: [
          { label: '10-708 site', url: 'https://www.cs.cmu.edu/~epxing/Class/10708-20/' },
          {
            label: 'YouTube',
            url: 'https://www.youtube.com/playlist?list=PLoZgVqqHOumTqxIhcdcpOAJOOimrRCGZn',
          },
        ],
      },
      {
        name: '11-785 Intro to DL',
        prof: 'Raj/Singh, Spring 2024',
        hours: '~40–50h',
        links: [
          { label: '11-785 site', url: 'https://deeplearning.cs.cmu.edu/S24/index.html' },
          {
            label: 'YouTube',
            url: 'https://www.youtube.com/playlist?list=PLp-0K3kfddPxUJzAW0KxNNjGiK_hISFas',
          },
        ],
      },
      {
        name: '15-445 Database Systems',
        prof: 'Pavlo, Fall 2023',
        hours: '~30h',
        links: [
          { label: '15-445 site', url: 'https://15445.courses.cs.cmu.edu/fall2023/' },
          {
            label: 'YouTube',
            url: 'https://www.youtube.com/playlist?list=PL0uGkBk0a-fyJnpYf8sygyzyIPmrCbRXD',
          },
        ],
      },
      {
        name: '10-414/714 Deep Learning Systems',
        prof: 'Chen/Kolter, Fall 2022',
        hours: '~25h',
        note: 'Build a PyTorch-like framework',
        links: [
          { label: 'dlsyscourse.org', url: 'https://dlsyscourse.org/' },
          {
            label: 'YouTube',
            url: 'https://www.youtube.com/playlist?list=PLGzYMymX8amNyGPuJ35YWdq59eQ5jYCZ1',
          },
        ],
      },
    ],
  },
  {
    university: 'Princeton',
    courses: [
      {
        name: 'COS 324 Intro to ML',
        note: 'Notes only',
        links: [{ label: 'COS 324', url: 'https://princeton-introml.github.io/' }],
      },
      {
        name: 'COS 597G Understanding LLMs',
        prof: 'Danqi Chen, Fall 2022',
        note: 'Slides + reading list; no videos',
        links: [
          {
            label: 'COS 597G site',
            url: 'https://www.cs.princeton.edu/courses/archive/fall22/cos597G/',
          },
        ],
      },
    ],
  },
  {
    university: 'NYU',
    courses: [
      {
        name: 'DS-GA 1008 Deep Learning',
        prof: 'LeCun/Canziani, Spring 2021',
        hours: '~30h',
        note: 'Energy-based paradigm',
        links: [
          { label: 'NYU-DLSP21', url: 'https://atcold.github.io/NYU-DLSP21/' },
          {
            label: 'YouTube',
            url: 'https://www.youtube.com/playlist?list=PLLHTzKZzVU9e6xUfG10TkTWApKSZCzuBI',
          },
        ],
      },
    ],
  },
  {
    university: 'Cornell',
    courses: [
      {
        name: 'CS4780 ML for Intelligent Systems',
        prof: 'Weinberger, Fall 2018',
        hours: '~25h',
        note: 'Uniquely entertaining',
        links: [
          { label: 'CS4780 site', url: 'https://www.cs.cornell.edu/courses/cs4780/2018fa/' },
          {
            label: 'YouTube',
            url: 'https://www.youtube.com/playlist?list=PLl8OlHZGYOQ7bkVbuRthEsaLr7bONzbXS',
          },
        ],
      },
    ],
  },
  {
    university: 'DeepMind × UCL',
    courses: [
      {
        name: 'Intro to RL (David Silver, 2015)',
        hours: '~15h',
        links: [
          { label: 'davidsilver.uk/teaching', url: 'https://davidsilver.uk/teaching/' },
          {
            label: 'YouTube',
            url: 'https://www.youtube.com/playlist?list=PLqYmG7hTraZDM-OYHWgPebj2MfCFzFObQ',
          },
        ],
      },
      {
        name: 'Deep Learning Lecture Series 2020',
        hours: '~18h',
        links: [
          {
            label: 'YouTube',
            url: 'https://www.youtube.com/playlist?list=PLqYmG7hTraZCDxZ44o4p3N5Anz3lLRVZF',
          },
        ],
      },
    ],
  },
];

export const youtubeCategories: YoutubeCategory[] = [
  {
    label: 'Type 1 — Lecture-Grade',
    channels: [
      {
        name: 'Andrej Karpathy',
        url: 'https://www.youtube.com/@AndrejKarpathy',
        items: [
          {
            label: 'Neural Networks: Zero to Hero',
            url: 'https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ',
          },
          {
            label: "Let's reproduce GPT-2 (124M) — 4h",
            url: 'https://www.youtube.com/watch?v=l8pRSuU81PU',
          },
          {
            label: 'Deep Dive into LLMs like ChatGPT — 3h+',
            url: 'https://www.youtube.com/watch?v=7xTGNNLPyMI',
          },
        ],
      },
      {
        name: 'Stanford Online',
        url: 'https://www.youtube.com/@stanfordonline',
        items: [
          { label: 'CS229 (Ng 2018)', url: 'https://www.youtube.com/playlist?list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU' },
          { label: 'CS224n (Spring 2024)', url: 'https://www.youtube.com/playlist?list=PLoROMvodv4rOaMFbaqxPDoLWjDaRAdP9D' },
          { label: 'CS336', url: 'https://www.youtube.com/playlist?list=PLoROMvodv4rOY23Y0BoGoBGgQ1zmU_MT_' },
          { label: 'CS234 (Spring 2024)', url: 'https://www.youtube.com/playlist?list=PLoROMvodv4rN4wG6Nk6sNpTEbuOSosZdX' },
        ],
      },
      {
        name: 'MIT OpenCourseWare',
        url: 'https://www.youtube.com/@mitocw',
        items: [
          { label: '18.06 Strang', url: 'https://www.youtube.com/playlist?list=PL49CF3715CB9EF31D' },
          {
            label: '6.006 S20',
            url: 'https://www.youtube.com/playlist?list=PLUl4u3cNGP63EdVPNLG3ToM6LaEUuStEY',
          },
          {
            label: '6.824 S20',
            url: 'https://www.youtube.com/playlist?list=PLrw6a1wE39_tb2fErI4-WkMbsvGQk9_UB',
          },
        ],
      },
      {
        name: 'DeepMind / Google DeepMind',
        url: 'https://www.youtube.com/@Google_DeepMind',
        items: [
          {
            label: 'Silver RL 2015',
            url: 'https://www.youtube.com/playlist?list=PLqYmG7hTraZDM-OYHWgPebj2MfCFzFObQ',
          },
          {
            label: 'DL Lecture Series 2020',
            url: 'https://www.youtube.com/playlist?list=PLqYmG7hTraZCDxZ44o4p3N5Anz3lLRVZF',
          },
        ],
      },
      {
        name: '3Blue1Brown',
        url: 'https://www.youtube.com/@3Blue1Brown',
        items: [
          { label: 'Essence of Linear Algebra', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab' },
          { label: 'Essence of Calculus', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr' },
          { label: 'Neural Networks / But what is a GPT? series', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi' },
        ],
      },
    ],
  },
  {
    label: 'Type 2 — Paper Explainers',
    channels: [
      {
        name: 'Yannic Kilcher',
        url: 'https://www.youtube.com/@YannicKilcher',
        note: 'Weekly flagship-paper deep dives — read with you, skeptically.',
      },
      {
        name: 'Machine Learning Street Talk',
        url: 'https://www.youtube.com/@MachineLearningStreetTalk',
        note: 'Long-form interviews with frontier researchers.',
      },
      {
        name: 'AI Coffee Break with Letitia',
        url: 'https://www.youtube.com/@AICoffeeBreak',
        note: 'Crisp 10-min visualized paper explainers, strong on multimodal & diffusion.',
      },
      {
        name: 'Two Minute Papers',
        url: 'https://www.youtube.com/@TwoMinutePapers',
        note: 'Breadth scanner for what is new.',
      },
    ],
  },
  {
    label: 'Type 3 — Builder / Implementation',
    channels: [
      {
        name: 'Umar Jamil',
        url: 'https://www.youtube.com/@umarjamilai',
        note: 'The from-scratch implementer for modern LLMs.',
        items: [
          { label: 'Attention is All You Need from scratch', url: 'https://www.youtube.com/watch?v=bCz4OMemCcA' },
          { label: 'LLaMA from scratch', url: 'https://www.youtube.com/watch?v=oM4VmoabDAI' },
          { label: 'Coding Stable Diffusion from scratch', url: 'https://www.youtube.com/watch?v=ZBKpAp_6TGI' },
          { label: 'DPO explained', url: 'https://www.youtube.com/watch?v=hvGa5Mba4c8' },
          { label: 'Coding a Multimodal VLM (PaliGemma) from scratch', url: 'https://www.youtube.com/watch?v=vAmKB7iPkWw' },
          { label: 'Video index', url: 'https://umarjamil.org/videos' },
        ],
      },
      {
        name: 'Sebastian Raschka',
        url: 'https://www.youtube.com/@SebastianRaschka',
        note: 'LoRA/DPO/attention deep-dives; pair with Ahead of AI newsletter.',
      },
      {
        name: 'The AI Epiphany (Aleksa Gordic)',
        url: 'https://www.youtube.com/@TheAIEpiphany',
        note: 'GPT/CLIP/DeepMind-paper walkthroughs.',
      },
      {
        name: 'AI Jason',
        url: 'https://www.youtube.com/@AIJasonZ',
        note: 'Applied AI-engineer builds (agents, RAG, fine-tuning).',
      },
    ],
  },
  {
    label: 'Type 4 — Systems / GPU',
    channels: [
      {
        name: 'GPU MODE (formerly CUDA MODE)',
        url: 'https://www.youtube.com/@GPUMODE',
        note: 'Single highest-signal GPU-kernel resource.',
        items: [{ label: 'Lectures repo', url: 'https://github.com/gpu-mode/lectures' }],
      },
      {
        name: 'Jeremy Howard / fast.ai',
        url: 'https://www.youtube.com/@howardjeremyp',
        items: [
          {
            label: 'Practical Deep Learning for Coders playlist',
            url: 'https://www.youtube.com/playlist?list=PLfYUBJiXbdtSvpQjSnJJ_PmDQB_VyT5iU',
          },
        ],
      },
      {
        name: 'Mark Saroufim',
        note: 'Core GPU MODE organizer; most appearances on the GPU MODE channel.',
      },
    ],
  },
  {
    label: 'Type 5 — Practitioner / Industry',
    channels: [
      {
        name: 'Hamel Husain',
        url: 'https://www.youtube.com/@HamelHusain',
        items: [
          { label: 'hamel.dev', url: 'https://hamel.dev/' },
          { label: 'hamel.dev/blog/posts/evals', url: 'https://hamel.dev/blog/posts/evals/' },
        ],
      },
      {
        name: 'Latent Space',
        url: 'https://www.youtube.com/@LatentSpacePod',
        items: [{ label: 'latent.space', url: 'https://latent.space/' }],
      },
      {
        name: 'Eugene Yan',
        note: 'Primarily writes at eugeneyan.com; YouTube at conferences.',
        items: [{ label: 'eugeneyan.com', url: 'https://eugeneyan.com/' }],
      },
    ],
  },
];

export const stayingCurrent: StayingCurrentSection[] = [
  {
    label: 'Blogs & Substacks',
    entries: [
      { label: 'Lilian Weng', url: 'https://lilianweng.github.io', note: 'Monthly surveys (agents, RAG, RLHF, diffusion).' },
      { label: 'Jay Alammar', url: 'https://jalammar.github.io', note: 'Visual explainers.' },
      { label: 'Jay Alammar — Substack', url: 'https://newsletter.languagemodels.co' },
      { label: 'Chip Huyen', url: 'https://huyenchip.com', note: 'MLOps, LLM systems, careers.' },
      { label: 'Eugene Yan', url: 'https://eugeneyan.com', note: 'Applied ML patterns, eval deep-dives.' },
      { label: 'Simon Willison', url: 'https://simonwillison.net', note: 'Daily LLM news + annotations.' },
      { label: 'Sebastian Raschka — Ahead of AI', url: 'https://magazine.sebastianraschka.com' },
      { label: 'Jason Wei', url: 'https://jasonwei.net', note: 'Emergent abilities, CoT, scaling.' },
      { label: 'Horace He', url: 'https://horace.io', note: 'PyTorch internals, compilers.' },
      { label: 'Nathan Lambert — Interconnects', url: 'https://www.interconnects.ai', note: 'RLHF, post-training, frontier-lab analysis.' },
      { label: 'Aman.ai', url: 'https://aman.ai', note: 'Extensive primers on every ML topic.' },
      { label: 'Tim Dettmers', url: 'https://timdettmers.com', note: 'Quantization + GPU buying guides.' },
      { label: 'Sander Dieleman', url: 'https://sander.ai', note: 'Diffusion theory.' },
      { label: 'Finbarr Timbers — artfintel', url: 'https://www.artfintel.com', note: 'Model architecture + scaling.' },
      { label: 'The Gradient', url: 'https://thegradient.pub' },
      { label: 'OpenAI research', url: 'https://openai.com/research' },
      { label: 'Anthropic research', url: 'https://www.anthropic.com/research' },
      { label: 'Google DeepMind blog', url: 'https://deepmind.google/discover/blog/' },
      { label: 'Meta AI blog', url: 'https://ai.meta.com/blog/' },
      { label: 'Mistral news', url: 'https://mistral.ai/news' },
      { label: 'HuggingFace blog', url: 'https://huggingface.co/blog' },
    ],
  },
  {
    label: 'Newsletters (free)',
    entries: [
      { label: 'The Batch (DeepLearning.AI)', url: 'https://www.deeplearning.ai/the-batch/' },
      { label: 'Import AI (Jack Clark)', url: 'https://importai.substack.com' },
      { label: 'Alpha Signal', url: 'https://alphasignal.ai' },
      { label: 'TLDR AI', url: 'https://tldr.tech/ai' },
      { label: 'Interconnects (Nathan Lambert)', url: 'https://www.interconnects.ai' },
      { label: "Ben's Bites", url: 'https://www.bensbites.com' },
      { label: 'Last Week in AI', url: 'https://lastweekin.ai' },
      { label: 'The Pragmatic Engineer (free tier)', url: 'https://newsletter.pragmaticengineer.com' },
      { label: 'Ahead of AI (Raschka)', url: 'https://magazine.sebastianraschka.com' },
    ],
  },
  {
    label: 'Discord / Slack (free)',
    entries: [
      { label: 'EleutherAI Discord', url: 'https://discord.gg/eleutherai' },
      { label: 'HuggingFace Discord', url: 'https://hf.co/join/discord' },
      { label: 'Latent Space Discord', url: 'https://latent.space' },
      { label: 'MLOps Community Slack', url: 'https://mlops.community' },
      { label: 'GPU MODE Discord (via lectures repo)', url: 'https://github.com/gpu-mode/lectures' },
      { label: 'PyTorch Slack', url: 'https://pytorch.org/resources/' },
    ],
  },
  {
    label: 'Conferences with free streamed content',
    entries: [
      { label: 'OpenReview (NeurIPS papers)', url: 'https://openreview.net' },
      { label: 'NeurIPS', url: 'https://nips.cc' },
      { label: 'ICML', url: 'https://icml.cc' },
      { label: 'MLSys', url: 'https://mlsys.org' },
      { label: 'USENIX OSDI / ATC', url: 'https://www.usenix.org' },
      { label: 'NVIDIA Developer YouTube (GTC)', url: 'https://www.youtube.com/@NVIDIADeveloper' },
      { label: 'ACL Anthology', url: 'https://aclanthology.org' },
      { label: 'AAAI', url: 'https://aaai.org' },
    ],
  },
];

export function allLinks(): Link[] {
  const seen = new Map<string, Link>();
  const push = (l: Link) => {
    if (!seen.has(l.url)) seen.set(l.url, l);
  };
  tracks.forEach((t) =>
    t.topics.forEach((topic) => {
      topic.primary.forEach(push);
      topic.fallbacks?.forEach((g) => g.links.forEach(push));
      topic.extras?.forEach((g) => g.links.forEach(push));
    })
  );
  weeks.forEach((w) => w.links.forEach(push));
  papers.forEach((p) => push({ label: p.title, url: p.url }));
  universityCourses.forEach((u) => u.courses.forEach((c) => c.links.forEach(push)));
  youtubeCategories.forEach((cat) =>
    cat.channels.forEach((ch) => {
      if (ch.url) push({ label: ch.name, url: ch.url });
      ch.items?.forEach(push);
    })
  );
  stayingCurrent.forEach((s) => s.entries.forEach((e) => push({ label: e.label, url: e.url })));
  return Array.from(seen.values());
}
