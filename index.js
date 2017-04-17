// objects
var Person = function(age, relationship, smoker) {
  this.age = age;
  this.relationship = relationship;
  this.smoker = smoker;
}

// event listeners
var add = document.getElementsByClassName('add')
add[0].addEventListener('click', validateAge);

// form validation script
function validateAge() {
  var input = document.getElementsByName('age')[0].value;
  var rel = document.getElementsByName('rel')[0].value;
  var smoker = document.getElementsByName('smoker')[0].checked;

  var inputInt = parseInt(input)
  if (input === '') {
    alert("Age must be filled out");
    return false
  }
  if (inputInt < 1) {
    alert("Age must be greater than zero");
    return false
  }
  if (rel === '') {
    alert("You must select this person's relationship");
    return false
  }
  saveToLocalStorage(input, rel, smoker)
}

function saveToLocalStorage(input, rel, smoker) {
  debugger
}
