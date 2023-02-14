import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { search } from '../../services/SearchService';
import CustomBanner from '../components/CustomBanner';
import CustomCard from '../components/CustomCard';
import Loading from './Loading';

function Search(props) {

    let { id } = useParams();
    const [video, setVideo] = useState([]);

    useEffect(() => {
        search(id)
            .then(response => {
                if (response.data.results != 0) {
                    setVideo(response.data.results);
                } else {
                    video.length = 1;
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, [id]);

    let html = (
        <>
            <CustomBanner />
            <div className='container banner-bottom'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <h3 className='header-title'>Search: {id}</h3>
                    </div>
                    {video.map((data, i) => {
                        return (
                            <CustomCard key={i} url={'/info/' + data.id} image={data.image} title={data.title} type={data.type} />
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

export default Search;
