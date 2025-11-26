import { create } from "zustand"
import { persist } from "zustand/middleware"

type ThemeState = {
  isDarkMode: boolean
  setDarkMode: (isDark: boolean) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      setDarkMode: (isDark: boolean) => {
        set({ isDarkMode: isDark })
        isDark
          ? document.documentElement.classList.add("dark")
          : document.documentElement.classList.remove("dark")
      },
    }),
    {
      name: "theme-storage",
    }
  )
)
