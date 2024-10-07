const imageLink = {
  math: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE81m_cSZVahfLCxpBiumFDl6We1qPbDJXlg&s",
  physics:
    "https://miro.medium.com/v2/resize:fit:1024/1*bWlRl9D3jkJR06_oO0cP_Q.png",
  chemistry:
    "https://images.shiksha.com/mediadata/images/articles/1629702236phpPR4RUj.jpeg",
  biology:
    "https://img.freepik.com/premium-vector/biology-doodle-set-collection-hand-drawn-elements-science-biology-isolated-white-background_308665-1569.jpg",
  english:
    "https://as2.ftcdn.net/v2/jpg/02/80/12/65/1000_F_280126582_Ig4OLIbbSryXwe2S63aBu2TKY0Bj9WjH.jpg",
  history:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwHrywq-qhKrn_w3Q1u4aVmek2QVcP2VuN8g&s",
  geography: "",
  french: "",
};

const app = new Vue({
  el: "#app",
  data: {
    selectedValue: "subject",
    selectedSortOrder: "ascending",
    title: "Shop",
    name: "",
    nameError: "",
    phone: "",
    phoneError: "",
    cart: [],
    classes: [],
    checkoutBtn: true,
    searchResult: [],
    searchQuery: "",
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
            const response = await fetch(
              "http://localhost:3000/classes/checkout",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: this.name,
                  phone: this.phone,
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
              this.cart = [];
              this.title = "Shop";
              alert("Checkout successful");
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
      this.checkoutBtn = false;
      const regexText = new RegExp("^[a-zA-Z]*$");
      const regexNum = new RegExp("^[0-9]*$");
      if (this.name.length === 0) {
        this.nameError = "Name is required";
        this.checkoutBtn = true;
      }
      if (this.phone.length === 0) {
        this.phoneError = "Phone is required";
        this.checkoutBtn = true;
      }
      if (this.name.length > 0) {
        if (regexText.test(this.name) === false) {
          this.nameError = "Name must be alphabetic";
          this.checkoutBtn = true;
        }
      }
      if (this.phone.length > 0) {
        if (regexNum.test(this.phone) === false) {
          this.phoneError = "Phone number must be numeric";
          this.checkoutBtn = true;
        }
      }
    },
    search: function () {},
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
  watch: {
    selectedValue: "sortClasses",
    selectedSortOrder: "sortClasses",
    name: "validation",
    phone: "validation",
    searchQuery: async function () {
      try {
        if (this.searchQuery !== "") {
          this.searchMode = true;
          const response = await fetch(
            `http://localhost:3000/classes/search?search=${this.searchQuery.toString()}`,
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
  mounted: function () {
    this.sortClasses();

    const load = async () => {
      try {
        const response = await fetch("http://localhost:3000/classes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        this.classes = data;
      } catch (error) {
        console.error(error);
      }
    };
    load();
  },
});
