package com.espalhai.controller;

import com.espalhai.model.Ad;
import com.espalhai.model.User;
import com.espalhai.model.enums.AdStatus;
import com.espalhai.repository.UserRepository;
import com.espalhai.service.AdService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/ads")
@RequiredArgsConstructor
public class AdController {
    private final AdService adService;
    private final UserRepository userRepository;

    @GetMapping("/public")
    public List<Ad> getAllAds(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) AdStatus status) {
        return adService.filterAds(categoryId, status);
    }

    @PostMapping
    public ResponseEntity<Ad> createAd(@RequestBody Ad ad, Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow();
        ad.setUsuario(user);
        return ResponseEntity.ok(adService.createAd(ad));
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
}
