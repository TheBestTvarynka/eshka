package com.eshka.repository;

import com.eshka.entity.Queue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QueueRepository extends JpaRepository<Queue, Long> {
    List<Queue> findAllByClosingDateIsNullAndSubject_Id(long subjectId);

    List<Queue> findAllByClosingDateIsNotNullAndSubject_Id(long subjectId);

    List<Queue> findAllBySubject_Id(long subjectId);
}
