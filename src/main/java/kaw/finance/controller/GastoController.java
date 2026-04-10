package kaw.finance.controller;

import jakarta.transaction.Transactional;
import kaw.finance.dto.RegisterGastoDto;
import kaw.finance.dto.ResponseGastoDto;
import kaw.finance.model.enums.Situacao;
import kaw.finance.service.GastoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/gasto")
public class GastoController {

    @Autowired
    private GastoService service;

    @GetMapping("/{id}")
    public ResponseEntity<Object> findGasto(@PathVariable Long id) {
        var gasto = service.findById(id);
        return ResponseEntity.ok().body(gasto);
    }

    @GetMapping("/all")
    public ResponseEntity<Page<ResponseGastoDto>> findAllGastos(
            @RequestParam(value = "page", defaultValue = "0")
            Integer page,
            @RequestParam(value = "size", defaultValue = "10")
            Integer size,
            @RequestParam(value = "situacao", required = false)
            Situacao situacao
            ) {
        Page<ResponseGastoDto> gastos = service.findAll(page, size, situacao);
        return ResponseEntity.ok(gastos);
    }

    @PostMapping("/create")
    @Transactional
    public ResponseEntity<Object> createGasto(@RequestBody RegisterGastoDto dto) {
        var gasto = service.createGasto(dto);
        return ResponseEntity.ok().body(gasto);
    }

    @DeleteMapping("/delete/{id}")
    @Transactional
    public ResponseEntity<Object> deleteGasto(@PathVariable Long id) {
        service.deleteGasto(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update/{id}")
    @Transactional
    public ResponseEntity<Object> updateGasto(@PathVariable Long id, @RequestBody RegisterGastoDto dto) {
        var gastoAtualizado = service.updateGasto(id, dto);
        return ResponseEntity.ok().body(gastoAtualizado);
    }

}
