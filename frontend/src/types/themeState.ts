export interface ThemeState {
  isDark: boolean
  toggleTheme: () => void
  setTheme: (isDark: boolean) => void
}
