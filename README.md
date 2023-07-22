# Course Management System

## Description
The Course Management System is a web application built with Node.js and MongoDB that allows teachers to manage courses, and students to enroll in and track their progress in those courses. The application also includes a bonus feature for sending notifications to users.

## Prerequisites
- Node.js (version 14 or above)
- MongoDB (version 4 or above)
- NPM (Node Package Manager)

## Getting Started
Follow these instructions to set up and run the project locally.

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/course-management-system.git
cd course-management-system
```

### Features
- The Course Management System includes the following features:

####1. User Registration and Authentication
```bash
POST /api/auth/register (Register a new user)
POST /api/auth/login (Authenticate and log in a user)
```

####2. Course Management
```bash
GET /api/courses (Get all courses)
POST /api/courses (Create a new course) [Authenticated Teacher Only]
PUT /api/courses/:id (Update a course) [Authenticated Teacher Only]
DELETE /api/courses/:id (Delete a course) [Authenticated Teacher Only]
```

####3. Student Enrollment
```bash
GET /api/enrollment/courses (Get available courses for enrollment) [Authenticated Student Only]
POST /api/enrollment/courses/:id (Enroll in a course) [Authenticated Student Only]
```

####4. Progress Tracking
```bash
GET /api/progress/courses/:id (Get student progress in a course) [Authenticated Student Only]
POST /api/progress/courses/:id/lesson (Mark a lesson as completed) [Authenticated Student Only]
POST /api/progress/courses/:id/quiz (Record a quiz score) [Authenticated Student Only]
```

####5.  Notifications
```bash
GET /api/notifications (Get all notifications for the authenticated user) [Authenticated Student Only]
POST /api/notifications (Send a notification to a user) [Authenticated Teacher Only]
PATCH /api/notifications/:id (Mark a notification as read) [Authenticated Student Only]
```

##Contributing
If you would like to contribute to the project, follow these steps:

#####Fork the repository
```bash
Create a new branch (git checkout -b feature/your-feature)
Make your changes and commit them (git commit -m "Add your changes")
Push the changes to your branch (git push origin feature/your-feature)
Create a pull request
```

##License
This project is licensed under the MIT License.

##Contact
For any questions or support, you can reach out to the project maintainers at
``` mehta.amit53@gmail.com ```

##End