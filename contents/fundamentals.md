---
id: fundamentals
title: AI Engineering Fundamentals
slug: /fundamentals/
---

# AI Engineering Fundamentals

Before building anything, you need a working mental model of how foundation models behave. This page covers the concepts that show up in every design decision — from prompt to deploy.

## What "AI engineering" actually means

AI engineering is the discipline of building products on top of **pretrained foundation models** (LLMs, embedding models, multimodal models). You don't train models from scratch. You don't even fine-tune most of the time. You compose API calls, retrieval, and tool use into systems that solve real problems.

The contrast:

- **ML engineering** — collect data, train models, optimize loss curves.
- **AI engineering** — pick a model, design prompts and context, evaluate outputs, ship to users.

Most of your work is system design, not modeling. Treat the LLM as a stochastic function: input string → output string, with quirks.

## Foundation model basics

Modern LLMs are trained in two main stages:

1. **Pretraining** — predict the next token over trillions of tokens of internet text. Produces a base model with broad knowledge but no instruction-following.
2. **Post-training** — supervised fine-tuning (SFT) on instruction/response pairs, then reinforcement learning from human feedback (RLHF) or similar techniques. Turns the base model into a helpful assistant.

Why this matters: the model's "personality," refusals, and tone come from post-training, not pretraining. Different providers (Anthropic, OpenAI, Google) post-train differently → same prompt yields different vibes.

## Tokens and context windows

Models don't see characters. They see **tokens** — chunks of ~4 characters on average for English. "Hello world" is 2 tokens. Code, JSON, and non-English text use more tokens per character.

Two numbers shape every decision:

- **Context window** — max tokens the model can see at once (e.g., 200K for Claude Sonnet 4.6, 1M for Opus 4.7).
- **Output limit** — max tokens it can generate in one response (usually much smaller than context).

Cost and latency scale with token count. Always count tokens before designing a prompt or RAG pipeline. Use the provider's tokenizer (e.g., `tiktoken`, Anthropic's tokenizer endpoint).

## Sampling and determinism

LLMs are stochastic. Same prompt, run twice, can yield different outputs. Knobs you control:

- **Temperature** — randomness. `0` = most deterministic (still not 100%). `1.0` = creative. Pick based on task: extraction → low, brainstorming → high.
- **Top-p / top-k** — restrict the candidate token pool.
- **Seed** — some providers expose a seed for reproducibility (best-effort, not guaranteed).

Implication: never assume identical output across runs. Test with N samples. Build in retries.

## Embeddings

An embedding is a fixed-size vector representing the meaning of a chunk of text (or image, audio). Similar meaning → similar vectors (cosine similarity).

What they're good for:
- Semantic search and RAG retrieval
- Clustering, deduplication, classification
- Recommendation, similarity matching

What they're **not** good for:
- Reasoning ("is X greater than Y?")
- Anything requiring generation
- Capturing factual correctness — two false statements can have similar embeddings

Treat embeddings as fuzzy similarity, not truth.

## Capabilities and limits

What modern LLMs do well:
- Summarization, rewriting, translation
- Structured extraction (JSON from messy text)
- Code generation and refactoring
- Multi-step reasoning when prompted carefully
- Tool calling — deciding which function to call with what arguments

Where they fail:
- **Hallucination** — confident, fluent, wrong. Especially with niche facts, citations, math.
- **Knowledge cutoff** — training data ends at some date. Anything after is unknown unless retrieved.
- **Long context degradation** — accuracy drops in the middle of very long contexts ("lost in the middle").
- **Determinism** — see above.
- **Self-knowledge** — they don't reliably know what they don't know.

The fix for most of these is system design: retrieval, tools, evals, fallbacks. Not "better prompts."

## Cost and latency mental model

Per-call cost has two sides:

- **Input tokens** — your prompt + system message + retrieved context. Cached input is much cheaper on supported providers.
- **Output tokens** — what the model generates. Usually 3–5x more expensive per token than input.

Latency has two phases:

- **Time to first token (TTFT)** — wait while the model processes input. Scales with input length.
- **Tokens per second (TPS)** — streaming rate after the first token.

Implications:
- Stream responses. Users feel TTFT, not total time.
- Cache long system prompts. Massive cost savings on repeated calls.
- Prefer small models when they work — Haiku before Sonnet, Sonnet before Opus.
- Parallelize independent tool calls.

## Evaluation thinking

You cannot ship LLM features without evals. Eyeballing 5 outputs and shipping = guaranteed regression on the next prompt change.

Minimum viable eval setup:
1. **Golden set** — 20–100 hand-picked input/expected-output pairs covering the main shapes of input.
2. **Automated check** — exact match, regex, JSON schema, or LLM-as-judge.
3. **Run on every prompt or model change** — track pass rate over time.

Production evals add: live sampling, user feedback signals, drift detection. See [LLM evaluation](/llm-evaluation/) for depth.

## Safety and failure modes

You inherit a security surface the moment you accept user input into a prompt:

- **Prompt injection** — attacker text in user input or retrieved docs hijacks instructions. Treat retrieved content as untrusted.
- **Data leakage** — model surfaces training data, or your system prompt leaks via "ignore previous instructions."
- **Jailbreaks** — bypass safety post-training via roleplay, encoding tricks, etc.
- **PII** — never send sensitive data to a model unless your contract allows it.
- **Output validation** — never `eval()` model output, never trust generated SQL without parameterization.

Defense is layered: input filtering, structured outputs, output validation, sandboxed tool execution, audit logs.

## What to learn next

Once these fundamentals click, move into the craft:

- [LLM fundamentals](/llm-fundamentals/) — deeper dive into transformer internals
- [Prompt engineering](/prompt-engineering/) — repeatable prompts that survive model upgrades
- [Context engineering](/context-engineering/) — what to put in the context window and why
- [RAG](/rag/) — retrieval before generation
- [AI agents](/ai-agents/) — multi-step systems with tool use
- [LLM evaluation](/llm-evaluation/) — how to know your system actually works

The fundamentals don't change much. The tooling does. Keep your mental model sharp and the rest follows.
