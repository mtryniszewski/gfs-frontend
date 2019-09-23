export class LoginRequest {
    email: string;
    password: string;
  }
  export class TokenRequest {
    data: EncodedToken;
  }
  export class EncodedToken {
    token: string;
  }
  export class Token {
    Role: string;
    aud: string;
    exp: number;
    iss: string;
    jti: string;
    nbf: number;
    sub: {
      0: string; // email
      1: string; // imie
      2: string; // nazwisko
      3: string; // id użytkownika
    };
  }
