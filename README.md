# MotoTracker

A full stack motocross bike tracking web application built with Django REST Framework and React. Log your bikes, track maintenance history by hours and date, and manage your garage from anywhere.

**Live App:** [motoapp-frontend.netlify.app](https://motoapp-frontend.netlify.app/)

---

## Tech Stack

**Backend**
- Python / Django
- Django REST Framework
- Simple JWT (authentication)
- PostgreSQL (production) / SQLite (development)

**Frontend**
- React (Vite)
- Axios + interceptors (automatic token refresh)
- React Router DOM
- CSS (custom, no framework)

**Deployment**
- Backend → Render
- Frontend → Netlify

---

## Features

- User registration and login
- JWT authentication with automatic token refresh
- Full CRUD on bikes (make, model, year)
- Maintenance log tracking per bike — date, hours, and description
- Full CRUD on maintenance logs
- Delete confirmation to prevent accidental data loss
- Protected routes — users only see their own bikes and logs
- Auto-redirect to login if token is expired or missing
- Mobile responsive

---

## Project Structure

```
MotoApp/
├── MotoTracker/                # Django project root
│   ├── accounts/                # User registration + auth
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   │
│   ├── bikes/                   # Bikes + maintenance logs
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   │
│   ├── MotoTracker/             # Django project config
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   │
│   ├── manage.py
│   └── requirements.txt
│
└── frontend/                    # React app
    ├── src/
    │   ├── api/
    │   │   └── axios.js         # Axios instance + JWT interceptor + refresh logic
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx    # Dashboard + EditBike
    │   │   ├── MaintenanceLog.jsx  # Log list + EditLog
    │   │   ├── AddBike.jsx
    │   │   └── AddMaintenance.jsx
    │   ├── styles/
    │   └── App.jsx
    └── .env
```

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Christiandev/MotoApp.git
cd MotoApp
```

### 2. Backend setup

```bash
cd MotoTracker

# Create and activate virtual environment
python -m venv .venv
source .venv/bin/activate        # Mac/Linux
.venv\Scripts\activate           # Windows

# Install dependencies
pip install -r requirements.txt
```

Create a `.env` file in the `MotoTracker/` directory:

```env
SECRET_KEY=your_django_secret_key
```

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

Django runs on `http://localhost:8000`

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:8000/
```

```bash
npm run dev
```

React runs on `http://localhost:5173`

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/token/` | Login — returns access + refresh tokens |
| POST | `/token/refresh/` | Refresh expired access token |
| POST | `/api/accounts/register/` | Register a new user |

### Bikes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bikes/` | List all bikes for logged in user |
| POST | `/api/bikes/` | Add a new bike |
| GET | `/api/bikes/{id}/` | Get a single bike |
| PUT | `/api/bikes/{id}/` | Update a bike |
| DELETE | `/api/bikes/{id}/` | Delete a bike (and its logs) |

### Maintenance Logs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bikes/log/{bike_id}/` | List maintenance logs for a bike |
| POST | `/api/bikes/log/{bike_id}/` | Add a maintenance log for a bike |
| GET | `/api/bikes/log/detail/{id}/` | Get a single log |
| PUT | `/api/bikes/log/detail/{id}/` | Update a log |
| DELETE | `/api/bikes/log/detail/{id}/` | Delete a log |

---

## Bike Model

| Field | Type | Description |
|-------|------|-------------|
| make | CharField | Manufacturer (e.g. Honda, KTM, Yamaha) |
| model_name | CharField | Model name |
| year | IntegerField | Model year |
| user | ForeignKey | Auto-linked to logged in user |

## Maintenance Log Model

| Field | Type | Description |
|-------|------|-------------|
| date | DateField | Date of maintenance |
| hours | IntegerField | Hours on the bike at time of service |
| description | TextField | Notes on what was serviced |
| bike | ForeignKey | Linked to the associated bike |

---

## Authentication Flow

```
Register  →  POST /api/accounts/register/  →  account created
Login     →  POST /token/                  →  access + refresh tokens returned
                                                tokens saved to localStorage
Request   →  Authorization: Bearer <access_token>
                                                attached automatically via axios interceptor
Token expires  →  interceptor catches 401
               →  POST /token/refresh/ with refresh token
               →  new access token saved
               →  original request retried automatically
Logout    →  tokens removed from localStorage  →  redirect to login
```

---

## Security

- Passwords hashed using Django's built-in `create_user()`
- Every endpoint requires authentication (`IsAuthenticated`)
- `get_queryset()` filters all data by `request.user` — users can only access their own bikes and logs
- Maintenance logs are scoped through the owning bike's user (`bike__user`)
- `perform_create()` automatically links new bikes to the logged in user
- CORS configured to only allow requests from the live frontend URL

---

## Environment Variables

**Frontend** — create `.env` inside `frontend/`:

```env
VITE_API_URL=http://localhost:8000/
```

**Backend (Render)** — set these in the Render dashboard:

```env
SECRET_KEY=your-production-secret-key
DEBUG=False
```
