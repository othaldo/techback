const viewRegistry = new Map();

export function registerView(viewId, componentFn) {
  viewRegistry.set(viewId, componentFn);
}

export function getViewComponent(viewId, helpers) {
  const componentFn = viewRegistry.get(viewId);
  return componentFn ? componentFn(helpers) : null;
}
