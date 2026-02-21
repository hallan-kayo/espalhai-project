package com.espalhai.controller;

import com.espalhai.model.Ad;
import com.espalhai.model.Favorite;
import com.espalhai.model.User;
import com.espalhai.model.enums.AdStatus;
import com.espalhai.model.enums.AdType;
import com.espalhai.repository.FavoriteRepository;
import com.espalhai.repository.UserRepository;
import com.espalhai.service.AdService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/ads")
@RequiredArgsConstructor
public class AdController {
    private final AdService adService;
    private final UserRepository userRepository;
    private final FavoriteRepository favoriteRepository;

    @GetMapping("/public")
    public List<Ad> getAllAds(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) AdStatus status,
            @RequestParam(required = false) AdType tipo) {
        return adService.filterAds(categoryId, status, tipo);
    }

    @PostMapping
    public ResponseEntity<Ad> createAd(@RequestBody Ad ad, Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow();
        ad.setUsuario(user);
        return ResponseEntity.ok(adService.createAd(ad));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ad> updateAd(@PathVariable Long id, @RequestBody Ad ad) {
        Ad existing = adService.getAdById(id);
        existing.setTitulo(ad.getTitulo());
        existing.setDescricao(ad.getDescricao());
        existing.setValor(ad.getValor());
        existing.setImagens(ad.getImagens());
        existing.setCidade(ad.getCidade());
        existing.setEstado(ad.getEstado());
        existing.setCategoria(ad.getCategoria());
        return ResponseEntity.ok(adService.createAd(existing));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Ad> updateStatus(@PathVariable Long id, @RequestParam AdStatus status) {
        return ResponseEntity.ok(adService.updateStatus(id, status));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAd(@PathVariable Long id) {
        adService.deleteAd(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/favorites")
    public List<Ad> getFavorites(Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow();
        return favoriteRepository.findByUsuario(user).stream()
                .map(Favorite::getAnuncio)
                .collect(Collectors.toList());
    }

    @PostMapping("/{id}/favorite")
    public ResponseEntity<?> toggleFavorite(@PathVariable Long id, Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow();
        Ad ad = adService.getAdById(id);
        return favoriteRepository.findByUsuarioAndAnuncio(user, ad)
                .map(f -> {
                    favoriteRepository.delete(f);
                    return ResponseEntity.ok("Removido dos favoritos");
                })
                .orElseGet(() -> {
                    favoriteRepository.save(Favorite.builder().usuario(user).anuncio(ad).build());
                    return ResponseEntity.ok("Adicionado aos favoritos");
                });
    }

    @GetMapping("/me")
    public List<Ad> getMyAds(Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow();
        return adService.getAdsByUser(user.getId());
    }

    @GetMapping("/user/{userId}/public")
    public List<Ad> getPublicAdsByUser(@PathVariable Long userId) {
        return adService.getActiveAdsByUser(userId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ad> getAdById(@PathVariable Long id) {
        return ResponseEntity.ok(adService.getAdById(id));
    }
}
