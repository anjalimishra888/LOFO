# LOFO - Lost and Found Management System

## Lost It. List It. Find It.

LOFO is a full-stack Lost and Found Management System developed using the MERN Stack (MongoDB, Express.js, React.js, and Node.js). The platform provides a centralized solution for reporting, searching, matching, and recovering lost or found items through a secure and user-friendly interface.

The system enables users to create lost and found item reports, upload images, search listings, communicate with item owners, and track item recovery. It also includes an administrative panel for managing users, monitoring reports, and overseeing platform activity.

By digitizing the lost-and-found process, LOFO helps individuals reconnect with their belongings quickly and efficiently.

---

# Objectives

* Provide a centralized platform for reporting lost and found items.
* Simplify the process of searching for missing belongings.
* Enable communication between item owners and finders.
* Improve item recovery rates through matching and tracking features.
* Ensure secure access through authentication and authorization.

---

# Features

## Authentication & Security

* User Registration
* User Login
* JWT-Based Authentication
* Protected Routes
* Role-Based Access Control
* User Profile Management

---

## Item Management

* Report Lost Items
* Report Found Items
* Upload Item Images
* Update Item Information
* Delete Item Reports
* View Item Details
* Manage Personal Listings
* Item Status Tracking

---

## Search & Filtering

* Search Items by Title
* Filter by Category
* Filter by Lost/Found Status
* Browse Recent Listings

---

## Messaging System

* Contact Item Owner
* Send Messages
* View Conversations
* Manage User Chats
* Read/Unread Message Tracking

---

## Matching System

* Generate Lost/Found Matches
* View All Matches
* Match Items by Reports
* Track Recovery Status
* Recover Matched Items
* Delete Invalid Matches

---

## Admin Dashboard

* Admin Authentication
* Dashboard Statistics
* Manage Users
* View User Information
* Change User Roles
* Monitor Platform Activity
* Manage Lost and Found Reports

---

# Technology Stack

## Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* Context API

---

## Backend

* Node.js
* Express.js
* JWT Authentication
* Multer
* RESTful API Architecture

---

## Database

* MongoDB Atlas
* Mongoose ODM

---

# System Architecture

Frontend (React.js)

↓

REST API (Express.js)

↓

Business Logic (Node.js)

↓

MongoDB Atlas Database

---

# Database Collections

## Users

Stores:

* User Information
* Login Credentials
* User Roles

---

## Items

Stores:

* Lost Item Reports
* Found Item Reports
* Item Images
* Item Details
* Ownership Information

---

## Messages

Stores:

* User Conversations
* Item Discussions
* Communication History

---

## Matches

Stores:

* Lost Item Matches
* Found Item Matches
* Recovery Status
* Match Records

---

# API Modules

## Auth Module

* Register User
* Login User
* Get Profile

---

## Item Module

* Create Item
* Get All Items
* Search Items
* Get Item By ID
* Update Item
* Delete Item
* My Items

---

## Message Module

* Contact Owner
* Send Message
* Get Conversation
* Get My Chats
* Mark As Read

---

## Match Module

* Generate Matches
* Get All Matches
* Get Matches By Item
* Recover Match
* Delete Match

---

## Admin Module

* Dashboard Statistics
* Get All Users
* Get Single User
* Change User Role
* Admin Management

---

# Recovery Workflow

1. User reports a lost item.
2. Another user reports a found item.
3. System generates possible matches.
4. Users communicate through the messaging system.
5. Ownership is verified.
6. Item is marked as recovered.
7. Recovery record is stored in the system.

---

# Future Enhancements

* Real-Time Chat using Socket.io
* Email Notifications
* Push Notifications
* AI-Based Smart Item Matching
* OCR for Item Identification
* Image Recognition
* Location-Based Search
* Mobile Application (React Native)
* Google Maps Integration
* Advanced Analytics Dashboard

---

# Project Highlights

* Secure JWT Authentication
* MongoDB Atlas Cloud Database
* Image Upload Support
* Lost & Found Item Matching
* User Messaging System
* Admin Dashboard
* RESTful API Design
* Scalable MERN Architecture

---

# Author

**Anjali Mishra**


