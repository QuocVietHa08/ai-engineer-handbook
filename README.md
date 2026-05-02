<p align="center">
  <img src="./assest/logo2.png" alt="AI Engineer Handbook" width="280" />
</p>

# AI Engineer Handbook

> Free, open learning resource for engineers becoming AI engineers — from foundation model basics to shipping production LLM systems, plus career growth and interview prep.

Maintained by [Edward Ha](https://www.linkedin.com/in/viethadev/), a remote software engineer focused on AI engineering.

**This is a knowledge repo first, codebase second.** The site is just the delivery mechanism — the value is in the [`contents/`](./contents/). Read it on the web, fork it, clone it, print it, learn from it.

Live site: open after running `npm run dev`, or browse the markdown directly in [`contents/`](./contents/).

## Who this is for

- Software engineers transitioning into AI engineering
- Backend / full-stack engineers shipping their first LLM feature
- Self-taught learners who want a structured path instead of scattered blog posts
- Engineers prepping for AI engineer interviews (system design, coding, behavioral)

No PhD required. Working knowledge of programming + APIs is enough to start.

## What's inside

Structured learning path covering the full AI engineering stack. Each topic is a standalone markdown page in [`contents/`](./contents/) — read in order or jump to what you need.

### Foundations
- [ML fundamentals](./contents/ml-fundamentals.md) — core concepts before LLMs
- [LLM fundamentals](./contents/llm-fundamentals.md) — tokens, sampling, embeddings, capabilities + limits
- [Fundamentals overview](./contents/fundamentals.md)

### Working with LLMs
- [Prompt engineering](./contents/prompt-engineering.md) — repeatable, testable prompts
- [Context engineering](./contents/context-engineering.md) — what goes in the context window and why
- [Structured outputs and tools](./contents/structured-outputs-and-tools.md)

### RAG
- [RAG overview](./contents/rag.md)
- [RAG patterns](./contents/rag-patterns/) — basic RAG, hybrid retrieval, agentic RAG, deep search, grounded generation, semantic indexing, retrieval refinement

### Agents
- [AI agents](./contents/ai-agents.md)
- [Agent patterns](./contents/agent-patterns/) — tool calling, ReAct, plan-and-execute, multi-agent, code execution
- [MCP (Model Context Protocol)](./contents/mcp.md)

### Production
- [Production AI systems](./contents/production-ai-systems.md)
- [LLM optimization](./contents/llm-optimization.md)
- [LLM evaluation](./contents/llm-evaluation.md) + [Evaluations](./contents/evaluations.md)
- [LLM deployment](./contents/llm-deployment.md)
- [LLM observability](./contents/llm-observability.md)
- [Fine-tuning](./contents/fine-tuning.md)
- [AI system design](./contents/ai-system-design.md)

### Frameworks
- [Agentic frameworks](./contents/agentic-frameworks.md)
- [Frameworks deep dive](./contents/frameworks/) — LangChain, Mastra, Pydantic AI

## Recommended books

Top 3 must-reads for becoming an AI engineer:

- [AI Engineering](https://www.oreilly.com/library/view/ai-engineering/9781098166298/) — Chip Huyen
- [Designing Machine Learning Systems](https://www.amazon.com/Designing-Machine-Learning-Systems-Production-Ready/dp/1098107969) — Chip Huyen
- [Build a Large Language Model (From Scratch)](https://www.manning.com/books/build-a-large-language-model-from-scratch) — Sebastian Raschka

## Where to keep learning

Sites and blogs worth following:

- [Anthropic blog](https://www.anthropic.com/news) — model capabilities, safety, applied research
- [Anthropic Engineering](https://www.anthropic.com/engineering) — building with Claude, agents, MCP
- [OpenAI blog](https://openai.com/blog) — model releases, applied research
- [LangChain blog](https://blog.langchain.dev/) — RAG patterns, agent tooling, framework deep dives
- [Mastra blog](https://mastra.ai/blog) — TypeScript-first agent framework + patterns
- [Pydantic AI docs](https://ai.pydantic.dev/) — type-safe agents in Python
- [Hugging Face blog](https://huggingface.co/blog) — open models, fine-tuning, evals
- [Chip Huyen's blog](https://huyenchip.com/blog/) — ML systems, AI engineering essays
- [Simon Willison's blog](https://simonwillison.net/) — practical LLM experiments + commentary
- [Latent Space](https://www.latent.space/) — podcast + newsletter on applied AI

## How to use this handbook

**New to AI engineering?** Work top-down: [LLM fundamentals](./contents/llm-fundamentals.md) → [Prompt engineering](./contents/prompt-engineering.md) → [RAG](./contents/rag.md) → [AI agents](./contents/ai-agents.md) → [Production AI systems](./contents/production-ai-systems.md).

**Already shipping?** Jump to specific topics. Production, RAG patterns, and Agent patterns are reference-grade — bookmark and revisit.

Read modes:
- **Browse on GitHub** — markdown renders fine, links work, no setup
- **Clone and read offline** — `git clone` and open `contents/` in any markdown reader

## Repo layout

```
ai-engineer-handbook/
├── contents/              # ← the actual handbook (all knowledge lives here)
│   ├── ai-engineer-guide.md
│   ├── llm-fundamentals.md
│   ├── rag-patterns/
│   ├── agent-patterns/
│   └── ...
├── sidebars.js            # site nav structure
├── src/                   # site theme + custom homepage (Docusaurus)
├── docusaurus.config.js
└── package.json
```

If you only care about the knowledge, you only need [`contents/`](./contents/) and [`sidebars.js`](./sidebars.js).

## Contributing

Knowledge contributions welcome — corrections, new patterns, real-world examples, clearer explanations, broken-link fixes.

1. Fork and clone
2. Branch: `git checkout -b add-xyz-pattern`
3. Edit markdown under [`contents/`](./contents/)
4. New page? Register it in [`sidebars.js`](./sidebars.js)
5. Run `npm run dev`, verify rendering
6. Open PR

Page structure for new patterns:
- Frontmatter (`id`, `title`, `slug`)
- Short intro — when to use this pattern
- Concrete example (code or pseudocode)
- Trade-offs and failure modes
- Cross-links to related pages

Prefer accuracy and concreteness over cleverness. Cite sources when claims are non-obvious.

## License

MIT — free to use, fork, adapt, translate, teach with. Attribution appreciated.

## Connect

- LinkedIn: [viethadev](https://www.linkedin.com/in/viethadev/)
- GitHub: [QuocVietHa08](https://github.com/QuocVietHa08)
- Repo: [QuocVietHa08/ai-engineer-handbook](https://github.com/QuocVietHa08/ai-engineer-handbook)

Star the repo if it helps — keeps it visible to other engineers on the same path.
