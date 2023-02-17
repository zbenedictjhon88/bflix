import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { movieSearchInfo } from '../../services/MovieSearchService';
import Loading from './Loading';

function DInfo(props) {

    let { type, id } = useParams();
    const [vidinfo, setVidInfo] = useState([]);

    useEffect(() => {
        movieSearchInfo(type, id, 'dramacool').then(res => {
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
                        <img src={vidinfo.image} className='info-cover' />
                    </div>
                    <div className='col-lg-4 col-md-6 text-center'>
                        <img src={vidinfo.image} className='info-img' />
                    </div>
                    <div className='col-lg-5 col-md-6 info'>
                        <h1>{vidinfo.title}</h1>
                        <p>{vidinfo.description}</p>
                        <table style={{ marginTop: '20px', marginBottom: '20px' }}>
                            <tbody>
                                <tr>
                                    <td className='detail'>Released Date</td>
                                    <td>{vidinfo.releaseDate}</td>
                                </tr>
                                <tr>
                                    <td className='detail'>Other Name(s)</td>
                                    <td>
                                        {vidinfo.length != 0 ? vidinfo.otherNames.map((data, i) => {
                                            var otherNames = vidinfo.otherNames.length != i + 1 ? data + ', ' : data;
                                            return (<>{otherNames}</>);
                                        }) : ''}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {vidinfo.length != 0 ? vidinfo.episodes.map((data, i) => {
                            return (
                                <>
                                    <Link
                                        to={'/dstream/' + data.id + '/' + vidinfo.id}
                                        className="btn btn-danger"
                                        style={{ margin: '3px' }}
                                    >
                                        {data.title}
                                    </Link>
                                </>
                            );
                        }) : ''}
                    </div>
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

export default DInfo;