import { Component, ElementRef, ViewChild, OnInit, QueryList, ViewChildren, HostListener } from '@angular/core';
import { DataService } from '../data.service'
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { HtmlTagDefinition } from '@angular/compiler';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { GoogleMapsAPIWrapper } from '@agm/core/services/google-maps-api-wrapper';
import { flatMap } from 'rxjs/operators';
declare var google: any;
@Component({
  selector: 'app-location-search',

  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.css'],
})
export class LocationSearchComponent implements OnInit {
  model: string;
  new_model: any = [];
  myControl = new FormControl();
  options: string[] = [];
  data: any
  x: any;
  results: any[] = [];
  countries: string[] = ["Afghanistan", 'Amsterdam', 'Antwerp', 'Athens', 'Barcelona',
    'Berlin', 'Birmingham', 'Bradford', 'Bremen', 'Brussels', 'Bucharest',
    'Budapest', 'Cologne', 'Copenhagen', 'Dortmund', 'Dresden', 'Dublin', 'Düsseldorf',
    'Essen', 'Frankfurt', 'Genoa', 'Glasgow', 'Gothenburg', 'Hamburg', 'Hannover',
    'Helsinki', 'Leeds', 'Leipzig', 'Lisbon', 'Łódź', 'London', 'Kraków', 'Madrid',
    'Málaga', 'Manchester', 'Marseille', 'Milan', 'Munich', 'Naples', 'Palermo',
    'Paris', 'Poznań', 'Prague', 'Riga', 'Rome', 'Rotterdam', 'Seville', 'Sheffield',
    'Sofia', 'Stockholm', 'Stuttgart', 'The Hague', 'Turin', 'Valencia', 'Vienna',
    'Vilnius', 'Warsaw', 'Wrocław', 'Zagreb', 'Zaragoza', "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central Arfrican Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauro", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre & Miquelon", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St Kitts & Nevis", "St Lucia", "St Vincent", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks & Caicos", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];


  constructor(private _dataService: DataService) { }
  input: any;
  database_data: any = [];
  first: any;
  second: any;
  more: any;
  place: any;

  autocomplete: any;
  session_total = [];
  session: boolean = false;
  session_first: any;
  session_second: any;

  ngOnInit(): void {
    this.session = true;  //Display Suggestions 
    this._dataService.getUsers().subscribe(res => {      //get the provious searched data from service file 
      this.database_data = res;
      try {
        this.first = this.database_data[this.database_data.length - 1].location; //for last search location
        this.second = this.database_data[this.database_data.length - 2].location; //for before last search location 
        this.database_data.pop(); // pop the data last searched location
        this.database_data.pop(); // pop the before last searched location
      }
      catch{
        console.log("Data_reading exception");
      }
      this.more = this.database_data; //display the more data in the list 
    });
    this.autoCompleteSearchBoxInit();  // google api calling for suggestions

  }

  autoCompleteSearchBoxInit() {
    this.input = document.getElementById('autocomplete');  // get the html tag id 
    var autocomplete = new google.maps.places.Autocomplete(this.input); //give suggestions to user 

    google.maps.event.addListener(autocomplete, 'place_changed', () => {  //set the data to text-input box when from the suggestions

      var loc = autocomplete.getPlace();   //get the clicked suggestions from the google api
      console.log(loc.formatted_address);
      this.place = loc.formatted_address;
      //handle your logic using place variable
    });

    google.maps.event.addDomListener(this.input, 'keydown', function (event) {

      // console.log(event);
      if (event.keyCode == 40) {
        // Arrow down
        var loc = autocomplete.getPlace();
        console.log(loc.formatted_address);
        this.place = loc.formatted_address;
      }
      if (event.keyCode == 38) {
        //Arrow up
        var loc = autocomplete.getPlace();
        console.log(loc.formatted_address);
        this.place = loc.formatted_address;
      }
    });

  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // console.log(event);

    if (event.keyCode == COMMA) {
      var autocomplete = new google.maps.places.Autocomplete(this.input);
    }

    if (event.keyCode == ENTER) {
      //Enter 

      this.session = false;
      var response;
      console.log(this.place);
      this._dataService.send_data_to_nodejs(this.place).subscribe(data => {   //send data to service file
        response = data;
        console.log(response, "Response from Nodejs");
      });
      this.session_total.push(this.place); //push the data to local list 
      this.updata_session(); //updated the below the search box suggestions
      this.model = '';
    }
    // if (event.keyCode == 40) {
    //   this.model;
    // }
    // if (event.keyCode == 38) {
    //   this.model;
    // }
  }
  updata_session() {
    if (this.session_total.length > 0) {
      try {
        console.log(this.session_total.length, this.session_total)
        this.session_first = this.session_total[this.session_total.length - 1]
        if (this.session_total.length == 1) {
          console.log("exception");
          console.log(this.second);
          this.session_second = this.first;
        }
        else {
          this.session_second = this.session_total[(this.session_total.length) - 2]
        }

      }
      catch{
        console.log("Exception");
      }

    }
  }

}