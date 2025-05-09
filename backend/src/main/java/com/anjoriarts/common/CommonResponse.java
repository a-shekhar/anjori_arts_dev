
package com.anjoriarts.common;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CommonResponse<T> {
    private boolean success;
    private String message;
    private T data;

    public CommonResponse(boolean success, String message, T data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    public static <T> CommonResponse<T> success(String message, T data) {
        return new CommonResponse<>(true, message, data);
    }

    public static <T> CommonResponse<T> failure(String message, T data) {
        return new CommonResponse<>(false, message, data);
    }

}