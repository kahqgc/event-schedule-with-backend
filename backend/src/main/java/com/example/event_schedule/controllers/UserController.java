package com.example.event_schedule.controllers;

import com.example.event_schedule.DTOs.UserRequestDTO;
import com.example.event_schedule.models.User;
import com.example.event_schedule.models.EventInfo;
import com.example.event_schedule.models.Signup;
import com.example.event_schedule.repositories.EventInfoRepository;
import com.example.event_schedule.repositories.SignupRepository;
import jakarta.validation.Valid;
import com.example.event_schedule.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import org.springframework.web.servlet.resource.NoResourceFoundException;
import java.util.List;

@RestController //web controller that sends data
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    /*injects instances of repos so that this controller can access DB*/
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EventInfoRepository eventInfoRepository;
    @Autowired
    private SignupRepository signupRepository;

    // CRUD operations for user data using RESTful endpoints
    //GET (READ)
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllUsers() {
        List<User> allUsers = userRepository.findAll(); //list of user objects defined by User model called from DB and maps them to a List<User>
        // what allUsers looks like
        //        [User{id=1, name='Alice', email="alice@gmail.com", phone='123-456-7890', tickets=2, sessionTitle='Opening Ceremony'},
        //        User{id=2, name='Bob', email="bob@gmail.com", phone='987-654-3210', tickets=1, sessionTitle='Dance Workshop'}]
        return new ResponseEntity<>(allUsers, HttpStatus.OK);// wraps up data + response code and controls what API sends to frontend/postman (JSON format) 200 ok
    }

    // POST (CREATE)
    @PostMapping(value = "/add", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addUser(@Valid @RequestBody UserRequestDTO userDTO) {
        //@RequestBody takes the JSON from the request body (in postman) and converts it into a Java User object
        //Convert DTO to User entity
        User user = new User();
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setPhone(userDTO.getPhone());
        user.setTickets(userDTO.getTickets());
        user.setSessionTitle(userDTO.getSessionTitle());
        // Save user to database
        User savedUser = userRepository.save(user);
        //after saving,link them to the selected event if it exists
        EventInfo eventInfo = eventInfoRepository.findByTitle(savedUser.getSessionTitle());

        if (eventInfo != null) {
            Signup signup = new Signup(savedUser, eventInfo);
            signupRepository.save(signup);// saves record to join table
        }
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);//201 created
    }
    // PUT (UPDATE)
    @PutMapping(value = "/update/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateUser(@PathVariable Long id, @Valid @RequestBody UserRequestDTO userDTO)  throws NoResourceFoundException {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            String path = "/api/users/update/" + id;
            throw new NoResourceFoundException(HttpMethod.PUT, path);//throw 404 if not found
        } else {
            //update existing event with data
            user.setName(userDTO.getName());
            user.setEmail(userDTO.getEmail());
            user.setPhone(userDTO.getPhone());
            user.setTickets(userDTO.getTickets());
            user.setSessionTitle(userDTO.getSessionTitle());
            userRepository.save(user);// save updated user to DB
            return new ResponseEntity<>(user, HttpStatus.OK);//200 ok
        }
    }

    // DELETE  (DELETE)
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) throws NoResourceFoundException {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            String path = "/api/users/delete/" + id;
            throw new NoResourceFoundException(HttpMethod.DELETE, path);//404 not found
        }
        userRepository.deleteById(id);// deletes record from DB
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);//204 no content
    }
}