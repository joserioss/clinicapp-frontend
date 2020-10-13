import { Paciente } from './../../../_model/paciente';
import { PacienteService } from './../../../_service/paciente.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-paciente-edicion',
  templateUrl: './paciente-edicion.component.html',
  styleUrls: ['./paciente-edicion.component.css']
})
export class PacienteEdicionComponent implements OnInit {

  form: FormGroup;

  //Variables de apollo
  id: number;
  edicion: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pacienteServive: PacienteService
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombres': new FormControl(''),
      'apellidos': new FormControl(''),
      'rut': new FormControl(''),
      'direccion': new FormControl(''),
      'telefono': new FormControl('')
    });

    this.route.params.subscribe((params: Params) =>{
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  initForm(){
    if(this.edicion){
      this.pacienteServive.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.idPaciente),
          'nombres': new FormControl(data.nombres),
          'apellidos': new FormControl(data.apellidos),
          'rut': new FormControl(data.rut),
          'direccion': new FormControl(data.direccion),
          'telefono': new FormControl(data.telefono)
        });
      });
    }
  }

  operar(){
    let paciente = new Paciente();
    paciente.idPaciente = this.form.value['id'];
    paciente.nombres = this.form.value['nombres'];
    paciente.apellidos = this.form.value['apellidos'];
    paciente.rut = this.form.value['rut'];
    paciente.direccion = this.form.value['direccion'];
    paciente.telefono = this.form.value['telefono'];

    if(this.edicion){
      this.pacienteServive.modificar(paciente).subscribe( () => {
        this.pacienteServive.listar().subscribe(data => {
          this.pacienteServive.pacienteCambio.next(data);
        });
      });
    }else{
      this.pacienteServive.registrar(paciente).subscribe( () => {
        this.pacienteServive.listar().subscribe(data => {
          this.pacienteServive.pacienteCambio.next(data);
        });
      });
    }
    this.router.navigate(['paciente']);
  }

}
