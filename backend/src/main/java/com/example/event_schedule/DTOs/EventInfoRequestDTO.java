package com.example.event_schedule.DTOs;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;

import java.time.LocalDateTime;

public class EventInfoRequestDTO {

    @NotBlank(message="Stage is required")
    private String stage;

    @NotBlank(message="Title is required")
    private String title;

    private String description;

    @NotNull(message="Date and Time is required")
    @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dateTime;

    private String host;

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
    public LocalDateTime getDateTime() {
        return dateTime;
    }
    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }
    public String getHost() {
        return host;
    }
    public void setHost(String host) {
        this.host= host;
    }
}
