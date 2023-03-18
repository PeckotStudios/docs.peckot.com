const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Peckot 文档',
  tagline: 'Peckot Studios 的官方文档页面',
  favicon: 'img/favicon.png',

  url: 'https://docs.peckot.com',
  baseUrl: '/',

  organizationName: 'Peckot-Studios',
  projectName: 'docs.peckot.com',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/Peckot-Studios/docs.peckot.com',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/theme.classic.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'light',
        respectPrefersColorScheme: true,
      },

      docs: {
        sidebar: {
          autoCollapseCategories: true,
        },
      },

      announcementBar: {
        id: 'support_us',
        content:
          '示例公告内容：<a target="_blank" rel="noopener noreferrer" href="#">Clickable</a>',
        backgroundColor: '#ddd',
        textColor: '#091E42',
        isCloseable: true,
      },

      //image: 'img/docusaurus-social-card.jpg',

      navbar: {
        title: 'Peckot 文档',
        logo: {
          alt: 'Logo',
          src: 'img/logo-cc-1.png',
          srcDark: 'img/logo-cc-2.png',
          width: 32,
          height: 32,
        },
        items: [
          {
            to: 'docs',
            label: '文档介绍',
            position: 'left',
            activeBaseRegex: 'docs(/((about)|(projects)))?/?$',
          },
          {
            to: 'docs/PeckotAPI',
            label: 'PeckotAPI',
            position: 'left',
          },
          {
            to: 'docs/PeckotMC',
            label: 'PeckotMC',
            position: 'left',
          },
          {
            to: 'docs/AuroraBot',
            label: 'AuroraBot',
            position: 'left',
          },
          {
            href: 'https://github.com/Peckot-Studios/docs.peckot.com',
            label: 'GitHub',
            position: 'right',
          },
          {
            type: 'search',
            position: 'right',
          },
        ],
      },

      footer: {
        copyright: `<div class="text--light"><b>渝ICP备<a href="https://beian.miit.gov.cn/">2022006862</a>号</b> | Copyright © 2021-${new Date().getFullYear()} <a href="https://peckot.com"><b>Peckot Studios</b></a>. All rights reserved.</div>`,
      },

      prism: {
        defaultLanguage: 'text',
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },

    }),

};

module.exports = config;
