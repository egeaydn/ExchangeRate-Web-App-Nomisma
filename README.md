<div align="center">

# 🪙 Nomisma

### The Premier Modern Currency Exchange Platform


<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css" />
  <img src="https://img.shields.io/badge/Firebase-Auth_&_DB-FFCA28?style=for-the-badge&logo=firebase" />
  <br />
  <img src="https://img.shields.io/badge/Developed_with-Google_DeepMind_Antigravity-4285F4?style=for-the-badge&logo=google" />
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Structure</a>
</p>

---
</div>

## 🌟 Overview

**Nomisma** is a state-of-the-art currency exchange tracking application designed for accuracy, speed, and visual elegance. Built with the latest web technologies, it provides real-time exchange rates, detailed historical charts, and a seamless user experience wrapped in a premium, dark-themed UI.

Whether you are a casual traveler or a serious trader, Nomisma offers the most accurate data at your fingertips.

## ✨ Key Features

- **🚀 Real-Time Exchange Rates:** Live updates for major global currencies including USD, EUR, GBP, TRY, and more.
- **📊 Interactive Charts:** Visualize currency trends over time with dynamic, interactive charts powered by Chart.js.
- **🔐 Secure Authentication:** Robust user authentication system (Login/Register) powered by Firebase.
- **🎨 Modern Aesthetic:** A stunning, responsive user interface featuring glassmorphism, smooth animations (Framer Motion), and a sleek dark mode.
- **📱 Fully Responsive:** Optimized experience across all devices, from desktop dashboards to mobile screens.
- **🌐 Multi-Language Support:** Interface ready for internationalization (currently supporting EN/TR switching in Auth).

## 🛠️ Tech Stack

Nomisma cuts no corners, utilizing the bleeding edge of modern web development:

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Backend/Auth:** [Firebase](https://firebase.google.com/)
- **Charts:** [Chart.js](https://www.chartjs.org/) & [React-Chartjs-2](https://react-chartjs-2.js.org/)
- **Icons:** [Lucide React](https://lucide.dev/) & [FontAwesome](https://fontawesome.com/)

## 🚀 Getting Started

Follow these steps to get a local copy up and running.

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nomisma.git
   cd nomisma
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory and add your Firebase and API keys:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   # Add other necessary env vars
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the app**
   Visit `http://localhost:3000` in your browser.

## 📂 Project Structure

```bash
nomisma/
├── app/                  # Next.js App Router pages
│   ├── Auth/             # Login page
│   ├── Register/         # Registration page
│   ├── currency/[code]/  # Dynamic currency detail pages
│   └── page.tsx          # Landing/Home page
├── components/           # Reusable UI components
│   ├── Navbar.tsx        # Navigation bar
│   ├── ExchangeTable.tsx # Main currency table component
│   └── ...
├── lib/                  # Utility functions and Firebase config
├── public/               # Static assets (images, fonts)
└── ...
```

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <p>Built with ❤️ by the Nomisma Team</p>
  <p><i>Developed with the assistance of <b>Google DeepMind Antigravity</b></i></p>
</div>
