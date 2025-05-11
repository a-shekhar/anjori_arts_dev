package com.anjoriarts.dto;

import java.util.List;

public class ArtworkPageResponse {
    private List<ArtworkResponseDTO> content;
    private int totalPages;
    private long totalElements;
    private int number;
    private int size;
    private boolean first;
    private boolean last;

    public ArtworkPageResponse() {}

    public ArtworkPageResponse(List<ArtworkResponseDTO> content, int totalPages, long totalElements,
                               int number, int size, boolean first, boolean last) {
        this.content = content;
        this.totalPages = totalPages;
        this.totalElements = totalElements;
        this.number = number;
        this.size = size;
        this.first = first;
        this.last = last;
    }

    // Getters and setters
    public List<ArtworkResponseDTO> getContent() {
        return content;
    }

    public void setContent(List<ArtworkResponseDTO> content) {
        this.content = content;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public long getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(long totalElements) {
        this.totalElements = totalElements;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public boolean isFirst() {
        return first;
    }

    public void setFirst(boolean first) {
        this.first = first;
    }

    public boolean isLast() {
        return last;
    }

    public void setLast(boolean last) {
        this.last = last;
    }
}
