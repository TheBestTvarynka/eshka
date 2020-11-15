package com.eshka.entity;

import com.eshka.entity.enums.Role;
import lombok.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.NaturalId;
import org.hibernate.annotations.NaturalIdCache;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Entity(name = "User")
@Table(name = "users")
@NaturalIdCache
@Cache(
        usage = CacheConcurrencyStrategy.READ_WRITE
)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userId;
    @ManyToMany(mappedBy = "users")
    private Set<Team> teams = new HashSet<>();
    @Column(name = "full_name", nullable = false)
    private String fullName;
    private String email;
    @NaturalId
    @EqualsAndHashCode.Include
    private String username;

    private String password;

    private boolean active;

    @CollectionTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"))
    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
    private List<UserSession> sessions;

    @OneToMany(
            mappedBy = "queue",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<QueueDetails> queues = new ArrayList<>();

    public User(String username) {
        this.username = username;
    }
}
