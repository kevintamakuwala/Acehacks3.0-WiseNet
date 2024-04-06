package com.wisenet.backend.repositories;

import com.wisenet.backend.entities.Comment;
import com.wisenet.backend.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
