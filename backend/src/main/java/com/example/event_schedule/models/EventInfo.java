package com.example.event_schedule.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;


@Entity
@Table(name="event_info")
public class EventInfo {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private String stage;
    private String title;

    @Lob
    private String description;
    // should I be using LocalDateTime here?
    // private LocalDateTime localDateTime;
    private String dateTime;

    //filter instructor thru Instructor table?
    private String instructor;

    public EventInfo() {}

    public EventInfo(String stage, String title, String description, String dateTime, String instructor) {
        this.stage = stage;
        this.title = title;
        this.description = description;
        this.dateTime = dateTime;
        this.instructor = instructor;
    }
    public Long getId() {
        return id;
    }
    public String getStage() {
        return stage;
    }
    public void setStage(String stage) {
        this.stage = stage;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getDateTime() {
        return dateTime;
    }
    public void setDateTime(String dateTime) {
        this.dateTime = dateTime;
    }
    public String getInstructor() {
        return instructor;}
    public void setInstructor(String instructor) {
        this.instructor = instructor;
    }

    @Override
    public String toString() {
        return "EventInfo{" +
                "id=" + id +
                ", stage='" + stage + '\'' +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", dateTime='" + dateTime + '\'' +
                ", instructor='" + instructor + '\'' +
                '}';
    }
}
