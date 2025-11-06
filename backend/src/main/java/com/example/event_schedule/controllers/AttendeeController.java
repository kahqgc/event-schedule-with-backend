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

@RestController //web controller that sends data
@RequestMapping("/api/attendees")
public class AttendeeController {

    /*injects instances of repos so that this controller can access DB*/
    @Autowired
    private AttendeeRepository attendeeRepository;
    @Autowired
    private EventInfoRepository eventInfoRepository;
    @Autowired
    private SignupRepository signupRepository;

    // CRUD operations for attendee data using RESTful endpoints
    //GET (READ)
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Attendee>> getAllAttendees() {
        List<Attendee> allAttendees = attendeeRepository.findAll(); //list of attendee objects defined by Attendee model called from DB and maps them to a List<Attendee>
        // what allAttendees looks like
        //        [Attendee{id=1, name='Alice', email="alice@gmail.com", phone='123-456-7890', tickets=2, eventTitle='Opening Ceremony'},
        //        Attendee{id=2, name='Bob', email="bob@gmail.com", phone='987-654-3210', tickets=1, eventTitle='Dance Workshop'}]
        return ResponseEntity.ok(allAttendees);// wraps up data + response code and controls what API sends to frontend/postman (JSON format) 200 ok
    }

    // POST (CREATE)
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createAttendee(@Valid @RequestBody AttendeeRequestDTO attendeeDTO) {
        //@RequestBody takes the JSON from the request body (in postman) and converts it into a Java Attendee object
        if (attendeeDTO == null) {
            return ResponseEntity.badRequest().body("Info is required");
        }

        //Convert DTO to Attendee entity
        Attendee attendee = new Attendee();
        attendee.setName(attendeeDTO.getName());
        attendee.setEmail(attendeeDTO.getEmail());
        attendee.setPhone(attendeeDTO.getPhone());
        attendee.setTickets(attendeeDTO.getTickets());
        attendee.setEventTitle(attendeeDTO.getEventTitle());
        // Save attendee to database
        attendeeRepository.save(attendee);
        //after saving,link them to the selected event if it exists
        EventInfo eventInfo = eventInfoRepository.findByTitle(attendee.getEventTitle());

        if (eventInfo != null) {
            //if event exists in addition to attendee, create signup record to link them
            Signup signup = new Signup(attendee, eventInfo);
            signupRepository.save(signup);// saves record to join table
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(attendee);//201 created
    }
    // PUT (UPDATE)
    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Attendee> updateAttendee(@PathVariable Long id, @Valid @RequestBody AttendeeRequestDTO attendeeDTO)  throws ResponseStatusException {
        Attendee attendee = attendeeRepository.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "attendee not found"));//throw 404 if not found
        if (attendeeDTO == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Attendee data is required");//400 bad
        }
            //update existing event with data
            attendee.setName(attendeeDTO.getName());
            attendee.setEmail(attendeeDTO.getEmail());
            attendee.setPhone(attendeeDTO.getPhone());
            attendee.setTickets(attendeeDTO.getTickets());
            attendee.setEventTitle(attendeeDTO.getEventTitle());

            attendeeRepository.save(attendee);// save updated attendee to DB
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