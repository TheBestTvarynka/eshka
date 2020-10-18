package com.eshka.controller;

import com.eshka.dto.response.SubjectResponse;
import com.eshka.mapper.SubjectMapper;
import com.eshka.service.SubjectService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
