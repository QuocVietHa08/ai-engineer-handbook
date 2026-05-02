# AI Engineer Handbook

> Free, curated learning roadmap for becoming an AI engineer — from foundation model basics to shipping production LLM systems.

Built and maintained by [Edward Ha](https://www.linkedin.com/in/viethadev/), a remote software engineer focused on AI engineering.

## What's inside

A structured guide covering the full AI engineering stack:

- **Fundamentals** — how foundation models work, tokens, sampling, embeddings, capabilities + limits
- **Prompt + context engineering** — repeatable, testable prompts; what to put in the context window
- **RAG patterns** — basic RAG, hybrid retrieval, agentic RAG, deep search, grounded generation, semantic indexing, retrieval refinement
- **AI agents** — tool calling, ReAct loops, plan-and-execute, multi-agent collaboration, code execution
- **MCP (Model Context Protocol)** — standard tool/context exposure
- **Production** — optimization, evaluation, deployment, observability
- **Frameworks** — LangChain, Mastra, Pydantic AI

Sidebar navigation is defined in [`sidebars.js`](./sidebars.js). All handbook content lives under [`contents/`](./contents/).

## Tech stack

- [Docusaurus 3.10](https://docusaurus.io/) — documentation site framework
- React 18 + MDX for content authoring
- Custom theme swizzles in [`src/theme/`](./src/theme/)
- Custom homepage in [`src/pages/index.jsx`](./src/pages/index.jsx)
- Styling in [`src/css/custom.css`](./src/css/custom.css)

## Development

Prerequisites: Node.js 18+ and npm.

```bash
# Install dependencies
npm install

# Start the dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Clear Docusaurus cache (run after swizzle changes)
npm run docusaurus clear
```

## Project structure

```
ai-engineer-handbook/
├── contents/              # All handbook markdown content
│   ├── ai-engineer-guide.md
│   ├── fundamentals.md
│   ├── rag-patterns/
│   ├── agent-patterns/
│   └── ...
├── src/
│   ├── css/custom.css     # Global styles + .shoutout banner
│   ├── pages/index.jsx    # Custom homepage
│   └── theme/             # Docusaurus swizzled components
│       └── DocItem/Content/index.js  # Banner injection on every doc page
├── sidebars.js            # Sidebar nav structure
├── docusaurus.config.js   # Site config
└── package.json
```

## Contributing

Contributions welcome — typo fixes, new patterns, code examples, clarifications.

1. Fork and clone the repo
2. Create a feature branch: `git checkout -b add-xyz-pattern`
3. Add or edit markdown under [`contents/`](./contents/)
4. If adding a new page, register it in [`sidebars.js`](./sidebars.js)
5. Run `npm run dev` and verify the page renders
6. Open a pull request

When adding a new pattern page, follow the existing structure:
- Frontmatter with `id`, `title`, `slug`
- Short intro explaining when to use the pattern
- Concrete example (code or pseudocode)
- Trade-offs and failure modes
- Cross-links to related pages

### Authoring images

Images live under [`static/img/`](./static/img/), grouped by lesson `id`:

```
static/img/
└── <lesson-id>/
    └── <image-name>.png
```

Reference them with the shared `.lesson-figure` pattern (defined in [`src/css/custom.css`](./src/css/custom.css)):

```html
<figure class="lesson-figure">
  <img
    src="/img/<lesson-id>/<image-name>.png"
    alt="Descriptive sentence — used by screen readers and AI search"
  />
  <figcaption>
    Optional caption explaining what the image shows.
  </figcaption>
</figure>
```

Notes:
- Use absolute path (`/img/...`) — Docusaurus rewrites it to the correct base URL.
- Always write meaningful `alt` text; never `alt=""` unless the image is purely decorative.
- Keep images under ~200 KB; SVG for diagrams, PNG for screenshots, WebP for photos.
- The build will fail if a referenced image does not exist — add the file before pushing.

## License

MIT — free to use, fork, and adapt. Attribution appreciated.

## Connect

- LinkedIn: [viethadev](https://www.linkedin.com/in/viethadev/)
- GitHub: [QuocVietHa08](https://github.com/QuocVietHa08)
- Repo: [QuocVietHa08/ai-engineer-handbook](https://github.com/QuocVietHa08/ai-engineer-handbook)

If this handbook helps you, a star on GitHub keeps the project visible to other engineers learning the same path.
