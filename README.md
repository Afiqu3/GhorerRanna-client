# GhorerRanna 🍽️
**A Marketplace for Local Home-Cooked Meals**

GhorerRanna is a modern full-stack web application that connects local home cooks (Chefs) with customers who want fresh, affordable, and homemade meals. The platform supports role-based dashboards (User, Chef, Admin), secure authentication, real-time order management, reviews, favorites, and visual analytics.

---

## 🔗 Live Project Links

| Service | URL |
| ------- | --- |
| Client (this repo) | https://ghorerranna-client.vercel.app |
| Server API | https://ghorerranna-server-api.vercel.app |

> Client API baseURL is hardcoded in `src/hooks/useAxios.jsx:4` and `src/hooks/useAxiosSecure.jsx:7` to `https://ghorerranna-server-api.vercel.app`.

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
- Firebase Email & Password Authentication + Social Login
- JWT-based secure API access
- Role-based private routes (User / Chef / Admin)
- Protected dashboards

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

### 🏠 Pages & Layout
- Responsive Navbar & Footer
- Home page with animated hero section (Motion)
- Meals page with sorting, pagination, and details view
- Dashboard (role-based)
- Error page & global loading spinner
- Mobile-friendly responsive design

### 📊 Dashboard Features
- **User Dashboard:** Profile, Orders, Reviews, Favorites
- **Chef Dashboard:** Create Meal, My Meals, Order Requests
- **Admin Dashboard:** Manage Users, Manage Requests, Statistics

### 📈 Platform Statistics
- Total payment amount
- Total users
- Pending & delivered orders
- Visualized using **Recharts**

---

## 🛠️ Technology Stack

### Frontend
- **React 19 + Vite 7**
- **React Router v7** (`react-router`)
- **Tailwind CSS v4** (`tailwindcss` + `@tailwindcss/vite`)
- **DaisyUI**
- **Firebase Authentication**
- **Axios + TanStack React Query**

### Backend
- **Node.js**
- **Express.js**
- **MongoDB**
- **JWT Authentication**

### Services
- **Firebase Authentication**
- **Stripe** (payments)
- **ImgBB** (image upload via `VITE_IMAGE_HOST` key, see `src/pages/Dashboard/CreateMeal/CreateMeal.jsx:92`)

---

## 📦 Dependencies Used

From `package.json`:

### Dependencies

| Package | Version | Purpose |
| ------- | ------- | ------- |
| `react`, `react-dom` | `^19.2.0` | UI library |
| `react-router` | `^7.10.1` | Routing (`src/routes/Router.jsx`, `src/main.jsx:4`) |
| `@tanstack/react-query` | `^5.90.12` | Server-state fetching / caching (`src/main.jsx:9`) |
| `axios` | `^1.13.2` | HTTP client (`src/hooks/useAxios.jsx`, `src/hooks/useAxiosSecure.jsx`) |
| `firebase` | `^12.6.0` | Auth (`src/firebase/firebase.init.js`) |
| `tailwindcss`, `@tailwindcss/vite` | `^4.1.17` | Styling (`src/index.css`, `vite.config.js:3`) |
| `motion` | `^12.23.25` | Animations (Motion, Framer Motion successor) |
| `react-hook-form` | `^7.68.0` | Form handling / validation |
| `react-icons` | `^5.5.0` | Icons |
| `react-simple-typewriter` | `^5.0.1` | Typewriter effect on Home |
| `react-spinners` | `^0.17.0` | Loading spinners |
| `react-toastify` | `^11.0.5` | Toast notifications (`src/main.jsx:8`) |
| `recharts` | `^3.6.0` | Admin statistics charts |
| `sweetalert2` | `^11.26.4` | Confirm dialogs / alerts |
| `swiper` | `^12.0.3` | Carousels / sliders |

### Dev Dependencies

| Package | Version | Purpose |
| ------- | ------- | ------- |
| `vite` | `^7.2.4` | Dev server + build |
| `@vitejs/plugin-react` | `^5.1.1` | React plugin for Vite (`vite.config.js:2`) |
| `daisyui` | `^5.5.8` | Tailwind component library |
| `eslint`, `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `globals` | see `package.json` | Linting (`eslint.config.js`, `npm run lint`) |
| `@types/react`, `@types/react-dom` | `^19.2.x` | Type definitions |

Install all with:
```bash
npm install
```

---

## ✅ Prerequisites

- **Node.js 20+** (tested on v24.17.0) + npm
- A **Firebase Web project** (for Auth keys)
- An **ImgBB API key** (for meal / profile image uploads)
- Backend running — default is the live API above, no local backend setup required for client-only run

---

## 🏃 How to Run Locally (Step-by-Step)

### 1. Clone the repository
```bash
git clone <your-client-repo-url>
cd GhorerRanna-client
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create environment file
Create a `.env` file in the project root (same level as `package.json`, `vite.config.js`):

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_IMAGE_HOST=your_imgbb_api_key
```

These map to `src/firebase/firebase.init.js:9-14` and ImgBB upload in `src/pages/Dashboard/CreateMeal/CreateMeal.jsx:92` / `src/pages/Auth/Register/Register.jsx`.

### 4. Run the dev server
```bash
npm run dev
```

Open:
```
http://localhost:5173
```
Vite prints the exact port if 5173 is busy.

### 5. Other scripts
```bash
npm run build   # production build -> dist/
npm run preview # preview production build locally
npm run lint    # run ESLint
```

### 6. Build output / deployment
- SPA fallback is configured in `vercel.json` (`/(.*)` → `/index.html`), required for React Router.
- Deploy `dist/` to Vercel / Netlify, and set the same `VITE_*` env vars in the hosting dashboard.

---

## 📁 Key Files

- `src/main.jsx` — QueryClient, AuthProvider, ThemeProvider, Router setup
- `src/routes/Router.jsx` — all public / private / Chef / Admin routes
- `src/firebase/firebase.init.js` — Firebase init from `VITE_FIREBASE_*`
- `src/hooks/useAxios.jsx`, `src/hooks/useAxiosSecure.jsx` — API baseURL
- `vite.config.js` — React + Tailwind plugins
- `vercel.json` — SPA rewrite rule
