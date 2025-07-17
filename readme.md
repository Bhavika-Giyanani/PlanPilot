# PlanPilot - Kanban Todo List Application 📋

A modern, responsive Kanban-style Todo List application built with MERN. Manage your tasks efficiently with intuitive drag-and-drop functionality, advanced search and filtering, and comprehensive CRUD operations. Features secure JWT authentication and MongoDB Atlas data persistence.

## 🚀 Demo

<!-- Add your demo GIF here -->
![Splash GIF](https://github.com/Bhavika-Giyanani/PlanPilot/blob/main/frontend/src/assets/Splash.gif)

<!-- Add screenshots here -->
![Login](https://github.com/Bhavika-Giyanani/PlanPilot/blob/main/frontend/src/assets/Login.png)
![Register](https://github.com/Bhavika-Giyanani/PlanPilot/blob/main/frontend/src/assets/Register.png)
![Home Dark Mode](https://github.com/Bhavika-Giyanani/PlanPilot/blob/main/frontend/src/assets/Home_Dark_Mode.png)
![Home Light Mode](https://github.com/Bhavika-Giyanani/PlanPilot/blob/main/frontend/src/assets/Home_Light_Mode.png)
![Task Modal](https://github.com/Bhavika-Giyanani/PlanPilot/blob/main/frontend/src/assets/Task_Creation_Modal.png)
![Edit Task](https://github.com/Bhavika-Giyanani/PlanPilot/blob/main/frontend/src/assets/Edit_Task.png)
![Search](https://github.com/Bhavika-Giyanani/PlanPilot/blob/main/frontend/src/assets/Search.png)
![Filter](https://github.com/Bhavika-Giyanani/PlanPilot/blob/main/frontend/src/assets/Filter.png)
![API Documentation](https://github.com/Bhavika-Giyanani/PlanPilot/blob/main/frontend/src/assets/API_Docs.png)

**Live :** [https://planpilot-to1k.onrender.com](https://planpilot-to1k.onrender.com)

## ✨ Features

### Core Functionality
- **🔐 User Authentication**: Secure sign up, log in, and log out with JWT-based authentication
- **📝 Task Management**: Complete CRUD operations for tasks
- **📊 Kanban Board**: Visual task organization with drag-and-drop between columns (To Do, In Progress, Done)
- **🔍 Search & Filter**: Quickly find tasks and filter by priority levels
- **📱 Responsive Design**: Seamless experience across desktop and mobile devices

### Advanced Features
- **🎨 Theme Toggle**: Switch between light and dark modes for better accessibility
- **🎭 Smooth Animations**: Enhanced UX with framer-motion transitions and dnd-kit interactions
- **⚡ Real-time Updates**: Instant task status updates via drag-and-drop
- **📅 Due Date Management**: Task scheduling with due date tracking
- **🎯 Priority System**: Organize tasks by priority levels


## 🛠️ Technologies Used

### Frontend
- **React** - UI library for building interactive components
- **TailwindCSS** - Utility-first CSS framework for styling
- **framer-motion** - Animation library for smooth transitions
- **dnd-kit** - Modern drag-and-drop toolkit
- **lucide-react** - Beautiful & customizable icons
- **React Router** - Client-side routing

### Backend
- **Node.js** - JavaScript runtime environment
- **Express** - Web application framework
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token for authentication
- **bcrypt** - Password hashing

### Database
- **MongoDB Atlas** - NoSQL database for data persistence

### Development & Deployment
- **Postman** - API testing
- **Swagger** - API documentation generation
- **Render** - Cloud deployment platform

## 📁 Project Structure

```
PlanPilot/
├── frontend/                     # Frontend React application
│   ├── src/
│    |      ├── components/         # Reusable UI components
│   ├── public/                # Static assets
│   └── package.json
├── backend/                    # Backend Node.js application
│   ├── controllers/           # Request handlers
│   ├── models/               # MongoDB models
│   ├── routes/               # API routes
│   ├── middleware/           # Custom middleware
│   ├── config/               # Configuration files
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Bhavika-Giyanani/PlanPilot.git
   cd planpilot
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install

   
   # Add your environment variables
   MONGODB_URI=mongodb://localhost:27017/planpilot
   JWT_SECRET=your-secret-key
   PORT=5000
   
   # Start the server
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   
   # Add your environment variables
   VITE_API_URL=http://localhost:5000
   
   # Start the development server
   npm run dev
   ```

4. **Access the application**
   - **Frontend**: http://localhost:5173
   - **Backend API**: http://localhost:5000

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|---------------|
| POST | `/api/signup` | Register a new user | 
| POST | `/api/login` | Authenticate user |
| POST | `/api/logout` | Log out user | 

### Tasks
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/tasks` | Get all tasks for authenticated user | ✅ |
| POST | `/api/tasks` | Create a new task | ✅ |
| PUT | `/api/tasks/:id` | Update a task by ID | ✅ |
| DELETE | `/api/tasks/:id` | Delete a task by ID | ✅ |

**Authentication**: All task endpoints require JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## 📖 Usage Guide

### Getting Started
1. **Sign Up**: Create a new account with email and password
2. **Log In**: Access your personal Kanban board
3. **Create Tasks**: Use the "Add Task" button to add new tasks with:
   - Title and description
   - Due date
   - Priority level (Low, Medium, High)
   - Initial status

### Task Management
- **Edit Tasks**: Click on any task to modify its details
- **Delete Tasks**: Use the delete button on task cards
- **Change Status**: Drag tasks between columns (To Do → In Progress → Done)
- **Search Tasks**: Use the search bar to find specific tasks
- **Filter Tasks**: Filter by priority or status

### UI Features
- **Dark/Light Mode**: Toggle theme using the theme switcher
- **Responsive Design**: Seamless experience on all devices
- **Drag & Drop**: Intuitive task status updates
- **Animations**: Smooth transitions and interactions

## 📚 API Documentation

### Swagger Documentation
Access interactive API documentation at `/api-docs` when running the server locally.


## 🎨 UI/UX Features

### Design Principles
- **Clean & Intuitive**: Minimalist design focused on usability
- **Responsive**: Mobile-first approach with breakpoint optimization
- **Consistent**: Unified design system across all components

### Accessibility
- 🎨 High contrast color schemes
- 📱 Screen reader compatibility
- ⌨️ Focus management and indicators

## 🔧 Development

### Available Scripts

**Frontend**
```bash
npm run dev          # Start development server
npm run build        # Build for production
```

**Backend**
```bash
npm run dev          # Start development server with nodemon
npm run generateDocs         # Generate API documentation
```

### Environment Variables

**Backend (.env)**
```env
MONGODB_URI=mongodb-url
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
NODE_ENV=development
```

**Frontend (.env)**
```env
VITE_API_URL="http://localhost:5000"
```

## 🚀 Deployment

### Production Deployment (Render)
1. Push code to GitHub repository
2. Connect repository to Render
3. Configure build and start commands
4. Set environment variables
5. Deploy automatically on commits

**Build Command:**
`npm run build`

**Start Command:**
 `npm start dev`



## 🙏 Acknowledgements

### Libraries & Frameworks
- [React](https://reactjs.org/) - UI library
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [framer-motion](https://www.framer.com/motion/) - Animation library
- [dnd-kit](https://dndkit.com/) - Drag and drop toolkit
- [lucide-react](https://lucide.dev/) - Icon library

### Backend & Database
- [Node.js](https://nodejs.org/) - Runtime environment
- [Express](https://expressjs.com/) - Web framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Mongoose](https://mongoosejs.com/) - ODM library

### Development Tools
- [Postman](https://www.postman.com/) - API testing
- [Swagger](https://swagger.io/) - API documentation
- [Render](https://render.com/) - Deployment platform

---
