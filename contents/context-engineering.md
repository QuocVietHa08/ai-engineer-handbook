---
id: context-engineering
title: Context Engineering
slug: /context-engineering/
---

# Context Engineering

Context engineering is the discipline of deciding **what information enters the model context, in what order, at what size, and under what rules**.

Prompt engineering is how you ask. Context engineering is what the model gets to see before it answers: instructions, user input, retrieved documents, memory, tool results, examples, schemas, and constraints.

Good context engineering makes LLM systems more accurate, cheaper, faster, safer, and easier to debug. Bad context engineering gives you fluent answers that look plausible but are built from the wrong evidence.

## What context engineering means

An LLM does not know what your app knows. It only sees the tokens you send in the current request.

That means every AI feature has a context design problem:

- What should be included?
- What should be excluded?
- What should be trusted?
- What should be summarized?
- What should be retrieved live?
- What should be remembered across turns?
- What should be validated before the model sees it?

The context window is not a junk drawer. Treat it like an API contract between your application and the model.

## Why context matters

Most production failures are not caused by a model being "bad." They are caused by the model receiving the wrong context.

Common examples:

- A support bot answers from an old refund policy.
- A document Q&A app retrieves five chunks, but only one is relevant.
- An extraction workflow misses a field because the schema was vague.
- A coding agent edits the wrong file because it saw stale repo state.
- An assistant leaks internal instructions because retrieved text contained a prompt injection.

The model cannot recover from missing facts. It cannot reliably ignore malicious facts unless you separate trusted instructions from untrusted content. It cannot reason over 100 pages equally well just because the context window technically fits them.

Context engineering is how you turn "call an LLM" into a system.

## The context stack

Think of context as layers. Each layer has a job.

### Instructions

Instructions define the model's role, boundaries, rules, and style.

Use this layer for:

- System and developer rules
- Task boundaries
- Safety constraints
- Refusal policy
- Tone and formatting expectations
- Tool-use rules

Keep instructions stable and testable. If the same instruction appears in every request, it probably belongs in a shared prompt template, not scattered across feature code.

### User input

User input is the raw request plus any normalized intent your app derives from it.

Examples:

- Raw message: "Can I return this after 45 days?"
- Normalized intent: `return_policy_question`
- Entities: `order_id`, `product_id`, `purchase_date`
- User locale or account type

Do not silently rewrite the user's request into something more convenient. Preserve the original message, then add structured interpretation beside it.

### Retrieved knowledge

Retrieved knowledge is external evidence fetched at request time.

Examples:

- Documentation chunks
- Search results
- Database rows
- Customer records
- Product catalog entries
- Policy snippets
- Citation IDs

Retrieved content should be clearly delimited and labeled. The model should know where each piece came from and whether it is trusted.

### Conversation state

Conversation state is what the system carries across turns.

Examples:

- Recent messages
- A summary of old turns
- User preferences
- Session facts
- Open tasks
- Decisions already made

Do not keep everything forever. Long chats accumulate stale assumptions. Summarize, prune, and make memory explicit.

### Tool results

Tool results are outputs from functions, APIs, code execution, search, calculators, logs, or internal services.

Examples:

- `get_order_status` response
- Search API results
- SQL query output
- Test failure logs
- File diffs
- Calculated totals

Tool results are often more reliable than generated text, but they still need formatting. Large raw JSON blobs can bury the signal. Extract the fields the model needs.

### Output contract

The output contract tells the model what a valid answer looks like.

Examples:

- JSON schema
- Markdown structure
- Required citations
- Fields to include
- Fields to omit
- Acceptance criteria
- Few-shot examples

If another system consumes the answer, define the contract tightly. If a human consumes the answer, define the structure and quality bar.

## Designing a context window

A context window is a limited budget. Spend it intentionally.

### 1. Reserve budget by purpose

Do not fill the whole window with retrieved content.

A healthy budget usually reserves space for:

- Stable instructions
- The user's current request
- Retrieved evidence
- Conversation state
- Tool results
- Output schema or examples
- The model's answer

If the model has no room to answer, your context is too large. If the model has no evidence, your context is too small.

### 2. Put stable instructions first

Stable instructions should appear before user input and retrieved content.

This helps separate trusted control text from untrusted text. A retrieved document can say "ignore previous instructions," but your app should treat that as document content, not as a real instruction.

Use labels like:

```md
## System rules
...

## User request
...

## Retrieved evidence
...
```

The exact format matters less than consistency.

### 3. Put task input near the end

Models often attend strongly to recent text. Keep the current user request close to the point where the answer is generated.

A useful order:

1. Stable instructions
2. Output contract
3. Relevant user/session state
4. Retrieved evidence
5. Current user request

This is not a universal rule, but it is a strong default.

### 4. Compress old state

Long context is not free. It increases cost, latency, and failure risk.

Compress aggressively:

- Summarize old conversation turns.
- Remove duplicated chunks.
- Keep decisions, not chatter.
- Keep source IDs for claims.
- Drop context that cannot affect the answer.

The goal is not maximum context. The goal is maximum useful signal per token.

### 5. Keep trusted and untrusted text separate

User input and retrieved documents are untrusted.

They may contain:

- Prompt injection
- Incorrect facts
- Outdated policy
- Sensitive data
- Malicious instructions

Never mix retrieved text into system instructions. Put it in a clearly labeled evidence section and tell the model how to treat it.

### 6. Prefer structured context

Structure helps both the model and your debugger.

Good context has clear boundaries:

```md
<customer_profile>
Plan: Pro
Region: EU
Open tickets: 2
</customer_profile>

<retrieved_policy source="refund_policy_2026_02">
Customers can request a refund within 30 days of purchase.
</retrieved_policy>
```

You do not need XML specifically. Markdown headings, JSON, or tagged blocks all work. The important part is consistent boundaries.

## Common patterns

### Retrieval before generation

Use retrieval when the model needs facts outside the prompt.

Good retrieval context includes:

- The source title
- The relevant excerpt
- A citation or ID
- Recency metadata when useful
- A short reason it was retrieved

Bad retrieval context is a pile of chunks with no labels.

See [RAG](/rag/) for retrieval patterns.

### Conversation summary memory

For multi-turn apps, keep recent turns verbatim and older turns as a summary.

Example:

```md
## Conversation summary
The user is building a customer support bot for subscription billing.
They decided to support refund, cancellation, and invoice questions first.
They prefer TypeScript examples.

## Recent messages
User: How should I handle refunds?
Assistant: ...
```

Summaries should be rewritten when facts change. Stale memory is worse than no memory.

### Tool-result distillation

Tool outputs are often too verbose. Distill them before passing them to the model.

Instead of:

```json
{
  "order": {
    "id": "ord_123",
    "events": [
      "...200 log entries..."
    ]
  }
}
```

Prefer:

```md
## Order lookup result
Order ID: ord_123
Status: Delivered
Purchase date: 2026-03-20
Refund eligibility: Outside 30-day refund window
Source: orders_api
```

Keep the raw tool output in logs. Give the model the decision-relevant slice.

### Few-shot examples

Examples are context too.

Use examples when the task has a pattern:

- Classification
- Extraction
- Tone matching
- Tool selection
- Edge-case handling

Bad examples can overfit the model to the wrong behavior. Keep them close to the production distribution.

### Output schemas

When you need structured output, make the schema part of context.

Example:

```json
{
  "answer": "string",
  "citations": ["source_id"],
  "needs_human_review": true
}
```

Then validate the output. The schema guides generation, but validation enforces the contract.

## Examples in real LLM apps

### Support bot

A support bot should not answer from general model knowledge. It should answer from policy and account context.

Useful context:

- System instruction: be accurate, cite policy, escalate when unsure.
- Customer profile: plan, region, account status.
- Ticket history: recent unresolved issues.
- Retrieved policies: refund, cancellation, billing.
- Current user message.
- Output contract: answer, policy citation, escalation flag.

Risk: policy docs can contain old or conflicting rules.

Fix: include version dates, prefer newest approved policy, and require citation IDs.

### Document Q&A

A document Q&A system needs evidence more than personality.

Useful context:

- User question.
- Top retrieved chunks.
- Chunk IDs and document titles.
- Instructions to answer only from provided evidence.
- Citation format.
- Fallback behavior when evidence is missing.

Risk: retrieving adjacent but irrelevant chunks.

Fix: rerank chunks, include fewer but better passages, and evaluate retrieval quality separately from answer quality.

### Structured extraction

Extraction systems need source text plus a strict output contract.

Useful context:

- Raw source document or excerpt.
- Target schema.
- Field definitions.
- Examples for ambiguous fields.
- Rules for missing data.
- Validation constraints.

Risk: the model fills missing fields with guesses.

Fix: allow `null`, require evidence snippets, and validate against schema.

### Coding agent

A coding agent needs repo state, not generic coding advice.

Useful context:

- User request.
- Repository instructions.
- Relevant file snippets.
- Search results.
- Test output.
- Current diff.
- Tool results.
- Constraints about not overwriting unrelated work.

Risk: stale context after files change.

Fix: reread files before editing, keep tool output fresh, and run tests after changes.

## Failure modes

### Too much context

Symptoms:

- High latency
- High cost
- Worse accuracy in the middle of long inputs
- Answers that ignore important details

Fixes:

- Retrieve fewer chunks.
- Summarize old turns.
- Rerank evidence.
- Remove repeated instructions.
- Split the task into smaller calls.

### Missing context

Symptoms:

- Hallucinated facts
- Generic answers
- Wrong assumptions
- The model asks for information your app already has

Fixes:

- Add retrieval.
- Pass relevant user/session state.
- Include tool results.
- Define fallback behavior when evidence is unavailable.

### Stale context

Symptoms:

- The model uses old preferences.
- It references previous decisions that changed.
- It answers from outdated policy.

Fixes:

- Add timestamps and version IDs.
- Expire memory.
- Refresh retrieved data at request time.
- Prefer source-of-truth APIs over stored summaries.

### Prompt injection

Symptoms:

- Retrieved content tells the model to ignore instructions.
- The model follows instructions from a document or web page.
- The answer reveals internal rules or hidden context.

Fixes:

- Treat retrieved content as untrusted evidence.
- Keep system rules separate.
- Add tool and data access boundaries.
- Validate outputs before taking action.

### Conflicting instructions

Symptoms:

- The model flips between formats.
- It follows a local instruction and ignores a global rule.
- Different prompt sections ask for incompatible behavior.

Fixes:

- Define instruction priority.
- Remove duplicated rules.
- Keep one source of truth for output format.
- Test prompts after every context-template change.

### Tool result overload

Symptoms:

- The answer focuses on irrelevant logs.
- The model misses the key error.
- Context cost grows with every tool call.

Fixes:

- Summarize tool outputs.
- Include only fields needed for the next decision.
- Store raw outputs in traces, not prompts.
- Let the model request more detail when needed.

### No eval coverage

Symptoms:

- A context tweak improves one case and breaks ten others.
- Retrieval changes silently reduce answer quality.
- Prompt changes are shipped based on vibes.

Fixes:

- Build golden sets.
- Evaluate retrieval and generation separately.
- Track cost, latency, citation accuracy, and refusal behavior.
- Run evals on every prompt, retrieval, or memory change.

See [LLM evaluation](/llm-evaluation/) for deeper coverage.

## Context engineering checklist

Before shipping an LLM feature, ask:

- What information does the model need to answer correctly?
- Which context is trusted, and which is untrusted?
- Where does each fact come from?
- Is the current user request close to the answer point?
- Are retrieved chunks labeled with sources?
- Are old conversation turns summarized or pruned?
- Are tool results distilled to decision-relevant fields?
- Is the output contract explicit?
- Do we validate structured output?
- Do evals cover context changes?
- Do logs show the final prompt/context sent to the model?

If you cannot inspect the context, you cannot debug the system.

## What to learn next

Context engineering connects most of the AI engineering stack:

- [Prompt engineering](/prompt-engineering/) teaches how to ask clearly once the right context is present.
- [RAG](/rag/) teaches how to retrieve external knowledge before generation.
- [AI agents](/ai-agents/) builds on context from tools, memory, and intermediate steps.
- [LLM evaluation](/llm-evaluation/) shows how to test whether context changes improve behavior.
- [LLM observability](/llm-observability/) helps you trace prompts, tokens, tool calls, and failures in production.

The core habit is simple: stop treating the prompt as a string. Treat it as a carefully designed information interface.
