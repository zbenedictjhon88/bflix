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
                                BFLIX Stream is a platform where users can access a wide variety of media content,
                                including movies, TV shows, documentaries, and other videos. BFLIX Stream offers a
                                user-friendly interface that makes it easy to navigate and find the content that you're interested in.
                            </p>
                            <p>
                                We have a vast library of movies and TV shows from around the world,
                                with new content added regularly. Our website uses state-of-the-art streaming technology to
                                ensure that you can watch your favorite shows and movies in high quality.
                            </p>
                            <p>
                                Whether you're in the mood for a classic movie, the latest blockbuster,
                                or binge-watching your favorite TV series, BFLIX Stream has you covered.
                                Our content is available on-demand, so you can watch what you want, when you want.
                            </p>
                            <p>
                                We are committed to providing an exceptional streaming experience to our
                                users, and we are constantly improving and updating our website to make it even
                                better. With BFLIX Stream, you can enjoy the best in entertainment from the comfort of your own home.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Privacy;