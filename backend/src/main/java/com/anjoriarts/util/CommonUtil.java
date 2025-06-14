package com.anjoriarts.util;

import com.anjoriarts.common.Consonants;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

public class CommonUtil {

    // convert to MM-YYYY
    public static String formatToMonYear(String utcTimestamp) {
        ZonedDateTime utcDateTime = ZonedDateTime.parse(utcTimestamp);

        ZonedDateTime localDateTime = utcDateTime.withZoneSameInstant(ZoneId.of(Consonants.ZONE_ID));

        // DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a (z)");

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM yyyy");

        return localDateTime.format(formatter);
    }

    public static String normalizeString(List<String> mediums) {
        return mediums.stream()
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .sorted()
                .collect(Collectors.joining(", "));
    }

    // convert to MM YYYY
    public static String formatToLocalDate(String utcTimestamp) {
        ZonedDateTime utcDateTime = ZonedDateTime.parse(utcTimestamp);

        ZonedDateTime localDateTime = utcDateTime.withZoneSameInstant(ZoneId.of(Consonants.ZONE_ID));

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm");

        return localDateTime.format(formatter);
    }

}
