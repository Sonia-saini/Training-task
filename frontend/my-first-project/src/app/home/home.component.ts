import { Component,OnInit,OnChanges,SimpleChanges, Input } from '@angular/core';
import {UserdataService} from "../userdata.service";
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
users:any={};
currentPage:number=1;
limit:number=10;
 count=0;
search:string="";
  constructor(private data:UserdataService){
}
Userlist(){
  this.data.getUsers().subscribe((data)=>this.users=data)
}
onSearch(event:any){
  console.log(event.target.value)
this.search=(event.target as HTMLInputElement).value
}
ngOnInit(){
  this.data.getUsers().subscribe(
    data=>this.users=data 
  )
  this.Userlist()
}
onTablepage(event:any){
  this.currentPage=Math.ceil(event);
  this.Userlist()

}

}
