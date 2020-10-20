package com.eshka.mapper;

import com.eshka.dto.request.QueueRequest;
import com.eshka.dto.response.QueueResponse;
import com.eshka.entity.Queue;
import com.eshka.service.SubjectService;
import com.eshka.service.UserService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", uses = {SubjectService.class, UserService.class})
public interface QueueMapper {
    QueueMapper INSTANCE = Mappers.getMapper(QueueMapper.class);

    @Mappings({
            @Mapping(target = "makerId", source = "entity.maker.userId"),
            @Mapping(target = "subjectId", source = "entity.subject.id")
    })
    QueueResponse queueToQueueResponse(Queue entity);

    @Mappings({
            @Mapping(source = "makerId", target = "maker"),
            @Mapping(source = "subjectId", target = "subject")
    })
    Queue queueRequestToQueue(QueueRequest request);
}
