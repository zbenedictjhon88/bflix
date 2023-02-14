import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { searchInfo, streaming } from "../../services/SearchService";
import Player from "../components/ArtPlayer";
import Loading from "./Loading";
import Hls from "hls.js";
import CustomCard from "../components/CustomCard";
import swal from "sweetalert";

function Stream(props) {

    let { episodeId, type, id } = useParams();

    const [watch, setWatch] = useState([]);
    const [quality, setQuality] = useState([]);
    const [vidsubtitle, setVidsubtitle] = useState([]);
    const [vidinfo, setVidInfo] = useState([]);

    useEffect(() => {
        streaming(episodeId, type, id)
            .then(response => {

                setWatch(response.data);

                let qualityvid = [];
                for (var i = 0; i < response.data.sources.length; i++) {
                    var q = response['data']['sources'][i]['quality'];
                    var url = response['data']['sources'][i]['url'];
                    if (q == 'auto') {
                        qualityvid[i] = {
                            default: true,
                            html: q,
                            url: url
                        }
                    } else {
                        qualityvid[i] = {
                            html: q,
                            url: url
                        }
                    }
                }
                setQuality(qualityvid);

                let sub = [];
                let selectedsubtitle = {};
                for (var i = 0; i < response.data.subtitles.length; i++) {
                    if (i == 0) {
                        sub[i] = {
                            default: true,
                            html: response.data.subtitles[i]['lang'],
                            url: response.data.subtitles[i]['url']
                        }
                        selectedsubtitle = {
                            lang: response.data.subtitles[i]['lang'],
                            url: response.data.subtitles[i]['url'],
                        };
                    } else {
                        sub[i] = {
                            default: false,
                            html: response.data.subtitles[i]['lang'],
                            url: response.data.subtitles[i]['url']
                        }
                    }

                }
                setVidsubtitle(sub);
            })
            .catch(err => {
                console.log(err);
                //ServerAlert();
            });

        searchInfo(type, id)
            .then(response => {
                setVidInfo(response.data);
            })
            .catch(err => {
                console.log(err)
            });
    }, []);

    function stream(server = 'upcloud') {

    }

    // const ServerAlert = () => {
    //     swal(
    //         "Oops",
    //         "Please select server.",
    //         "warning",
    //         {
    //             buttons: {
    //                 mixdrop: "mixdrop",
    //                 vidcloud: "vidcloud",
    //                 upcloud: "upcloud",
    //             },
    //         }
    //     ).then((value) => {
    //         stream(value);
    //         console.log(value);
    //     });
    // }

    const playM3u8 = (video, url, art) => {
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);

            // optional
            art.hls = hls;
            art.once('url', () => hls.destroy());
            art.once('destroy', () => hls.destroy());
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = url;
        } else {
            art.notice.show = 'Unsupported playback format: m3u8';
        }
    }

    let html = (
        <>


            <div className='container' style={{ marginTop: '25px' }}>
                <div className='row'>
                    <div className='col-lg-12' style={{ marginBottom: '25px' }}>
                        <Player
                            option={{
                                isLive: false,
                                muted: false,
                                autoplay: false,
                                pip: true,
                                autoSize: true,
                                autoMini: true,
                                screenshot: false,
                                setting: true,
                                loop: true,
                                flip: true,
                                playbackRate: true,
                                aspectRatio: true,
                                fullscreen: true,
                                fullscreenWeb: true,
                                subtitleOffset: true,
                                miniProgressBar: true,
                                mutex: true,
                                backdrop: true,
                                playsInline: true,
                                autoPlayback: true,
                                airplay: true,
                                volume: 0.5,
                                container: '.artplayer-app',
                                title: vidinfo.title,
                                poster: vidinfo.image,
                                url: watch.length != 0 ? 'http://cors.consumet.stream/' + watch['sources'][0]['url'] : '',
                                type: 'm3u8',
                                theme: 'red',
                                quality: quality,
                                customType: {
                                    m3u8: playM3u8
                                },
                                moreVideoAttr: {
                                    crossOrigin: 'anonymous',
                                },
                                settings: [
                                    {
                                        html: 'Subtitle',
                                        selector: vidsubtitle,
                                        tooltip: 'Default',
                                        onSelect: function (item) {
                                            this.subtitle.switch(item.url, {
                                                name: item.html,
                                            });

                                            return item.html;
                                        },
                                    },
                                ],
                            }}
                            style={{
                                width: '100%',
                                height: '500px',
                                margin: '0',
                            }}
                            getInstance={(art) => console.info(art)}
                        />
                    </div>
                    <div className='col-lg-3 text-center'>
                        <img src={vidinfo.image} className='info-img' />
                    </div>
                    <div className='col-lg-6 info'>
                        <h1>{vidinfo.title}</h1>
                        <i className='fa fa-star fa-fw'></i> {vidinfo.rating} - <label>{vidinfo.duration}</label>
                        <p>{vidinfo.description}</p>
                        <table style={{ marginTop: '20px' }}>
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
                                    <Link to={'/stream/' + data.id + '/' + type + '/' + id} className="link-side" >
                                        {data.title}
                                    </Link>
                                    <br />
                                </>
                            );
                        }) : ''}
                    </div>
                    <div className='col-lg-12' style={{ marginTop: '100px' }}>
                        <h3 className='header-title'>You May Also Like</h3>
                    </div>
                    {vidinfo.length != 0 ? vidinfo.recommendations.map((data, i) => {
                        return (
                            <CustomCard key={i} url={'/info/' + data.id} image={data.image} title={data.title} type={data.type} />
                        );
                    }) : ''}
                </div>
            </div>
        </>
    );

    return (
        <>
            {watch.length == 0 ? <Loading /> : html}
        </>
    );
}

export default Stream;