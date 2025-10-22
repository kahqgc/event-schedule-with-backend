package com.example.event_schedule.DTOs;

public class SignupRequestDTO {
    private Long userId;
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
