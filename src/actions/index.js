import { SELECT_NS, SELECT_ROOM } from './types'

export const selectNs = (nsName) => {
  return {
    type: SELECT_NS,
    payload: nsName
  }
}

export const selectRoom = (roomName) => {
  return {
    type: SELECT_ROOM,
    payload: roomName
  }
}