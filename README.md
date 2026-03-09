#  AI News Sender

A multi-agent news pipeline that fetches the latest headlines, summarizes them using AI, and delivers a daily briefing to your email every morning at 9AM IST — automatically.

##  Architecture
```
User
 ↓
newsAgent (Orchestrator)
 ├── fetchLatestNews tool   → fetches headlines from NewsAPI
 ├── summarizerAgent.asTool() → reads articles, writes AI summaries
 └── sendNewsToEmail tool   → delivers briefing via Nodemailer
```

##  Features

- Multi-agent orchestration using `agent.asTool()`
- Fetches top 5 latest headlines via NewsAPI
- AI-powered article summarization (4-5 sentences each)
- Automated daily email delivery at 9AM IST
- GitHub Actions cron job — no server needed

##  Tech Stack

- **OpenAI Agents SDK** (TypeScript)
- **NewsAPI** — headline fetching
- **Nodemailer** — email delivery
- **GitHub Actions** — daily automation

## 📁 Project Structure
```
agent/
└── newsAgent.ts       # orchestrator + summarizer agents
tools/
├── fetchLatestNews.ts # fetches headlines from NewsAPI
└── sendNewsToEmail.ts # sends formatted email
helpers/
└── SendEmail.ts       # nodemailer helper
lib/
└── EmailTransporter.ts
.github/
└── workflows/
    └── daily-news.yml # cron job — runs at 9AM IST
```

##  Setup

### 1. Clone the repo
```bash
git clone https://github.com/athashri-keny/AI-news-sender
cd AI-news-sender
npm install
```

### 2. Create `.env` file
```env
OPENAI_API_KEY=your_openai_key
NEWS_API_KEY=your_newsapi_key
EMAIL_PASS=your_gmail_app_password
```

### 3. Run locally
```bash
npx ts-node agent/newsAgent.ts
```

## ⚙️ GitHub Actions Setup

Add these secrets to your repo (`Settings → Secrets → Actions`):
```
OPENAI_API_KEY
NEWS_API_KEY
EMAIL_PASS
```

The workflow runs automatically every day at 9AM IST via:
```yaml
cron: "30 3 * * *"
```

##  Key Concept — agent.asTool()

Most people build one agent that does everything.
This project uses two agents:

- **newsAgent** — orchestrator, coordinates the full pipeline
- **summarizerAgent** — specialist, only reads and summarizes articles

`summarizerAgent.asTool()` lets the orchestrator call the summarizer like a function and get results back — control never leaves the main agent.

## 📬 Sample Output

Each morning you receive an email like:
```
1. Intel report warns large-scale war 'unlikely' to oust Iran's regime
Summary: A classified U.S. intelligence report finds it unlikely that a 
large-scale war would oust Iran's current regime. The report questions 
whether Iran's opposition has capability to seize power...
URL: https://washingtonpost.com/...
-------------------
```

## 👤 Author

Built by [@Athashri_k](https://x.com/Athashri_k)
