package com.anjoriarts.util;

import com.anjoriarts.common.Consonants;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

public class CommonUtil {

    //Convert to "2025-05-11T11:27:36.088251Z"; to  11 May 2025, 04:57 PM (IST)
    public static String formatToLocal(String utcTimestamp) {
        ZonedDateTime utcDateTime = ZonedDateTime.parse(utcTimestamp);

        ZonedDateTime localDateTime = utcDateTime.withZoneSameInstant(ZoneId.of(Consonants.ZONE_ID));

        // DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a (z)");

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM yyyy");

        return localDateTime.format(formatter);
    }

}
