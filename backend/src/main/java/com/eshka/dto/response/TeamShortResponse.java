package com.eshka.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeamShortResponse {
    private long id;
    private String name;
    private String description;
}
