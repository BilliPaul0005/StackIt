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


# 🚀 StackIt

> **A Modern Q&A Forum Platform**  
> Built with React & Node.js for collaborative learning and knowledge sharing

---
### 🚀 **Ready to Launch StackIt?**

```bash
# Navigate to project directory
cd StackIt

# Start the development server
npm run dev
```

**✨ Your StackIt application will be running at `http://localhost:5173`**

</div>

---

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.16.3-green.svg)](https://mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.11-38B2AC.svg)](https://tailwindcss.com/)

---

## ✨ Features

### 🔐 **Authentication & Roles**
- **Guest**: Browse questions and answers
- **User**: Post, vote, and interact
- **Admin**: Content moderation

### 📝 **Rich Text Editor**
- **Formatting**: Bold, Italic, Underline, Strikethrough
- **Lists**: Bullet points & numbered lists
- **Code**: Syntax highlighting
- **Links**: URL insertion
- **Quotes**: Blockquote support

### 🏷️ **Smart Tagging**
- Multi-select tag input
- Popular tags display
- Tag-based filtering
- Auto-suggestions

### ⬆️ **Voting System**
- Upvote/downvote questions & answers
- Visual score indicators
- Color-coded feedback
- User vote tracking

### ✅ **Answer Management**
- Accept best answers
- Visual acceptance indicators
- Acceptance notifications

### 🔔 **Real-time Notifications**
- Bell icon with unread counter
- Dropdown with recent activity
- Types: answers, comments, mentions, votes
- Mark as read functionality

### 🔍 **Advanced Search**
- Full-text search
- Tag-based filtering
- Sort: Newest, Most Voted, Most Viewed
- Real-time results

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.1.0 | UI Framework |
| Vite | 7.0.4 | Build Tool |
| Tailwind CSS | 4.1.11 | Styling |
| Lucide React | 0.525.0 | Icons |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ | Runtime |
| Express.js | 5.1.0 | Web Framework |
| MongoDB | 8.16.3 | Database |
| JWT | 9.0.2 | Authentication |
| bcryptjs | 3.0.2 | Password Hashing |

---

## 📊 Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (guest/user/admin),
  isPrivate: Boolean,
  createdAt: Date
}
```

### Question
```javascript
{
  title: String,
  description: String (rich text),
  tags: [String],
  author: ObjectId (ref: User),
  answers: [ObjectId] (ref: Answer),
  upvotes: Number,
  downvotes: Number,
  views: Number,
  isClosed: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Answer
```javascript
{
  text: String (rich text),
  upvotes: Number,
  downvotes: Number,
  accepted: Boolean,
  author: ObjectId (ref: User),
  question: ObjectId (ref: Question),
  comments: [ObjectId] (ref: Comment),
  createdAt: Date,
  updatedAt: Date
}
```

### Notification
```javascript
{
  type: String (answer/comment/mention/vote/accept),
  recipient: ObjectId (ref: User),
  sender: ObjectId (ref: User),
  message: String,
  read: Boolean,
  link: String,
  relatedQuestion: ObjectId (ref: Question),
  relatedAnswer: ObjectId (ref: Answer),
  relatedComment: ObjectId (ref: Comment),
  createdAt: Date
}
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone & Navigate**
   ```bash
   git clone https://github.com/yourusername/StackIt.git
   cd StackIt
   ```

2. **Install Dependencies**
   ```bash
   # Frontend
   cd Stackit
   npm install
   
   # Backend
   cd backend
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Backend directory
   cd backend
   cp .env.example .env
   ```
   
   Configure `.env`:
   ```env
   MONGO_URI=mongodb://localhost:27017/stackit
   JWT_SECRET=your_jwt_secret_here
   PORT=5000
   NODE_ENV=development
   ```

4. **Start Development Servers**
   ```bash
   # Backend (from backend directory)
   npm run dev
   
   # Frontend (from Stackit directory)
   npm run dev
   ```

5. **Access Application**
   - 🌐 Frontend: http://localhost:5173
   - 🔌 Backend API: http://localhost:5000

---

## 📁 Project Structure

```
StackIt/
├── 📦 Stackit/                 # Frontend
│   ├── 🎨 src/
│   │   ├── 🧩 components/
│   │   │   ├── AskQuestionForm.jsx
│   │   │   ├── NotificationDropdown.jsx
│   │   │   ├── QuestionCard.jsx
│   │   │   ├── RichTextEditor.jsx
│   │   │   ├── SearchFilters.jsx
│   │   │   └── TagInput.jsx
│   │   ├── 🪝 hooks/
│   │   │   ├── useAuth.jsx
│   │   │   ├── useNotifications.jsx
│   │   │   └── useQuestions.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── 📄 package.json
│   └── ⚙️ vite.config.js
├── 🔧 backend/                 # Backend
│   ├── ⚙️ config/
│   │   ├── db.config.js
│   │   └── jwt.config.js
│   ├── 🎮 controllers/
│   │   ├── auth.controller.js
│   │   ├── question.controller.js
│   │   ├── answer.controller.js
│   │   ├── comment.controller.js
│   │   ├── notification.controller.js
│   │   └── upload.controller.js
│   ├── 🛡️ middleware/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── upload.middleware.js
│   ├── 📊 models/
│   │   ├── User.js
│   │   ├── Question.js
│   │   ├── Answer.js
│   │   ├── Comment.js
│   │   └── Notification.js
│   ├── 🛣️ routes/
│   │   ├── auth.route.js
│   │   ├── question.route.js
│   │   ├── answer.route.js
│   │   ├── comment.route.js
│   │   ├── notification.route.js
│   │   └── upload.route.js
│   ├── server.js
│   └── package.json
└── 📖 README.md
```

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | User registration |
| `POST` | `/api/auth/login` | User login |
| `GET` | `/api/auth/profile` | Get user profile |

### Questions
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/questions` | Get all questions |
| `POST` | `/api/questions` | Create question |
| `GET` | `/api/questions/:id` | Get specific question |
| `PUT` | `/api/questions/:id` | Update question |
| `DELETE` | `/api/questions/:id` | Delete question |

### Answers
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/answers` | Get answers |
| `POST` | `/api/answers` | Create answer |
| `PUT` | `/api/answers/:id` | Update answer |
| `DELETE` | `/api/answers/:id` | Delete answer |

### Notifications
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/notifications` | Get notifications |
| `PUT` | `/api/notifications/:id/read` | Mark as read |
| `PUT` | `/api/notifications/read-all` | Mark all as read |

---

## 🎨 UI Features

### Modern Design
- ✨ Clean, minimalist interface
- 🎨 Consistent color scheme
- ⚡ Smooth animations
- 🎯 Visual feedback

### Responsive Layout
- 📱 Mobile-first design
- 🔄 Flexible grid system
- 🖱️ Touch-friendly elements
- 📐 Adaptive navigation

### Rich Text Editor
- 🎛️ WYSIWYG interface
- ⌨️ Keyboard shortcuts
- 📋 Clean paste handling
- 👁️ Real-time preview

### Notification System
- 🔔 Bell icon with counter
- 📋 Dropdown interface
- ⏰ Time-based formatting
- 👁️ Unread indicators

---

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Railway/Heroku)
```bash
# Set production env vars
NODE_ENV=production
MONGO_URI=your_production_uri
JWT_SECRET=your_production_secret

npm start
```

---

## 🤝 Contributing

1. 🍴 Fork the repository
2. 🌿 Create feature branch (`git checkout -b feature/amazing`)
3. 💾 Commit changes (`git commit -m 'Add amazing feature'`)
4. 📤 Push to branch (`git push origin feature/amazing`)
5. 🔄 Open Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- 🎨 Built with **React** and **Node.js**
- 🎨 Styled with **Tailwind CSS**
- 🎯 Icons from **Lucide React**
- 🗄️ Database powered by **MongoDB**

---


**StackIt** - Where questions find answers, and knowledge finds community 🚀

[![GitHub stars](https://img.shields.io/github/stars/yourusername/StackIt?style=social)](https://github.com/yourusername/StackIt)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/StackIt?style=social)](https://github.com/yourusername/StackIt)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/StackIt)](https://github.com/yourusername/StackIt/issues)
