import { Injectable } from '@angular/core';

const appRoles: string[] = ['admin', 'user', 'visitor', 'superadmin'];

@Injectable({ providedIn: 'root' })
export class RolesService {
  // This service is just for this showcase, you would usually have some authService and verify the roles
  // in the users JWT claim
  hasRole(role: string): boolean {
    //return appRoles.indexOf(role) > -1;
    return false
  }
}
