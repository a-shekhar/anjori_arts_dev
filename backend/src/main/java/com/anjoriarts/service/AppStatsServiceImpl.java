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

    private final String anjori = "anjori";
    private final String visitorsKey =  anjori + "-" + env + ":visitors";
    private final String activeUsersKey = anjori + "-" + env + ":active-users";
    private final String uniqueVisitorsKey = anjori + "-" + env + ":unique-visitors";


    public AppStatsServiceImpl(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @Override
    public void trackUniqueVisitor(String ip) {
        redisTemplate.opsForSet().add(uniqueVisitorsKey, ip); // Add only if not already present
    }

    @Override
    public long getUniqueVisitorCount() {
        return  redisTemplate.opsForSet().size(uniqueVisitorsKey);
    }

    @Override
    public void trackActiveUser() {
        redisTemplate.opsForValue().increment(activeUsersKey); // just increase the count
    }

    @Override
    public long getActiveUsersCount(){
        String value = redisTemplate.opsForValue().get(activeUsersKey);
        return  (value != null) ? Long.parseLong(value) : 0;
    }

    @Override
    public String getLatestNews(){
        String key = env + ":latest-news";
       return redisTemplate.opsForValue().get(key);
    }

    @Override
    public void trackVisitorCount(){
        redisTemplate.opsForValue().increment(visitorsKey); // just increase the count
    }

    @Override
    public long getVisitorsCount(){
        String value = redisTemplate.opsForValue().get(visitorsKey);
        return  (value != null) ? Long.parseLong(value) : 0;
    }
}
