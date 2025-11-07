package com.example.event_schedule.controllers;

import com.example.event_schedule.models.EventInfo;
import com.example.event_schedule.repositories.EventInfoRepository;
import com.example.event_schedule.DTOs.EventInfoRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.print.attribute.standard.Media;
import java.util.List;

/**
 * EventInfoController
 * -------------------
 * Handles all CRUD operations for event data.
 * Endpoints:
 *  - GET /api/events: Retrieve all events
 *  - POST/api/events: Create a new event
 *  - PUT /api/events/{id}: Update an existing event
 *  - DELETE /api/events/{id}: Delete an event by ID
 */
@RestController //web controller that sends data
@RequestMapping("/api/events")
public class EventInfoController {

    @Autowired
    private EventInfoRepository eventInfoRepository; //injects an instance of EventInfoRepository so that this controller can access DB

    //GET (READ)
    //retrieves all events from DB
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<EventInfo>> getAllEvents() {
        List<EventInfo> allEvents = eventInfoRepository.findAllByOrderByDateTimeAsc();
        // what allEvents looks like
        //        [EventInfo{id=1, stage='Main Stage', title='Opening Ceremony', description='Welcome to the event!', dateTime='9:00 AM', instructor='John Doe'},
        //        EventInfo{id=2, stage='Studio A', title='Dance Workshop', description='Learn choreography.', dateTime='10:00 AM', instructor='Jane Smith'}]
        return ResponseEntity.ok(allEvents);
    }

    //POST (CREATE)
    //creates a new event and saves it to DB
    // returns 201 created with saved EventInfo object
    @PostMapping(consumes=MediaType.APPLICATION_JSON_VALUE, produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<EventInfo> createEvent(@Valid @RequestBody EventInfoRequestDTO eventData) {
        if (eventData == null) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Event data is required");
        }
        EventInfo event = new EventInfo();
        event.setStage(eventData.getStage());
        event.setTitle(eventData.getTitle());
        event.setDescription(eventData.getDescription());
        event.setDateTime(eventData.getDateTime());
        event.setHost(eventData.getHost());

        EventInfo savedEvent = eventInfoRepository.save(event);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEvent); //201 created
    }

    //PUT (UPDATE)
    // updates an existing event by ID
    // returns 200 ok with updated EventInfo object
    // throws 404 if event is not found
    @PutMapping(value="/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<EventInfo> updateEvent(@PathVariable Long id, @Valid @RequestBody EventInfo eventData)  {
        EventInfo event = eventInfoRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found")); //throw 404 if not found

        if (eventData == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Event data is required");
        }
        //update existing event with new data
        event.setStage(eventData.getStage());
        event.setTitle(eventData.getTitle());
        event.setDescription(eventData.getDescription());
        event.setDateTime(eventData.getDateTime());
        event.setHost(eventData.getHost());

        EventInfo updatedEvent = eventInfoRepository.save(event);//save updated event to DB
        return ResponseEntity.ok(updatedEvent); //200 ok
    }
    //DELETE (DELETE)
    // deletes an event by ID
    // returns 204 no content
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id)  {
        EventInfo event = eventInfoRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));
        eventInfoRepository.delete(event);//deletes record from DB
        return ResponseEntity.noContent().build();//204 no content
        }
    }

//response entity: method that returns an HTTP response
