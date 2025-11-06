package com.example.event_schedule.DTOs;

import jakarta.validation.constraints.*;

public class AttendeeRequestDTO {
    private Long id;

    @NotBlank(message="Name is required")
    @Size(max = 100, message = "Name too long")
    private String name;

    @NotBlank(message="Email is required")
    @Email(message="Email should be valid")
    private String email;

    @NotBlank(message="Phone number is required")
    @Size(max=15, message="Phone number too long")
    private String phone;

    @Min(value=1, message="At least one ticket must be requested")
    @Max(value = 10, message =" Cannot request more than 10 tickets")
    private int tickets;

    private String eventTitle;

    public AttendeeRequestDTO() {
    }

    public Long getId() {return id;}
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
    public String getEventTitle() {
        return eventTitle;
    }
    public void setEventTitle(String eventTitle) {
        this.eventTitle = eventTitle;
    }

}


//to create or update user entity