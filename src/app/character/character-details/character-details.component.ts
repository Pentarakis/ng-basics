import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Character } from '../model/character';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngb-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterDetailsComponent implements OnInit {

  @Input() character$: Observable<Character>;

  character: Character;

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.character$.subscribe(character => {
      this.character = character;
      this.cdRef.markForCheck();
    });
  }

}
