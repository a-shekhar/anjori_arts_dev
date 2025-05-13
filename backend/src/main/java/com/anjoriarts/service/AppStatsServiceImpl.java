package com.anjoriarts.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class AppStatsServiceImpl implements AppStatsService{

    Logger logger  = LoggerFactory.getLogger(getClass().getName());

    private final RedisTemplate<String, String> redisTemplate;

    @Value("${spring.application.env}") // fallback to "prod"
    private String env;

    public AppStatsServiceImpl(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @Override
    public void trackVisitor(String ip) {
        String key = env + ":unique-visitors";
        redisTemplate.opsForSet().add(key, ip); // Add only if not already present
    }

    @Override
    public long getUniqueVisitorCount() {
        String key = env + ":unique-visitors";
        long visitorCount = redisTemplate.opsForSet().size(key);
        logger.info("Visitor count for {} is {}", key,visitorCount );
        return visitorCount;
    }


    @Override
    public void trackActiveUser() {
        String key = env + "active-users";
        redisTemplate.opsForValue().increment(key); // just increase the count
    }

    @Override
    public long getActiveUsers(){
        String key = env + ":active-users";
        long visitorCount = redisTemplate.opsForSet().size(key);
        logger.info("Active user count for {} is {}", key, visitorCount );
        return visitorCount;
    }
}
