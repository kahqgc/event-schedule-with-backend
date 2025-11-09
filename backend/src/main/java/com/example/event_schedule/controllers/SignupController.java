package com.example.event_schedule.controllers;

import com.example.event_schedule.DTOs.SignupRequestDTO;
import com.example.event_schedule.DTOs.AttendeeRequestDTO;
import com.example.event_schedule.models.*;
import com.example.event_schedule.repositories.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

/**
 * Manages the relationships between Attendees and EventInfo entities.
 * Each signup links one attendee to one event.
 * Supports CRUD operations and ensures relationship between both tables.
 */

@RestController//web controller that sends data
@RequestMapping("/api/signups")
public class SignupController {

    @Autowired
    SignupRepository signupRepository;
    @Autowired
    AttendeeRepository attendeeRepository;
    @Autowired
    EventInfoRepository eventInfoRepository;

    //-------------GET (READ)----------
    //retrieves all signups from DB
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Signup>> getAllSignups(){
        List<Signup> allSignups = signupRepository.findAll();
        return ResponseEntity.ok(allSignups); //200 OK
    }

    // ---------- POST (CREATE) ----------
    // creates a new event and saves it in the database
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Signup> createSignup(@Valid @RequestBody SignupRequestDTO signupData) {

        if (signupData == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Signup data is required");
        }
        // find matching event to link
        EventInfo eventInfo = eventInfoRepository.findById(signupData.getEventInfoId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid eventInfoId"));

        // extract attendee details from nested DTO
        AttendeeRequestDTO attendeeDTO = signupData.getAttendee();
        if (attendeeDTO == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "attendee data is required");
        }

        //create attendee record
        Attendee attendee = new Attendee();
        attendee.setName(attendeeDTO.getName());
        attendee.setEmail(attendeeDTO.getEmail());
        attendee.setPhone(attendeeDTO.getPhone());
        attendee.setTickets(attendeeDTO.getTickets());
        attendee.setEventTitle(attendeeDTO.getEventTitle());
        Attendee savedAttendee = attendeeRepository.save(attendee);

        // create signup record linking attendee and event
        Signup signup = new Signup(savedAttendee, eventInfo);
        Signup savedSignup = signupRepository.save(signup);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedSignup); // 201 Created
    }

    // ---------- PUT (UPDATE) ----------
    // update an existing signup by ID
    //can modify attendee details and event link
    // Note: eventInfo cannot be changed through signup updates.
    // To move an attendee to a different event, a new signup must be created.
    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Signup> updateSignup(@PathVariable Long id, @Valid @RequestBody SignupRequestDTO signupData)  {

        Signup signup = signupRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Signup not found"));

        // update attendee details "get the person currently signed up for this event"
        Attendee attendee = signup.getAttendee(); //fetch existing attendee object
        AttendeeRequestDTO attendeeDTO = signupData.getAttendee(); // extracts new information the user submitted
        if (attendeeDTO == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Attendee data is required");
        }

        attendee.setName(attendeeDTO.getName());
        attendee.setEmail(attendeeDTO.getEmail());
        attendee.setPhone(attendeeDTO.getPhone());
        attendee.setTickets(attendeeDTO.getTickets());
        attendee.setEventTitle(attendeeDTO.getEventTitle());
        attendeeRepository.save(attendee);

        Signup updatedSignup = signupRepository.save(signup);
        return ResponseEntity.ok(updatedSignup); // 200 OK
    }
    // ---------- DELETE (DELETE) ----------
    // deletes a signup by ID
    // returns 204 No Content
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSignup(@PathVariable Long id) {
        Signup signup = signupRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Signup not found"));
        signupRepository.delete(signup);
        return ResponseEntity.noContent().build();
        }
    }
