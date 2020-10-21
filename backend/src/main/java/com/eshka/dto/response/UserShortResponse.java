package com.eshka.dto.response;

import com.eshka.entity.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserShortResponse {
    private long id;
    private String fullName;
}
