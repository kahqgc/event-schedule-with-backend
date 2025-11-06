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
 * AttendeeController
 * Handles CRUD operations for Attendees (individual users who register for events).
 * Endpoints:
 *  - GET /api/attendees: Retrieve all attendees
 *  - GET /api/attendees/{id}: Retrieve a single attendee by ID
 *  - POST /api/attendees: Create a new attendee
 *  - PUT  /api/attendees/{id}: Update an attendee's details
 *  - DELETE /api/attendees/{id}: Delete an attendee by ID
 * This controller is primarily used by SignupController,
 */
@RestController //web controller that sends data
@RequestMapping("/api/attendees")

public class AttendeeController {

    @Autowired
    private AttendeeRepository attendeeRepository;
    @Autowired
    private EventInfoRepository eventInfoRepository;
    @Autowired
    private SignupRepository signupRepository;

    //--------------GET (READ)------------
    // retrieves all attendees from DB
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Attendee>> getAllAttendees() {
        List<Attendee> allAttendees = attendeeRepository.findAll();
        // what allAttendees looks like
        //        [Attendee{id=1, name='Alice', email="alice@gmail.com", phone='123-456-7890', tickets=2, eventTitle='Opening Ceremony'},
        //        Attendee{id=2, name='Bob', email="bob@gmail.com", phone='987-654-3210', tickets=1, eventTitle='Dance Workshop'}]
        return ResponseEntity.ok(allAttendees);
    }

    //--------------GET by ID (READ)------------
    // retrieves a single attendee by ID from DB
    @GetMapping(value="/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Attendee> getAttendeeById(@PathVariable Long id) {
        Attendee attendee = attendeeRepository.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "attendee not found"));//404 not found
        return ResponseEntity.ok(attendee);//200 ok
    }

    // -------------POST (CREATE)--------------
    // create new attendee record in DB
    // if event exists with provided eventTitle, also create signup record to link them
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Attendee> createAttendee(@Valid @RequestBody AttendeeRequestDTO attendeeDTO) {
        if (attendeeDTO == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "attendee data is required");//400 bad
        }

        //Convert DTO to Attendee entity
        Attendee attendee = new Attendee();
        attendee.setName(attendeeDTO.getName());
        attendee.setEmail(attendeeDTO.getEmail());
        attendee.setPhone(attendeeDTO.getPhone());
        attendee.setTickets(attendeeDTO.getTickets());
        attendee.setEventTitle(attendeeDTO.getEventTitle());
        // Save attendee to database
        Attendee savedAttendee = attendeeRepository.save(attendee);

        //after saving,link them to the selected event if it exists
        EventInfo eventInfo = eventInfoRepository.findByTitle(savedAttendee.getEventTitle());
        if (eventInfo != null) {
            //if event exists in addition to attendee, create signup record to link them
            Signup signup = new Signup(savedAttendee, eventInfo);
            signupRepository.save(signup);// saves record to join table
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(attendee);//201 created
    }
    //---------------- PUT (UPDATE)-----------------

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Attendee> updateAttendee(@PathVariable Long id, @Valid @RequestBody AttendeeRequestDTO attendeeDTO)  {

        //find existing attendee by ID
        Attendee attendee = attendeeRepository.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "attendee not found"));//throw 404 if not found

            //update existing event with data
            attendee.setName(attendeeDTO.getName());
            attendee.setEmail(attendeeDTO.getEmail());
            attendee.setPhone(attendeeDTO.getPhone());
            attendee.setTickets(attendeeDTO.getTickets());
            attendee.setEventTitle(attendeeDTO.getEventTitle());

            // save changes to DB
            Attendee updatedAttendee = attendeeRepository.save(attendee);// save updated attendee to DB
            return ResponseEntity.ok(attendee);//200 ok
        }

    // DELETE  (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAttendee(@PathVariable Long id) throws ResponseStatusException {
        Attendee attendee = attendeeRepository.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "not found"));//404 not found
        attendeeRepository.delete(attendee);// deletes record from DB
        return ResponseEntity.noContent().build();//204 no content
    }
}