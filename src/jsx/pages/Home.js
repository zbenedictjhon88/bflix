import React, { useEffect, useState } from 'react';

import Loading from './Loading';
import CustomBanner from '../components/CustomBanner';
import CustomCard from '../components/CustomCard';
import SEO from '../../common/SEO';

import { movieSearch } from '../../services/MovieSearchService';

function Home(props) {

    const [video, setVideo] = useState([]);

    useEffect(() => {
        movieSearch('latest movies').then(res => {
            setVideo(res.results);
        }).catch(err => {
            console.log(err);
        })
    }, []);

    let html = (
        <>
            <SEO title="Home" />
            <CustomBanner />
            <div className='container' style={{ marginTop: '-250px' }}>
                <div className='row'>
                    <div className='col-lg-12'>
                        <h3 className='header-title'>Latest Movies</h3>
                    </div>
                    {video.length != 0 ? video.map((data, i) => {
                        return (
                            <CustomCard
                                key={i}
                                url={'hinfo/' + data.id + '/' + 1}
                                image={data.image}
                                title={data.title}
                                type={data.type}
                            />
                        );
                    }) : ''}
                </div>
            </div>
        </>
    );

    return (
        <>
            {video.length == 0 ? <Loading /> : html}
        </>
    );
}

export default Home;
