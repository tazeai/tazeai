import { mergeConfig, type ViteUserConfig } from 'vitest/config';
import sharedConfig from '../../vitest.shared';

const config: ViteUserConfig = {};

export default mergeConfig(sharedConfig, config);
