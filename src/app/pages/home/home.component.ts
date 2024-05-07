import { Component, computed, effect, signal,inject, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from './../../models/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IdGeneratorService } from './id-generator.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  tasks = signal<Task[]>([
  ]);

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
    ]
  });

  filter = signal<'all' | 'Pending' | 'Completed'>('all');
  taskByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();

    if (filter === 'Pending') {
      return tasks.filter(task => !task.completed)
    }
    if (filter === 'Completed') {
      return tasks.filter(task => task.completed)
    }
    return tasks;

  });

  injector = inject(Injector);

  constructor(private idGenerator: IdGeneratorService) { }

  ngOnInit(){
    const storage = localStorage.getItem('tasks');
    if(storage){
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks);
      console.info('Run ngOnInit');
    }
    this.trackTasks();
  }

  trackTasks(){
    effect(() => {
      const tasks = this.tasks();
      localStorage.setItem('tasks', JSON.stringify(tasks));
      console.info('Run effect');
    },{
      injector: this.injector
    });
  }


  changeHandler() {

    if (this.newTaskCtrl.valid) {
      console.log(this.newTaskCtrl);
      const value = this.newTaskCtrl.value.trim();
      if (value != "") {
        this.addTask(value);
        this.newTaskCtrl.setValue('');
      }

    }
  }

  addTask(title: string) {

    const newTask = {
      id: this.idGenerator.generateUniqueId(),
      title: title,
      completed: false,
      editing: false
    }

    this.tasks.update((tasks) => [...tasks, newTask]);

  }

  checkCompleted(index: number) {
    /* Los arrays mutables son aquellos en los que se pueden modificar, agregar, eliminar o reordenar elementos después de que se han creado.
        push(), pop(), splice(), shift(), unshift(), entre otros. */
    console.log(this.tasks()[index].completed);
    if (this.tasks()[index].completed) {
      this.tasks()[index].completed = false;
    } else {
      this.tasks()[index].completed = true;
    }
  }

  updateTask(index: string) {
    /* map(), filter(), reduce(), concat(), slice(), etc., que devuelven un nuevo array en lugar de modificar el original. */
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (task.id === index) {
          return {
            ...task,
            completed: !task.completed
          }
        }
        return task;
      })
    })
  }



  deleteTask(index: string) {
    //[1,2].splice(index, 1);//Muta el array
    this.tasks.update((tasks) => tasks.filter((task) => task.id !== index));
  }

  editingTask(index: string) {
    /* map(), filter(), reduce(), concat(), slice(), etc., que devuelven un nuevo array en lugar de modificar el original. */
    this.tasks.update((tasks) => {
      return tasks.map((task) => {
        return {
          ...task,
          editing: (task.id === index),
        }

      })
    })
  }

  editingUpdateTask(index: string, event: Event) {
    /* map(), filter(), reduce(), concat(), slice(), etc., que devuelven un nuevo array en lugar de modificar el original. */
    const input = event.target as HTMLInputElement;
    console.log('Funcion: editingUpdateTask en ejecución!');
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (task.id === index) {
          return {
            ...task,
            title: input.value,
            editing: false
          }
        }
        return task;
      })
    })
  }

  changeFilter(filter: 'all' | 'Pending' | 'Completed') {
    this.filter.set(filter);
  }
  
}
