package com.eshka.dto.response;

import com.eshka.entity.Team;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubjectResponse {
    private long id;
    private String title;
    private String description;
    private long teamId;
}
