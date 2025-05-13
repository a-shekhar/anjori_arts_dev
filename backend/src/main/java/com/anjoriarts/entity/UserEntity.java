package com.anjoriarts.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigInteger;
import java.time.ZonedDateTime;

@Entity
@Table(name = "users")
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

    @Column(name = "first_name", nullable = false, length = 30)
    private String firstName;

    @Column(name = "last_name", length = 30)
    private String lastName;

    @Column(name = "username", length = 20, unique = true)
    private String username;

    @Column(name = "email", length = 50, unique = true)
    private String email;

    @Column(name = "country_code", length = 5)
    private String countryCode =  "+91";

    @Column(name = "phone_no", length = 10, unique = true)
    private BigInteger phoneNo;

    @Column(name = "role", length = 15)
    private String role = "ROLE_USER";

    @Column(name = "password", length = 100)
    private String password;

    @Column(name = "profile_image_url", columnDefinition = "TEXT")
    private String profileImageUrl;

    @Column(name = "created_at", updatable = false)
    private ZonedDateTime createdAt = ZonedDateTime.now();

    @Column(name = "updated_at")
    private ZonedDateTime updatedAt = ZonedDateTime.now();

    // Optional: update updatedAt on save
    @PreUpdate
    public void onUpdate() {
        updatedAt = ZonedDateTime.now();
    }
}
