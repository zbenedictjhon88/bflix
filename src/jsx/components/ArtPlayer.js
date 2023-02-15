import { useEffect, useRef } from 'react';
import Artplayer from 'artplayer';

export default function Player({ option, getInstance, ...rest }) {
    const artRef = useRef();

    useEffect(() => {
        const art = new Artplayer(
            {
                ...option,
                container: artRef.current,
                autoOrientation: true,
            },
        );

        if (getInstance && typeof getInstance === 'function') {
            getInstance(art);
        }

        return () => {
            if (art && art.destroy) {
                art.destroy(false);
            }
            art.on('url', (url) => {
                console.info('url', url);
            })
        };
    }, []);

    return <div ref={artRef} {...rest}></div>;
}
