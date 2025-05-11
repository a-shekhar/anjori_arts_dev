package com.anjoriarts.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


public class PaginatedResponse<T> {
    private List<T> content;
    private int totalPages;
    private long totalElements;
    private int number;
    private int size;
    private boolean first;
    private boolean last;

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
