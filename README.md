# devConnect - Frontend

> A modern professional networking platform for developers built with React, Redux, and Socket.IO

![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)
![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?logo=redux)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-7.0-646CFF?logo=vite)

## 🌟 Features

### Core Functionality
- **🔐 Authentication** - Secure login and signup with JWT
- **👤 User Profiles** - Customizable developer profiles with skills and bio
- **🔄 Feed System** - Swipe-based interface to discover developers
- **🤝 Connection Management** - Send and accept connection requests
- **💬 Real-time Chat** - Instant messaging with Socket.IO
- **🔔 Smart Notifications** - Real-time and offline notification system

### Notification System
- **Real-time Notifications** - Instant alerts when messages arrive
- **Offline Support** - Notifications persist even when offline
- **Badge Indicators** - Visual badges on profiles and navigation
- **Auto-clear** - Notifications clear when chat is opened
- **Global Visibility** - Notification count visible from any page

### UI/UX
- **🎨 Modern Design** - Dark theme with blue accents
- **✨ Smooth Animations** - Framer Motion animations throughout
- **📱 Fully Responsive** - Works on desktop, tablet, and mobile
- **🎯 Glassmorphism** - Beautiful backdrop blur effects
- **⚡ Fast Performance** - Optimized with Vite

## 🚀 Tech Stack

### Frontend Framework
- **React 19.1** - Latest React with hooks
- **Vite 7.0** - Lightning-fast build tool
- **React Router 7.7** - Client-side routing

### State Management
- **Redux Toolkit 2.8** - Centralized state management
- **React Redux 9.2** - React bindings for Redux

### Styling
- **TailwindCSS 3.4** - Utility-first CSS framework
- **DaisyUI 5.0** - Tailwind component library
- **Framer Motion 12.23** - Animation library

### Real-time Communication
- **Socket.IO Client 4.8** - WebSocket client for real-time features

### HTTP Client
- **Axios 1.11** - Promise-based HTTP client

### Icons
- **Lucide React 0.537** - Beautiful icon library

## 📁 Project Structure

```
dev_tinder_fe/
├── src/
│   ├── components/          # React components
│   │   ├── NavBar.jsx      # Navigation bar with notifications
│   │   ├── Landing.jsx     # Landing page
│   │   ├── Login.jsx       # Authentication
│   │   ├── Feed.jsx        # Swipe interface
│   │   ├── Connections.jsx # Connection list with badges
│   │   ├── Chat.jsx        # Real-time chat
│   │   ├── Request.jsx     # Connection requests
│   │   └── Footer.jsx      # Footer component
│   │
│   ├── utils/              # Utilities and state
│   │   ├── appStore.js     # Redux store configuration
│   │   ├── userSlice.js    # User state
│   │   ├── feedSlice.js    # Feed state
│   │   ├── connectionSlice.js # Connections state
│   │   ├── requestSlice.js # Requests state
│   │   ├── notificationSlice.js # Notifications state
│   │   ├── socket.js       # Socket.IO singleton
│   │   └── constance.js    # Constants
│   │
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
│
├── public/                 # Static assets
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🛠️ Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Backend server running (see backend README)

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/Prince6626/devConnect-fe.git
cd devConnect-fe
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:3000
```

4. **Start development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Vite Configuration
The project uses Vite for fast development and optimized builds. Configuration is in `vite.config.js`.

### Tailwind Configuration
Custom Tailwind configuration including DaisyUI is in `tailwind.config.js`.

### Redux Store
The Redux store is configured in `src/utils/appStore.js` with the following slices:
- User
- Feed
- Connections
- Requests
- Notifications

## 🌐 API Integration

The frontend communicates with the backend API at `http://localhost:3000` (configurable).

### Key Endpoints Used
- `POST /signup` - User registration
- `POST /login` - User authentication
- `GET /profile/view` - Get user profile
- `GET /user/feed` - Get user feed
- `GET /user/connections` - Get connections
- `GET /user/requests/recieved` - Get connection requests
- `GET /chat/:userId` - Get chat messages
- `GET /chat/unread/all` - Get unread counts

## 🔔 Notification System

### How It Works

**Real-time (Online Users)**
```
User A sends message → Socket emits event → 
User B receives notification → Badge appears
```

**Offline Support**
```
User A sends message → Saved to database → 
User B logs in → Fetches unread counts → Badge appears
```

### Implementation Details
- **Socket.IO** - Real-time notifications via WebSocket
- **Redux** - Centralized notification state
- **Database Persistence** - Unread counts stored in MongoDB
- **Smart Merging** - Combines real-time + persisted notifications

## 🎨 Design System

### Colors
- **Background**: `#121212` (Dark)
- **Primary**: Blue (`#3B82F6`)
- **Secondary**: Purple (`#8B5CF6`)
- **Success**: Green (`#10B981`)
- **Text**: White/Gray shades

### Typography
- **Font Family**: Inter, SF Pro Display, system-ui
- **Headings**: Bold, tight tracking
- **Body**: Medium weight, relaxed leading

### Components
- **Cards**: Glassmorphism with backdrop blur
- **Buttons**: Gradient backgrounds with hover effects
- **Badges**: Animated with spring physics
- **Inputs**: Rounded with focus states

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

### Deploy to Vercel
```bash
vercel deploy
```

### Deploy to Netlify
```bash
netlify deploy --prod
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Prince Patel**

## 🙏 Acknowledgments

- React team for the amazing framework
- Redux team for state management
- Tailwind CSS for the utility-first approach
- Framer Motion for smooth animations
- Socket.IO for real-time capabilities

---

**Note**: Make sure the backend server is running before starting the frontend application.
