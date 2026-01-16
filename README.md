# 🏬 Store Rating Application

A full-stack web application that allows users to discover stores, submit ratings, and manage store data based on user roles.  
Built as part of a **Full-Stack Intern Coding Challenge** using industry best practices.

---

## 🚀 Features

### 👤 Normal User
- Register & login
- View all registered stores
- Search stores by **name** or **address**
- Submit and update ratings (1–5 stars)
- View personal rating vs overall store rating
- Secure authentication using JWT

### 🏪 Store Owner
- Login securely
- View store dashboard
- See **average rating** of their store
- View list of users who rated their store
- Update password

### 🛠️ System Administrator
- Login with admin privileges
- Dashboard with platform statistics:
  - Total users
  - Total stores
  - Total ratings
- View all users (Admin / User / Store Owner)
- View all stores with ratings
- Create users and stores
- Role-based access control

---

## 🧱 Tech Stack

### Frontend
- **React.js**
- React Router
- Context API (Auth)
- Axios
- Custom UI (White + Orange theme)

### Backend
- **Node.js**
- Express.js
- JWT Authentication
- bcryptjs (password hashing)

### Database
- **MySQL**
- Proper relational schema
- Foreign keys & constraints
- Aggregations with SQL best practices

---

## 🔐 Authentication & Authorization

- Single login system
- JWT-based authentication
- Role-based access control:
  - ADMIN
  - USER
  - STORE_OWNER

---

## 🗄️ Database Schema (Overview)

- **users**
  - id, name, email, address, password, role
- **stores**
  - id, name, email, address, owner_id
- **ratings**
  - id, user_id, store_id, rating, created_at, updated_at
  - Unique constraint on `(user_id, store_id)`

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/store-rating-app.git
cd store-rating-app
2️⃣ Backend Setup
cd backend
npm install
Create .env file:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=store_rating_db
JWT_SECRET=your_secret_key
PORT=5000
Run backend:

npm start
3️⃣ Frontend Setup
cd frontend
npm install
npm run dev
Frontend runs on:

http://localhost:5173

FIND SCREENSHOTS FOLDER TO SEE THE DEMO ::







