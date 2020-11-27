package com.eshka.mapper;

import com.eshka.dto.request.SubjectRequest;
import com.eshka.dto.response.SubjectResponse;
import com.eshka.entity.Subject;
import com.eshka.service.TeamService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

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
