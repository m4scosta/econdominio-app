// @flow

export type Action =
  { type: 'LOADED_CONFIG', config: Object };

export default function loadConfig(): Action {
  return {
    type: 'LOADED_CONFIG',
    config: {
      allowPush: true
    }
  }
}


export function togglePush(allowPush: boolean): Action {
  return {
    type: 'LOADED_CONFIG',
    config: {
      allowPush: allowPush,
    }
  }
}
