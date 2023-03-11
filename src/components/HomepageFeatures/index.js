import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    feature: 'SIMPLE',
    title: '简洁易懂的语言',
    description: (
      <>
        我们尽量扩大了文档的可阅读人群范围，使用了易于理解的语言进行多角度多方面的解释，同时对较难理解的项目提供了示例内容。
      </>
    ),
  },
  {
    feature: 'STABLE',
    title: '稳定运行的服务',
    description: (
      <>
        该文档使用 GitHub 进行源码托管，并由 Vercel 强力驱动，提高用户效率的同时持续保障了文档的可阅读性。
      </>
    ),
  },
  {
    feature: 'ACTIVE',
    title: '持续活跃的编写',
    description: (
      <>
        该文档由 Peckot 文档编辑组 根据相关项目的更新持续修改编写，保证了文档相关内容的准确性和时效性，极大提高你的工作效率。
      </>
    ),
  },
];

function Feature({ feature, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <span className="text--primary-darkest text--bold">「{feature}」</span>
        <h1 className="text--primary">{title}</h1>
        <p className="text--light">{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
