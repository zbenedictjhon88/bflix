import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Header(props) {
    const navigate = useNavigate();
    var base_url = window.location.origin;
    const [browse, setBowse] = useState('');
    const searchVid = (e) => {
        if (browse != '') {
            return navigate('search/' + browse)
        }
    }
    return (
        <>
            <div className="container" style={{paddingTop: '20px', paddingBottom: '20px'}}>
                <div className="row">
                    <div className="col-lg-12 text-center">
                        asd
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;