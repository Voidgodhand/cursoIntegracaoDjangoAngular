import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ApiService } from './api';
import { FormsModule } from '@angular/forms';
import { App } from '../app';

@Component({
  selector: 'app-members-detail',
  imports: [FormsModule],
  templateUrl: './members-detail.html',
  styleUrl: './members-detail.css',
})
export class MembersDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, 
  private api:ApiService,
  private router  : Router,
  private app: App) { }
  
  selected_member = {id: -1, name: '', surname: '', phone: '', email: '', address: ''};
  selected_id: number = -1;

  ngOnInit() {
    this.route.paramMap.subscribe((param: ParamMap) => {
      let id = parseInt(param.get('id') || '0', 10);
      this.selected_id = id;
      this.loadMember(id);
    });
  }

  loadMember(id: number) {
    this.app.mensagemSucesso.set('');
    this.app.mensagemAviso.set('');
    this.app.mensagemErro.set('');
    if (id) {
      this.api.getMember(+id).subscribe({
      next: data => {
        this.selected_member = data;
      },
      error: error => {
        console.log("Ocorreu um erro ao carregar o membro: ", error.message);
        this.app.mensagemErro.set('Ocorreu um erro ao carregar o membro. Por favor, tente novamente.');
      }
    });
    }
    else {
      console.log("Não foi encontrado membro com o id fornecido.");
      this.app.mensagemAviso.set('Não foi encontrado membro com o id fornecido.');
    }
  }

  update() {
    this.app.mensagemSucesso.set('');
    this.app.mensagemAviso.set('');
    this.app.mensagemErro.set('');
    if (this.selected_member) {
      this.api.updateMember(this.selected_member).subscribe({
        next: data => {
          this.selected_member = data;
          this.app.mensagemSucesso.set(`Membro ${this.selected_member.name} alterado com sucesso!`);
          let unit = document.documentElement.scrollHeight / 100;
          window.scrollTo({top:12 * unit, left:0, behavior:"smooth"});
          this.app.ngOnInit();
        },
        error: error => {
          console.log("Ocorreu um erro ao alterar o membro: ", error.message);
          this.app.mensagemErro.set('Ocorreu um erro ao alterar o membro.');
        }
      });
    }
    else {
      console.log("Nenhum membro selecionado para alterar.");
      this.app.mensagemAviso.set('Nenhum membro selecionado para alterar.');
    }
  }

  delete() {
    this.app.mensagemSucesso.set('');
    this.app.mensagemAviso.set('');
    this.app.mensagemErro.set('');
    if (this.selected_member) {
      this.api.deleteMember(this.selected_id).subscribe({
        next: () => {
          if (this.app.members.length > 0) {
            let index: number = -1;
            this.app.members.forEach((e, i) => {
              if (e.id === this.selected_id)
                index = i;
            });
            this.app.mensagemSucesso.set(`Membro ${this.selected_member.name} excluído com sucesso!`);
            let unit = document.documentElement.scrollHeight / 100;
            window.scrollTo({top:12 * unit, left:0, behavior:"smooth"});
            this.app.members.splice(index, 1);
            this.selected_member = {id: -1, name: '', surname: '', phone: '', email: '', address:''};
            this.selected_id = -1;
            this.router.navigate(['../..'], { relativeTo: this.route });
          }
          else {
            console.log("Não existem membros cadastrados.");
            this.app.mensagemAviso.set('Não existem membros cadastrados.');
          }
        },
        error: (error: any) => {
          console.log("Ocorreu um erro ao excluir o membro: ", error.message);
          this.app.mensagemErro.set('Ocorreu um erro ao excluir o membro.');
        }
      });
    }
    else {
      console.log("Nenhum membro selecionado para excluir.");
      this.app.mensagemAviso.set('Nenhum membro selecionado para excluir.');
    }
  }
}

