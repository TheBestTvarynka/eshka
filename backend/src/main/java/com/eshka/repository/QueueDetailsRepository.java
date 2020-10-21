package com.eshka.repository;

import com.eshka.entity.QueueDetails;
import com.eshka.entity.QueueDetailsId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QueueDetailsRepository extends JpaRepository<QueueDetails, QueueDetailsId> {
    List<QueueDetails> findAllByQueue_Id(long queueId);
}
