import { useContext } from "react"
import AuthContext from "../contexts/authContext"

const withAuth = (Component) => {
    const EnhancedComponent = (props) => {
        const auth = useContext(AuthContext);

        return (Component ({...props, ...auth}))
    }

    return EnhancedComponent;
}

export default withAuth;