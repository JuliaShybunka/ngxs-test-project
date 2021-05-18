import { State, Action, StateContext, Selector } from '@ngxs/store';
import { User } from '../../shared/models/user.model';
import { GetAllUsers, RegisterUser } from '../action/authorization.actions';
import { AuthorizationService } from '../../shared/services/authorization.service';
import { tap } from 'rxjs/operators';


export class AuthorizationStateModel{
    users: User[];
}

@State<AuthorizationStateModel>({
    name: 'users',
    defaults: {
        users: []
    }
})

export class AuthorizationState {
    constructor(private authorizationService: AuthorizationService){

    }

    @Selector()
    static getUsers(state: AuthorizationStateModel){
        return state.users
    }

    @Action(GetAllUsers)
    getAllUsers({patchState, getState}: StateContext<AuthorizationStateModel>){
        console.log('state')
        return this.authorizationService.getAllUsers().pipe(
            tap(res => {
                patchState({...getState(), users: res})
            })
        )
    }

    @Action(RegisterUser)
    add({patchState, getState}: StateContext<AuthorizationStateModel>, {payload}: RegisterUser){
        return this.authorizationService.registerUser(payload).pipe(tap(res => {
            patchState({ ...getState().users, users: res })
        }));
    }
}

