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

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:5173")
public class EventInfoController {

    @Autowired
    private EventInfoRepository eventInfoRepository; //injects an instance of EventInfoRepository so that this controller can access DB

    /*CRUD operations for event data using RESTful endpoints*/
    //GET (READ)
    @GetMapping(value="", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<EventInfo>> getAllEvents() {
        List<EventInfo> allEvents = eventInfoRepository.findAll(); //list of eventInfo objects defined by EventInfo model called from DB
        // what allEvents looks like
        //        [EventInfo{id=1, stage='Main Stage', title='Opening Ceremony', description='Welcome to the event!', dateTime='9:00 AM', instructor='John Doe'},
        //        EventInfo{id=2, stage='Studio A', title='Dance Workshop', description='Learn choreography.', dateTime='10:00 AM', instructor='Jane Smith'}]
        return new ResponseEntity<>(allEvents, HttpStatus.OK); //wraps up data + response code and controls what API sends to frontend/postman (JSON format) 200 ok
    }

    //POST (CREATE)
    @PostMapping(value="/add", consumes="application/json", produces="application/json")
    public ResponseEntity<?> addEvent(@Valid @RequestBody EventInfoRequestDTO eventData) {
        //@RequestBody takes the JSON from the request body (in postman) and converts it into a Java EventInfo object
        EventInfo event = new EventInfo();
        event.setStage(eventData.getStage());
        event.setTitle(eventData.getTitle());
        event.setDescription(eventData.getDescription());
        event.setDateTime(eventData.getDateTime());
        event.setInstructor(eventData.getInstructor());

        eventInfoRepository.save(event); //save new event to DB
        return new ResponseEntity<>(event, HttpStatus.CREATED); //201 created
    }

    //PUT (UPDATE)
    @PutMapping(value="/update/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<EventInfo> updateEvent(@PathVariable Long id, @Valid @RequestBody EventInfo eventData) throws NoResourceFoundException {
        EventInfo event = eventInfoRepository.findById(id).orElse(null);
        if (event == null){
            String path = "/api/events/update/" + id;
            throw new NoResourceFoundException(HttpMethod.PUT, path); //throw 404 if not found
        } else {
            //update existing event with new data
            event.setStage(eventData.getStage());
            event.setTitle(eventData.getTitle());
            event.setDescription(eventData.getDescription());
            event.setDateTime(eventData.getDateTime());
            event.setInstructor(eventData.getInstructor());

            eventInfoRepository.save(event);//save updated event to DB
            return new ResponseEntity<>(event, HttpStatus.OK); //200 ok
        }
    }

    //DELETE (DELETE)
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<EventInfo> deleteEvent(@PathVariable Long id) throws NoResourceFoundException {
        EventInfo event = eventInfoRepository.findById(id).orElseThrow(null);
        if (event == null){
            String path = "/api/events/delete/" + id;
            throw new NoResourceFoundException(HttpMethod.DELETE, path);
        } else {
        eventInfoRepository.deleteById(id);//deletes record from DB
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);//204 no content
        }
    }
}
