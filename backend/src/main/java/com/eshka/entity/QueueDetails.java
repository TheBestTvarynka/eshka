package com.eshka.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity(name = "QueueDetails")
@Table(name = "queue_details")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class QueueDetails {
    @EmbeddedId
    private QueueDetailsId id;
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("queueId")
    @EqualsAndHashCode.Include
    private Queue queue;
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @EqualsAndHashCode.Include
    private User user;
    @Column(name = "turned_at", columnDefinition = "TIMESTAMP")
    private LocalDateTime turnedAt;
    @Column(name = "sequence_number")
    private int sequenceNumber;
    @Column(name = "passed")
    private boolean passed;

    public QueueDetails(Queue queue, User user) {
        this.queue = queue;
        this.user = user;
        id = new QueueDetailsId(queue.getId(), user.getUserId());
    }
}