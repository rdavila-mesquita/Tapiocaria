package com.example.Tapiocaria

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import java.time.LocalDateTime

@Entity
@Table(name = "sales")
data class Sales(
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    val id: Int = 0,
    val idfood: Int,
    val cpf: String,
    val datesale: LocalDateTime,
    val description: String,
    val price: Double
)

interface SalesRepository: JpaRepository<Sales, Int> {
    @Query("select * from sales where cpf = :cpf", nativeQuery = true)
    fun getAllSalesByCpfClient(@Param("cpf") cpf: String): List<Sales>
}