package com.espalhai.service;

import com.espalhai.model.Ad;
import com.espalhai.model.Category;
import com.espalhai.model.enums.AdStatus;
import com.espalhai.model.enums.AdType;
import com.espalhai.repository.AdRepository;
import com.espalhai.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdService {
    private final AdRepository adRepository;
    private final CategoryRepository categoryRepository;

    public Ad createAd(Ad ad) {
        validateAd(ad);
        if (ad.getCategoria() == null || ad.getCategoria().getId() == null) {
            Category defaultCat = categoryRepository.findAll().stream().findFirst()
                .orElseGet(() -> categoryRepository.save(new Category(null, "Geral", "Categoria Geral")));
            ad.setCategoria(defaultCat);
        }
        ad.setStatus(AdStatus.ATIVO);
        return adRepository.save(ad);
    }

    private void validateAd(Ad ad) {
        int count = ad.getImagens() != null ? ad.getImagens().size() : 0;
        
        // Validação de Valor Unificado
        if (ad.getValor() == null || ad.getValor() <= 0) {
            String campo = ad.getTipo() == AdType.VAGA ? "Salário" : 
                          ad.getTipo() == AdType.SERVICO ? "Valor do serviço" : "Preço";
            throw new RuntimeException(campo + " deve ser maior que zero.");
        }

        // Validação de Imagens por Tipo
        if (ad.getTipo() == AdType.PRODUTO) {
            if (count < 1 || count > 10) throw new RuntimeException("Produtos devem ter entre 1 e 10 imagens.");
        } else if (ad.getTipo() == AdType.SERVICO) {
            if (count > 3) throw new RuntimeException("Serviços podem ter no máximo 3 imagens.");
        } else if (ad.getTipo() == AdType.VAGA) {
            if (count < 1 || count > 3) throw new RuntimeException("Vagas devem ter entre 1 e 3 imagens.");
        }
    }

    public List<Ad> filterAds(Long categoryId, AdStatus status, AdType tipo) {
        return adRepository.findByFilters(categoryId, status, tipo);
    }

    public List<Ad> getAdsByUser(Long userId) {
        return adRepository.findByUsuarioId(userId);
    }

    public List<Ad> getActiveAdsByUser(Long userId) {
        return adRepository.findByUsuarioIdAndStatus(userId, AdStatus.ATIVO);
    }

    public Ad updateStatus(Long id, AdStatus status) {
        Ad ad = adRepository.findById(id).orElseThrow();
        ad.setStatus(status);
        return adRepository.save(ad);
    }

    public void deleteAd(Long id) {
        adRepository.deleteById(id);
    }

    public Ad getAdById(Long id) {
        return adRepository.findById(id).orElseThrow(() -> new RuntimeException("Anúncio não encontrado"));
    }
}
