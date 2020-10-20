package com.eshka.controller;

import com.eshka.dto.request.QueueRequest;
import com.eshka.dto.response.QueueResponse;
import com.eshka.entity.Queue;
import com.eshka.mapper.QueueMapper;
import com.eshka.service.QueueService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/queue")
@RequiredArgsConstructor
public class QueueController {
    private final QueueMapper mapper;
    private final QueueService queueService;

    @ApiOperation("get queue by id")
    @GetMapping("/{id}")
    public ResponseEntity<QueueResponse> findById(@PathVariable(name = "id") String id) {
        return new ResponseEntity<>(mapper.queueToQueueResponse(queueService.findById(Long.parseLong(id))),
                HttpStatus.OK);
    }

    @ApiOperation("create new subject")
    @PostMapping
    public ResponseEntity<QueueResponse> createSubject(@RequestBody QueueRequest request) {
        Queue newQueue = queueService.createNewQueue(mapper.queueRequestToQueue(request));
        QueueResponse queueResponse = mapper.queueToQueueResponse(newQueue);
        return new ResponseEntity<>(queueResponse, HttpStatus.CREATED);
    }

}
