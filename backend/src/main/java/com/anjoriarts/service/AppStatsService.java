package com.anjoriarts.service;


public interface AppStatsService {

    void trackUniqueVisitor(String ip);

    long getUniqueVisitorCount();

    void trackActiveUser();

    long getActiveUsersCount();

    String getLatestNews();

    void trackVisitorCount();

    long getVisitorsCount();

}
