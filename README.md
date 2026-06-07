# ShopHub

ShopHub is a modern ecommerce web application built with React, TypeScript, Firebase, and Tailwind CSS. The platform provides a complete online shopping experience with user authentication, product management, cart functionality, search, and an admin dashboard for managing products.

## Features

### Customer Features

* User registration and login
* Firebase Authentication
* Browse products
* Product search functionality
* Add products to cart
* Cart quantity management
* Responsive design for mobile and desktop
* User account page
* Checkout flow
* Loading states and user feedback
* Toast notifications

### Admin Features

* Secure admin dashboard
* Create products
* View products
* Update products
* Delete products
* Product management with Firebase Firestore

## Tech Stack

### Frontend

* React
* TypeScript
* React Router
* Tailwind CSS
* React Icons
* React Toastify

### Backend & Database

* Firebase Authentication
* Cloud Firestore

## Project Structure

src/
├── components/
│ ├── admin/
│ ├── Navbar.tsx
│ ├── Footer.tsx
│ ├── BottomNav.tsx
│ ├── Products.tsx
│ ├── Cart.tsx
│ ├── Login.tsx
│ ├── Signup.tsx
│ ├── Search.tsx
│ └── Accounts.tsx
├── hooks/
├── config/
├── App.tsx
└── main.tsx

## Installation

1. Clone the repository

```bash
git clone https://github.com/BenkillerX/ShopHub
```

2. Navigate to the project directory

```bash
cd shophub
```

3. Install dependencies

```bash
npm install
```

4. Configure Firebase

Create a Firebase project and add your Firebase configuration inside:

```bash
src/config/firebase.ts
```

5. Start the development server

```bash
npm run dev
```

## Environment Setup

Configure the following Firebase services:

* Authentication
* Cloud Firestore

## Key Functionality

### Authentication

Users can create accounts, sign in, and securely access their profiles using Firebase Authentication.

### Shopping Cart

Each authenticated user has a personal cart stored in Firestore. Cart quantities are synchronized in real time across the application.

### Product Search

Users can search for products using the search functionality available in the navigation bar.

### Admin Dashboard

Administrators can manage products through a protected dashboard with CRUD operations.

## Future Improvements

* Payment gateway integration
* Order tracking
* Wishlist functionality
* Product categories
* Product reviews and ratings
* Push notifications
* Inventory management
* Analytics dashboard

## Author

Developed by DevBen

## License

This project is for educational and portfolio purposes.
