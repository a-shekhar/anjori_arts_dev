package com.anjoriarts.controller;

import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class CommonController {

    public String normalizeString(List<String> mediums) {
        return mediums.stream()
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .sorted()
                .collect(Collectors.joining(", "));
    }
}
