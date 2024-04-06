package com.wisenet.backend.entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "challenges")
public class Challenge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long challengeId;

    private String title;

    @Column(length = Integer.MAX_VALUE)
    private String description;

    private String author;

    private LocalDateTime postedAt;

    private Long likesCount=0l;
    @Column(length = Integer.MAX_VALUE)
    private String imageUrl;

    @JsonBackReference
    @OneToMany(mappedBy = "challenge", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Solution> solutions = new ArrayList<>();
    @JsonBackReference
    @OneToMany(mappedBy = "challenge", cascade = CascadeType.ALL)
    private List<ChallengeTag> challengeTags = new ArrayList<>();

    @JsonBackReference
    @OneToMany(mappedBy = "challenge", cascade = CascadeType.ALL)
    private List<ChallengeLike> challengeLikes = new ArrayList<>();
}
