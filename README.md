# Tasty Tracks

Tasty Tracks is an online food ordering system that allows customers to explore menus, place orders, and enables restaurant owners to manage their menus and track orders. This project is developed using Next.js, Tailwind CSS, and Django.

## Features

- **Customer Features:**

  - Explore available restaurants and menus.
  - Place orders and track order history.
  - User authentication and profile management.

- **Restaurant Owner Features:**

  - Manage restaurant information and location.
  - Add, edit, or remove menu items.
  - View and process incoming orders.

- **Admin Features:**
  - Access an admin dashboard for system analytics.
  - Manage user accounts and permissions.
  - View and manage all orders.

## Tech Stack

- **Frontend:**

  - Next.js
  - Tailwind CSS
  - Mantine UI

- **Backend:**

  - Django
  - Django REST Framework

- **Database:**
  - SQLite (Development)
  - PostgreSQL (Production)

## Getting Started

### Prerequisites

- Node.js and npm
- Python 3 and pip
- Django
- PostgreSQL (for production)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/devisreal/TastyTracks.git
   ```

2. Navigate to the frontend and install dependencies:

   ```bash
   cd frontend
   npm install
   ```

3. Navigate to the backend and install dependencies:

   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. Run the development servers:

- Frontend

  ```bash
  npm run dev
  ```

- Backend
  ```bash
  python manage.py runserver
  ```

5. Open your browser and visit [http://localhost:3000](http://localhost:3000).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE).
