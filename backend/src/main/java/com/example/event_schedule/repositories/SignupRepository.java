package com.example.event_schedule.repositories;

import com.example.event_schedule.models.Signup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SignupRepository extends JpaRepository<Signup, Long> {
}
