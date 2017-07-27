import fs from 'fs';
import path from 'path';
import jest from 'jest';
import {
    list,
    preregistrations,
    registrations,
    preliminaryStandings,
    standings,
    preliminaryMatches,
    tournament,
} from '../transforms';

function loadFixture(name) {
    const fixtures = path.join(__dirname, '../../../fixtures');
    return fs.readFileSync(path.join(fixtures, name), 'utf-8');
}

describe('List of tournaments', () => {
    let tournaments;
    let html;
    let active;
    let planned;
    let ended;

    beforeAll(() => {
        html = loadFixture('index.php.html');
    });

    beforeEach(() => {
        tournaments = list(html);
        active = tournaments.filter(t => t.state === 'active');
        planned = tournaments.filter(t => t.state === 'planned');
        ended = tournaments.filter(t => t.state === 'ended');
    });

    it('should return an empty array if no tournaments were found', () => {
        const tournaments = list('');
        expect(tournaments).toHaveLength(0);
    });

    it('should parse the table of tournaments to a JSON array', () => {
        expect(tournaments).toHaveLength(396);
        expect(tournaments).toMatchSnapshot();
    });

    it('should find one active tournament', () => {
        expect(active).toHaveLength(1);
        expect(active).toMatchSnapshot();
    });

    it('should find three planned tournaments', () => {
        expect(planned).toHaveLength(3);
        expect(planned).toMatchSnapshot();
    });

    it('should find 392 ended tournaments', () => {
        expect(ended).toHaveLength(392);
        expect(ended).toMatchSnapshot();
    });
});

describe('Preregistrations', () => {
    let attendees;
    let html;

    beforeAll(() => {
        html = loadFixture('turnier_voranmeldungen.php.html');
    });

    beforeEach(() => {
        attendees = preregistrations(html);
    });

    it('should find preregistrations for two events', () => {
        expect(
            attendees.filter(p => p.event === 'offenes doppel'),
        ).toHaveLength(2);
        expect(
            attendees.filter(p => p.event === 'senioren doppel'),
        ).toHaveLength(3);
        expect(attendees).toMatchSnapshot();
    });
});

describe('Registrations', () => {
    let attendees;
    let html;

    beforeAll(() => {
        html = loadFixture('turnier_anmeldungen.php.html');
    });

    beforeEach(() => {
        attendees = registrations(html);
    });

    it('should find a list of registered players', () => {
        expect(attendees).toHaveLength(113);
        expect(attendees).toMatchSnapshot();
    });
});

describe('Preliminary standings', () => {
    let standings;
    let html;

    beforeAll(() => {
        html = loadFixture('disziplin_tabelle.php.html');
    });

    beforeEach(() => {
        standings = preliminaryStandings(html);
    });

    it('should find 7 teams', () => {
        expect(standings).toHaveLength(7);
        expect(standings).toMatchSnapshot();
    });
});

describe('Final standings', () => {
    let table;
    let html;

    beforeAll(() => {
        html = loadFixture('disziplin_endplatzierungen.php.html');
    });

    beforeEach(() => {
        table = standings(html);
    });

    it('should find 29 teams', () => {
        expect(table).toHaveLength(29);
        expect(table).toMatchSnapshot();
    });
});

describe('Preliminary matches', () => {
    let matches;
    let html;

    beforeAll(() => {
        html = loadFixture('disziplin_vorrunde.php-1.html');
    });

    beforeEach(() => {
        matches = preliminaryMatches(html);
    });

    it('should find 4 ended matches', () => {
        expect(matches).toHaveLength(4);
        expect(matches).toMatchSnapshot();
    });

    it('should find active matches', () => {
        matches = preliminaryMatches(
            loadFixture('disziplin_vorrunde.php-7.html'),
        );
        expect(matches).toHaveLength(4);
        expect(matches).toMatchSnapshot();
    });
});

describe('Tournament', () => {
    let result;
    let html;

    beforeAll(() => {
        html = loadFixture('turnier.php-aktiv.html');
    });

    beforeEach(() => {
        result = tournament(html);
    });

    it('should have active matches', () => {
        expect(result.active_matches).toHaveLength(2);
    });

    it('should have upcoming matches', () => {
        expect(result.upcoming_matches).toHaveLength(1);
    });

    it('should have a list of events', () => {
        expect(result.events).toHaveLength(1);
    });

    it('should match snapshot', () => {
        expect(result).toMatchSnapshot();
    });

    describe('ended', () => {
        let result;
        let html;

        beforeAll(() => {
            html = loadFixture('turnier.php-beendet.html');
        });

        beforeEach(() => {
            result = tournament(html);
        });

        it('should have no matches', () => {
            expect(result.active_matches).toHaveLength(0);
            expect(result.upcoming_matches).toHaveLength(0);
        });

        it('should have events', () => {
            expect(result.events).toHaveLength(1);
        });

        it('should match snapshot', () => {
            expect(result).toMatchSnapshot();
        });
    });

    describe('planned', () => {
        let result;
        let html;

        beforeAll(() => {
            html = loadFixture('turnier.php-planned.html');
        });

        beforeEach(() => {
            result = tournament(html);
        });

        it('should have no matches', () => {
            expect(result.active_matches).toHaveLength(0);
            expect(result.upcoming_matches).toHaveLength(0);
        });

        it('should have events', () => {
            expect(result.events).toHaveLength(1);
        });

        it('should match snapshot', () => {
            expect(result).toMatchSnapshot();
        });
    });
});
