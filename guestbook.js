const form = document.querySelector('#guestbook-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');
const notice = document.querySelector('#notice');
const list = document.querySelector('#list');
const empty = document.querySelector('#empty');
const count = document.querySelector('#count');
let items = [];

function clearNotice() {
  notice.textContent = '';
}

function showList() {
  list.innerHTML = '';
  for (let i = 0; i < items.length; i++) {
    const li = document.createElement('li');
    li.textContent = items[i];
    const removeButton = document.createElement('button');
    removeButton.textContent = '삭제';
    removeButton.addEventListener('click', function () {
      const removed = items.splice(i, 1);
      console.log('삭제 :', removed[0], '/ 남은 글', items.length, '개');
      notice.textContent = '글을 삭제했습니다.';
      showList();
    });
    li.append(removeButton);
    list.append(li);
  }
  count.textContent = `${items.length}개`;
  console.log('그린 뒤 items :', items);
  if (items.length === 0) {
    empty.textContent = '아직 남긴 글이 없습니다.';
  } else {
    empty.textContent = '';
  }
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();
  if (name === '') {
    notice.textContent = '이름을 입력하세요.';
    nameInput.focus();
    return;
  }
  if (message === '') {
    notice.textContent = '메시지를 입력하세요.';
    messageInput.focus();
    return;
  }
  notice.textContent = '글을 남겼습니다.';
  if (email === '') {
    items.push(`${name}: ${message}`);
  } else {
    items.push(`${name}(${email}): ${message}`);
  }
  console.log('추가 :', items[items.length - 1], '/ 전체 글', items.length, '개');
  showList();
  form.reset();
  nameInput.focus();
});

nameInput.addEventListener('input', clearNotice);
messageInput.addEventListener('input', clearNotice);
showList();