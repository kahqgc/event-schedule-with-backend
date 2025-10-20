package com.example.event_schedule.DTOs;

public class UserRequestDTO {
    private String name;
    private String email;
    private String phone;
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
