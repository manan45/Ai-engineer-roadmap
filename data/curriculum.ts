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

export type PracticeProblem = { title: string; note?: string; links: Link[] };
export type PracticeGroup = { label: string; blurb?: string; problems: PracticeProblem[] };
export type PracticeAppendixData = {
  id: string;
  letter: string;
  title: string;
  blurb: string;
  groups: PracticeGroup[];
};

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
      {
        id: '1-9',
        title: '1.9 Databases, SQL & Storage Systems',
        hours: '~20–25h',
        why:
          'Applied ML and FDE work quickly becomes data systems work: SQL debugging, warehouse joins, indexes, vector + relational storage, CDC, and query latency. If you cannot reason about storage, half of production AI feels like magic.',
        concept:
          'Relational algebra, SQL joins/aggregations/window functions, B-trees and LSMs, OLTP vs OLAP, columnar storage, query planning, transactions/isolation, lakehouse basics (Parquet / Delta / Iceberg).',
        focus:
          'Do SQL first, then read one real database course/module. Finish by tracing how the same data moves from Postgres to warehouse to vector store to serving layer.',
        primary: [
          { label: 'CMU 15-445 Database Systems', url: 'https://15445.courses.cs.cmu.edu/' },
          { label: 'PostgreSQL tutorial', url: 'https://www.postgresql.org/docs/current/tutorial.html' },
          { label: 'DuckDB docs', url: 'https://duckdb.org/docs/' },
          { label: 'Designing Data-Intensive Applications', url: 'https://dataintensive.net/' },
        ],
        fallbacks: [
          {
            label: 'Storage engines & internals',
            links: [
              { label: 'Alex Petrov — Database Internals', url: 'https://www.databass.dev/' },
              { label: 'RocksDB wiki', url: 'https://github.com/facebook/rocksdb/wiki' },
              { label: 'B-tree overview (SQLite)', url: 'https://www.sqlite.org/fileformat2.html' },
            ],
          },
          {
            label: 'Lakehouse / analytics stack',
            links: [
              { label: 'Apache Parquet docs', url: 'https://parquet.apache.org/docs/' },
              { label: 'Delta Lake docs', url: 'https://docs.delta.io/latest/index.html' },
              { label: 'Apache Iceberg docs', url: 'https://iceberg.apache.org/docs/latest/' },
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
      {
        id: '2-6',
        title: '2.6 Recommender Systems at Scale',
        hours: '~10–12h',
        why:
          'Every large tech company runs recommenders — feeds, ads, search. Two-tower, sequential, and generative recs are still the #1 applied-ML area by revenue. Interviews test this directly.',
        concept:
          'Collaborative filtering, matrix factorization, two-tower retrieval, DLRM, sequential recs (SASRec, BERT4Rec), candidate generation vs. ranking, retrieval-ranking-reranker stack, generative recs (TIGER / HSTU).',
        focus:
          'Read the YouTube two-tower paper + DLRM + SASRec. Build a two-tower model on MovieLens and deploy as retrieval → ranker.',
        primary: [
          { label: 'YouTube deep neural nets — Covington et al. 2016', url: 'https://research.google/pubs/pub45530/' },
          { label: 'DLRM — arXiv:1906.00091', url: 'https://arxiv.org/abs/1906.00091' },
          { label: 'SASRec — arXiv:1808.09781', url: 'https://arxiv.org/abs/1808.09781' },
          { label: 'Eugene Yan — system design for recs', url: 'https://eugeneyan.com/writing/system-design-for-discovery/' },
        ],
        fallbacks: [
          {
            label: 'Modern & generative recs',
            links: [
              { label: 'TIGER (generative retrieval) — arXiv:2305.05065', url: 'https://arxiv.org/abs/2305.05065' },
              { label: 'HSTU (Meta) — arXiv:2402.17152', url: 'https://arxiv.org/abs/2402.17152' },
              { label: 'Pinterest PinnerSage', url: 'https://arxiv.org/abs/2007.03634' },
            ],
          },
          {
            label: 'Foundations & courses',
            links: [
              { label: 'Google — Recommendation Systems course', url: 'https://developers.google.com/machine-learning/recommendation' },
              { label: 'RecSys conference (papers)', url: 'https://recsys.acm.org/' },
              { label: 'Microsoft Recommenders repo', url: 'https://github.com/recommenders-team/recommenders' },
            ],
          },
        ],
      },
      {
        id: '2-7',
        title: '2.7 Causal Inference for ML',
        hours: '~8–10h',
        why:
          'Correlation models are worthless for "should we ship this intervention?" Every applied-ML team eventually needs CATE / uplift / A/B inference. Frontier-lab evals also increasingly use causal framing.',
        concept:
          'Potential outcomes, RCTs, propensity scores, DML, T-/X-/R-learners for CATE, uplift modeling, instrumental variables, synthetic control, DAGs & backdoor criterion.',
        focus:
          'Read Brady Neal book + EconML docs. Work one CATE notebook on a public dataset (Lalonde / Criteo uplift) with DoubleML.',
        primary: [
          { label: 'Brady Neal — Introduction to Causal Inference', url: 'https://www.bradyneal.com/causal-inference-course' },
          { label: 'Microsoft EconML docs', url: 'https://econml.azurewebsites.net/' },
          { label: 'Microsoft DoWhy docs', url: 'https://www.pywhy.org/dowhy/' },
          { label: 'Künzel et al. — Meta-learners for CATE (PNAS 2019)', url: 'https://arxiv.org/abs/1706.03461' },
        ],
        fallbacks: [
          {
            label: 'Canonical references',
            links: [
              { label: 'Pearl — Causality (book site)', url: 'http://bayes.cs.ucla.edu/BOOK-2K/' },
              { label: 'Hernán & Robins — Causal Inference: What If', url: 'https://www.hsph.harvard.edu/miguel-hernan/causal-inference-book/' },
              { label: 'Matheus Facure — Causal Inference for the Brave and True', url: 'https://matheusfacure.github.io/python-causality-handbook/' },
            ],
          },
          {
            label: 'Uplift & industry applications',
            links: [
              { label: 'Criteo Uplift benchmark', url: 'https://ailab.criteo.com/criteo-uplift-prediction-dataset/' },
              { label: 'Uber CausalML', url: 'https://github.com/uber/causalml' },
              { label: 'Netflix — causal inference at scale', url: 'https://netflixtechblog.com/a-survey-of-causal-inference-applications-at-netflix-b62d25175e6f' },
            ],
          },
        ],
      },
      {
        id: '2-8',
        title: '2.8 Uncertainty Quantification & Conformal Prediction',
        hours: '~6–8h',
        why:
          'Deployed models need calibrated confidence — for selective prediction, LLM abstention, safety-critical scoring, and selling to enterprise. Conformal prediction is the one distribution-free, finite-sample guarantee that actually ships.',
        concept:
          'Calibration (ECE, reliability diagrams), temperature scaling, MC Dropout, deep ensembles, Bayesian NNs, conformal prediction (split / CQR / APS), selective prediction, epistemic vs aleatoric uncertainty.',
        focus:
          'Read Angelopoulos & Bates conformal tutorial end-to-end. Apply split conformal to a classifier; measure coverage.',
        primary: [
          { label: 'Angelopoulos & Bates — Conformal tutorial (arXiv:2107.07511)', url: 'https://arxiv.org/abs/2107.07511' },
          { label: 'Guo et al. — On Calibration of Modern NNs', url: 'https://arxiv.org/abs/1706.04599' },
          { label: 'Deep Ensembles — Lakshminarayanan et al.', url: 'https://arxiv.org/abs/1612.01474' },
          { label: 'MAPIE (conformal prediction library)', url: 'https://mapie.readthedocs.io/en/latest/' },
        ],
        fallbacks: [
          {
            label: 'Conformal for LLMs & regression',
            links: [
              { label: 'Conformal Language Modeling — arXiv:2306.10193', url: 'https://arxiv.org/abs/2306.10193' },
              { label: 'CQR — Conformalized Quantile Regression', url: 'https://arxiv.org/abs/1905.03222' },
              { label: 'Awesome Conformal Prediction', url: 'https://github.com/valeman/awesome-conformal-prediction' },
            ],
          },
          {
            label: 'Bayesian deep learning',
            links: [
              { label: 'Gal — MC Dropout (arXiv:1506.02142)', url: 'https://arxiv.org/abs/1506.02142' },
              { label: 'Wilson — Bayes DL (arXiv:2002.08791)', url: 'https://arxiv.org/abs/2002.08791' },
              { label: 'Pyro docs', url: 'https://pyro.ai/examples/' },
            ],
          },
        ],
      },
      {
        id: '2-9',
        title: '2.9 Experimentation, A/B Testing & Product Analytics',
        hours: '~8–10h',
        why:
          'Most applied ML decisions are not benchmark decisions, they are product decisions. You need to know how to design an experiment, pick guardrails, analyze rollout impact, and avoid fooling yourself with noisy wins.',
        concept:
          'Randomized experiments, CUPED, sequential testing, power analysis, variance reduction, guardrail metrics, funnel metrics, switchback experiments, interference, online/offline metric mismatch.',
        focus:
          'Read a practical experimentation guide end-to-end, then analyze one historical or synthetic A/B test with proper power, confidence intervals, and guardrail interpretation.',
        primary: [
          { label: 'Kohavi, Tang, Xu — Trustworthy Online Controlled Experiments', url: 'https://experimentguide.com/' },
          { label: 'Evan Miller — How Not To Run an A/B Test', url: 'https://www.evanmiller.org/how-not-to-run-an-ab-test.html' },
          { label: 'Statsig perspectives on experimentation', url: 'https://www.statsig.com/perspectives' },
          { label: 'Netflix experimentation platform blog', url: 'https://netflixtechblog.com/tags/experimentation/' },
        ],
        fallbacks: [
          {
            label: 'Theory & methods',
            links: [
              { label: 'Optimizely stats engine / sequential testing', url: 'https://www.optimizely.com/sample-size-calculator/' },
              { label: 'DoorDash — switchback tests', url: 'https://doordash.engineering/2022/02/15/switchback-tests-and-randomized-experimentation-under-network-effects-at-doordash/' },
              { label: 'Microsoft ExP platform papers', url: 'https://www.microsoft.com/en-us/research/group/experimentation-platform-exp/' },
            ],
          },
          {
            label: 'Product metrics practice',
            links: [
              { label: 'Mode SQL + analytics tutorial', url: 'https://mode.com/sql-tutorial/' },
              { label: 'A/B testing by VWO', url: 'https://vwo.com/ab-testing/' },
              { label: 'CXL experimentation articles', url: 'https://cxl.com/blog/category/ab-testing/' },
            ],
          },
        ],
      },
      {
        id: '2-10',
        title: '2.10 Search Ranking & Learning to Rank',
        hours: '~8–10h',
        why:
          'RAG is only one branch of retrieval. Production search, recommendations, marketplaces, and enterprise knowledge systems all depend on ranking. BM25, LambdaMART, and ranking metrics are core applied-ML tools.',
        concept:
          'Inverted indexes, BM25, candidate retrieval vs ranking, pointwise/pairwise/listwise LTR, LambdaMART, query understanding, ranking metrics (NDCG, MRR, MAP), online relevance feedback.',
        focus:
          'Work through BM25 + Elasticsearch/OpenSearch basics, then train one simple LambdaMART or XGBoost ranker and evaluate with NDCG.',
        primary: [
          { label: 'Introduction to Information Retrieval', url: 'https://nlp.stanford.edu/IR-book/' },
          { label: 'Elasticsearch relevance docs', url: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/index-modules-similarity.html' },
          { label: 'XGBoost learning to rank tutorial', url: 'https://xgboost.readthedocs.io/en/stable/tutorials/learning_to_rank.html' },
          { label: 'Eugene Yan — ranking systems', url: 'https://eugeneyan.com/writing/search/' },
        ],
        fallbacks: [
          {
            label: 'Practical retrieval stacks',
            links: [
              { label: 'OpenSearch ranking docs', url: 'https://opensearch.org/docs/latest/search-plugins/search-relevance/' },
              { label: 'LightGBM LTR', url: 'https://lightgbm.readthedocs.io/en/latest/Parameters.html#lambdarank' },
              { label: 'Pyserini', url: 'https://github.com/castorini/pyserini' },
            ],
          },
          {
            label: 'Papers & benchmarks',
            links: [
              { label: 'LambdaMART overview (Microsoft)', url: 'https://www.microsoft.com/en-us/research/publication/from-ranknet-to-lambdarank-to-lambdamart-an-overview/' },
              { label: 'MS MARCO', url: 'https://microsoft.github.io/msmarco/' },
              { label: 'BEIR benchmark', url: 'https://arxiv.org/abs/2104.08663' },
            ],
          },
        ],
      },
      {
        id: '2-11',
        title: '2.11 Time Series Forecasting & Sequence Modeling',
        hours: '~10–12h',
        why:
          'Finance, supply chain, hardware telemetry, and capacity planning all run on time series. Knowing when to use an LLM (Chronos) vs a classical model (ARIMA) vs a specialized DL model (N-BEATS/PatchTST) is a core applied-ML competency.',
        concept:
          'Stationarity, seasonality, ARIMA, Prophet, exponential smoothing, N-BEATS, Temporal Fusion Transformers (TFT), PatchTST, foundation models for time series (Chronos, MOIRAI), multivariate vs univariate forecasting.',
        focus:
          'Compare Prophet, XGBoost, and Chronos on a real-world multivariate forecasting dataset (e.g., electricity or weather). Evaluate using MAE, MAPE, and sMAPE.',
        primary: [
          { label: 'Forecasting: Principles and Practice (Hyndman & Athanasopoulos)', url: 'https://otexts.com/fpp3/' },
          { label: 'N-BEATS — arXiv:1905.10437', url: 'https://arxiv.org/abs/1905.10437' },
          { label: 'Chronos (Amazon) — arXiv:2403.07815', url: 'https://arxiv.org/abs/2403.07815' },
          { label: 'Nixtla / NeuralForecast docs', url: 'https://nixtla.github.io/neuralforecast/' },
        ],
        fallbacks: [
          {
            label: 'Modern DL for Time Series',
            links: [
              { label: 'PatchTST — arXiv:2211.14730', url: 'https://arxiv.org/abs/2211.14730' },
              { label: 'Temporal Fusion Transformers — arXiv:1912.09363', url: 'https://arxiv.org/abs/1912.09363' },
              { label: 'MOIRAI (Salesforce) — arXiv:2402.02592', url: 'https://arxiv.org/abs/2402.02592' },
            ],
          },
          {
            label: 'Classical & Tooling',
            links: [
              { label: 'Prophet (Meta)', url: 'https://facebook.github.io/prophet/' },
              { label: 'sktime library', url: 'https://www.sktime.net/en/latest/' },
              { label: 'Darts library', url: 'https://unit8co.github.io/darts/' },
            ],
          },
        ],
      },
      {
        id: '2-12',
        title: '2.12 Tabular Deep Learning vs Tree Ensembles',
        hours: '~6–8h',
        why:
          'For tabular data (fraud, credit scoring, churn), XGBoost and LightGBM are still king. But tabular deep learning (TabNet, FT-Transformer) is closing the gap and allows for multi-modal fusion (text + tabular).',
        concept:
          'Gradient Boosted Decision Trees (GBDT), LightGBM vs XGBoost vs CatBoost, categorical embeddings, TabNet (attentive routing), FT-Transformer, deep/wide models, feature importance (SHAP, TreeSHAP).',
        focus:
          'Train XGBoost, CatBoost, and TabNet on a tabular dataset with high cardinality categoricals. Compare AUC, training time, and SHAP feature importances.',
        primary: [
          { label: 'XGBoost docs', url: 'https://xgboost.readthedocs.io/en/stable/' },
          { label: 'CatBoost docs', url: 'https://catboost.ai/en/docs/' },
          { label: 'TabNet — arXiv:1908.07442', url: 'https://arxiv.org/abs/1908.07442' },
          { label: 'Why do tree-based models still outperform DL on typical tabular data? — arXiv:2207.08815', url: 'https://arxiv.org/abs/2207.08815' },
        ],
        fallbacks: [
          {
            label: 'Tabular DL Architectures',
            links: [
              { label: 'FT-Transformer — arXiv:2106.11959', url: 'https://arxiv.org/abs/2106.11959' },
              { label: 'Wide & Deep (Google) — arXiv:1606.07792', url: 'https://arxiv.org/abs/1606.07792' },
              { label: 'PyTorch Tabular library', url: 'https://pytorch-tabular.readthedocs.io/en/latest/' },
            ],
          },
          {
            label: 'Interpretability & Ensembles',
            links: [
              { label: 'SHAP (SHapley Additive exPlanations)', url: 'https://shap.readthedocs.io/en/latest/' },
              { label: 'LightGBM docs', url: 'https://lightgbm.readthedocs.io/en/latest/' },
            ],
          },
        ],
      },
      {
        id: '2-13',
        title: '2.13 Anomaly & Outlier Detection',
        hours: '~6–8h',
        why:
          'Fraud, intrusion detection, manufacturing QC, and production ML monitoring all reduce to anomaly detection. It is also the most common "unsupervised" task actually shipped in industry.',
        concept:
          'Statistical tests, Isolation Forest, One-Class SVM, autoencoder reconstruction error, density-based (LOF, DBSCAN), deep anomaly detection (Deep SVDD), time-series anomaly detection, streaming vs batch detection.',
        focus:
          'Run Isolation Forest, LOF, and an autoencoder on one real dataset (credit card fraud or KDD). Compare PR-AUC and analyze the trade-off between false positives and false negatives.',
        primary: [
          { label: 'Isolation Forest (Liu et al.) — ICDM 2008', url: 'https://cs.nju.edu.cn/zhouzh/zhouzh.files/publication/icdm08b.pdf' },
          { label: 'PyOD — Python Outlier Detection library', url: 'https://pyod.readthedocs.io/en/latest/' },
          { label: 'Deep SVDD — Ruff et al. ICML 2018', url: 'http://proceedings.mlr.press/v80/ruff18a.html' },
          { label: 'scikit-learn — Outlier detection', url: 'https://scikit-learn.org/stable/modules/outlier_detection.html' },
        ],
        fallbacks: [
          {
            label: 'Time-series & streaming',
            links: [
              { label: 'Numenta HTM for anomaly detection', url: 'https://numenta.com/resources/' },
              { label: 'ADTK — Anomaly Detection Toolkit', url: 'https://adtk.readthedocs.io/en/stable/' },
              { label: 'Twitter AnomalyDetection (historical)', url: 'https://github.com/twitter/AnomalyDetection' },
            ],
          },
          {
            label: 'Industrial & fraud applications',
            links: [
              { label: 'MVTec AD benchmark (industrial)', url: 'https://www.mvtec.com/company/research/datasets/mvtec-ad' },
              { label: 'IEEE-CIS Fraud Detection (Kaggle)', url: 'https://www.kaggle.com/c/ieee-fraud-detection' },
              { label: 'Deep Learning for Anomaly Detection — arXiv:2007.02500', url: 'https://arxiv.org/abs/2007.02500' },
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
      {
        id: '3-8',
        title: '3.8 Diffusion & Flow-Based Generative Models',
        hours: '~15–20h',
        why:
          'Diffusion underpins every serious image, video and multimodal system (Stable Diffusion, Sora, Veo, Flux, Movie Gen). Flow matching is rapidly replacing DDPM-style training in new systems. Without this foundation, multimodal work in Track 4/7 is opaque.',
        concept:
          'Forward noising process, score matching, reverse SDE/ODE, classifier-free guidance, latent diffusion, rectified flow, consistency distillation.',
        focus:
          'DDPM → DDIM → classifier-free guidance → Latent Diffusion → Flow Matching → Rectified Flow → Consistency Models. Reimplement a 1D toy diffusion + a tiny U-Net on MNIST.',
        primary: [
          { label: 'Lilian Weng — What are Diffusion Models?', url: 'https://lilianweng.github.io/posts/2021-07-11-diffusion-models/' },
          { label: 'Yang Song — score-based generative modeling', url: 'https://yang-song.net/blog/2021/score/' },
          { label: 'Sohl-Dickstein 2015 — arXiv:1503.03585', url: 'https://arxiv.org/abs/1503.03585' },
          { label: 'Ho et al. DDPM — arXiv:2006.11239', url: 'https://arxiv.org/abs/2006.11239' },
          { label: 'DDIM — arXiv:2010.02502', url: 'https://arxiv.org/abs/2010.02502' },
          { label: 'Latent Diffusion / Stable Diffusion — arXiv:2112.10752', url: 'https://arxiv.org/abs/2112.10752' },
        ],
        fallbacks: [
          {
            label: 'Flow matching & modern training',
            links: [
              { label: 'Classifier-Free Guidance — arXiv:2207.12598', url: 'https://arxiv.org/abs/2207.12598' },
              { label: 'Flow Matching (Lipman) — arXiv:2210.02747', url: 'https://arxiv.org/abs/2210.02747' },
              { label: 'Rectified Flow — arXiv:2209.03003', url: 'https://arxiv.org/abs/2209.03003' },
              { label: 'Consistency Models — arXiv:2303.01469', url: 'https://arxiv.org/abs/2303.01469' },
              { label: 'EDM (Karras) — arXiv:2206.00364', url: 'https://arxiv.org/abs/2206.00364' },
              { label: 'DiT — arXiv:2212.09748', url: 'https://arxiv.org/abs/2212.09748' },
            ],
          },
          {
            label: 'Hands-on courses',
            links: [
              { label: 'HuggingFace Diffusion Course', url: 'https://huggingface.co/learn/diffusion-course/en/unit0/1' },
              { label: 'fast.ai — Stable Diffusion Deep Dive', url: 'https://www.fast.ai/posts/part2-2023.html' },
              { label: 'Sander Dieleman — Perspectives on diffusion', url: 'https://sander.ai/2023/07/20/perspectives.html' },
            ],
          },
        ],
      },
      {
        id: '3-9',
        title: '3.9 Graph Neural Networks & Geometric DL',
        hours: '~12–15h',
        why:
          'Graphs power recsys, drug design, fraud, road networks, and the entire "AI for Science" stack. GNNs are also the cleanest window into geometric / equivariant deep learning, which matters for physics/biology tasks.',
        concept:
          'Message passing, GCN / GraphSAGE / GAT, expressive power & WL test, graph transformers, equivariance (E(3)/SE(3)), message-passing vs. attention on graphs, scaling (sampling, GNNAutoScale).',
        focus:
          'Do Stanford CS224W first 6 lectures + build a GraphSAGE node classifier in PyG. Then read Geometric Deep Learning proto-book chapters 1–3.',
        primary: [
          { label: 'Stanford CS224W — Machine Learning with Graphs (Leskovec)', url: 'https://web.stanford.edu/class/cs224w/' },
          { label: 'CS224W YouTube', url: 'https://www.youtube.com/playlist?list=PLoROMvodv4rPLKxIpqhjhPgdQy7imNkDn' },
          { label: 'PyTorch Geometric docs', url: 'https://pytorch-geometric.readthedocs.io/en/latest/' },
          { label: 'Geometric Deep Learning proto-book', url: 'https://geometricdeeplearning.com/' },
        ],
        fallbacks: [
          {
            label: 'Foundational papers',
            links: [
              { label: 'GCN — Kipf & Welling (arXiv:1609.02907)', url: 'https://arxiv.org/abs/1609.02907' },
              { label: 'GraphSAGE — arXiv:1706.02216', url: 'https://arxiv.org/abs/1706.02216' },
              { label: 'GAT — arXiv:1710.10903', url: 'https://arxiv.org/abs/1710.10903' },
              { label: 'Graphormer — arXiv:2106.05234', url: 'https://arxiv.org/abs/2106.05234' },
            ],
          },
          {
            label: 'Equivariance & applications',
            links: [
              { label: 'EGNN — arXiv:2102.09844', url: 'https://arxiv.org/abs/2102.09844' },
              { label: 'SchNet — arXiv:1706.08566', url: 'https://arxiv.org/abs/1706.08566' },
              { label: 'OGB leaderboard', url: 'https://ogb.stanford.edu/' },
              { label: 'DGL docs', url: 'https://www.dgl.ai/' },
            ],
          },
        ],
      },
      {
        id: '3-10',
        title: '3.10 Computer Vision Systems',
        hours: '~12–16h',
        why:
          'Vision is still one of the highest-impact applied-ML domains: OCR, industrial inspection, medical imaging, robotics, document AI, multimodal products. CNNs alone are no longer enough; modern vision means ViTs, detection, segmentation, and representation learning.',
        concept:
          'Vision Transformers, self-supervised vision pretraining, object detection, segmentation, tracking, OCR/document pipelines, augmentations, transfer learning, grounding and evaluation metrics (mAP, IoU).',
        focus:
          'Read ViT first, then do one detection/segmentation stack end-to-end on a real dataset. Build either a document-understanding or detection pipeline and evaluate with mAP/IoU.',
        primary: [
          { label: 'Stanford CS231n', url: 'https://cs231n.stanford.edu/' },
          { label: 'ViT — arXiv:2010.11929', url: 'https://arxiv.org/abs/2010.11929' },
          { label: 'Detectron2 docs', url: 'https://detectron2.readthedocs.io/en/latest/' },
          { label: 'MMDetection docs', url: 'https://mmdetection.readthedocs.io/en/latest/' },
        ],
        fallbacks: [
          {
            label: 'Detection / segmentation foundations',
            links: [
              { label: 'Faster R-CNN — arXiv:1506.01497', url: 'https://arxiv.org/abs/1506.01497' },
              { label: 'YOLOv10 docs/paper index', url: 'https://docs.ultralytics.com/' },
              { label: 'Mask R-CNN — arXiv:1703.06870', url: 'https://arxiv.org/abs/1703.06870' },
              { label: 'Segment Anything — arXiv:2304.02643', url: 'https://arxiv.org/abs/2304.02643' },
            ],
          },
          {
            label: 'Representation learning & OCR',
            links: [
              { label: 'DINOv2 — arXiv:2304.07193', url: 'https://arxiv.org/abs/2304.07193' },
              { label: 'TrOCR — arXiv:2109.10282', url: 'https://arxiv.org/abs/2109.10282' },
              { label: 'PaddleOCR', url: 'https://github.com/PaddlePaddle/PaddleOCR' },
            ],
          },
        ],
      },
      {
        id: '3-11',
        title: '3.11 Hyperparameter Optimization & AutoML',
        hours: '~6–8h',
        why:
          'You cannot tune a 7B model by grid search. Bayesian optimization, Population-Based Training (PBT), and Hyperband are required to squeeze maximum performance out of limited compute budgets.',
        concept:
          'Grid/random search, Bayesian optimization, Gaussian Processes, acquisition functions (EI, UCB), Hyperband, BOHB, Population-Based Training (PBT), Optuna, Ray Tune.',
        focus:
          'Use Optuna to tune the learning rate, weight decay, and dropout of a ResNet or small Transformer. Then read the PBT paper to understand evolutionary tuning.',
        primary: [
          { label: 'Optuna docs', url: 'https://optuna.readthedocs.io/en/stable/' },
          { label: 'Ray Tune docs', url: 'https://docs.ray.io/en/latest/tune/index.html' },
          { label: 'A Tutorial on Bayesian Optimization — arXiv:1807.02811', url: 'https://arxiv.org/abs/1807.02811' },
          { label: 'Population Based Training (PBT) — DeepMind', url: 'https://arxiv.org/abs/1711.09846' },
        ],
        fallbacks: [
          {
            label: 'Advanced HPO',
            links: [
              { label: 'BOHB (Bayesian Optimization and Hyperband) — arXiv:1807.01774', url: 'https://arxiv.org/abs/1807.01774' },
              { label: 'Hyperband — arXiv:1603.06560', url: 'https://arxiv.org/abs/1603.06560' },
              { label: 'Weights & Biases Sweeps', url: 'https://docs.wandb.ai/guides/sweeps' },
            ],
          },
        ],
      },
      {
        id: '3-12',
        title: '3.12 Self-Supervised & Contrastive Representation Learning',
        hours: '~10–12h',
        why:
          'Almost every modern foundation model — CLIP, DINOv2, MAE, wav2vec, the vision half of every VLM — is built on self-supervised pretraining. You cannot reason about multimodal models, vision encoders, or representation quality without understanding SSL.',
        concept:
          'Contrastive learning (SimCLR, MoCo), non-contrastive SSL (BYOL, SimSiam), masked image modeling (MAE, BEiT), joint-embedding predictive architectures (I-JEPA), vision-language contrastive (CLIP, SigLIP), probing vs fine-tuning evaluation.',
        focus:
          'Read SimCLR + MAE + DINOv2. Train a small SimCLR or MAE on CIFAR/ImageNet-subset and evaluate with linear probing.',
        primary: [
          { label: 'SimCLR — arXiv:2002.05709', url: 'https://arxiv.org/abs/2002.05709' },
          { label: 'MoCo v3 — arXiv:2104.02057', url: 'https://arxiv.org/abs/2104.02057' },
          { label: 'MAE — arXiv:2111.06377', url: 'https://arxiv.org/abs/2111.06377' },
          { label: 'DINOv2 — arXiv:2304.07193', url: 'https://arxiv.org/abs/2304.07193' },
        ],
        fallbacks: [
          {
            label: 'Non-contrastive & JEPA family',
            links: [
              { label: 'BYOL — arXiv:2006.07733', url: 'https://arxiv.org/abs/2006.07733' },
              { label: 'SimSiam — arXiv:2011.10566', url: 'https://arxiv.org/abs/2011.10566' },
              { label: 'I-JEPA — arXiv:2301.08243', url: 'https://arxiv.org/abs/2301.08243' },
              { label: 'V-JEPA — arXiv:2404.08471', url: 'https://arxiv.org/abs/2404.08471' },
            ],
          },
          {
            label: 'Vision-language & audio SSL',
            links: [
              { label: 'CLIP — arXiv:2103.00020', url: 'https://arxiv.org/abs/2103.00020' },
              { label: 'SigLIP — arXiv:2303.15343', url: 'https://arxiv.org/abs/2303.15343' },
              { label: 'wav2vec 2.0 — arXiv:2006.11477', url: 'https://arxiv.org/abs/2006.11477' },
              { label: 'LeCun — JEPA position paper', url: 'https://openreview.net/pdf?id=BZ5a1r-kVsf' },
            ],
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
      {
        id: '4-11',
        title: '4.11 Data Engineering for Pretraining',
        hours: '~10–12h',
        why:
          'Pretraining data quality is the dominant driver of model quality — more than architecture changes. FineWeb-Edu, RedPajama, Dolma and The Stack set the 2024–2026 bar. Every frontier team has a data team; know the pipeline end-to-end.',
        concept:
          'CommonCrawl → language ID → URL / boilerplate filters → MinHash + SemDedup → quality classifiers → decontamination → tokenizer training.',
        focus:
          'Read the FineWeb technical report in full, skim Dolma + RedPajama v2, run datatrove on a 100k-doc sample end-to-end, and inspect decontamination pipelines.',
        primary: [
          { label: 'FineWeb — HF tech report', url: 'https://huggingface.co/spaces/HuggingFaceFW/blogpost-fineweb-v1' },
          { label: 'FineWeb-Edu dataset', url: 'https://huggingface.co/datasets/HuggingFaceFW/fineweb-edu' },
          { label: 'huggingface/datatrove', url: 'https://github.com/huggingface/datatrove' },
          { label: 'Dolma — arXiv:2402.00159', url: 'https://arxiv.org/abs/2402.00159' },
        ],
        fallbacks: [
          {
            label: 'Other large open corpora',
            links: [
              { label: 'RedPajama v2 — Together blog', url: 'https://www.together.ai/blog/redpajama-data-v2' },
              { label: 'C4 / T5 — arXiv:1910.10683', url: 'https://arxiv.org/abs/1910.10683' },
              { label: 'The Stack v2 — arXiv:2402.19173', url: 'https://arxiv.org/abs/2402.19173' },
              { label: 'SemDedup — arXiv:2303.09540', url: 'https://arxiv.org/abs/2303.09540' },
            ],
          },
          {
            label: 'Decontamination & evaluation leakage',
            links: [
              { label: "Don't Make Your LLM a Benchmark Cheater — arXiv:2311.01964", url: 'https://arxiv.org/abs/2311.01964' },
              { label: 'GPT-4 contamination study — arXiv:2311.04850', url: 'https://arxiv.org/abs/2311.04850' },
            ],
          },
        ],
      },
      {
        id: '4-12',
        title: '4.12 Long-Context Engineering',
        hours: '~8–10h',
        why:
          'Context windows are now the product: Gemini 1.5 at 2M tokens, Claude at 1M, GPT-4.1 at 1M. But a long context only matters if the model can use it — RULER/NIAH performance is what ships. Every serious RAG/agent system now lives in long-context land.',
        concept:
          'Positional encodings (RoPE, ALiBi), RoPE base scaling, YaRN, ring / context parallelism, attention sinks, RULER & NIAH diagnostics.',
        focus:
          'Read RoPE + YaRN, run a needle-in-a-haystack sweep on two open models, and skim the Gemini 1.5 tech report for the long-context eval design.',
        primary: [
          { label: 'RoPE — arXiv:2104.09864', url: 'https://arxiv.org/abs/2104.09864' },
          { label: 'YaRN — arXiv:2309.00071', url: 'https://arxiv.org/abs/2309.00071' },
          { label: 'Ring Attention — arXiv:2310.01889', url: 'https://arxiv.org/abs/2310.01889' },
          { label: 'Gemini 1.5 tech report — arXiv:2403.05530', url: 'https://arxiv.org/abs/2403.05530' },
        ],
        fallbacks: [
          {
            label: 'Benchmarks & diagnostics',
            links: [
              { label: 'Needle-in-a-Haystack (gkamradt)', url: 'https://github.com/gkamradt/LLMTest_NeedleInAHaystack' },
              { label: 'RULER — arXiv:2404.06654', url: 'https://arxiv.org/abs/2404.06654' },
              { label: 'LongBench — arXiv:2308.14508', url: 'https://arxiv.org/abs/2308.14508' },
              { label: 'LongRoPE — arXiv:2402.13753', url: 'https://arxiv.org/abs/2402.13753' },
              { label: 'Attention Sinks — arXiv:2309.17453', url: 'https://arxiv.org/abs/2309.17453' },
            ],
          },
        ],
      },
      {
        id: '4-13',
        title: '4.13 Agent Benchmarks & Harnesses',
        hours: '~10–12h',
        why:
          'Computer-use, browser and OS agents are the next interface. If you can ship and eval on GAIA / OSWorld / WebArena, you can ship agents at any lab. These are the benchmarks being optimized by Anthropic computer use, OpenAI Operator and Google Mariner.',
        focus:
          'Skim the four canonical benchmark papers, then actually run Browser-Use or OpenHands on 2–3 tasks and measure success rate.',
        primary: [
          { label: 'GAIA — arXiv:2311.12983', url: 'https://arxiv.org/abs/2311.12983' },
          { label: 'OSWorld — arXiv:2404.07972', url: 'https://arxiv.org/abs/2404.07972' },
          { label: 'WebArena — arXiv:2307.13854', url: 'https://arxiv.org/abs/2307.13854' },
          { label: 'τ-bench — arXiv:2406.12045', url: 'https://arxiv.org/abs/2406.12045' },
        ],
        fallbacks: [
          {
            label: 'Reference harnesses',
            links: [
              { label: 'browser-use/browser-use', url: 'https://github.com/browser-use/browser-use' },
              { label: 'All-Hands-AI/OpenHands', url: 'https://github.com/All-Hands-AI/OpenHands' },
              { label: 'VisualWebArena — arXiv:2401.13649', url: 'https://arxiv.org/abs/2401.13649' },
            ],
          },
          {
            label: 'Lab-built computer-use agents',
            links: [
              { label: 'Anthropic — computer use', url: 'https://www.anthropic.com/news/3-5-models-and-computer-use' },
              { label: 'OpenAI — Operator', url: 'https://openai.com/index/introducing-operator/' },
              { label: 'Google — Project Mariner', url: 'https://deepmind.google/technologies/project-mariner/' },
            ],
          },
        ],
      },
      {
        id: '4-14',
        title: '4.14 Embeddings, Retrieval Infra & Reranking',
        hours: '~10–12h',
        why:
          'Most "RAG doesn\'t work" failures are retrieval-infra failures — wrong embedding model, no reranker, naive chunking. This is where FDE / Applied ML engineers actually spend their time.',
        concept:
          'Embedding model selection (MTEB), fine-tuning embeddings, hybrid search (BM25 + dense), rerankers (cross-encoders, Cohere Rerank, bge-reranker), chunking (semantic, late / contextual retrieval), retrieval evaluation (BEIR, RAGAS, NDCG / MRR).',
        focus:
          'Pick a task, build BM25 + dense hybrid + cross-encoder rerank, evaluate with RAGAS and a small BEIR-style split. Read Anthropic\'s Contextual Retrieval and MTEB.',
        primary: [
          { label: 'Anthropic — Contextual Retrieval', url: 'https://www.anthropic.com/news/contextual-retrieval' },
          { label: 'MTEB leaderboard (HF)', url: 'https://huggingface.co/spaces/mteb/leaderboard' },
          { label: 'BEIR — arXiv:2104.08663', url: 'https://arxiv.org/abs/2104.08663' },
          { label: 'Ragas docs', url: 'https://docs.ragas.io/' },
        ],
        fallbacks: [
          {
            label: 'Embedding models & rerankers',
            links: [
              { label: 'BGE embeddings & rerankers', url: 'https://github.com/FlagOpen/FlagEmbedding' },
              { label: 'Nomic Embed — technical report', url: 'https://blog.nomic.ai/posts/nomic-embed-text-v1' },
              { label: 'Voyage AI — embeddings & rerankers', url: 'https://docs.voyageai.com/' },
              { label: 'Cohere Rerank docs', url: 'https://docs.cohere.com/docs/overview' },
            ],
          },
          {
            label: 'Chunking & hybrid search',
            links: [
              { label: 'Chroma Research — chunking study', url: 'https://research.trychroma.com/evaluating-chunking' },
              { label: 'Late Chunking — arXiv:2409.04701', url: 'https://arxiv.org/abs/2409.04701' },
              { label: 'Pinecone — Hybrid Search guide', url: 'https://docs.pinecone.io/guides/search/hybrid-search' },
              { label: 'Sentence-Transformers docs', url: 'https://www.sbert.net/' },
            ],
          },
          {
            label: 'Vector DB reference',
            links: [
              { label: 'pgvector (Postgres)', url: 'https://github.com/pgvector/pgvector' },
              { label: 'Weaviate docs', url: 'https://weaviate.io/developers/weaviate' },
              { label: 'Qdrant docs', url: 'https://qdrant.tech/documentation/' },
              { label: 'LanceDB docs', url: 'https://lancedb.github.io/lancedb/' },
            ],
          },
        ],
      },
      {
        id: '4-15',
        title: '4.15 Training Recipes & Stability',
        hours: '~10–12h',
        why:
          'Frontier training runs fail for prosaic reasons: loss spikes, exploding logits, bad data mix, lost checkpoints. Knowing the actual recipe (µP, Z-loss, warmup, clipping, data curriculum, resumption) is what separates "studied training" from "shipped a training run".',
        concept:
          'µP / µTransfer for HP transfer, Z-loss for logit stability, gradient clipping, learning-rate warmup + cosine / WSD schedules, data mixing & curriculum, DCP checkpointing.',
        focus:
          'Read µTransfer + OLMo training notes + Chinchilla. Train a small model with FSDP + DCP checkpointing; intentionally induce + recover from a loss spike.',
        primary: [
          { label: 'Chinchilla — arXiv:2203.15556', url: 'https://arxiv.org/abs/2203.15556' },
          { label: 'µP / µTransfer — arXiv:2203.03466', url: 'https://arxiv.org/abs/2203.03466' },
          { label: 'OLMo — arXiv:2402.00838', url: 'https://arxiv.org/abs/2402.00838' },
          { label: 'PaLM — arXiv:2204.02311 (Z-loss, training stability)', url: 'https://arxiv.org/abs/2204.02311' },
        ],
        fallbacks: [
          {
            label: 'Data mixing, curriculum & schedules',
            links: [
              { label: 'DoReMi — arXiv:2305.10429', url: 'https://arxiv.org/abs/2305.10429' },
              { label: 'Warmup-Stable-Decay (WSD) — arXiv:2404.06395', url: 'https://arxiv.org/abs/2404.06395' },
              { label: 'MiniCPM training report', url: 'https://arxiv.org/abs/2404.06395' },
            ],
          },
          {
            label: 'Stability debugging & loss spikes',
            links: [
              { label: 'Gopher — arXiv:2112.11446', url: 'https://arxiv.org/abs/2112.11446' },
              { label: 'OLMo 2 — arXiv:2501.00656', url: 'https://arxiv.org/abs/2501.00656' },
              { label: 'Stas Bekman — 176B training chronicles', url: 'https://github.com/stas00/ml-engineering' },
            ],
          },
          {
            label: 'Checkpointing & observability',
            links: [
              { label: 'PyTorch Distributed Checkpoint (DCP) docs', url: 'https://pytorch.org/docs/stable/distributed.checkpoint.html' },
              { label: 'FSDP tutorial', url: 'https://pytorch.org/tutorials/intermediate/FSDP_tutorial.html' },
              { label: 'Weights & Biases — LLM training guide', url: 'https://docs.wandb.ai/guides/models' },
            ],
          },
        ],
      },
      {
        id: '4-16',
        title: '4.16 Distillation & Rejection Sampling',
        hours: '~8–10h',
        why:
          'Every production-grade small model (Claude Haiku, GPT-4o-mini, Gemini Flash, Llama-3.1-8B) is trained with distillation + rejection sampling from a stronger teacher. This is how frontier labs compress capability into cheap inference.',
        concept:
          'Knowledge distillation (Hinton), sequence-level KD, on-policy distillation, rejection sampling fine-tuning (RSFT), best-of-N → SFT, reward-model-guided data curation.',
        focus:
          'Read Hinton distillation, Llama 2 (rejection sampling section), Zephyr (distilled DPO). Distill a 7B open-source teacher into a 1B student on one task; compare to raw SFT.',
        primary: [
          { label: 'Hinton — Distilling the Knowledge arXiv:1503.02531', url: 'https://arxiv.org/abs/1503.02531' },
          { label: 'Llama 2 — arXiv:2307.09288 (rejection sampling)', url: 'https://arxiv.org/abs/2307.09288' },
          { label: 'Zephyr / distilled DPO — arXiv:2310.16944', url: 'https://arxiv.org/abs/2310.16944' },
          { label: 'On-policy distillation (Google) — arXiv:2306.13649', url: 'https://arxiv.org/abs/2306.13649' },
        ],
        fallbacks: [
          {
            label: 'Rejection sampling & self-training',
            links: [
              { label: 'STaR — arXiv:2203.14465', url: 'https://arxiv.org/abs/2203.14465' },
              { label: 'RFT (Rejection sampling Fine-Tuning) — arXiv:2308.01825', url: 'https://arxiv.org/abs/2308.01825' },
              { label: 'Self-Rewarding LLMs — arXiv:2401.10020', url: 'https://arxiv.org/abs/2401.10020' },
            ],
          },
          {
            label: 'Practical small-model recipes',
            links: [
              { label: 'TinyLlama — arXiv:2401.02385', url: 'https://arxiv.org/abs/2401.02385' },
              { label: 'MiniLLM — arXiv:2306.08543', url: 'https://arxiv.org/abs/2306.08543' },
              { label: 'DistilBERT — arXiv:1910.01108', url: 'https://arxiv.org/abs/1910.01108' },
            ],
          },
        ],
      },
      {
        id: '4-17',
        title: '4.17 Computer-Use & GUI Agents',
        hours: '~8–10h',
        why:
          'Claude Computer Use (Oct 2024) and OpenAI Operator (2025) opened a new agent archetype: models that operate real GUIs via screenshots, mouse, and keyboard. This is now a named evaluation axis at every frontier lab and the next major FDE deployment target.',
        concept:
          'Vision-grounded agent loops, screenshot → action (click/type/scroll), set-of-marks & SeeAct-style grounding, trajectory collection, sandboxing (VMs, browsers), OSWorld / WebArena / VisualWebArena / WebVoyager / AgentBench evaluation.',
        focus:
          'Read Anthropic Computer Use post + OSWorld paper. Build a small browser agent on top of Playwright + a VLM; evaluate on a slice of WebArena.',
        primary: [
          { label: 'Anthropic — Introducing Computer Use', url: 'https://www.anthropic.com/news/3-5-models-and-computer-use' },
          { label: 'OSWorld — arXiv:2404.07972', url: 'https://arxiv.org/abs/2404.07972' },
          { label: 'WebArena — arXiv:2307.13854', url: 'https://arxiv.org/abs/2307.13854' },
          { label: 'SeeAct — arXiv:2401.01614', url: 'https://arxiv.org/abs/2401.01614' },
        ],
        fallbacks: [
          {
            label: 'Benchmarks & datasets',
            links: [
              { label: 'VisualWebArena — arXiv:2401.13649', url: 'https://arxiv.org/abs/2401.13649' },
              { label: 'WebVoyager — arXiv:2401.13919', url: 'https://arxiv.org/abs/2401.13919' },
              { label: 'Mind2Web — arXiv:2306.06070', url: 'https://arxiv.org/abs/2306.06070' },
            ],
          },
          {
            label: 'Frameworks & systems',
            links: [
              { label: 'Anthropic computer-use quickstart repo', url: 'https://github.com/anthropics/anthropic-quickstarts/tree/main/computer-use-demo' },
              { label: 'browser-use', url: 'https://github.com/browser-use/browser-use' },
              { label: 'Playwright docs', url: 'https://playwright.dev/docs/intro' },
              { label: 'OpenAI Operator announcement', url: 'https://openai.com/index/introducing-operator/' },
            ],
          },
        ],
      },
      {
        id: '4-18',
        title: '4.18 Human Data, Labeling Ops & Preference Collection',
        hours: '~8–10h',
        why:
          'Post-training quality is usually bottlenecked by data operations, not model cleverness. Frontier teams live or die on rubric design, annotation quality, disagreement analysis, and preference collection pipelines.',
        concept:
          'Label taxonomies, annotation rubrics, pairwise preference collection, inter-annotator agreement, QA sampling, adversarial data collection, reviewer calibration, data governance, privacy and redaction in human feedback pipelines.',
        focus:
          'Design one annotation rubric, run a small labeling pass, compute agreement, inspect disagreement clusters, and revise the rubric once before trusting the data.',
        primary: [
          { label: 'InstructGPT — arXiv:2203.02155', url: 'https://arxiv.org/abs/2203.02155' },
          { label: 'Anthropic HH-RLHF — arXiv:2204.05862', url: 'https://arxiv.org/abs/2204.05862' },
          { label: 'Scale AI — RLHF overview', url: 'https://scale.com/blog/rlhf' },
          { label: 'Label Studio docs', url: 'https://labelstud.io/guide/' },
        ],
        fallbacks: [
          {
            label: 'Human eval and annotation quality',
            links: [
              { label: 'Snorkel programmatic labeling docs', url: 'https://snorkel.ai/data-centric-ai/' },
              { label: 'Argilla docs', url: 'https://docs.argilla.io/latest/' },
              { label: 'Prodigy annotation docs', url: 'https://prodi.gy/docs/' },
            ],
          },
          {
            label: 'Preference datasets & ops',
            links: [
              { label: 'UltraFeedback', url: 'https://arxiv.org/abs/2310.01377' },
              { label: 'OpenAssistant conversations', url: 'https://huggingface.co/datasets/OpenAssistant/oasst1' },
              { label: 'Data-centric AI resources', url: 'https://dcai.csail.mit.edu/' },
            ],
          },
        ],
      },
      {
        id: '4-19',
        title: '4.19 Vision-Language Grounding, OCR & Document Intelligence',
        hours: '~8–10h',
        why:
          'A large share of real multimodal work is not "image captioning", it is documents, screenshots, GUIs, charts, forms, OCR, and grounding. This is exactly where enterprise AI and computer-use agents meet.',
        concept:
          'OCR pipelines, layout-aware models, grounding, referring expressions, chart understanding, UI/screen understanding, doc VQA, multimodal evals for forms/tables/screenshots.',
        focus:
          'Build one document or screenshot pipeline end-to-end: OCR/layout extraction + VLM answer layer + task-specific evaluation on tables/forms/screens.',
        primary: [
          { label: 'LayoutLMv3 — arXiv:2204.08387', url: 'https://arxiv.org/abs/2204.08387' },
          { label: 'Donut — arXiv:2111.15664', url: 'https://arxiv.org/abs/2111.15664' },
          { label: 'ScreenAI — arXiv:2402.04615', url: 'https://arxiv.org/abs/2402.04615' },
          { label: 'OCR-free document understanding (Nougat) — arXiv:2308.13418', url: 'https://arxiv.org/abs/2308.13418' },
        ],
        fallbacks: [
          {
            label: 'Tools & benchmarks',
            links: [
              { label: 'PaddleOCR', url: 'https://github.com/PaddlePaddle/PaddleOCR' },
              { label: 'DocVQA challenge', url: 'https://www.docvqa.org/' },
              { label: 'ChartQA — arXiv:2203.10244', url: 'https://arxiv.org/abs/2203.10244' },
              { label: 'UI-Vision / screen understanding benchmarks', url: 'https://huggingface.co/papers?q=screen+understanding' },
            ],
          },
          {
            label: 'Grounding & agents',
            links: [
              { label: 'Grounding DINO — arXiv:2303.05499', url: 'https://arxiv.org/abs/2303.05499' },
              { label: 'SEEClick — arXiv:2401.10935', url: 'https://arxiv.org/abs/2401.10935' },
              { label: 'Mind2Web', url: 'https://arxiv.org/abs/2306.06070' },
            ],
          },
        ],
      },
      {
        id: '4-20',
        title: '4.20 Knowledge Graphs & GraphRAG',
        hours: '~8–10h',
        why:
          'Dense retrieval fails on global questions ("What is the overall theme of these 100 documents?") and multi-hop reasoning. Knowledge Graphs combined with LLMs (GraphRAG) solve this and are highly requested in enterprise AI.',
        concept:
          'RDF, property graphs, Cypher/Gremlin, entity/relation extraction via LLMs, ontology design, GraphRAG (Microsoft), community detection (Leiden), vector + graph hybrid search.',
        focus:
          'Read the Microsoft GraphRAG paper. Build a small property graph in Neo4j using an LLM to extract entities, then query it using Cypher generated by an LLM.',
        primary: [
          { label: 'GraphRAG (Microsoft) — arXiv:2404.16130', url: 'https://arxiv.org/abs/2404.16130' },
          { label: 'Neo4j GraphRAG ecosystem', url: 'https://neo4j.com/generative-ai/' },
          { label: 'LlamaIndex Property Graph docs', url: 'https://docs.llamaindex.ai/en/stable/module_guides/indexing/lpg_index_guide/' },
          { label: 'Stanford CS224W — Knowledge Graphs', url: 'https://web.stanford.edu/class/cs224w/' },
        ],
        fallbacks: [
          {
            label: 'Graph databases & query languages',
            links: [
              { label: 'Neo4j Cypher manual', url: 'https://neo4j.com/docs/cypher-manual/current/' },
              { label: 'Amazon Neptune docs', url: 'https://aws.amazon.com/neptune/' },
              { label: 'Apache TinkerPop / Gremlin', url: 'https://tinkerpop.apache.org/' },
            ],
          },
          {
            label: 'Entity extraction & neuro-symbolic',
            links: [
              { label: 'DeepDive / Snorkel (historical context)', url: 'http://deepdive.stanford.edu/' },
              { label: 'KGC (Knowledge Graph Conference) resources', url: 'https://www.knowledgegraph.tech/' },
            ],
          },
        ],
      },
      {
        id: '4-21',
        title: '4.21 Active Learning & Data-Efficient Training',
        hours: '~6–8h',
        why:
          'Labels are the bottleneck. Smart sample selection (active learning, coreset selection) and data-efficient adaptation are what make fine-tuning cheap and labeling budgets survivable. Frontier teams treat "which 10k examples do we label next?" as a first-class problem.',
        concept:
          'Uncertainty sampling, BALD, core-set selection, cluster-based selection, query-by-committee, self-training / pseudo-labeling, curriculum learning, data pruning (influence functions, gradient-based).',
        focus:
          'Read Settles active learning survey + one recent LLM-era data selection paper (e.g., LESS or DsDm). Implement uncertainty + core-set selection on a small classification task and compare label efficiency vs random.',
        primary: [
          { label: 'Settles — Active Learning Literature Survey', url: 'https://burrsettles.com/pub/settles.activelearning.pdf' },
          { label: 'modAL (Python active learning framework)', url: 'https://modal-python.readthedocs.io/en/latest/' },
          { label: 'LESS — Selecting Influential Data for Targeted Instruction Tuning (arXiv:2402.04333)', url: 'https://arxiv.org/abs/2402.04333' },
          { label: 'DsDm — Model-Aware Dataset Selection (arXiv:2401.12926)', url: 'https://arxiv.org/abs/2401.12926' },
        ],
        fallbacks: [
          {
            label: 'Data selection & pruning',
            links: [
              { label: 'Coreset selection for DL — arXiv:1906.11829', url: 'https://arxiv.org/abs/1906.11829' },
              { label: 'Data Pruning via Moving-one-Sample-out (MoSo) — arXiv:2310.14664', url: 'https://arxiv.org/abs/2310.14664' },
              { label: 'Influence functions (Koh & Liang) — arXiv:1703.04730', url: 'https://arxiv.org/abs/1703.04730' },
            ],
          },
          {
            label: 'Self-training & curriculum',
            links: [
              { label: 'Noisy Student — arXiv:1911.04252', url: 'https://arxiv.org/abs/1911.04252' },
              { label: 'Curriculum Learning (Bengio) — ICML 2009', url: 'https://dl.acm.org/doi/10.1145/1553374.1553380' },
              { label: 'Cleanlab docs', url: 'https://docs.cleanlab.ai/' },
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
      {
        id: '5-6',
        title: '5.6 GPU Kernel Ecosystem (Triton, CUTLASS, FA-3)',
        hours: '~12–15h',
        why:
          'Almost every serious open-source speedup in 2024–2026 ships as a Triton / CUTLASS kernel (FlashAttention-3, Liger, ThunderKittens). Reading and writing custom kernels is now table-stakes for systems roles and a hard edge for everyone else.',
        concept:
          'Triton tile programming → CUTLASS GEMM / epilogue → FlashAttention-3 (warp-specialized + FP8) → torch.compile / TorchInductor lowering.',
        focus:
          'Do the first 4 Triton tutorials (vector add, softmax, matmul, fused attention), then read the FA-3 paper and skim CUTLASS 3.x layout.',
        primary: [
          { label: 'Triton tutorials', url: 'https://triton-lang.org/main/getting-started/tutorials/index.html' },
          { label: 'FlashAttention-3 — arXiv:2407.08608', url: 'https://arxiv.org/abs/2407.08608' },
          { label: 'NVIDIA/cutlass', url: 'https://github.com/NVIDIA/cutlass' },
          { label: 'torch.compile / Inductor docs', url: 'https://pytorch.org/docs/stable/torch.compiler.html' },
        ],
        fallbacks: [
          {
            label: 'Production kernel libraries',
            links: [
              { label: 'linkedin/Liger-Kernel', url: 'https://github.com/linkedin/Liger-Kernel' },
              { label: 'HazyResearch/ThunderKittens', url: 'https://github.com/HazyResearch/ThunderKittens' },
              { label: 'ThunderKittens blog', url: 'https://hazyresearch.stanford.edu/blog/2024-05-12-tk' },
              { label: 'Dao-AILab/flash-attention', url: 'https://github.com/Dao-AILab/flash-attention' },
            ],
          },
          {
            label: 'Study groups & videos',
            links: [
              { label: 'gpu-mode/resource-stream', url: 'https://github.com/gpu-mode/resource-stream' },
              { label: 'Umar Jamil — FlashAttention walkthrough', url: 'https://www.youtube.com/watch?v=zy8ChVd_oTM' },
            ],
          },
        ],
      },
      {
        id: '5-7',
        title: '5.7 Accelerators Beyond NVIDIA',
        hours: '~6–8h',
        why:
          'Frontier labs train on TPU (Google/Anthropic), Trainium (Amazon/Anthropic), MI300X (AMD) and serve on Groq / Cerebras / Etched. Being literate in non-NVIDIA stacks is now a requirement for FDE and systems roles.',
        focus:
          'Read the TPU v4 paper for systolic-array intuition, skim AWS Trainium / AMD MI300 / Groq LPU overviews, and understand where each wins (training vs inference, memory bandwidth vs compute).',
        primary: [
          { label: 'TPU v4 — arXiv:2304.01433', url: 'https://arxiv.org/abs/2304.01433' },
          { label: 'TPU v5p / Trillium docs', url: 'https://cloud.google.com/tpu/docs/v5p-training' },
          { label: 'AWS Trainium 2', url: 'https://aws.amazon.com/ai/machine-learning/trainium/' },
          { label: 'AMD Instinct MI300X', url: 'https://www.amd.com/en/products/accelerators/instinct/mi300/mi300x.html' },
        ],
        fallbacks: [
          {
            label: 'Inference-specialized silicon',
            links: [
              { label: 'Groq LPU — technical overview', url: 'https://wow.groq.com/lpu-inference-engine/' },
              { label: 'Cerebras WSE-3', url: 'https://www.cerebras.ai/chip' },
              { label: 'SambaNova RDU', url: 'https://sambanova.ai/technology' },
              { label: 'Etched — Sohu chip', url: 'https://www.etched.com/announcing-etched' },
            ],
          },
          {
            label: 'SemiAnalysis deep dives',
            links: [{ label: 'SemiAnalysis', url: 'https://www.semianalysis.com/' }],
          },
        ],
      },
      {
        id: '5-8',
        title: '5.8 On-Device & Edge AI',
        hours: '~8–10h',
        why:
          'Apple Intelligence, Gemini Nano and phi-4-mini make on-device inference a real product surface. This is distinct from Track 5.5 (compression theory) — it is runtime + OS-integration work: MLX, llama.cpp, Ollama, ExecuTorch, WebLLM.',
        focus:
          'Install and benchmark a 3–7B model locally across llama.cpp + MLX + Ollama. Read Apple Foundation Models + Gemini Nano architecture notes.',
        primary: [
          { label: 'ggerganov/llama.cpp', url: 'https://github.com/ggerganov/llama.cpp' },
          { label: 'ml-explore/mlx', url: 'https://github.com/ml-explore/mlx' },
          { label: 'Apple Intelligence foundation models report', url: 'https://machinelearning.apple.com/research/apple-intelligence-foundation-language-models' },
          { label: 'Gemini Nano (DeepMind)', url: 'https://deepmind.google/technologies/gemini/nano/' },
        ],
        fallbacks: [
          {
            label: 'Small but capable models',
            links: [
              { label: 'phi-4 — arXiv:2412.08905', url: 'https://arxiv.org/abs/2412.08905' },
              { label: 'phi-3 technical report — arXiv:2404.14219', url: 'https://arxiv.org/abs/2404.14219' },
              { label: 'Gemma 3 tech report', url: 'https://ai.google.dev/gemma' },
              { label: 'SmolLM2 (HF)', url: 'https://huggingface.co/blog/smollm' },
            ],
          },
          {
            label: 'Runtimes & tooling',
            links: [
              { label: 'Ollama', url: 'https://ollama.com/' },
              { label: 'mlc-ai/web-llm', url: 'https://github.com/mlc-ai/web-llm' },
              { label: 'PyTorch ExecuTorch', url: 'https://pytorch.org/executorch/stable/index.html' },
            ],
          },
        ],
      },
      {
        id: '5-9',
        title: '5.9 Model Compilers & Graph-Level Optimization',
        hours: '~10–12h',
        why:
          'torch.compile / Inductor / XLA / TVM / TensorRT are where the easy 2–4× performance lives. Every serious ML systems engineer is expected to know fusions, graph capture, dynamic shapes, and how to read IR. This is largely missing from public curricula.',
        concept:
          'Graph capture (torch.fx, torch.export), fusion passes, codegen backends (Inductor, Triton), dynamic shapes & guards, XLA HLO, MLIR, TVM / TensorRT pipelines, ONNX as an IR, inference-time graph optimizations.',
        focus:
          'Read the torch.compile / Inductor paper + Horace He\'s blog + XLA HLO primer. Compile a real model with torch.compile, dump inductor output, identify fusions.',
        primary: [
          { label: 'PyTorch 2 — torch.compile (arXiv:2311.02103)', url: 'https://arxiv.org/abs/2311.02103' },
          { label: 'TorchInductor & Triton codegen (PT blog)', url: 'https://pytorch.org/blog/accelerated-pytorch-2/' },
          { label: 'Horace He — Making Deep Learning Go Brrrr', url: 'https://horace.io/brrr_intro.html' },
          { label: 'TVM docs', url: 'https://tvm.apache.org/docs/' },
        ],
        fallbacks: [
          {
            label: 'Compiler stacks',
            links: [
              { label: 'XLA overview', url: 'https://openxla.org/xla' },
              { label: 'MLIR docs', url: 'https://mlir.llvm.org/' },
              { label: 'TensorRT-LLM', url: 'https://github.com/NVIDIA/TensorRT-LLM' },
              { label: 'ONNX Runtime', url: 'https://onnxruntime.ai/docs/' },
            ],
          },
          {
            label: 'Internals & deep dives',
            links: [
              { label: 'Edward Yang — PyTorch internals', url: 'http://blog.ezyang.com/2019/05/pytorch-internals/' },
              { label: 'Chris Lattner — Compilers for ML (LLVM talk)', url: 'https://www.youtube.com/watch?v=NEJcXwcrf28' },
              { label: 'IREE compiler', url: 'https://iree.dev/' },
            ],
          },
        ],
      },
      {
        id: '5-10',
        title: '5.10 PyTorch Internals, Autograd & Custom Ops',
        hours: '~12–15h',
        why:
          'If you want to work seriously on training, inference, kernels, or debugging, PyTorch cannot just be "the API you call". Frontier and systems roles expect you to understand autograd, dispatch, FX/export, memory layout, and how custom C++/CUDA/Triton ops plug in.',
        concept:
          'Tensor storage/strides, autograd graph & backward formulas, dispatcher / ATen / operators, torch.fx + torch.export, C++ extensions, custom CUDA/Triton ops, profiling, memory allocator behavior, checkpointing and graph breaks.',
        focus:
          'Read PyTorch internals + extension docs. Implement one custom op twice: first in pure PyTorch, then as a custom extension or Triton kernel, and inspect the autograd/profiler trace.',
        primary: [
          { label: 'Edward Yang — PyTorch internals', url: 'http://blog.ezyang.com/2019/05/pytorch-internals/' },
          { label: 'PyTorch autograd mechanics', url: 'https://docs.pytorch.org/docs/stable/notes/autograd.html' },
          { label: 'PyTorch custom C++ and CUDA extensions', url: 'https://docs.pytorch.org/tutorials/advanced/cpp_extension.html' },
          { label: 'torch.fx docs', url: 'https://pytorch.org/docs/stable/fx.html' },
        ],
        fallbacks: [
          {
            label: 'Export / compile / debugging',
            links: [
              { label: 'torch.export docs', url: 'https://pytorch.org/docs/stable/export.html' },
              { label: 'PyTorch profiler docs', url: 'https://pytorch.org/tutorials/recipes/recipes/profiler_recipe.html' },
              { label: 'PyTorch memory management notes', url: 'https://pytorch.org/docs/stable/notes/cuda.html' },
            ],
          },
          {
            label: 'Advanced systems references',
            links: [
              { label: 'Horace He — torch.compile / systems posts', url: 'https://horace.io' },
              { label: 'PyTorch developer notes', url: 'https://github.com/pytorch/pytorch/wiki' },
              { label: 'Triton docs', url: 'https://triton-lang.org/main/index.html' },
            ],
          },
        ],
      },
      {
        id: '5-11',
        title: '5.11 TensorFlow, JAX & XLA Ecosystem',
        hours: '~10–12h',
        why:
          'TensorFlow is no longer the default research stack, but it still matters in production, TFX, TF Serving, Keras, and many legacy teams. JAX/XLA matters because Google/DeepMind frontier work, TPU training, and modern compiler-first ML systems are built around it.',
        concept:
          'TensorFlow eager vs graph mode, tf.function / autograph, Keras training stack, TF Serving / TFX, JAX transformations (jit, vmap, pmap, grad), XLA HLO, TPU-first training, Flax / Optax / Pax-style ecosystems.',
        focus:
          'Do one small model in both TensorFlow/Keras and JAX/Flax. Compare eager vs compiled graphs, then inspect an HLO dump so the compiler path is not a black box.',
        primary: [
          { label: 'TensorFlow guide', url: 'https://www.tensorflow.org/guide' },
          { label: 'Keras guides', url: 'https://keras.io/guides/' },
          { label: 'JAX 101', url: 'https://jax.readthedocs.io/en/latest/jax-101/index.html' },
          { label: 'OpenXLA overview', url: 'https://openxla.org/' },
        ],
        fallbacks: [
          {
            label: 'Production TensorFlow',
            links: [
              { label: 'TFX docs', url: 'https://www.tensorflow.org/tfx' },
              { label: 'TensorFlow Serving', url: 'https://www.tensorflow.org/tfx/guide/serving' },
              { label: 'TensorFlow Recommenders', url: 'https://www.tensorflow.org/recommenders' },
            ],
          },
          {
            label: 'JAX / TPU stacks',
            links: [
              { label: 'Flax docs', url: 'https://flax.readthedocs.io/en/latest/' },
              { label: 'Optax docs', url: 'https://optax.readthedocs.io/en/latest/' },
              { label: 'Google TPU docs', url: 'https://cloud.google.com/tpu/docs' },
              { label: 'MaxText', url: 'https://github.com/AI-Hypercomputer/maxtext' },
            ],
          },
        ],
      },
      {
        id: '5-12',
        title: '5.12 Cluster Networking for ML Systems',
        hours: '~10–12h',
        why:
          'Distributed training bottlenecks are often network bottlenecks. If you do not understand collectives, topology, NVLink, InfiniBand, and RDMA, you cannot reason about why your all-reduce is slow or why MFU collapses at scale.',
        concept:
          'Ring/tree all-reduce, reduce-scatter + all-gather, NCCL internals, PCIe vs NVLink vs NVSwitch, InfiniBand / RoCE / RDMA, cluster topology, oversubscription, collective overlap, failure modes and observability.',
        focus:
          'Read one practical distributed-systems-for-LLMs guide, then profile one multi-GPU or simulated collective path and explain where the communication time goes.',
        primary: [
          { label: 'NCCL developer guide', url: 'https://docs.nvidia.com/deeplearning/nccl/user-guide/docs/index.html' },
          { label: 'GPU MODE — ring attention / communication lectures', url: 'https://github.com/gpu-mode/lectures' },
          { label: 'NVIDIA NVLink / NVSwitch overview', url: 'https://www.nvidia.com/en-us/data-center/nvlink/' },
          { label: 'Meta / PyTorch distributed training networking talks', url: 'https://pytorch.org/blog/' },
        ],
        fallbacks: [
          {
            label: 'Networking background',
            links: [
              { label: 'RDMA aware networks programming guide', url: 'https://docs.nvidia.com/networking/display/rdmaawareprogrammingv17' },
              { label: 'InfiniBand architecture overview', url: 'https://www.nvidia.com/en-us/networking/products/infiniband/' },
              { label: 'Horovod concepts', url: 'https://horovod.readthedocs.io/en/stable/concepts.html' },
            ],
          },
          {
            label: 'Cluster-scale context',
            links: [
              { label: 'Azure ND H100 / IB topology docs', url: 'https://learn.microsoft.com/en-us/azure/virtual-machines/sizes/gpu-accelerated/nd-family' },
              { label: 'Google A3 / networking docs', url: 'https://cloud.google.com/compute/docs/gpus' },
              { label: 'PyTorch distributed overview', url: 'https://pytorch.org/tutorials/beginner/dist_overview.html' },
            ],
          },
        ],
      },
      {
        id: '5-13',
        title: '5.13 TPU Systems, Sharding & Pod-Scale JAX',
        hours: '~8–10h',
        why:
          'JAX is not complete without TPU systems. A lot of Google/DeepMind-scale training assumes TPUs, SPMD sharding, and XLA-first design. If you want real frontier-systems coverage, TPU mental models need to be explicit.',
        concept:
          'TPU architecture basics, SPMD partitioning, pjit / shard_map, mesh definitions, XLA sharding annotations, input pipelines, checkpointing, pod-scale training, MaxText / Pax / T5X style stacks.',
        focus:
          'Take one JAX model, add explicit sharding, inspect HLO/sharding, and trace how it would scale from single host to pod.',
        primary: [
          { label: 'JAX distributed arrays / sharding docs', url: 'https://jax.readthedocs.io/en/latest/notebooks/Distributed_arrays_and_automatic_parallelization.html' },
          { label: 'Google Cloud TPU docs', url: 'https://cloud.google.com/tpu/docs' },
          { label: 'MaxText', url: 'https://github.com/AI-Hypercomputer/maxtext' },
          { label: 'T5X docs', url: 'https://github.com/google-research/t5x' },
        ],
        fallbacks: [
          {
            label: 'Frameworks & practice',
            links: [
              { label: 'PaxML', url: 'https://github.com/google/paxml' },
              { label: 'Flax NNX/linen docs', url: 'https://flax.readthedocs.io/en/latest/' },
              { label: 'OpenXLA tutorials', url: 'https://openxla.org/xla/tutorials' },
            ],
          },
          {
            label: 'Scaling references',
            links: [
              { label: 'Pathways system blog/paper index', url: 'https://blog.google/technology/ai/introducing-pathways-next-generation-ai-architecture/' },
              { label: 'PaLM — training at TPU scale', url: 'https://arxiv.org/abs/2204.02311' },
              { label: 'Gemma / JAX ecosystem examples', url: 'https://ai.google.dev/gemma/docs' },
            ],
          },
        ],
      },
      {
        id: '5-14',
        title: '5.14 Kubernetes, Containers & ML Platform Engineering',
        hours: '~12–15h',
        why:
          'Every production ML system eventually runs on containers orchestrated by Kubernetes. Frontier labs, FDE targets, and every serious MLOps team expect you to be fluent in Docker, K8s, GPU scheduling, and one higher-level platform (Kubeflow / Flyte / Argo / SkyPilot / Ray on K8s). This is the missing link between a training script and a shipped product.',
        concept:
          'Docker images & multi-stage builds, container registries, K8s objects (Pods/Deployments/Jobs/StatefulSets), GPU scheduling + device plugin, node pools + taints, Helm charts, CRDs & operators, ML-specific platforms (Kubeflow, Argo Workflows, Flyte, KServe), training-job schedulers (Kueue, Volcano), cost/quota isolation, SkyPilot / KubeRay for multi-cloud.',
        focus:
          'Containerize a training + inference job, write a minimal Deployment + Service + HPA, then run it via one higher-level platform (Kubeflow Training Operator or KServe). Understand where GPUs, secrets, and storage plug in.',
        primary: [
          { label: 'Kubernetes docs — Concepts', url: 'https://kubernetes.io/docs/concepts/' },
          { label: 'Docker — Get Started', url: 'https://docs.docker.com/get-started/' },
          { label: 'Kubeflow docs', url: 'https://www.kubeflow.org/docs/' },
          { label: 'KServe docs', url: 'https://kserve.github.io/website/' },
        ],
        fallbacks: [
          {
            label: 'Workflow orchestration on K8s',
            links: [
              { label: 'Argo Workflows', url: 'https://argo-workflows.readthedocs.io/en/latest/' },
              { label: 'Flyte docs', url: 'https://docs.flyte.org/en/latest/' },
              { label: 'Kueue (batch scheduling)', url: 'https://kueue.sigs.k8s.io/docs/' },
              { label: 'Volcano scheduler', url: 'https://volcano.sh/en/docs/' },
            ],
          },
          {
            label: 'GPU & cluster runtime',
            links: [
              { label: 'NVIDIA device plugin', url: 'https://github.com/NVIDIA/k8s-device-plugin' },
              { label: 'SkyPilot', url: 'https://skypilot.readthedocs.io/en/latest/' },
              { label: 'KubeRay', url: 'https://docs.ray.io/en/latest/cluster/kubernetes/index.html' },
              { label: 'Helm docs', url: 'https://helm.sh/docs/' },
            ],
          },
          {
            label: 'Reference reading',
            links: [
              { label: 'Kelsey Hightower — Kubernetes The Hard Way', url: 'https://github.com/kelseyhightower/kubernetes-the-hard-way' },
              { label: 'Google SRE book', url: 'https://sre.google/sre-book/table-of-contents/' },
              { label: 'Chip Huyen — Building a GenAI platform', url: 'https://huyenchip.com/2024/07/25/genai-platform.html' },
            ],
          },
        ],
      },
      {
        id: '5-15',
        title: '5.15 Numerical Precision & Mixed-Precision Training',
        hours: '~8–10h',
        why:
          'Frontier training runs live or die on numerical choices: FP32/TF32 vs BF16 vs FP16 vs FP8 vs FP4, loss scaling, master weights, and stochastic rounding. DeepSeek-V3 trained 671B in FP8 because of these details. Getting this wrong gives you silent NaNs, loss spikes, or a 2× slowdown for no reason.',
        concept:
          'IEEE float formats, BF16 vs FP16 range/precision trade-offs, TF32 on Ampere/Hopper, FP8 (E4M3/E5M2) + scaling factors, MXFP8 / MXFP4 microscaling, loss scaling & master weights, stochastic rounding, accumulation precision, Kahan / compensated summation, deterministic training.',
        focus:
          'Read the BF16 + FP8 training papers, then run the same model in FP32 / BF16 / FP8 on a transformer and inspect loss curves, throughput, and activation histograms. Understand why dynamic loss scaling exists.',
        primary: [
          { label: 'NVIDIA — Mixed-Precision Training guide', url: 'https://docs.nvidia.com/deeplearning/performance/mixed-precision-training/index.html' },
          { label: 'Micikevicius — Mixed Precision Training arXiv:1710.03740', url: 'https://arxiv.org/abs/1710.03740' },
          { label: 'FP8 Formats for Deep Learning — arXiv:2209.05433', url: 'https://arxiv.org/abs/2209.05433' },
          { label: 'NVIDIA Transformer Engine docs', url: 'https://docs.nvidia.com/deeplearning/transformer-engine/' },
        ],
        fallbacks: [
          {
            label: 'FP8 / low-precision training',
            links: [
              { label: 'DeepSeek-V3 FP8 training — arXiv:2412.19437', url: 'https://arxiv.org/abs/2412.19437' },
              { label: 'MXFP / OCP Microscaling spec', url: 'https://www.opencompute.org/documents/ocp-microscaling-formats-mx-v1-0-spec-final-pdf' },
              { label: 'Scaling FP8 training to trillion-token LLMs — arXiv:2409.12517', url: 'https://arxiv.org/abs/2409.12517' },
              { label: 'FP8-LM — arXiv:2310.18313', url: 'https://arxiv.org/abs/2310.18313' },
            ],
          },
          {
            label: 'Practice & tooling',
            links: [
              { label: 'PyTorch AMP docs', url: 'https://pytorch.org/docs/stable/amp.html' },
              { label: 'bfloat16 primer (Google)', url: 'https://cloud.google.com/tpu/docs/bfloat16' },
              { label: 'Horace He — float formats overview', url: 'https://horace.io/brrr_intro.html' },
              { label: 'PyTorch deterministic training', url: 'https://pytorch.org/docs/stable/notes/randomness.html' },
            ],
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
  {
    id: 'track-7',
    title: 'Track 7: Frontier Research Topics (2025–2026)',
    blurb:
      'The topics that dominated frontier labs in the last 18 months. Skim survey posts first; then commit to 2–3 areas closest to your target role.',
    topics: [
      {
        id: '7-1',
        title: '7.1 Reasoning & Test-Time Compute',
        hours: '~20–30h',
        why:
          'The o1 / R1 paradigm shifted how labs allocate compute. Verifier-guided search, process reward models and GRPO underpin every reasoning frontier model shipped since 2024.',
        focus:
          "Kickoff with Lilian Weng's why-we-think survey, then pair DeepSeek-R1 and OpenAI's o1 system cards with a GRPO-from-scratch reimplementation.",
        primary: [
          {
            label: 'Lilian Weng — Why We Think',
            url: 'https://lilianweng.github.io/posts/2025-05-01-thinking/',
          },
          { label: 'DeepSeek-R1 — arXiv:2501.12948', url: 'https://arxiv.org/abs/2501.12948' },
          { label: 'OpenAI — Learning to Reason with LLMs (o1)', url: 'https://openai.com/index/learning-to-reason-with-llms/' },
          { label: "Let's Verify Step by Step (PRMs) — arXiv:2305.20050", url: 'https://arxiv.org/abs/2305.20050' },
        ],
        fallbacks: [
          {
            label: 'Surveys',
            links: [
              { label: 'Reasoning LLMs survey — arXiv:2501.09686', url: 'https://arxiv.org/abs/2501.09686' },
              {
                label: 'Sasha Rush — Speculations on Test-Time Compute',
                url: 'https://srush.github.io/awesome-o1/',
              },
            ],
          },
          {
            label: 'Open reimplementations',
            links: [
              { label: 'huggingface/open-r1', url: 'https://github.com/huggingface/open-r1' },
              { label: 'TRL — GRPO trainer', url: 'https://huggingface.co/docs/trl/en/grpo_trainer' },
            ],
          },
        ],
        extras: [
          {
            label: 'Adjacent ideas',
            links: [
              { label: 'Tree of Thoughts — arXiv:2305.10601', url: 'https://arxiv.org/abs/2305.10601' },
              { label: 'Self-Consistency — arXiv:2203.11171', url: 'https://arxiv.org/abs/2203.11171' },
              {
                label: 'Scaling Test-Time Compute — arXiv:2408.03314',
                url: 'https://arxiv.org/abs/2408.03314',
              },
            ],
          },
        ],
      },
      {
        id: '7-2',
        title: '7.2 State Space Models & Long-Context Architectures',
        hours: '~15–20h',
        why:
          'Attention is O(n²) and still the bottleneck. Mamba/Mamba-2 and linear-attention hybrids are the serious architectural challengers; every frontier lab ships a long-context variant.',
        focus:
          'Read Mamba and Mamba-2 end-to-end; compare with sliding-window + attention-sink tricks (StreamingLLM) and ring/context parallelism used in production.',
        primary: [
          { label: 'Mamba — arXiv:2312.00752', url: 'https://arxiv.org/abs/2312.00752' },
          { label: 'Mamba-2 — arXiv:2405.21060', url: 'https://arxiv.org/abs/2405.21060' },
          {
            label: 'Sasha Rush — The Annotated S4',
            url: 'https://srush.github.io/annotated-s4/',
          },
          { label: 'StreamingLLM — arXiv:2309.17453', url: 'https://arxiv.org/abs/2309.17453' },
        ],
        fallbacks: [
          {
            label: 'Long-context training + inference',
            links: [
              { label: 'RingAttention — arXiv:2310.01889', url: 'https://arxiv.org/abs/2310.01889' },
              { label: 'YaRN — arXiv:2309.00071', url: 'https://arxiv.org/abs/2309.00071' },
              { label: 'LongRoPE — arXiv:2402.13753', url: 'https://arxiv.org/abs/2402.13753' },
            ],
          },
          {
            label: 'Linear-attention family',
            links: [
              { label: 'RWKV-7 — arXiv:2503.14456', url: 'https://arxiv.org/abs/2503.14456' },
              { label: 'Hyena — arXiv:2302.10866', url: 'https://arxiv.org/abs/2302.10866' },
              {
                label: 'Maarten Grootendorst — Visual Guide to Mamba',
                url: 'https://newsletter.maartengrootendorst.com/p/a-visual-guide-to-mamba-and-state',
              },
            ],
          },
        ],
      },
      {
        id: '7-3',
        title: '7.3 Mixture of Experts (Deep Dive)',
        hours: '~12–15h',
        why:
          'Every competitive open model since Mixtral is MoE. Routing, load balancing, expert parallelism and MLA (DeepSeek-V3) are what separate a research toy from a shippable 400B+ model.',
        focus:
          'Switch Transformer → Mixtral → DeepSeekMoE → DeepSeek-V3 (MLA + aux-loss-free balancing). Pair with MegaBlocks / GShard for the kernel view.',
        primary: [
          { label: 'Switch Transformer — arXiv:2101.03961', url: 'https://arxiv.org/abs/2101.03961' },
          { label: 'Mixtral of Experts — arXiv:2401.04088', url: 'https://arxiv.org/abs/2401.04088' },
          { label: 'DeepSeekMoE — arXiv:2401.06066', url: 'https://arxiv.org/abs/2401.06066' },
          { label: 'DeepSeek-V3 — arXiv:2412.19437', url: 'https://arxiv.org/abs/2412.19437' },
        ],
        fallbacks: [
          {
            label: 'Systems view',
            links: [
              { label: 'GShard — arXiv:2006.16668', url: 'https://arxiv.org/abs/2006.16668' },
              { label: 'MegaBlocks — arXiv:2211.15841', url: 'https://arxiv.org/abs/2211.15841' },
              {
                label: 'HF — Mixture of Experts Explained',
                url: 'https://huggingface.co/blog/moe',
              },
            ],
          },
        ],
      },
      {
        id: '7-4',
        title: '7.4 Mechanistic Interpretability',
        hours: '~15–20h',
        why:
          "Interpretability is the only credible path to safety and to understanding why a model fails. Anthropic's SAE work is the most replicated interpretability result since 2023.",
        focus:
          "Neel Nanda's 200 concrete problems as an onramp; then Anthropic's SAE + feature-circuits papers; hands-on with TransformerLens on a 1–2 layer model.",
        primary: [
          {
            label: 'Neel Nanda — 200 Concrete Open Problems in Mechanistic Interpretability',
            url: 'https://www.alignmentforum.org/posts/LbrPTJ4fmABEdEnLf/200-concrete-open-problems-in-mechanistic-interpretability',
          },
          {
            label: 'Anthropic — Towards Monosemanticity (SAEs)',
            url: 'https://transformer-circuits.pub/2023/monosemantic-features',
          },
          {
            label: 'Anthropic — Scaling Monosemanticity (Claude 3 Sonnet)',
            url: 'https://transformer-circuits.pub/2024/scaling-monosemanticity/',
          },
          {
            label: 'TransformerLens docs',
            url: 'https://transformerlensorg.github.io/TransformerLens/',
          },
        ],
        fallbacks: [
          {
            label: 'Foundations',
            links: [
              {
                label: 'A Mathematical Framework for Transformer Circuits',
                url: 'https://transformer-circuits.pub/2021/framework/index.html',
              },
              {
                label: 'Anthropic — Toy Models of Superposition',
                url: 'https://transformer-circuits.pub/2022/toy_model/index.html',
              },
              {
                label: 'ARENA 3.0 curriculum',
                url: 'https://arena3-chapter1-transformer-interp.streamlit.app/',
              },
            ],
          },
        ],
      },
      {
        id: '7-5',
        title: '7.5 Synthetic Data & Data Curation',
        hours: '~10–15h',
        why:
          'Data quality beats architecture tweaks. DoReMi / data-mixing laws, FineWeb, Cosmopedia and phi-series show that curation is now a first-class frontier-lab discipline.',
        focus:
          'Read FineWeb and Cosmopedia blogs for the modern recipe; then DoReMi and data-mixing-laws for the theory behind proxy-model reweighting.',
        primary: [
          {
            label: 'HF — FineWeb: 15T tokens of the finest web data',
            url: 'https://huggingface.co/spaces/HuggingFaceFW/blogpost-fineweb-v1',
          },
          {
            label: 'HF — Cosmopedia: how to create large-scale synthetic data',
            url: 'https://huggingface.co/blog/cosmopedia',
          },
          { label: 'DoReMi — arXiv:2305.10429', url: 'https://arxiv.org/abs/2305.10429' },
          { label: 'Textbooks Are All You Need (phi-1) — arXiv:2306.11644', url: 'https://arxiv.org/abs/2306.11644' },
        ],
        fallbacks: [
          {
            label: 'Deeper reading',
            links: [
              { label: 'Data Mixing Laws — arXiv:2403.16952', url: 'https://arxiv.org/abs/2403.16952' },
              {
                label: 'Best Practices and Lessons Learned on Synthetic Data — arXiv:2404.07503',
                url: 'https://arxiv.org/abs/2404.07503',
              },
              {
                label: 'Self-Instruct — arXiv:2212.10560',
                url: 'https://arxiv.org/abs/2212.10560',
              },
            ],
          },
        ],
      },
      {
        id: '7-6',
        title: '7.6 Speculative Decoding & Structured Generation',
        hours: '~8–12h',
        why:
          'Two orthogonal wins over vanilla decode loops: speculative decoding (2–4× throughput at equal quality) and constrained/structured decoding (JSON/schema-valid output without post-hoc parsing).',
        focus:
          "Leviathan's original spec decoding → Medusa → EAGLE-2 for the research arc; Outlines + XGrammar for the structured-output production toolchain.",
        primary: [
          {
            label: 'Fast Inference via Speculative Decoding — arXiv:2211.17192',
            url: 'https://arxiv.org/abs/2211.17192',
          },
          { label: 'Medusa — arXiv:2401.10774', url: 'https://arxiv.org/abs/2401.10774' },
          { label: 'EAGLE-2 — arXiv:2406.16858', url: 'https://arxiv.org/abs/2406.16858' },
          { label: 'dottxt-ai/outlines', url: 'https://github.com/dottxt-ai/outlines' },
        ],
        fallbacks: [
          {
            label: 'Structured decoding',
            links: [
              { label: 'mlc-ai/xgrammar', url: 'https://github.com/mlc-ai/xgrammar' },
              {
                label: 'Efficient Guided Generation — arXiv:2307.09702',
                url: 'https://arxiv.org/abs/2307.09702',
              },
              {
                label: 'guidance-ai/guidance',
                url: 'https://github.com/guidance-ai/guidance',
              },
            ],
          },
        ],
      },
      {
        id: '7-7',
        title: '7.7 AI Safety, Red-Teaming & Adversarial Robustness',
        hours: '~10–12h',
        why:
          'Every production LLM ships with a safety layer. Understanding jailbreaks, prompt injection and evaluation harnesses is baseline competency — and the fastest-growing hiring area at frontier labs.',
        focus:
          "Lilian Weng's adversarial-attacks survey → Simon Willison on prompt injection → GCG + HarmBench for the empirical red-team baseline.",
        primary: [
          {
            label: 'Lilian Weng — Adversarial Attacks on LLMs',
            url: 'https://lilianweng.github.io/posts/2023-10-25-adv-attack-llm/',
          },
          {
            label: 'Simon Willison — Prompt injection archive',
            url: 'https://simonwillison.net/tags/prompt-injection/',
          },
          { label: 'GCG (Universal attacks) — arXiv:2307.15043', url: 'https://arxiv.org/abs/2307.15043' },
          { label: 'HarmBench — arXiv:2402.04249', url: 'https://arxiv.org/abs/2402.04249' },
        ],
        fallbacks: [
          {
            label: 'Policy + defense',
            links: [
              {
                label: 'Anthropic Responsible Scaling Policy',
                url: 'https://www.anthropic.com/news/anthropics-responsible-scaling-policy',
              },
              {
                label: 'OpenAI Preparedness framework',
                url: 'https://openai.com/index/updating-our-preparedness-framework/',
              },
              {
                label: 'NIST AI Risk Management Framework',
                url: 'https://www.nist.gov/itl/ai-risk-management-framework',
              },
            ],
          },
        ],
      },
      {
        id: '7-8',
        title: '7.8 Coding Agents & SWE Benchmarks',
        hours: '~10–15h',
        why:
          'Coding agents are the most commercially validated agent vertical (Cursor, Claude Code, Devin). SWE-bench is the de-facto benchmark and the basis of most 2025 agent papers.',
        focus:
          'SWE-bench & SWE-bench Verified setup → SWE-agent / OpenHands reference harnesses → Anthropic Building Effective Agents for the minimal-scaffolding philosophy.',
        primary: [
          { label: 'SWE-bench — arXiv:2310.06770', url: 'https://arxiv.org/abs/2310.06770' },
          { label: 'SWE-bench leaderboard & docs', url: 'https://www.swebench.com' },
          { label: 'SWE-agent — arXiv:2405.15793', url: 'https://arxiv.org/abs/2405.15793' },
          { label: 'All-Hands-AI/OpenHands', url: 'https://github.com/All-Hands-AI/OpenHands' },
        ],
        fallbacks: [
          {
            label: 'Philosophy + surveys',
            links: [
              {
                label: 'Anthropic — Building Effective Agents',
                url: 'https://www.anthropic.com/engineering/building-effective-agents',
              },
              { label: 'Agentless — arXiv:2407.01489', url: 'https://arxiv.org/abs/2407.01489' },
              { label: 'Aider LLM leaderboard', url: 'https://aider.chat/docs/leaderboards/' },
            ],
          },
        ],
      },
      {
        id: '7-9',
        title: '7.9 Modern RL Post-Training Zoo',
        hours: '~12–15h',
        why:
          'Post-training is where frontier differentiation now lives. DPO is already mainstream; GRPO (DeepSeek), RLOO, KTO, IPO, ORPO and process reward models are the 2025 meta. DeepSeek R1 + o1-style training are direct applications.',
        concept:
          'Preference optimization (DPO/IPO/KTO/ORPO) vs online RL (PPO/RLOO/GRPO/RLVR) vs outcome + process reward models. Reward hacking, verifier-guided training, self-play.',
        focus:
          'Read DPO → GRPO → RLOO → "Let\'s Verify Step by Step", then work through the DeepSeek R1 paper with TRL / OpenRLHF as the reference implementation.',
        primary: [
          { label: 'GRPO — DeepSeekMath arXiv:2402.03300', url: 'https://arxiv.org/abs/2402.03300' },
          { label: 'DeepSeek R1 — arXiv:2501.12948', url: 'https://arxiv.org/abs/2501.12948' },
          { label: "Let's Verify Step by Step — arXiv:2305.20050", url: 'https://arxiv.org/abs/2305.20050' },
          { label: 'OpenAI — Learning to reason with LLMs', url: 'https://openai.com/index/learning-to-reason-with-llms/' },
        ],
        fallbacks: [
          {
            label: 'Preference-optimization variants',
            links: [
              { label: 'RLOO — arXiv:2402.14740', url: 'https://arxiv.org/abs/2402.14740' },
              { label: 'KTO — arXiv:2402.01306', url: 'https://arxiv.org/abs/2402.01306' },
              { label: 'IPO — arXiv:2310.12036', url: 'https://arxiv.org/abs/2310.12036' },
              { label: 'ORPO — arXiv:2403.07691', url: 'https://arxiv.org/abs/2403.07691' },
              { label: 'RLAIF — arXiv:2309.00267', url: 'https://arxiv.org/abs/2309.00267' },
            ],
          },
          {
            label: 'Tooling & surveys',
            links: [
              { label: 'huggingface/trl', url: 'https://github.com/huggingface/trl' },
              { label: 'OpenRLHF/OpenRLHF', url: 'https://github.com/OpenRLHF/OpenRLHF' },
              { label: 'Nathan Lambert — RLHF book', url: 'https://rlhfbook.com/' },
            ],
          },
        ],
      },
      {
        id: '7-10',
        title: '7.10 Robotics & Vision-Language-Action Models',
        hours: '~12–15h',
        why:
          'Physical Intelligence π-0/π-0.5, Figure 02 + Helix, Tesla Optimus, OpenVLA and RT-2 marked the shift to generalist robot foundation models. Robotics is where frontier labs are hiring aggressively in 2026 and where the same RL/multimodal tooling now applies.',
        concept:
          'VLA = Vision–Language–Action policies. Tokenized action spaces, co-training with internet + robot data, diffusion / flow policies, teleoperation datasets (ALOHA, DROID).',
        focus:
          'Read π-0 + OpenVLA + RT-2. Skim Helix and Mobile ALOHA. Clone LeRobot and run one pretrained policy in sim.',
        primary: [
          { label: 'π-0 — arXiv:2410.24164', url: 'https://arxiv.org/abs/2410.24164' },
          { label: 'π-0.5 — Physical Intelligence', url: 'https://www.physicalintelligence.company/blog/pi05' },
          { label: 'OpenVLA — arXiv:2406.09246', url: 'https://arxiv.org/abs/2406.09246' },
          { label: 'RT-2 — arXiv:2307.15818', url: 'https://arxiv.org/abs/2307.15818' },
          { label: 'huggingface/lerobot', url: 'https://github.com/huggingface/lerobot' },
        ],
        fallbacks: [
          {
            label: 'Humanoids & dexterous manipulation',
            links: [
              { label: 'Figure — Helix', url: 'https://www.figure.ai/news/helix' },
              { label: 'Mobile ALOHA — arXiv:2401.02117', url: 'https://arxiv.org/abs/2401.02117' },
              { label: 'DROID dataset — arXiv:2403.12945', url: 'https://arxiv.org/abs/2403.12945' },
              { label: 'SmolVLA (HF)', url: 'https://huggingface.co/blog/smolvla' },
            ],
          },
          {
            label: 'Orientation & context',
            links: [
              { label: 'Chelsea Finn — lab page', url: 'https://ai.stanford.edu/~cbfinn/' },
              { label: 'Sergey Levine — deep RL & robotics', url: 'https://rail.eecs.berkeley.edu/' },
            ],
          },
        ],
      },
      {
        id: '7-11',
        title: '7.11 Speech & Audio Models',
        hours: '~8–10h',
        why:
          'Real-time voice (GPT-4o, Sesame, Moshi) and production ASR/TTS are now core to every assistant product. Audio tokenizers (Encodec, SoundStream) are also the template for multimodal tokenization more broadly.',
        focus:
          'Read Whisper → Encodec / SoundStream → Moshi. Skim Seed-TTS and Sesame. Run Whisper v3 turbo locally on an audio file as a sanity check.',
        primary: [
          { label: 'Whisper — arXiv:2212.04356', url: 'https://arxiv.org/abs/2212.04356' },
          { label: 'openai/whisper', url: 'https://github.com/openai/whisper' },
          { label: 'Moshi — arXiv:2410.00037', url: 'https://arxiv.org/abs/2410.00037' },
          { label: 'OpenAI — GPT-4o announcement', url: 'https://openai.com/index/hello-gpt-4o/' },
        ],
        fallbacks: [
          {
            label: 'Audio tokenizers & TTS',
            links: [
              { label: 'Encodec — arXiv:2210.13438', url: 'https://arxiv.org/abs/2210.13438' },
              { label: 'SoundStream — arXiv:2107.03312', url: 'https://arxiv.org/abs/2107.03312' },
              { label: 'Seed-TTS — arXiv:2406.02430', url: 'https://arxiv.org/abs/2406.02430' },
              { label: 'huggingface/parler-tts', url: 'https://github.com/huggingface/parler-tts' },
            ],
          },
          {
            label: 'Real-time voice systems',
            links: [
              { label: 'Sesame — Crossing the Uncanny Valley of Voice', url: 'https://www.sesame.com/research/crossing_the_uncanny_valley_of_voice' },
              { label: 'ElevenLabs v3 alpha', url: 'https://elevenlabs.io/v3' },
            ],
          },
        ],
      },
      {
        id: '7-12',
        title: '7.12 World Models & Video Generation',
        hours: '~8–10h',
        why:
          'Sora, Veo 3, Genie 2 and V-JEPA 2 reframe video generation as world simulation — the training substrate for embodied agents and robotics. Diffusion transformers (DiT) are the shared backbone of modern video + image systems.',
        focus:
          'Read Sora tech note + DiT + V-JEPA 2, then compare positioning of Veo 3, Genie 2 and Movie Gen.',
        primary: [
          { label: 'Sora — video models as world simulators', url: 'https://openai.com/index/video-generation-models-as-world-simulators/' },
          { label: 'Veo 3 (DeepMind)', url: 'https://deepmind.google/technologies/veo/veo-3/' },
          { label: 'Genie 2 (DeepMind)', url: 'https://deepmind.google/discover/blog/genie-2-a-large-scale-foundation-world-model/' },
          { label: 'V-JEPA 2 (Meta)', url: 'https://ai.meta.com/blog/v-jepa-2-world-model-benchmarks/' },
        ],
        fallbacks: [
          {
            label: 'Foundational video / image gen',
            links: [
              { label: 'DiT — arXiv:2212.09748', url: 'https://arxiv.org/abs/2212.09748' },
              { label: 'Movie Gen (Meta)', url: 'https://ai.meta.com/research/movie-gen/' },
              { label: 'Stable Video Diffusion — arXiv:2311.15127', url: 'https://arxiv.org/abs/2311.15127' },
            ],
          },
          {
            label: 'World-model research perspective',
            links: [
              { label: 'LeCun — A Path Towards Autonomous Machine Intelligence', url: 'https://openreview.net/forum?id=BZ5a1r-kVsf' },
              { label: 'SIMA (DeepMind)', url: 'https://deepmind.google/discover/blog/sima-generalist-ai-agent-for-3d-virtual-environments/' },
            ],
          },
        ],
      },
      {
        id: '7-13',
        title: '7.13 Benchmarks & Eval Methodology',
        hours: '~6–8h',
        why:
          'Reading the leaderboard wrong loses careers. Know the 2026 canonical benches (AIME, GPQA-Diamond, SWE-Bench Verified, ARC-AGI-2, MMLU-Pro, Terminal-Bench, Chatbot Arena) and the contamination / Goodhart failure modes.',
        focus:
          'Skim each primary benchmark paper/page. Read the contamination survey. Understand how Chatbot Arena differs from static benches.',
        primary: [
          { label: 'MMLU-Pro — arXiv:2406.01574', url: 'https://arxiv.org/abs/2406.01574' },
          { label: 'GPQA — arXiv:2311.12022', url: 'https://arxiv.org/abs/2311.12022' },
          { label: 'SWE-Bench Verified (OpenAI)', url: 'https://openai.com/index/introducing-swe-bench-verified/' },
          { label: 'ARC Prize / ARC-AGI-2', url: 'https://arcprize.org/' },
          { label: 'Chatbot Arena — arXiv:2403.04132', url: 'https://arxiv.org/abs/2403.04132' },
        ],
        fallbacks: [
          {
            label: 'Coding / tool-use benches',
            links: [
              { label: 'EvalPlus / HumanEval+ — arXiv:2305.01210', url: 'https://arxiv.org/abs/2305.01210' },
              { label: 'Terminal-Bench', url: 'https://github.com/laude-institute/terminal-bench' },
              { label: 'LiveCodeBench', url: 'https://livecodebench.github.io/' },
              { label: 'BFCL (function calling)', url: 'https://gorilla.cs.berkeley.edu/leaderboard.html' },
            ],
          },
          {
            label: 'Methodology',
            links: [
              { label: 'Stanford HELM', url: 'https://crfm.stanford.edu/helm/' },
              { label: "Don't Make Your LLM a Benchmark Cheater — arXiv:2311.01964", url: 'https://arxiv.org/abs/2311.01964' },
              { label: 'GPT-4 contamination — arXiv:2311.04850', url: 'https://arxiv.org/abs/2311.04850' },
            ],
          },
        ],
      },
      {
        id: '7-14',
        title: '7.14 Model Merging',
        hours: '~4–6h',
        why:
          'SLERP / TIES / DARE / Model Soups are now standard in the open-model workflow — Mixtral, Qwen, Llama fine-tunes are routinely merged before shipping. Low-cost, no-training technique with real wins on the leaderboard.',
        focus:
          'Read Model Soups → TIES → DARE → Sakana evolutionary merging. Merge two Llama-3 fine-tunes with MergeKit and eval on a benchmark.',
        primary: [
          { label: 'Model Soups — arXiv:2203.05482', url: 'https://arxiv.org/abs/2203.05482' },
          { label: 'TIES-Merging — arXiv:2306.01708', url: 'https://arxiv.org/abs/2306.01708' },
          { label: 'DARE — arXiv:2311.03099', url: 'https://arxiv.org/abs/2311.03099' },
          { label: 'arcee-ai/mergekit', url: 'https://github.com/arcee-ai/mergekit' },
        ],
        fallbacks: [
          {
            label: 'Advanced merging & tutorials',
            links: [
              { label: 'Sakana — Evolutionary Model Merging arXiv:2403.13187', url: 'https://arxiv.org/abs/2403.13187' },
              { label: 'Maxime Labonne — Merge LLMs (HF blog)', url: 'https://huggingface.co/blog/mlabonne/merge-models' },
              { label: 'SLERP reference', url: 'https://en.wikipedia.org/wiki/Slerp' },
            ],
          },
        ],
      },
      {
        id: '7-15',
        title: '7.15 Privacy, Safety Institutes & Confidential Compute',
        hours: '~6–8h',
        why:
          'Complements Track 8.10 (enterprise compliance). This is the research-facing side: differential privacy, federated learning, confidential compute (H100 TEE, Apple PCC), and the US/UK safety institutes that now gate frontier model release.',
        focus:
          'Read DP-SGD, McMahan federated learning, Apple Private Cloud Compute write-up, and skim AISI + UK AISI mandates.',
        primary: [
          { label: 'DP-SGD — arXiv:1607.00133', url: 'https://arxiv.org/abs/1607.00133' },
          { label: 'Federated Averaging (McMahan) — arXiv:1602.05629', url: 'https://arxiv.org/abs/1602.05629' },
          { label: 'Apple — Private Cloud Compute', url: 'https://security.apple.com/blog/private-cloud-compute/' },
          { label: 'NVIDIA Confidential Computing (H100)', url: 'https://www.nvidia.com/en-us/data-center/solutions/confidential-computing/' },
        ],
        fallbacks: [
          {
            label: 'Safety institutes & governance',
            links: [
              { label: 'US AI Safety Institute (AISI)', url: 'https://www.nist.gov/aisi' },
              { label: 'UK AI Safety Institute', url: 'https://www.aisi.gov.uk/' },
              { label: 'EU AI Act — overview', url: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai' },
            ],
          },
          {
            label: 'Foundations',
            links: [
              { label: 'Dwork & Roth — Algorithmic Foundations of DP', url: 'https://www.cis.upenn.edu/~aaroth/Papers/privacybook.pdf' },
              { label: 'Google — Federated Learning overview', url: 'https://federated.withgoogle.com/' },
            ],
          },
        ],
      },
      {
        id: '7-16',
        title: '7.16 Reward Modeling',
        hours: '~8–10h',
        why:
          'Reward modeling is half of RLHF/GRPO — and the part that most often secretly fails. Bad rewards silently reward-hack. Every frontier RL post-training pipeline has a reward-model team.',
        concept:
          'Bradley–Terry pairwise preference models, pointwise reward models, reward-model evaluation (RewardBench), process reward models (PRMs), verifier-as-reward, reward hacking, calibration.',
        focus:
          'Read InstructGPT RM section + Helpful/Harmless RM + RewardBench. Train a small RM on UltraFeedback; measure it on RewardBench.',
        primary: [
          { label: 'InstructGPT — arXiv:2203.02155', url: 'https://arxiv.org/abs/2203.02155' },
          { label: 'Anthropic HH-RLHF — arXiv:2204.05862', url: 'https://arxiv.org/abs/2204.05862' },
          { label: 'RewardBench — arXiv:2403.13787', url: 'https://arxiv.org/abs/2403.13787' },
          { label: "Let's Verify Step by Step (PRMs) — arXiv:2305.20050", url: 'https://arxiv.org/abs/2305.20050' },
        ],
        fallbacks: [
          {
            label: 'Reward hacking & failure modes',
            links: [
              { label: 'Scaling Laws for Reward Model Overoptimization — arXiv:2210.10760', url: 'https://arxiv.org/abs/2210.10760' },
              { label: 'Goodhart taxonomy — arXiv:1803.04585', url: 'https://arxiv.org/abs/1803.04585' },
              { label: 'Anthropic — Reward hacking behaviors in LMs', url: 'https://www.anthropic.com/research/specification-gaming' },
            ],
          },
          {
            label: 'Datasets & tooling',
            links: [
              { label: 'UltraFeedback — arXiv:2310.01377', url: 'https://arxiv.org/abs/2310.01377' },
              { label: 'HH-RLHF dataset', url: 'https://huggingface.co/datasets/Anthropic/hh-rlhf' },
              { label: 'allenai/reward-bench', url: 'https://github.com/allenai/reward-bench' },
            ],
          },
        ],
      },
      {
        id: '7-17',
        title: '7.17 Red-Teaming, Capability Evals & Human Eval Design',
        hours: '~8–10h',
        why:
          'Shipping a frontier model now requires dangerous-capability evaluations (CBRN, cyber, autonomy, persuasion) under an RSP/Preparedness regime. Applied teams also need rigorous human eval design — pairwise, Elo, statistical CIs — not just leaderboard screenshots.',
        concept:
          'Adversarial / automated red-teaming, dangerous capability evals, pairwise human eval + Elo/Bradley-Terry, confidence intervals & McNemar on benchmarks, jailbreak evaluation.',
        focus:
          'Read Anthropic RSP + OpenAI Preparedness + Inspect. Run Inspect on a small model for a refusal eval. Read Chatbot Arena paper + Tatsu stats primer for eval rigor.',
        primary: [
          { label: 'UK AISI — Inspect framework', url: 'https://inspect.ai-safety-institute.org.uk/' },
          { label: 'Anthropic — Responsible Scaling Policy', url: 'https://www.anthropic.com/news/anthropics-responsible-scaling-policy' },
          { label: 'OpenAI — Preparedness framework (updated)', url: 'https://openai.com/index/updating-our-preparedness-framework/' },
          { label: 'Chatbot Arena — arXiv:2403.04132', url: 'https://arxiv.org/abs/2403.04132' },
        ],
        fallbacks: [
          {
            label: 'Red-teaming techniques',
            links: [
              { label: 'Red Teaming LMs — arXiv:2202.03286', url: 'https://arxiv.org/abs/2202.03286' },
              { label: 'HarmBench — arXiv:2402.04249', url: 'https://arxiv.org/abs/2402.04249' },
              { label: 'JailbreakBench', url: 'https://jailbreakbench.github.io/' },
              { label: 'PAIR — arXiv:2310.08419', url: 'https://arxiv.org/abs/2310.08419' },
            ],
          },
          {
            label: 'Dangerous capability / autonomy evals',
            links: [
              { label: 'METR — autonomy evals', url: 'https://metr.org/blog/' },
              { label: 'Model evaluations for extreme risks — arXiv:2305.15324', url: 'https://arxiv.org/abs/2305.15324' },
              { label: 'DeepMind — dangerous capability evals', url: 'https://deepmind.google/discover/blog/evaluating-frontier-models-for-dangerous-capabilities/' },
            ],
          },
          {
            label: 'Human eval methodology & statistics',
            links: [
              { label: "Tatsu Hashimoto — LLM eval statistics", url: 'https://crfm.stanford.edu/2024/05/01/helm-mmlu.html' },
              { label: 'Evaluating LLMs is a minefield (tutorial)', url: 'https://www.cs.princeton.edu/~arvindn/talks/evaluating_llms_minefield/' },
            ],
          },
        ],
      },
      {
        id: '7-18',
        title: '7.18 AI for Science (AlphaFold, GNoME, Protein & Materials)',
        hours: '~10–12h',
        why:
          'Nobel-prize-level frontier: AlphaFold-2 / 3, RFdiffusion, ESM, GNoME, MatterGen, Evo. DeepMind, Isomorphic, Anthropic, xAI, and Meta all have active AI-for-science tracks — and these are the clearest "real-world impact" wins in ML right now.',
        concept:
          'Structure prediction (MSA + evoformer), equivariant diffusion for structure generation (RFdiffusion, AlphaFold 3), protein LMs (ESM-2/3), materials generation (GNoME, MatterGen), genomic LMs (Evo), inverse folding (ProteinMPNN).',
        focus:
          'Read AlphaFold 2 Nature paper + AlphaFold 3 Nature paper + RFdiffusion + GNoME. Fold a small protein with ColabFold; run ProteinMPNN inverse-folding on a PDB.',
        primary: [
          { label: 'AlphaFold 2 — Nature 2021', url: 'https://www.nature.com/articles/s41586-021-03819-2' },
          { label: 'AlphaFold 3 — Nature 2024', url: 'https://www.nature.com/articles/s41586-024-07487-w' },
          { label: 'RFdiffusion — Nature 2023', url: 'https://www.nature.com/articles/s41586-023-06415-8' },
          { label: 'GNoME (DeepMind) — Nature 2023', url: 'https://www.nature.com/articles/s41586-023-06735-9' },
        ],
        fallbacks: [
          {
            label: 'Protein models & tools',
            links: [
              { label: 'ESM-2 — Lin et al. Science 2023', url: 'https://www.science.org/doi/10.1126/science.ade2574' },
              { label: 'ProteinMPNN (inverse folding)', url: 'https://www.science.org/doi/10.1126/science.add2187' },
              { label: 'ColabFold', url: 'https://github.com/sokrypton/ColabFold' },
              { label: 'Boltz-1 (open AF3-style)', url: 'https://github.com/jwohlwend/boltz' },
            ],
          },
          {
            label: 'Materials & genomics',
            links: [
              { label: 'MatterGen — arXiv:2312.03687', url: 'https://arxiv.org/abs/2312.03687' },
              { label: 'MACE (equivariant MLP for MD)', url: 'https://arxiv.org/abs/2206.07697' },
              { label: 'Evo (genomic LM) — Science 2024', url: 'https://www.science.org/doi/10.1126/science.ado9336' },
              { label: 'OpenFold', url: 'https://github.com/aqlaboratory/openfold' },
            ],
          },
        ],
      },
      {
        id: '7-19',
        title: '7.19 Continual Learning & Test-Time Training',
        hours: '~6–8h',
        why:
          'Frontier models are expensive to retrain, so "update without forgetting" and "adapt at inference" are active research areas: TTT-style adaptation, in-context RL, model editing (ROME/MEMIT), and continual pretraining. Essential for domain-adapted deployments and for long-context work.',
        concept:
          'Catastrophic forgetting, elastic weight consolidation, replay, continual pretraining, in-context / test-time adaptation, TTT layers (Sun et al. 2024), model editing (ROME, MEMIT), knowledge localization.',
        focus:
          'Read TTT layers + ROME + continual pretraining survey. Try a ROME edit on a small GPT; measure locality vs. generalization.',
        primary: [
          { label: 'Test-Time Training Layers — arXiv:2407.04620', url: 'https://arxiv.org/abs/2407.04620' },
          { label: 'ROME — Locating & Editing Factual Associations (arXiv:2202.05262)', url: 'https://arxiv.org/abs/2202.05262' },
          { label: 'MEMIT — arXiv:2210.07229', url: 'https://arxiv.org/abs/2210.07229' },
          { label: 'Continual Pretraining of LLMs — arXiv:2308.08747', url: 'https://arxiv.org/abs/2308.08747' },
        ],
        fallbacks: [
          {
            label: 'Classical continual learning',
            links: [
              { label: 'EWC — Kirkpatrick et al. (arXiv:1612.00796)', url: 'https://arxiv.org/abs/1612.00796' },
              { label: 'Continual learning survey — arXiv:2302.00487', url: 'https://arxiv.org/abs/2302.00487' },
              { label: 'Avalanche library', url: 'https://avalanche.continualai.org/' },
            ],
          },
          {
            label: 'Test-time adaptation & editing',
            links: [
              { label: 'TENT — arXiv:2006.10726', url: 'https://arxiv.org/abs/2006.10726' },
              { label: 'Model editing survey — arXiv:2305.13172', url: 'https://arxiv.org/abs/2305.13172' },
              { label: 'MEND — arXiv:2110.11309', url: 'https://arxiv.org/abs/2110.11309' },
            ],
          },
        ],
      },
      {
        id: '7-20',
        title: '7.20 Emergent Abilities, Grokking & Phase Transitions',
        hours: '~6–8h',
        why:
          'The "why does scaling work?" research thread: emergent abilities (Wei), grokking (Power), phase transitions, and the Schaeffer critique ("Are Emergent Abilities a Mirage?"). Understanding when and why capabilities appear sharply with scale is foundational for scaling-laws, eval design, and interpretability.',
        concept:
          'Emergent abilities, sharp vs smooth scaling curves, metric-choice confounds (Schaeffer), grokking (delayed generalization), double descent, phase transitions, circuit formation dynamics, training-dynamics lens on capability.',
        focus:
          'Read Wei Emergent Abilities → Schaeffer "Mirage?" → Power Grokking → Nanda Progress Measures. Reproduce a tiny grokking run on modular addition and inspect train/val dynamics.',
        primary: [
          { label: 'Emergent Abilities of LLMs — arXiv:2206.07682', url: 'https://arxiv.org/abs/2206.07682' },
          { label: 'Are Emergent Abilities a Mirage? — arXiv:2304.15004', url: 'https://arxiv.org/abs/2304.15004' },
          { label: 'Grokking — Power et al. arXiv:2201.02177', url: 'https://arxiv.org/abs/2201.02177' },
          { label: 'Nanda — Progress Measures for Grokking via Mech Interp (arXiv:2301.05217)', url: 'https://arxiv.org/abs/2301.05217' },
        ],
        fallbacks: [
          {
            label: 'Double descent & training dynamics',
            links: [
              { label: 'Deep Double Descent — arXiv:1912.02292', url: 'https://arxiv.org/abs/1912.02292' },
              { label: 'Reconciling modern ML practice & classical bias-variance — arXiv:1812.11118', url: 'https://arxiv.org/abs/1812.11118' },
              { label: 'Lottery Ticket Hypothesis — arXiv:1803.03635', url: 'https://arxiv.org/abs/1803.03635' },
            ],
          },
          {
            label: 'Commentary & context',
            links: [
              { label: 'Jason Wei — emergent abilities blog', url: 'https://www.jasonwei.net/blog/emergence' },
              { label: 'Anthropic — Predictability and Surprise in Large Generative Models', url: 'https://arxiv.org/abs/2202.07785' },
              { label: 'Neel Nanda — Grokking walkthrough', url: 'https://www.neelnanda.io/mechanistic-interpretability/modular-addition' },
            ],
          },
        ],
      },
      {
        id: '7-21',
        title: '7.21 In-Context Learning Theory & Induction Heads',
        hours: '~6–8h',
        why:
          'In-context learning is the defining capability of modern LLMs, and induction heads (Olsson/Elhage) are the most concrete mechanism we have for it. Sits at the crossroads of mech interp, scaling laws, and prompt engineering — and shows up in every serious research interview.',
        concept:
          'Induction heads & copy-suppression, ICL = implicit Bayesian inference, ICL ≈ gradient descent (Garg, von Oswald), task vectors, function-class ICL, data distributional properties that cause ICL (burstiness), ICL vs fine-tuning trade-offs.',
        focus:
          'Read Anthropic In-Context Learning and Induction Heads, then one ICL-as-optimization paper (von Oswald or Garg). Trace an induction head pattern on a small model with TransformerLens.',
        primary: [
          { label: 'Anthropic — In-Context Learning and Induction Heads', url: 'https://transformer-circuits.pub/2022/in-context-learning-and-induction-heads/index.html' },
          { label: 'What Learning Algorithm is ICL? (Garg) — arXiv:2211.15661', url: 'https://arxiv.org/abs/2211.15661' },
          { label: 'Transformers Learn In-Context by Gradient Descent — arXiv:2212.07677', url: 'https://arxiv.org/abs/2212.07677' },
          { label: 'An Explanation of In-Context Learning as Implicit Bayesian Inference — arXiv:2111.02080', url: 'https://arxiv.org/abs/2111.02080' },
        ],
        fallbacks: [
          {
            label: 'Data & emergence of ICL',
            links: [
              { label: 'Data Distributional Properties Drive ICL — arXiv:2205.05055', url: 'https://arxiv.org/abs/2205.05055' },
              { label: 'Rethinking the Role of Demonstrations — arXiv:2202.12837', url: 'https://arxiv.org/abs/2202.12837' },
              { label: 'Task Vectors — arXiv:2310.15916', url: 'https://arxiv.org/abs/2310.15916' },
            ],
          },
          {
            label: 'Mech interp of attention',
            links: [
              { label: 'A Mathematical Framework for Transformer Circuits', url: 'https://transformer-circuits.pub/2021/framework/index.html' },
              { label: 'TransformerLens docs', url: 'https://transformerlensorg.github.io/TransformerLens/' },
              { label: 'Copy Suppression Heads — arXiv:2310.04625', url: 'https://arxiv.org/abs/2310.04625' },
            ],
          },
        ],
      },
      {
        id: '7-22',
        title: '7.22 Scaling Laws Deep Dive (Beyond Chinchilla)',
        hours: '~6–8h',
        why:
          'Chinchilla is table stakes. Real frontier decisions use inference-aware scaling (Sardana), data-constrained scaling (Muennighoff), MoE-specific laws, and broken/neural scaling laws. Every pretraining decision — dataset size, model size, over-training ratio — is a scaling-law decision.',
        concept:
          'Kaplan vs Chinchilla, inference-aware / over-training (Sardana), data-constrained scaling (Muennighoff), broken neural scaling laws, MoE scaling (DeepSeek/Clark), transfer/downstream scaling, scaling of emergent metrics, extrapolation pitfalls.',
        focus:
          'Read Kaplan → Chinchilla → Sardana (inference-aware) → Muennighoff (data-constrained). Fit a simple (N, D, L) loss surface on a toy family of models and see which law wins on your setting.',
        primary: [
          { label: 'Kaplan Scaling Laws — arXiv:2001.08361', url: 'https://arxiv.org/abs/2001.08361' },
          { label: 'Chinchilla — arXiv:2203.15556', url: 'https://arxiv.org/abs/2203.15556' },
          { label: 'Beyond Chinchilla-Optimal (Sardana) — arXiv:2401.00448', url: 'https://arxiv.org/abs/2401.00448' },
          { label: 'Scaling Data-Constrained LMs (Muennighoff) — arXiv:2305.16264', url: 'https://arxiv.org/abs/2305.16264' },
        ],
        fallbacks: [
          {
            label: 'Advanced scaling laws',
            links: [
              { label: 'Broken Neural Scaling Laws — arXiv:2210.14891', url: 'https://arxiv.org/abs/2210.14891' },
              { label: 'Scaling Laws for Neural LMs on Downstream Tasks — arXiv:2402.04177', url: 'https://arxiv.org/abs/2402.04177' },
              { label: 'Scaling Laws for Fine-Grained Mixture of Experts — arXiv:2402.07871', url: 'https://arxiv.org/abs/2402.07871' },
              { label: 'Densing Law of LLMs — arXiv:2412.04315', url: 'https://arxiv.org/abs/2412.04315' },
            ],
          },
          {
            label: 'Transfer & context',
            links: [
              { label: 'Scaling Laws for Transfer — arXiv:2102.01293', url: 'https://arxiv.org/abs/2102.01293' },
              { label: 'Scaling Laws for Precision — arXiv:2411.04330', url: 'https://arxiv.org/abs/2411.04330' },
              { label: 'Finbarr Timbers — scaling-laws overview', url: 'https://www.artfintel.com/p/papers-ive-read-this-week-scaling' },
            ],
          },
        ],
      },
      {
        id: '7-23',
        title: '7.23 Alignment Research Agenda (Scalable Oversight & Deceptive Alignment)',
        hours: '~10–12h',
        why:
          "Distinct from 7.7 (adversarial attacks) and 7.17 (capability evals). This is the research agenda frontier alignment teams hire on: how do you supervise a model smarter than you, and how do you detect a model that's optimizing for something other than what you asked? Core reading for Anthropic Alignment, OpenAI (ex-Superalignment), DeepMind AGI Safety.",
        concept:
          'Scalable oversight (debate, market-making, IDA), weak-to-strong generalization, recursive reward modeling, sycophancy & deceptive alignment, mesa-optimization & inner alignment, sleeper agents, constitutional / RLAIF as alignment technique, model organisms of misalignment.',
        focus:
          "Read Christiano IDA + Anthropic Core Views + OpenAI weak-to-strong + Hubinger Sleeper Agents + Risks from Learned Optimization. Skim Irving Debate. Form your own view on which agendas you'd bet on.",
        primary: [
          { label: 'Anthropic — Core Views on AI Safety', url: 'https://www.anthropic.com/news/core-views-on-ai-safety' },
          { label: 'OpenAI — Weak-to-Strong Generalization (arXiv:2312.09390)', url: 'https://arxiv.org/abs/2312.09390' },
          { label: 'Sleeper Agents (Anthropic) — arXiv:2401.05566', url: 'https://arxiv.org/abs/2401.05566' },
          { label: 'Risks from Learned Optimization (Hubinger) — arXiv:1906.01820', url: 'https://arxiv.org/abs/1906.01820' },
        ],
        fallbacks: [
          {
            label: 'Scalable oversight',
            links: [
              { label: 'Christiano — Iterated Distillation & Amplification', url: 'https://ai-alignment.com/iterated-distillation-and-amplification-157debfd1616' },
              { label: 'AI Safety via Debate — arXiv:1805.00899', url: 'https://arxiv.org/abs/1805.00899' },
              { label: 'Measuring Progress on Scalable Oversight — arXiv:2211.03540', url: 'https://arxiv.org/abs/2211.03540' },
              { label: 'Constitutional AI — arXiv:2212.08073', url: 'https://arxiv.org/abs/2212.08073' },
            ],
          },
          {
            label: 'Deception, sycophancy & model organisms',
            links: [
              { label: 'Discovering LM Behaviors with Model-Written Evals — arXiv:2212.09251', url: 'https://arxiv.org/abs/2212.09251' },
              { label: 'Sycophancy in LMs — arXiv:2310.13548', url: 'https://arxiv.org/abs/2310.13548' },
              { label: 'Model Organisms of Misalignment (Anthropic)', url: 'https://www.anthropic.com/research/model-organisms-of-misalignment' },
              { label: 'Alignment Faking in LLMs (Anthropic)', url: 'https://www.anthropic.com/research/alignment-faking' },
            ],
          },
          {
            label: 'Agendas & orientation',
            links: [
              { label: 'AI Alignment Forum', url: 'https://www.alignmentforum.org/' },
              { label: 'DeepMind — Frontier AI Safety Commitments', url: 'https://deepmind.google/discover/blog/an-approach-to-technical-agi-safety/' },
              { label: 'Paul Christiano — research agenda', url: 'https://www.alignmentforum.org/posts/ZeE7EKHTFMBs8eMxn/clarifying-ai-alignment' },
              { label: 'MIRI — agent foundations', url: 'https://intelligence.org/research/' },
            ],
          },
        ],
      },
      {
        id: '7-24',
        title: '7.24 Deep Learning Theory (NTK, Feature Learning & Implicit Bias)',
        hours: '~8–10h',
        why:
          'The theoretical complement to empirical DL. Why do overparameterized nets generalize? How does SGD pick flat minima? When does NTK apply and when does feature learning take over? These are live research directions with papers at every NeurIPS/ICML and show up in research-oriented interviews.',
        concept:
          'Neural Tangent Kernel (NTK) & lazy training, feature-learning regime (µP), implicit bias of SGD (flat minima, margin), loss landscape geometry, mode connectivity, mean-field limits of wide nets, edge of stability, generalization bounds via norm & compression.',
        focus:
          "Read Jacot NTK + Chizat lazy training + Keskar flat minima + Cohen edge of stability. Pair with Yang's µP for the bridge between theory and practice.",
        primary: [
          { label: 'Neural Tangent Kernel (Jacot) — arXiv:1806.07572', url: 'https://arxiv.org/abs/1806.07572' },
          { label: 'Lazy Training in Differentiable Programming (Chizat) — arXiv:1812.07956', url: 'https://arxiv.org/abs/1812.07956' },
          { label: 'Feature Learning in Infinite-Width NNs (µP, Yang) — arXiv:2011.14522', url: 'https://arxiv.org/abs/2011.14522' },
          { label: 'On Large-Batch Training & Flat Minima (Keskar) — arXiv:1609.04836', url: 'https://arxiv.org/abs/1609.04836' },
        ],
        fallbacks: [
          {
            label: 'Loss landscape & optimization dynamics',
            links: [
              { label: 'Edge of Stability (Cohen) — arXiv:2103.00065', url: 'https://arxiv.org/abs/2103.00065' },
              { label: 'Loss Landscapes of Neural Nets (Li) — arXiv:1712.09913', url: 'https://arxiv.org/abs/1712.09913' },
              { label: 'Mode Connectivity — arXiv:1802.10026', url: 'https://arxiv.org/abs/1802.10026' },
              { label: 'Understanding DL Requires Rethinking Generalization — arXiv:1611.03530', url: 'https://arxiv.org/abs/1611.03530' },
            ],
          },
          {
            label: 'Implicit bias & representation learning theory',
            links: [
              { label: 'Implicit Bias of Gradient Descent (Soudry) — arXiv:1710.10345', url: 'https://arxiv.org/abs/1710.10345' },
              { label: 'SGD Implicit Regularization — arXiv:2101.12176', url: 'https://arxiv.org/abs/2101.12176' },
              { label: 'A Theory of Neural Scaling Laws (Bahri) — arXiv:2102.06701', url: 'https://arxiv.org/abs/2102.06701' },
            ],
          },
          {
            label: 'Courses & surveys',
            links: [
              { label: 'Princeton — Theoretical Deep Learning (Arora)', url: 'https://www.cs.princeton.edu/courses/archive/fall19/cos597B/' },
              { label: 'Stanford STATS385 — Theories of DL', url: 'https://stats385.github.io/' },
              { label: 'Roberts & Yaida — Principles of Deep Learning Theory', url: 'https://arxiv.org/abs/2106.10165' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'track-8',
    title: 'Track 8: Forward Deployed Engineer (Frontier Labs)',
    blurb:
      "Skills for FDE roles at Anthropic / OpenAI / Cohere / Mistral / xAI: customer-facing engineers who scope a use case, prototype with the lab's models, and land a production deployment. Heavy on integration, evals and reliability rather than training.",
    topics: [
      {
        id: '8-1',
        title: '8.1 Role, Scoping & Rapid Prototyping',
        hours: '~8–10h',
        why:
          'FDE is a new archetype. Read the job descriptions, Anthropic/OpenAI engineering essays, and the Applied-LLMs playbook so you understand the rhythm: scope → demo → eval → deploy → iterate.',
        focus:
          'Skim 2–3 live FDE postings first; then read Applied-LLMs end-to-end; finish with Anthropic "Building Effective Agents" for the minimal-scaffolding default.',
        primary: [
          {
            label: 'Anthropic — Applied AI (FDE) job family',
            url: 'https://www.anthropic.com/careers#applied-ai',
          },
          { label: 'applied-llms.org (Husain/Frye/Yan/Bensal/Shankar)', url: 'https://applied-llms.org' },
          {
            label: 'Anthropic — Building Effective Agents',
            url: 'https://www.anthropic.com/engineering/building-effective-agents',
          },
          { label: 'Eugene Yan — llm-patterns', url: 'https://eugeneyan.com/writing/llm-patterns/' },
        ],
        fallbacks: [
          {
            label: 'Context for the role',
            links: [
              { label: 'OpenAI — Solutions Engineering roles', url: 'https://openai.com/careers/search/?teams=Engineering' },
              {
                label: 'Chip Huyen — Building a GenAI platform',
                url: 'https://huyenchip.com/2024/07/25/genai-platform.html',
              },
              { label: 'Simon Willison — Things we learned about LLMs in 2024', url: 'https://simonwillison.net/2024/Dec/31/llms-in-2024/' },
            ],
          },
        ],
      },
      {
        id: '8-2',
        title: '8.2 Production API Integration (OpenAI / Anthropic / open models)',
        hours: '~10–15h',
        focus:
          'Know the three SDK surfaces cold: Anthropic Messages + tool_use, OpenAI Responses/Assistants + function calling, and a self-hosted vLLM OpenAI-compatible server. Build the same client twice to internalize the differences.',
        primary: [
          { label: 'Anthropic API — Overview', url: 'https://docs.anthropic.com/en/api/overview' },
          { label: 'Anthropic — Tool use (function calling)', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use' },
          { label: 'OpenAI — Function calling', url: 'https://platform.openai.com/docs/guides/function-calling' },
          { label: 'OpenAI — Responses API', url: 'https://platform.openai.com/docs/guides/responses' },
          { label: 'vLLM — OpenAI-compatible server', url: 'https://docs.vllm.ai/en/latest/serving/openai_compatible_server.html' },
        ],
        fallbacks: [
          {
            label: 'Cookbooks',
            links: [
              { label: 'openai/openai-cookbook', url: 'https://github.com/openai/openai-cookbook' },
              { label: 'anthropics/anthropic-cookbook', url: 'https://github.com/anthropics/anthropic-cookbook' },
              { label: 'cohere-ai/notebooks', url: 'https://github.com/cohere-ai/notebooks' },
            ],
          },
        ],
      },
      {
        id: '8-3',
        title: '8.3 Prompt & Context Engineering in Production',
        hours: '~8–10h',
        focus:
          'Anthropic prompt library → caching and long-context patterns → extended thinking controls → then Willison on prompt injection so you reason defensively from day one.',
        primary: [
          { label: 'Anthropic — Prompt engineering overview', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview' },
          { label: 'Anthropic — Prompt caching', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching' },
          { label: 'Anthropic — Extended thinking', url: 'https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking' },
          { label: 'OpenAI — Prompt engineering guide', url: 'https://platform.openai.com/docs/guides/prompt-engineering' },
        ],
        fallbacks: [
          {
            label: 'Patterns + defense',
            links: [
              { label: 'Simon Willison — prompt injection archive', url: 'https://simonwillison.net/tags/prompt-injection/' },
              { label: 'Lilian Weng — Prompt Engineering', url: 'https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/' },
              { label: 'The Prompt Report — arXiv:2406.06608', url: 'https://arxiv.org/abs/2406.06608' },
            ],
          },
        ],
      },
      {
        id: '8-4',
        title: '8.4 Agent Orchestration, Tools & MCP',
        hours: '~10–15h',
        focus:
          'Start with Anthropic Building Effective Agents for philosophy; implement an MCP server once; then compare at least two orchestrators (OpenAI Agents SDK + LangGraph or PydanticAI) so you can defend a framework choice.',
        primary: [
          { label: 'Model Context Protocol — modelcontextprotocol.io', url: 'https://modelcontextprotocol.io' },
          { label: 'Anthropic — MCP introduction', url: 'https://docs.anthropic.com/en/docs/agents-and-tools/mcp' },
          { label: 'OpenAI — Agents SDK', url: 'https://openai.github.io/openai-agents-python/' },
          { label: 'LangGraph — docs', url: 'https://langchain-ai.github.io/langgraph/' },
        ],
        fallbacks: [
          {
            label: 'Alternative frameworks',
            links: [
              { label: 'PydanticAI', url: 'https://ai.pydantic.dev' },
              { label: 'CrewAI', url: 'https://docs.crewai.com' },
              { label: 'HF smolagents', url: 'https://huggingface.co/docs/smolagents' },
            ],
          },
          {
            label: 'Deeper reading',
            links: [
              {
                label: 'Lilian Weng — LLM Powered Autonomous Agents',
                url: 'https://lilianweng.github.io/posts/2023-06-23-agent/',
              },
              { label: 'Chip Huyen — Agents', url: 'https://huyenchip.com/2025/01/07/agents.html' },
            ],
          },
        ],
      },
      {
        id: '8-5',
        title: '8.5 Custom Evaluation & LLM-as-Judge',
        hours: '~10–12h',
        why:
          'The single most valuable skill an FDE ships for a customer is a domain-specific eval pipeline. Without it, every later decision (model choice, prompt change, fine-tune) is guessing.',
        focus:
          'Hamel full eval playbook → Eugene Yan LLM-as-judge patterns → pick one tool (Braintrust or LangSmith) and run an eval against a real customer-style dataset.',
        primary: [
          { label: 'Hamel Husain — Your AI product needs evals', url: 'https://hamel.dev/blog/posts/evals/' },
          { label: 'Hamel Husain — A Field Guide to Rapidly Improving AI Products', url: 'https://hamel.dev/blog/posts/field-guide/' },
          { label: 'Eugene Yan — LLM-as-Judge', url: 'https://eugeneyan.com/writing/llm-evaluators/' },
          { label: 'Anthropic — Evaluating prompts', url: 'https://docs.anthropic.com/en/docs/test-and-evaluate/eval-tool' },
        ],
        fallbacks: [
          {
            label: 'Eval platforms',
            links: [
              { label: 'Braintrust docs', url: 'https://www.braintrust.dev/docs' },
              { label: 'LangSmith docs', url: 'https://docs.smith.langchain.com' },
              { label: 'Arize Phoenix', url: 'https://docs.arize.com/phoenix' },
              { label: 'HuggingFace evaluation-guidebook', url: 'https://github.com/huggingface/evaluation-guidebook' },
            ],
          },
        ],
      },
      {
        id: '8-6',
        title: '8.6 RAG & Enterprise Retrieval Systems',
        hours: '~10–12h',
        focus:
          'Anthropic contextual retrieval → OpenAI retrieval cookbook → hybrid search in Qdrant/pgvector → evaluate with RAGAS. In enterprise contexts BM25+rerank usually beats pure dense.',
        primary: [
          { label: 'Anthropic — Contextual Retrieval', url: 'https://www.anthropic.com/news/contextual-retrieval' },
          { label: 'OpenAI cookbook — Retrieval', url: 'https://cookbook.openai.com/examples/question_answering_using_embeddings' },
          { label: 'Qdrant — Hybrid queries', url: 'https://qdrant.tech/documentation/concepts/hybrid-queries/' },
          { label: 'RAGAS docs', url: 'https://docs.ragas.io' },
        ],
        fallbacks: [
          {
            label: 'Complementary',
            links: [
              { label: 'pgvector', url: 'https://github.com/pgvector/pgvector' },
              { label: 'LlamaIndex docs', url: 'https://docs.llamaindex.ai' },
              { label: 'Jason Liu — RAG writing', url: 'https://jxnl.co/writing/' },
            ],
          },
        ],
      },
      {
        id: '8-7',
        title: '8.7 Cost, Latency & Reliability Engineering',
        hours: '~8–10h',
        focus:
          'Understand the cost triangle (model size × tokens × retries) before you ship. Caching, batching, streaming, spec decoding, quantization and routing between small/large models are the FDE daily toolbox.',
        primary: [
          { label: 'Anthropic — Prompt caching', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching' },
          { label: 'Anthropic — Batch processing', url: 'https://docs.anthropic.com/en/docs/build-with-claude/batch-processing' },
          {
            label: 'Anyscale — continuous-batching blog',
            url: 'https://www.anyscale.com/blog/continuous-batching-llm-inference',
          },
          {
            label: 'Artificial Analysis — model speed / price benchmarks',
            url: 'https://artificialanalysis.ai',
          },
        ],
        fallbacks: [
          {
            label: 'Deeper',
            links: [
              { label: 'OpenAI — Production best practices', url: 'https://platform.openai.com/docs/guides/production-best-practices' },
              {
                label: 'Lilian Weng — Inference optimization',
                url: 'https://lilianweng.github.io/posts/2023-01-10-inference-optimization/',
              },
              { label: 'vLLM — Performance tuning', url: 'https://docs.vllm.ai/en/latest/performance/optimization.html' },
            ],
          },
        ],
      },
      {
        id: '8-8',
        title: '8.8 Observability, Tracing & Monitoring',
        hours: '~6–8h',
        focus:
          "Pick one stack and be fluent: Langfuse OSS or LangSmith for app traces; OpenTelemetry GenAI conventions for cross-stack; Arize Phoenix for drift / eval regression. Don't ship production without traces.",
        primary: [
          { label: 'Langfuse docs', url: 'https://langfuse.com/docs' },
          { label: 'LangSmith — Tracing', url: 'https://docs.smith.langchain.com/observability' },
          { label: 'OpenTelemetry — GenAI semantic conventions', url: 'https://opentelemetry.io/docs/specs/semconv/gen-ai/' },
          { label: 'Arize Phoenix — Tracing LLM apps', url: 'https://docs.arize.com/phoenix/tracing/llm-traces' },
        ],
        fallbacks: [
          {
            label: 'Patterns',
            links: [
              { label: 'Hamel Husain — Observability', url: 'https://hamel.dev/blog/posts/evals-faq/' },
              {
                label: 'Helicone — LLM observability',
                url: 'https://docs.helicone.ai',
              },
            ],
          },
        ],
      },
      {
        id: '8-9',
        title: '8.9 Fine-Tuning & Customization for Clients',
        hours: '~10–15h',
        focus:
          'Use the existing 4.10 material, but bias toward the three customer-friendly recipes: OpenAI/Anthropic managed fine-tuning, LoRA/QLoRA on open models, and distillation from a larger frontier teacher.',
        primary: [
          { label: 'OpenAI — Fine-tuning guide', url: 'https://platform.openai.com/docs/guides/fine-tuning' },
          { label: 'Anthropic — Fine-tuning Claude (via partners)', url: 'https://www.anthropic.com/news/fine-tune-claude-3-haiku' },
          { label: 'HuggingFace PEFT docs', url: 'https://huggingface.co/docs/peft' },
          {
            label: 'Raschka — Practical Tips for Finetuning LLMs Using LoRA',
            url: 'https://magazine.sebastianraschka.com/p/practical-tips-for-finetuning-llms',
          },
        ],
        fallbacks: [
          {
            label: 'Distillation for deployment',
            links: [
              {
                label: 'HF — Distilling Step-by-Step',
                url: 'https://huggingface.co/blog/distilling-step-by-step',
              },
              { label: 'MiniLLM (reverse KL) — arXiv:2306.08543', url: 'https://arxiv.org/abs/2306.08543' },
            ],
          },
        ],
      },
      {
        id: '8-10',
        title: '8.10 Security, Privacy & Compliance',
        hours: '~8–10h',
        why:
          'Every enterprise deployment dies or ships on this topic. Prompt injection, data exfiltration, PII and (in EU) the AI Act are non-optional FDE literacy.',
        focus:
          'OWASP LLM Top 10 → Willison on exfiltration + prompt injection → NIST AI RMF / EU AI Act summaries so you can answer legal in a room.',
        primary: [
          { label: 'OWASP Top 10 for LLM Applications', url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/' },
          { label: 'Simon Willison — prompt injection archive', url: 'https://simonwillison.net/tags/prompt-injection/' },
          { label: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/itl/ai-risk-management-framework' },
          { label: 'EU AI Act — official overview', url: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai' },
        ],
        fallbacks: [
          {
            label: 'Adjacent',
            links: [
              {
                label: 'Anthropic Responsible Scaling Policy',
                url: 'https://www.anthropic.com/news/anthropics-responsible-scaling-policy',
              },
              {
                label: 'OpenAI Preparedness framework',
                url: 'https://openai.com/index/updating-our-preparedness-framework/',
              },
              { label: 'Microsoft — Responsible AI standard', url: 'https://www.microsoft.com/en-us/ai/responsible-ai' },
            ],
          },
        ],
      },
      {
        id: '8-11',
        title: '8.11 Data Pipelines for LLM Products',
        hours: '~10–12h',
        why:
          'RAG and agent systems live or die on the data pipeline behind them — freshness, permissions, schema changes, PII handling. Every FDE eventually ships Airflow/Dagster DAGs and CDC indexes.',
        concept:
          'Batch orchestration (Airflow, Dagster, Prefect, Temporal) → CDC + streaming (Kafka, Debezium) → lakehouse (Delta / Iceberg) → permission-aware retrieval (row-level ACLs, per-tenant indexes) → PII redaction pipelines.',
        focus:
          'Read Dagster + Temporal docs, skim Iceberg spec, then build a small pipeline: CDC from Postgres → chunk + embed → upsert into pgvector, with per-tenant filters.',
        primary: [
          { label: 'Dagster docs', url: 'https://docs.dagster.io/' },
          { label: 'Temporal docs', url: 'https://docs.temporal.io/' },
          { label: 'Apache Iceberg spec', url: 'https://iceberg.apache.org/spec/' },
          { label: 'Debezium — CDC overview', url: 'https://debezium.io/documentation/reference/stable/architecture.html' },
        ],
        fallbacks: [
          {
            label: 'Orchestration alternatives',
            links: [
              { label: 'Apache Airflow concepts', url: 'https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/index.html' },
              { label: 'Prefect docs', url: 'https://docs.prefect.io/' },
            ],
          },
          {
            label: 'Storage, features & tenancy',
            links: [
              { label: 'Delta Lake docs', url: 'https://docs.delta.io/latest/index.html' },
              { label: 'Feast feature store', url: 'https://docs.feast.dev/' },
              { label: 'Supabase — Row-Level Security', url: 'https://supabase.com/docs/guides/database/postgres/row-level-security' },
              { label: 'Microsoft Presidio (PII redaction)', url: 'https://microsoft.github.io/presidio/' },
            ],
          },
        ],
      },
      {
        id: '8-12',
        title: '8.12 Agent Memory & State',
        hours: '~8–10h',
        why:
          'Agents without persistent memory regress on week 2 of production. Short/long-term memory, episodic vs semantic retrieval, and stateful orchestration are the hard engineering problem underneath every agent demo that "kind of works".',
        concept:
          'Short-term (turn window) vs long-term (episodic + semantic) memory. Vector-only vs vector-plus-graph memory. Stateful orchestration (LangGraph persistence, Temporal workflows).',
        focus:
          'Read MemGPT + Letta, skim LangGraph state persistence, and build a tiny agent with episodic memory retrieval over a growing journal.',
        primary: [
          { label: 'MemGPT — arXiv:2310.08560', url: 'https://arxiv.org/abs/2310.08560' },
          { label: 'Letta (MemGPT production)', url: 'https://docs.letta.com/introduction' },
          { label: 'LangGraph — persistence & memory', url: 'https://langchain-ai.github.io/langgraph/concepts/persistence/' },
          { label: 'Mem0', url: 'https://docs.mem0.ai/overview' },
        ],
        fallbacks: [
          {
            label: 'Graph-augmented memory',
            links: [
              { label: 'GraphRAG (Microsoft) — arXiv:2404.16130', url: 'https://arxiv.org/abs/2404.16130' },
              { label: 'Neo4j GenAI ecosystem', url: 'https://neo4j.com/developer/genai-ecosystem/' },
              { label: 'Zep long-term memory', url: 'https://help.getzep.com/' },
            ],
          },
          {
            label: 'Stateful orchestration',
            links: [
              { label: 'Temporal for agents', url: 'https://temporal.io/blog/what-are-agentic-workflows' },
              { label: 'Inngest — durable workflows', url: 'https://www.inngest.com/docs' },
            ],
          },
        ],
      },
      {
        id: '8-13',
        title: '8.13 Continuous Evals & Eval Pipelines',
        hours: '~8–10h',
        why:
          'One-shot evals are a demo. Production LLM products need continuous evals: trace → label → regression set → CI gate. This is the top reliability lever after retrieval infra.',
        concept:
          'Offline eval sets (golden, synthetic) → online trace capture (OpenTelemetry / OpenLLMetry) → LLM-as-judge with rubric → regression suite in CI → alerting on quality drift.',
        focus:
          'Wire Braintrust or LangSmith on a small agent, then cover it with an Inspect/Promptfoo eval suite run in CI. Read Anthropic\'s evals guide.',
        primary: [
          { label: 'Anthropic — Creating strong empirical evaluations', url: 'https://www.anthropic.com/engineering/writing-evaluations' },
          { label: 'Braintrust docs', url: 'https://www.braintrust.dev/docs' },
          { label: 'LangSmith docs', url: 'https://docs.smith.langchain.com/' },
          { label: 'UK AISI — Inspect', url: 'https://inspect.ai-safety-institute.org.uk/' },
        ],
        fallbacks: [
          {
            label: 'Eval frameworks',
            links: [
              { label: 'Promptfoo docs', url: 'https://www.promptfoo.dev/docs/intro/' },
              { label: 'Arize Phoenix', url: 'https://docs.arize.com/phoenix' },
              { label: 'Ragas docs', url: 'https://docs.ragas.io/' },
              { label: 'OpenAI Evals', url: 'https://github.com/openai/evals' },
            ],
          },
          {
            label: 'LLM-as-judge, carefully',
            links: [
              { label: 'LLM-as-a-Judge (MT-Bench) — arXiv:2306.05685', url: 'https://arxiv.org/abs/2306.05685' },
              { label: 'Hamel Husain — eval playbook', url: 'https://hamel.dev/blog/posts/evals/' },
            ],
          },
          {
            label: 'Tracing standards',
            links: [
              { label: 'OpenTelemetry for GenAI', url: 'https://opentelemetry.io/blog/2024/llm-observability/' },
              { label: 'OpenLLMetry', url: 'https://www.traceloop.com/docs/openllmetry/introduction' },
            ],
          },
        ],
      },
      {
        id: '8-14',
        title: '8.14 Streaming ML & Real-Time Feature Stores',
        hours: '~8–10h',
        why:
          'Production ML rarely stays batch-only — fraud, personalization, search, agent memory, and real-time ranking all need streaming features with fresh data. Feature stores (Feast, Tecton) and stream processors (Kafka, Flink, Spark) are the backbone.',
        concept:
          'Event-driven architecture, Kafka topics/partitions, Flink vs Spark Structured Streaming, exactly-once semantics, online vs offline feature stores, point-in-time correctness, feature freshness SLAs, change data capture (CDC), online feature serving latency budgets.',
        focus:
          'Pick one real-time use case (fraud or personalization). Build a toy feature pipeline: CDC → Kafka → Flink/Spark → Feast online store → model serving. Measure feature freshness end-to-end.',
        primary: [
          { label: 'Feast — Feature Store docs', url: 'https://docs.feast.dev/' },
          { label: 'Tecton — Real-Time ML blog', url: 'https://www.tecton.ai/blog/' },
          { label: 'Apache Kafka docs', url: 'https://kafka.apache.org/documentation/' },
          { label: 'Apache Flink ML docs', url: 'https://nightlies.apache.org/flink/flink-docs-release-1.19/' },
        ],
        fallbacks: [
          {
            label: 'Stream processing',
            links: [
              { label: 'Spark Structured Streaming guide', url: 'https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html' },
              { label: 'Debezium (CDC) docs', url: 'https://debezium.io/documentation/' },
              { label: 'Redpanda (Kafka-compatible)', url: 'https://docs.redpanda.com/' },
            ],
          },
          {
            label: 'Feature store design',
            links: [
              { label: 'Uber Michelangelo (feature store origins)', url: 'https://www.uber.com/en-US/blog/michelangelo-machine-learning-platform/' },
              { label: 'Chip Huyen — Real-time ML challenges', url: 'https://huyenchip.com/2022/01/02/real-time-machine-learning-challenges-and-solutions.html' },
              { label: 'Eugene Yan — Feature stores', url: 'https://eugeneyan.com/writing/feature-stores/' },
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
  practiceAppendices.forEach((a) =>
    a.groups.forEach((g) => g.problems.forEach((p) => p.links.forEach(push)))
  );
  return Array.from(seen.values());
}

export const practiceAppendices: PracticeAppendixData[] = [
  {
    id: 'appendix-f',
    letter: 'F',
    title: 'Coding & DSA Practice',
    blurb:
      "Interview-grade DSA + competitive practice. Frontier labs still test LeetCode-Hard — don't skip this.",
    groups: [
      {
        label: 'Curated problem sets',
        problems: [
          {
            title: 'NeetCode 150 — the standard LeetCode curriculum',
            note: 'Pattern-first: arrays, two pointers, sliding window, stacks, trees, graphs, DP, intervals.',
            links: [{ label: 'NeetCode 150', url: 'https://neetcode.io/practice' }],
          },
          {
            title: 'Blind 75',
            links: [
              {
                label: 'Blind 75 list',
                url: 'https://www.techinterviewhandbook.org/grind75/',
              },
            ],
          },
          {
            title: 'LeetCode company tags — target firms',
            links: [{ label: 'LeetCode', url: 'https://leetcode.com/problemset/' }],
          },
          {
            title: 'Tech Interview Handbook',
            links: [{ label: 'Tech Interview Handbook', url: 'https://www.techinterviewhandbook.org/' }],
          },
        ],
      },
      {
        label: 'Depth & competitive',
        problems: [
          {
            title: 'Codeforces EDU — core algorithmic topics',
            links: [{ label: 'Codeforces EDU', url: 'https://codeforces.com/edu/courses' }],
          },
          {
            title: 'CSES Problem Set — 300 classic problems',
            links: [{ label: 'CSES', url: 'https://cses.fi/problemset/' }],
          },
          {
            title: 'Codeforces Round practice',
            links: [{ label: 'Codeforces', url: 'https://codeforces.com/' }],
          },
          {
            title: 'AlgoExpert / InterviewBit (optional alternatives)',
            links: [
              { label: 'InterviewBit', url: 'https://www.interviewbit.com/practice/' },
              { label: 'AlgoExpert', url: 'https://www.algoexpert.io/' },
            ],
          },
        ],
      },
      {
        label: 'Systems-y coding (lab-flavored)',
        problems: [
          {
            title: 'Design a rate limiter / thread pool / bounded buffer',
            note: 'Common Anthropic / OpenAI onsite questions.',
            links: [
              { label: 'Rate limiter patterns (Stripe blog)', url: 'https://stripe.com/blog/rate-limiters' },
            ],
          },
          {
            title: 'C++/Python concurrency drills',
            links: [
              { label: 'Rachel by the Bay — threading classics', url: 'https://rachelbythebay.com/w/' },
              { label: 'Little Book of Semaphores', url: 'https://greenteapress.com/wp/semaphores/' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'appendix-g',
    letter: 'G',
    title: 'ML-From-Scratch Implementation Drills',
    blurb:
      'Implement, do not just read. Each drill is a weekend; all together they cover the Karpathy → FlashAttention stack.',
    groups: [
      {
        label: 'Karpathy build-ups (do in order)',
        problems: [
          {
            title: 'micrograd — scalar autograd + tiny MLP',
            links: [
              { label: 'karpathy/micrograd', url: 'https://github.com/karpathy/micrograd' },
              { label: 'Karpathy — micrograd video', url: 'https://www.youtube.com/watch?v=VMj-3S1tku0' },
            ],
          },
          {
            title: 'makemore — bigram → MLP → WaveNet → Transformer',
            links: [
              { label: 'karpathy/makemore', url: 'https://github.com/karpathy/makemore' },
              { label: 'Karpathy — Zero to Hero playlist', url: 'https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ' },
            ],
          },
          {
            title: 'nanoGPT — train a 124M GPT on OpenWebText',
            links: [{ label: 'karpathy/nanoGPT', url: 'https://github.com/karpathy/nanoGPT' }],
          },
          {
            title: 'minbpe — BPE tokenizer from scratch',
            links: [{ label: 'karpathy/minbpe', url: 'https://github.com/karpathy/minbpe' }],
          },
          {
            title: 'llm.c — GPT-2 forward + backward in raw C/CUDA',
            links: [{ label: 'karpathy/llm.c', url: 'https://github.com/karpathy/llm.c' }],
          },
        ],
      },
      {
        label: 'Core components from scratch',
        problems: [
          {
            title: 'Implement a transformer (attention, MHA, RoPE, RMSNorm, SwiGLU)',
            links: [
              { label: 'The Annotated Transformer', url: 'https://nlp.seas.harvard.edu/annotated-transformer/' },
              { label: 'Llama 3 reference impl', url: 'https://github.com/meta-llama/llama3' },
            ],
          },
          {
            title: 'Implement LoRA on a pretrained model',
            links: [
              { label: 'LoRA — arXiv:2106.09685', url: 'https://arxiv.org/abs/2106.09685' },
              { label: 'HF PEFT — source', url: 'https://github.com/huggingface/peft' },
            ],
          },
          {
            title: 'Write a Triton attention kernel (naive → tiled)',
            links: [
              { label: 'Triton fused attention tutorial', url: 'https://triton-lang.org/main/getting-started/tutorials/06-fused-attention.html' },
            ],
          },
          {
            title: 'Toy diffusion: 1D Gaussians + tiny U-Net on MNIST',
            links: [
              { label: 'Lilian Weng — Diffusion Models', url: 'https://lilianweng.github.io/posts/2021-07-11-diffusion-models/' },
              { label: 'HF Diffusion Course Unit 1', url: 'https://huggingface.co/learn/diffusion-course/en/unit1/1' },
            ],
          },
        ],
      },
      {
        label: 'RL / post-training drills',
        problems: [
          {
            title: 'PPO on CartPole from scratch',
            links: [
              { label: 'Spinning Up — PPO', url: 'https://spinningup.openai.com/en/latest/algorithms/ppo.html' },
            ],
          },
          {
            title: 'DPO on a small open model',
            links: [
              { label: 'DPO — arXiv:2305.18290', url: 'https://arxiv.org/abs/2305.18290' },
              { label: 'huggingface/trl', url: 'https://github.com/huggingface/trl' },
            ],
          },
          {
            title: 'GRPO reproduction on a math dataset',
            links: [
              { label: 'DeepSeekMath / GRPO — arXiv:2402.03300', url: 'https://arxiv.org/abs/2402.03300' },
              { label: 'OpenRLHF', url: 'https://github.com/OpenRLHF/OpenRLHF' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'appendix-h',
    letter: 'H',
    title: 'ML System Design Problem Bank',
    blurb:
      'Spend 60–90 min per problem: scope, data, model, serving, evals, failure modes. Interviewers grade on the shape of your plan.',
    groups: [
      {
        label: 'Core ML system design',
        problems: [
          {
            title: 'Design YouTube / Netflix recommendations',
            links: [
              { label: 'Chip Huyen — ML Interviews Book', url: 'https://huyenchip.com/ml-interviews-book/' },
            ],
          },
          {
            title: 'Design a feed ranking system (Instagram / Twitter)',
            links: [
              { label: 'Eugene Yan — system design essays', url: 'https://eugeneyan.com/start-here/' },
            ],
          },
          {
            title: 'Design a fraud / abuse detection pipeline',
            links: [
              { label: 'Stripe Radar engineering blog', url: 'https://stripe.com/blog/radar-ai' },
            ],
          },
          {
            title: 'Design an ads click-through rate (CTR) system',
            links: [
              {
                label: 'Alex Xu — ML System Design Interview',
                url: 'https://bytebytego.com/courses/machine-learning-system-design-interview',
              },
            ],
          },
          {
            title: 'Design a search ranker',
            links: [
              { label: 'Grokking the ML Interview (educative)', url: 'https://www.educative.io/courses/grokking-the-machine-learning-interview' },
            ],
          },
        ],
      },
      {
        label: 'LLM / agent system design',
        problems: [
          {
            title: 'Design an enterprise RAG over 10M docs with per-user ACLs',
            note: 'Focus: embedding choice, hybrid search, rerank, freshness, permissions, evals.',
            links: [
              { label: 'Anthropic — Contextual Retrieval', url: 'https://www.anthropic.com/news/contextual-retrieval' },
            ],
          },
          {
            title: 'Design a coding agent (Cursor / Devin-style)',
            links: [
              { label: 'Anthropic — Building Effective Agents', url: 'https://www.anthropic.com/engineering/building-effective-agents' },
            ],
          },
          {
            title: 'Design an LLM inference service at 100k rps',
            note: 'Continuous batching, KV cache, speculative decoding, autoscaling, multi-tenant QoS.',
            links: [
              { label: 'vLLM docs', url: 'https://docs.vllm.ai/en/latest/' },
              { label: 'NVIDIA — LLM serving at scale', url: 'https://developer.nvidia.com/blog/mastering-llm-techniques-inference-optimization/' },
            ],
          },
          {
            title: 'Design an eval system for a shipped agent',
            links: [
              { label: 'Hamel Husain — Evals playbook', url: 'https://hamel.dev/blog/posts/evals/' },
            ],
          },
          {
            title: 'Design a fine-tuning + eval pipeline for a customer',
            links: [{ label: 'Weights & Biases — LLMOps course', url: 'https://www.wandb.courses/courses/training-fine-tuning-LLMs' }],
          },
        ],
      },
      {
        label: 'Frameworks to internalize',
        problems: [
          {
            title: 'Six-step ML system design framework',
            links: [
              { label: 'Chip Huyen — ML System Design (blog)', url: 'https://huyenchip.com/machine-learning-systems-design/toc.html' },
              {
                label: 'Designing ML Systems (book site)',
                url: 'https://huyenchip.com/designing-machine-learning-systems/',
              },
            ],
          },
          {
            title: 'ML System Design interview cheat-sheet',
            links: [
              { label: 'khangich/machine-learning-interview', url: 'https://github.com/khangich/machine-learning-interview' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'appendix-i',
    letter: 'I',
    title: 'Paper Reproductions & Portfolio Projects',
    blurb:
      "You need proof of work. A handful of reproduced papers + one shipped project beats a long resume. Do at least two from each group.",
    groups: [
      {
        label: 'Reproduce a paper (pick 2)',
        problems: [
          {
            title: 'Reproduce nanoGPT speedrun / GPT-2 training',
            links: [
              { label: 'karpathy/nanoGPT', url: 'https://github.com/karpathy/nanoGPT' },
              { label: 'modded-nanogpt (speedrun leaderboard)', url: 'https://github.com/KellerJordan/modded-nanogpt' },
            ],
          },
          {
            title: 'Reproduce Chinchilla scaling laws on a toy budget',
            links: [{ label: 'Chinchilla — arXiv:2203.15556', url: 'https://arxiv.org/abs/2203.15556' }],
          },
          {
            title: 'Reproduce FlashAttention-2 forward pass in Triton',
            links: [
              { label: 'Dao-AILab/flash-attention', url: 'https://github.com/Dao-AILab/flash-attention' },
              { label: 'FlashAttention-2 — arXiv:2307.08691', url: 'https://arxiv.org/abs/2307.08691' },
            ],
          },
          {
            title: 'Reproduce TinyLlama or OLMo end-to-end training',
            links: [
              { label: 'TinyLlama', url: 'https://github.com/jzhang38/TinyLlama' },
              { label: 'allenai/OLMo', url: 'https://github.com/allenai/OLMo' },
            ],
          },
          {
            title: 'Reproduce DPO / GRPO on an open small model',
            links: [
              { label: 'huggingface/trl', url: 'https://github.com/huggingface/trl' },
              { label: 'OpenRLHF', url: 'https://github.com/OpenRLHF/OpenRLHF' },
            ],
          },
        ],
      },
      {
        label: 'Ship a project (pick 2)',
        problems: [
          {
            title: 'Production RAG over your own corpus with evals',
            note: 'Hybrid search, reranker, evals in CI, per-user ACLs. Deploy on Vercel or Fly.',
            links: [
              { label: 'Ragas docs', url: 'https://docs.ragas.io/' },
              { label: 'LangGraph docs', url: 'https://langchain-ai.github.io/langgraph/' },
            ],
          },
          {
            title: 'A custom coding / research agent for your own workflow',
            links: [
              { label: 'All-Hands-AI/OpenHands', url: 'https://github.com/All-Hands-AI/OpenHands' },
              { label: 'browser-use/browser-use', url: 'https://github.com/browser-use/browser-use' },
            ],
          },
          {
            title: 'Fine-tune + evaluate a 3–8B open model for a concrete task',
            links: [
              { label: 'Unsloth docs', url: 'https://docs.unsloth.ai/' },
              { label: 'Axolotl', url: 'https://github.com/axolotl-ai-cloud/axolotl' },
            ],
          },
          {
            title: 'Kaggle competition (CV or NLP track, silver or better)',
            links: [{ label: 'Kaggle', url: 'https://www.kaggle.com/competitions' }],
          },
          {
            title: 'An open-source contribution to vLLM / TRL / Transformers / Triton',
            links: [
              { label: 'vllm-project/vllm', url: 'https://github.com/vllm-project/vllm' },
              { label: 'huggingface/transformers', url: 'https://github.com/huggingface/transformers' },
              { label: 'triton-lang/triton', url: 'https://github.com/triton-lang/triton' },
            ],
          },
        ],
      },
      {
        label: 'Interview take-home archetypes',
        problems: [
          {
            title: 'Anthropic-style take-home — "ship something useful in 4 hours"',
            links: [
              {
                label: 'Anthropic — engineering interview process',
                url: 'https://www.anthropic.com/jobs',
              },
            ],
          },
          {
            title: 'OpenAI / xAI small evals or dataset generation prompt',
            links: [{ label: 'OpenAI — open roles', url: 'https://openai.com/careers/' }],
          },
        ],
      },
    ],
  },
];
