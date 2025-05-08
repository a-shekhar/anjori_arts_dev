package com.anjoriarts.controller;


import com.anjoriarts.Application;
import com.anjoriarts.service.AppStatsService;
import com.anjoriarts.util.IpUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
        public ResponseEntity<String> track(HttpServletRequest request) {
            logger.info("track-visitor method entered....");
            String ip = IpUtil.getClientIp(request);
            appStatsService.trackVisitor(ip);
            logger.info("track-visitor method exist");
            return ResponseEntity.ok("Visitor tracked");
        }

        @GetMapping("/unique-visitors")
        public ResponseEntity<Long> getUniqueVisitors() {
            logger.info("count" + appStatsService.getUniqueVisitorCount());
            return ResponseEntity.ok(appStatsService.getUniqueVisitorCount());
        }

}
