import { Route, Routes } from "react-router-dom";
import NotFound from "../pages/NotFound/NotFound";

interface Props {
    children: JSX.Element[] | JSX.Element;
}

function RoutesWithNotFound({children} : Props) {
  return (
    <Routes>
        {children}
        <Route path="*" element={<NotFound/>}/>
    </Routes>
  )
}
export default RoutesWithNotFound