export default (text = 'Hello world, let\'s do something great') => {
  const element = document.createElement('div');
  element.innerHTML = text;
  return element;
};
