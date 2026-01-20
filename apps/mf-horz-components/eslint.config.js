import { reactInternalConfig } from '@packages/eslint-config/react-internal';

/** @type {import("eslint").Linter.Config} */
export const config = [
    ...reactInternalConfig,
    {
        ignores: ['dist']
    }
];
export default reactInternalConfig;
