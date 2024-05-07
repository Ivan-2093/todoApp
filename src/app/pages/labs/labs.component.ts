import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],//librerias
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})

export class LabsComponent {
  //Variables publicas
  welcome = 'Bienvenidos a TodoApp Codiesel';
  tasks = signal([
    'Instalar Angular Cli',
    'Crear Proyecto',
    'Crear Componentes',
    'Crear Servicios',

  ]);
  developer = signal('Sergio Galvis');
  age = 30;
  isDisabled = true;
  pathImg = 'https://images.pexels.com/photos/17580598/pexels-photo-17580598/free-photo-of-animal-en-pie-de-pie-negro.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  wImg = 100;
  //Variables privadas
  private birth = '1993-05-20';
  cumple = this.birth;
  //Objetos
  person = signal({
    name: 'Ivan Esteban',
    age: 15,
    avatar: 'https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671142.jpg?t=st=1714748588~exp=1714752188~hmac=d566281370fdadfa8402263796705360e53bc69336323fd060397f6c46cf1e4b&w=826'
  })

  clickHandler() {
    alert('Click me');
  }

  valueInput = '';

  changeTextInput(event: Event) {
    console.info('Change text',event)
    const elementInput = event.target as HTMLInputElement;
    this.valueInput = elementInput.value;
  }

  keyDownHandler(event: Event) {
    console.info('Keydown text',event)
    const elementInput = event.target as HTMLInputElement;
    console.info('Keydown text',elementInput)
  }

  changeSignal(event: Event) {
    console.info('Change Signal',event)
    const elementInput = event.target as HTMLInputElement;
    console.info('Change Signal',elementInput.value)

    this.developer.set(elementInput.value);
  }

  changeAge(event: Event){
    const elementInput = event.target as HTMLInputElement;
    const inputValue = elementInput.value;
    this.person.update(prevState => {
      return {
        ...prevState,
        age: parseInt(inputValue,10)
      }
    })
  }

  changeNamePerson(event: Event){
    const elementInput = event.target as HTMLInputElement;
    const inputValue = elementInput.value;
    this.person.update(prevState => {
      return {
        ...prevState,
        name: inputValue
      }
    })
  }

  //
  colorCtrl = new FormControl();

  constructor(){
    this.colorCtrl.valueChanges.subscribe(value => {
      console.log(value);
    });
  }

  widthCtrl = new FormControl(50,{
    nonNullable:true,
  });

  nameCtrl = new FormControl('Sergio',{
    nonNullable:true,
    validators: [
      Validators.required,
      Validators.minLength(3)
    ]
  });





}
