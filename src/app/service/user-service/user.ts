export class User {
  id!: number;
  fullname!: string;
  srcImageAvatar!: string;
  balance!: number;
  username!: string;
  password!: string;
  authorities: string[] = [];
  listCourse: any[] = [];
  comments: any[] = []
}
