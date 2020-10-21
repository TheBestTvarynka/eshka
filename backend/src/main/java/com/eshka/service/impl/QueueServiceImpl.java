package com.eshka.service.impl;

import com.eshka.entity.Queue;
import com.eshka.exception.QueueNotFoundException;
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
        return queueRepository.findById(id).orElseThrow(
                () -> new QueueNotFoundException("queue not found"));
    }

    @Override
    public Queue createNewQueue(Queue request) {
        return queueRepository.save(request);
    }

    @Override
    public Queue editQueue(Queue request) {
        Queue queue = queueRepository.findById(request.getId()).orElseThrow(
                () -> new QueueNotFoundException("queue not found"));
        queue.setDescription(request.getDescription());
        queue.setTitle(request.getTitle());
        queue.setStartDate(request.getStartDate());
        queue.setEndDate(request.getEndDate());
        return queueRepository.save(queue);
    }

    @Override
    public void deleteById(long id) {
        queueRepository.deleteById(id);
    }
}
