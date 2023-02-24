import React, { useEffect, useMemo, useRef, useState } from 'react';
import { GoslingComponent, GoslingRef, embed } from 'gosling.js';
import { debounce, sample } from 'lodash';
import type { RouteComponentProps } from 'react-router-dom';
import generateSpec from './main-spec';
import ErrorBoundary from './error';
import _allDrivers from './data/driver.json';
import _customDrivers from './data/driver.custom.json';
import samples, { SampleType } from './data/samples';
import getOneOfSmallMultiplesSpec from './small-multiples-spec';
import { CHROMOSOMES, THEME, WHOLE_CHROMOSOME_STR } from './constants';
import { ICONS } from './icon';
import './App.css';
import { INTERNAL_SAVED_THUMBNAILS } from './data/external-thumbnails';
import { isChrome } from './utils';
import THUMBNAIL_PLACEHOLDER from './script/img/placeholder.png';
import { Database } from './database';
import { getHtmlTemplate } from './html-template';

const db = new Database();

const DATABSE_THUMBNAILS = await db.get();
const GENERATED_THUMBNAILS = {};

const INIT_VIS_PANEL_WIDTH = window.innerWidth;
const VIS_PADDING = 60;
const ZOOM_PADDING = 200;
const ZOOM_DURATION = 500;

const allDrivers = [
    ...(_allDrivers as any),
    ..._customDrivers.map(d => {
        return { ...d, sample_id: 'SRR7890905' };
    }),
    ..._customDrivers.map(d => {
        return { ...d, sample_id: 'SRR7890905_Hartwig' };
    })
];

function App(props: RouteComponentProps) {
    // URL parameters
    const urlParams = new URLSearchParams(props.location.search);
    // !! instead of using `urlParams.get('external')`, we directly parse the external URL in order to include
    // any inlined parameters of the external link (e.g., private AWS link with authentication info.)
    let externalUrl = null;
    if (props.location.search.includes('external=')) {
        externalUrl = props.location.search.split('external=')[1];
        // remove known parameters
        externalUrl = externalUrl.split('&demoIndex')[0];
        externalUrl = externalUrl.split('&example')[0];
        externalUrl = externalUrl.split('&domain')[0];
    }
    const exampleId = urlParams.get('example');
    const xDomain = urlParams.get('domain')
        ? urlParams
              .get('domain')
              .split('-')
              .map(d => +d)
        : null;
    const demoIndex = useRef(+urlParams.get('demoIndex') ?? 0);
    const [showSmallMultiples, setShowSmallMultiples] = useState(externalUrl === null);
    const [ready, setReady] = useState(externalUrl === null);

    const selectedSamples = useMemo(
        () => (!exampleId ? samples.filter(d => d.group === 'default') : samples.filter(d => d.group === exampleId)),
        [exampleId]
    );

    const gosRef = useRef<GoslingRef>();

    // demo
    const [demo, setDemo] = useState(
        selectedSamples[demoIndex.current < selectedSamples.length ? demoIndex.current : 0]
    );

    const currentSpec = useRef<string>();

    // interactions
    const [showSamples, setShowSamples] = useState(false);
    const [thumbnailForceGenerate, setThumbnailForceGenerate] = useState(false);
    const [generateThumbnails, setGenerateThumbnails] = useState(false);
    const [doneGeneratingThumbnails, setDoneGeneratingThumbnails] = useState(false);
    const [filterSampleBy, setFilterSampleBy] = useState('');
    const [filteredSamples, setFilteredSamples] = useState(selectedSamples);
    const [showOverview, setShowOverview] = useState(true);
    const [showPutativeDriver, setShowPutativeDriver] = useState(true);
    const [interactiveMode, setInteractiveMode] = useState(false);
    const [visPanelWidth, setVisPanelWidth] = useState(INIT_VIS_PANEL_WIDTH - VIS_PADDING * 2);
    const [overviewChr, setOverviewChr] = useState('');
    const [genomeViewChr, setGenomeViewChr] = useState('');
    const [drivers, setDrivers] = useState((allDrivers as any).filter((d: any) => d.sample_id === demo.id && +d.pos));
    const [selectedSvId, setSelectedSvId] = useState<string>('');
    const [breakpoints, setBreakpoints] = useState<[number, number, number, number]>([1, 100, 1, 100]);
    const [bpIntervals, setBpIntervals] = useState<[number, number, number, number] | undefined>();
    const [mouseOnVis, setMouseOnVis] = useState(false);
    const [jumpButtonInfo, setJumpButtonInfo] =
        useState<{ id: string; x: number; y: number; direction: 'leftward' | 'rightward'; zoomTo: () => void }>();
    const mousePos = useRef({ x: -100, y: -100 });
    const prevJumpId = useRef('');

    // SV data
    const leftReads = useRef<{ [k: string]: number | string }[]>([]);
    const rightReads = useRef<{ [k: string]: number | string }[]>([]);
    const [svReads, setSvReads] = useState<{ name: string; type: string }[]>([]);

    // update demo
    useEffect(() => {
        const filteredDrivers = (allDrivers as any).filter((d: any) => d.sample_id === demo.id && +d.pos);
        // console.log(demo, filteredDrivers);
        setDrivers(filteredDrivers);
        setOverviewChr('');
        setGenomeViewChr('');
        setSelectedSvId('');
        leftReads.current = [];
        rightReads.current = [];
    }, [demo]);

    useEffect(() => {
        if (externalUrl) {
            fetch(externalUrl).then(response =>
                response.text().then(d => {
                    let externalDemo = JSON.parse(d);
                    if (Array.isArray(externalDemo) && externalDemo.length >= 0) {
                        setFilteredSamples(externalDemo);
                        externalDemo = externalDemo[demoIndex.current < externalDemo.length ? demoIndex.current : 0];
                        setShowSmallMultiples(true);
                    }
                    if (externalDemo) {
                        setDemo(externalDemo);
                    }
                    setReady(true);
                })
            );
        }
    }, []);

    useEffect(() => {
        prevJumpId.current = jumpButtonInfo?.id;
    }, [jumpButtonInfo]);

    useEffect(() => {
        setFilteredSamples(
            filterSampleBy === '' ? selectedSamples : selectedSamples.filter(d => d.id.includes(filterSampleBy))
        );
    }, [filterSampleBy]);

    useEffect(() => {
        if (!gosRef.current) return;

        gosRef.current.api.subscribe('click', (_, e) => {
            let x = +e.data[0].start1;
            let xe = +e.data[0].end1;
            let x1 = +e.data[0].start2;
            let x1e = +e.data[0].end2;

            // safetly swap
            if (x > x1) {
                x = +e.data[0].start2;
                xe = +e.data[0].end2;
                x1 = +e.data[0].start1;
                x1e = +e.data[0].end1;
            }

            let zoomStart = x;
            let zoomEnd = x1e;
            let padding = (zoomEnd - zoomStart) / 4.0;
            if (e.data[0].svclass === 'Translocation') {
                zoomStart = x;
                zoomEnd = xe;
                padding = 10000;
            }

            gosRef.current.api.zoomTo(
                `${demo.id}-mid-ideogram`,
                `chr1:${zoomStart}-${zoomEnd}`,
                padding,
                ZOOM_DURATION
            );

            // we will show the bam files, so set the initial positions
            setBreakpoints([+x - ZOOM_PADDING, +xe + ZOOM_PADDING, +x1 - ZOOM_PADDING, +x1e + ZOOM_PADDING]);
            setBpIntervals([x, xe, x1, x1e]);
            setSelectedSvId(e.data[0].sv_id + '');

            // move to the bottom
            setTimeout(
                () => document.getElementById('gosling-panel')?.scrollTo({ top: 1000000, behavior: 'smooth' }),
                2000
            );

            leftReads.current = [];
            rightReads.current = [];
        });

        gosRef.current.api.subscribe('mouseOver', (_, e) => {
            const sanitizedChr = (c: string | number) => {
                return `${c}`.replace('chr', '');
            };
            const calDir = (c1: string | number, c2: string | number) => {
                c1 = sanitizedChr(c1);
                c2 = sanitizedChr(c2);
                if (+c1 && +c1 <= 9) {
                    c1 = '0' + c1;
                }
                if (+c2 && +c2 <= 9) {
                    c2 = '0' + c2;
                }
                return c1 < c2 ? 'rightward' : 'leftward';
            };
            if (e.id.includes('-mid-sv') && e.data[0].svclass === 'Translocation') {
                const { chromosome: c, position: p } = e.genomicPosition;
                const padding = 100000;
                if (sanitizedChr(c) === sanitizedChr(e.data[0].chrom1)) {
                    const direction = calDir(c, e.data[0].chrom2);
                    const id = e.data[0].sv_id + '-' + direction;
                    if (id === prevJumpId.current) return;
                    const { start2, end2 } = e.data[0];
                    setJumpButtonInfo({
                        id,
                        x: mousePos.current.x,
                        y: mousePos.current.y,
                        direction,
                        zoomTo: () => gosRef.current.api.zoomTo(e.id, `chr1:${start2}-${end2}`, padding, ZOOM_DURATION)
                    });
                } else {
                    const direction = calDir(c, e.data[0].chrom1);
                    const id = e.data[0].sv_id + '-' + direction;
                    if (id === prevJumpId.current) return;
                    const { start1, end1 } = e.data[0];
                    setJumpButtonInfo({
                        id,
                        x: mousePos.current.x,
                        y: mousePos.current.y,
                        direction,
                        zoomTo: () => gosRef.current.api.zoomTo(e.id, `chr1:${start1}-${end1}`, padding, ZOOM_DURATION)
                    });
                }
            } else {
                setJumpButtonInfo(undefined);
            }
        });

        return () => {
            gosRef.current.api.unsubscribe('click');
            gosRef.current.api.unsubscribe('mouseOver');
        };
    }, [gosRef, drivers]); // !! instead of `[demo]`, we use drivers which are updated as a side effect of a demo

    useEffect(() => {
        if (!gosRef.current || !demo.bai || !demo.bam) return;

        gosRef.current.api.subscribe('rawData', (type: string, e: any) => {
            if (e.id.includes('bam') && (leftReads.current.length === 0 || rightReads.current.length === 0)) {
                const isThisPotentiallyJsonRuleData = typeof e.data[0]?.name === 'undefined';
                if (isThisPotentiallyJsonRuleData) {
                    return;
                }

                /// DEBUG
                // console.log(e.id, e.data);
                ///

                // This means we just received a BAM data that is just rendered
                if (e.id.includes('left') && leftReads.current.length === 0) {
                    leftReads.current = e.data;
                } else if (e.id.includes('right') && rightReads.current.length === 0) {
                    rightReads.current = e.data;
                }

                // !! This is to drop duplicated data records.
                // Multiple tracks overlaid on alignment tracks makes duplicated data records.
                leftReads.current = Array.from(new Set(leftReads.current.map(d => JSON.stringify(d)))).map(d =>
                    JSON.parse(d)
                );
                rightReads.current = Array.from(new Set(rightReads.current.map(d => JSON.stringify(d)))).map(d =>
                    JSON.parse(d)
                );

                // Reads on both views prepared?
                if (leftReads.current.length !== 0 && rightReads.current.length !== 0) {
                    const mates = leftReads.current
                        .filter(l => rightReads.current.filter(r => r.name === l.name && r.id !== l.id).length !== 0)
                        .map(d => d.name as string);

                    const matesWithSv = mates.map(name => {
                        const matesOnLeft = leftReads.current.filter(d => d.name === name);
                        const matesOnRight = rightReads.current.filter(d => d.name === name);

                        if (matesOnLeft.length !== 1 || matesOnRight.length !== 1) {
                            // We do not do anything for this case for now.
                            return { name, type: 'unknown' };
                        }

                        // console.log(matesOnLeft[0], matesOnRight[0]);
                        const ld = matesOnLeft[0].strand;
                        const rd = matesOnRight[0].strand;

                        if (matesOnLeft[0].chrName !== matesOnRight[0].chrName) return { name, type: 'Translocation' };
                        if (ld === '+' && rd === '-') return { name, type: 'Deletion' };
                        if (ld === '-' && rd === '-') return { name, type: 'Inversion (TtT)' };
                        if (ld === '+' && rd === '+') return { name, type: 'Inversion (HtH)' };
                        if (ld === '-' && rd === '+') return { name, type: 'Duplication' };
                        return { name, type: 'unknown' };
                    });

                    if (
                        matesWithSv
                            .map(d => d.name)
                            .sort()
                            .join() !==
                        svReads
                            .map(d => d.name)
                            .sort()
                            .join()
                    ) {
                        setSvReads(matesWithSv);
                    }
                }
            }
        });

        return () => {
            gosRef.current.api.unsubscribe('rawData');
        };
    }, [gosRef, svReads, demo]);

    useEffect(() => {
        if (!overviewChr) return;

        if (overviewChr.includes('chr')) {
            gosRef.current?.api.zoomTo(`${demo.id}-top-ideogram`, overviewChr, 0, 0);
            setTimeout(() => setGenomeViewChr(overviewChr), 0);
        } else {
            gosRef.current?.api.zoomToExtent(`${demo.id}-top-ideogram`, ZOOM_DURATION);
        }
    }, [overviewChr]);

    useEffect(() => {
        if (!genomeViewChr) return;

        if (genomeViewChr.includes('chr')) {
            gosRef.current?.api.zoomTo(`${demo.id}-mid-ideogram`, genomeViewChr, 100000000, ZOOM_DURATION);
        } else {
            gosRef.current?.api.zoomToExtent(`${demo.id}-mid-ideogram`, ZOOM_DURATION);
        }
    }, [genomeViewChr]);

    // change the width of the visualization panel
    useEffect(() => {
        window.addEventListener(
            'resize',
            debounce(() => {
                setVisPanelWidth(window.innerWidth - VIS_PADDING * 2);
            }, 500)
        );
    }, []);

    const getThumbnail = (d: SampleType) => {
        return (
            d.thumbnail ||
            INTERNAL_SAVED_THUMBNAILS[d.id] ||
            DATABSE_THUMBNAILS.find(db => db.id === d.id)?.dataUrl ||
            GENERATED_THUMBNAILS[d.id]
        );
    };

    const smallOverviewWrapper = useMemo(() => {
        // !! Uncomment the following lines to generated specs for making thumbnails.
        // console.log(
        //     'overviewSpec',
        //     filteredSamples.map(d =>
        //         getOneOfSmallMultiplesSpec({
        //             cnvUrl: d.cnv,
        //             svUrl: d.sv,
        //             width: 1200,
        //             title: d.cancer.charAt(0).toUpperCase() + d.cancer.slice(1),
        //             subtitle: d.id, // '' + d.id.slice(0, 20) + (d.id.length >= 20 ? '...' : ''),
        //             cnFields: d.cnFields ?? ['total_cn', 'major_cn', 'minor_cn']
        //         })
        //     ),
        //     filteredSamples.map(d => `node gosling-screenshot.js output/${d.id}.json img/${d.id}.jpeg`).join('\n')
        // );
        // return [];
        /* Load image if necessary */
        const noThumbnail = filteredSamples.filter(d => !getThumbnail(d))[0];
        if (noThumbnail && generateThumbnails) {
            const { id } = noThumbnail;
            const spec = getOneOfSmallMultiplesSpec({
                cnvUrl: noThumbnail.cnv,
                svUrl: noThumbnail.sv,
                width: 600,
                title: noThumbnail.cancer.charAt(0).toUpperCase() + noThumbnail.cancer.slice(1),
                subtitle: id,
                cnFields: noThumbnail.cnFields ?? ['total_cn', 'major_cn', 'minor_cn']
            });
            const hidden = document.getElementById('hidden-gosling');
            embed(hidden, spec, { padding: 0, margin: 10 }).then(api => {
                setTimeout(() => {
                    const { canvas } = api.getCanvas();
                    const dataUrl = canvas.toDataURL('image/png');
                    GENERATED_THUMBNAILS[noThumbnail.id] = dataUrl;
                    db.add(id, dataUrl);
                    setThumbnailForceGenerate(!thumbnailForceGenerate);
                }, 10000);
            });
        }
        if (noThumbnail) {
            setDoneGeneratingThumbnails(false);
        } else {
            setDoneGeneratingThumbnails(true);
        }
        return filteredSamples.map((d, i) => (
            <div
                key={JSON.stringify(d.id)}
                onClick={() => {
                    demoIndex.current = i;
                    setShowSamples(false);
                    setTimeout(() => {
                        setDemo(d);
                    }, 300);
                }}
                className={demo === d ? 'selected-overview' : 'unselected-overview'}
            >
                <div style={{}}>
                    <b>{d.cancer.charAt(0).toUpperCase() + d.cancer.slice(1).split(' ')[0]}</b>
                </div>
                <div style={{ color: 'grey', fontSize: '14px' }}>
                    {'' + d.id.slice(0, 20) + (d.id.length >= 20 ? '...' : '')}
                </div>
                <div style={{ position: 'relative' }}>
                    {getThumbnail(d) ? (
                        <img src={getThumbnail(d)} style={{ width: `${420 / 2}px`, height: `${420 / 2}px` }} />
                    ) : (
                        // <div style={{ marginLeft: 'calc(50% - 105px - 10px)' }}>
                        //     <GoslingComponent
                        //         padding={0}
                        //         margin={10}
                        //         spec={getOneOfSmallMultiplesSpec({
                        //             cnvUrl: d.cnv,
                        //             svUrl: d.sv,
                        //             width: 210,
                        //             title: d.cancer.charAt(0).toUpperCase() + d.cancer.slice(1),
                        //             subtitle: d.id, // '' + d.id.slice(0, 20) + (d.id.length >= 20 ? '...' : ''),
                        //             cnFields: d.cnFields ?? ['total_cn', 'major_cn', 'minor_cn']
                        //         })}
                        //     />
                        // </div>
                        <>
                            <img
                                src={THUMBNAIL_PLACEHOLDER}
                                style={{ width: `${420 / 2}px`, height: `${420 / 2}px` }}
                            />
                            <span className="thumbnail-loading-message">
                                {generateThumbnails ? 'Loading...' : 'Thumbnail Missing'}
                            </span>
                        </>
                    )}
                    <span className="tag-assembly">{d.assembly ?? 'hg38'}</span>
                </div>
                <div className="tag-parent">
                    <div className={'tag-sv'}>SV</div>
                    <div className={d.vcf && d.vcfIndex ? 'tag-pm' : 'tag-disabled'}>Point Mutation</div>
                    <div className={d.vcf2 && d.vcf2Index ? 'tag-id' : 'tag-disabled'}>Indel</div>
                    <div className={d.bam && d.bai ? 'tag-ra' : 'tag-disabled'}>Read Alignment</div>
                    {d.note ? <div className="tag-note">{d.note}</div> : null}
                </div>
            </div>
        ));
        // smallOverviewGoslingComponents.map(([component, spec], i) => (
        //     <div
        //         key={JSON.stringify(spec)}
        //         onClick={() => {
        //             setShowSamples(false);
        //             setTimeout(() => {
        //                 setDemoIdx(i);
        //                 setSelectedSvId('');
        //             }, 300);
        //         }}
        //         className={demoIdx === i ? 'selected-overview' : 'unselected-overview'}
        //     >
        //         {component}
        //     </div>
        // ));
    }, [demo, filteredSamples, thumbnailForceGenerate, generateThumbnails]);

    const goslingComponent = useMemo(() => {
        if (!ready) return null;
        // console.log(demo.id, drivers.length);

        const spec = generateSpec({
            ...demo,
            showOverview,
            xDomain: xDomain as [number, number],
            xOffset: 0,
            showPutativeDriver,
            width: visPanelWidth,
            drivers: demo.drivers ?? drivers,
            selectedSvId,
            breakpoints: breakpoints,
            crossChr: false,
            bpIntervals,
            svReads
        });
        currentSpec.current = JSON.stringify(spec);
        // console.log('spec', spec);
        return (
            <GoslingComponent
                ref={gosRef}
                spec={spec}
                padding={0}
                margin={0}
                experimental={{ reactive: true }}
                theme={THEME}
            />
        );
        // !! Removed `demo` not to update twice since `drivers` are updated right after a demo update.
    }, [ready, xDomain, visPanelWidth, drivers, showOverview, showPutativeDriver, selectedSvId, breakpoints, svReads]);

    return (
        <ErrorBoundary>
            <div
                style={{ width: '100%', height: '100%' }}
                onMouseMove={e => {
                    const top = e.clientY;
                    const left = e.clientX;
                    const width = window.innerWidth;
                    const height = window.innerHeight;
                    if (
                        VIS_PADDING < top &&
                        top < height - VIS_PADDING &&
                        VIS_PADDING < left &&
                        left < width - VIS_PADDING
                    ) {
                        setMouseOnVis(true);
                    } else {
                        setMouseOnVis(false);
                    }
                    mousePos.current = { x: left, y: top };
                }}
                onWheel={() => setJumpButtonInfo(undefined)}
                onClick={() => {
                    if (!mouseOnVis && interactiveMode) setInteractiveMode(false);
                    else if (mouseOnVis && !interactiveMode) setInteractiveMode(true);
                    setJumpButtonInfo(undefined);
                }}
            >
                <svg
                    className="config-button"
                    viewBox="0 0 16 16"
                    visibility={showSmallMultiples ? 'visible' : 'collapse'}
                    onClick={() => {
                        setShowSamples(true);
                    }}
                >
                    <title>Menu</title>
                    <path
                        fillRule="evenodd"
                        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                    />
                </svg>
                <div className="sample-label">
                    {demo.cancer.charAt(0).toUpperCase() + demo.cancer.slice(1) + ' • ' + demo.id}
                    <span className="title-btn" onClick={() => gosRef.current?.api.exportPng()}>
                        <svg className="button" viewBox="0 0 16 16">
                            <title>Export Image</title>
                            {ICONS.PNG.path.map(p => (
                                <path fill="currentColor" key={p} d={p} />
                            ))}
                        </svg>
                    </span>
                    <span
                        className="title-btn"
                        onClick={() => {
                            const a = document.createElement('a');
                            a.setAttribute(
                                'href',
                                `data:text/plain;charset=utf-8,${encodeURIComponent(
                                    getHtmlTemplate(currentSpec.current)
                                )}`
                            );
                            a.download = 'visualization.html';
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                        }}
                        style={{ marginLeft: 40 }}
                    >
                        <svg className="button" viewBox="0 0 16 16">
                            <title>Export HTML</title>
                            {ICONS.HTML.path.map(p => (
                                <path fill="currentColor" key={p} d={p} />
                            ))}
                        </svg>
                    </span>
                    <span
                        className="title-btn"
                        onClick={() => {
                            const a = document.createElement('a');
                            a.setAttribute(
                                'href',
                                `data:text/plain;charset=utf-8,${encodeURIComponent(currentSpec.current)}`
                            );
                            a.download = 'visualization.json';
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                        }}
                        style={{ marginLeft: 70 }}
                    >
                        <svg className="button" viewBox="0 0 16 16">
                            <title>Export Gosling Spec (JSON)</title>
                            {ICONS.JSON.path.map(p => (
                                <path fill="currentColor" key={p} d={p} />
                            ))}
                        </svg>
                    </span>
                    <span
                        className="title-btn"
                        onClick={() => {
                            const { xDomain } = gosRef.current.hgApi.api.getLocation(`${demo.id}-mid-ideogram`);
                            if (xDomain) {
                                // urlParams.set('demoIndex', demoIndex.current + '');
                                // urlParams.set('domain', xDomain.join('-'));
                                let newUrl = window.location.origin + window.location.pathname + '?';
                                newUrl += `demoIndex=${demoIndex.current}`;
                                newUrl += `&domain=${xDomain.join('-')}`;
                                if (externalUrl) {
                                    newUrl += `&external=${externalUrl}`;
                                }
                                navigator.clipboard
                                    .writeText(newUrl)
                                    .then(() =>
                                        alert('The URL of the current session has been copied to your clipboard.')
                                    );
                            }
                        }}
                        style={{ marginLeft: 100 }}
                    >
                        <svg className="button" viewBox="0 0 16 16">
                            <title>Export Link</title>
                            <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
                            <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
                        </svg>
                    </span>
                    <a
                        className="title-btn"
                        href="https://sehilyi.github.io/goscan/docs/"
                        target="_blank"
                        style={{ marginLeft: 140 }}
                        rel="noreferrer"
                    >
                        <svg className="button" viewBox="0 0 16 16">
                            <title>Open Documentation</title>
                            <path d="M8.646 5.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 8 8.646 6.354a.5.5 0 0 1 0-.708zm-1.292 0a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708-.708L5.707 8l1.647-1.646a.5.5 0 0 0 0-.708z" />
                            <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                            <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
                        </svg>
                    </a>
                    {!isChrome() ? (
                        <a
                            style={{ marginLeft: '100px', color: 'black', fontWeight: 'bold' }}
                            href="https://www.google.com/chrome/downloads/"
                        >
                            Warning: This page is optimized for Google Chrome.
                        </a>
                    ) : null}
                </div>
                {demo.bam && demo.bai ? (
                    <div className="help-label">
                        <span
                            style={{ border: '1.4px solid gray', borderRadius: 10, padding: '0px 6px', margin: '6px' }}
                        >
                            {'?'}
                        </span>
                        {'Click on a SV to see alignment around breakpoints'}
                    </div>
                ) : null}
                <div id="vis-panel" className="vis-panel">
                    <div className={'vis-overview-panel ' + (!showSamples ? 'hide' : '')}>
                        <div className="title">
                            Samples
                            <small>{` (Total of ${filteredSamples.length})`}</small>
                            <input
                                type="text"
                                className="sample-text-box"
                                placeholder="Search samples by ID"
                                onChange={e => setFilterSampleBy(e.target.value)}
                                hidden
                            />
                            <svg
                                className="button"
                                viewBox="0 0 16 16"
                                onClick={() => {
                                    setShowSamples(false);
                                }}
                            >
                                <title>Close</title>
                                <path
                                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                            <button
                                className="thumbnail-generate-button"
                                onClick={() => setGenerateThumbnails(!generateThumbnails)}
                                style={{ visibility: doneGeneratingThumbnails ? 'hidden' : 'visible' }}
                            >
                                {generateThumbnails ? 'Stop Generating Thumbnails' : 'Generate Missing Thumbnails'}
                            </button>
                        </div>
                        <div className="overview-container">{smallOverviewWrapper}</div>
                    </div>
                    <div
                        id="gosling-panel"
                        className="gosling-panel"
                        style={{
                            width: `calc(100% - ${VIS_PADDING * 2}px)`,
                            height: `calc(100% - ${VIS_PADDING * 2}px)`,
                            padding: VIS_PADDING
                        }}
                    >
                        {goslingComponent}
                        {jumpButtonInfo ? (
                            <button
                                className="jump-to-bp-btn"
                                style={{
                                    position: 'fixed',
                                    left: `${
                                        jumpButtonInfo.x + 20 + (jumpButtonInfo.direction === 'leftward' ? -60 : 0)
                                    }px`,
                                    top: `${jumpButtonInfo.y}px`
                                }}
                                onClick={() => jumpButtonInfo.zoomTo()}
                            >
                                {jumpButtonInfo.direction === 'leftward' ? '←' : '→'}
                            </button>
                        ) : null}
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                boxShadow: `inset 0 0 0 3px ${
                                    interactiveMode && mouseOnVis
                                        ? '#2399DB'
                                        : !interactiveMode && mouseOnVis
                                        ? 'lightgray'
                                        : !interactiveMode && !mouseOnVis
                                        ? '#00000000'
                                        : 'lightgray'
                                }`,
                                top: VIS_PADDING,
                                left: VIS_PADDING,
                                opacity: 0.9,
                                pointerEvents: interactiveMode ? 'none' : 'auto'
                            }}
                        />
                        <div
                            style={{
                                pointerEvents: 'none',
                                width: '100%',
                                height: '100%',
                                position: 'relative',
                                zIndex: 998
                            }}
                        >
                            <select
                                style={{
                                    pointerEvents: 'auto',
                                    top: '3px'
                                }}
                                className="nav-dropdown"
                                onChange={e => {
                                    setShowSamples(false);
                                    const chr = e.currentTarget.value;
                                    setTimeout(() => setOverviewChr(chr), 300);
                                }}
                                value={overviewChr}
                                disabled={!showOverview}
                            >
                                {[WHOLE_CHROMOSOME_STR, ...CHROMOSOMES].map(chr => {
                                    return (
                                        <option key={chr} value={chr}>
                                            {chr}
                                        </option>
                                    );
                                })}
                            </select>
                            <select
                                style={{
                                    pointerEvents: 'auto',
                                    // !! This should be identical to how the height of circos determined.
                                    top: `${Math.min(visPanelWidth, 600)}px`
                                }}
                                className="nav-dropdown"
                                onChange={e => {
                                    setShowSamples(false);
                                    const chr = e.currentTarget.value;
                                    setTimeout(() => setGenomeViewChr(chr), 300);
                                }}
                                value={genomeViewChr}
                                disabled={!showOverview}
                            >
                                {CHROMOSOMES.map(chr => {
                                    return (
                                        <option key={chr} value={chr}>
                                            {chr}
                                        </option>
                                    );
                                })}
                            </select>
                            <svg
                                className="gene-search-icon"
                                viewBox="0 0 16 16"
                                style={{
                                    top: `${Math.min(visPanelWidth, 600) + 6}px`
                                    // visibility: demo.assembly === 'hg38' ? 'visible' : 'hidden'
                                }}
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                                />
                            </svg>
                            <input
                                type="text"
                                className="gene-search"
                                placeholder="Search Gene (e.g., MYC)"
                                // alt={demo.assembly === 'hg38' ? 'Search Gene' : 'Not currently available for this assembly.'}
                                style={{
                                    pointerEvents: 'auto',
                                    top: `${Math.min(visPanelWidth, 600)}px`
                                    // cursor: demo.assembly === 'hg38' ? 'auto' : 'not-allowed',
                                    // visibility: demo.assembly === 'hg38' ? 'visible' : 'hidden'
                                }}
                                // disabled={demo.assembly === 'hg38' ? false : true}
                                // onChange={(e) => {
                                //     const keyword = e.target.value;
                                //     if(keyword !== "" && !keyword.startsWith("c")) {
                                //         gosRef.current.api.suggestGene(keyword, (suggestions) => {
                                //             setGeneSuggestions(suggestions);
                                //         });
                                //         setSuggestionPosition({
                                //             left: searchBoxRef.current.getBoundingClientRect().left,
                                //             top: searchBoxRef.current.getBoundingClientRect().top + searchBoxRef.current.getBoundingClientRect().height,
                                //         });
                                //     } else {
                                //         setGeneSuggestions([]);
                                //     }
                                //     setSearchKeyword(keyword);
                                // }}
                                onKeyDown={e => {
                                    const keyword = (e.target as HTMLTextAreaElement).value;
                                    switch (e.key) {
                                        case 'ArrowUp':
                                            break;
                                        case 'ArrowDown':
                                            break;
                                        case 'Enter':
                                            // https://github.com/gosling-lang/gosling.js/blob/7555ab711023a0c3e2076a448756a9ba3eeb04f7/src/core/api.ts#L156
                                            gosRef.current.hgApi.api.zoomToGene(
                                                `${demo.id}-mid-ideogram`,
                                                keyword,
                                                10000,
                                                1000
                                            );
                                            break;
                                        case 'Esc':
                                        case 'Escape':
                                            break;
                                    }
                                }}
                            />
                            <button
                                style={{
                                    pointerEvents: 'auto',
                                    // !! This should be identical to how the height of circos determined.
                                    top: `${Math.min(visPanelWidth, 600)}px`
                                }}
                                className="zoom-in-button"
                                onClick={e => {
                                    const trackId = `${demo.id}-mid-ideogram`;
                                    const [start, end] = gosRef.current?.hgApi.api.getLocation(trackId).xDomain;
                                    if (end - start < 100) return;
                                    const delta = (end - start) / 3.0;
                                    gosRef.current.api.zoomTo(
                                        trackId,
                                        `chr1:${start + delta}-${end - delta}`,
                                        0,
                                        ZOOM_DURATION
                                    );
                                }}
                            >
                                +
                            </button>
                            <button
                                style={{
                                    pointerEvents: 'auto',
                                    // !! This should be identical to how the height of circos determined.
                                    top: `${Math.min(visPanelWidth, 600)}px`
                                }}
                                className="zoom-out-button"
                                onClick={e => {
                                    const trackId = `${demo.id}-mid-ideogram`;
                                    const [start, end] = gosRef.current?.hgApi.api.getLocation(trackId).xDomain;
                                    const delta = (end - start) / 2.0;
                                    gosRef.current.api.zoomTo(trackId, `chr1:${start}-${end}`, delta, ZOOM_DURATION);
                                }}
                            >
                                -
                            </button>
                            <button
                                style={{
                                    pointerEvents: 'auto',
                                    // !! This should be identical to how the height of circos determined.
                                    top: `${Math.min(visPanelWidth, 600)}px`
                                }}
                                className="zoom-left-button"
                                onClick={e => {
                                    const trackId = `${demo.id}-mid-ideogram`;
                                    const [start, end] = gosRef.current?.hgApi.api.getLocation(trackId).xDomain;
                                    if (end - start < 100) return;
                                    const delta = (end - start) / 4.0;
                                    gosRef.current.api.zoomTo(
                                        trackId,
                                        `chr1:${start - delta}-${end - delta}`,
                                        0,
                                        ZOOM_DURATION
                                    );
                                }}
                            >
                                ←
                            </button>
                            <button
                                style={{
                                    pointerEvents: 'auto',
                                    // !! This should be identical to how the height of circos determined.
                                    top: `${Math.min(visPanelWidth, 600)}px`
                                }}
                                className="zoom-right-button"
                                onClick={e => {
                                    const trackId = `${demo.id}-mid-ideogram`;
                                    const [start, end] = gosRef.current?.hgApi.api.getLocation(trackId).xDomain;
                                    const delta = (end - start) / 4.0;
                                    gosRef.current.api.zoomTo(
                                        trackId,
                                        `chr1:${start + delta}-${end + delta}`,
                                        0,
                                        ZOOM_DURATION
                                    );
                                }}
                            >
                                →
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        visibility:
                            ((!interactiveMode && !mouseOnVis) || (interactiveMode && mouseOnVis)) && !showSamples
                                ? 'visible'
                                : 'collapse',
                        position: 'absolute',
                        right: `${VIS_PADDING}px`,
                        top: '60px',
                        background: 'lightgray',
                        color: 'black',
                        padding: '6px',
                        pointerEvents: 'none',
                        zIndex: 9999,
                        boxShadow: '0 0 20px 2px rgba(0, 0, 0, 0.2)'
                    }}
                >
                    {!interactiveMode
                        ? 'Click inside to use interactions on visualizations'
                        : 'Click outside to deactivate interactions and scroll the page'}
                </div>
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        visibility: 'collapse',
                        boxShadow: interactiveMode ? 'inset 0 0 4px 2px #2399DB' : 'none',
                        zIndex: 9999,
                        background: 'none',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        pointerEvents: 'none'
                    }}
                />
                <div
                    className="move-to-top-btn"
                    onClick={() => {
                        setTimeout(
                            () => document.getElementById('gosling-panel')?.scrollTo({ top: 0, behavior: 'smooth' }),
                            0
                        );
                    }}
                >
                    <svg className="button" viewBox={ICONS.ARROW_UP.viewBox}>
                        <title>Scroll To Top</title>
                        <path fill="currentColor" d={ICONS.ARROW_UP.path[0]} />
                    </svg>
                </div>
                <div id="hidden-gosling" style={{ visibility: 'collapse', position: 'fixed' }} />
            </div>
        </ErrorBoundary>
    );
}

export default App;
