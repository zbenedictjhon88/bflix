import bg from '../../assets/images/about-banner.png'
function Privacy(props) {
    return (
        <>
            <div className="about-banner" style={{ backgroundImage: 'url(' + bg + ')' }}>
                <div className='container'>
                    <div className="row">
                        <div className="col-lg-6 col-md-8">
                            <h3>Privacy Policy</h3>
                            <p>
                                Welcome to our BFLIX Stream.
                                We respect your privacy and are committed to protecting your personal information.
                                This Privacy Policy explains how we collect, use, and share your information when you use our BFLIX Stream.
                            </p>
                            <ul>
                                <li>
                                    Information We Collect: We may collect personal information such as your name, and email address,
                                    when you sign up for our BFLIX Stream. We may also collect information about
                                    your use of our BFLIX Stream, such as your IP address, browser type, and device type.
                                </li>
                                <li>
                                    Data Security: We take reasonable measures to protect your
                                    personal information from unauthorized access, disclosure, and destruction.
                                </li>
                                <li>
                                    Changes to Privacy Policy: We may change this Privacy Policy at any
                                    time and without notice. Your continued use of our website after any changes to this
                                    Privacy Policy constitutes your acceptance of the new policy.
                                </li>
                                <li>
                                    Contact Us: If you have any questions or concerns about
                                    this Privacy Policy, please contact us at bflixstream@gmail.com.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Privacy;