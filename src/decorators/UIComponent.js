import exportUI from './exportUI';

export default (componentName) => {
  return (Component) => {
    return exportUI(Component, componentName);    
  }
}