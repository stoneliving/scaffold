import _ from 'lodash';
import './style.css';
import './style.less';
import myImage from './github.jpg';

function component() {
  const element = document.createElement('div');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  const image = new Image();
  image.src = myImage;
  element.appendChild(image);

  return element;
}

document.body.appendChild(component());