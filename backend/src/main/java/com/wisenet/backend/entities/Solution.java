package com.wisenet.backend.entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "solutions")
public class Solution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long solutionId;

    private LocalDateTime postedAt;

    private String title;

    @Column(length = Integer.MAX_VALUE)
    private String description1, description2, description3;

    private Long likesCount = 0l;

    @Column(length = Integer.MAX_VALUE)
    private String pdfLink;

    @Column(length = Integer.MAX_VALUE)
    private String certificateLink = null;

    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @JsonBackReference
    @OneToMany(mappedBy = "solution", cascade = CascadeType.ALL)
    private List<SolutionLike> solutionLikes = new ArrayList<>();

    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "challenge_id")
    private Challenge challenge;

    @JsonBackReference
    @OneToMany(mappedBy = "solution", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Comment> comments = new ArrayList<>();
}
