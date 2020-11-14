package com.eshka.mapper;

import com.eshka.dto.request.TeamRequest;
import com.eshka.dto.response.TeamResponse;
import com.eshka.entity.Team;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper()
public interface TeamMapper {
    TeamMapper INSTANCE = Mappers.getMapper(TeamMapper.class);

    TeamResponse teamToTeamResponse(Team entity);

    Team teamRequestToTeam(TeamRequest request);
}
