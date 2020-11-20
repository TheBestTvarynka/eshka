package com.eshka.service;

import com.eshka.entity.Subject;

import java.util.List;

public interface SubjectService {
    Subject findById(long id);

    Subject createNewSubject(Subject subject);

    Subject editSubject(Subject subject);

    void deleteById(long id);

    List<Subject> findAllByTeamId(long teamId);
}
