package com.eshka.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Queue {
    private long id;
    private String title;
    private String description;
    private LocalDateTime creationDate;
    private LocalDateTime closingDate;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private long makerId;
    private long subjectId;
}