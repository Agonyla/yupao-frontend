import myAxios from "../plugins/myAxios.ts";
import {setCurrentUserState} from "../states/user.ts";

export const getCurrnetUser = async () => {
    // const user: UserType = getCurrentUserState()
    // if (user) {
    //     return user;
    // }
    const res = await myAxios.get("/user/current")
    if (res.code === 0) {
        setCurrentUserState(res.data);
        return res.data;
    }
    return null;
}
