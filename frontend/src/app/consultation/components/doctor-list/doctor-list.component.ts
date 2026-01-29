import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ConsultationService } from '../../services/consultation.service';
import { Doctor } from '../../models/consultation.models';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.css'
})
export class DoctorListComponent implements OnInit {
  doctors: Doctor[] = [];
  searchQuery: string = '';

  constructor(private consultationService: ConsultationService) { }

  ngOnInit() {
    this.fetchDoctors();
  }

  onSearch() {
    this.fetchDoctors();
  }

  fetchDoctors() {
    this.consultationService.getDoctors(this.searchQuery).subscribe({
      next: (res) => this.doctors = res,
      error: (err) => console.error(err)
    });
  }
}
