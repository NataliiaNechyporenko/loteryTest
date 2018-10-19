function select(name) {
  return document.querySelector(name);
}

let registration = {
  nameError: "",
  surnameError: "",
  emailError: "",
  phoneError: "",
  errorMessage: select("#error-message"),


  checkRegName: function () {
      let name = select("#name").value;
      let namePattern = /^(\s?[A-Za-z]+){1,3}$|^(\s?[а-яёА-ЯЁ]+){1,3}$|^(\s?[а-щьюяєіїґ’'`А-ЩЮЯЄІЇҐ]+){1,3}$/;
      let checkName = namePattern.test(name);
      if (!checkName) {
          select("#name").classList.add("input--error");
          this.nameError = "Enter your real name.";
      } else {
          this.nameError = "";
          select("#name").classList.remove("input--error");
      }
      this.showErrorMessage();

      return checkName;
  },
  checkRegSurname: function () {
      let surname = select("#surname").value;
      let surnamePattern = /^(\s?[A-Za-z]+){1,3}$|^(\s?[а-яёА-ЯЁ]+){1,3}$|^(\s?[а-щьюяєіїґ’'`А-ЩЮЯЄІЇҐ]+){1,3}$/;;
      let checkSurname = surnamePattern.test(surname);
      if (!checkSurname) {
          select("#surname").classList.add("input--error");
          this.surnameError = "Enter your real surname.";
      } else {
          this.surnameError = "";
          select("#surname").classList.remove("input--error");
      }
      this.showErrorMessage();

      return checkSurname;
  },
  checkRegEmail: function () {
      let email = select("#email").value;
      let emailPattern = /^\w+([\.-]?\w+)*@[a-z]+([\.-]?\w+)*(\.\w{2,6})+$/;
      let checkEmail = emailPattern.test(email);
      if (!checkEmail) {
          select('#email').classList.add("input--error");
          this.emailError = "Maybe you`ve got misteke in e-mail.";

      } else {
          this.emailError = '';
          select('#email').classList.remove("input--error");
      }
      this.showErrorMessage();
      return checkEmail;
  },

  checkRegPhone: function () {
      let phone = select("#phone").value;
      let phonePattern = /^(\+\d{2})?\d{10}$/;
      let checkPhone = phonePattern.test(phone);
      if (!checkPhone) {
          select("#phone").classList.add("input--error");
          this.phoneError = "Enter correct phone number, please.";
      } else {
          this.phoneError = "";
          select("#phone").classList.remove("input--error");
      }

      this.showErrorMessage();
      return checkPhone;
  },

  showErrorMessage: function () {
    return this.errorMessage.innerHTML = `${this.nameError} ${this.surnameError} ${this.emailError} ${this.phoneError}`;
  },

  addNewUser: function () { 
    // evt.preventDefault();
    if ( this.checkRegName() && this.checkRegSurname() && this.checkRegPhone() && this.checkRegEmail() ) {
      console.log('validation OK');
    } else {
      this.showErrorMessage();
      console.log('validation False');
    }
    return;
  },
};

function submitHandler (evt) {
  console.log(evt);
  evt.preventDefault();
  registration.addNewUser();
};
select("#submit").addEventListener("submit", submitHandler);

