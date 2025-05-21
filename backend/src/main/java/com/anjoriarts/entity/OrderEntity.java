package com.anjoriarts.entity;

import com.anjoriarts.common.Consonants;
import jakarta.persistence.*;
import lombok.*;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@Entity
@Table(name = "orders")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@ToString
public class OrderEntity {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = true)
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "artwork_id" ,referencedColumnName = "id", nullable = false)
    private ArtworkEntity artwork;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "country_code")
    private String countryCode = "+91";

    @Column(name = "phone_no")
    private String phoneNo;

    @Column(name = "status")
    private String status;

    @Column(name = "created_at")
    private ZonedDateTime createdAt = ZonedDateTime.now(ZoneId.of(Consonants.ZONE_ID));

}
