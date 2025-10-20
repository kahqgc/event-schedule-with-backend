package com.example.event_schedule.controllers;

import com.example.event_schedule.DTOs.UserRequestDTO;
import com.example.event_schedule.models.EventInfo;
import com.example.event_schedule.models.Signup;
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
import com.example.event_schedule.models.User;
import org.springframework.web.servlet.resource.NoResourceFoundException;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EventInfoRepository eventInfoRepository;
    @Autowired
    private SignupRepository signupRepository;

    //GET
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllUsers() {
        List<User> allUsers = userRepository.findAll();
        return new ResponseEntity<>(allUsers, HttpStatus.OK);
    }

    // POST
    @PostMapping(value = "/add", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addUser(@Valid @RequestBody UserRequestDTO userDTO) {
        User user = new User();
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setPhone(userDTO.getPhone());
        user.setTickets(userDTO.getTickets());
        user.setSessionTitle(userDTO.getSessionTitle());
        User savedUser = userRepository.save(user);
        EventInfo eventInfo = eventInfoRepository.findByTitle(savedUser.getSessionTitle());

        if (eventInfo != null) {
            Signup signup = new Signup(savedUser, eventInfo);
            signupRepository.save(signup);
            } else {
            System.out.println("Event with title " + savedUser.getSessionTitle() + " not found.");
        }
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    // PUT
    @PutMapping(value = "/update/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateUser(@PathVariable Long id, @Valid @RequestBody UserRequestDTO userDTO)  throws NoResourceFoundException {
        User user = userRepository.findById(id).orElseThrow();
        if (user == null) {
            String path = "/api/users/update/" + id;
            throw new NoResourceFoundException(HttpMethod.PUT, path);
        }
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setPhone(userDTO.getPhone());
        user.setTickets(userDTO.getTickets());
        user.setSessionTitle(userDTO.getSessionTitle());
        userRepository.save(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    // DELETE
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) throws NoResourceFoundException {
        User user = userRepository.findById(id).orElseThrow();
        if (user == null) {
            String path = "/api/users/delete/" + id;
            throw new NoResourceFoundException(HttpMethod.DELETE, path);
        }
        userRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}