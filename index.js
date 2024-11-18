const imageLink = {
  math: "https://tutorialappbackend.onrender.com/static/math.jpeg",
  physics: "https://tutorialappbackend.onrender.com/static/physics.png",
  chemistry: "https://tutorialappbackend.onrender.com/static/chemistry.jpeg",
  biology: "https://tutorialappbackend.onrender.com/static/biology.png",
  english: "https://tutorialappbackend.onrender.com/static/english.jpg",
  history: "https://tutorialappbackend.onrender.com/static/history.jpeg",
  geography: "https://tutorialappbackend.onrender.com/static/geography.jpeg",
  french: "",
};

const app = new Vue({
  el: "#app",
  data: {
    selectedValue: "subject",
    selectedSortOrder: "ascending",
    title: "Shop",
    name: "",
    phone: "",
    email: "",
    address: "",
    cart: [],
    classes: [],
    checkoutBtn: true,
    searchResult: [],
    searchQuery: "",
    // Errors
    phoneError: "",
    nameError: "",
    emailError: "",
    addressError: "",
    // Search
    searchMode: false,
    noResult: false,
  },
  methods: {
    AddToCart: async function (subject) {
      subject.space = subject.space - 1;

      let newClass = { ...subject };

      let cartItem = this.cart.find((item) => item._id === newClass._id);

      if (cartItem) {
        cartItem.space++;
      } else {
        newClass.space = 1;

        this.cart.push(newClass);
      }
    },
    RemoveToCart: function (subject) {
      this.cart.forEach((element) => {
        if (element._id === subject._id) {
          element.space--;

          if (element.space === 0) {
            this.cart = this.cart.filter((item) => item._id !== element._id);
          }
        }
      });

      this.classes.forEach((element) => {
        if (element._id === subject._id) {
          element.space++;
        }
      });

      if (this.cart.length === 0) {
        this.title = "Shop";
      }
    },
    ImageLink: function (subject) {
      switch (subject) {
        case "Math":
          return imageLink.math;
        case "Physics":
          return imageLink.physics;
        case "Chemistry":
          return imageLink.chemistry;
        case "Biology":
          return imageLink.biology;
        case "English":
          return imageLink.english;
        case "History":
          return imageLink.history;
        case "Geography":
          return imageLink.geography;
        case "French":
          return imageLink.french;
        default:
          return "";
      }
    },
    ToggleSectionChange: function () {
      if (this.title === "Shop") {
        this.title = "Cart";
      } else if (this.title === "Cart") {
        this.title = "Shop";
      }
    },
    sortClasses() {
      const sortCriteria = {
        subject: (a, b) => a.subject.localeCompare(b.subject),
        location: (a, b) => a.location.localeCompare(b.location),
        price: (a, b) => a.price - b.price,
        availability: (a, b) => a.space - b.space,
      };

      const sortOrder = this.selectedSortOrder === "ascending" ? 1 : -1;
      const criteria = sortCriteria[this.selectedValue];

      if (criteria) {
        this.classes.sort((a, b) => sortOrder * criteria(a, b));
        this.searchResult.sort((a, b) => sortOrder * criteria(a, b));
      }
    },
    Checkout: function () {
      if (this.checkoutBtn === false) {
        const postCheckout = async () => {
          try {
            // Update class space
            this.cart.forEach((item) => {
              this.classes.forEach(async (element) => {
                if (element._id === item._id) {
                  await fetch(
                    `https://tutorialappbackend.onrender.com/lesson`,
                    {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        _id: element._id,
                        subject: element.subject,
                        location: element.location,
                        price: element.price,
                        space: element.space,
                      }),
                    }
                  );
                }
              });
            });

            // Post checkout
            const response = await fetch(
              "https://tutorialappbackend.onrender.com/order",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: this.name,
                  phone: this.phone,
                  email: this.email,
                  address: this.address,
                  date: new Date().toISOString(),
                  total: this.total,
                  cart: this.cart,
                }),
              }
            );

            const data = await response.json();
            if (data.message === "Class already booked with that name") {
              alert("Class already booked with that name");
              this.name = "";
              this.phone = "";
              this.checkoutBtn = true;
            } else {
              this.title = "Shop";
              let modal = document.querySelector("#modal");

              modal.style.display = "block";

              window.onclick = (event) => {
                if (event.target === modal) {
                  this.cart = []; 
                  modal.style.display = "none";
                }
              };
            }
          } catch (error) {
            alert("Checkout failed");
            console.error(error);
          }
        };
        postCheckout();
      }
    },
    validation: function () {
      this.nameError = "";
      this.phoneError = "";
      this.emailError = "";
      this.addressError = "";
      this.checkoutBtn = false;
      const regexText = new RegExp("^[a-zA-Z]*$");
      const regexNum = new RegExp("^[0-9]*$");
      const regexEmail = new RegExp(
        "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
      );
      //* Name Validation
      if (this.name.length === 0) {
        this.nameError = "Name is required";
        this.checkoutBtn = true;
      }

      if (this.name.length > 0) {
        if (regexText.test(this.name) === false) {
          this.nameError = "Name must be alphabetic";
          this.checkoutBtn = true;
        }
      }

      //* Phone Validation
      if (this.phone.length === 0) {
        this.phoneError = "Phone is required";
        this.checkoutBtn = true;
      }
      if (this.phone.length > 0) {
        if (regexNum.test(this.phone) === false) {
          this.phoneError = "Phone number must be numeric";
          this.checkoutBtn = true;
        }
      }
      //* Email validation
      if (this.email.length === 0) {
        this.emailError = "Email is required";
        this.checkoutBtn = true;
      }

      if (this.email.length > 0) {
        if (regexEmail.test(this.email) === false) {
          this.emailError = "Email must be valid";
          this.checkoutBtn = true;
        }
      }

      //* Address validation
      if (this.address.length === 0) {
        this.addressError = "Address is required";
        this.checkoutBtn = true;
      }

      if (
        this.nameError === "" &&
        this.phoneError === "" &&
        this.emailError === "" &&
        this.addressError === ""
      ) {
        this.checkoutBtn = false;
      }
    },
    search: async function () {
      try {
        if (this.searchQuery !== "") {
          this.searchMode = true;
          const response = await fetch(
            `https://tutorialappbackend.onrender.com/search?search=${this.searchQuery.toString()}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();

          if (data.length === 0) {
            this.noResult = true;
          } else {
            this.noResult = false;
            this.searchResult = data;
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  computed: {
    total: function () {
      return this.cart.reduce((acc, item) => acc + item.price * item.space, 0);
    },
    buttonName: function () {
      if (this.title === "Shop") {
        return "Cart";
      }
      return "Shop";
    },
  },
  mounted: function () {
    this.sortClasses();

    const load = async () => {
      try {
        const response = await fetch(
          "https://tutorialappbackend.onrender.com/lessons",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        this.classes = data;
      } catch (error) {
        console.error(error);
      }
    };
    load();
  },
});
