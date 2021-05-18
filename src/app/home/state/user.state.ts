import { State, Action, StateContext, Selector } from '@ngxs/store';
import { User } from '../../shared/models/user.model';
import { GetAllUsers, UpdateUser, DeleteUser, CreateUser } from '../action/user.action';
import { UserService } from '../../shared/services/user.service';
import { catchError, filter, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

export class UserStateModel{
    allUsers: User[];
}

@State<UserStateModel>({
    name: 'allUsers',
    defaults: {
        allUsers: []
    }
})

export class UserState {
    constructor(private userService: UserService){

    }

    @Selector()
    static getUsers(state: UserStateModel){
        return state
    }

    @Action(GetAllUsers)
    getAllUsers({setState}: StateContext<UserStateModel>){
        console.log('state')
        return this.userService.getAllUsers().pipe(
            tap(res => {
                setState(res)
            })
        )
    }

    @Action(DeleteUser)
    deleteUser({patchState, getState, setState}: StateContext<UserStateModel[]>, {payload}: DeleteUser){
        const allUsers = getState().filter( res => res.id !== payload.id);
        console.log(getState().filter( res => res.id !== payload.id), allUsers, patchState(allUsers) )
        return this.userService.deleteUser(payload).pipe(
            catchError(err=> throwError(err)),
            tap(res =>  setState(allUsers) )
        )
    }

    @Action(UpdateUser)
    UpdateUser(state: StateContext<UserStateModel>, {payload}: UpdateUser){
        const allUsers = state.getState();
        return    this.userService.updateUser(payload.id, payload).pipe(
            catchError(err=> throwError(err)),
            tap(res =>   state.patchState({ ...state, allUsers }))
            
        );
    }

    @Action(CreateUser)
    CreateUser({getState, patchState}: StateContext<UserStateModel>, {payload}: CreateUser){
        debugger;
        return this.userService.createUser(payload).pipe(
            catchError(err => throwError(err)),
            tap(res=>{
                console.log(patchState({ res }))
                patchState(res)
            })
        );
    }

}
