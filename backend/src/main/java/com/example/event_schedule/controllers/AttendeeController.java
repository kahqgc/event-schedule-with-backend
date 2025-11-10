package com.example.event_schedule.controllers;

import com.example.event_schedule.DTOs.AttendeeRequestDTO;
import com.example.event_schedule.models.*;
import com.example.event_schedule.repositories.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
/**
 * Manages CRUD operations for attendees (users registering for events).
 * typically called by signUp controller when a user signs up for an event.
 * each Attendee record can later be linked to an EventInfo through a Signup entity.
 */

@RestController //web controller that sends data
@RequestMapping("/api/attendees")

public class AttendeeController {

    @Autowired
    private AttendeeRepository attendeeRepository;

    //--------------GET (READ)------------
    // retrieves all attendees from DB
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Attendee>> getAllAttendees() {
        List<Attendee> allAttendees = attendeeRepository.findAll();
        return ResponseEntity.ok(allAttendees); // 200 ok with attendee list
    }

    //--------------GET by ID (READ)------------
    // retrieves a single attendee by ID from DB
    @GetMapping(value="/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Attendee> getAttendeeById(@PathVariable Long id) {
        Attendee attendee = attendeeRepository.findById(id)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "Attendee not found"));//404 not found
        return ResponseEntity.ok(attendee);//200 ok
    }

    // -------------POST (CREATE)--------------
    // create new attendee record in DB
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Attendee> createAttendee(@Valid @RequestBody AttendeeRequestDTO attendeeDTO) {

        //Convert DTO to Attendee entity
        Attendee newAttendee = new Attendee();
        newAttendee.setName(attendeeDTO.getName());
        newAttendee.setEmail(attendeeDTO.getEmail());
        newAttendee.setPhone(attendeeDTO.getPhone());
        newAttendee.setTickets(attendeeDTO.getTickets());
        newAttendee.setEventTitle(attendeeDTO.getEventTitle());
        // Save attendee to database
        Attendee savedAttendee = attendeeRepository.save(newAttendee);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedAttendee);//201 created
    }
    //---------------- PUT (UPDATE)-----------------
    // updates an existing attendee's details
    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Attendee> updateAttendee(@PathVariable Long id, @Valid @RequestBody AttendeeRequestDTO attendeeDTO)  {
        //find existing attendee by ID
        Attendee existingAttendee = attendeeRepository.findById(id)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "Attendee not found"));//throw 404 if not found

            //apply updates from DTO
            existingAttendee.setName(attendeeDTO.getName());
            existingAttendee.setEmail(attendeeDTO.getEmail());
            existingAttendee.setPhone(attendeeDTO.getPhone());
            existingAttendee.setTickets(attendeeDTO.getTickets());
            existingAttendee.setEventTitle(attendeeDTO.getEventTitle());

            Attendee updatedAttendee = attendeeRepository.save(existingAttendee);// save updated attendee to DB
            return ResponseEntity.ok(updatedAttendee);//200 ok
        }

    // DELETE  (DELETE) - remove an attendee by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAttendee(@PathVariable Long id) {
        Attendee attendee = attendeeRepository.findById(id)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "not found"));//404 not found
        attendeeRepository.delete(attendee);
        return ResponseEntity.noContent().build();//204 no content
    }
}