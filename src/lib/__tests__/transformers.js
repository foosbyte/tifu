import fs from 'fs';
import path from 'path';
import jest from 'jest';
import { list } from '../transformers';

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
