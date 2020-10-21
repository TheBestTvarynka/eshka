package com.eshka.mapper;

import com.eshka.dto.request.SubjectRequest;
import com.eshka.dto.response.SubjectResponse;
import com.eshka.entity.Subject;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper()
public interface SubjectMapper {
    SubjectMapper INSTANCE = Mappers.getMapper(SubjectMapper.class);

    SubjectResponse subjectToSubjectResponse(Subject entity);

    Subject subjectRequestToSubject(SubjectRequest request);
}
