package com.example.event_schedule.DTOs;

import jakarta.validation.constraints.*;

public class UserRequestDTO {
    @NotBlank(message="Name is required")
    private String name;

    @Email(message="Email should be valid")
    private String email;

    @NotBlank(message="Phone number is required")
    private String phone;

    @Min(value=1, message="At least one ticket must be requested")
    private int tickets;

    private String sessionTitle;

    public UserRequestDTO() {
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public int getTickets() {
        return tickets;
    }
    public void setTickets(int tickets) {
        this.tickets = tickets;
    }
    public String getSessionTitle() {
        return sessionTitle;
    }
    public void setSessionTitle(String sessionTitle) {
        this.sessionTitle = sessionTitle;
    }

}


//to create or update user entity