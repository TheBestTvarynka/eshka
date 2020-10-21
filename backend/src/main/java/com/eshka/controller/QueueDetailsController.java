package com.eshka.controller;

import com.eshka.dto.request.QueueDetailsRequest;
import com.eshka.dto.response.QueueDetailsResponse;
import com.eshka.entity.QueueDetails;
import com.eshka.mapper.QueueDetailsMapper;
import com.eshka.service.QueueDetailsService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/queue-details")
@RequiredArgsConstructor
@Api("process all operations with queue details objects")
public class QueueDetailsController {
    private final QueueDetailsMapper mapper;
    private final QueueDetailsService service;

    @PostMapping
    @ApiOperation("create new queue details - actually take a turn")
    public ResponseEntity<QueueDetailsResponse> createNewQueueDetails(@RequestBody QueueDetailsRequest request) {
        QueueDetails newQueueDetails = service.createNewQueueDetails(mapper.queueDetailsRequestToQueueDetails(request));
        return new ResponseEntity<>(mapper.queueDetailsToQueueDetailsResponse(newQueueDetails), HttpStatus.CREATED);
    }
}
