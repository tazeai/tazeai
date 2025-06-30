const production = process.env.NODE_ENV === 'production';

const appConfig = {
  name: 'TazeAI',
  title: 'TazeAI',
  description: 'TazeAI',
  url: 'https://tazeai.com',
  locale: 'en',
  theme: 'system',
  themeColor: '#000000',
  themeColorDark: '#000000',
  production,
};

export default appConfig;
