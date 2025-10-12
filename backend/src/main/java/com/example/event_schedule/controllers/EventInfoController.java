package com.example.event_schedule.controllers;

import com.example.event_schedule.models.EventInfo;
import com.example.event_schedule.repositories.EventInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:5173")
public class EventInfoController {

    @Autowired
    private EventInfoRepository eventInfoRepository;

    @GetMapping
    public List<EventInfo> getAllEvents() {
        return eventInfoRepository.findAll();
    }

    @PostMapping
    public EventInfo createEvent(@RequestBody EventInfo eventInfo) {
        return eventInfoRepository.save(eventInfo);
    }

    @PutMapping("/{id}")
    public EventInfo updateEvent(@PathVariable Long id, @RequestBody EventInfo eventDetails) {
        EventInfo eventInfo = eventInfoRepository.findById(id).orElseThrow();
        eventInfo.setTitle(eventDetails.getTitle());
        eventInfo.setDescription(eventDetails.getDescription());
        eventInfo.setDateTime(eventDetails.getDateTime());
        return eventInfoRepository.save(eventInfo);
    }

    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable Long id) {
        eventInfoRepository.deleteById(id);
    }

}
