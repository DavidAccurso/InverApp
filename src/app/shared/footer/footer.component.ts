import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public linkedinUrl : string = 'https://www.linkedin.com/in/david-matias-accurso/';
  public webUrl : string = 'http://davidaccurso.com.ar/';
  
  constructor() { }

  ngOnInit(): void {
  }

}
