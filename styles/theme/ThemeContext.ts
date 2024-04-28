import React from 'react'
import type { ThemeColors } from './types'
import { defaultTheme } from './index'

const ThemeContext = React.createContext<ThemeColors>(defaultTheme)

export default ThemeContext
