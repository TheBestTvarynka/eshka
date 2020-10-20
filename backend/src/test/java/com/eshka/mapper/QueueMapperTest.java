package com.eshka.mapper;

import com.eshka.dto.request.QueueRequest;
import com.eshka.dto.response.QueueResponse;
import com.eshka.entity.Queue;
import com.eshka.entity.Subject;
import com.eshka.entity.User;
import org.junit.Before;
import org.junit.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

import static org.junit.Assert.assertEquals;

public class QueueMapperTest {
    private Queue queue;
    private QueueResponse queueResponse;
    private QueueRequest queueRequest;


    @Before
    public void setUp() {
        this.queue = new Queue() {{
            setClosingDate(LocalDateTime.now().plusDays(1));
            setCreationDate(LocalDateTime.now().minusDays(1));
            setEndDate(LocalDateTime.now().plusDays(1));
            setStartDate(LocalDateTime.now().minusDays(1));
            setId(1L);
            setDescription("description");
            setTitle("title");
            setMaker(User.builder().userId(1L).build());
            setSubject(Subject.builder().id(1L).build());
        }};
        this.queueRequest = new QueueRequest() {{
            setTitle(queue.getTitle());
            setDescription(queue.getDescription());
            setCreationDate(queue.getCreationDate());
            setClosingDate(queue.getClosingDate());
            setStartDate(queue.getStartDate());
            setEndDate(queue.getEndDate());
            setMakerId(queue.getMaker().getUserId());
            setSubjectId(queue.getSubject().getId());
        }};
        this.queueResponse = new QueueResponse() {{
            setId(queue.getId());
            setTitle(queue.getTitle());
            setDescription(queue.getDescription());
            setCreationDate(queue.getCreationDate());
            setClosingDate(queue.getClosingDate());
            setStartDate(queue.getStartDate());
            setEndDate(queue.getEndDate());
            setMakerId(queue.getMaker().getUserId());
            setSubjectId(queue.getSubject().getId());
        }};
    }

    @Test
    public void queueToQueueResponse() {
        QueueResponse actual = QueueMapper.INSTANCE.queueToQueueResponse(queue);
        assertEquals(queueResponse, actual);
    }

    @Test
    public void queueRequestToQueue() {
        Queue actual = QueueMapper.INSTANCE.queueRequestToQueue(queueRequest);
        System.out.println(actual);
        assertEquals(queue, actual);
    }
}