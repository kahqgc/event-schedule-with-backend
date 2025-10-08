package com.example.event_schedule.controllers;

import com.example.event_schedule.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.event_schedule.models.User;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    //GET
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // POST
    @PostMapping
    public User addUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    // PUT
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        User user = userRepository.findById(id).orElseThrow();
        user.setName(userDetails.getName());
        user.setEmail(userDetails.getEmail());
        user.setPhone(userDetails.getPhone());
        user.setTickets(userDetails.getTickets());
        user.setSessionTitle(userDetails.getSessionTitle());
        return userRepository.save(user);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }
}