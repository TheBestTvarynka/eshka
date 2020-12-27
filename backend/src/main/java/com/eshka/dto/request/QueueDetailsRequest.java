package com.eshka.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class QueueDetailsRequest {
    private long queueId;
    private long userId;
    private boolean passed;
    private int sequenceNumber;
}
