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

export function preregistrations(html) {
    return $('tr', html)
        .map((_, row) => {
            const event = $(row)
                .find('td:nth-child(3)')
                .text()
                .toLocaleLowerCase();
            const team = $(row).find('td:nth-child(2)').text();

            return !(event && team)
                ? null
                : {
                      event,
                      team,
                  };
        })
        .get()
        .filter(Boolean);
}

export function registrations(html) {
    return $('tr', html)
        .map((_, row) => {
            const event = $(row)
                .find('td:nth-child(3)')
                .text()
                .toLocaleLowerCase();
            const team = $(row).find('td:nth-child(2)').text();

            return !(event && team)
                ? null
                : {
                      event,
                      team,
                  };
        })
        .get()
        .filter(Boolean);
}

export function preliminaryStandings(html) {
    return $('tr', html)
        .map((_, row) => {
            const position = Number($(row).find('td:nth-child(1)').text());
            const team = $(row).find('td:nth-child(2)').text();
            const matches = Number($(row).find('td:nth-child(3)').text());
            const points = Number($(row).find('td:nth-child(4)').text());
            const buchholz1 = Number($(row).find('td:nth-child(5)').text());
            const buchholz2 = Number($(row).find('td:nth-child(6)').text());

            return !(
                position &&
                team &&
                matches &&
                points &&
                buchholz1 &&
                buchholz2
            )
                ? null
                : {
                      position,
                      team,
                      matches,
                      points,
                      buchholz1,
                      buchholz2,
                  };
        })
        .get()
        .filter(Boolean);
}
