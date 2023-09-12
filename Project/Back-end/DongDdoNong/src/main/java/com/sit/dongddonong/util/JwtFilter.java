package com.sit.dongddonong.util;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
public class JwtFilter extends OncePerRequestFilter {

    private final String secretKey;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String path = request.getServletPath();

        // 로그인일 경우 건너뛰기
        if (
                path.startsWith("로그인 요청 API")
        ) {
            filterChain.doFilter(request, response);
            return;
        }

        final String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
        log.info("authorization : {}", authorization);

        if (authorization == null || !authorization.startsWith("Bearer ")) {
//            throw new AuthenticationException(AuthenticationErrorCode.Empty_Authentication);
        }

        // Token 꺼내기
        String token = authorization.split(" ")[1];

        // Token Expired 되었는지 여부
        if (JwtProvider.isExpired(token, secretKey)) {
            filterChain.doFilter(request, response);
            return;
        }

        // memberId Token에서 꺼내기
        Long memberId = JwtProvider.getMemberId(token, secretKey);
        log.info("memberName: {}", memberId);

        // 토큰 재발급일 경우 리프레쉬 토큰 확인
        if (
                !(
                        (path.startsWith("토큰 재발행 API") && JwtProvider.isRefreshToken(token, secretKey))
                                || JwtProvider.isAccessToken(token, secretKey)
                )
        ) {
            throw new JwtException("");
        }

        // 권한 부여
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(memberId, null, List.of(new SimpleGrantedAuthority("MEMBER")));

        // Detail을 넣어줌
        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        log.info("[+] Token in SecurityContextHolder");
        filterChain.doFilter(request, response);
    }
}