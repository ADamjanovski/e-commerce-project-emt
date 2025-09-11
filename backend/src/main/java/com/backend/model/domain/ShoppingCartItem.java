package com.backend.model.domain;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@AllArgsConstructor
public class ShoppingCartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    private Product product;

    private long quantity;

    @ManyToOne(optional = false)
    @JoinColumn(name = "cart_id")
    private ShoppingCart cart;
    public ShoppingCartItem(Product product, long quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    public ShoppingCartItem() {

    }

    public ShoppingCartItem(Product product, ShoppingCart shoppingCart, long quantity) {
        this.cart= shoppingCart;
        this.product = product;
        this.quantity = quantity;

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public long getQuantity() {
        return quantity;
    }

    public void setQuantity(long quantity) {
        this.quantity = quantity;
    }
}
