# Bank App

This is a simple web-based application designed to manage users with two different types of roles.

## User Roles

### Admin User
- **Capabilities**:
  - Add new users.
  - Delete existing users.
  - Update information of normal users.

### Normal User
- **Capabilities**:
  - View account balance.
  - Send money to other users.

## Features

- **2FA Authentication**: 
  - This application supports two-factor authentication (2FA) to enhance security. The implementation details of this feature are discussed in depth below.

## 2FA Authentication

### Overview

The 2FA feature adds an additional layer of security by requiring users to verify their identity through a one-time password (OTP). The OTP is stored in the database and sent to the user's email address.

### Implementation Details

1. **Generating OTPs**:
   - When a user initiates a login or sensitive action, an OTP is generated. This OTP is a unique code that is valid for a limited time.

2. **Storing OTPs**:
   - The generated OTP is stored in the database associated with the user's account. This allows the system to verify the OTP when the user submits it.

3. **Sending OTPs**:
   - The OTP is sent to the user's email address using the `nodemailer` module. This ensures that the user receives the OTP in their inbox for verification.

4. **Verifying OTPs**:
   - When the user enters the OTP, the application checks the submitted OTP against the one stored in the database. If they match and the OTP is still valid, the user is authenticated.

5. **Expiration**:
   - OTPs are time-sensitive. The system ensures that an OTP is only valid for a short period, enhancing security by minimizing the window in which an OTP can be used.

## Project Dependencies

This project uses various dependencies for both backend and frontend functionality. Below is a detailed breakdown:

### Backend Dependencies

1. **bcryptjs**: `^2.4.3`
   - **Purpose**: Hashes passwords and compares them securely.
   - **Usage**: Hashes user passwords before storing them and verifies passwords during authentication.

2. **cookie-parser**: `^1.4.6`
   - **Purpose**: Parses cookies attached to client requests.
   - **Usage**: Manages cookies for user sessions and authentication.

3. **dotenv**: `^16.4.5`
   - **Purpose**: Loads environment variables from a `.env` file into `process.env`.
   - **Usage**: Manages configuration settings and keeps sensitive information secure.

4. **express**: `^4.19.2`
   - **Purpose**: Provides a minimalist web framework for Node.js.
   - **Usage**: Sets up the server, defines routes, and manages HTTP requests and responses.

5. **jsonwebtoken**: `^9.0.2`
   - **Purpose**: Generates and verifies JSON Web Tokens (JWT).
   - **Usage**: Handles authentication and secure transmission of information.

6. **mongoose**: `^8.5.1`
   - **Purpose**: ODM library for MongoDB and Node.js.
   - **Usage**: Interacts with the MongoDB database, defines data schemas, and performs CRUD operations.

7. **node-fetch**: `^3.3.2`
   - **Purpose**: Brings `window.fetch` to Node.js for making HTTP requests.
   - **Usage**: Makes external HTTP requests, such as fetching data from APIs.

8. **nodemailer**: `^6.9.14`
   - **Purpose**: Sends emails easily from Node.js applications.
   - **Usage**: Sends emails, such as OTPs or notifications.

9. **react-hot-toast**: `^2.4.1`
   - **Purpose**: Lightweight and customizable toast notification library for React.
   - **Usage**: Displays feedback to users through notifications.

10. **speakeasy**: `^2.0.0`
    - **Purpose**: Provides two-factor authentication (2FA) with one-time passcodes.
    - **Usage**: Generates and verifies time-based one-time passwords (TOTPs).

### Backend DevDependencies

1. **nodemon**: `^3.1.4`
   - **Purpose**: Automatically restarts the Node.js application when file changes are detected.
   - **Usage**: Use `nodemon` instead of `node` to run your server during development:
     ```bash
     nodemon index.js
     ```

### Frontend Dependencies

1. **react**: `^18.3.1`
   - **Purpose**: React library for building user interfaces.
   
2. **react-dom**: `^18.3.1`
   - **Purpose**: Provides DOM-specific methods that can be used at the top level of a web application.

3. **react-icons**: `^5.2.1`
   - **Purpose**: Provides a collection of popular icons for React applications.

4. **react-router-dom**: `^6.25.1`
   - **Purpose**: DOM bindings for React Router, used for routing and navigation.

5. **zustand**: `^4.5.4`
   - **Purpose**: Small, fast, and scalable state management for React applications.

### Frontend DevDependencies

1. **@types/react**: `^18.3.3`
   - **Purpose**: TypeScript definitions for React.

2. **@types/react-dom**: `^18.3.0`
   - **Purpose**: TypeScript definitions for React DOM.

3. **@vitejs/plugin-react**: `^4.3.1`
   - **Purpose**: Vite plugin for React integration.

4. **autoprefixer**: `^10.4.19`
   - **Purpose**: PostCSS plugin to parse CSS and add vendor prefixes.

5. **daisyui**: `^4.12.10`
   - **Purpose**: Tailwind CSS component library.

6. **eslint**: `^8.57.0`
   - **Purpose**: Linting tool for identifying and reporting on patterns in JavaScript.

7. **eslint-plugin-react**: `^7.34.3`
   - **Purpose**: ESLint plugin for React-specific linting rules.

8. **eslint-plugin-react-hooks**: `^4.6.2`
   - **Purpose**: ESLint plugin for linting React hooks rules.

9. **eslint-plugin-react-refresh**: `^0.4.7`
   - **Purpose**: ESLint plugin for React Refresh.

10. **postcss**: `^8.4.39`
    - **Purpose**: Tool for transforming CSS with JavaScript plugins.

11. **tailwindcss**: `^3.4.6`
    - **Purpose**: Utility-first CSS framework.

12. **vite**: `^5.3.4`
    - **Purpose**: Fast build tool for modern web projects.

## Installation

To install all dependencies, run the following command in your project directory:

```bash
npm install
