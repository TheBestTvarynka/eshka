package com.eshka.dto.auth;

import com.eshka.entity.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AfterLoginDTO {
    private String fullName;
    private String username;
    private String email;
    private String sessionId;
    private Role role;
}
