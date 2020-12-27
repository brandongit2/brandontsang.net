import {CSSProperties, ReactNode} from 'react';

export default function ColoredImg({
    src,
    color,
    width = null,
    height = null,
    children = null,
    style = {},
    ...rest
}: {
    src: string;
    color: string;
    width?: string;
    height?: string;
    children?: ReactNode;
    style?: CSSProperties;
    [key: string]: any;
}) {
    return (
        <div
            style={{
                background: color,
                mask: `url(/${src}) center/contain no-repeat`,
                WebkitMask: `url(/${src}) center/contain no-repeat`,
                display: 'inline-block',
                position: 'relative',
                width,
                height,
                ...style
            }}
            {...rest}
        >
            <img
                src={src}
                style={{
                    display: 'inline-block',
                    opacity: 0,
                    width,
                    height
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    top: '0px',
                    left: '0px',
                    width: '100%',
                    height: '100%'
                }}
            >
                {children}
            </div>
        </div>
    );
}
