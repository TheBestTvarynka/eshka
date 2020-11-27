package com.eshka.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeamFullResponse {
    private long id;
    private String name;
    private String description;
    private List<SubjectResponse> subjects;
    private List<UserShortResponse> members;
}
