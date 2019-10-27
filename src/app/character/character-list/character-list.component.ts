import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from '../character.service';
import { Character } from '../model/character';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'ngb-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<Character>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'culture', 'action'];
  selectedCharacterSubject = new Subject<Character>();
  selectedCharacter$ = this.selectedCharacterSubject.asObservable();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private characterService: CharacterService
  ) { }

  ngOnInit() {
    if (this.table) {
      this.table.renderRows();
    }
  }

  ngAfterViewInit() {
    this.table.dataSource = this.characterService.readAll();
  }

  showDetails(character: Character) {
    this.selectedCharacterSubject.next(character);
  }

  edit(character: Character) {
    this.router.navigate([`./${character.id}`], {
      relativeTo: this.route
    });
  }
  createCharacter() {
    this.router.navigate(['./create'], {
      relativeTo: this.route
    });
  }
}
