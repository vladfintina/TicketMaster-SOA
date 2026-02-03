# Ticket Management System

A full-stack web application for managing support tickets, built with <TECH STACK>.  
The system allows users to track and manage tickets through a modern web interface.

## Purpose

This project was developed to demonstrate a complete full-stack architecture, including:

- REST API design
- Frontend–backend integration
- Database persistence
- Containerized deployment using Docker

## Architecture Overview

The application is built using a microservice-style architecture with both synchronous and asynchronous communication.

### Core Components

- **Frontend** – Web interface for users
- **Backend API** – Handles ticket operations and business logic
- **Database** – Stores application data
- **NGINX** – Reverse proxy and load balancer
- **RabbitMQ** – Handles internal asynchronous task processing
- **Kafka** – Event streaming between services
