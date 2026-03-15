# 🐶 Dog Walker App

A web application that connects dog owners with professional dog walkers, built with vanilla JavaScript using Object-Oriented Programming principles.

## 📋 Description

This system manages the relationship between **clients** (dog owners) and **walkers** (dog walkers). Clients can book a walker, and walkers can approve or reject bookings based on their van capacity and dog size restrictions.

## ✨ Features

**Client profile:**
- Register and login with validations (unique username, password rules)
- Browse available walkers with enough capacity for their dog
- Book a walker and track booking status
- Cancel pending bookings

**Walker profile:**
- Pre-loaded walkers with van capacity
- View and process pending bookings
- Auto-reject bookings that exceed capacity or violate size restrictions (small dogs cannot share with large dogs)
- View assigned dogs with capacity stats

## 🛠️ Technologies

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- Object-Oriented Programming (classes)

## 🏗️ Architecture

The project is structured around four main classes:

| Class | Responsibility |
|-------|---------------|
| `Sistema` | Manages all arrays/lists (clients, walkers, bookings) |
| `Cliente` | Client data and dog info |
| `Paseador` | Walker data and van capacity |
| `Contratacion` | Booking data and status |

## 🚀 How to Run

1. Clone the repository:
```bash
git clone https://github.com/Oscarandres10/dog-walker-app
```
2. Open `index.html` in your browser — no installation needed.

## 📐 Business Rules

- A **large dog** takes 4 capacity slots, **medium** takes 2, **small** takes 1
- Small and large dogs **cannot share** the same walker
- A booking starts as **"pending"** until the walker processes it
- Walkers can only accept bookings that fit their remaining capacity
- When a booking is approved, all incompatible pending bookings are automatically rejected

## 📚 Academic Context

Built as a mandatory project for **Programación 1** at Universidad ORT Uruguay.

- **Career:** Analista Programador
- **Academic average:** 96%
