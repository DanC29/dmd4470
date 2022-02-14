const book_url =
  "https://uconndxlab.github.io/json-phonebook-example/dxlab-staff.json";

function getBook() {
  fetch(book_url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.contacts, "hello");
      const people = data.contacts.sort((a, b) =>
        a.lastname.localeCompare(b.lastname)
      );
      for (i in people) {
        var ppl = new Person(
          data.contacts[i].firstname,
          data.contacts[i].lastname,
          data.contacts[i].title,
          data.contacts[i].email,
          data.contacts[i].email,
          data.contacts[i].phone,
          data.contacts[i].birthdate
        );
        document.getElementById("ppl").innerHTML += ppl.displayToPage();
      }
      console.log(people);
    })
    .catch(function (error) {
      console.log(error);
    });
}
getBook();

const cards = [];

class Person {
  constructor(firstname, lastname, title, email, phone, birthdate) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.title = title;
    this.email = email;
    this.phone = phone;
    this.birthdate = birthdate;
    this.name = this.firstname + " " + this.lastname;
    cards.push(this);
  }
  displayToPage() {
    return `<div class="contacts">
    <h2>${this.firstname + " " + this.lastname}</h2>
    <h3>${this.title}</h3>
    <p>Email: ${this.email}</p>
    <p>Phone: ${this.phone}</p>
    <p>Birthday: ${this.birthdate}</p>
    </div>`;
  }
}
