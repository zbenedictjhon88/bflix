import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { searchInfo } from '../../services/SearchService';
import Loading from './Loading';

function Info(props) {

    let { type, id } = useParams();
    const [vidinfo, setVidInfo] = useState([]);

    useEffect(() => {
        searchInfo(type, id).then(response => {
            setVidInfo(response.data);
        }).catch(err => {
            console.log(err);
        });
    }, [searchInfo]);


    let information = (
        <>
            <div className='container' style={{marginTop: '10px'}}>
                <div className='row'>
                    <div className='col-lg-12' style={{marginBottom: '50px'}}>
                        <img src={vidinfo.cover} className='info-cover' />
                    </div>
                    <div className='col-lg-3 text-center'>
                        <img src={vidinfo.image} className='info-img' />
                    </div>
                    <div className='col-lg-6 info-desc'>
                        <h1>{vidinfo.title}</h1>
                        <i className='fa fa-star fa-fw'></i> {vidinfo.rating} - <label>{vidinfo.duration}</label>
                        <p>{vidinfo.description}</p>
                        <table>
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


                    </div>
                    <div className='col-lg-3'>
                        {vidinfo.length != 0 ? vidinfo.episodes.map((data, i) => {
                            return (
                                <>
                                    <Link to={'/stream/' + data.id + '/' + type + '/' + id} className="ep-list-text" >
                                        {data.title}
                                    </Link>
                                    <br />
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
            {vidinfo.length == 0 ? <Loading /> : information}
        </>
    );
}

export default Info;