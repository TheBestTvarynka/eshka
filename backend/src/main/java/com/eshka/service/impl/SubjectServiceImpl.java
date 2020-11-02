package com.eshka.service.impl;

import com.eshka.entity.Subject;
import com.eshka.exception.SubjectNotFoundException;
import com.eshka.repository.SubjectRepository;
import com.eshka.service.SubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SubjectServiceImpl implements SubjectService {
    private final SubjectRepository subjectRepository;

    @Override
    public Subject findById(long id) {
        return subjectRepository.findById(id).orElseThrow();
    }

    @Override
    public Subject createNewSubject(Subject subject) {
        return subjectRepository.save(subject);
    }

    @Override
    public Subject editSubject(Subject subject) {
        Subject oldSubject = subjectRepository.findById(subject.getId()).orElseThrow(
                () -> new SubjectNotFoundException("subject not found"));
        oldSubject.setTitle(subject.getTitle());
        oldSubject.setDescription(subject.getDescription());
        oldSubject.setTeam(subject.getTeam());
        return subjectRepository.save(oldSubject);
    }

    @Override
    public void deleteById(long id) {
        subjectRepository.deleteById(id);
    }

    @Override
    public List<Subject> findAll() {
        return subjectRepository.findAll();
    }
}
