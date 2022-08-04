import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Avaliacao } from 'src/app/model/Avaliacao';
import { Cliente } from 'src/app/model/Cliente';
import { Livros } from 'src/app/model/Livros';
import { AuthService } from 'src/app/service/auth.service';
import { AvaliacaoService } from 'src/app/service/avaliacao.service';
import { LivrosService } from 'src/app/service/livros.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.css']
})
export class LivroComponent implements OnInit {

  carrinho = environment.carrinho
  livro: Livros

  avaliacao: Avaliacao = new Avaliacao()
  listaAvaliacao: Avaliacao[]
  texto: string

  cliente: Cliente = new Cliente()

  constructor(
    private route: ActivatedRoute,
    private livrosService: LivrosService,
    public authService: AuthService,
    private avaliacaoService: AvaliacaoService
    ) { }

  ngOnInit(){
    let id_livros = this.route.snapshot.params['id_livros']
    this.findByIdLivro(id_livros)
    this.findClienteById(environment.id_cliente)
    this.getAllAvaliacao()
    window.scroll(0,0)
  }

  findByIdLivro(id_livros: number){
    this.livrosService.getLivrosById(id_livros).subscribe((resp: Livros) =>{
      this.livro = resp
    })
  }

  findClienteById(id_cliente: number){
    this.authService.getClienteById(environment.id_cliente).subscribe((resp: Cliente) => {
      this.cliente = resp
    })
  }

  adicionarCarrinho(id_livros: number){
    this.carrinho.push(id_livros)
    Swal.fire('Produto adicionado ao carrinho!')
  }

  getAllAvaliacao(){
    this.avaliacaoService.getAllAvaliacao().subscribe((resp: Avaliacao[]) =>{
      this.listaAvaliacao = resp
    })
  }

  comentario(){
    this.avaliacao.cliente = this.cliente
    this.avaliacao.livros = this.livro

    this.avaliacaoService.adicionar(this.avaliacao).subscribe((resp: Avaliacao) =>{
      this.avaliacao = resp
      Swal.fire(
        'OBRIGADO!',
        'Obrigado pelo comentário!',
        'success'
      )
      this.getAllAvaliacao()
      this.avaliacao = new Avaliacao
    }, erro =>{
      if(erro.status == 500){
        Swal.fire('Você deve digitar algo no campo de comentário!')
      }
    }
    )
  }

  deletar(id: number){
    this.avaliacaoService.delete(id).subscribe(() =>{
      Swal.fire(
        'Apagado!',
        'O comentário foi deletado.',
        'success'
      )
      this.getAllAvaliacao()
    })
  }
}
