# LinkStack API — Backend Services

![License: GPLv3](https://img.shields.io/badge/License-GPLv3-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)

LinkStack is an enterprise-grade Full-Stack SaaS platform that allows users to centralize their social media presence into a single, customizable public profile. This repository contains the **Backend API**, built with Node.js, Express, TypeScript, and MongoDB.

It provides robust, secure RESTful endpoints to handle user authentication, role-based access control (RBAC), profile management, and image processing.

---

## ✨ Key Features

- **Robust Authentication & Security:** JWT-based (JSON Web Token) authentication flow ensuring secure access to protected routes.
- **Role-Based Access Control (RBAC):** Distinct permission levels for Standard Users (profile management) and System Administrators (global user management, system moderation).
- **Unique Handle Validation:** Automated, high-performance querying to ensure handle uniqueness across the platform (similar to GitHub or Instagram).
- **Cloudinary Integration:** Seamless third-party integration for optimized profile image uploading, processing, and hosting.
- **Mongoose ODM:** Strongly typed schemas for comprehensive data validation, relationship management, and structured document storage.
- **Error Handling:** Standardized error responses, including proper resource-not-found handling for querying missing profiles.

---

## 🛠 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript / JavaScript
- **Database:** MongoDB (Atlas Cloud)
- **ODM:** Mongoose
- **Authentication:** JSON Web Tokens (JWT)
- **Media Storage:** Cloudinary API

---

## 📋 Prerequisites

Before running the backend, ensure you have the following installed and configured:

- **Node.js** (v16.x or higher recommended)
- **npm** or **yarn**
- **MongoDB Atlas Cloud** Account ([Create an instance here](https://www.mongodb.com/products/platform/atlas-database))
- **Cloudinary** Account ([Get API Keys here](https://cloudinary.com/console/))

---

## ⚙️ Environment Variables

Copy the provided `.env.example` file to a new `.env` file at the root of the repository and populate it with your specific infrastructure details.

| Variable                | Description                                 | Example                                     |
| :---------------------- | :------------------------------------------ | :------------------------------------------ |
| `MONGODB_URI`           | MongoDB Atlas Connection String             | `mongodb+srv://<user>:<pwd>@<cluster>/<db>` |
| `FRONTEND_URL`          | URL of the frontend application (CORS)      | `http://localhost:5173`                     |
| `JWT_SECRET`            | Secure cryptographic key for signing tokens | `your_super_secret_jwt_key`                 |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary instance identifier              | `your_cloud_name`                           |
| `CLOUDINARY_API_KEY`    | Cloudinary public API key                   | `your_api_key`                              |
| `CLOUDINARY_API_SECRET` | Cloudinary private API secret               | `your_api_secret`                           |

_Note: Ensure your MongoDB Atlas Network Access is temporarily set to allow `0.0.0.0/0` for local development testing, or whitelist your specific IP._

---

## 🚀 Installation & Local Development Setup

**1. Clone the repository:**

```bash
git clone https://github.com/manuelalejandrojimeneztorres/linkstack-backend.git
cd linkstack-backend
```

**2. Install dependencies:**

```bash
npm install
```

**3. Configure Environment:**
Ensure your `.env` file is properly populated as outlined in the [Environment Variables](#environment-variables) section.

**4. Start the development server:**

```bash
npm run dev:api
```

The server should now be running (typically on `http://localhost:3000` unless specified otherwise).

---

## 📚 API Documentation / Endpoints Overview

_TODO: Add comprehensive Swagger/OpenAPI documentation or Postman collection link here._

**High-Level Domains:**

- `/api/auth` - Registration, Login, Session validation.
- `/api/users` - User profile updates, handle availability checks.
- `/api/links` - CRUD operations for social links.
- `/api/admin` - Administrator-only routes for user management (read, update, delete).

---

## 🚢 Deployment Guide

_TODO: Add specific deployment instructions for cloud providers (e.g., AWS, Render, Heroku, DigitalOcean)._

---

## 🤝 Contributing

Contributions are welcome. Please adhere to the established ESLint/Prettier rules and TypeScript strict typings.

1.  Fork the repository
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

This project is licensed under the **GNU General Public License v3.0 (GPLv3)**.

## ✉️ Maintainer

[**Manuel Alejandro Jiménez Torres**](https://github.com/manuelalejandrojimeneztorres)
