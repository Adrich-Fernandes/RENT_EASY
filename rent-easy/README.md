# RentEase - Furniture & Appliance Rental Platform

RentEase is a modern full-stack web application designed to simplify the process of renting furniture and appliances. It provides a seamless experience for users to browse products, manage rentals, and report issues.

## 🚀 Features

- **User Authentication**: Secure sign-up and login powered by Clerk.
- **Product Catalog**: Browse a wide range of furniture and appliances with detailed information.
- **Rental Management**: Easily rent products and track your current rentals.
- **Issue Reporting**: Dedicated system for users to report and track issues with rented items.
- **Responsive Design**: Fully optimized for various screen sizes using Tailwind CSS.
- **Smooth Animations**: Interactive UI elements enhanced with Framer Motion.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS 4, Flowbite
- **Authentication**: Clerk
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Routing**: React Router 7

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens) & Bcryptjs
- **Environment Management**: Dotenv

## 📂 Project Structure

```text
RENT_EASY/
├── frontend/             # React application
│   ├── src/              # Source files
│   ├── public/           # Static assets
│   └── vite.config.js    # Vite configuration
├── backend/              # Node.js/Express server
│   ├── config/           # Database configuration
│   ├── controller/       # Request handlers
│   ├── models/           # Mongoose schemas
│   ├── routs/            # API endpoints
│   └── server.js         # Entry point
└── README.md             # Project documentation
```

## ⚙️ Setup and Installation

### Prerequisites
- Node.js installed
- MongoDB account (for database)
- Clerk account (for authentication)

### 1. Clone the repository
```bash
git clone <repository-url>
cd RENT_EASY
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder and add the following:
   ```env
   PORT=4000
   DB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
4. Start the server:
   ```bash
   npm run start
   ```

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` folder and add the following:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_API_URL=http://localhost:4000
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🌐 Deployment
The project is configured for deployment on **Vercel**.
- The backend includes a `vercel.json` for serverless function configuration.
- The frontend is a Vite-based SPA, easily deployable via the Vercel dashboard.

## 📄 License
This project is licensed under the ISC License.

---
Developed by **Adrich Fernandes**
