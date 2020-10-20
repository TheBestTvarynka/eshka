package com.eshka.entity;

//import com.eshka.entity.enums.Role;

import com.eshka.entity.enums.Role;
import lombok.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.NaturalId;
import org.hibernate.annotations.NaturalIdCache;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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
    @Column(name = "full_name", nullable = false)
    private String fullName;
    private String email;
    @NaturalId
    @EqualsAndHashCode.Include
    private String username;

    private String password;

    private boolean active;

    //    @ElementCollection(targetClass = Role.class, fetch = FetchType.EAGER)
//    @CollectionTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"))
//    @Enumerated(EnumType.STRING)
//    private Set<Role> roles;
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
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
