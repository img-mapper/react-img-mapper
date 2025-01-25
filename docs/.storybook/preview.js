import '../src/stories/stories.scss';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      order: ['Examples', ['Simple', 'Colors', 'Area', 'Responsive Map', 'Dynamic All Properties']],
    },
  },
  previewTabs: {
    'storybook/docs/panel': {
      hidden: true,
    },
  },
};
