# E-Commerce X1

A modern, full-featured e-commerce platform built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Tech Stack**
  - Next.js 14 with App Router
  - TypeScript for type safety
  - Tailwind CSS for styling
  - Redux for state management
  - Shadcn UI components

- **User Experience**
  - Responsive design
  - Dark/Light mode support
  - Smooth animations
  - Optimized performance

- **E-commerce Features**
  - Product catalog with categories
  - Shopping cart with persistent storage
  - Product search and filtering
  - New arrivals section
  - Product details with attributes

- **Development Features**
  - ESLint and Prettier for code quality
  - TypeScript for type safety
  - Husky for git hooks
  - Conventional commits

## 🛠️ Setup

1. **Prerequisites**
   - Node.js 18+ and npm/yarn
   - Git

2. **Installation**
   ```bash
   # Clone the repository
   git clone https://github.com/yourusername/ecom-x1.git
   cd ecom-x1

   # Install dependencies
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   ```bash
   # Copy the example environment file
   cp .env.example .env.local

   # Update the environment variables as needed
   ```

4. **Development**
   ```bash
   # Start the development server
   npm run dev
   # or
   yarn dev
   ```

5. **Building for Production**
   ```bash
   # Build the application
   npm run build
   # or
   yarn build

   # Start the production server
   npm start
   # or
   yarn start
   ```

## 🏗️ Technical Decisions

1. **Next.js App Router**
   - Chosen for its modern features and improved performance
   - Server components for better SEO and initial load
   - Route groups for better organization
   - Built-in API routes

2. **TypeScript**
   - Strict type checking for better code quality
   - Improved developer experience
   - Better maintainability

3. **Redux for State Management**
   - Centralized state management
   - Predictable state updates
   - Middleware support for async operations
   - DevTools for debugging

4. **Tailwind CSS**
   - Utility-first approach for rapid development
   - Custom theme configuration
   - Responsive design out of the box
   - PurgeCSS for optimized production builds

5. **Project Structure**
   ```
   src/
   ├── app/                    # Next.js app router
   │   ├── (common)/          # Common routes
   │   └── api/               # API routes
   ├── components/            # Reusable components
   ├── hooks/                # Custom hooks
   ├── lib/                  # Utility functions
   ├── store/                # Redux store
   └── types/                # TypeScript types
   ```

## 🤔 Assumptions

1. **Development Environment**
   - Node.js 18+ is available
   - Modern browser support
   - Git for version control

2. **User Requirements**
   - Users have JavaScript enabled
   - Users have modern browsers
   - Users understand basic e-commerce concepts

3. **Data Management**
   - Products have consistent attributes
   - Categories are hierarchical
   - Cart data persists in localStorage

## 🔮 Future Improvements

1. **Features**
   - User authentication and accounts
   - Wishlist functionality
   - Product reviews and ratings
   - Checkout process
   - Payment integration
   - Order tracking

2. **Performance**
   - Image optimization
   - Code splitting
   - Caching strategies
   - Lazy loading

3. **Developer Experience**
   - Component documentation
   - Testing setup
   - CI/CD pipeline
   - Performance monitoring

4. **Accessibility**
   - ARIA labels
   - Keyboard navigation
   - Screen reader support
   - Color contrast

## 🐛 Troubleshooting

1. **TypeScript Errors**
   - Ensure all components are properly typed
   - Check for missing type definitions
   - Verify Next.js page props types
   - Run `yarn tsc --noEmit` to check types

2. **Build Issues**
   - Clear Next.js cache: `rm -rf .next`
   - Delete node_modules: `rm -rf node_modules`
   - Reinstall dependencies: `yarn install`
   - Check for conflicting dependencies

3. **Development Server**
   - Ensure port 3000 is available
   - Check for environment variables
   - Verify API endpoints are accessible
   - Monitor console for errors

4. **Styling Issues**
   - Check Tailwind configuration
   - Verify PostCSS setup
   - Ensure proper class names
   - Check for conflicting styles

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/yourusername/ecom-x1](https://github.com/yourusername/ecom-x1)
