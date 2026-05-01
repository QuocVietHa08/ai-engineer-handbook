import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const handbookSections = [
  {
    title: 'Foundations',
    items: ['LLMs', 'Prompt engineering', 'Context engineering', 'Fine-tuning'],
  },
  {
    title: 'Systems',
    items: ['Basic RAG', 'Agentic RAG', 'Hybrid retrieval', 'Semantic indexing'],
  },
  {
    title: 'Agents',
    items: ['Tool calling', 'ReAct loop', 'Plan and execute', 'Multi-agent collaboration'],
  },
  {
    title: 'Operations',
    items: ['LLM optimization', 'LLM evaluation', 'LLM observability', 'Production reliability'],
  },
  {
    title: 'Frameworks',
    items: ['LangChain', 'Mastra', 'Pydantic AI', 'Framework selection'],
  },
  {
    title: 'Career',
    items: ['Study plan', 'Portfolio projects', 'System design', 'Interview prep'],
  },
];

const frameworkCards = [
  {
    name: 'LangChain',
    description: 'Patterns for chains, tools, retrievers, agents, and production orchestration tradeoffs.',
  },
  {
    name: 'Mastra',
    description: 'TypeScript-first agent workflows, memory, tool calling, and application integration.',
  },
  {
    name: 'Pydantic AI',
    description: 'Python agent development with typed dependencies, structured outputs, and validation.',
  },
];

function HomepageHeader() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}>AI Engineer Handbook</p>
        <Heading as="h1" className={styles.heroTitle}>
          Learn to build production AI systems
        </Heading>
        <p className={styles.heroSubtitle}>
          A practical handbook for engineers learning LLM apps, RAG, agents, evaluations, and the frameworks used to ship agentic AI products.
        </p>
        <div className={styles.heroMeta} aria-label="Handbook status">
          <span>Coming soon</span>
          <span>Free guide</span>
          <span>Built with Docusaurus</span>
        </div>
      </div>
      <div className={styles.systemPanel} aria-label="AI engineering roadmap preview">
        <div className={styles.panelHeader}>
          <span className={styles.statusDot} />
          Handbook roadmap
        </div>
        <div className={styles.pipeline}>
          <div>Model APIs</div>
          <div>Retrieval</div>
          <div>Tools</div>
          <div>Agents</div>
          <div>Evals</div>
          <div>Ship</div>
        </div>
        <div className={styles.panelNote}>
          Coverage for practical AI engineers: architecture, code patterns, reliability, and interviews.
        </div>
      </div>
    </header>
  );
}

function HandbookPreview() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <p className={styles.eyebrow}>What is coming</p>
        <Heading as="h2">A structured path from AI basics to shipped agentic systems</Heading>
      </div>
      <div className={styles.cardGrid}>
        {handbookSections.map((section) => (
          <article className={styles.card} key={section.title}>
            <Heading as="h3">{section.title}</Heading>
            <ul>
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
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
    <section className={styles.launchBanner}>
      <p className={styles.eyebrow}>Current status</p>
      <Heading as="h2">Pages are being drafted now</Heading>
      <p>
        The handbook routes and navigation are in place. Content will be published section by section, starting with foundations, RAG, agents, evaluations, and framework guides.
      </p>
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
