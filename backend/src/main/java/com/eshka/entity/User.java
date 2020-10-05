package com.eshka.entity;

import com.eshka.entity.enums.Role;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Set;

@Data
@NoArgsConstructor
public class User implements UserDetails {
    private Long userId;
    private String username;
    private String password;
    private boolean active;
    private Set<Role> roles;
    private String email;
    private String phone;

//    public User(UserDTO userDTO) {
//        this.username = userDTO.getUsername();
//        this.password = userDTO.getPassword();
//        this.phone = userDTO.getPhone();
//        this.email = userDTO.getEmail();
//        this.active = true;
//        this.roles = Collections.singleton(Role.USER);
//    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return getRoles();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return active;
    }
}
