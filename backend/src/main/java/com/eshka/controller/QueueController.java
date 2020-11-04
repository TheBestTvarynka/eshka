package com.eshka.controller;

import com.eshka.dto.request.QueueRequest;
import com.eshka.dto.response.QueueResponse;
import com.eshka.entity.Queue;
import com.eshka.mapper.QueueMapper;
import com.eshka.service.QueueService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/queue")
@RequiredArgsConstructor
@Api("process all operations with queue objects")
public class QueueController {
    private final QueueMapper mapper;
    private final QueueService queueService;

    @ApiOperation("get queue by id")
    @GetMapping("/{id}")
    public ResponseEntity<QueueResponse> findById(@PathVariable(name = "id") String id) {
        return new ResponseEntity<>(mapper.queueToQueueResponse(queueService.findById(Long.parseLong(id))),
                HttpStatus.OK);
    }

    @ApiOperation("create new queue")
    @PostMapping
    public ResponseEntity<QueueResponse> createQueue(@RequestBody QueueRequest request) {
        Queue newQueue = queueService.createNewQueue(mapper.queueRequestToQueue(request));
        QueueResponse queueResponse = mapper.queueToQueueResponse(newQueue);
        return new ResponseEntity<>(queueResponse, HttpStatus.CREATED);
    }

    @ApiOperation("edit queue")
    @PutMapping
    public ResponseEntity<QueueResponse> editQueue(@RequestBody QueueRequest request) {
        Queue newQueue = queueService.editQueue(mapper.queueRequestToQueue(request));
        return new ResponseEntity<>(mapper.queueToQueueResponse(newQueue),
                HttpStatus.OK);
    }

    @ApiOperation("delete queue by id")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteQueue(@PathVariable(name = "id") String id) {
        queueService.deleteById(Long.parseLong(id));
    }

    @ApiOperation("get queues by params")
    @GetMapping("/all")
    public ResponseEntity<List<QueueResponse>> getQueuesByOpenedAndSubjectId(
            @RequestParam(value = "opened", required = false) Optional<String> opened,
            @RequestParam("subjectId") String subjectId) {
        List<Queue> list = opened.isPresent()
                ? queueService.findByOpenedAndSubjectId(Boolean.parseBoolean(opened.get()), Long.parseLong(subjectId))
                : queueService.findBySubjectId(Long.parseLong(subjectId));
        return new ResponseEntity<>(list.stream()
                .map(mapper::queueToQueueResponse)
                .collect(Collectors.toList())
                , HttpStatus.OK);
    }
}
