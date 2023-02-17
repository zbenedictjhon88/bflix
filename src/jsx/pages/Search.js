import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { movieSearch } from '../../services/MovieSearchService';
import CustomBanner from '../components/CustomBanner';
import CustomCard from '../components/CustomCard';
import Loading from './Loading';
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";

function Search(props) {

    let { id } = useParams();
    const navigate = useNavigate();
    const [video, setVideo] = useState([]);

    const [page, setPage] = useState(1);
    const [flixhq, setFlixhq] = useState([]);
    const [dramacool, setDramacool] = useState([]);

    useEffect(() => {
        movieLoad(id);
    }, [id, prevbtn, nextbtn]);

    function movieLoad(value) {
        movieSearch(value, page, 'flixhq').then(res => {
            if (res.length == 0) {
                //messageAlert();
                return false;
            }

            setFlixhq(res);
        }).catch(err => {
            console.log(err)
        });

        movieSearch(value, page, 'dramacool').then(res => {
            if (res.length == 0) {
                //messageAlert();
                return false;
            }

            setDramacool(res);
        }).catch(err => {
            console.log(err)
        });
    }

    function messageAlert() {

        swal("Write something here:", {
            content: "input",
        }).then((value) => {
            swal(`You typed: ${value}`);
        });
        // swal({
        //     title: "Oops!",
        //     text: "Search Not Found. Try another title.",
        //     icon: "warning",
        //     dangerMode: true,
        //     closeOnClickOutside: false,
        //     content: "input"
        // }).then(val => {
        //     alert(val);
        // })
    }

    function prevbtn(e) {
        e.preventDefault();
        if (page > 1) {
            setPage(page - 1);
        }
    }

    function nextbtn(e) {
        e.preventDefault();
        setPage(page + 1);
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
                            <CustomCard key={i} url={'/hinfo/' + data.id} image={data.image} title={data.title} type={data.type} />
                        );
                    })}
                    {dramacool.map((data, i) => {
                        return (
                            <CustomCard key={i} url={'/dinfo/' + data.id} image={data.image} title={data.title} type='Asian Drama' />
                        );
                    })}
                    <div className='col-lg-12 text-center' style={{ marginTop: '50px' }}>
                        <button onClick={prevbtn} className='btn btn-default'>
                            <BsChevronDoubleLeft />
                        </button>
                        {page}
                        <button onClick={nextbtn} className='btn btn-default'>
                            <BsChevronDoubleRight />
                        </button>
                    </div>
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
