# RentEase - Frontend

This is the frontend of the RentEase application, built with React and Vite.

## 🚀 Features
- **Modern UI**: Styled with Tailwind CSS 4 and Flowbite components.
- **Authentication**: Integrated with Clerk for secure user management.
- **Interactivity**: Smooth transitions and animations using Framer Motion.
- **Icons**: Beautifully crafted icons from Lucide React.
- **State Management & Routing**: Managed via React Router 7.

## 🛠️ Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file in this directory:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_API_URL=your_backend_api_url
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   ```

## 📂 Structure
- `src/components`: Reusable UI components.
- `src/pages`: Main application views.
- `src/context`: Application-wide state management.
- `src/assets`: Images and styles.
