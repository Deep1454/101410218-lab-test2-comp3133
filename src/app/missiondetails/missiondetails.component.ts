// src/app/missiondetails/missiondetails.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SpacexapiService } from '../network/spacexapi.service';
import { Mission } from '../models/mission';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-missiondetails',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.css']
})
export class MissionDetailsComponent implements OnInit {
  mission: Mission | null = null;

  constructor(
    private route: ActivatedRoute,
    private spacexapiService: SpacexapiService
  ) {}

  ngOnInit(): void {
    const flightNumber = this.route.snapshot.paramMap.get('id');
    if (flightNumber) {
      this.spacexapiService.getMissionById(+flightNumber).subscribe((data) => {
        this.mission = data;
      });
    }
  }
}