---
id: ai-engineer-guide
title: AI Engineer Guide
description: What to learn, how to build, and how to deploy an AI system
slug: /ai-engineer-guide/
---

# AI Engineer Guide

Welcome to the AI Engineer Handbook. This guide is your roadmap for becoming an AI engineer, from first principles through shipping production systems. 

## Who this handbook is for

- Software engineers moving into AI/LLM work
- Backend or full-stack devs wanting to build AI features
- ML practitioners shifting from training to applied LLM systems
- Anyone shipping products powered by foundation models

**Prerequisites:** working knowledge of Python (or any backend language), REST APIs, basic data structures, and Git. Math background is helpful but not required — modern AI engineering is mostly systems work, not model training. 

## What is an AI engineer?

An AI engineer builds products on top of foundation models. The role sits between traditional software engineering and machine learning:

| Role | Primary focus |
|------|---------------|
| Data scientist | Insights from data, experiments, analysis |
| ML engineer | Train, fine-tune, and serve custom models |
| **AI engineer** | **Build applications using pretrained foundation models (LLMs, embeddings, multimodal)** |

You spend most of your time on prompts, retrieval, agent loops, evaluation, latency, cost, and reliability — not on training runs.

## Learning path

Five phases. Move through in order. Each phase builds on the last.

### Phase 1 — Fundamentals
Understand how LLMs work end-to-end: tokens, context windows, sampling, embeddings, transformer basics.
- [AI engineering fundamentals](/fundamentals/)
- [LLM fundamentals](/llm-fundamentals/)

### Phase 2 — Working with models
Learn the craft of getting good output from a model.
- [Prompt engineering](/prompt-engineering/)
- [Context engineering](/context-engineering/)
- [Fine-tuning](/fine-tuning/) — when and when not to

### Phase 3 — Retrieval-Augmented Generation (RAG)
Most production AI systems retrieve before they generate. Master the patterns.
- [RAG overview](/rag/)
- [Basic RAG](/rag-patterns/basic-rag/), [hybrid retrieval](/rag-patterns/hybrid-retrieval/), [agentic RAG](/rag-patterns/agentic-rag/), [deep search](/rag-patterns/deep-search/)

### Phase 4 — Agents and tool use
Move from one-shot prompts to systems that plan, call tools, and act.
- [AI agents](/ai-agents/)
- Patterns: [tool calling](/agent-patterns/tool-calling/), [ReAct loop](/agent-patterns/react-loop/), [plan-and-execute](/agent-patterns/plan-and-execute/), [multi-agent](/agent-patterns/multi-agent-collaboration/), [code execution](/agent-patterns/code-execution/)
- [MCP (Model Context Protocol)](/mcp/) — standard way to expose tools and context

### Phase 5 — Production
The work that separates demos from products.
- [LLM optimization](/llm-optimization/) — latency, cost, caching
- [LLM evaluation](/llm-evaluation/) — offline + online evals
- [LLM deployment](/llm-deployment/) — serving, scaling, fallbacks
- [LLM observability](/llm-observability/) — traces, metrics, debugging

## Core skills

What every AI engineer should be comfortable with:

- **Python + async** — most SDKs are Python-first, streaming needs async
- **API design** — your AI feature is usually an HTTP/streaming endpoint
- **Prompt + context engineering** — repeatable, testable prompts
- **Vector stores** — pgvector, Qdrant, Weaviate, etc.
- **Evaluation** — LLM-as-judge, golden sets, regression tests
- **Observability** — tracing every model call, token + cost accounting
- **Cost + latency thinking** — pick the smallest model that works
- **Security** — prompt injection, data leakage, output validation

## Build projects

Theory sticks once you ship something. Suggested progression:

1. **Chat over your docs** — basic RAG over a small corpus
2. **Structured extraction tool** — pull typed JSON from messy text
3. **Tool-using agent** — single agent with 2–3 tools (search, calculator, custom API)
4. **Eval harness** — golden set + LLM judge for one of the above
5. **Production-ish service** — streaming endpoint, caching, traces, cost dashboard

Each project should be in a public repo with a README describing tradeoffs.

## Deploy and scale

Production AI systems live or die on four axes:

- **Latency** — stream tokens, cache prompts, parallelize tool calls
- **Cost** — route to cheaper models, cache aggressively, batch where possible
- **Reliability** — retries, fallbacks, circuit breakers, structured outputs
- **Trust** — eval before deploy, monitor after, log everything for debugging

See [LLM deployment](/llm-deployment/) and [LLM observability](/llm-observability/) for deeper dives.

## Frameworks

Frameworks accelerate common patterns but lock you into abstractions. Learn the primitives first, then pick a framework.

- [Agentic frameworks overview](/agentic-frameworks/)
- [LangChain](/frameworks/langchain/), [Mastra](/frameworks/mastra/), [Pydantic AI](/frameworks/pydantic-ai/)

## How to use this handbook

- **New to AI?** Start at Phase 1, work through in order.
- **Already shipping?** Jump to the phase you're weakest in.
- **Stuck on a problem?** Search the table of contents — patterns are organized by problem, not by tool.

Keep building. The field moves fast, but the fundamentals — prompts, retrieval, evaluation, observability — stay the same.
