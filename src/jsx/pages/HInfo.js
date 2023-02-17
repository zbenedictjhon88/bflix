import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { movieSearchInfo } from '../../services/MovieSearchService';
import CustomCard from '../components/CustomCard';
import Loading from './Loading';

function HInfo(props) {

    let { type, id } = useParams();
    const [vidinfo, setVidInfo] = useState([]);

    useEffect(() => {
        movieSearchInfo(type, id).then(res => {
            setVidInfo(res);
        }).catch(err => {
            console.log(err);
        });
    }, [type, id]);


    let html = (
        <>
            <div className='container' style={{ marginTop: '25px' }}>
                <div className='row'>
                    <div className='col-lg-12' style={{ marginBottom: '25px' }}>
                        <img src={vidinfo.cover} className='info-cover' />
                    </div>
                    <div className='col-lg-4 col-md-6 text-center'>
                        <img src={vidinfo.image} className='info-img' />
                    </div>
                    <div className='col-lg-5 col-md-6 info'>
                        <h1>{vidinfo.title}</h1>
                        <i className='fa fa-star fa-fw'></i> {vidinfo.rating} - <label>{vidinfo.duration}</label>
                        <p>{vidinfo.description}</p>
                        <table style={{ marginTop: '20px', marginBottom: '20px' }}>
                            <tbody>
                                <tr>
                                    <td className='detail'>Country</td>
                                    <td>{vidinfo.country}</td>
                                </tr>
                                <tr>
                                    <td className='detail'>Genre</td>
                                    <td>
                                        {vidinfo.length != 0 ? vidinfo.genres.map((data, i) => {
                                            var genre = vidinfo.genres.length != i + 1 ? data + ', ' : data;
                                            return (<>{genre}</>);
                                        }) : ''}
                                    </td>
                                </tr>
                                <tr>
                                    <td className='detail'>Released</td>
                                    <td>{vidinfo.releaseDate}</td>
                                </tr>
                                <tr>
                                    <td className='detail'>Production</td>
                                    <td>{vidinfo.production}</td>
                                </tr>
                                <tr>
                                    <td className='detail'>Casts</td>
                                    <td>
                                        {vidinfo.length != 0 ? vidinfo.casts.map((data, i) => {
                                            var cast = vidinfo.casts.length != i + 1 ? data + ', ' : data;
                                            return (<>{cast}</>);
                                        }) : ''}
                                    </td>
                                </tr>
                                <tr>
                                    <td className='detail'>Tags</td>
                                    <td>
                                        {vidinfo.length != 0 ? vidinfo.tags.map((data, i) => {
                                            var tag = vidinfo.tags.length != i + 1 ? data + ' ' : data;
                                            return (<>{tag}</>);
                                        }) : ''}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {vidinfo.length != 0 ? vidinfo.episodes.map((data, i) => {
                            return (
                                <>
                                    <Link
                                        to={'/hstream/' + data.id + '/' + type + '/' + id}
                                        className="btn btn-danger"
                                        style={{ margin: '3px' }}
                                    >
                                        {data.title}
                                    </Link>
                                </>
                            );
                        }) : ''}

                    </div>
                    <div className='col-lg-12' style={{ marginTop: '100px' }}>
                        <h3 className='header-title'>You May Also Like</h3>
                    </div>
                    {vidinfo.length != 0 ? vidinfo.recommendations.map((data, i) => {
                        return (
                            <CustomCard
                                key={i}
                                url={'/hinfo/' + data.id}
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
            {vidinfo.length == 0 ? <Loading /> : html}
        </>
    );
}

export default HInfo;