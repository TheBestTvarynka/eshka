package com.eshka.entity;

import lombok.Data;
import java.sql.Timestamp;

@Data
public class Queue {
    private long id;
    private String title;
    private String description;
    private Timestamp creation_date;
    private Timestamp closing_date;
    private Timestamp start_date;
    private Timestamp end_date;
    private long maker_id;
    private long subject_id;
}

@Data
public class Queue_details {
    private long id;
    private long queue_id;
    private Timestamp turned_at;
    private long user_id;
}