package com.example.event_schedule.controllers;

import com.example.event_schedule.models.EventInfo;
import com.example.event_schedule.repositories.EventInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.List;

@RestController //web controller that sends data
@RequestMapping("/api/events")
//@CrossOrigin(origins = "http://localhost:5173")
public class EventInfoController {

    @Autowired
    private EventInfoRepository eventInfoRepository; //create instance of repository and provides connection to DB

    @GetMapping(value="", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllEvents() {
        List<EventInfo> allEvents = eventInfoRepository.findAll(); //list of eventInfo objects defined by model called from DB
        System.out.println(allEvents);
        // what allEvents looks like
        //        [EventInfo{id=1, stage='Main Stage', title='Opening Ceremony', description='Welcome to the event!', dateTime='9:00 AM', instructor='John Doe'},
        //        EventInfo{id=2, stage='Studio A', title='Dance Workshop', description='Learn choreography.', dateTime='10:00 AM', instructor='Jane Smith'}]
        return new ResponseEntity<>(allEvents, HttpStatus.OK); //wraps up data + response code and controls what API sends to frontend/postman (JSON format) 200 ok
    }

    @PostMapping(value="/add", consumes=MediaType.APPLICATION_JSON_VALUE, produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addEvent(@Valid @RequestBody EventInfo eventData) {
        eventInfoRepository.save(eventData);
        return new ResponseEntity<>(eventData, HttpStatus.CREATED); //201 created
    }

    @PutMapping(value="/update/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateEvent(@PathVariable Long id, @Valid @RequestBody EventInfo eventData) throws NoResourceFoundException {
        //@RequestBody takes the JSON from the request body (in postman) and converts it into a Java object
        EventInfo event = eventInfoRepository.findById(id).orElse(null);
        if (event == null){
            String path = "/api/events/update/" + id;
            throw new NoResourceFoundException(HttpMethod.PUT, path); //throw 404 if not found
        } else {
            event.setStage(eventData.getStage());
            event.setTitle(eventData.getTitle());
            event.setDescription(eventData.getDescription());
            event.setDateTime(eventData.getDateTime());
            event.setInstructor(eventData.getInstructor());

            eventInfoRepository.save(event);
            return new ResponseEntity<>(event, HttpStatus.OK); //200 ok
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id) throws NoResourceFoundException {
        EventInfo event = eventInfoRepository.findById(id).orElse(null);
        if (event == null){
            String path = "/api/events/delete/" + id;
            throw new NoResourceFoundException(HttpMethod.DELETE, path); //404 not found
        } else {
        eventInfoRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);//204 no content
        }
    }
}

//response entity: method that returns an HTTP response
