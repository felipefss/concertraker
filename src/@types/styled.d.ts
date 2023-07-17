import 'styled-components/native';

import { theme } from '@/styles/global';

type ThemeType = typeof theme;

declare module 'styled-components/native' {
  export interface DefaultTheme extends ThemeType {}
}
