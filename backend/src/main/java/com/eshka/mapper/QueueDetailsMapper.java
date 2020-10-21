package com.eshka.mapper;

import com.eshka.dto.request.QueueDetailsRequest;
import com.eshka.dto.response.QueueDetailsResponse;
import com.eshka.entity.QueueDetails;
import com.eshka.service.QueueService;
import com.eshka.service.UserService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring", uses = {QueueService.class, UserService.class})
public interface QueueDetailsMapper {
    @Mappings({
            @Mapping(target = "user", source = "entity.user"),
            @Mapping(target = "user.id", source = "entity.user.userId"),
            @Mapping(target = "queueId", source = "entity.queue.id")
    })
    QueueDetailsResponse queueDetailsToQueueDetailsResponse(QueueDetails entity);

    @Mappings({
            @Mapping(source = "userId", target = "user"),
            @Mapping(source = "queueId", target = "queue")
    })
    QueueDetails queueDetailsRequestToQueueDetails(QueueDetailsRequest request);
}
