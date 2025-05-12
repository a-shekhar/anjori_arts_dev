package com.anjoriarts.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigInteger;
import java.time.ZonedDateTime;

@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private String userId;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    @Column(name = "username")
    private String username;
    @Column(name = "email")
    private String email;
    @Column(name = "country_code")
    private String countryCode;
    @Column(name = "phone_no")
    private BigInteger phoneNo;
    @Column(name = "role")
    private String role;
    @Column(name = "created_at")
    private ZonedDateTime createdAt;
    @Column(name = "modified_at")
    private ZonedDateTime modifiedAt;
    @Column(name = "password")
    private String password;
}
