# Lite Data

Lite Data is a full-stack web application built with Next.js for the frontend and Flask for the backend. It provides a modern, responsive user interface powered by React and Material-UI, and a robust backend API built with Flask.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Build and Deployment](#build-and-deployment)
- [Scripts](#scripts)
- [Technologies Used](#technologies-used)
- [Testing](#testing)
- [License](#license)

---

## Features

- **Frontend**: Built with Next.js and React, styled using Material-UI.
- **Backend**: Flask API for handling server-side logic and data processing.
- **Testing**: Unit testing with Vitest and React Testing Library.
- **Linting**: Code linting with ESLint.

---

## Project Structure

```
├── api/ # Flask backend code 
├── app/ # Next.js app directory 
├── components/ # React components 
├── context/ # React context for state management 
├── public/ # Static assets 
├── utils/ # Utility functions 
├── .next/ # Next.js build output 
├── package.json # Project metadata and scripts 
├── requirements.txt # Python dependencies for Flask 
├── tsconfig.json # TypeScript configuration 
├── vitest.config.mts # Vitest configuration
```



---


## Getting Started

### Prerequisites

- **Node.js**: Version 18 or higher
- **Python**: Version 3.10 or higher
- **npm or yarn**: Comes with Node.js
- **pip**: Python package manager

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/vkondi/lite-data.git
   cd lite-data
   ```

2. Install Node.js dependencies:
   ```
   yarn install
   ```

3. Install Python dependencies:
   ```
   pip install -r requirements.txt
   ```

### Development

To start the development servers for both the frontend and backend:
   ```
   yarn dev
   ```

- The Next.js frontend will run on http://localhost:3000.
- The Flask backend will run on http://localhost:5328.

### Build and Deployment
To build the Next.js application for production:
```
yarn build
```

To start the production server:
```
yarn start
```

---

### Scripts
The following scripts are defined in the package.json file:

- `yarn flask-dev`: Installs Python dependencies and starts the Flask development server.
- `yarn next-dev`: Starts the Next.js development server with Turbopack.
- `yarn dev`: Runs both the frontend and backend concurrently.
- `yarn build`: Builds the Next.js application for production.
- `yarn start`: Starts the production server.
- `yarn lint`: Runs ESLint to lint the codebase.
- `yarn test`: Runs unit tests using Vitest.

---

### Technologies Used

#### Frontend
- **Next.js**: React framework for server-side rendering and static site generation.
- **React**: JavaScript library for building user interfaces.
- **Material-UI**: Component library for styling.

#### Backend
- **Flask**: Lightweight Python web framework.

#### Testing
- **Vitest**: Unit testing framework.
- **React Testing Library**: Testing utilities for React components.


---

### Testing
To run the test suite:
```
yarn test
```

---

### License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

