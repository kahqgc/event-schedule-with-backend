package com.example.event_schedule.controllers;

import com.example.event_schedule.models.EventInfo;
import com.example.event_schedule.repositories.EventInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:5173")
public class EventInfoController {

    @Autowired
    private EventInfoRepository eventInfoRepository;

    @GetMapping
    public ResponseEntity<?> getAllEvents() {
        List<EventInfo> allEvents = eventInfoRepository.findAll();
        return new ResponseEntity<>(allEvents, HttpStatus.OK);
    }

    @PostMapping(value="/add", consumes="application/json", produces="application/json")
    public ResponseEntity<?> addEvent(@Valid @RequestBody EventInfo eventData) {
        eventInfoRepository.save(eventData);
        return new ResponseEntity<>(eventData, HttpStatus.CREATED);
    }

    @PutMapping(value="/update/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateEvent(@PathVariable Long id, @Valid @RequestBody EventInfo eventData) throws NoResourceFoundException {
        EventInfo event = eventInfoRepository.findById(id).orElseThrow(null);
        if (event == null){
            String path = "/api/events/update/" + id;
            throw new NoResourceFoundException(HttpMethod.PUT, path);
        }
            event.setStage(eventData.getStage());
            event.setTitle(eventData.getTitle());
            event.setDescription(eventData.getDescription());
            event.setDateTime(eventData.getDateTime());
            event.setInstructor(eventData.getInstructor());

            eventInfoRepository.save(event);
            return new ResponseEntity<>(event, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id) throws NoResourceFoundException {
        EventInfo event = eventInfoRepository.findById(id).orElseThrow(null);
        if (event == null){
            String path = "/api/events/delete/" + id;
            throw new NoResourceFoundException(HttpMethod.DELETE, path);
        } else {
        eventInfoRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
}
