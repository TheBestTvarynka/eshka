package com.eshka.service;

import com.eshka.entity.Subject;
import com.eshka.repository.SubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SubjectService {
    private SubjectRepository subjectRepository;

    public Subject findById(long id) {
        return subjectRepository.findById(id).orElseThrow();
    }
}
