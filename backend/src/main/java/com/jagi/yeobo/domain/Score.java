package com.jagi.yeobo.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "score")
public class Score {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "score_id")
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "attraction_id")
    private Attraction attractionId;

    @Column
    private double score;
}