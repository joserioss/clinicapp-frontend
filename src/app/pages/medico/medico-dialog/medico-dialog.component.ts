import { MedicoService } from './../../../_service/medico.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Medico } from 'src/app/_model/medico';

@Component({
  selector: 'app-medico-dialog',
  templateUrl: './medico-dialog.component.html',
  styleUrls: ['./medico-dialog.component.css']
})
export class MedicoDialogComponent implements OnInit {

  medico : Medico;

  constructor(
    private dialogRef: MatDialogRef<MedicoDialogComponent>, //Para tener control del dialogo y poder ocupar .close()
    @Inject(MAT_DIALOG_DATA) private data: Medico,
    private medicoService: MedicoService
    ) { }

  ngOnInit(): void {
    //this.medico = this.data; //hace referencia al mismo bloque de memoria
    this.medico = new Medico();
    this.medico.idMedico = this.data.idMedico;
    this.medico.nombres = this.data.nombres;
    this.medico.apellidos = this.data.apellidos;
    this.medico.cmp = this.data.cmp;
    this.medico.fotoUrl = this.data.fotoUrl;
  }

  cancelar(){
    this.dialogRef.close();
  }
}
