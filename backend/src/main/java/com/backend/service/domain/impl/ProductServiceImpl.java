package com.backend.service.domain.impl;

import com.backend.model.domain.Category;
import com.fasterxml.jackson.core.type.TypeReference;
import com.backend.model.domain.Product;
import com.backend.model.domain.ShoppingCartItem;
import com.backend.model.domain.User;
import com.backend.model.enumaration.ShoppingCartStatus;
import com.backend.repository.ProductRepository;
import com.backend.repository.ShoppingCartRepository;
import com.backend.service.GeminiService;
import com.backend.service.domain.CategoryService;
import com.backend.service.domain.ProductService;
import com.backend.service.domain.UserService;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final CategoryService categoryService;

    private final GeminiService geminiService;

    private final UserService userService;

    private final ShoppingCartRepository shoppingCartRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public ProductServiceImpl(
            ProductRepository productRepository,
            CategoryService categoryService,
            GeminiService geminiService, UserService userService, ShoppingCartRepository shoppingCartRepository) {
        this.productRepository = productRepository;
        this.categoryService = categoryService;
        this.geminiService = geminiService;
        this.userService = userService;
        this.shoppingCartRepository = shoppingCartRepository;
    }

    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public Page<Product> findAll(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    @Override
    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public Optional<Product> update(Long id, Product product) {
        return productRepository.findById(id).map(existingProduct -> {
            if (product.getName() != null) {
                existingProduct.setName(product.getName());
            }
            if (product.getPrice() != null) {
                existingProduct.setPrice(product.getPrice());
            }
            if (product.getCategory() != null && categoryService.findById(product.getCategory().getId()).isPresent()) {
                existingProduct.setCategory(categoryService.findById(product.getCategory().getId()).get());
            }
            return productRepository.save(existingProduct);
        });
    }

    @Override
    public Optional<Product> save(Product product) {
        Optional<Product> savedProduct = Optional.empty();

        if (product.getCategory() != null && categoryService.findById(product.getCategory().getId()).isPresent()) {
            savedProduct = Optional.of(productRepository.save(new Product(
                    product.getName(),
                    product.getPrice(),
                    product.getImageUrl(),
                    product.getCharacteristics(),
                    categoryService.findById(product.getCategory().getId()).get()
            )));
        }
        return savedProduct;
    }

    @Override
    public void deleteById(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public List<Product> findAllIn(List<Long> productIds) {
        return productRepository.findAllByIdIn(productIds);
    }

    @Override
    public Page<Product> findByCategory(Pageable pageable, Long categoryId) {
        return productRepository.findAllByCategoryId(categoryId,pageable);
    }

    @Override
    @Cacheable(value = "recommendations", key = "#username")
    public List<Product> getRecommendedProducts(String username) {
        try {
            User user = userService.findByUsername(username);
            List<Product> pastPurchases = shoppingCartRepository
                    .findAllByUserAndStatus(user, ShoppingCartStatus.FINISHED)
                    .stream()
                    .flatMap(shoppingCart -> shoppingCart.getProducts().stream())
                    .map(ShoppingCartItem::getProduct)
                    .distinct()
                    .toList();
            List<Category> categories = pastPurchases.stream()
                    .map(Product::getCategory)
                    .distinct()
                    .toList();

            List<Product> candidateProducts = productRepository.findAllByCategoryIsIn(categories);

            String pastJson = objectMapper.writeValueAsString(pastPurchases);
            String candidateJson = objectMapper.writeValueAsString(candidateProducts);

            String prompt = """
                    You are a product recommendation engine.

                    Past purchases:
                    %s

                    Candidate products:
                    %s

                    Recommend exactly 10 product IDs from the candidate list only.
                    Return ONLY JSON array of numeric IDs, like:
                    [201, 202, 203]
                    """.formatted(pastJson, candidateJson);

            String response = geminiService.getGeminiResponse(prompt);

            List<Long> ids = objectMapper.readValue(response, new TypeReference<>() {
            });


            Set<Long> candidateIds = candidateProducts.stream()
                    .map(Product::getId)
                    .collect(Collectors.toSet());

            List<Long> validIds = ids.stream()
                    .filter(candidateIds::contains)
                    .toList();


            return productRepository.findAllByIdIn(validIds);

        } catch (Exception e) {
            throw new RuntimeException("Recommendation failed", e);
        }
    }

}
