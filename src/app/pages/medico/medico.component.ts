import { MedicoDialogComponent } from './medico-dialog/medico-dialog.component';
import { Medico } from 'src/app/_model/medico';
import { MedicoService } from './../../_service/medico.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  dataSource: MatTableDataSource<Medico>;
  displayedColumns = ['idMedico', 'nombres', 'apellidos', 'cmp', 'acciones'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private medicoService: MedicoService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.medicoService.medicoCambio.subscribe( data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.medicoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  /**
   *
   * @param medico opcional, en el caso de crear un nuevo medico estaria vacio
   * y en el caso de actualizar ingresaria los valores de medico
   */
  abrirDialogo(medico? : Medico){
    let med = medico != null ? medico : new Medico();
    this.dialog.open(MedicoDialogComponent,{
      width: '250px',
      data: med
    });
  }
}
