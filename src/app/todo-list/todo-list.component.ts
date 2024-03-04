import { Component, EventEmitter, OnInit, Output  } from '@angular/core';
import { TodoListService, Task } from '../todo-list.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  standalone: true,
  imports: [
    CommonModule, ModalComponent, FormsModule, ReactiveFormsModule
  ],
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  tasks: Task[] = [];
  items: any[] = [];
  isEditing: boolean = false;
  showModal: boolean = false;
  taskToEdit: Task | null = null;
  @Output() modalClosed = new EventEmitter<void>();


  forms = new FormGroup({
    name: new FormControl(''),
    description: new FormControl('')
  });

  constructor(private todoListService: TodoListService, private router: Router, private userService: UserService) { }

  get f(){
    return this.forms.controls;
  }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.todoListService.getItems().subscribe(
      (response) => {
        if (Array.isArray(response)) { // Verifica se a resposta é um array
          this.tasks = response;
        } else {
          console.error('Response is not an array:', response);
        }
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  updateTaskCompletion(task: Task): void {
    task.completed = !task.completed;
    const payload = {
      item: {
        completed: task.completed
      }
    };

    // Envia a solicitação PUT para a API
    this.todoListService.updateTask(task.id, payload)
      .subscribe(response => {
        console.log('Item atualizado com sucesso:', response);
      }, error => {
        console.error('Erro ao atualizar o item:', error);
      });
  }

  openEditModal(task: Task): void {
    this.taskToEdit = task; // Define a tarefa a ser editada]
    this.isEditing = true;
    this.showModal = true;
    this.forms.patchValue({
      name: task.name,
      description: task.description
  });
  }


  clearFormFields(): void {
    this.isEditing = false;
    this.forms.reset();
  }
  
  openCreateModal(): void {
    this.isEditing = false;
    this.showModal = true;
    this.forms.reset();
  }

  closeExitModal(): void {
    this.modalClosed.emit();
  }
  
  handleFormSubmit(): void {
    if (this.isEditing) {
        this.editTask(this.taskToEdit); // Chame o método para editar a tarefa aqui
    } else {
        this.createTask(); // Chame o método para criar a tarefa aqui
    }
  }

  createTask(): void {
    const formsData = this.forms.value;
    console.log('ccccc', formsData)
    const payload = {
      item: {
        name: formsData.name,
        description: formsData.description
      }
    };
  
    console.log('ddddd', payload)
  
    this.todoListService.createTask(payload)
      .subscribe(response => {
        console.log('Item criado com sucesso:', response);
        window.location.reload();
      }, error => {
        console.error('Erro ao criar o item:', error);
      });
  }
  

  editTask(task: Task | null): void {
    if (task) { // Verifica se task não é null
      const formsData = this.forms.value;
      console.log('ccccc', formsData)
      const payload = {
        item: {
          name: formsData.name,
          description: formsData.description
        }
      };
    
      console.log('ddddd', payload)
    
      this.todoListService.editTask(task.id, payload)
        .subscribe(response => {
          console.log('Item criado com sucesso:', response);
          window.location.reload();
        }, error => {
          console.error('Erro ao criar o item:', error);
        });
    } else {
      console.error('Tarefa a ser editada é nula.');
    }
  }
  
  logout() {
    this.userService.logoutUser().subscribe(
      () => {
        console.log('User logged out successfully');
        localStorage.removeItem('token'); // Remover o token do localStorage
        this.router.navigateByUrl('/login'); // Redirecionar para a página de login
        window.location.reload();
      },
      error => {
        console.error('Error logging out:', error);
        // Trate os erros de logout aqui, se necessário
      }
    );
  }

  confirmLogout(): void {
    this.logout();
  }

  deleteTask(taskId: number): void {
    this.todoListService.deleteTask(taskId)
      .subscribe(() => {
        // Removendo a tarefa excluída do array de tarefas
        this.tasks = this.tasks.filter(task => task.id !== taskId);
      });
  }
  
}
