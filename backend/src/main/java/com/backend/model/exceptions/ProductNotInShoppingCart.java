package com.backend.model.exceptions;

public class ProductNotInShoppingCart extends RuntimeException {

    public ProductNotInShoppingCart(Long productId,String username) {
        super(String.format("User with username: %s doesn't have product with id %d in cart", username,productId));
    }
}
