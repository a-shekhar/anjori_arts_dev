package com.anjoriarts.service;


public interface AppStatsService {

    public void trackVisitor(String ip);

    public long getUniqueVisitorCount();

    public long getActiveUsers();

    public void trackActiveUser();

}
