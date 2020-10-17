package com.eshka.controller;

import com.eshka.entity.Subject;
import com.eshka.service.SubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/subject")
@RequiredArgsConstructor
public class SubjectController {
    private final SubjectService subjectService;

    @GetMapping("/{id}")
    public ResponseEntity<Subject> findById(@PathVariable(name = "id") String id) {
        return new ResponseEntity<>(subjectService.findById(Long.parseLong(id)), HttpStatus.OK);
    }
}
