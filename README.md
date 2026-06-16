# MediHub - Healthcare Management System

[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/ChithoreTanay1/healthcare-database-thesis)

MediHub is a comprehensive healthcare management platform designed as a thesis project. It showcases a modern, scalable web application built with a microservices architecture. The system provides functionalities for managing patients, appointments, feedback, and performance analytics within a healthcare organization.

The application is split into two main parts: a React-based frontend for the user interface and a Spring Boot-based backend composed of multiple microservices.

## Architecture

The backend follows a microservices pattern, orchestrated with Spring Cloud, Docker, and Redis. This design promotes scalability, resilience, and maintainability.

### Backend Services (`healthcare-backend`)

-   **Eureka Server:** A service registry where all other microservices register themselves, enabling dynamic service discovery.
-   **API Gateway:** The single entry point for all client requests. It routes traffic to the appropriate microservice and handles cross-cutting concerns like authentication using JWT.
-   **Auth Service:** Manages user registration, login, and JWT token generation. It uses a dedicated PostgreSQL database for user credentials.
-   **Patient Service:** Handles all CRUD operations for patient records.
-   **Appointment Service:** Manages the scheduling, updating, and cancellation of appointments.
-   **Feedback Service:** Collects and manages feedback from users, which can be categorized and reviewed.
-   **Analytics Service:** Provides data for performance dashboards, including team health metrics (Team Pulse) and progress on organizational goals.
-   **Notification Service:** A foundational service for handling notifications (e.g., email), though currently in a basic state.

Each business-logic service utilizes its own PostgreSQL database instance to ensure loose coupling and independent data management. Redis is integrated across services for efficient caching, reducing database load and improving response times.

### Frontend (`healthcare-database`)

The frontend is a modern single-page application (SPA) built with React and Vite, offering a fast and responsive user experience.

-   **State Management:** Zustand is used for simple and effective global state management.
-   **Styling:** Tailwind CSS provides a utility-first approach for a clean and consistent design.
-   **UI Components:** The interface is composed of reusable components for the sidebar, top bar, and various dashboard widgets.
-   **Pages:** The application is divided into several pages, including Dashboard, Feedback, Reports, Goals, and Surveys.

## Features

-   **User Authentication:** Secure login system with JWT-based authentication for different user roles (Admin, Doctor, Manager).
-   **Dashboard:** An overview of key metrics, including patient counts, active doctors, appointments, and overall team health.
-   **Patient Management:** Full CRUD capabilities for patient records.
-   **Appointment Scheduling:** Create, view, and manage appointments with different statuses (Confirmed, Pending, Completed).
-   **Feedback System:** Submit, view, and manage categorized feedback with status tracking (New, Reviewed, Archived).
-   **Analytics & Reporting:** Visualize team performance metrics like collaboration, communication, and work-life balance.
-   **Goal Tracking:** Set and monitor the progress of team-specific or organizational goals.
-   **Scalable Infrastructure:** Dockerized services managed with Docker Compose for easy deployment and scaling.

## Technology Stack

| Component           | Technology                                                                                                    |
| ------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Backend**         | Java 21, Spring Boot 3, Spring Cloud (Eureka, Gateway), Spring Data JPA, JWT, Maven                           |
| **Frontend**        | React, TypeScript, Vite, Zustand, Tailwind CSS                                                                |
| **Database**        | PostgreSQL (per service)                                                                                      |
| **Caching**         | Redis                                                                                                         |
| **Containerization**| Docker, Docker Compose                                                                                        |

## Getting Started

### Prerequisites

-   Docker and Docker Compose
-   Java 21 or later
-   Node.js (v16+) and npm (v8+)

### Backend Setup

1.  Navigate to the `healthcare-backend` directory:
    ```sh
    cd healthcare-backend
    ```
2.  Build and run all the microservices and databases using Docker Compose:
    ```sh
    docker-compose up --build
    ```
    This command will build Docker images for each service and start all containers, including PostgreSQL databases and Redis. The API Gateway will be available at `http://localhost:8080`.

### Frontend Setup

1.  Navigate to the `healthcare-database` directory:
    ```sh
    cd healthcare-database
    ```
2.  Install the required dependencies:
    ```sh
    npm install
    ```
3.  Start the development server:
    ```sh
    npm run dev
    ```
    The application will be accessible at `http://localhost:5173`. You can log in with any email and password to access the dashboard.
