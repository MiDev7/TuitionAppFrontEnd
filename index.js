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
    title: "Shop",
    cart: [],
    classes: [
      {
        subject: "Math",
        location: "London",
        price: "£320",
        space: "5",
      },
      { subject: "English", location: "London", price: "£320", space: "5" },
      {
        subject: "Chemistry",
        location: "London",
        price: "£320",
        space: "5",
      },
    ],
  },
  methods: {
    AddToCart: function (subject) {
      if (subject.space == 1) {
        this.classes = this.classes.filter(
          (c) => c.subject !== subject.subject
        );
      }
      subject.space = subject.space - 1;
      this.cart.push(subject);
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
      const store = document.querySelector("#store");
      const checkout = document.querySelector("#checkout");

      if (this.title === "Shop") {
        store.style.display = "none";
        checkout.style.display = "block";
        this.title = "Checkout";
      } else if (this.title === "Checkout") {
        store.style.display = "block";
        checkout.style.display = "none";
        this.title = "Shop";
      }
    },
  },
  computed: {
    buttonName: function () {
      if (this.title === "Shop") {
        return "Checkout";
      }
      return "Shop";
    },
  },
});
