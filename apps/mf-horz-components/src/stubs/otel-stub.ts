const noop = () => {};
const noopObj = {
  createContextKey: () => Symbol('noop'),
  active: () => ({}),
  with: (ctx: any, fn: any) => fn(),
  bind: (ctx: any, fn: any) => fn,
};

export const diag = {
  setLogger: noop,
  debug: noop,
  info: noop,
  error: noop,
};

export const context = noopObj;
export const trace = {
  getTracer: () => ({
    startSpan: () => ({
      end: noop,
      setAttribute: noop,
    }),
  }),
};

export default { diag, context, trace };
