# 🛋️ RentEase — Furniture & Appliance Rental Platform

> A full-stack web application that lets users rent furniture and home appliances with ease. Built with **React + Vite** (frontend) and **Node.js + Express + MongoDB** (backend), with **Clerk** handling authentication.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Features](#-features)
  - [User Features](#-user-features)
  - [Admin Features](#-admin-features)
- [Pages & Routes](#-pages--routes)
- [Backend API](#-backend-api)
  - [Product API](#product-api----apiproduct)
  - [User API](#user-api----apiuser)
  - [Rent / Admin API](#rent--admin-api----apirent)
  - [Issue API](#issue-api----apiissue)
- [Database Models](#-database-models)
  - [User Model](#user-model)
  - [Product Model](#product-model)
  - [Issue Model](#issue-model)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#-environment-variables)
- [Authentication](#-authentication-clerk)
- [Role-Based Access Control](#-role-based-access-control)

---

## 🌐 Overview

**RentEase** is a modern rental platform that allows customers to browse, select, and rent furniture and home appliances on a monthly basis. Users can manage their rentals, submit maintenance requests, raise support issues, and track order statuses — all from one clean dashboard.

Admins have a dedicated panel to manage products, orders, maintenance requests, support issues, and expiring rentals.

---

## 🧰 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 + Vite | UI framework & build tool |
| React Router DOM v7 | Client-side routing |
| Tailwind CSS v4 | Styling |
| Framer Motion | Animations |
| Lucide React | Icon library |
| Axios | HTTP requests to the backend |
| Clerk React | Authentication (sign-in, sign-up, user sessions) |
| Flowbite | UI component library |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose | Database & ODM |
| bcryptjs | Password hashing |
| JSON Web Tokens (JWT) | Token-based auth utilities |
| dotenv | Environment variable management |
| CORS | Cross-Origin Resource Sharing |
| Nodemon | Auto-restart dev server |

---

## 📁 Project Structure

```
RENT_EASY/
└── rent-easy/
    ├── backend/
    │   ├── config/
    │   │   └── db.js                  # MongoDB connection setup
    │   ├── controller/
    │   │   ├── userController.js      # User, cart, rental, maintenance logic
    │   │   ├── productController.js   # Product CRUD logic
    │   │   ├── rentController.js      # Admin order & maintenance management
    │   │   └── issueController.js     # Support issue logic
    │   ├── models/
    │   │   ├── userModel.js           # User schema (cart, rentals, maintenance)
    │   │   ├── productModel.js        # Product schema
    │   │   └── issueModel.js          # Support issue schema
    │   ├── routs/
    │   │   ├── userRouts.js           # User API routes
    │   │   ├── ProductRouts.js        # Product API routes
    │   │   ├── RentRouts.js           # Rent/Admin API routes
    │   │   └── issueRouts.js          # Issue API routes
    │   ├── .env                       # Backend environment variables
    │   ├── package.json
    │   └── server.js                  # Express app entry point
    │
    └── frontend/
        ├── public/
        ├── src/
        │   ├── admin/
        │   │   ├── adminDashboard.jsx       # Admin home with stats overview
        │   │   ├── adminProductList.jsx     # Product management (CRUD)
        │   │   ├── adminOrders.jsx          # All rental orders management
        │   │   ├── adminIssues.jsx          # Support ticket management
        │   │   ├── expiringRentals.jsx      # Rentals nearing expiry
        │   │   └── mantain.jsx              # Maintenance request management
        │   ├── components/
        │   │   ├── userNavBar.jsx           # User navigation bar
        │   │   ├── adminNavBar.jsx          # Admin navigation bar
        │   │   ├── footer.jsx               # Site footer
        │   │   └── Skeleton.jsx             # Skeleton loading component
        │   ├── home/
        │   │   ├── homepage.jsx             # Landing page
        │   │   ├── cart.jsx                 # Shopping cart & checkout
        │   │   ├── contact.jsx              # Contact us page
        │   │   ├── reportIssue.jsx          # Submit a support issue
        │   │   └── issueStatus.jsx          # Track issue status
        │   ├── products/
        │   │   ├── productlist.jsx          # Browse all products
        │   │   └── productView.jsx          # Single product detail page
        │   ├── MyRentals/
        │   │   ├── activeRentals.jsx        # User's active rentals
        │   │   ├── orders.jsx               # User's order history
        │   │   ├── maintenance.jsx          # User's maintenance requests
        │   │   └── tabBar.jsx               # Tab navigation for MyRentals
        │   ├── api/                         # Axios API call helpers
        │   ├── assets/                      # Images and static assets
        │   ├── Alldata.jsx                  # Global data/context provider
        │   ├── App.jsx                      # Root component with routing
        │   ├── main.jsx                     # React app entry point
        │   └── index.css                    # Global styles
        ├── index.html
        ├── vite.config.js
        └── package.json
```

---

## ✨ Features

### 👤 User Features

#### 🏠 Homepage
- Hero section with a call-to-action to browse products.
- "How It Works" section explaining the rental process step by step.
- Features section highlighting key benefits of using RentEase.
- Category-based navigation to quickly filter products.

#### 🛍️ Product Browsing
- **Product List** — Browse all available furniture and appliances with category/subcategory filters and search.
- **Product View** — Detailed product page showing images, rent price per month, security deposit, and description.
- **Out of Stock** — Items marked as unavailable are shown with disabled purchase controls.

#### 🛒 Cart & Checkout
- Add products to cart with selected **quantity** and **rental tenure** (in months).
- View and manage cart items (update tenure, remove items).
- Choose a **saved delivery address** or add a new one during checkout.
- Select **payment method**: Cash on Delivery or Online.
- Place rental orders directly from the cart.

#### 📦 My Rentals
- **Active Rentals** tab — View all current rentals with their real-time delivery statuses:
  - `Ordered → Order Confirmed → Shipped → Out for Delivery → Delivered → Active`
  - Options to **Cancel** an order (before dispatch) or **Request a Return** (when active).
- **Orders** tab — Full history of all past and present orders with status tracking.
- **Maintenance** tab — Submit maintenance requests for actively rented products and track their progress.

#### 🔧 Maintenance Requests
- Report a product issue with a description.
- Request a reply/callback from the admin team.
- Track maintenance status: `Requested → Approved → In Progress → Completed`.

#### 🆘 Support & Issues
- **Report Issue** — Submit a support ticket with:
  - Category (Billing, Technical Support, Product Inquiry, Feedback, General Inquiry, Maintenance Request, Partner With Us, Other)
  - Subject, message, and priority (Low / Medium / High).
- **Issue Status** — Track all submitted issues and view admin replies.
- **Reopen** a resolved issue if the problem persists.

#### 📍 Address Management
- Save multiple delivery addresses to the account.
- Set a **default address** for faster checkout.
- Add or delete addresses from the cart/checkout flow.

#### 📞 Contact Page
- Static contact page with company information, email, phone, and location details.

---

### 🛠️ Admin Features

#### 📊 Admin Dashboard
- Overview statistics: total products, active rentals, pending maintenance, open issues.
- Quick navigation links to all admin management sections.

#### 📦 Product Management (`/admin/products`)
- **Add** new products with title, description, category, subcategory, rent price, deposit, images, and availability.
- **Edit** existing product details inline.
- **Delete** products from the catalogue.
- **Toggle availability** to mark items as available or unavailable.
- Real-time **search** by product name.

#### 🧾 Order Management (`/admin/orders`)
- View **all rental orders** across all users.
- Update order **delivery status** through all stages.
- Set **delivery date** and **pickup date** manually.
- Real-time **search** by customer name or product.

#### ⏰ Expiring Rentals (`/admin/expiring`)
- List of all rentals that are **approaching their end date**.
- Helps proactively contact customers for renewal or return logistics.

#### 🔧 Maintenance Management (`/admin/maintenance`)
- View all maintenance requests submitted by users.
- Update the **status** of each request (Requested → Approved → In Progress → Completed).
- Set **expected completion date** and **pickup date**.
- Real-time **search** by user or product name.

#### 🎫 Issue / Support Management (`/admin/issues`)
- View all support tickets submitted by users.
- **Update issue status**: Pending → In Progress → Resolved.
- **Reply** to user issues with an admin message.
- **Delete** resolved or spam tickets.
- Filter issues by status and search by user or subject.

---

## 🗺️ Pages & Routes

### User Routes
| Path | Page | Description |
|---|---|---|
| `/` | Homepage | Landing page |
| `/productlist` | Product List | Browse all products |
| `/productview` | Product View | Single product detail |
| `/cart` | Cart | Cart & checkout |
| `/myrentals/ActiveRents` | Active Rentals | Current rental items |
| `/myrentals/orders` | Orders | Full order history |
| `/myrentals/maintenance` | Maintenance | Maintenance requests |
| `/contact` | Contact | Contact info page |
| `/report-issue` | Report Issue | Submit support ticket |
| `/issue-status` | Issue Status | Track support tickets |

### Admin Routes
| Path | Page | Description |
|---|---|---|
| `/admin` | Admin Dashboard | Stats & overview |
| `/admin/products` | Product Management | CRUD for products |
| `/admin/orders` | Order Management | All rental orders |
| `/admin/expiring` | Expiring Rentals | Rentals near end date |
| `/admin/maintenance` | Maintenance Requests | All maintenance jobs |
| `/admin/issues` | Issue Management | All support tickets |

> **Note:** Admin routes reject non-admin users (redirected to `/`). User routes redirect admins to `/admin`.

---

## 🔌 Backend API

Base URL: `http://localhost:4000`

---

### Product API — `/api/product`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/allProducts` | Fetch all products |
| `POST` | `/insertProduct` | Create a new product |
| `PUT` | `/updateProduct/:id` | Update a product by ID |
| `DELETE` | `/deleteProduct/:id` | Delete a product by ID |

---

### User API — `/api/user`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/create` | Create or sync a user via Clerk |
| `GET` | `/:clerkId` | Get full user data, cart, rentals |
| `POST` | `/:clerkId/address` | Add a new delivery address |
| `DELETE` | `/:clerkId/address/:addressId` | Remove a saved address |
| `POST` | `/:clerkId/cart` | Add a product to the cart |
| `DELETE` | `/:clerkId/cart/:productId` | Remove a product from the cart |
| `POST` | `/:clerkId/rental` | Place a new rental order |
| `PATCH` | `/:clerkId/rental/:rentalId` | Mark a rental as complete |
| `PATCH` | `/:clerkId/cancel/:rentalId` | Cancel an active rental |
| `PATCH` | `/:clerkId/return/:rentalId` | Request a return for a rental |
| `POST` | `/:clerkId/maintenance` | Submit a maintenance request |
| `PATCH` | `/:clerkId/maintenance/:requestId/reply-request` | Request a maintenance reply |

---

### Rent / Admin API — `/api/rent`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/allRents` | Get all rental orders (admin) |
| `PUT` | `/updateStatus/:orderId` | Update the status of a rental order |
| `PUT` | `/updateDelivery/:orderId` | Set delivery date for an order |
| `PUT` | `/updatePickup/:orderId` | Set pickup date for an order |
| `GET` | `/allMaintenance` | Get all maintenance requests (admin) |
| `PUT` | `/updateMaintenance/:userId/:requestId` | Update a maintenance request status |

---

### Issue API — `/api/issue`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/create` | Submit a new support issue |
| `GET` | `/user/:clerkId` | Fetch all issues by a specific user |
| `GET` | `/all` | Fetch all issues (admin) |
| `PUT` | `/update/:issueId` | Update issue status/reply (admin) |
| `DELETE` | `/:issueId` | Delete an issue (admin) |

---

## 🗃️ Database Models

### User Model

Stores all user data including their cart, active rentals, past rentals, and maintenance requests.

| Field | Type | Description |
|---|---|---|
| `clerkId` | String | Unique ID from Clerk authentication |
| `name` | String | User's display name |
| `email` | String | User's email address |
| `role` | Enum | `"user"` or `"admin"` (default: `"user"`) |
| `address[]` | Array | Saved delivery addresses |
| `cart[]` | Array | Cart items (product, quantity, tenure) |
| `activeRentals[]` | Array | Currently rented items with status tracking |
| `pastRentals[]` | Array | Completed/returned rental history |
| `maintenanceRequests[]` | Array | Submitted maintenance requests |

**Rental Status Flow:**
```
ordered → order conformed → shiped → out for delivery → delivered → active
                                                    ↓
                                          return requested → out for pickup → pickup complete → returned → completed
                                          cancelled
```

**Maintenance Status Flow:**
```
requested → approved → in progress → completed
```

---

### Product Model

| Field | Type | Description |
|---|---|---|
| `title` | String | Product name |
| `description` | String | Product details |
| `category` | String | Main category (e.g. Furniture, Appliances) |
| `subcategory` | String | Sub-category (e.g. Sofa, Refrigerator) |
| `rent` | Number | Monthly rent price (₹) |
| `deposit` | Number | Refundable security deposit (₹) |
| `imgs` | [String] | Array of product image URLs |
| `available` | Boolean | Whether the product is available to rent |

---

### Issue Model

| Field | Type | Description |
|---|---|---|
| `clerkId` | String | ID of the user who raised the issue |
| `userName` | String | User's name |
| `userEmail` | String | User's email |
| `category` | Enum | Issue type (Billing, Technical Support, etc.) |
| `subject` | String | Brief subject of the issue |
| `message` | String | Detailed issue description |
| `status` | Enum | `Pending`, `In Progress`, `Resolved` |
| `priority` | Enum | `Low`, `Medium`, `High` |
| `adminReply` | String | Admin's response message |
| `repliedAt` | Date | Timestamp of the admin reply |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **MongoDB** (local instance or MongoDB Atlas)
- **Clerk account** — for authentication ([clerk.com](https://clerk.com))
- **npm** package manager

---

### Backend Setup

```bash
# Navigate to the backend directory
cd rent-easy/backend

# Install dependencies
npm install

# Create your .env file (see Environment Variables below)

# Start the development server
npm start
```

The backend server runs on **http://localhost:4000** by default.

---

### Frontend Setup

```bash
# Navigate to the frontend directory
cd rent-easy/frontend

# Install dependencies
npm install

# Create your .env file (see Environment Variables below)

# Start the Vite dev server
npm run dev
```

The frontend runs on **http://localhost:5173** by default.

---

## 🔑 Authentication (Clerk)

RentEase uses **[Clerk](https://clerk.com)** for all user authentication. Clerk handles:

- Sign Up / Sign In (Email, Google, etc.)
- Session management
- User identity (`clerkId`, `email`, `fullName`)

On first login, the frontend automatically calls `POST /api/user/create` to register the user in the MongoDB database and sync their Clerk identity. Subsequent logins fetch the user's role and data to determine their access level.

---

## 🛡️ Role-Based Access Control

The app enforces strict role-based routing on the frontend:

| Role | Access |
|---|---|
| `user` | All user pages (`/`, `/productlist`, `/cart`, `/myrentals/*`, `/contact`, `/report-issue`, `/issue-status`) |
| `admin` | All admin pages (`/admin`, `/admin/products`, `/admin/orders`, `/admin/maintenance`, `/admin/issues`, `/admin/expiring`) |

- If an **admin** visits a user route, they are **redirected to `/admin`**.
- If a **non-admin** visits an admin route, they are **redirected to `/`**.
- While the role is loading, a **spinner** is shown to prevent unauthorized flashes.

Admin role is assigned **manually** in the MongoDB database by setting a user's `role` field to `"admin"`.

---

## 👨‍💻 Author

**Adrich Fernandes**

---

## 📄 License

This project is licensed under the **ISC License**.
