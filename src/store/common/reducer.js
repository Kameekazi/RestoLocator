import * as types from './actionTypes'

const initialState = {
  sample: '',
}

function reducer (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case types.SAMPLE: {
      return {
        ...state,
        sample: payload,
      }
    }
    default:
      return state
  }
}

export default reducer