package com.eshka.entity;

import lombok.Data;
import java.utils.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Queue {
    private long id;
    private String title;
    private String description;
    private Data creation_date;
    private Data closing_date;
    private Data start_date;
    private Data end_date;
    private long maker_id;
    private long subject_id;
}