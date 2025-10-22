package com.example.event_schedule.models;

import jakarta.persistence.*;


@Entity
@Table(name = "signups")
public class Signup {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @ManyToOne
        @JoinColumn(name = "user_id")
        private User user;

        @ManyToOne
        @JoinColumn(name="event_id")
        private EventInfo eventInfo;

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
    }
