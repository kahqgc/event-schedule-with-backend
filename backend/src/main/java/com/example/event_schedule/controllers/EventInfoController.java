package com.example.event_schedule.controllers;

import com.example.event_schedule.models.EventInfo;
import com.example.event_schedule.repositories.EventInfoRepository;
import com.example.event_schedule.DTOs.EventInfoRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.resource.NoResourceFoundException;
import java.util.List;

@RestController //web controller that sends data
@RequestMapping("/api/events")
public class EventInfoController {

    @Autowired
    private EventInfoRepository eventInfoRepository; //injects an instance of EventInfoRepository so that this controller can access DB

    /*CRUD operations for event data using RESTful endpoints*/
    //GET (READ)
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<EventInfo>> getAllEvents() {
        List<EventInfo> allEvents = eventInfoRepository.findAll(); //list of eventInfo objects defined by EventInfo model called from DB
        // what allEvents looks like
        //        [EventInfo{id=1, stage='Main Stage', title='Opening Ceremony', description='Welcome to the event!', dateTime='9:00 AM', instructor='John Doe'},
        //        EventInfo{id=2, stage='Studio A', title='Dance Workshop', description='Learn choreography.', dateTime='10:00 AM', instructor='Jane Smith'}]
        return ResponseEntity.ok(allEvents); //wraps up data + response code and controls what API sends to frontend/postman (JSON format) 200 ok
    }

    //POST (CREATE)
    @PostMapping(consumes="application/json", produces="application/json")
    public ResponseEntity<?> createEvent(@Valid @RequestBody EventInfoRequestDTO eventData) {
        //@RequestBody takes the JSON from the request body (in postman) and converts it into a Java EventInfo object
        EventInfo event = new EventInfo();
        event.setStage(eventData.getStage());
        event.setTitle(eventData.getTitle());
        event.setDescription(eventData.getDescription());
        event.setDateTime(eventData.getDateTime());
        event.setInstructor(eventData.getInstructor());

        eventInfoRepository.save(event); //save new event to DB
        return ResponseEntity.status(HttpStatus.CREATED).body(event); //201 created
    }

    //PUT (UPDATE)
    @PutMapping(value="/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateEvent(@PathVariable Long id, @Valid @RequestBody EventInfo eventData) throws NoResourceFoundException {
        //@RequestBody takes the JSON from the request body (in postman) and converts it into a Java object
        EventInfo event = eventInfoRepository.findById(id).orElse(null);
        if (event == null){
            String path = "/api/events/" + id;
            throw new NoResourceFoundException(HttpMethod.PUT, path); //throw 404 if not found
        } else {
            //update existing event with new data
            event.setStage(eventData.getStage());
            event.setTitle(eventData.getTitle());
            event.setDescription(eventData.getDescription());
            event.setDateTime(eventData.getDateTime());
            event.setInstructor(eventData.getInstructor());

            eventInfoRepository.save(event);//save updated event to DB
            return ResponseEntity.ok(event); //200 ok
        }
    }

    //DELETE (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id) throws NoResourceFoundException {
        EventInfo event = eventInfoRepository.findById(id).orElse(null);
        if (event == null){
            String path = "/api/events/" + id;
            throw new NoResourceFoundException(HttpMethod.DELETE, path); //404 not found
        } else {
        eventInfoRepository.deleteById(id);//deletes record from DB
        return ResponseEntity.noContent().build();//204 no content
        }
    }
}

//response entity: method that returns an HTTP response
