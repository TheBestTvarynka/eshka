package com.eshka.dto.request;

import com.eshka.entity.Team;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubjectRequest {
    private long id;
    private String title;
    private String description;
    private long teamId;
}
