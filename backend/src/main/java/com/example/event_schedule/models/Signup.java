package com.example.event_schedule.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "signups")
public class Signup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private Long id;

    //many signups to one attendee
    @ManyToOne
    @JoinColumn(name = "attendee_id", nullable=false)
    @OnDelete(action = OnDeleteAction.CASCADE) //if one thing is deleted, the other connected things are automatically deleted too
    @JsonIgnoreProperties({"signups"}) //avoids infinite recursion during serialization
    private Attendee attendee;

    //many signups to one event
    // this is the owning side of the relationship and contains the foreign key event_id
    @ManyToOne
    @JoinColumn(name="event_id", nullable=false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnoreProperties({"signups"}) //avoids infinite recursion during serialization
    private EventInfo eventInfo;

    public Signup() {}

    public Signup (Attendee attendee, EventInfo eventInfo) {
        this.attendee = attendee;
        this.eventInfo = eventInfo;
    }

    public Long getId() {
        return id;
    }
    public Attendee getAttendee() {
        return attendee;
    }

    public void setAttendee(Attendee attendee) {
        this.attendee = attendee;
    }

    public EventInfo getEventInfo() {
        return eventInfo;
    }

    public void setEventInfo(EventInfo eventInfo) {
        this.eventInfo = eventInfo;
    }

    @Override
    public String toString() {
        return "Signup{" +
                "id=" + id +
                ", attendeeId=" + (attendee != null ? attendee.getId() : null) +
                ", eventId=" + (eventInfo != null ? eventInfo.getId() : null) +
                '}';
    }
}

