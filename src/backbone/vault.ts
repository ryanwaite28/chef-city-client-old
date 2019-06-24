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