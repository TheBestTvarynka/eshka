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
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

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
        QueueDetails mapped = mapper.queueDetailsRequestToQueueDetails(request);
        QueueDetails newQueueDetails = service.createNewQueueDetails(mapped);
        return new ResponseEntity<>(mapper.queueDetailsToQueueDetailsResponse(newQueueDetails), HttpStatus.CREATED);
    }

    @PatchMapping
    @ApiOperation("change passed status for queue details")
    public ResponseEntity<QueueDetailsResponse> changePassedStatus(@RequestBody QueueDetailsRequest request) {
        QueueDetails newQueueDetails = service.changePassedStatus(mapper.queueDetailsRequestToQueueDetails(request));
        return new ResponseEntity<>(mapper.queueDetailsToQueueDetailsResponse(newQueueDetails), HttpStatus.OK);
    }

    @DeleteMapping("/{userId}/{queueId}")
    @ApiOperation("delete someone from turn - remove some queue details object")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeFromQueue(@PathVariable(name = "userId") String userId,
                                @PathVariable(name = "queueId") String queueId) {
        service.deleteQueueDetailsById(Long.parseLong(userId), Long.parseLong(queueId));
    }

    @GetMapping("/{queueId}")
    @ApiOperation("get list of queue details by queue id")
    public ResponseEntity<List<QueueDetailsResponse>> getAllByQueueId(@PathVariable(name = "queueId") String queueId) {
        return new ResponseEntity<>(service.getAllByQueueId(Long.parseLong(queueId)).stream()
                .map(mapper::queueDetailsToQueueDetailsResponse)
                .collect(Collectors.toList()), HttpStatus.OK);
    }
}
