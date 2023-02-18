import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Player from "../components/ArtPlayer";
import Loading from "./Loading";
import Hls from "hls.js";
import swal from "sweetalert";
import { movieSearchInfo, movieStream } from "../../services/MovieSearchService";

function DStream(props) {

    const navigate = useNavigate();
    let { episodeId, type, id } = useParams();

    const [trycount, setTryCount] = useState(0);
    const [watch, setWatch] = useState([]);
    const [vidinfo, setVidInfo] = useState([]);
    const [quality, setQuality] = useState([]);
    const [vidsubtitle, setVidsubtitle] = useState([]);

    useEffect(() => {
        streaming();
    }, [episodeId, type, id]);

    function streaming(server = 'asianload') {

        movieSearchInfo(type, id, 'dramacool').then(v => {
            setVidInfo(v);
        });

        movieStream(episodeId, type, id, 'dramacool', server).then(w => {
            if (w['status']) {
                setWatch(w.data);

                let qvid = [];
                for (var i = 0; i < w.data.sources.length; i++) {
                    var url = w['data']['sources'][i]['url'];
                    if (i == 0) {
                        qvid[i] = {
                            default: true,
                            html: 'auto',
                            url: url
                        }
                    } else {
                        qvid[i] = {
                            html: 'Q-' + i,
                            url: url
                        }
                    }
                }
                setQuality(qvid);

                let sub = [];
                for (var i = 0; i < w.data.subtitles.length; i++) {
                    if (i == 0) {
                        sub[i] = {
                            default: true,
                            html: w.data.subtitles[i]['lang'],
                            url: w.data.subtitles[i]['url']
                        }
                    } else {
                        sub[i] = {
                            default: false,
                            html: w.data.subtitles[i]['lang'],
                            url: w.data.subtitles[i]['url']
                        }
                    }
                }
                setVidsubtitle(sub);

            } else {
                updateWatchServer(w['error'])
            }
        });
    }

    function updateWatchServer(message) {
        if (trycount < 3) {
            swal(
                "Oops",
                message + '. Please try other server below. Thank you!',
                "warning",
                {
                    closeOnClickOutside: false,
                    buttons: {
                        mixdrop: {
                            text: "MIXDROP",
                            value: "mixdrop",
                        },
                        asianload: {
                            text: "ASIANLOAD",
                            value: "asianload",
                        },
                        streamtape: {
                            text: "STREAMTAPE",
                            value: "streamtape",
                        },
                        streamsb: {
                            text: "STREAMSB",
                            value: "streamsb",
                        },
                    },
                }
            ).then((value) => {
                setTryCount(trycount + 1);
                streaming(value);

            });
        } else {
            swal(
                "Oops",
                "Please go back to the prevous page, then try another link. Thank you!",
                "warning",
                {
                    closeOnClickOutside: false,
                    buttons: {
                        confirm: {
                            text: "OK",
                            value: true,
                        },
                    },
                }
            ).then((value) => {
                if (value) {
                    navigate('/hinfo/' + type + '/' + id);
                }
            });
        }
    }

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
                <div className="row">
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
                                lang: navigator.language.toLowerCase(),
                                url: watch.length != 0 ? 'https://cors.consumet.stream/' + watch['sources'][0]['url'] : '',
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
                            getInstance={(art) => {
                                // console.log(art);
                            }}
                        />
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
                                            return (
                                                <>
                                                    <p key={i}>{otherNames}</p>
                                                </>
                                            );
                                        }) : ''}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
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

export default DStream;