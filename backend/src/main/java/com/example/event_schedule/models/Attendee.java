package com.example.event_schedule.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Entity representing a festival attendee.
 * Linked to EventInfo through the Signup join table.
 */
@Entity
@Table(name = "attendees")
public class Attendee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private Long id;
    private String name;
    private String email;

    @Column(name = "phone_number")
    private String phone;
    private int tickets;

    @Column(name = "event_title")
    private String eventTitle;

    @OneToMany(mappedBy = "attendee", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({"attendee"}) // prevents infinite recursion during serialization
    private List<Signup> signups = new ArrayList<>();

    public Attendee() {
    }

    public Attendee(String name, String email, String phone, int tickets, String eventTitle) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.tickets = tickets;
        this.eventTitle = eventTitle;
    }

    public Long getId() {
        return id;
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
    public String getEventTitle() {
        return eventTitle;
    }
    public void setEventTitle(String eventTitle) {this.eventTitle = eventTitle;}

    @Override
    public String toString() {
        return "Attendee{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", tickets=" + tickets +
                ", eventTitle='" + eventTitle + '\'' +
                '}';
    }
}
