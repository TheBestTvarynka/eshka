package com.eshka.mapper;

import com.eshka.dto.request.TeamRequest;
import com.eshka.dto.response.TeamFullResponse;
import com.eshka.dto.response.TeamResponse;
import com.eshka.entity.Team;
import com.eshka.service.TeamService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {SubjectMapper.class, UserMapper.class, TeamService.class})
public interface TeamMapper {
    TeamResponse teamToTeamResponse(Team entity);

    Team teamRequestToTeam(TeamRequest request);

    @Mapping(source = "team.users", target = "members")
    TeamFullResponse teamToTeamFullResponse(Team team);
}
