package com.example.event_schedule.DTOs;

import jakarta.validation.constraints.NotNull;

public class SignupRequestDTO {
    @NotNull(message="User ID is required")
    private Long userId;

    @NotNull(message="Event Info ID is required")
    private Long eventInfoId;

    public SignupRequestDTO() {
    }
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getEventInfoId() {
        return eventInfoId;
    }

    public void setEventInfoId(Long eventInfoId) {
        this.eventInfoId = eventInfoId;
    }
}
