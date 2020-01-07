const SHOW_SPINNER = 'SHOW_SPINNER'
const HIDE_SPINNER = 'HIDE_SPINNER'

// action creators
export const showSpinner = () => ({
  type: SHOW_SPINNER,
})

export const hideSpinner = () => ({
  type: HIDE_SPINNER,
})

const initialState = {
  visible: false,
  count: 0,
}

// reducer
export function spinner(state = initialState, action) {
  if (action.type === SHOW_SPINNER) {
    return {
      visible: true,
      count: state.count + 1,
    }
  }
  if (action.type === HIDE_SPINNER) {
    const count = Math.max(state.count - 1, 0)
    return {
      visible: count > 0,
      count,
    }
  }
  return state
}
