import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}>AI Engineer Handbook</p>
        <Heading as="h1" className={styles.heroTitle}>
          Coming soon
        </Heading>
        <p className={styles.heroSubtitle}>
          We are preparing curated materials, roadmaps, projects, and interview guides for AI engineers.
        </p>
      </div>
      <div className={styles.map} aria-label="Coming soon topics">
        <div className={styles.mapNode}>
          <span>01</span>
          Roadmaps
        </div>
        <div className={styles.mapNode}>
          <span>02</span>
          Interview prep
        </div>
        <div className={styles.mapNode}>
          <span>03</span>
          Projects
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout
      title="AI Engineer Handbook"
      description="Free curated preparation materials, roadmaps, projects, and interview guides for AI engineers.">
      <HomepageHeader />
    </Layout>
  );
}
