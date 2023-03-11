import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title text--primary">{siteConfig.title}</h1>
        <p className="hero__subtitle text--light">{siteConfig.tagline}</p>
        <div className={styles.button}>
          <div className={styles.button}>
            <Link
              className="button button--primary button--lg"
              to="/docs">
              了解更多
            </Link>
          </div>
          <div className={styles.button}>
            <Link
              className="button button--outline button--primary button--lg"
              to="/docs/intro">
              帮助文档
            </Link>
          </div>
          <div className={styles.button}>
            <Link
              className="button button--outline button--primary button--lg"
              to="/docs/intro">
              开发文档
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
