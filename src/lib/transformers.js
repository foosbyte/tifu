import URL from 'url';
import querystring from 'querystring';
import $ from 'cheerio';
import moment from 'moment';

const dateFormat = 'DD.MM.YYYY HH:mm';
const states = {
    'laufende turniere': 'active',
    'geplante turniere': 'planned',
    'beendete turniere': 'ended',
};

export function list(html) {
    return $('tr', html)
        .map((_, row) => {
            const nthtd = num => $(row).find(`td:nth-child(${num})`);
            const caption = $(row).parents('table').find('caption').text();

            const date = moment(nthtd(1).text(), dateFormat).valueOf();
            const title = nthtd(2).find('a').text();
            const link = 'http://some.tld/' + nthtd(2).find('a').attr('href');
            const location = nthtd(3).text();
            const state = states[caption.toLocaleLowerCase()];

            return !(date && title && link && location && state)
                ? null
                : {
                    state,
                    date,
                    title,
                    link: querystring.parse(URL.parse(link).query),
                    location,
                };
        })
        .get()
        .filter(Boolean);
}
