import { useEffect } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

function CustomLink(props) {

    useEffect(() => {
        console.log(props)
        if (props.isUserVerified == 'false') {
            swal('Oops', 'asd', 'warning');
        }
    }, [props]);

    return (
        <>
            {props.isUserVerified == 'true' ? <Link to={props.link} className="nav-link">{props.name}</Link> : ''}
            {props.isUserVerified == 'false' ? <Link className="nav-link">{props.name}</Link> : ''}
        </>
    );
}

export default CustomLink;