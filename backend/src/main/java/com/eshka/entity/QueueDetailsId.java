package com.eshka.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class QueueDetailsId implements Serializable {
    @Column(name = "queue_id")
    private Long queueId;

    @Column(name = "user_id")
    private Long userId;
}
