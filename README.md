# Ecommerce-Decentralized_Delivery_System
An E-commerce platform with a unique Decentralized Delivery System feature, allowing users to become delivery agents during their free time. The platform is built using Node.js, Express, and MongoDB, offering a fully functional backend for user management, product management, and decentralized delivery.
****Table of Contents:**
   Features
   Tech Stack
   Setup and Installation
   Environment Variables
   API Endpoints
   Testing the API
   Database Schema
   Decentralized Delivery System
 
**Features**
   **General Features**
       User Registration & Login: Users can register, log in, and access their profile.
       JWT Authentication: Secure authentication using JSON Web Tokens (JWT).
       Product Management: CRUD operations for products (admin-only).
       Cart Management: Users can add products to their cart and checkout.
       Admin Panel: Admins can manage users, products, and orders.
   ** Unique Features**
       Decentralized Delivery System: Users can volunteer to deliver products during their free time.
       Admin-Controlled Access: Admins can manage delivery agents and ensure security by verifying trusted users.

**Tech Stack**
Node.js: Server-side JavaScript runtime.
Express.js: Web framework for building APIs.
MongoDB: NoSQL database for storing user, product, and delivery data.
Mongoose: ODM for MongoDB.
JWT: For secure authentication.
bcryptjs: For password hashing.

**Decentralized Delivery System
How it Works:**
User Volunteer: Any verified user can volunteer to deliver products in their free time.
Admin Verification: The admin ensures only trusted users can act as delivery agents.
Decentralized Delivery Flow:
A product is purchased.
A volunteer user offers to deliver the product.
The admin approves the volunteer, and the delivery is assigned.
Security Measures:
Verified Users: Only users verified by the admin can take part in the delivery process.
       
   
