package com.eshka.dto.response;

import com.eshka.entity.Team;
import com.eshka.mapper.SubjectMapper;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeamFullResponse {
    private long id;
    private String name;
    private String description;
    private List<SubjectResponse> subjects;
    private List<UserShortResponse> members;

    public static TeamFullResponse fromTeam(Team team) {
        return new TeamFullResponse(
                team.getId(),
                team.getName(),
                team.getDescription(),
                team.getSubjects().stream()
                .map(subject -> new SubjectResponse(subject.getId(), subject.getTitle(), subject.getDescription(), team.getId()))
                .collect(Collectors.toList()),
                team.getUsers().stream()
                .map(user -> new UserShortResponse(user.getUserId(), user.getFullName()))
                .collect(Collectors.toList())
        );
    }
}
