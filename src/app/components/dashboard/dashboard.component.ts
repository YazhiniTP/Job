import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../../services/candidate.service';
import { Candidate } from '../model/candidate';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  candidates: Candidate[];

  constructor(private candidateService: CandidateService) {
    this.candidateService.getCandidates()
    .subscribe(candidates => {
      console.log(candidates);
      this.candidates = candidates;
    });
   }

  ngOnInit() {
  }

}
