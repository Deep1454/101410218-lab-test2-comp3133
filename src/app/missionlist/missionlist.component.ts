import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpacexapiService } from '../network/spacexapi.service';
import { Mission } from '../models/mission';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MissionFilterComponent } from '../missionfilter/missionfilter.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-missionlist',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MissionFilterComponent,
    RouterLink
  ],
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css']
})
export class MissionListComponent implements OnInit {
  missions: Mission[] = [];
  filteredMissions: Mission[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private spacexapiService: SpacexapiService) {}

  ngOnInit(): void {
    this.loadMissions();
  }

  loadMissions(): void {
    this.loading = true;
    this.error = null;
    this.spacexapiService.getLaunches().subscribe({
      next: (data) => {
        this.missions = data;
        this.filteredMissions = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load missions. Please try again later.';
        this.loading = false;
        console.error('Error fetching missions:', err);
      }
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
          ? (mission.launch_success ?? false).toString() === filters.launchSuccess
          : true;
      const matchesLandingSuccess =
        filters.landingSuccess !== ''
          ? (mission.rocket.first_stage.cores[0]?.land_success ?? false).toString() ===
            filters.landingSuccess
          : true;

      return matchesYear && matchesLaunchSuccess && matchesLandingSuccess;
    });
  }

  resetFilters(): void {
    this.filteredMissions = [...this.missions];
  }
}