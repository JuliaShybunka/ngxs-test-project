import {User} from '../../shared/models/user.model'


export class GetAllUsers {
    static readonly type = 'All [USERS]';

    constructor(){}
}

export class RegisterUser {
    static readonly type = 'Register [USER]';

    constructor(public payload: User){}
}


