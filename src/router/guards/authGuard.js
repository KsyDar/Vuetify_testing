import { useUsersStore } from "../../store/users";

export default function authGuard (to, from, next) {
    const userStore = useUsersStore()
    if (userStore.currentUser) {
        return next()
    }
    else {
        return next({name: 'Catalog'})
    }
};