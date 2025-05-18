package com.anjoriarts.controller;


import com.anjoriarts.Application;
import com.anjoriarts.common.CommonResponse;
import com.anjoriarts.service.AppStatsService;
import com.anjoriarts.util.IpUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.swing.plaf.IconUIResource;

@RestController
@RequestMapping("/analytics")
public class AppStatsController {

        Logger logger  = LoggerFactory.getLogger(getClass().getName());

        private final AppStatsService appStatsService;

        public AppStatsController(AppStatsService appStatsService) {
            this.appStatsService = appStatsService;
        }

        @PostMapping("/track-visitor")
        public ResponseEntity<?> trackVisitors(HttpServletRequest request) {
            try {
                String ip = IpUtil.getClientIp(request);
                appStatsService.trackUniqueVisitor(ip);
                return ResponseEntity.ok(CommonResponse.success("Visitor tracked", true));
            }catch (Exception e){
                logger.error("Visitor track error...", e);
                return ResponseEntity.ok(CommonResponse.failure("Visitor track error...", false));
            }
        }

        @GetMapping("/unique-visitors")
        public ResponseEntity<?> getUniqueVisitors() {
            try {
                long uniqueVisitors = appStatsService.getUniqueVisitorCount();
                return ResponseEntity.ok(CommonResponse.success("Unique visitors count fetched", uniqueVisitors));
            } catch (Exception e) {
                logger.error("Error fetching unique visitors" + e.getMessage());
                return ResponseEntity.ok(CommonResponse.success("Unique visitors count fetch failed...", null));
            }
        }


        @GetMapping("/active-users")
        public ResponseEntity<?> getActiveUsers() {
            try {
                long activeUsers = appStatsService.getActiveUsersCount();
                return ResponseEntity.ok(CommonResponse.success("Active Users count fetched", activeUsers));
            } catch (Exception e) {
                logger.error("Error fetching active users" + e.getMessage());
                return ResponseEntity.ok(CommonResponse.success("Unique Active Users count fetch failed...", null));
            }
        }


        @GetMapping("/news/latest")
        public ResponseEntity<?> getLatestNews() {
            try {
                String latestNews = appStatsService.getLatestNews();
                return ResponseEntity.ok(CommonResponse.success("Latest news fetched", latestNews));
            } catch (Exception e) {
                logger.error("Error fetching latest news" + e.getMessage());
                return ResponseEntity.ok(CommonResponse.success("Latest news fetch failed...", null));
            }
        }

        @PostMapping("/increment-total-visitors")
        public ResponseEntity<?> incrementVisitors() {
            try {
                appStatsService.trackVisitorCount();
                return ResponseEntity.ok(CommonResponse.success("Visitor tracked.", true));
            }catch (Exception e){
                logger.error("Visitor track failed..." + e.getMessage());
                return ResponseEntity.ok(CommonResponse.failure("Visitor track failed...", null));
            }
        }

        @GetMapping("/total-visitors")
        public ResponseEntity<?> getTotalVisitors() {
            try {
                long totalVisitors = appStatsService.getVisitorsCount();
                return ResponseEntity.ok(CommonResponse.success("Visitor tracked.", totalVisitors));
            }catch (Exception e){
                logger.error("Visitor track count fetch failed..." + e.getMessage());
                return ResponseEntity.ok(CommonResponse.failure("Visitor track count fetch failed...", null));
            }
        }

}
