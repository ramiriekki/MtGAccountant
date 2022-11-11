
export class User {
  login_name?: string;
  email?: string;
  password!: string
  is_logged_In?: boolean // TODO save to local storage
}
