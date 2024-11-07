import { createContext } from 'react'
import type { Theme } from '@styles/theme/types'
import { defaultTheme } from '..'

const ThemeContext = createContext<Theme>(defaultTheme)

export default ThemeContext
