package com.eshka.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QueueDetails {
    private long id;
    private long queueId;
    private LocalDateTime turnedAt;
    private long userId;
    private int sequenceNumber;
    private boolean passed;
}