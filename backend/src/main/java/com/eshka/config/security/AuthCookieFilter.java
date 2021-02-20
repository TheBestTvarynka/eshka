package com.eshka.config.security;

import java.io.IOException;
import java.util.Optional;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.eshka.entity.UserSession;
import com.eshka.repository.UserSessionRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

@Log4j2
public class AuthCookieFilter extends GenericFilterBean {
    public final static String COOKIE_NAME = "SessionCookies";

    private UserSessionRepository sessionRepository;

    public AuthCookieFilter(UserSessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse,
                         FilterChain filterChain) throws IOException, ServletException {
        log.info("in AuthCookieFilter.doFilter");
        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        String sessionId = extractAuthenticationCookie(httpServletRequest);
        log.info(sessionId);
        if (sessionId != null) {
            Optional<UserSession> session = sessionRepository.findById(sessionId);
            session.ifPresent(userSession ->
                    SecurityContextHolder.getContext()
                                         .setAuthentication(new UserAuthentication(userSession.getUser())));
        }
        filterChain.doFilter(servletRequest, servletResponse);
    }

    public static String extractAuthenticationCookie(HttpServletRequest httpServletRequest) {
        String sessionId = null;
        Cookie[] cookies = httpServletRequest.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(AuthCookieFilter.COOKIE_NAME)) {
                    sessionId = cookie.getValue();
                    break;
                }
            }
        }
        return sessionId;
    }
}
