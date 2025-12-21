# GhorerRanna 🍽️  
**A Marketplace for Local Home-Cooked Meals**

GhorerRanna is a modern full-stack web application that connects local home cooks (Chefs) with customers who want fresh, affordable, and homemade meals. The platform supports role-based dashboards (User, Chef, Admin), secure authentication, real-time order management, reviews, favorites, and visual analytics.

---

## 🧩 Project Overview

GhorerRanna enables:
- Customers to browse meals, place orders, make payments, review food, and manage favorites.
- Chefs to create meals, manage orders, and track delivery status.
- Admins to manage users, approve role requests, monitor fraud users, and view platform statistics.

The application follows a **role-based access control (RBAC)** model with JWT-secured private routes.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- Firebase Email & Password Authentication
- JWT-based secure API access
- Role-based private routes (User / Chef / Admin)
- Protected dashboards

---

### 👥 User Roles

#### 👤 Normal User (Customer)
- Register & login
- Browse meals with sorting & pagination
- View meal details (private)
- Place orders & confirm quantity
- Stripe payment integration
- Add/remove favorite meals
- Submit, update, and delete reviews
- Track order & payment status

#### 👨‍🍳 Chef
- Create and manage meals
- Update or delete meals
- View and manage order requests
- Accept, cancel, or deliver orders
- Live order status updates

#### 🛠️ Admin
- Manage users and fraud status
- Approve or reject Chef/Admin requests
- Generate unique Chef IDs
- View platform statistics
- Monitor total payments, users, and orders

---

### 🏠 Pages & Layout
- Responsive Navbar & Footer
- Home page with animated hero section (Framer Motion)
- Meals page with sorting, pagination, and details view
- Dashboard (role-based)
- Error page & global loading spinner
- Mobile-friendly responsive design

---

### 📊 Dashboard Features
- **User Dashboard:** Profile, Orders, Reviews, Favorites  
- **Chef Dashboard:** Create Meal, My Meals, Order Requests  
- **Admin Dashboard:** Manage Users, Manage Requests, Statistics  

---

### 📈 Platform Statistics
- Total payment amount
- Total users
- Pending & delivered orders
- Visualized using **Recharts**

---

## 🛠️ Technology Stack

### Frontend
- **React**
- **React Router DOM**
- **Tailwind CSS**
- **DaisyUI**
- **Framer Motion**
- **Axios**
- **React Hook Form**
- **React Icons**
- **React Toastify**
- **SweetAlert2**
- **React Spinners**
- **Swiper**
- **Recharts**
- **React Simple Typewriter**

### Backend
- **Node.js**
- **Express.js**
- **MongoDB**
- **JWT Authentication**

### Authentication
- **Firebase Authentication**

### Payments
- **Stripe**

---

## 📦 Installed NPM Packages

```bash
tailwindcss
daisyui
axios
firebase
framer-motion
react-hook-form
react-icons
react-router-dom
react-simple-typewriter
react-spinners
react-toastify
recharts
sweetalert2

---

## 🔗 Live Project
- https://ghorerranna-client.vercel.app
