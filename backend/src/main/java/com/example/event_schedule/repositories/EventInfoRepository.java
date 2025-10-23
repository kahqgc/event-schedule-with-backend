package com.example.event_schedule.repositories;

import com.example.event_schedule.models.EventInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface EventInfoRepository extends JpaRepository<EventInfo, Long> {
    EventInfo findByTitle(String title);
}
