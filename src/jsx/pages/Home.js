import { search } from '../../services/SearchService';
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
            setVideo(res);
        }).catch(err => {
            console.log(err);
        })
    }, []);

    let html = (
        <>
            <CustomBanner />
            <div className='container' style={{ marginTop: '-250px' }}>
                <div className='row'>
                    <div className='col-lg-12'>
                        <h3 className='header-title'>Latest Movies</h3>
                    </div>
                    {video.map((data, i) => {
                        return (
                            <CustomCard
                                key={i}
                                url={'hinfo/' + data.id}
                                image={data.image}
                                title={data.title}
                                type={data.type}
                            />
                        );
                    })}
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
