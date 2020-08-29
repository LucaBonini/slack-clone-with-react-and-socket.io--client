import { SELECT_NS, SELECT_ROOM } from '../actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case SELECT_NS:
      return {
        ...state,
        namespaceActive: action.payload
      }
    case SELECT_ROOM:
      return {
        ...state,
        roomActive: action.payload
      }
  }
  return state
}