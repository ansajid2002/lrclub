// AmpImage.js
import { useAmp } from 'next/amp';

export const config = { amp: 'hybrid' }

const AmpImage = ({ src, alt, width, height }) => {
    const isAmp = useAmp();

    console.log(isAmp);
    if (isAmp) {
        return (
            <div>
                <amp-img
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    layout="responsive"
                />
            </div>
        );
    }

    return (
        <div>
            <img
                src={src}
                alt={alt}
                width={width}
                height={height}
                loading="lazy"
            />
        </div>
    );
};

export default AmpImage;
