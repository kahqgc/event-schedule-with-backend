package com.example.event_schedule.models;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "signups")
public class Signup {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        //many signups to one user
        @ManyToOne
        @JoinColumn(name = "user_id", nullable=false)
        @OnDelete(action = OnDeleteAction.CASCADE) //if one thing is deleted, the other connected things are automatically deleted too
        private User user;

        //many signups to one event
        @ManyToOne
        @JoinColumn(name="event_id", nullable=false)
        @OnDelete(action = OnDeleteAction.CASCADE)
        private EventInfo eventInfo;
        //one event to many signups

        public Signup() {}

        public Signup (User user, EventInfo eventInfo) {
            this.user = user;
            this.eventInfo = eventInfo;
        }

        public Long getId() {
            return id;
        }
        public User getUser() {
            return user;
        }

        public void setUser(User user) {
            this.user = user;
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
                ", user=" + user +
                ", eventInfo=" + eventInfo +
                '}';
    }
}
