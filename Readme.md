# 📁 Dobby Ads - Professional Drive Management System

A robust full-stack file management application inspired by Google Drive. This system enables users to create personalized workspaces, manage nested folder hierarchies, and securely upload image assets directly to a local server.

---

## 🚀 Core Features & Functionalities

### 1. Secure Authentication System
* **User-Centric Security:** Implements a full authentication flow including user registration and login.
* **JWT Authorization:** Uses **JSON Web Tokens (JWT)** to maintain user sessions. Once logged in, the token is stored in the browser's local storage and sent with every request to verify the user's identity.
* **Password Hashing:** Utilizes **Bcrypt** to hash passwords before storing them in MongoDB, ensuring user data remains encrypted and secure.

### 2. Multi-Level Folder Management
* **Infinite Nesting:** The system uses a specialized **Parent-Child Logic**. Each folder stores a `parentFolder` ID. If the ID is `null`, it sits in the root; otherwise, it belongs inside another folder.
* **Hierarchical Navigation:** Users can navigate through layers of folders seamlessly, with the frontend dynamically updating based on the current directory level.

### 3. Image Upload System (Multer Integration)
* **Local Asset Handling:** Unlike cloud services, this project uses **Multer** to handle `multipart/form-data`.
* **Storage Logic:** Images are processed and stored directly on the server in a dedicated `/uploads` directory.
* **Metadata Association:** Every uploaded image is linked to a specific `folderId` and the `userId` of the owner, ensuring that files are organized and private.

### 4. Recursive Folder Size Analytics
* **Automated Calculation:** A complex backend algorithm calculates the size of a folder by recursively summing up:
    1. The size of every image file inside that folder.
    2. The size of every image file inside its sub-folders.
* **Real-time Updates:** Whenever a new file is added, the total directory size reflects the total data consumption of that specific tree.

---

## 🛠️ Technical Tech Stack

**Frontend:**
* **React.js (Vite):** High-speed frontend development.
* **Tailwind CSS:** Modern utility-first styling for a professional look.
* **Axios:** For handling API communication with JWT interceptors.
* **Lucide React:** Consistent and modern iconography.

**Backend:**
* **Node.js & Express.js:** Scalable server-side framework.
* **MongoDB & Mongoose:** Flexible NoSQL database for managing nested relations.
* **Multer:** Efficient middleware for local file uploads.

---

## 🏗️ Detailed Project Architecture

```text
├── backend/
│   ├── config/          # DB connection and Multer setup
│   ├── controllers/     # Logic for Auth, Folder sizes, and Image processing
│   ├── models/          # Data schemas for Users, Folders, and Images
│   ├── routes/          # Express REST API endpoints
│   ├── middleware/      # JWT protection and Auth verification
│   ├── uploads/         # Destination folder for local image storage
│   └── server.js        # Server entry point
└── frontend/
    ├── src/
    │   ├── api/         # Centralized Axios API service
    │   ├── components/  # Modals for Folder creation & Image uploads
    │   ├── pages/       # Login, Signup, and Dashboard views
    │   └── App.jsx      # Global Routing configuration