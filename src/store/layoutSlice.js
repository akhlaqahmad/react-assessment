import { createSlice } from '@reduxjs/toolkit'

const initialLayout = [
  { i: 'lineChart', x: 0, y: 0, w: 6, h: 4, minW: 4, minH: 3 },
  { i: 'pieChart', x: 6, y: 0, w: 6, h: 4, minW: 4, minH: 3 },
  { i: 'barChart', x: 0, y: 4, w: 6, h: 4, minW: 4, minH: 3 },
  { i: 'usersTable', x: 6, y: 4, w: 6, h: 4, minW: 4, minH: 3 },
  { i: 'productsTable', x: 0, y: 8, w: 12, h: 4, minW: 6, minH: 3 },
]

const initialState = {
  layouts: {
    lg: initialLayout,
    md: initialLayout.map(item => ({ ...item, w: Math.min(item.w, 8) })),
    sm: initialLayout.map(item => ({ ...item, w: Math.min(item.w, 6), x: item.x % 6 })),
    xs: initialLayout.map(item => ({ ...item, w: 4, x: 0 })),
    xxs: initialLayout.map(item => ({ ...item, w: 2, x: 0 })),
  },
  breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
}

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    updateLayout: (state, action) => {
      const { breakpoint, layout } = action.payload
      state.layouts[breakpoint] = layout
    },
    updateLayouts: (state, action) => {
      state.layouts = { ...state.layouts, ...action.payload }
    },
    resetLayout: (state) => {
      state.layouts = {
        lg: initialLayout,
        md: initialLayout.map(item => ({ ...item, w: Math.min(item.w, 8) })),
        sm: initialLayout.map(item => ({ ...item, w: Math.min(item.w, 6), x: item.x % 6 })),
        xs: initialLayout.map(item => ({ ...item, w: 4, x: 0 })),
        xxs: initialLayout.map(item => ({ ...item, w: 2, x: 0 })),
      }
    },
  },
})

export const { updateLayout, updateLayouts, resetLayout } = layoutSlice.actions
export default layoutSlice.reducer
