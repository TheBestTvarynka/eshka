package com.eshka.service;

import com.eshka.entity.Subject;
import com.eshka.repository.SubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SubjectService {
    private final SubjectRepository subjectRepository;

    public Subject findById(long id) {
        return subjectRepository.findById(id).orElseThrow();
    }

    public Subject createNewSubject(Subject subject) {
        return subjectRepository.save(subject);
    }

    public Subject editSubject(Subject subject) {
        Subject oldSubject = subjectRepository.findById(subject.getId()).orElseThrow();
        oldSubject.setTitle(subject.getTitle());
        oldSubject.setDescription(subject.getDescription());
        return subjectRepository.save(oldSubject);
    }

    public void deleteById(long id) {
        subjectRepository.deleteById(id);
    }
}
