import * as types from "./actionTypes"

export function sample(data) {
  return {
    type: types.SAMPLE,
    payload: data,
  }
}
