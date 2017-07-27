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

export function standings(html) {
    return $('tr', html)
        .map((_, row) => {
            const position = parseInt(
                $(row).find('td:nth-child(1)').text(),
                10,
            );
            const team = $(row).find('td:nth-child(2)').text();

            return !(position && team)
                ? null
                : {
                      position,
                      team,
                  };
        })
        .get()
        .filter(Boolean);
}

export function preliminaryMatches(html) {
    return $('#tabelle tr', html)
        .map((_, row) => {
            const number = Number($(row).find('td:nth-child(1)').text());
            const table = $(row).find('td:nth-child(2)').text();
            const team1 = $(row).find('td:nth-child(3)').text();
            const team2 = $(row).find('td:nth-child(5)').text();
            const result = $(row)
                .find('td:nth-child(6)')
                .text()
                .match(/([0-9]+):([0-9]+)/);
            const pointsTeam1 = result ? Number(result[1]) : null;
            const pointsTeam2 = result ? Number(result[2]) : null;
            const hasTeam1Won = $(row)
                .find('td:nth-child(3)')
                .hasClass('gewinner');
            const hasTeam2Won = $(row)
                .find('td:nth-child(5)')
                .hasClass('gewinner');
            const isDraw = $(row).find('td:nth-child(4)').hasClass('gewinner');

            return !(number && team1 && team2)
                ? null
                : {
                      match_number: number,
                      table,
                      team1,
                      team2,
                      points_team_1: pointsTeam1,
                      points_team_2: pointsTeam2,
                      winner: result
                          ? hasTeam1Won
                            ? 'team1'
                            : hasTeam2Won ? 'team2' : 'draw'
                          : null,
                  };
        })
        .get()
        .filter(Boolean);
}
