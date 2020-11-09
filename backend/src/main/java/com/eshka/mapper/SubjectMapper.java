package com.eshka.mapper;

import com.eshka.dto.request.SubjectRequest;
import com.eshka.dto.response.SubjectResponse;
import com.eshka.entity.Subject;
import com.eshka.service.QueueService;
import com.eshka.service.SubjectService;
import com.eshka.service.TeamService;
import com.eshka.service.UserService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", uses = {TeamService.class})
public interface SubjectMapper {

    @Mappings({
            @Mapping(target = "teamId", source = "entity.team.id"),
    })
    SubjectResponse subjectToSubjectResponse(Subject entity);

    @Mappings({
            @Mapping(source = "teamId", target = "team"),
    })
    Subject subjectRequestToSubject(SubjectRequest request);
}
