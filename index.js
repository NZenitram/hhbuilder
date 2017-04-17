window.onload = function() {
  var add = document.getElementsByClassName('add')
  add[0].addEventListener('click', clearPeople)
  var ul = document.createElement("ul")
  ul.setAttribute('id', 'list')
  ul.setAttribute('style', 'list-style: none')
  var div = document.getElementsByClassName('builder')[0]
  div.appendChild(ul)
  appendBuilder()
}

// objects
var Person = function(age, relationship, smoker) {
  this.age = age;
  this.relationship = relationship;
  this.smoker = smoker;
}

function clearPeople(e) {
  var list = document.getElementById('list');
  list.innerHTML = '';
  validateAge();
  e.preventDefault();
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
  var household = localStorage.getItem('household')
  var ul = document.getElementById('list')

  if (household !== null) {
    var people = JSON.parse(localStorage.getItem('household'))
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
    remove[i].addEventListener('click', findPerson)
  }
}

function findPerson() {
  var age = this.parentElement.children[0].children[0].children[1].children[0].innerText
  var relationship = this.parentElement.children[0].children[0].children[1].children[1].innerText
  var smoker = this.parentElement.children[0].children[0].children[1].children[2].innerText
  var household = JSON.parse(localStorage.getItem('household'))
  deletePerson(age, relationship, smoker, household)
}

function deletePerson(age, relationship, smoker, household) {
  for (var i = 0; i < household.length; i++) {
    if (household[i].age === age && household[i].relationship === relationship) {
      household.splice(i, 1)
    }
  }
  localStorage.setItem('household', JSON.stringify(household))
  appendBuilder()
}
