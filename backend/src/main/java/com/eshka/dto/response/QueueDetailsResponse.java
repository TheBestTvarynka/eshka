package com.eshka.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QueueDetailsResponse {
    private long queueId;
    private long userId;
    private int sequenceNumber;
    private boolean passed;
    private LocalDateTime turnedAt;
}
