"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { dictionary, type Locale, type LocaleDictionary } from "@/lib/dictionary";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

interface LocaleContextValue {
  locale: Locale;
  dict: LocaleDictionary;
  selectLocale: (locale: Locale) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);
const LocaleContext = createContext<LocaleContextValue | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within AppProviders");
  return ctx;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within AppProviders");
  return ctx;
}

export function AppProviders({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [locale, setLocale] = useState<Locale>("fa");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("sm-theme") as Theme | null;
    const storedLocale = window.localStorage.getItem("sm-locale") as Locale | null;
    if (storedTheme) setTheme(storedTheme);
    if (storedLocale) setLocale(storedLocale);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("sm-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dictionary[locale].dir;
    window.localStorage.setItem("sm-locale", locale);
  }, [locale]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }, []);

  const selectLocale = useCallback((next: Locale) => {
    setLocale(next);
  }, []);

  const themeValue = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
  const localeValue = useMemo(
    () => ({ locale, dict: dictionary[locale], selectLocale }),
    [locale, selectLocale]
  );

  return (
    <ThemeContext.Provider value={themeValue}>
      <LocaleContext.Provider value={localeValue}>{children}</LocaleContext.Provider>
    </ThemeContext.Provider>
  );
}
