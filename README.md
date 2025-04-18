# Bookstore Application

A modern bookstore application with .NET 9 backend and React frontend.

## Project Structure
- `backend/`: .NET 9 Web API project
- `frontend/`: React TypeScript frontend application

## Prerequisites
- .NET 9 SDK
- Node.js (LTS version)
- npm or yarn

## Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Restore dependencies:
   ```bash
   dotnet restore
   ```
3. Run the application:
   ```bash
   dotnet run
   ```

## Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npx create-react-app frontend --template typescript
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Development
- Backend runs on `https://localhost:5001`
- Frontend runs on `http://localhost:3000`

## Features
- Book catalog management
- User authentication
- Shopping cart functionality
- Order management 