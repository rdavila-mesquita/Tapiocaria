# Projeto das Tapiocas
Inicialmente desenvolvido em sala com o professor na disciplina de Programação Web 1, com intuito de fazer um site que pudessemos fazer o pedido de uma tapioca, cuscus ou sanduiche, fazer o pagamento e ver o histórico.

## Banco de dados
O banco de dados foi feto com Postgree e foram criadas as tabelas: 

`sales`
![alt text](/imagens/image.png)

`foods`

![alt text](/imagens/image-1.png)

`filings`

![alt text](/imagens/image-2.png)


## Backend 
O backend foi feito em Kotlin usando o framework SpringBoot.Foram feitos os seguintes endpoints:

`/food`

![alt text](/imagens/image-3.png)

Esse endpoint vai listar as opções de recheios de determinada comida (informada pelo id) e informar seus valores.

![alt text](/imagens/image-4.png)

Na imagem acima o id selecionado foi o da tapioca.

`/history`

![alt text](/imagens/image-6.png)

Esse endpoint vai retornar o histórico de compras a partir do CPF do comprador.

![alt text](/imagens/image-5.png)

`/payment`

![alt text](/imagens/image-7.png)

Esse endpoint será responsável pelo pagamento dos produtos.

![alt text](/imagens/image-8.png)

## Frontend
Feito com HMTL, CSS e JavaScript. No JavaScript foram usadas as funções: `carregarPrecos()` essa função vai pegar os dados da tabela foods, `selecionarProduto()` essa função vai guardar os valores dos produtos selecionados e soma-los, `atualizarPreco()`, `processarPagamento()` essa função vai processar o pagamento dos produtos selecionados e um modal para exibir o histórico.

![alt text](/imagens/image-9.png)
![alt text](/imagens/image-10.png)
![alt text](/imagens/image-11.png)
