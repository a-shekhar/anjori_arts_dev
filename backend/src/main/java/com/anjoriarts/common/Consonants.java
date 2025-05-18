package com.anjoriarts.common;

public class Consonants {
    // company details
    public static final String COMPANY_NAME = "Anjori Arts";
    public static final String COMPANY_EMAIL_1 = "anjoriarts@gmail.com";
    public static final String COMPANY_EMAIL_2 = "anjoriarts@outlook.com";
    public static final String ZONE_ID = "Asia/Kolkata";
    // messages
    public static final int EXPIRATION_TIME_IN_MINUTES = 10;
    public static final int RESEND_TIME_IN_MINUTES = 1;
    public static final String INTERNAL_SERVER_ERROR = "Internal Server Error..";
    // roles
    public static final String USER_ROLE = "ROLE_USER";
    public static final String ADMIN_ROLE = "ROLE_ADMIN";

    // cloudinary path
    public static final String ARTWORKS_PATH = "Anjori/arts/%s/artworks/%s"; //first s is env, 2nd s is slug
    public static final String CUSTOM_ORDERS_PATH = "Anjori/arts/%s/custom-orders/%s"; //first s is env, 2nd s is custom order id
    public static final String USER_PROFILE_IMAGES_PATH = "Anjori/arts/%s/users/%s/profile"; //first s is env, 2nd s is user id

    // redis keys
    public static final String REDIS_VISITORS_KEY =  "anjori-%s:visitors";
    public static final String REDIS_ACTIVE_USERS_KEY = "anjori-%s:active-users";
    public static final String REDIS_UNIQUE_VISITORS_KEY = "anjori-%s:unique-visitors";

    // order
    public static final String ORDER_INITIAL_STATE = "Pending";

}
