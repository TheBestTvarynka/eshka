package com.eshka.service;

import com.eshka.entity.Queue;

import java.util.List;

public interface QueueService {
    Queue findById(long id);

    Queue createNewQueue(Queue request);

    Queue editQueue(Queue request);

    void deleteById(long id);

    List<Queue> findByOpenedAndSubjectId(boolean opened, long subjectId);

    List<Queue> findBySubjectId(long subjectId);
}
