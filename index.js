var add = document.getElementsByClassName('add')

add[0].addEventListener('click', validateAge);

function validateAge() {
  var input = document.getElementsByName('age')[0].value;
  console.log(input);
  if (input === '') {
    alert("Age must be filled out");
    return false
  }
}
