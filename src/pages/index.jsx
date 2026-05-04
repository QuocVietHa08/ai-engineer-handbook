import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const handbookSections = [
  {
    title: 'Foundations',
    description: 'Build the mental model for LLMs, prompting, context, and model adaptation.',
    href: '/llm-fundamentals/',
    items: ['LLMs', 'Prompt engineering', 'Context engineering', 'Fine-tuning'],
  },
  {
    title: 'RAG systems',
    description: 'Learn retrieval patterns that keep generated answers grounded and useful.',
    href: '/rag/',
    items: ['Basic RAG', 'Agentic RAG', 'Hybrid retrieval', 'Semantic indexing'],
  },
  {
    title: 'Agents',
    description: 'Understand loops, tools, planning, and collaboration patterns for agentic products.',
    href: '/agents/',
    items: ['Tool calling', 'ReAct loop', 'Plan and execute', 'Multi-agent collaboration'],
  },
  {
    title: 'Operations',
    description: 'Move from working demos to reliable systems with evals, observability, and optimization.',
    href: '/production-ai-systems/',
    items: ['LLM optimization', 'LLM evaluation', 'LLM observability', 'Production reliability'],
  },
  {
    title: 'Frameworks',
    description: 'Compare the tradeoffs behind popular orchestration and agent frameworks.',
    href: '/agentic-frameworks/',
    items: ['LangChain', 'Mastra', 'Pydantic AI', 'Framework selection'],
  },
  {
    title: 'Career',
    description: 'Turn the learning path into projects, interviews, and a stronger AI engineering profile.',
    href: '/study-plan/',
    items: ['Study plan', 'Portfolio projects', 'System design', 'Interview prep'],
  },
];

const frameworkCards = [
  {
    name: 'LangChain',
    bestFor: 'Broad ecosystem',
    description: 'Patterns for chains, tools, retrievers, agents, and production orchestration tradeoffs.',
  },
  {
    name: 'Mastra',
    bestFor: 'TypeScript products',
    description: 'TypeScript-first agent workflows, memory, tool calling, and application integration.',
  },
  {
    name: 'Pydantic AI',
    bestFor: 'Typed Python agents',
    description: 'Python agent development with typed dependencies, structured outputs, and validation.',
  },
];

const startSteps = [
  {
    label: 'Read the guide',
    title: 'AI engineer guide',
    href: '/ai-engineer-guide/',
  },
  {
    label: 'Step 01',
    title: 'LLM fundamentals',
    href: '/llm-fundamentals/',
  },
  {
    label: 'Step 02',
    title: 'Prompt and context engineering',
    href: '/prompt-engineering/',
  },
  {
    label: 'Step 03',
    title: 'RAG systems',
    href: '/rag/',
  },
  {
    label: 'Step 04',
    title: 'Agents and evaluations',
    href: '/agents/',
  },
];

const roadmapLinks = [
  {label: 'Study plan', href: '/study-plan/'},
  {label: 'Portfolio projects', href: '/portfolio-projects/'},
  {label: 'System design', href: '/ai-system-design/'},
];

function HomepageHeader() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}>AI Engineer Handbook</p>
        <Heading as="h1" className={styles.heroTitle}>
          A field guide for building AI systems that survive production
        </Heading>
        <p className={styles.heroSubtitle}>
          Learn the practical path from LLM foundations to RAG, agents, evals, and the engineering habits that make AI products reliable.
        </p>
        <div className={styles.heroActions}>
          <Link className="button button--primary button--lg" to="/ai-engineer-guide/">
            Start reading
          </Link>
          <Link className="button button--secondary button--lg" to="/study-plan/">
            View study plan
          </Link>
        </div>
        <div className={styles.heroMeta} aria-label="Handbook status">
          <span>30+ chapters</span>
          <span>Free guide</span>
          <span>Production focused</span>
        </div>
      </div>
      <div className={styles.startPanel} aria-label="Start here reading path">
        <div className={styles.panelHeader}>
          <span className={styles.statusDot} />
          Start here
        </div>
        <ol className={styles.startList}>
          {startSteps.map((link) => (
            <li key={link.href}>
              <Link to={link.href}>
                <span>{link.label}</span>
                {link.title}
              </Link>
            </li>
          ))}
        </ol>
        <div className={styles.panelNote}>
          A reading path for engineers who want the architecture, code patterns, and production tradeoffs in one place.
        </div>
      </div>
    </header>
  );
}

function HandbookPreview() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <p className={styles.eyebrow}>Choose your path</p>
        <Heading as="h2">Find the part of AI engineering you need next</Heading>
      </div>
      <div className={styles.cardGrid}>
        {handbookSections.map((section) => (
          <article className={styles.card} key={section.title}>
            <div>
              <Heading as="h3">{section.title}</Heading>
              <p>{section.description}</p>
            </div>
            <ul>
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link to={section.href}>Explore track</Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function FrameworksPreview() {
  return (
    <section className={styles.sectionMuted}>
      <div className={styles.sectionHeader}>
        <p className={styles.eyebrow}>Agentic frameworks</p>
        <Heading as="h2">Compare the tools people actually use to build agents</Heading>
      </div>
      <div className={styles.frameworkGrid}>
        {frameworkCards.map((framework) => (
          <article className={styles.frameworkCard} key={framework.name}>
            <small>Best for {framework.bestFor}</small>
            <span>{framework.name}</span>
            <p>{framework.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function LaunchBanner() {
  return (
    <section className={styles.roadmapBanner}>
      <div>
        <p className={styles.eyebrow}>Build your roadmap</p>
        <Heading as="h2">Turn the handbook into a focused learning plan</Heading>
        <p>
          Use the roadmap pages to decide what to study, what to build, and how to explain your AI engineering work in interviews.
        </p>
      </div>
      <div className={styles.roadmapLinks}>
        {roadmapLinks.map((link) => (
          <Link key={link.href} to={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout
      title="AI Engineer Handbook"
      description="Free curated preparation materials, roadmaps, projects, and interview guides for AI engineers.">
      <HomepageHeader />
      <main>
        <HandbookPreview />
        <FrameworksPreview />
        <LaunchBanner />
      </main>
    </Layout>
  );
}
