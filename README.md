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

SCREENSHOTS::::


<img width="1902" height="981" alt="Screenshot 2026-01-16 210818" src="https://github.com/user-attachments/assets/a98f7f9b-f171-4a3d-a2b5-786c0c5a8971" />
<img width="1909" height="982" alt="Screenshot 2026-01-16 210829" src="https://github.com/user-attachments/assets/39735400-74b8-4742-9910-a14c2b196ca2" />



<img width="1871" height="960" alt="Screenshot 2026-01-16 200911" src="https://github.com/user-attachments/assets/ab9135f7-f438-4448-884e-96cb30acb11b" /><img width="1902" height="982" alt="Screenshot 2026-01-16 210807" src="https://github.com/user-attachments/assets/7464800b-7e17-482a-8128-b4c732f5676a" />

<img width="1406" height="978" alt="Screenshot 2026-01-16 210855" src="https://github.com/user-attachments/assets/bc320970-78b0-4470-8be8-f0d205765ae3" />

