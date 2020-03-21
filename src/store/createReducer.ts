type Action = { type: string; [payload: string]: any };
export default function createReducer<T, A extends Action>(
  initialState: T,
  handlers: { [type: string]: (state: T, action: Action) => any }
) {
  return function reducer(state = initialState, action: Action) {
    const { type, ...payload } = action;
    if (handlers.hasOwnProperty(type)) {
      return handlers[type](state, payload as any);
    } else {
      return { ...state, ...payload };
    }
  };
}
