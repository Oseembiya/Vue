# ParentPay Vue Frontend

A modern Vue 3 application for managing lesson bookings and payments. This application provides a seamless shopping cart experience for educational lessons with real-time API integration.

## 🚀 Features

- **Modern Vue 3** with Composition API
- **State Management** with Pinia
- **Routing** with Vue Router
- **Production Ready** build configuration
- **API Integration** with deployed backend
- **Responsive Design** with modern UI/UX
- **Shopping Cart** functionality
- **Search & Filter** lessons
- **Image Modal** for lesson preview
- **Real-time Updates** from backend

## 🛠️ Tech Stack

- **Frontend**: Vue 3, Vite, Pinia, Vue Router
- **Styling**: CSS3, Modern Flexbox/Grid
- **Build**: Vite with Terser minification
- **Deployment**: GitHub Pages with GitHub Actions
- **Backend**: Node.js/Express API (deployed on Render)

## 📡 API Integration

The application connects to a deployed backend API:

- **Production API**: `https://myserver-xy36.onrender.com`
- **Endpoints**:
  - `GET /lessons` - Fetch available lessons
  - `POST /order` - Submit lesson orders
  - `GET /health` - API health check

## 🔧 Development Setup

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd Vue
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:prod` - Build with production environment
- `npm run preview` - Preview production build
- `npm run lint` - Run linting
- `npm run format` - Format code with Prettier

## 🚀 Production Deployment

### Automatic Deployment (Recommended)

The application is configured for automatic deployment to GitHub Pages:

1. **Push to main/master branch**

   ```bash
   git add .
   git commit -m "Deploy to production"
   git push origin main
   ```

2. **GitHub Actions** will automatically:
   - Build the application
   - Deploy to GitHub Pages
   - Make it available at: `https://yourusername.github.io/Vue/`

### Manual Deployment

1. **Build for production**

   ```bash
   npm run build:prod
   ```

2. **Deploy the `dist` folder** to your hosting provider

### Environment Configuration

The application automatically detects the environment:

- **Development**: Uses deployed API with CORS enabled
- **Production**: Optimized build with proper base URL for GitHub Pages

## 🏗️ Project Structure

```
Vue/
├── public/                 # Static assets
├── src/
│   ├── components/        # Vue components
│   │   ├── Navbar.vue
│   │   ├── LessonList.vue
│   │   ├── CartCanvas.vue
│   │   └── ...
│   ├── stores/           # Pinia stores
│   │   └── index.js
│   ├── assets/           # CSS and images
│   ├── App.vue           # Main application component
│   └── main.js           # Application entry point
├── .github/workflows/    # GitHub Actions
├── dist/                 # Production build output
└── package.json         # Dependencies and scripts
```

## 🔐 Security Features

- **Rate Limiting**: API has built-in rate limiting
- **CORS Protection**: Configured for specific origins
- **Input Validation**: Client and server-side validation
- **Secure Headers**: Helmet.js security headers on API

## 🎨 UI/UX Features

- **Loading States**: Visual feedback during API calls
- **Error Handling**: Graceful error messages with fallbacks
- **Responsive Design**: Works on all device sizes
- **Keyboard Navigation**: ESC key to close modals
- **Accessibility**: Semantic HTML and ARIA labels

## 📊 Performance Optimizations

- **Code Splitting**: Automatic vendor chunk separation
- **Minification**: Terser for JavaScript compression
- **Asset Optimization**: Optimized images and CSS
- **Caching**: Browser caching for static assets

## 🔗 API Documentation

### Lessons Endpoint

```http
GET https://myserver-xy36.onrender.com/lessons
```

Response:

```json
[
  {
    "id": 1,
    "subject": "Mathematics",
    "location": "Room 101",
    "slots": 10,
    "price": 25,
    "rating": 4,
    "image": "image_url"
  }
]
```

### Order Endpoint

```http
POST https://myserver-xy36.onrender.com/order
Content-Type: application/json

{
  "name": "John Doe",
  "phone": "1234567890",
  "lessons": ["lesson_id_1", "lesson_id_2"]
}
```

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Errors**

   - Check network connection
   - Verify API is running: `https://myserver-xy36.onrender.com/health`
   - Application will fallback to sample data

2. **Build Errors**

   - Clear node_modules: `rm -rf node_modules && npm install`
   - Clear Vite cache: `rm -rf node_modules/.vite`

3. **Deployment Issues**
   - Ensure GitHub Pages is enabled in repository settings
   - Check GitHub Actions workflow status

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🚀 Live Demo

- **Frontend**: https://oseembiya.github.io/Vue/
- **Backend API**: https://myserver-xy36.onrender.com

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

---

Built with ❤️ using Vue 3 and modern web technologies.
