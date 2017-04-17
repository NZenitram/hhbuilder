window.onload = function() {
  var add = document.getElementsByClassName('add')[0]
  var ul = document.createElement("ul")
  var p = document.createElement('p')
  var div = document.getElementsByClassName('builder')[0]
  var submit = document.getElementsByTagName('button')[1]
  ul.setAttribute('id', 'list')
  ul.setAttribute('style', 'list-style: none')
  div.appendChild(ul)
  add.addEventListener('click', clearPeople)
  submit.addEventListener('click', submitHouseHold)
  appendBuilder()
}

// objects
var Person = function(age, relationship, smoker) {
  this.age = age;
  this.relationship = relationship;
  this.smoker = smoker;
}

// clear list with form validation after add
function clearPeople(e) {
  var list = document.getElementById('list');
  list.innerHTML = '';
  validateAge();
  e.preventDefault()
}

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
  if (isNaN(inputInt)) {
    alert("Age must be entered as a number")
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
  clearFields()
}

// clear form on submit
function clearFields() {
  document.getElementsByName('age')[0].value = ''
  document.getElementsByName('rel')[0].value = ''
  document.getElementsByName('smoker')[0].checked = false
}

// save person to localStorage - household
function saveToLocalStorage(input, rel, smoker) {
  var person = new Person(input, rel, smoker)
  var houseHold = JSON.parse(localStorage.getItem('household')) || [];
  houseHold.push(person)
  localStorage.setItem('household', JSON.stringify(houseHold))
  appendBuilder()
}

// append div with household
function appendBuilder() {
  var ul = document.getElementById('list')
  var people = JSON.parse(localStorage.getItem('household'))
  if (people !== null) {
    for (var i = 0; i < people.length; i++) {
      var li = document.createElement("li")

      li.className = `person-${i}`

      li.innerHTML = `<table>
                        <tr>
                          <th>Age:</th>
                          <th>Relationship:</th>
                          <th>Smoker:</th>
                        </tr>
                        <tr>
                          <td>${people[i].age}</td>
                          <td>${people[i].relationship}</td>
                          <td>${people[i].smoker}</td>
                        </tr>
                      </table>
                      <button type="button" class="delete"> Delete </button>`

      ul.appendChild(li)
    }
  }
  removePerson()
}

// remove person from household
function removePerson() {
  var remove = document.getElementsByClassName('delete')
  for (var i = 0; i < remove.length; i++) {
    remove[i].addEventListener('click', getPersonAttributes)
  }
}

// gather table attributes for persoin
function getPersonAttributes() {
  var age = this.parentElement.children[0].children[0].children[1].children[0].innerText
  var relationship = this.parentElement.children[0].children[0].children[1].children[1].innerText
  var household = JSON.parse(localStorage.getItem('household'))
  deletePerson(age, relationship, household)
}

// delete person from local storage
function deletePerson(age, relationship, household) {
  for (var i = 0; i < household.length; i++) {
    if (household[i].age === age && household[i].relationship === relationship) {
      household.splice(i, 1)
    }
  }
  localStorage.setItem('household', JSON.stringify(household))
  clearList()
}

// delete without form validation on click
function clearList() {
  var list = document.getElementById('list');
  list.innerHTML = '';
  appendBuilder();
}

// Submit household
function submitHouseHold(e) {
  var debug = document.getElementsByClassName('debug')[0]
  var household = localStorage.getItem('household')
  debug.style.display = 'inline';
  debug.innerText= `${household}`
  e.preventDefault()
}
