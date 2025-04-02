import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-missionfilter',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule
  ],
  templateUrl: './missionfilter.component.html',
  styleUrls: ['./missionfilter.component.css']
})
export class MissionFilterComponent {
  year: string = '';
  launchSuccess: string = '';
  landingSuccess: string = '';

  @Output() filterChange = new EventEmitter<{
    year: string;
    launchSuccess: string;
    landingSuccess: string;
  }>();
  @Output() resetFilters = new EventEmitter<void>();

  onFilter(): void {
    this.filterChange.emit({
      year: this.year,
      launchSuccess: this.launchSuccess,
      landingSuccess: this.landingSuccess
    });
  }

  onReset(): void {
    this.year = '';
    this.launchSuccess = '';
    this.landingSuccess = '';
    this.resetFilters.emit();
  }
}