package com.backend.service.domain;

import com.backend.model.domain.Product;
import com.backend.model.domain.ShoppingCart;

import java.util.List;
import java.util.Optional;

public interface ShoppingCartService {

    List<Product> listAllProductsInShoppingCart(Long cartId);

    Optional<ShoppingCart> getActiveShoppingCart(String username);

    Optional<ShoppingCart> addProductToShoppingCart(String username, Long productId);

    Optional<ShoppingCart> removeProductToShoppingCart(String username, Long productId);

    Optional<ShoppingCart> checkout(Long id,String username);

    List<ShoppingCart> pastCarts(String username);

    Optional<ShoppingCart> getShoppingCartById(Long id);
}
