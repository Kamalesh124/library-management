package com.example.CRUDApplication.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable() // Disable CSRF for H2 console
            .authorizeHttpRequests()
                .requestMatchers("/h2-console/").permitAll() // Allow H2 console access
                .anyRequest().authenticated() // Secure other endpoints
            .and()
            .headers().frameOptions().disable(); // Allow frames for H2 console

        return http.build();
    }
}