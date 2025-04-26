# ParentPay - School Activities Portal

A responsive Vue.js application for browsing and purchasing school activities and lessons. The platform allows parents to explore various school activities, add them to a cart, and complete purchases with shipping information.

## 🔗 Live Demo

- **Live Site**: [https://oseembiya.github.io/Vue/](https://oseembiya.github.io/Vue/)
- **Repository**: [https://github.com/Oseembiya/Vue](https://github.com/Oseembiya/Vue)

## 🛠️ Technologies Used

- **Frontend**:

  - Vue.js 2.7.16 (Component-based architecture)
  - Bootstrap 5.3.3 for responsive UI
  - CSS3 with custom responsive design
  - Font Awesome for icons
  - Google Fonts (Bangers, Luckiest Guy)

- **Backend**:
  - Node.js with Express.js
  - MongoDB for database
  - Deployed on AWS Elastic Beanstalk
  - REST API endpoints

## ✨ Features

- **Lesson Catalog**: Browse school activities with details like price, location, and availability
- **Responsive Design**: Fully responsive on all devices (mobile, tablet, desktop)
- **Shopping Cart**: Add/remove lessons with real-time inventory management
- **Search Functionality**: Search activities by subject or location
- **Sorting Options**: Sort activities by subject, location, price, or available spaces
- **Checkout Process**: Complete order with shipping information
- **Form Validation**: Validate personal information before submission
- **Rating System**: View activity ratings with a star display

## 📋 Project Structure

The application follows a component-based architecture:

- `Navbar.vue`: Navigation, search, and cart access
- `CarouselHero.vue`: Hero carousel section
- `LessonList.vue`: Displays and manages lesson grid with sorting
- `LessonCard.vue`: Individual lesson card component
- `CartCanvas.vue`: Shopping cart with checkout form
- `FooterSection.vue`: Application footer

## 🚀 Installation and Setup

1. **Clone the repository**

   ```
   git clone https://github.com/Oseembiya/Vue.git
   cd Vue
   ```

2. **Install dependencies**

   ```
   npm install
   ```

3. **Run development server**

   ```
   npm run serve
   ```

4. **Build for production**
   ```
   npm run build
   ```

## 🔌 API Integration

The application connects to a backend API deployed on AWS Elastic Beanstalk with the following endpoints:

- `GET /lessons`: Fetches all available lessons
- `GET /search?q=query`: Searches lessons by subject or location
- `POST /order`: Submits order information
- `GET /images/:imagePath`: Serves lesson images

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Desktop computers (1200px+)
- Laptops and small desktops (992px-1199px)
- Tablets (768px-991px)
- Mobile phones (landscape and portrait)
- Small mobile devices

## 🔮 Future Improvements

- User authentication and account management
- Lesson categories and filtering
- Payment gateway integration
- Lesson reviews and ratings input
- Activity recommendations
- Admin dashboard for lesson management

## 📬 Contact

For questions or feedback about this project:

- GitHub: [Oseembiya](https://github.com/Oseembiya)
