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
    cart: [],
    classes: [
      {
        id: 1,
        subject: "Math",
        location: "London",
        price: "320",
        space: "5",
      },
      {
        id: 2,
        subject: "English",
        location: "London",
        price: "320",
        space: "5",
      },
      {
        id: 3,
        subject: "Chemistry",
        location: "London",
        price: "320",
        space: "5",
      },
    ],
  },
  methods: {
    AddToCart: function (subject) {
      subject.space = subject.space - 1;

      let newClass = { ...subject };

      let cartItem = this.cart.find((item) => item.id === newClass.id);

      if (cartItem) {
        cartItem.space++;
      } else {
        newClass.space = 1;
        this.cart.push(newClass);
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
      }
    },
  },
  computed: {
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
  },
});
