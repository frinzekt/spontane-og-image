import { IncomingMessage } from 'http';
import { parse } from 'url';
import { ParsedRequest, Theme } from './types';

export function parseRequest(req: IncomingMessage) {
    console.log('HTTP ' + req.url);
    const { pathname, query } = parse(req.url || '/', true);
    const { fontSize, fontSizeSub, images, widths, heights, theme, md } = (query || {});

    if (Array.isArray(fontSize)) {
        throw new Error('Expected a single fontSize');
    }
    if (Array.isArray(fontSizeSub)) {
        throw new Error('Expected a single fontSize');
    }
    if (Array.isArray(theme)) {
        throw new Error('Expected a single theme');
    }

    const arr = (pathname || '/').slice(1).split('.');
    let extension = '';
    let text = '';
    let subtext = '';
    if (arr.length === 0) {
        text = '';
        subtext = '';
    } else if (arr.length === 1) {
        text = arr[0];
        subtext = arr[0];
    } else {
        extension = arr.pop() as string;
        subtext = arr.pop() as string;
        text = arr.join('.');
    }

    const parsedRequest: ParsedRequest = {
        fileType: extension === 'jpeg' ? extension : 'png',
        text: decodeURIComponent(text),
        subtext: decodeURIComponent(subtext),
        theme: theme === 'dark' ? 'dark' : 'light',
        md: md === '1' || md === 'true',
        fontSize: fontSize || '96px',
        fontSizeSub: fontSizeSub || '96px',
        images: getArray(images),
        widths: getArray(widths),
        heights: getArray(heights),
    };
    parsedRequest.images = getDefaultImages(parsedRequest.images, parsedRequest.theme);
    return parsedRequest;
}

function getArray(stringOrArray: string[] | string | undefined): string[] {
    if (typeof stringOrArray === 'undefined') {
        return [];
    } else if (Array.isArray(stringOrArray)) {
        return stringOrArray;
    } else {
        return [stringOrArray];
    }
}

function getDefaultImages(images: string[], theme: Theme): string[] {
    const defaultImage = theme === 'light'
        ? 'https://www.spontane.fun/_next/static/media/undraw_exploring_re_grb8.bd2d8142.svg'
        : 'https://www.spontane.fun/_next/static/media/undraw_exploring_re_grb8.bd2d8142.svg';

    if (!images || !images[0]) {
        return [defaultImage];
    }
    return images;
}
