package com.eshka.entity;

import lombok.Data;
import java.utils.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Queue_details {
    private long id;
    private long queue_id;
    private Data turned_at;
    private long user_id;
    private int sequence_number;
    private boolean passed;
}