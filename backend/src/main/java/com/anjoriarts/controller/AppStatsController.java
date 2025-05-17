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

        @GetMapping("/track-visitor")
        public ResponseEntity<?> trackVisitors(HttpServletRequest request) {
            String ip = IpUtil.getClientIp(request);
            appStatsService.trackVisitor(ip);
            return ResponseEntity.ok(CommonResponse.success("Visitor tracked", null));
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
                long activeUsers = appStatsService.getActiveUsers();
                return ResponseEntity.ok(CommonResponse.success("Active Users count fetched", activeUsers));
            } catch (Exception e) {
                logger.error("Error fetching active users" + e.getMessage());
                return ResponseEntity.ok(CommonResponse.success("Unique Active Users count fetch failed...", null));
            }
        }

}
