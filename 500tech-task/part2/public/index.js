
window.onload = () => {
  const elem = document.getElementsByClassName('input500')[0];
  elem.addEventListener('mouseover', handleMouseOver);
  elem.addEventListener('mouseout', handleMouseOut);
  elem.addEventListener('blur', handleBlur);
};

const handleMouseOver = event => {
  event.target.classList.add('expanded');
};

const handleMouseOut = event => {
  if (event.target.value === '' && event.target !== document.activeElement) {
    event.target.classList.remove('expanded');
  }
}

const handleBlur = event => {
  if (event.target.value === '') {
    event.target.classList.remove('expanded');
  }
}