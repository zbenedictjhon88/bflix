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
            <header>
             
                <input type="text" onChange={e => setBowse(e.target.value)} placeholder="Search..." name="search" />
                <button className="searh-btn" onClick={searchVid}>Search</button>
            </header>
        </>
    );
}

export default Header;