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
 * Provides CRUD endpoints for managing all event session data (stage, time, host, etc.).
 * This serves as the foundation for attendee signups and schedule displays.
 */

@RestController //web controller that sends data
@RequestMapping("/api/events")
public class EventInfoController {

    @Autowired
    private EventInfoRepository eventInfoRepository;

    //GET (READ)
    //retrieves all events from DB
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<EventInfo>> getAllEvents() {
        List<EventInfo> allEvents = eventInfoRepository.findAllByOrderByDateTimeAsc(); //sorted by date/time ascending order
        return ResponseEntity.ok(allEvents);
    }

    //POST (CREATE)
    //creates a new event and saves it to DB
    @PostMapping(consumes=MediaType.APPLICATION_JSON_VALUE, produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<EventInfo> createEvent(@Valid @RequestBody EventInfoRequestDTO eventInfoDTO) {
        if (eventInfoDTO == null) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Event data is required");
        }

        EventInfo event = new EventInfo();
        event.setStage(eventInfoDTO.getStage());
        event.setTitle(eventInfoDTO.getTitle());
        event.setDescription(eventInfoDTO.getDescription());
        event.setDateTime(eventInfoDTO.getDateTime());
        event.setHost(eventInfoDTO.getHost());

        EventInfo savedEvent = eventInfoRepository.save(event);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEvent); //201 created
    }

    //PUT (UPDATE)
    // updates an existing event by ID
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
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id)  {
        EventInfo event = eventInfoRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));
        eventInfoRepository.delete(event);//deletes record from DB
        return ResponseEntity.noContent().build();//204 no content
        }
    }

//response entity: method that returns an HTTP response
