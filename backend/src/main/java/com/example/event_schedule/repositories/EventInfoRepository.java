package com.example.event_schedule.repositories;

import com.example.event_schedule.models.EventInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventInfoRepository extends JpaRepository<EventInfo, Long> {
}
