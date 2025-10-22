package com.example.event_schedule.DTOs;

import jakarta.validation.constraints.NotBlank;

public class EventInfoRequestDTO {

    @NotBlank(message="Stage is required")
    private String stage;

    @NotBlank(message="Title is required")
    private String title;

    private String description;

    @NotBlank(message="Time is required")
    private String dateTime;

    private String instructor;

    public EventInfoRequestDTO() {}

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
        return instructor;
    }

    public void setInstructor(String instructor) {
        this.instructor = instructor;
    }
}
