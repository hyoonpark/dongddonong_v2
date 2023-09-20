package com.sit.dongddonong.config;

//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
//
////        httpSecurity
////                .csrf(Customizer.withDefaults())
////                .formLogin(Customizer.withDefaults());
//
//        httpSecurity
//                .csrf(AbstractHttpConfigurer::disable)
//                .formLogin(AbstractHttpConfigurer::disable);
//
//        return httpSecurity
//                .authorizeHttpRequests(
//                        authorize -> authorize
////                                .requestMatchers("/users/**").permitAll()
////                                .requestMatchers("/login").permitAll()
//                                .requestMatchers("/**").permitAll()
////                                .requestMatchers("/auth/**").permitAll()
//                                .anyRequest().authenticated()
//                )
//                .build();
//    }
//}

import com.sit.dongddonong.util.security.JwtProvider;
import com.sit.dongddonong.util.security.CustomAccessDeniedHandler;
import com.sit.dongddonong.util.security.CustomAuthenticationEntryPoint;
import com.sit.dongddonong.util.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtProvider jwtProvider;
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
    private final CustomAccessDeniedHandler customAccessDeniedHandler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .httpBasic().disable()
                .formLogin().disable()
                .headers()
                .frameOptions()
                .sameOrigin()
                .and()
                .cors() // CORS 에러 방지용

                // 세션을 사용하지 않을거라 세션 설정을 Stateless 로 설정
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                // 접근 권한 설정부
                .and().authorizeHttpRequests()
                .requestMatchers(HttpMethod.OPTIONS).permitAll() // CORS Preflight 방지
                .requestMatchers("/","/user/login/**").permitAll()
                .requestMatchers( "/","/swagger-ui/**", "/v3/api-docs/**").permitAll()
//                .requestMatchers("/**").permitAll()

//                .requestMatchers("/", "/h2-console/**", "/member/login/**").permitAll()
                .anyRequest().authenticated()

                // JWT 토큰 예외처리부
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(customAuthenticationEntryPoint)
                .accessDeniedHandler(customAccessDeniedHandler)
                .and()
                .addFilterBefore(new JwtAuthenticationFilter(jwtProvider), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}