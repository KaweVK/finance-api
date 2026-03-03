package kaw.finance.controller;

import kaw.finance.dto.RegisterGanhoDto;
import kaw.finance.dto.ResponseGanhoDto;
import kaw.finance.service.GanhoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ganho")
public class GanhoController {

    @Autowired
    private GanhoService ganhoService;

    @GetMapping("/{id}")
    public ResponseEntity<Object> findGanhoById(@PathVariable Long id){
        var ganho = ganhoService.findGanhoById(id);
        return ResponseEntity.ok().body(ganho);
    }

    @GetMapping("/all")
    public ResponseEntity<Page<ResponseGanhoDto>> findAllGanho(
            @RequestParam(value = "page", defaultValue = "0")
            Integer page,
            @RequestParam(value = "size", defaultValue = "10")
            Integer size
    ){
        var ganhos = ganhoService.findAllGanho(page, size);
        return ResponseEntity.ok().body(ganhos);
    }

    @PostMapping("/create")
    public ResponseEntity<Object> createGanho(@RequestBody RegisterGanhoDto ganhoDto) {
        var ganhoCriado = ganhoService.createGanho(ganhoDto);
        return ResponseEntity.ok().body(ganhoCriado);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Object> updateGanho(@PathVariable Long id, @RequestBody RegisterGanhoDto ganhoDto) {
        var ganhoAtualizado = ganhoService.updateGanho(id, ganhoDto);
        return ResponseEntity.ok().body(ganhoAtualizado);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> deleteGanho(@PathVariable Long id) {
        ganhoService.deleteGanho(id);
        return ResponseEntity.ok().build();
    }

}
