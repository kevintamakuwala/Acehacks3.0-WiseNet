package com.wisenet.backend.entities;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    private String content;

    private LocalDateTime postedAt;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Comment parentComment;

    // Cascade Type.ALL ensures operations on the parent are cascaded to
    // subordinates
    @OneToMany(mappedBy = "parentComment", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> subordinates = new ArrayList<>();

    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "solution_id")
    private Solution solution;

    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public void addSubordinate(Comment comment) {
        comment.setParentComment(this);
        subordinates.add(comment);
    }

    public void removeSubordinate(Comment comment) {
        comment.setParentComment(null);
        this.subordinates.remove(comment);
    }

    // Setter for the entire list of subordinates
    public void setSubordinates(List<Comment> subordinates) {
        this.subordinates.clear();
        if (subordinates != null) {
            this.subordinates.addAll(subordinates);
            for (Comment subordinate : subordinates) {
                subordinate.setParentComment(this);
            }
        }
    }

}
