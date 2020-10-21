package com.eshka.service.impl;

import com.eshka.entity.QueueDetails;
import com.eshka.repository.QueueDetailsRepository;
import com.eshka.service.QueueDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QueueDetailsServiceImpl implements QueueDetailsService {
    private final QueueDetailsRepository repository;

    @Override
    public QueueDetails createNewQueueDetails(QueueDetails request) {
        return repository.save(request);
    }
}
