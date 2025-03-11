# Project Name

## 📌 Overview
This project is a user management system that allows users to view, edit, and download user profiles as PDFs. The application is built with **Next.js, React Hook Form, Zod for validation, and ShadCN UI for styling**.

---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Arifyudi26/celerates-fe
cd celerates-fe
```

### 2️⃣ Install Dependencies
```bash
npm install  # or yarn install
```

### 3️⃣ Set Up Environment Variables
Create a `.env.local` file in the root directory and configure the following environment variables:
```env
NEXT_PUBLIC_API_URL=https://jsonplaceholder.typicode.com/
```

### 4️⃣ Run the Development Server
```bash
npm run dev  # or yarn dev
```
The app will be available at `http://localhost:3000`

---

## 📜 Environment Variables Documentation
| Variable Name | Description |
|--------------|-------------|
| `NEXT_PUBLIC_API_URL` | The base URL for fetching user data |

---

## 📡 API Documentation
The application interacts with a mock API (`jsonplaceholder.typicode.com`) for user data.

### **🧾 Get All Users**
```http
GET /users
```
Response:
```json
[
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  }
]
```

### **🔍 Get User Detail**
```http
GET /users/:id
```
Response:
```json
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
}
```

### **✏️ Update User**
```http
PUT /users/:id
```
Request:
```json
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
}
```
Response:
```json
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
}
```

---

## 🔍 Assumptions & Decisions
- **API Mock Data**: Using `jsonplaceholder.typicode.com` as a mock API.
- **Validation**: Implemented with **Zod** to ensure data integrity.
- **UI Components**: Used **ShadCN UI** for consistent and modern styling.
- **PDF Generation**: Implemented with `react-pdf/renderer` to allow user data export.
- **Form Handling**: Used **React Hook Form** for efficient form management and validation.

---

