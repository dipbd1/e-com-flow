# E-Commerce X1

A modern e-commerce platform built with Next.js, TypeScript, and Tailwind CSS, featuring a product gallery with shopping cart functionality.

## ✨ Features

- **Product Gallery**
  - Responsive grid layout
  - Category and price filtering
  - Sorting by price and name
  - Product search functionality

- **Shopping Cart**
  - Add/remove items
  - Quantity management
  - Persistent storage
  - Real-time price calculation

- **Modern Tech Stack**
  - Next.js 15 with App Router
  - TypeScript for type safety
  - Tailwind CSS for styling
  - Redux for state management
  - Shadcn UI components

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   # Clone the repository
   git clone https://github.com/dipbd1/e-com-flow.git
   cd e-com-flow
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   # Copy the example environment file
   cp .env.example .env.local

   NEXT_PUBLIC_API_URL=http://localhost:3000 (Use this one to make sure api runs)

   # Update the environment variables as needed
   ```

4. **Development**
   ```bash
   # Start the development server
   npm run dev
   # or
   yarn dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## 🛠️ Built With

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [Shadcn UI](https://ui.shadcn.com/) - UI components

## 📝 Project Structure

```
src/
├── app/              # Next.js app router
├── components/       # Reusable components
├── hooks/           # Custom hooks
├── lib/             # Utility functions
├── store/           # Redux store
└── types/           # TypeScript types
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
