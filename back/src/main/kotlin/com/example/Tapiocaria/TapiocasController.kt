package com.example.Tapiocaria

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDateTime

@RestController
@CrossOrigin(origins = ["http://127.0.0.1:5500"])
class TapiocasController(val foodsRepository: FoodsRepository,
                         val filingsRepository: FilingsRepository,
                         val salesRepository: SalesRepository) {

    @GetMapping("/food")
    fun getFilingsByFoodId(@RequestParam("id") id: Int): Map<String, Any>{

        try {
            val food = foodsRepository.findById(id);
            val filings = filingsRepository.getAllFilingsByFoodId(id);

            val response =
                mapOf(
                    "price" to food.get().price,
                    "filings" to filings
                );

            return response;
        }catch(e: Exception){
            return mapOf("error" to e.message.toString());
        }
    }

    @GetMapping("/history")
    fun getHistory(@RequestParam cpf: String): ResponseEntity<List<PurchaseHistory>> {
        val history = salesRepository.getAllSalesByCpfClient(cpf)
        val result = history.map {
            PurchaseHistory(
                date = it.datesale.toString(),
                total = it.price,
                description = it.description
            )
        }
        return ResponseEntity.ok(result)
    }

    data class PurchaseHistory(
        val date: String,
        val total: Double,
        val description: String
    )


    @PostMapping("/payment")
    fun savePurchase(@RequestBody paymentRequest: PaymentRequest): ResponseEntity<String> {
        return try {
            val food = foodsRepository.findById(paymentRequest.idfood).orElseThrow { Exception("Produto não encontrado") }
            val foodName = food.name
            val fillings = paymentRequest.filings
            val fillingsDescription = fillings.joinToString(" e ") { it.name }
            val description = if (fillingsDescription.isNotEmpty()) {
                "$foodName de $fillingsDescription"
            } else {
                foodName
            }
            val sale = Sales(
                id = paymentRequest.idfood,
                idfood = paymentRequest.idfood,
                cpf = paymentRequest.cpf,
                datesale = LocalDateTime.now(),
                description = description,
                price = paymentRequest.price
            )
            salesRepository.save(sale)
            ResponseEntity.ok("Compra salva com sucesso!")
        } catch (e: Exception) {
            ResponseEntity.badRequest().body("Erro ao salvar compra: ${e.message}")
        }
    }


}