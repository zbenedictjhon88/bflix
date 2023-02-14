import banner from '../../assets/images/img-1.jpg';

function CustomBanner(props) {
    return (
        <>
            <img src={banner} className="banner" />
            <div className="banner-gradient"></div>
        </>
    )
}

export default CustomBanner;