package com.anjoriarts.service;

import com.anjoriarts.common.Consonants;
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
    public void trackUniqueVisitor(String ip) {
        String uniqueVisitorsKey = String.format(Consonants.REDIS_UNIQUE_VISITORS_KEY, env);
        redisTemplate.opsForSet().add(uniqueVisitorsKey, ip); // Add only if not already present
    }

    @Override
    public long getUniqueVisitorCount() {
        String uniqueVisitorsKey = String.format(Consonants.REDIS_UNIQUE_VISITORS_KEY, env);
        return  redisTemplate.opsForSet().size(uniqueVisitorsKey);
    }

    @Override
    public void trackActiveUser() {
        String activeUsersKey = String.format(Consonants.REDIS_ACTIVE_USERS_KEY, env);
        redisTemplate.opsForValue().increment(activeUsersKey); // just increase the count
    }

    @Override
    public long getActiveUsersCount(){
        String activeUsersKey = String.format(Consonants.REDIS_ACTIVE_USERS_KEY, env);
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
        String visitorsKey = String.format(Consonants.REDIS_VISITORS_KEY, env);
        redisTemplate.opsForValue().increment(visitorsKey); // just increase the count
    }

    @Override
    public long getVisitorsCount(){
        String visitorsKey = String.format(Consonants.REDIS_VISITORS_KEY, env);
        String value = redisTemplate.opsForValue().get(visitorsKey);
        return  (value != null) ? Long.parseLong(value) : 0;
    }
}
