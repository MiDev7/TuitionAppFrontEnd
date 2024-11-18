# After School Tutoring Application

This project is a web-based platform for managing after-school tutoring classes. It allows users to browse available classes, sort and search for classes, manage their cart, and complete a checkout process.

---

## Features

1. \***\*Class Browsing\*\***: Display available classes with details such as subject, location, price, and available seats.

2. \***\*Search and Filter\*\***: Users can search classes by subject and sort them by attributes such as subject, location, price, or availability.

3. \***\*Cart Management\*\***: Add classes to a shopping cart, remove them, and view a summary of the cart.

4. \***\*Checkout Process\*\***: Users can input their personal information to confirm their booking.

5. \***\*Dynamic Receipt\*\***: A receipt is generated and displayed after a successful checkout.

---

## Technologies Used

- \***\*Frontend\*\***: HTML5, CSS3, Vue.js

- \***\*Backend API\*\***: REST API integration for data fetching and posting.

- \***\*Styling\*\***: Google Fonts, CSS Variables, and custom styles.

---

## Installation and Setup

1. \***\*Clone the Repository\*\***

```bash

git clone <git@github.com:MiDev7/TuitionAppFrontEnd.git>

cd <TuitionAppFrontEnd>

2.  **Dependencies**

-  Ensure you have a web server like [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) to host the files.

3.  **Run the Project**

-  Open the index.html file in your browser or run it on a local server.

**File Structure**

.

├── index.html # Main HTML structure of the app.

├── style.css  # Styling for the app.

└── README.md  # Project documentation.

**How It Works**

**Browsing Classes**

-  Visit the homepage to browse all available classes.

-  Each class card displays subject, location, price, and available seats.

**Searching and Sorting**

-  Use the search bar to find specific classes by subject.

-  Sort classes by attributes like subject, location, price, or availability using the sidebar options.

**Cart Management**

-  Add classes to the cart and switch between the "Shop" and "Cart" sections.

-  View details and the total cost of selected classes.

**Checkout**

-  Provide personal information (name, phone number, email, and address) to complete the booking process.

-  Validate input fields before submitting.

**Receipt**

-  After successful checkout, a receipt is displayed with class details and total cost.

**Styling Overview**

-  **Primary Colors**:

-  Main: #0071ce

-  Secondary: #ffc220

-  **Font Styles**:

-  Titles: "Pirata One"

-  Body: "Merriweather"

**API Endpoints**

-  **Fetch Classes**: /lessons (GET)

-  **Search Classes**: /search?search=<query> (GET)

-  **Book Class**: /order (POST)

-  **Update Class Availability**: /lesson (PUT)

**Future Enhancements**

1.  **Payment Gateway Integration**.

2.  **User Authentication** for managing bookings.

3.  **Responsive Design** for mobile compatibility.

**Screenshots**

Add relevant screenshots of the interface for a visual representation of the app.

**License**

This project is licensed under the MIT License.

**Contact**

For support or inquiries, please contact razafintsalamamikaia@gmail.com.

```
