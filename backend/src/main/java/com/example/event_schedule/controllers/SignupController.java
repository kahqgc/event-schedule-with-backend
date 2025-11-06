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

    //CRUD ops
    //GET (READ)
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Signup>> getAllSignups(){
        List<Signup> allSignups = signupRepository.findAll();// list of signup objects defined by Signup model called from DB and maps them to a List<Signup>
        //what allSignups looks like
        //        [Signup{id=1, attendee={id=1, name='Alice', email="alice@gmail.com", phone='123-456-7890'}, eventInfo=EventInfo{id=1, title='Opening Ceremony', date='2023-10-01', time='10:00 AM'}},
        return ResponseEntity.ok(allSignups);// wraps up data + response code and controls what API sends to frontend/postman (JSON format) 200 ok
    }

    // ---------- POST (CREATE) ----------
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Signup> createSignup(@Valid @RequestBody SignupRequestDTO signupData) {

        // find matching event
        EventInfo eventInfo = eventInfoRepository.findById(signupData.getEventInfoId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid eventInfoId"));

        // create attendee from DTO
        AttendeeRequestDTO attendeeDTO = signupData.getAttendee();
        if (attendeeDTO == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "attendee data is required");
        }

        Attendee attendee = new Attendee();
        attendee.setName(attendeeDTO.getName());
        attendee.setEmail(attendeeDTO.getEmail());
        attendee.setPhone(attendeeDTO.getPhone());
        attendee.setTickets(attendeeDTO.getTickets());
        attendee.setEventTitle(attendeeDTO.getEventTitle());
        attendeeRepository.save(attendee);

        // create signup record linking attendee + event
        Signup signup = new Signup(attendee, eventInfo);
        Signup savedSignup = signupRepository.save(signup);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedSignup); // 201 Created
    }

    // ---------- PUT (UPDATE) ----------
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
            eventInfoRepository.findById(signupData.getEventInfoId()).ifPresent(signup::setEventInfo);
        }

        signupRepository.save(signup);
        return ResponseEntity.ok(signup); // 200 OK
    }
    // ---------- DELETE (DELETE) ----------
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSignup(@PathVariable Long id) {
        Signup signup = signupRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Signup not found"));
        signupRepository.delete(signup);
        return ResponseEntity.noContent().build();
        }
    }
