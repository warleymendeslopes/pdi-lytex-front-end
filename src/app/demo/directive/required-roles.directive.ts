import {
    Directive,
    ElementRef,
    Input,
    OnChanges,
    Renderer2,
  } from '@angular/core';
  import { RolesService } from './roles.service';
  
  @Directive({
    selector: '[requiredRole]',
  })
  export class RequiredRolesDirective implements OnChanges {
    @Input() requiredRole: string | undefined;
  
    constructor(
      private rolesService: RolesService,
      private elRef: ElementRef,
      private renderer: Renderer2
    ) {
      this.validateAccess();
    }
  
    ngOnChanges(): void {
      this.validateAccess();
    }
  
    private validateAccess(): void {
      if (this.requiredRole && !this.rolesService.hasRole(this.requiredRole)) {
        this.renderer.setAttribute(this.elRef.nativeElement, 'disabled', 'true');
        this.renderer.setStyle(this.elRef.nativeElement, 'display', 'none');
      }
    }
  }
  