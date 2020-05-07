const title = document.getElementById('title')
const description = document.getElementById('description')
const password = document.getElementById('password')
const image = document.getElementById('image_url')
const search = document.getElementById('pac-input')
const form = document.getElementById('form')

const validInput = function () {
form.addEventListener('submit', (e) => {
  let messages = []
  if (title.value === '' || title.value == null) {
    messages.push('Title is required')
  }
  if (description.value === ''|| description.value === null) {
    messages.push('Description is required')
  }
  if (search.value === '' || search.value == null) {
    messages.push('You must search for something')
  }
  if (image.value === '' || image.value == null) {
    messages.push('Image URL is required')
  }
  return false;
});
}
$(document).ready(() => {
validInput();
});
