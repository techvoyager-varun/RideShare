<div align="center">
  <h1>🚕 Ride Share</h1>
  <p><strong>A Modern, Full Stack Ride Booking Application built on the MERN Stack</strong></p>
  
  <p>
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#quick-start">Quick Start</a> •
    <a href="#environment-variables">Environment Setup</a>
  </p>
</div>

---

**Ride Share** is a comprehensive, feature-rich platform that replicates the core functionalities of modern ride-hailing services. Built from the ground up, it offers a seamless experience featuring secure user authentication, interactive map-based ride booking, real-time location tracking, fare calculation, and instant communication. 

Designed for scalability and performance, this project demonstrates an advanced understanding of full-stack architecture, WebSocket integrations, and modern UI design.

⭐ **If you found this project helpful, please consider giving it a star on [GitHub](https://github.com/techvoyager-varun/RideShare)!** ⭐

---

## ✨ Key Features

### 🔐 Authentication & Security
- **Role-Based Access Control**: Secure login flows specifically tailored for Riders and Captains (Drivers).
- **JWT & bcrypt**: Enterprise-grade password hashing and token-based session management.
- **Email Verification**: Integration with **Resend** (Frontend) and **Nodemailer** (Backend) for account activation and secure password resets.

### 📍 Intelligent Routing & Mapping
- **Open-Source Maps**: Powered by Leaflet, Nominatim, and OSRM for zero-cost, highly accurate routing.
- **Address Autocomplete**: Smart location suggestions for smooth pickup and drop-off selection.
- **Dynamic Fare Calculation**: Instantly computes pricing across multiple vehicle tiers (Car, Auto, Bike) based on live distance and time metrics.

### 🚖 Real-Time Ride Engine
- **Live WebSocket Tracking**: Constant bi-directional data flow using `Socket.io` to update ride status (Pending, Accepted, Ongoing, Completed).
- **In-App Chat**: Private, encrypted real-time messaging between Rider and Captain during active trips.
- **Concurrency Control**: Prevents double-booking by ensuring a requested ride can only be secured by a single captain.

### 🛠️ System Resilience
- **Custom Logging Infrastructure**: Persists critical backend and frontend events directly into the database.
- **Fail-Safe Recovery**: Built-in "Force Reset" utility to purge corrupt local cache states and recover the application seamlessly.

---

## ⚙️ Tech Stack

| **Layer** | **Technologies & Tools** |
| :--- | :--- |
| **Frontend** | React.js, Vite, Tailwind CSS, React-Leaflet, Vercel Serverless Functions |
| **Backend** | Node.js, Express.js, MongoDB (Mongoose), Socket.io, Nodemailer |
| **Routing / Maps** | OpenStreetMap, Nominatim (Geocoding), OSRM (Routing) |
| **Authentication** | JSON Web Tokens (JWT), bcrypt |
| **Email Delivery** | Resend API, Gmail SMTP |

---

## ⚡ Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/techvoyager-varun/RideShare.git
cd RideShare
```

### 2. Install Dependencies

You'll need to install packages for both the Frontend and the Backend:

```bash
# Install Frontend dependencies
cd Frontend
npm install

# Install Backend dependencies
cd ../Backend
npm install
```

### 3. Configure Environment Variables
Create `.env` files in both the `Frontend/` and `Backend/` directories.

**Frontend (`Frontend/.env`):**
```env
VITE_SERVER_URL=http://localhost:3000
VITE_ENVIRONMENT=development
VITE_RIDE_TIMEOUT=90000
RESEND_API_KEY=<your-resend-api-key>
```

**Backend (`Backend/.env`):**
```env
PORT=3000
RELOAD_INTERVAL=10
SERVER_URL=http://localhost:3000
CLIENT_URL=http://localhost:5173
ENVIRONMENT=development
MONGODB_PROD_URL=<your-mongodb-atlas-url>
MONGODB_DEV_URL=mongodb://127.0.0.1:27017/rideShare
JWT_SECRET=<your-secure-jwt-secret>
MAIL_USER=<your-gmail-address>
MAIL_PASS=<your-gmail-app-password>
```

### 4. Boot Up the Servers

**Terminal 1 (Backend):**
```bash
cd Backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd Frontend
npm run dev
```

Your application will now be running at [http://localhost:5173](http://localhost:5173).

---

## 🤝 Contributing

Community contributions are incredibly welcome! 

1. **Fork** this repository
2. **Create** a feature branch (`git checkout -b feature/AmazingNewFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingNewFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingNewFeature`)
5. **Open** a Pull Request

## 📝 License

This project is open-sourced software licensed under the [MIT License](LICENSE).
