# 💰 Expense Tracker API 

This project is a robust backend API for an expense tracker application, built with Node.js, Express, and MongoDB. It provides functionalities for user authentication, transaction management, and leverages AI to parse transaction details from natural language descriptions. The API allows users to register, login, manage their expenses by creating, reading, updating, and deleting transactions. It uses Google OAuth 2.0 for seamless authentication and stores user sessions in MongoDB for enhanced security and scalability.

## 🚀 Key Features

- **User Authentication:** Secure user registration and login using Google OAuth 2.0.
- **Session Management:** Persistent user sessions stored in MongoDB for enhanced security.
- **Transaction Management:** API endpoints for creating, retrieving, updating, and deleting transactions.
- **AI-Powered Parsing:** Utilizes OpenAI to automatically extract transaction details (amount, category, description) from text input.
- **RESTful API:** Well-defined API endpoints following REST principles.
- **Data Validation:** Mongoose schemas enforce data validation rules for data integrity.
- **User-Specific Data:** Transactions are associated with specific users, ensuring data privacy.
- **CORS Enabled:** Configured to allow requests from the frontend origin, enabling seamless integration.

## 🛠️ Tech Stack

*   **Backend:** Node.js, Express
*   **Database:** MongoDB
*   **Authentication:** Passport.js, Google OAuth 2.0
*   **AI Parsing:** OpenAI API
*   **Session Management:** express-session, connect-mongo
*   **Middleware:** cors
*   **Environment Variables:** dotenv
*   **Build Tools:** N/A (Node.js project)

## 📦 Getting Started

Follow these steps to set up the project locally:

### Prerequisites

- Node.js (v14 or higher)
- MongoDB installed and running
- OpenAI API key
- Google OAuth 2.0 credentials

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    cd expense-tracker-api
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Create a `.env` file in the root directory and add the following environment variables:

    ```
    PORT=5000
    MONGO_URI=<your_mongodb_connection_string>
    FRONTEND_ORIGIN=http://localhost:3000
    GOOGLE_CLIENT_ID=<your_google_client_id>
    GOOGLE_CLIENT_SECRET=<your_google_client_secret>
    GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback
    OPENAI_API_KEY=<your_openai_api_key>
    SESSION_SECRET=<your_session_secret>
    ```

    *   Replace `<your_mongodb_connection_string>` with your MongoDB connection string.
    *   Replace `http://localhost:3000` with the actual URL of your frontend application.
    *   Replace `<your_google_client_id>` and `<your_google_client_secret>` with your Google OAuth 2.0 credentials.
    *   Replace `http://localhost:5000/auth/google/callback` with your Google OAuth 2.0 callback URL.
    *   Replace `<your_openai_api_key>` with your OpenAI API key.
    *   Replace `<your_session_secret>` with a strong, randomly generated secret key for session management.

### Running Locally

1.  Start the server:

    ```bash
    npm start
    ```

2.  The server will start running on the port specified in the `.env` file (default: 5000).

## 💻 Usage

The API provides the following endpoints:

*   **Authentication:**
    *   `GET /auth/google`: Initiates Google OAuth 2.0 authentication.
    *   `GET /auth/google/callback`: Handles the callback from Google after authentication.
    *   `GET /auth/me`: Returns the currently logged-in user's information.
    *   `GET /auth/logout`: Logs the user out.
*   **Transactions:**
    *   `POST /transactions/parse`: Creates a new transaction by parsing text input. Requires `text` and `userId` in the request body.
    *   `GET /transactions/:userId`: Retrieves all transactions associated with a specific user ID.
    *   `PUT /transactions/:id`: Updates an existing transaction with the specified ID. Requires `amount`, `category`, and `description` in the request body.
    *   `DELETE /transactions/:id`: Deletes a transaction with the specified ID.
*   **Users:**
    *   `POST /users/register`: Registers a new user.
    *   `GET /users`: Retrieves a list of all users.

## 📂 Project Structure

```
expense-tracker-api/
├── config/
│   ├── db.js         # Database connection configuration
│   └── passport.js   # Passport.js configuration for Google OAuth 2.0
├── controllers/
│   ├── transactionController.js # Logic for transaction-related requests
│   └── userController.js        # Logic for user-related requests
├── models/
│   ├── Transaction.js # Mongoose model for Transaction schema
│   └── User.js        # Mongoose model for User schema
├── routes/
│   ├── authRoutes.js       # Authentication routes
│   ├── transactionRoutes.js  # Transaction routes
│   └── userRoutes.js       # User routes
├── services/
│   └── aiParser.js     # Service for parsing transaction details using AI
├── server.js       # Main entry point for the application
├── package.json
└── README.md
```




## 📬 Contact

[Daveed Gangi] - [daveeddaveedd@gmail.com]

## 💖 Thanks

Thank you for checking out this project! We hope it helps you build an awesome expense tracker application.

