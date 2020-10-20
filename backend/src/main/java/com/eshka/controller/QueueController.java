package com.eshka.controller;

import com.eshka.dto.response.QueueResponse;
import com.eshka.mapper.QueueMapper;
import com.eshka.service.QueueService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/queue")
@RequiredArgsConstructor
public class QueueController {
    private static final QueueMapper mapper = QueueMapper.INSTANCE;
    private final QueueService queueService;

    @ApiOperation("get queue by id")
    @GetMapping("/{id}")
    public ResponseEntity<QueueResponse> findById(@PathVariable(name = "id") String id) {
        return new ResponseEntity<>(mapper.queueToQueueResponse(queueService.findById(Long.parseLong(id))),
                HttpStatus.OK);
    }

}
