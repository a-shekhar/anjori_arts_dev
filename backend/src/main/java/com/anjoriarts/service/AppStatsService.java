package com.anjoriarts.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class AppStatsService {

    private final RedisTemplate<String, String> redisTemplate;

    @Value("${spring.application.env}") // fallback to "prod"
    private String env;

    public AppStatsService(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
        System.out.println("env is " + env);
    }

    public void trackVisitor(String ip) {
        String key = env + ":unique-visitors";
        System.out.println(key);
        System.out.println(ip);
        System.out.println(redisTemplate.opsForSet().members(key));
        redisTemplate.opsForSet().add(key, ip); // Add only if not already present
    }

    public long getUniqueVisitorCount() {
        String key = env + ":unique-visitors";
        return redisTemplate.opsForSet().size(key);
    }
}
