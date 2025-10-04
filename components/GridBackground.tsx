export default function Grid() {
    return (
        <>
            {/* Top slanted plane (tilts IN toward center) */}
            <div className="absolute left-0 w-full origin-bottom [top:-30%] h-[60%]
            [transform:perspective(900px)_rotateX(-60deg)]
            [background-image:linear-gradient(to_right,rgba(0,0,0,0.11)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.11)_1px,transparent_1px)]
            [background-size:48px_48px]
            pointer-events-none"
            />

            {/* Center flat grid (anchors the perspective) */}
            <div className="absolute left-0 w-full h-[40%] top-[30%] 
            [background-image:linear-gradient(to_right,rgba(0,0,0,0.11)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.11)_1px,transparent_1px)]
            [background-size:48px_48px]
            pointer-events-none"
            />

            {/* Bottom slanted plane (tilts IN toward center) */}
            <div className="absolute left-0 w-full origin-top [bottom:-30%] h-[60%]
            [transform:perspective(900px)_rotateX(60deg)]
            [background-image:linear-gradient(to_right,rgba(0,0,0,0.11)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.09)_1px,transparent_1px)]
            [background-size:48px_48px]
            pointer-events-none"
            />

            {/* subtle vertical fade to blend joins */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/75 via-transparent to-white/80" />
        </>
    );
}