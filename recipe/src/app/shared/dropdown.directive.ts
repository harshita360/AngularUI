import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector:'[appDropdown]'
})
export class DropdownDirective{
//to dynamically attach or detach the class use HostBinding
@HostBinding('class.open')  isOpen = false;
 //to listen to a click event and execute the function toggleOpen
 @HostListener('click') toggleOpen(){
   this.isOpen=!this.isOpen;
 }
}