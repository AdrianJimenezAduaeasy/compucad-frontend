import { useNavigate } from "react-router-dom";
import { resetUser, userKey } from "../../redux/states/user"
import { clearCookiesUser, clearLocalStorage } from "../../utilities"
import { PublicRoutes } from "../../models";
import { useDispatch } from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from "@mui/material";

function Logout({ compact }: { compact?: boolean }) 
{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logOut = () => {
        clearLocalStorage(userKey);
        clearCookiesUser();
        dispatch(resetUser());
        navigate(PublicRoutes.LOGIN, { replace: true })
    };
  return <Button variant="outlined" color="error" size={compact ? 'small' : 'large'} onClick={logOut} className="bg-red-400 rounded-lg w-full"><LogoutIcon className="w-6/12"/></Button>
}
export default Logout