package com.eshka.config.security;

import com.eshka.repository.UserSessionRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.logout.HeaderWriterLogoutHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.context.SecurityContextPersistenceFilter;
import org.springframework.security.web.header.writers.ClearSiteDataHeaderWriter;
import org.springframework.security.web.header.writers.ClearSiteDataHeaderWriter.Directive;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final AuthCookieFilter authCookieFilter;
    private final CustomLogoutSuccessHandler logoutSuccessHandler;

    public SecurityConfig(UserSessionRepository sessionRepository) {
        this.authCookieFilter = new AuthCookieFilter(sessionRepository);
        this.logoutSuccessHandler = new CustomLogoutSuccessHandler(sessionRepository);
    }

    // disable standard security behavior
    @Bean
    @Override
    protected AuthenticationManager authenticationManager() {
        return authentication -> {
            throw new AuthenticationServiceException("Cannot authenticate " + authentication);
        };
    }

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder(8);
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.sessionManagement(cust -> cust.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .headers(cust -> cust.contentSecurityPolicy(
                        "script-src 'self'; object-src 'none'; base-uri 'self'"))
                .csrf(AbstractHttpConfigurer::disable)
                .logout(cust -> {
                    cust.logoutUrl("/auth/logout");
                    cust.addLogoutHandler(new HeaderWriterLogoutHandler(
                            new ClearSiteDataHeaderWriter(Directive.ALL)));
                    cust.logoutSuccessHandler(this.logoutSuccessHandler);
                    cust.deleteCookies(AuthCookieFilter.COOKIE_NAME);
                })
                .authorizeRequests(cust -> {
                    cust.antMatchers("/auth/login", "/auth/register")
                            .permitAll()
                            .anyRequest()
                            .authenticated();
                })
                .exceptionHandling(cust -> cust
                        .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
                .addFilterAfter(this.authCookieFilter, SecurityContextPersistenceFilter.class);
    }

}

class CustomLogoutSuccessHandler implements LogoutSuccessHandler {
    private UserSessionRepository sessionRepository;

    public CustomLogoutSuccessHandler(UserSessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response,
                                Authentication authentication) throws IOException {
        String sessionId = AuthCookieFilter.extractAuthenticationCookie(request);
        sessionRepository.deleteById(sessionId);

        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().flush();
    }
}
