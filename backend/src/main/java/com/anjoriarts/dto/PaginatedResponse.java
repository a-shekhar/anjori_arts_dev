package com.anjoriarts.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


public class PaginatedResponse<T> {
    private final List<T> content;
    private final int totalPages;
    private final long totalElements;
    private final int number;
    private final int size;
    private final boolean first;
    private final boolean last;

    public PaginatedResponse(List<T> content, int totalPages, long totalElements,
                             int number, int size, boolean first, boolean last) {
        this.content = content;
        this.totalPages = totalPages;
        this.totalElements = totalElements;
        this.number = number;
        this.size = size;
        this.first = first;
        this.last = last;
    }
}
