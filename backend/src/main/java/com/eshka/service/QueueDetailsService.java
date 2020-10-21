package com.eshka.service;

import com.eshka.entity.QueueDetails;

import java.util.List;

public interface QueueDetailsService {
    QueueDetails createNewQueueDetails(QueueDetails request);

    QueueDetails changePassedStatus(QueueDetails request);

    void deleteQueueDetailsById(long userId, long queueId);

    List<QueueDetails> getAllByQueueId(long queueId);
}
