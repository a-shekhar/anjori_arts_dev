package com.anjoriarts.entity;

import com.anjoriarts.common.Consonants;
import jakarta.persistence.*;
import lombok.*;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@Entity
@Table(name = "users", schema = "auth")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "username", unique = true)
    private String username;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "country_code")
    private String countryCode =  "+91";

    @Column(name = "phone_no", unique = true)
    private String phoneNo;

    @Column(name = "role")
    private String role = "ROLE_USER";

    @Column(name = "password")
    private String password;

    @Column(name = "profile_image_url")
    private String profileImageUrl;

    @Column(name = "created_at", updatable = false)
    private ZonedDateTime createdAt = ZonedDateTime.now(ZoneId.of(Consonants.ZONE_ID));

    @Column(name = "updated_at")
    private ZonedDateTime updatedAt = ZonedDateTime.now(ZoneId.of(Consonants.ZONE_ID));

    // Optional: update updatedAt on save
    @PreUpdate
    public void onUpdate() {
        updatedAt = ZonedDateTime.now(ZoneId.of(Consonants.ZONE_ID));
    }
}
