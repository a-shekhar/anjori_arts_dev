package com.anjoriarts.entity;

import com.anjoriarts.common.Consonants;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigInteger;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "custom_orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class CustomOrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Nullable for guest users
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = true) // ✅ Optional
    private UserEntity user;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "country_code")
    private String countryCode = "+91";

    @Column(name = "phone_no")
    private BigInteger phoneNo;

    @Column(name = "art_type")
    private String artType;

    @Column(name = "surface")
    private String surface;

    @Column(name = "medium")
    private String medium;

    @Column(name = "budget")
    private String budget;

    @Column(name = "preferred_size")
    private String preferredSize;

    @Column(name = "no_of_copies")
    private String noOfCopies;

    @Column(name = "additional_notes")
    private String additionalNotes;

    @Column(name = "suggest_options")
    private boolean suggestOptions;

    @Column(name = "quoted_price")
    private Double quotedPrice;

    @Column(name = "agreed_price")
    private Double agreedPrice;

    @Column(name = "status")
    private String status;

    @Column(name = "created_at")
    private ZonedDateTime createdAt = ZonedDateTime.now(ZoneId.of(Consonants.ZONE_ID));

    @OneToMany(mappedBy = "customOrder", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CustomOrderImagesEntity> images = new ArrayList<>();


}
