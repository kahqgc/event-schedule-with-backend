package com.example.event_schedule.DTOs;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
/**
 * SignupRequestDTO
 * links an attendee to a specific event using their IDs and attendee's information.
 */
public class SignupRequestDTO {

    @NotNull(message="Event Info ID is required")
    private Long eventInfoId;

    @Valid
    private AttendeeRequestDTO attendee; // nested attendee information

    public SignupRequestDTO() {
    }

    public Long getEventInfoId() {
        return eventInfoId;
    }

    public void setEventInfoId(Long eventInfoId) {
        this.eventInfoId = eventInfoId;
    }

    public AttendeeRequestDTO getAttendee(){
        return attendee;
    }
    public void setAttendee(AttendeeRequestDTO attendee){
        this.attendee = attendee;
    }
}
