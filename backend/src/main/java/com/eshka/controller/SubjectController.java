package com.eshka.controller;

import com.eshka.dto.request.SubjectRequest;
import com.eshka.dto.response.SubjectResponse;
import com.eshka.entity.Subject;
import com.eshka.mapper.SubjectMapper;
import com.eshka.service.SubjectService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api("process all operations with subject objects")
@RestController
@RequestMapping("/subject")
@RequiredArgsConstructor
public class SubjectController {
    private final SubjectService subjectService;
    private static final SubjectMapper mapper = SubjectMapper.INSTANCE;

    @ApiOperation("get subject by id")
    @GetMapping("/{id}")
    public ResponseEntity<SubjectResponse> findById(@PathVariable(name = "id") String id) {
        return new ResponseEntity<>(mapper.subjectToSubjectResponse(subjectService.findById(Long.parseLong(id))),
                HttpStatus.OK);
    }

    @ApiOperation("create new subject")
    @PostMapping
    public ResponseEntity<SubjectResponse> createSubject(@RequestBody SubjectRequest request) {
        Subject subject = mapper.subjectRequestToSubject(request);
        return new ResponseEntity<>(mapper.subjectToSubjectResponse(subjectService.createNewSubject(subject)),
                HttpStatus.CREATED);
    }

    @ApiOperation("edit subject")
    @PutMapping
    public ResponseEntity<SubjectResponse> editSubject(@RequestBody SubjectRequest request) {
        Subject subject = mapper.subjectRequestToSubject(request);
        return new ResponseEntity<>(mapper.subjectToSubjectResponse(subjectService.editSubject(subject)),
                HttpStatus.OK);
    }

    @ApiOperation("delete subject by id")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteSubject(@PathVariable(name = "id") String id) {
        subjectService.deleteById(Long.parseLong(id));
    }
}
