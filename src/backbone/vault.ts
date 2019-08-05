import * as moment from 'moment';

export function isObjectLiteral(obj: any) {
  if (typeof (obj) === 'object') {
    if (obj === null) {
      return false;
    }
    if (obj.constructor === Object) {
      return true;
    }
    return false;
  }
  return false;
}

export function date_formatter(date: string) {
  // format --- December 23, 2017 - 10:40 PM
  // console.log(date);
  return moment(date).format('MMMM D, YYYY - h:mm A');
}

export function formatAllDateProperties(obj: any, dateProp: string) {
  if (isObjectLiteral(obj)) {
    const keys = Object.keys(obj);
    for (const key of keys) {
      if (typeof (obj[key]) === 'string') {
        if (key === dateProp) {
          obj[key] = date_formatter(obj[key]);
        }
      }
      if (typeof (obj[key]) === 'object') {
        formatAllDateProperties(obj[key], dateProp);
      }
    }
  } else if (Array.isArray(obj)) {
    for (const item of obj) {
      formatAllDateProperties(item, dateProp);
    }
  }
}

export const flash_message = function(message: string, alertType: string = 'primary', duration: number = 3) {
  duration = parseInt(String(duration + '000'), 10);
  message = message.trim();
  const id = (Math.random().toString(36).substr(2, 34) + Date.now());

  const el = window.document.createElement('div');
  el.innerHTML = `
  <div id="${id}" class="alert alert-${alertType} ghost transition">
    <p><strong>${message}</strong></p>
  </div>
  `;

  window.document.getElementById('message_box').appendChild(el);
  const msgBox = window.document.getElementById(id);

  setTimeout(() => {
    msgBox.classList.remove('ghost');
    setTimeout(() => {
      msgBox.classList.add('ghost');
      setTimeout(() => {
        el.remove();
      }, 100);
    }, duration);
  }, 100);
}

export function enable_buttons() {
  document.querySelectorAll('button').forEach(button => {
    button.removeAttribute('disabled');
  });
}

export function disable_buttons() {
  document.querySelectorAll('button').forEach(button => {
    button.setAttribute('disabled', 'true');
  });
}