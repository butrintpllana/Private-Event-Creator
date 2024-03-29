import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import UserStore from "./userStore";
import CommonStore from './commonStore';
import ModalStore from "./modalStore";

interface Store {
    // [x: string]: any;
    activityStore: ActivityStore;
    userStore: UserStore;
    commonStore: CommonStore;
    modalStore: ModalStore;
}

export const store: Store = {
    activityStore: new ActivityStore(),
    userStore: new UserStore(),
    commonStore: new CommonStore(),
    modalStore: new ModalStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}