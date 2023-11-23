export default defineAppConfig({
  docus: {
    title: 'Vuito',
    description: 'Simple, lightweight, isomorphic, template-based validation library.',
    image: 'https://github.com/mathix420/vuito/blob/master/docs/public/cover.png?raw=true',
    socials: {
      npm: {
        label: 'NPM',
        icon: 'simple-icons:npm',
        href: 'https://npmjs.com/package/vuito'
      },
      github: 'mathix420/vuito',
      portfolio: {
        label: 'Me, Arnaud Gissinger',
        icon: 'simple-icons:bento',
        href: 'https://bento.me/agissing'
      }
    },
    github: {
      dir: 'docs/content',
      branch: 'master',
      repo: 'vuito',
      owner: 'mathix420',
      edit: true
    },
    aside: {
      level: 0,
      collapsed: false,
      exclude: []
    },
    main: {
      padded: true,
      fluid: true
    },
    header: {
      logo: true,
      showLinkIcon: true,
      exclude: [],
      fluid: true
    }
  }
})
