package com.eshka.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QueueRequest {
    private String title;
    private String description;
    private LocalDateTime creationDate;
    private LocalDateTime closingDate;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private long makerId;
    private long subjectId;
}
