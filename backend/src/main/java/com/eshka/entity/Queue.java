package com.eshka.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "Queue")
@Table(name = "queue", uniqueConstraints =
@UniqueConstraint(columnNames = {"subject_id", "title"}))
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Queue {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "title", nullable = false)
    @EqualsAndHashCode.Include
    private String title;
    @Column(name = "description")
    private String description;
    @Column(name = "creation_date", columnDefinition = "TIMESTAMP")
    private LocalDateTime creationDate;
    @Column(name = "closing_date", columnDefinition = "TIMESTAMP")
    private LocalDateTime closingDate;
    @Column(name = "start_date", columnDefinition = "TIMESTAMP")
    private LocalDateTime startDate;
    @Column(name = "end_date", columnDefinition = "TIMESTAMP")
    private LocalDateTime endDate;
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "maker_id")
    private User maker;
    @ManyToOne(fetch = FetchType.LAZY)
    private Subject subject;
    @OneToMany(
            mappedBy = "queue",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<QueueDetails> users = new ArrayList<>();

    public Queue(String title) {
        this.title = title;
    }

    public void addUser(User user) {
        QueueDetails queueDetails = new QueueDetails(this, user);
        users.add(queueDetails);
        user.getQueues().add(queueDetails);
    }

    public void removeUser(User user) {
        for (Iterator<QueueDetails> iterator = users.iterator();
             iterator.hasNext(); ) {
            QueueDetails queueDetails = iterator.next();

            if (queueDetails.getQueue().equals(this) &&
                    queueDetails.getUser().equals(user)) {
                iterator.remove();
                queueDetails.getUser().getQueues().remove(queueDetails);
                queueDetails.setQueue(null);
                queueDetails.setUser(null);
            }
        }
    }
}
