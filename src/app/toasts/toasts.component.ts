import { Component, OnInit, Input } from '@angular/core';
declare var $: any

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss']
})
export class ToastsComponent implements OnInit {

  @Input() toastsTime: number
  @Input() toastsStatus: string

  ngOnInit(): void {
    
  }

  ngOnChanges() {
    console.log('ngOnChanges: ')
    this.action(this.toastsTime, this.toastsStatus)
  }

  action(toastsTime: number, toastsStatus: string) {
    console.log('Time get: ', toastsTime)
    console.log('Status get: ', toastsStatus)
  }

}
