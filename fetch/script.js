const book_url =
  "https://uconndxlab.github.io/json-phonebook-example/dxlab-staff.json";

function getBook() {
  fetch(book_url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.contacts);
      const people = data.contacts
        .sort((a, b) => a.lastname.localeCompare(b.lastname))
        .map((data) => {
          return `<div class="contacts">
          <h2>${data.firstname + " " + data.lastname}</h2>
          <h3>${data.title}</h3>
          <p>Email: ${data.email}</p>
          <p>Phone: ${data.phone}</p>
          <p>Birthday: ${data.birthdate}</p>
          </div>`;
        })
        .join(" ");
      console.log(people);
      document.querySelector("#ppl").insertAdjacentHTML("afterbegin", people);
    })
    .catch(function (error) {
      console.log(error);
    });
}
getBook();

/*   .then((response) => response.json())
  .then((data) => console.log("data is", data))
  .catch((error) => console.log("error is", error)); */

/* const data_url =
  "https://uconndxlab.github.io/json-phonebook-example/dxlab-staff.json";

async function getBook() {
  const response = await fetch(data_url);
  const data = await response.json();
  console.log(data.contacts);
}

getBook(); */
