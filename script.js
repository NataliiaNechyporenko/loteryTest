function select(name) {
  return document.querySelector(name);
};

let participants = [];
let winners_list_items = "";

let registration = {
  nameError: "",
  surnameError: "",
  emailError: "",
  phoneError: "",
  errorMessage: select("#error-message"),

  name: "",
  surname: "",
  email: "",
  phone: "-",

  checkRegName: function() {
    let name = select("#name").value;
    let namePattern = /^(\s?[A-Za-z]+){1,3}$|^(\s?[а-яёА-ЯЁ]+){1,3}$|^(\s?[а-щьюяєіїґ’'`А-ЩЮЯЄІЇҐ]+){1,3}$/;
    let checkName = namePattern.test(name);

    if (!checkName) {
      select("#name").classList.add("input--error");
      this.nameError = "Enter your real name.";
    } else {
      this.nameError = "";
      this.name = name;
      select("#name").classList.remove("input--error");
    }

    this.showErrorMessage();
    return checkName;
  },

  checkRegSurname: function() {
    let surname = select("#surname").value;
    let surnamePattern = /^(\s?[A-Za-z]+){1,3}$|^(\s?[а-яёА-ЯЁ]+){1,3}$|^(\s?[а-щьюяєіїґ’'`А-ЩЮЯЄІЇҐ]+){1,3}$/;
    let checkSurname = surnamePattern.test(surname);

    if (!checkSurname) {
      select("#surname").classList.add("input--error");
      this.surnameError = "Enter your real surname.";
    } else {
      this.surnameError = "";
      this.surname = surname;
      select("#surname").classList.remove("input--error");
    }

    this.showErrorMessage();
    return checkSurname;
  },

  checkRegEmail: function() {
    let email = select("#email").value;
    let emailPattern = /^\w+([\.-]?\w+)*@[a-z]+([\.-]?\w+)*(\.\w{2,6})+$/;
    let checkEmail = emailPattern.test(email);

    if (!checkEmail) {
      select("#email").classList.add("input--error");
      this.emailError = "Maybe you`ve got mistake in e-mail.";
    } else {
      this.emailError = "";
      this.email = email;
      select("#email").classList.remove("input--error");
    }

    this.showErrorMessage();
    return checkEmail;
  },

  checkRegPhone: function() {
    let phone = select("#phone").value;
    if (phone !== "") {
      let phonePattern = /^(\+\d{2})?\d{10}$/;
      let checkPhone = phonePattern.test(phone);

      if (!checkPhone) {
        select("#phone").classList.add("input--error");
        this.phoneError = "Enter correct phone number, please.";
      } else {
        this.phoneError = "";
        this.phone = phone;
        select("#phone").classList.remove("input--error");
      }

      this.showErrorMessage();
      return checkPhone;
    } else {
      return true;
    }
  },

  showErrorMessage: function() {
    return (this.errorMessage.innerHTML = `${this.nameError} ${
      this.surnameError
    } ${this.emailError} ${this.phoneError}`);
  },

  addNewUser: function() {
    if (
      this.checkRegName() &&
      this.checkRegSurname() &&
      this.checkRegPhone() &&
      this.checkRegEmail()
    ) {
      let checkParticipant = participants.find(
        (participant) => participant.email === this.email
      );

      if (checkParticipant === undefined) {
        let new_participant = {
          name: this.name,
          surname: this.surname,
          email: this.email,
          phone: this.phone
        };
        participants = [new_participant, ...participants];
        showParticipants();
        this.name = "";
        this.surname = "";
        this.email = "";
        this.phone = "-";
        select("#registration-form").reset();
      } else {
        this.emailError = "A user with this email already exists";
        this.showErrorMessage();
      }
    } else {
      this.showErrorMessage();
    }
    return;
  }
};

function showParticipants() {
  if (participants.length > 0) {
    let tableWrapper = select("#info-block");
    tableWrapper.classList.add("info-block--show");
    let infoBody = select("#table-info-body");
    infoBody.innerHTML = "";
    let rows = participants
      .map(
        (participant) => `
      <tr>
        <td>${participant.name}</td>
        <td>${participant.surname}</td>
        <td>${participant.email}</td>
        <td>${participant.phone}</td>
      </tr>
      `
      )
      .join("");

    infoBody.insertAdjacentHTML("afterbegin", rows);
  }
};

function getWinner () {
  if (participants.length > 0) {
    select("#winners-list-wrapper").innerHTML = "";
    let winnerIndex = Math.floor(Math.random() * participants.length);
    let winner = participants[winnerIndex];

    winners_list_items += `<li>${winner.name} ${winner.surname}, ${winner.email}</li>`;
    let winners_list = `<ul class="winners_list">${winners_list_items}</ul>`;

    select("#winners-list-wrapper").insertAdjacentHTML("afterbegin", winners_list);
  } else {
    select("#winners-list-wrapper").innerHTML = "There is no participants, yet!";
  }
};

select("#registration-form").addEventListener("submit", (event) => {
  event.preventDefault();
  registration.addNewUser();
});
