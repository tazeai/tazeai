import { z } from 'zod';

const production = process.env.NODE_ENV === 'production';

const AppConfigSchema = z
  .object({
    name: z
      .string({
        description: `This is the name of your SaaS. Ex. "TazeAI"`,
        required_error: `Please provide the variable NEXT_PUBLIC_PRODUCT_NAME`,
      })
      .min(1)
      .optional()
      .default('TazeAI'),
    title: z
      .string({
        description: `This is the default title tag of your SaaS.`,
        required_error: `Please provide the variable NEXT_PUBLIC_SITE_TITLE`,
      })
      .min(1)
      .optional()
      .default('TazeAI'),
    description: z
      .string({
        description: `This is the default description of your SaaS.`,
        required_error: `Please provide the variable NEXT_PUBLIC_SITE_DESCRIPTION`,
      })
      .optional()
      .default('TazeAI'),
    url: z
      .string({
        required_error: `Please provide the variable NEXT_PUBLIC_SITE_URL`,
      })
      .url({
        message: `You are deploying a production build but have entered a NEXT_PUBLIC_SITE_URL variable using http instead of https. It is very likely that you have set the incorrect URL. The build will now fail to prevent you from from deploying a faulty configuration. Please provide the variable NEXT_PUBLIC_SITE_URL with a valid URL, such as: 'https://example.com'`,
      })
      .optional()
      .default('https://tazeai.com'),
    locale: z
      .string({
        description: `This is the default locale of your SaaS.`,
        required_error: `Please provide the variable NEXT_PUBLIC_DEFAULT_LOCALE`,
      })
      .optional()
      .default('en'),
    theme: z.enum(['light', 'dark', 'system']).optional().default('system'),
    production: z.boolean(),
    themeColor: z.string().optional(),
    themeColorDark: z.string().optional(),
  })
  .refine(
    (schema) => {
      const isCI = process.env.NEXT_PUBLIC_CI;

      if (isCI ?? !schema.production) {
        return true;
      }

      return !schema.url.startsWith('http:');
    },
    {
      message: `Please provide a valid HTTPS URL. Set the variable NEXT_PUBLIC_SITE_URL with a valid URL, such as: 'https://example.com'`,
      path: ['url'],
    },
  )
  .refine(
    (schema) => {
      return schema.themeColor !== schema.themeColorDark;
    },
    {
      message: `Please provide different theme colors for light and dark themes.`,
      path: ['themeColor'],
    },
  );

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
