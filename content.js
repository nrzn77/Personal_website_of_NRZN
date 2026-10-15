
window.SITE = {
  name: "Nirjon Mobarak Talukder",
  heroName: "Nirjon Talukder", // shorter version for the giant hero title
  alias: "nrzn77",
  role: "CSE @ IUT — Speech ML · Cross-lingual NLP · Backend",
  tagline: "Making voices vanish, and bringing them back with a key.",
  photo: "assets\\Nirjon_photo.jpeg", // e.g. "assets/me.jpg" — falls back to your initials
  location: "Dhaka, Bangladesh",
  status: "Open to work",
  email: "nirjonmobarak@iut-dhaka.edu",
  resume: "assets/Nirjon_Resume_web.pdf", // e.g. "assets/Nirjon_Resume.pdf"

  links: [
    { label: "GitHub", url: "https://github.com/nrzn77" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/nirjon-mobarak-2a224b2a5/" },
    { label: "Thesis_Report", url: "https://drive.google.com/file/d/1ji3HNK3XK6gP-8CDhgoXLOFDOsHDunsl/view?usp=sharing" },
    { label: "Instagram", url: "https://www.instagram.com/nirj0n/"},
  ],

  ticker: [
    "Restorable speaker anonymization",
    "Conditional invertible neural networks",
    "Cross-lingual EN–BN retrieval",
    "PyTorch · sentence-transformers",
    "Spring Boot · PostgreSQL",
    "Now hunting: the next bounty",
  ],

  bio: [
    "Finished my BSc in Computer Science and Engineering at the Islamic University of Technology. My thesis hides who is speaking without losing what was said, using conditional invertible networks so the original voice can be restored exactly with a key.",
    "I also work on cross-lingual Bangla–English NLP and build backends in Spring Boot and PostgreSQL. I like both the model side and the systems side of the work.",
  ],

  dossier: [
    ["Class", "BSc CSE, IUT (2022 – 2026)"],
    ["CGPA", "3.65 / 4.00"],
    ["Home port", "Dhaka, Bangladesh"],
    ["Weapons", "PyTorch & Spring Boot"],
    ["Last job", "Intern, Walton Hi-Tech"],
    ["Status", "Open to work"],
  ],

  band: [
    { instrument: "Lead", note: "languages", color: "orange", skills: ["Python", "JavaScript", "Java", "C++", "SQL"] },
    { instrument: "Rhythm", note: "ML & NLP", color: "blue", skills: ["PyTorch", "sentence-transformers", "Hugging Face", "spaCy"] },
    { instrument: "Brass", note: "backend & web", color: "yellow", skills: ["Spring Boot", "Node.js", "ReactJS", "Firebase"] },
    { instrument: "Drums", note: "data & tooling", color: "teal", skills: ["PostgreSQL", "MySQL", "Git"] },
  ],

  sessions: [
    {
      title: "Rano",
      episode: "Speak Like a Ghost",
      year: "Thesis",
      kind: "Thesis",
      color: "orange",
      desc: "Restorable speaker anonymization with conditional invertible neural networks. It hides speaker identity while keeping the words and prosody intact, and the original voice can be restored losslessly with a key through the shared inverse weights. Built as a two-stage PyTorch pipeline (an INN condition generator, coupling blocks with RRDB sub-nets, and a consistency + triplet objective) and trained on VCTK and LibriTTS.",
      tags: ["PyTorch", "cINN", "Speech", "Privacy", "VCTK", "LibriTTS"],
      links: [{ label: "GitHub", url: "https://github.com/rafidahmed816/rano-implementation" }],
    },
    {
      title: "Cross-Lingual News Retrieval",
      episode: "Bangla–English Blues",
      year: "EN–BN",
      kind: "NLP",
      color: "blue",
      desc: "A hybrid cross-lingual retrieval engine that combines BM25, LaBSE embeddings and fuzzy matching over 9,800 scraped Bangla and English news articles. It reaches Recall@50 > 0.89, MRR > 0.60, and finds a relevant article in the top 10 for 81.6% of queries.",
      tags: ["BM25", "LaBSE", "sentence-transformers", "IR", "Bangla"],
      links: [{ label: "GitHub", url: "https://github.com/nrzn77/Language_agnostic_data_retrival/tree/Jyoti" }],
    },
    {
      title: "Unbiased",
      episode: "Rumor Hunters",
      
      kind: "AI · Web",
      color: "red",
      desc: "A news-bias detection platform with AI-powered article analysis and an LLM chatbot that checks rumors in real time. Spring Boot backend with OpenAI API integration.",
      tags: ["Spring Boot", "OpenAI API", "LLMs", "React"],
      links: [
        { label: "GitHub", url: "https://github.com/areebuzair/UnBiased" },
        { label: "Demo", url: "https://www.youtube.com/watch?v=3d8XcpvIPxI" },
      ],
    },
    {
      title: "Altruist",
      episode: "Volunteers' Rhapsody",
      
      kind: "Full-stack",
      color: "teal",
      desc: "A full-stack platform connecting NGOs and volunteers, with donation-request workflows, real-time progress tracking and a placeholder payment pipeline. Built on React and Firebase for auth, the real-time database and hosting.",
      tags: ["React", "Firebase", "Realtime DB"],
      links: [
        { label: "GitHub", url: "https://github.com/nrzn77/altruistic" },
        { label: "Demo", url: "https://www.youtube.com/watch?v=CZpSJvk2IbM" },
      ],
    },
  ],

  log: [
    {
      year: "2025",
      
      color: "orange",
      title: "Intern, Walton Hi-Tech Industries PLC",
      place: "Oct – Nov 2025",
      text: "Designed the ER model, data-flow diagrams and SRS for an internal procurement requisition system, then built its CRUD REST APIs in Spring Boot and PostgreSQL.",
    },
    {
      year: "2022",
      
      color: "blue",
      title: "BSc in Computer Science & Engineering",
      place: "Islamic University of Technology",
      text: "2022 – 2026 · CGPA 3.65 / 4.00. Thesis on restorable speaker anonymization.",
    },
    {
      year: "2021",
      
      color: "teal",
      title: "Higher Secondary Certificate",
      place: "Dhaka Residential Model College",
      text: "GPA 5.00 / 5.00.",
    },
    {
      year: "2019",
      
      color: "yellow",
      title: "Secondary School Certificate",
      place: "Dhaka Residential Model College",
      text: "GPA 5.00 / 5.00. Where it started.",
    },
  ],

  bounty: {
    amount: "60,000,000",
    wantedFor: "Making voices vanish, and bringing them back",
    lastSeen: "Islamic University of Technology, Gazipur",
  },
};
