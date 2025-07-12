# StackIt
Problem Statement 2:-
StackIt – A Minimal Q&A Forum Platform

Team Details: 
Member 1 - 
Name - Vivek Kumar Jha(Leader) 
Email - vivekkumarjha2005@gmail.com

Member 2 - 
Name - Sarthak Sahu 
Email - 23bcscs050@student.rru.ac.in


# StackIt

StackIt is a question-and-answer platform where users can ask questions, provide answers, and engage with a community of knowledge seekers. This project is built using React for the frontend and Node.js with Express for the backend.

## Features

- User authentication (login and registration)
- Ask and answer questions
- View question details and answers
- Rich text editor for formatting answers
- Notification system for updates

## Project Structure

```
StackIt-1
├── package.json          # Configuration file for npm
├── .env                  # Environment variables
├── public
│   └── favicon.ico       # Favicon for the application
├── src
│   ├── components        # Reusable components
│   ├── pages             # Application pages
│   ├── utils             # Utility functions
│   ├── services          # API service functions
│   ├── App.jsx           # Main application component
│   └── index.jsx         # Entry point of the application
├── backend
│   ├── server.js         # Entry point for the backend server
│   ├── models            # Database models
│   ├── controllers       # Request handling logic
│   ├── routes            # API routes
│   ├── middleware        # Middleware functions
│   └── config            # Configuration settings
├── .gitignore            # Files to ignore in Git
└── README.md             # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd StackIt-1
   ```

2. Install dependencies for the frontend:
   ```
   cd src
   npm install
   ```

3. Install dependencies for the backend:
   ```
   cd backend
   npm install
   ```

4. Set up environment variables in the `.env` file.

## Usage

To start the frontend and backend servers:

1. Start the backend server:
   ```
   cd backend
   node server.js
   ```

2. Start the frontend application:
   ```
   cd src
   npm start
   ```

Visit `http://localhost:3000` to access the application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.
