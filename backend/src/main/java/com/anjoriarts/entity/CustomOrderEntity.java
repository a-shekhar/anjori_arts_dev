package com.anjoriarts.entity;

import com.anjoriarts.common.Consonants;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.math.BigInteger;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "custom_orders", schema = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class CustomOrderEntity {

    @Id
    @GeneratedValue(generator = "order-id-generator")
    @GenericGenerator(
            name = "order-id-generator",
            strategy = "com.anjoriarts.entity.OrderIdGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(name = "seq_name", value = "custom_orders")
            }
    )
    @Column(name = "id", nullable = false, updatable = false)
    private String id;

    // Nullable for guest users
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = true)
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
    private String phoneNo;

    @ManyToOne
    @JoinColumn(name = "art_type_code", referencedColumnName = "code")
    private ArtTypeEntity artType;

    @ManyToOne
    @JoinColumn(name = "surface_code", referencedColumnName = "code")
    private SurfaceEntity surface;

    @ManyToMany
    @JoinTable(
            name = "custom_order_medium",
            joinColumns = @JoinColumn(name = "custom_order_id"),
            inverseJoinColumns = @JoinColumn(name = "medium_code")
    )
    private List<MediumEntity> medium = new ArrayList<>();

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

    @ManyToOne
    @JoinColumn(name = "status_code", referencedColumnName = "code")
    private OrderStatusEntity status;

    @Column(name = "created_at", updatable = false)
    private ZonedDateTime createdAt = ZonedDateTime.now(ZoneId.of(Consonants.ZONE_ID));

    @OneToMany(mappedBy = "customOrder", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CustomOrderImagesEntity> images = new ArrayList<>();

    @Column(name = "updated_at")
    private ZonedDateTime updatedAt;
}
