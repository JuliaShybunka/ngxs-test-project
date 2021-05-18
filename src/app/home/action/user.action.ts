import {User} from '../../shared/models/user.model'

export class GetAllUsers{
    static readonly type = 'All [USERS]';
    constructor(){}
}

export class UpdateUser{
    static readonly type = 'Update [USER]';
    constructor(public payload: User){}
}

export class DeleteUser{
    static readonly type = 'Delete [USER]';
    constructor(public payload: User){}
}

export class CreateUser{
    static readonly type = 'Create [USER]';
    constructor(public payload: User){}
}