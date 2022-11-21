const tags = [
  'h3', 'h5', 'h6', 'p', 'i',
  'th', '.card', '.badge-dark', '.badge-lab', '.badge-lecture', 
  '.badge-tutorial', '.badge-marking', '.badge-group-work', '.badge-test-exam', 'footer', 
  '.modal-content', '.modal-header', '.modal-footer', '.list-group-item', '.button-myplace', 
  '.button-close'
]

function toggle(theme) {
  if(findCurrentTheme() === theme) {
    setTheme('default');
  } else {
    setTheme(theme);
  }
}

function findCurrentTheme() {
  return window.localStorage.getItem('theme');
}

function rememberTheme() {
  setTheme(window.localStorage.getItem('theme'));
}

// Resets to default theme
function removeCurrentTheme() {
  let theme = findCurrentTheme();
  if(theme === 'default') { return; }
  for(let tag in tags) {
    document.querySelectorAll(tags[tag]).forEach(element=>element.classList.remove(`${theme}-${tags[tag].replace(/[.]/g, '')}`));
  }
  maps.forEach(map => map.setOptions({styles: styles['default']}));
  document.getElementsByTagName('body')[0].classList.remove(`${theme}-body`);
  document.getElementById('logo').src = images['default'];
  document.getElementById('quote-author').classList.remove(`${theme}-quote-author`);
  document.getElementsByClassName('table')[0].classList.remove(`${theme}-table`);
  document.querySelectorAll('.card-subtitle').forEach(element=>element.classList.add('text-muted'));
  document.querySelectorAll('.list-group-item').forEach(element=>element.children[0].classList.add('text-muted'));
  document.querySelectorAll('.list-group-item').forEach(element=>element.children[0].classList.remove(`${theme}-list-group-item-text`));
  //document.getElementById('button-dropdown').classList.remove(`${theme}-button-dropdown`);
  //document.querySelectorAll('.dropdown-item').forEach(element=>element.classList.remove(`${theme}-dropdown-item`));
}

function setTheme(theme) {
  removeCurrentTheme();
  window.localStorage.setItem('theme', theme);
  if(theme === 'default') { return; }
  for(let tag in tags) {
    document.querySelectorAll(tags[tag]).forEach(element=>element.classList.add(`${theme}-${tags[tag].replace(/[.]/g, '')}`));
  }
  maps.forEach(map => map.setOptions({styles: styles[theme]}));
  document.getElementsByTagName('body')[0].classList.add(`${theme}-body`);
  document.getElementById('logo').src = images[theme];
  document.getElementById('quote-author').classList.add(`${theme}-quote-author`);
  document.getElementsByClassName('table')[0].classList.add(`${theme}-table`);
  document.querySelectorAll('.card-subtitle').forEach(element=>element.classList.remove('text-muted'));
  document.querySelectorAll('.list-group-item').forEach(element=>element.children[0].classList.remove('text-muted'));
  document.querySelectorAll('.list-group-item').forEach(element=>element.children[0].classList.add(`${theme}-list-group-item-text`));
  //document.getElementById('button-dropdown').classList.add(`${theme}-button-dropdown`);
  //document.querySelectorAll('.dropdown-item').forEach(element=>element.classList.add(`${theme}-dropdown-item`));
  
}