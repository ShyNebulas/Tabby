const date = new Date();
let day = getDay();

function getDay() {
  const weekday = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return weekday[date.getDay()];
}

function addStar() {
  if(day != 'saturday' || day != 'sunday') {
    document.getElementById('day-' + day).innerHTML += ' ⭐';
  }
}

function highlightEvent() {
  const events = document.getElementsByClassName('badge badge-pill badge-dark');
  for(let i = 0; i < events.length; i++) {
    var start = new Date(date.getTime());
    start.setHours(events[i].innerHTML.slice(0, 2));
    start.setMinutes(events[i].innerHTML.slice(3, 5));
    var end = new Date(date.getTime());
    end.setHours(events[i].innerHTML.slice(8, 10));
    end.setMinutes(events[i].innerHTML.slice(11, 13));
    if(start < date && end > date && day == events[i].parentElement.parentElement.parentElement.id) {
      events[i].parentElement.parentElement.classList.add('current-event');
    }
  }
}

/*
setTimeout(() => {
  document.location.reload();
}, 5 * 60 * 1000);
*/

