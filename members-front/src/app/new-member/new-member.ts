import { Component, OnInit, signal } from '@angular/core';
import { ApiService } from '../api';
import { FormsModule } from '@angular/forms';
import { App } from '../app';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-member',
  imports: [FormsModule],
  templateUrl: './new-member.html',
  styleUrl: './new-member.css',
})
export class NewMemberComponent implements OnInit {

  member = { name: '', surname: '', phone: '' , email: '', address: ''}; 

  constructor(private api: ApiService, 
    private app: App, 
    private router: Router,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit() { 
    this.app.mensagemSucesso.set('');
    this.app.mensagemErro.set('');
  }

  save() {
    this.app.mensagemSucesso.set('');
    this.app.mensagemErro.set('');
    this.api.saveNewMember(this.member).subscribe({
      next: (data: any) => {
        this.app.members.push(data);
        this.app.mensagemSucesso.set(`Membro ${this.member.name} cadastrado com sucesso!`);
        let unit = document.documentElement.scrollHeight / 100;
        window.scrollTo({top:12 * unit, left:0, behavior:"smooth"});
        this.member = { name: '', surname: '', phone: '' , email: '', address: ''};
        this.app.ngOnInit();
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      error: (error: any) => {
        console.log("Ocorreu um erro ao cadastrar o novo membro: ", error.message);
        this.app.mensagemErro.set('Ocorreu um erro ao cadastrar o novo membro. Por favor, tente novamente.');
      }
    });
  }
}
