import ComponentUI from './ComponentUI';
import FieldUI from './FieldUI';

export function exportComponent(Component, componentName) {
  return new ComponentUI(Component, componentName);
}

export function exportField(Component, componentName) {
  let field = new FieldUI(Component, componentName);
  return exportComponent(field, componentName);
}
