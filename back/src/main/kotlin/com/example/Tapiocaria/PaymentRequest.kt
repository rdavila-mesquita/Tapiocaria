package com.example.Tapiocaria

data class Filing(val name: String, val price: Double)

data class PaymentRequest(
    val id: Int,
    val idfood: Int,
    val cpf: String,
    val filings: List<Filing>,
    val price: Double
)
