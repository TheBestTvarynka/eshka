package com.eshka.service;

import com.eshka.entity.QueueDetails;

public interface QueueDetailsService {
    QueueDetails createNewQueueDetails(QueueDetails request);

    QueueDetails changePassedStatus(QueueDetails request);

    void deleteQueueDetailsById(long userId, long queueId);
}
