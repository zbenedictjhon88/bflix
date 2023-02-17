import banner from '../../assets/images/banner.png';

function CustomBanner(props) {
    return (
        <>
            <img src={banner} className="banner" />
            {/* <div className="banner-gradient"></div> */}
        </>
    )
}

export default CustomBanner;