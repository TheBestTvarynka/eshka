package com.eshka.repository;

import com.eshka.entity.QueueDetails;
import com.eshka.entity.QueueDetailsId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QueueDetailsRepository extends JpaRepository<QueueDetails, QueueDetailsId> {
}
