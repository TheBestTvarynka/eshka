package com.eshka.config;

import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Collection;

@Log4j2
@Component
public class SimpleAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

    @Override
    public void onAuthenticationSuccess(HttpServletRequest arg0,
                                        HttpServletResponse arg1,
                                        Authentication authentication) {
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        authorities.forEach(authority -> {
            if (authority.getAuthority().equals("USER")) {
                try {
                    redirectStrategy.sendRedirect(arg0, arg1, "/user");
                } catch (Exception e) {
                    log.error(e.getMessage());
                }
            } else if (authority.getAuthority().equals("ADMIN")) {
                try {
                    redirectStrategy.sendRedirect(arg0, arg1, "/orders");
                } catch (Exception e) {
                    log.error(e.getMessage());
                }
            } else {
                throw new IllegalStateException();
            }
        });
    }
}
