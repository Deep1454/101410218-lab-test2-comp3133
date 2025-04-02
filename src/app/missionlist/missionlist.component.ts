import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpacexapiService } from '../network/spacexapi.service';
import { Mission } from '../models/mission';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MissionFilterComponent } from '../missionfilter/missionfilter.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-missionlist',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MissionFilterComponent,
    RouterLink
  ],
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css']
})
export class MissionListComponent implements OnInit {
  missions: Mission[] = [];
  filteredMissions: Mission[] = [];

  constructor(private spacexapiService: SpacexapiService) {}

  ngOnInit(): void {
    this.spacexapiService.getLaunches().subscribe((data) => {
      this.missions = data;
      this.filteredMissions = data;
    });
  }

  applyFilters(filters: {
    year: string;
    launchSuccess: string;
    landingSuccess: string;
  }): void {
    this.filteredMissions = this.missions.filter((mission) => {
      const matchesYear = filters.year
        ? mission.launch_year === filters.year
        : true;
      const matchesLaunchSuccess =
        filters.launchSuccess !== ''
          ? mission.launch_success.toString() === filters.launchSuccess
          : true;
      const matchesLandingSuccess =
        filters.landingSuccess !== ''
          ? mission.rocket.first_stage.cores[0]?.land_success?.toString() ===
            filters.landingSuccess
          : true;

      return matchesYear && matchesLaunchSuccess && matchesLandingSuccess;
    });
  }

  resetFilters(): void {
    this.filteredMissions = [...this.missions];
  }
}