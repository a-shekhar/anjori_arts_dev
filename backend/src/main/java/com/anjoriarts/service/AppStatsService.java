package com.anjoriarts.service;


public interface AppStatsService {

    public void trackUniqueVisitor(String ip);

    public long getUniqueVisitorCount();

    public void trackActiveUser();

    public long getActiveUsersCount();

    public String getLatestNews();

    public void trackVisitorCount();

    public long getVisitorsCount();

}
