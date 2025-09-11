package com.backend.repository;

import com.backend.model.domain.ShoppingCart;
import com.backend.model.domain.User;
import com.backend.model.enumaration.ShoppingCartStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {
    Optional<ShoppingCart> findByUserAndStatus(User user, ShoppingCartStatus status);

    List<ShoppingCart> findAllByUserAndStatus(User user, ShoppingCartStatus status);
}
