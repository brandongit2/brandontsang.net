import Link from 'next/link';

export default function Index() {
    return (
        <div>
            <p>nothing here....</p>
            <p>
                but if u wanna see a thing{' '}
                <Link href="/experiments/shaded-text">
                    <a>click here</a>
                </Link>
            </p>
        </div>
    );
}
