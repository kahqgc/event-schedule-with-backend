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
 * SignupController
 * -----------------
 * Handles all CRUD operations for signups between attendees and events.
 * Endpoints:
 *  - GET /api/signups: Retrieve all signups
 *  - POST /api/signups: Create a new signup (attendee + event)
 *  - PUT /api/signups/{id}: Update an existing signup
 *  - DELETE /api/signups/{id}: Delete a signup by ID
 * This controller joins attendees with their selected events.
 */
@RestController//web controller that sends data
@RequestMapping("/api/signups")
public class SignupController {
    //injects instances of repos so that this controller can access DB
    @Autowired
    SignupRepository signupRepository;
    @Autowired
    AttendeeRepository attendeeRepository;
    @Autowired
    EventInfoRepository eventInfoRepository;

    //-------------GET (READ)----------
    //retrives all signups from DB
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Signup>> getAllSignups(){
        List<Signup> allSignups = signupRepository.findAll();
        //what allSignups looks like
        //        [Signup{id=1, attendee={id=1, name='Alice', email="alice@gmail.com", phone='123-456-7890'}, eventInfo=EventInfo{id=1, title='Opening Ceremony', date='2023-10-01', time='10:00 AM'}},
        return ResponseEntity.ok(allSignups);
    }

    // ---------- POST (CREATE) ----------
    // creates a new event and saves it in the database
    // returns 201 Created with savedSignup object
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Signup> createSignup(@Valid @RequestBody SignupRequestDTO signupData) {

        if (signupData == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Signup data is required");
        }
        // find matching event
        EventInfo eventInfo = eventInfoRepository.findById(signupData.getEventInfoId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid eventInfoId"));

        // extract and validate attendee data
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
    //updates attendee details and event link
    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Signup> updateSignup(@PathVariable Long id, @Valid @RequestBody SignupRequestDTO signupData)  {

        Signup signup = signupRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Signup not found"));

        // update attendee details
        Attendee attendee = signup.getAttendee();
        AttendeeRequestDTO attendeeDTO = signupData.getAttendee();
        if (attendeeDTO == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Attendee data is required");
        }

        attendee.setName(attendeeDTO.getName());
        attendee.setEmail(attendeeDTO.getEmail());
        attendee.setPhone(attendeeDTO.getPhone());
        attendee.setTickets(attendeeDTO.getTickets());
        attendee.setEventTitle(attendeeDTO.getEventTitle());
        attendeeRepository.save(attendee);

        // update event link if provided
        if (signupData.getEventInfoId() != null) {
            EventInfo eventInfo = eventInfoRepository.findById(signupData.getEventInfoId())
                    .orElseThrow(()-> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid eventInfoId"));
            signup.setEventInfo(eventInfo);
        }

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
