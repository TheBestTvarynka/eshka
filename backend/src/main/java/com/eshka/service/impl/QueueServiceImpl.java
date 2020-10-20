package com.eshka.service.impl;

import com.eshka.entity.Queue;
import com.eshka.repository.QueueRepository;
import com.eshka.service.QueueService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class QueueServiceImpl implements QueueService {
    private final QueueRepository queueRepository;

    @Override
    public Queue findById(long id) {
        return queueRepository.findById(id).orElseThrow();
    }

    @Override
    public Queue createNewQueue(Queue request) {
        return queueRepository.save(request);
    }
}
