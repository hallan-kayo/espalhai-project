package com.espalhai.model;

import com.espalhai.model.enums.AdStatus;
import com.espalhai.model.enums.AdType;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "ads")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titulo;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String descricao;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category categoria;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User usuario;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AdType tipo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private AdStatus status = AdStatus.ATIVO;

    @Builder.Default
    private LocalDateTime dataCriacao = LocalDateTime.now();

    @ElementCollection
    @CollectionTable(name = "ad_images", joinColumns = @JoinColumn(name = "ad_id"))
    @Column(name = "image_base64", columnDefinition = "LONGTEXT")
    private List<String> imagens;

    // Localização do Anúncio
    private String cidade;
    private String estado;

    private Double preco;
    private Double salario;
    private Double valorServico;
}
