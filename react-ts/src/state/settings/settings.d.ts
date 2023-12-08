export type darkMode = 'light' | 'dark' | 'system'

export interface Settings {
    darkMode: darkMode,
    setDarkMode: (darkMode: darkMode) => void
}