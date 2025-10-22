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

@RestController//web controller that sends data
@RequestMapping("/api/signups")
public class SignupController {
    //injects instances of repos so that this controller can access DB
    @Autowired SignupRepository signupRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    EventInfoRepository eventInfoRepository;

    //CRUD ops
    //GET (READ)
    @GetMapping
    public ResponseEntity<?> getAllSignups(){
        List<Signup> allSignups = signupRepository.findAll();// list of signup objects defined by Signup model called from DB and maps them to a List<Signup>
        //what allSignups looks like
        //        [Signup{id=1, user=User{id=1, name='Alice', email="alice@gmail.com", phone='123-456-7890'}, eventInfo=EventInfo{id=1, title='Opening Ceremony', date='2023-10-01', time='10:00 AM'}},
        return ResponseEntity.ok(allSignups);// wraps up data + response code and controls what API sends to frontend/postman (JSON format) 200 ok
    }

    @PostMapping(value="/add", consumes= MediaType.APPLICATION_JSON_VALUE, produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addSignup(@Valid @RequestBody SignupRequestDTO signupData){
        //@RequestBody takes the JSON from the request body (in postman) and converts it into a Java Signup object
        //Convert DTO to Signup entity
        User user = userRepository.findById(signupData.getUserId()).orElse(null);
        EventInfo eventInfo = eventInfoRepository.findById(signupData.getEventInfoId()).orElse(null);
        if (user == null || eventInfo == null) {
            return new ResponseEntity<>("User or EventInfo not found", HttpStatus.BAD_REQUEST);
        }
        Signup signup = new Signup(user,eventInfo);
        signupRepository.save(signup);//saves record to join table
        return new ResponseEntity<>(signup, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSignup(@PathVariable Long id) throws NoResourceFoundException {
        Signup signup = signupRepository.findById(id).orElse(null);
        if (signup == null){
            String path = "/api/signups/delete/" + id;
            throw new NoResourceFoundException(HttpMethod.DELETE, path);//404 not found
        } else {
            signupRepository.deleteById(id);//deletes record from DB
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);//204 no content
        }
    }
}
