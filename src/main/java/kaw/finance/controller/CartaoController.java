package kaw.finance.controller;

import kaw.finance.dto.RegisterCartaoDto;
import kaw.finance.dto.ResponseCartaoDto;
import kaw.finance.service.CartaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cartao")
public class CartaoController {

    @Autowired
    private CartaoService cartaoService;

    @GetMapping("/{id}")
    public ResponseEntity<Object> findCartaoById(@PathVariable Long id){
        var cartao = cartaoService.findCartaoById(id);
        return ResponseEntity.ok().body(cartao);
    }

    @GetMapping("/all")
    public ResponseEntity<Page<ResponseCartaoDto>> findAll(
            @RequestParam(value = "page", defaultValue = "0")
            Integer page,
            @RequestParam(value = "size", defaultValue = "10")
            Integer size
    ){
        var cartoes = cartaoService.findAll(page, size);
        return ResponseEntity.ok().body(cartoes);
    }

    @PostMapping("/create")
    public ResponseEntity<Object> createCartao(@RequestBody RegisterCartaoDto cartaoDto) {
        var cartaoCriado = cartaoService.createCartao(cartaoDto);
        return ResponseEntity.ok().body(cartaoCriado);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Object> updateGanho(@PathVariable Long id, @RequestBody RegisterCartaoDto cartaoDto) {
        var cartaoAtualizado = cartaoService.updateCartao(id, cartaoDto);
        return ResponseEntity.ok().body(cartaoAtualizado);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> deleteCartao(@PathVariable Long id) {
        cartaoService.deleteCartao(id);
        return ResponseEntity.noContent().build();
    }

}
