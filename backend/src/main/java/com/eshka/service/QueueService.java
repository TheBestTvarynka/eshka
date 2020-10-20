package com.eshka.service;

import com.eshka.entity.Queue;

public interface QueueService {
    Queue findById(long id);

    Queue createNewQueue(Queue request);

    Queue editQueue(Queue request);
}
