package com.eshka.service.impl;

import com.eshka.entity.Queue;
import com.eshka.exception.QueueNotFoundException;
import com.eshka.repository.QueueRepository;
import com.eshka.service.QueueService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

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
        request.setCreationDate(LocalDateTime.now());
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
        queue.setClosingDate(request.getClosingDate());
        return queueRepository.save(queue);
    }

    @Override
    public void deleteById(long id) {
        queueRepository.deleteById(id);
    }

    @Override
    public List<Queue> findByOpenedAndSubjectId(boolean opened, long subjectId) {
        return opened
                ? queueRepository.findAllByClosingDateIsNullAndSubject_Id(subjectId)
                : queueRepository.findAllByClosingDateIsNotNullAndSubject_Id(subjectId);
    }

    @Override
    public List<Queue> findBySubjectId(long subjectId) {
        return queueRepository.findAllBySubject_Id(subjectId);
    }
}
