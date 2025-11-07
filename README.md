# EarthPulse Event Schedule App

## Project Description
**EarthPulse** is a full-stack event scheduling application inspired by yoga and wellness festivals.  
Users can browse sessions through an interactive schedule, view event details, and register for the events they want to attend.  
The app provides a smooth, interactive experience for viewing, adding, editing, and deleting sign-ups connecting a **React front end** with a **Spring Boot + MySQL back end**.  
The project was designed to simulate a real-world event management system, emphasizing CRUD functionality, data validation, and clean UI design.

---

## Technologies Used
**Front End:** React, JavaScript, HTML5, CSS3  
**Back End:** Java, Spring Boot, Spring Web, Spring Data JPA, MySQL  
**Dev Tools:** IntelliJ IDEA, VS Code, Git/GitHub, Postman, MySQL Workbench  

---

## Installation Steps

### 1. Clone the Repository
git clone https://github.com/kahqgc/event-schedule-with-backend.git
cd event-schedule-with-backend

### 2. Set Up the Backend

1. Open the `/backend` folder in **IntelliJ IDEA**.  
2. Create a MySQL database (example name: `event_schedule_db`).  
3. Update credentials in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/event_schedule_db
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   spring.jpa.hibernate.ddl-auto=update
