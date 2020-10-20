package com.eshka.service;

import com.eshka.entity.Queue;
import com.eshka.repository.QueueRepository;
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
}
