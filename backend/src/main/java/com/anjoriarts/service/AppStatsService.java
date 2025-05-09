package com.anjoriarts.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class AppStatsService {

    Logger logger  = LoggerFactory.getLogger(getClass().getName());

    private final RedisTemplate<String, String> redisTemplate;

    @Value("${spring.application.env}") // fallback to "prod"
    private String env;

    public AppStatsService(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void trackVisitor(String ip) {
        String key = env + ":unique-visitors";
        redisTemplate.opsForSet().add(key, ip); // Add only if not already present
    }

    public long getUniqueVisitorCount() {
        String key = env + ":unique-visitors";
        long visitorCount = redisTemplate.opsForSet().size(key);
        logger.info("Visitor count for {} is {}", key,visitorCount );
        return visitorCount;
    }
}
