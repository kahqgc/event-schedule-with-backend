package com.example.event_schedule.models;

import jakarta.persistence.*;


@Entity
@Table(name = "signups")
public class Signup {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int id;

        @Column(name = "user_id")
        private int userId;

        @ManyToOne
        @JoinColumn(name="event_id")
        private EventInfo eventInfo;

        public Signup() {}

        public Signup (int userId, EventInfo eventInfo) {
            this.userId = userId;
            this.eventInfo = eventInfo;
        }

        public int getId() {
            return id;
        }

        public int getUserId() {
            return userId;
        }

        public void setUserId(int userId) {
            this.userId = userId;
        }

        public EventInfo getEventInfo() {
            return eventInfo;
        }

        public void setEventInfo(EventInfo eventInfo) {
            this.eventInfo = eventInfo;
        }
    }
