// user.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  private id: number | null = null;
  private token: string | null = null;
  private fullname: string | null = null;
  private username: string | null = null;
  private roles: string[] | null = null;
  private courses : object| null = null;
  private sharedArray: any[] = [];
  setUserData(id: number,fullname: string, username: string, roles: string[]): void {
    this.id = id;
    this.fullname = fullname;
    this.username = username;
    this.roles = roles;
  }
  setCourseUser( courses: object): void {

    this.courses = courses;
  }
  setShareArray(array: any): void {
    this.courses = array
  }
  getShareArray(): any {
    return this.courses;
  }
  getToken(): string | null {
    return this.token;
  }
  getCourseUser(): object | null {
    return this.courses;
  }
  getUsername(): string | null {
    return this.username;
  }


  getFullname(): string | null {
    return this.fullname;
  }

  setFullname(value: string | null) {
    this.fullname = value;
  }

  getRoles(): string[] | null {
    return this.roles;
  }

  clearUserData(): void {
    this.token = null;
    this.username = null;
    this.roles = null;
    this.courses = null;
  }

  getId(): number | null {
    return this.id;
  }
}
