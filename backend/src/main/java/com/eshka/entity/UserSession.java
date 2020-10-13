package com.eshka.entity;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_sessions")
public class UserSession implements GrantedAuthority {
    @Id
    @Column(name = "id", updatable = false, nullable = false)
    private String id;

    @ManyToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "expiration_date")
    private Date expirationDate;

    @Override
    public String getAuthority() {
        return this.id;
    }
}



