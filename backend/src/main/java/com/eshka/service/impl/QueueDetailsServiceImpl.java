package com.eshka.service.impl;

import com.eshka.entity.QueueDetails;
import com.eshka.entity.QueueDetailsId;
import com.eshka.exception.QueueDetailsNotFoundException;
import com.eshka.repository.QueueDetailsRepository;
import com.eshka.service.QueueDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QueueDetailsServiceImpl implements QueueDetailsService {
    private final QueueDetailsRepository repository;

    @Override
    public QueueDetails createNewQueueDetails(QueueDetails request) {
        request.setId(new QueueDetailsId(request.getQueue().getId(), request.getUser().getUserId()));
        request.setTurnedAt(LocalDateTime.now());
        return repository.save(request);
    }

    @Override
    public QueueDetails changePassedStatus(QueueDetails request) {
        QueueDetails queueDetails = repository.findById(new QueueDetailsId(request.getQueue().getId(), request.getUser().getUserId())).orElseThrow(
                () -> new QueueDetailsNotFoundException("queue details not found")
        );
        queueDetails.setPassed(request.isPassed());
        return repository.save(queueDetails);
    }

    @Override
    public void deleteQueueDetailsById(long userId, long queueId) {
        repository.deleteById(new QueueDetailsId(queueId, userId));
    }

    @Override
    public List<QueueDetails> getAllByQueueId(long queueId) {
        return repository.findAllByQueue_Id(queueId);
    }
}
