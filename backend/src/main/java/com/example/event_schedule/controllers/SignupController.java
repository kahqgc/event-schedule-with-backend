package com.example.event_schedule.controllers;

import com.example.event_schedule.DTOs.SignupRequestDTO;
import com.example.event_schedule.models.EventInfo;
import com.example.event_schedule.models.Signup;
import com.example.event_schedule.models.User;
import com.example.event_schedule.repositories.EventInfoRepository;
import com.example.event_schedule.repositories.SignupRepository;
import com.example.event_schedule.repositories.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.List;

@RestController
@RequestMapping("/api/signups")
public class SignupController {
    @Autowired SignupRepository signupRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    EventInfoRepository eventInfoRepository;

    @GetMapping
    public ResponseEntity<?> getAllSignups(){
        List<Signup> allSignups = signupRepository.findAll();
        return ResponseEntity.ok(allSignups);
    }

    @PostMapping(value="/add", consumes= MediaType.APPLICATION_JSON_VALUE, produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addSignup(@Valid @RequestBody SignupRequestDTO signupData){
        User user = userRepository.findById(signupData.getUserId()).orElse(null);
        EventInfo eventInfo = eventInfoRepository.findById(signupData.getEventInfoId()).orElse(null);
        if (user == null || eventInfo == null) {
            return new ResponseEntity<>("User or EventInfo not found", HttpStatus.BAD_REQUEST);
        }
        Signup signup = new Signup(user,eventInfo);
        signupRepository.save(signup);
        return new ResponseEntity<>(signup, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSignup(@PathVariable Long id) throws NoResourceFoundException {
        Signup signup = signupRepository.findById(id).orElse(null);
        if (signup == null){
            String path = "/api/signups/delete/" + id;
            throw new NoResourceFoundException(HttpMethod.DELETE, path);
        } else {
            signupRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
}
