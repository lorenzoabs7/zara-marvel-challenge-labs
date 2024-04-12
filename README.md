# Marvel Characters Explorer

## Overview

Marvel Characters Explorer is a web application developed with Next.js that allows users to explore information about Marvel characters, view specific details, and manage a list of favorites.

## Quick Start

### Prerequisites

- Node.js version 18 or higher
- npm or yarn

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Yooololo/challange-marvel
   cd challenge_marvel
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

Access `http://localhost:3000` in your browser to view the application.

## Project Structure

The application follows a component-based, modular architecture, facilitating code reuse and maintenance.

- `public/`: Hosts static files like images and logos.
- `src/`: Source Folder.
- `src/__tests__`: Test.
- `src/api/`: API management.
- `src/app/`: Includes Next.js pages, also acting as routing points.
- `src/assets/`: Provides common assets for the application.
- `src/components/`: Contains reusable and autonomous React components.
- `src/contexts/`: Defines React Context API for global state management.
- `src/styles/`: Contains global and component-specific styles in SASS.
- `src/utils/`: Provides common utility functions for the application.

## Features

- Pagination and display of Marvel characters.
- Character search by name.
- Viewing character details and their comics.
- Managing favorite characters.

## Technologies

- Next.js for SSR (Server-Side Rendering) when applicable and routing.
- React Context API for global state management.
- Sass for styling.
- Axios for handling HTTP requests to the Marvel API.
- Jest for testing.
