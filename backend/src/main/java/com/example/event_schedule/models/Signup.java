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

        @ManyToOne
        @JoinColumn(name = "user_id")
        @OnDelete(action = OnDeleteAction.CASCADE)
        private User user;

        @ManyToOne
        @JoinColumn(name="event_id")
        @OnDelete(action = OnDeleteAction.CASCADE)
        private EventInfo eventInfo;

        public Signup() {}

        public Signup (User user, EventInfo eventInfo) {
            this.user= user;
            this.eventInfo = eventInfo;
        }

        public Long getId() {
            return id;
        }

        public User getUserId() {
            return user;
        }

        public void setUserId(User user) {
            this.user= user;
        }

        public EventInfo getEventInfoId() {
            return eventInfo;
        }

        public void setEventInfoId(EventInfo eventInfo) {
            this.eventInfo = eventInfo;
        }
    }
