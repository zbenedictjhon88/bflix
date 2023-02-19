import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { movieSearch } from '../../services/MovieSearchService';
import CustomBanner from '../components/CustomBanner';
import CustomCard from '../components/CustomCard';
import Loading from './Loading';
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";

function Search(props) {

    let { id, pageno } = useParams();
    const navigate = useNavigate();
    const [video, setVideo] = useState([]);

    const [page, setPage] = useState(1);
    const [flixhq, setFlixhq] = useState([]);
    const [dramacool, setDramacool] = useState([]);
    const [fhasNextPage, setFhasNextPage] = useState(true);
    const [dhasNextPage, setDhasNextPage] = useState(true);

    useEffect(() => {
        movieLoad(id);
    }, [id, prevbtn, nextbtn]);

    function movieLoad(value) {
        movieSearch(value, pageno, 'flixhq').then(res => {
            if (res.length == 0) {
                return false;
            }

            setFlixhq(res.results);
            setFhasNextPage(res.hasNextPage)
        }).catch(err => {
            console.log(err)
        });

        movieSearch(value, pageno, 'dramacool').then(res => {
            if (res.length == 0) {
                //messageAlert();
                return false;
            }

            setDramacool(res.results);
            setDhasNextPage(res.hasNextPage)
        }).catch(err => {
            console.log(err)
        });
    }

    function prevbtn(e) {
        e.preventDefault();
        if (fhasNextPage == true || dhasNextPage == true) {
            if (page > 1) {
                setPage(page - 1);
                navigate('/search/' + id + '/' + page);
            }
        }

    }

    function nextbtn(e) {
        e.preventDefault();
        if (fhasNextPage == true || dhasNextPage == true) {
            setPage(page + 1);
            navigate('/search/' + id + '/' + page);
        }
    }

    let html = (
        <>
            <CustomBanner />
            <div className='container' style={{ marginTop: '-250px' }}>
                <div className='row'>
                    <div className='col-lg-12'>
                        <h3 className='header-title'>Search: {id}</h3>
                    </div>

                    {flixhq.map((data, i) => {
                        return (
                            <CustomCard key={i} url={'/hinfo/' + data.id + '/' + pageno} image={data.image} title={data.title} type={data.type} />
                        );
                    })}

                    {dramacool.map((data, i) => {
                        return (
                            <CustomCard key={i} url={'/dinfo/' + data.id + '/' + pageno} image={data.image} title={data.title} type='Asian Drama' />
                        );
                    })}

                    {/* <div className='col-lg-12 text-center' style={{ marginTop: '50px', marginBottom: '50px' }}>
                        <button onClick={prevbtn} className='btn btn-default'>
                            <BsChevronDoubleLeft />
                        </button>
                        {pageno}
                        <button onClick={nextbtn} className='btn btn-default'>
                            <BsChevronDoubleRight />
                        </button>
                    </div> */}
                </div>
            </div>
        </>
    );

    return (
        <>
            {flixhq.length == 0 ? <Loading /> : html}
        </>
    );
}

export default Search;
